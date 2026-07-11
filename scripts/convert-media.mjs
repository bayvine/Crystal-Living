#!/usr/bin/env node
import { spawn } from "node:child_process";
import { constants as fsConstants } from "node:fs";
import { access, mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const imageExtensions = new Set([".png", ".jpg", ".jpeg", ".tif", ".tiff", ".webp"]);
const videoExtensions = new Set([".gif", ".mp4", ".mov", ".m4v", ".avi", ".mkv", ".webm"]);

const defaultInput = "public/uploads/originals";
const defaultOutput = "public/uploads/optimized";

const usage = `
Usage:
  npm run media:convert
  npm run media:convert -- ./public/uploads/originals --output ./public/uploads/optimized
  npm run media:convert -- ./assets --quality 86 --preset photo --resize 1800x0
  npm run media:convert -- ./video.mp4 --webm-crf 34 --webm-scale 1280:-2

Options:
  --output <dir>       Output directory. Default: ${defaultOutput}
  --quality <0-100>    WebP quality passed to cwebp -q. Default: 82
  --lossless           Use cwebp -lossless for still images
  --preset <name>      cwebp preset: default, photo, picture, drawing, icon, text
  --method <0-6>       cwebp compression method. Default: 4
  --resize <WxH>       cwebp resize. Use 0 for one side to preserve aspect ratio, e.g. 1800x0
  --metadata <value>   cwebp metadata: none, all, exif, icc, xmp. Default: none
  --webm-crf <value>   FFmpeg VP9 CRF for WebM. Lower is higher quality. Default: 32
  --webm-scale <expr>  FFmpeg scale expression, e.g. 1280:-2
  --overwrite          Replace existing output files
  --dry-run            Print conversions without writing files
  --doctor             Check required local tools
  --help               Show this help
`;

function parseArgs(argv) {
  const options = {
    inputs: [],
    output: defaultOutput,
    quality: 82,
    lossless: false,
    preset: "photo",
    method: 4,
    resize: null,
    metadata: "none",
    webmCrf: 32,
    webmScale: null,
    overwrite: false,
    dryRun: false,
    doctor: false,
    help: false
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = () => {
      index += 1;
      if (index >= argv.length) {
        throw new Error(`Missing value for ${arg}`);
      }
      return argv[index];
    };

    switch (arg) {
      case "--output":
      case "-o":
        options.output = next();
        break;
      case "--quality":
      case "-q":
        options.quality = Number(next());
        break;
      case "--lossless":
        options.lossless = true;
        break;
      case "--preset":
        options.preset = next();
        break;
      case "--method":
        options.method = Number(next());
        break;
      case "--resize":
        options.resize = parseResize(next());
        break;
      case "--metadata":
        options.metadata = next();
        break;
      case "--webm-crf":
        options.webmCrf = Number(next());
        break;
      case "--webm-scale":
        options.webmScale = next();
        break;
      case "--overwrite":
        options.overwrite = true;
        break;
      case "--dry-run":
        options.dryRun = true;
        break;
      case "--doctor":
        options.doctor = true;
        break;
      case "--help":
      case "-h":
        options.help = true;
        break;
      default:
        if (arg.startsWith("-")) {
          throw new Error(`Unknown option: ${arg}`);
        }
        options.inputs.push(arg);
    }
  }

  if (options.inputs.length === 0) {
    options.inputs.push(defaultInput);
  }

  validateOptions(options);
  return options;
}

function parseResize(value) {
  const match = value.match(/^(\d+)x(\d+)$/i);
  if (!match) {
    throw new Error("Resize must look like 1800x0, 0x1200, or 1200x800");
  }

  return {
    width: Number(match[1]),
    height: Number(match[2])
  };
}

function validateOptions(options) {
  if (!Number.isFinite(options.quality) || options.quality < 0 || options.quality > 100) {
    throw new Error("--quality must be between 0 and 100");
  }

  if (!Number.isInteger(options.method) || options.method < 0 || options.method > 6) {
    throw new Error("--method must be an integer between 0 and 6");
  }

  if (!Number.isFinite(options.webmCrf) || options.webmCrf < 0 || options.webmCrf > 63) {
    throw new Error("--webm-crf must be between 0 and 63");
  }

  const presets = new Set(["default", "photo", "picture", "drawing", "icon", "text"]);
  if (!presets.has(options.preset)) {
    throw new Error("--preset must be one of: default, photo, picture, drawing, icon, text");
  }

  const metadataValues = new Set(["none", "all", "exif", "icc", "xmp"]);
  for (const value of options.metadata.split(",")) {
    if (!metadataValues.has(value.trim())) {
      throw new Error("--metadata must use: none, all, exif, icc, xmp");
    }
  }
}

async function main() {
  let options;

  try {
    options = parseArgs(process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
    console.error(usage);
    process.exit(1);
  }

  if (options.help) {
    console.log(usage.trim());
    return;
  }

  if (options.doctor) {
    await runDoctor();
    return;
  }

  const files = await collectFiles(options.inputs);
  const jobs = files.map((file) => createJob(file, options)).filter(Boolean);

  if (jobs.length === 0) {
    console.log(`No supported files found in: ${options.inputs.join(", ")}`);
    return;
  }

  await assertTooling(jobs);
  await mkdir(path.resolve(options.output), { recursive: true });

  let converted = 0;
  let skipped = 0;
  const startedAt = Date.now();

  for (const job of jobs) {
    if (!options.overwrite && (await fileExists(job.output))) {
      skipped += 1;
      console.log(`skip existing ${path.relative(process.cwd(), job.output)}`);
      continue;
    }

    if (options.dryRun) {
      console.log(`[dry-run] ${job.kind} ${path.relative(process.cwd(), job.input)} -> ${path.relative(process.cwd(), job.output)}`);
      continue;
    }

    await mkdir(path.dirname(job.output), { recursive: true });
    console.log(`${job.kind} ${path.relative(process.cwd(), job.input)} -> ${path.relative(process.cwd(), job.output)}`);

    if (job.kind === "webp") {
      await run("cwebp", buildCwebpArgs(job.input, job.output, options));
    } else {
      await run("ffmpeg", buildFfmpegArgs(job.input, job.output, options));
    }

    converted += 1;
  }

  const duration = ((Date.now() - startedAt) / 1000).toFixed(1);
  console.log(`Done. Converted ${converted}, skipped ${skipped}, scanned ${files.length} file(s) in ${duration}s.`);
}

async function runDoctor() {
  const cwebp = await commandExists("cwebp");
  const ffmpeg = await commandExists("ffmpeg");

  console.log(`cwebp: ${cwebp ? "found" : "missing"}`);
  console.log(`ffmpeg: ${ffmpeg ? "found" : "missing"}`);

  if (!cwebp || !ffmpeg) {
    console.log("");
    console.log("Install on macOS with Homebrew:");
    console.log("  brew install webp ffmpeg");
    console.log("");
    console.log("Install on Ubuntu/Debian:");
    console.log("  sudo apt-get install webp ffmpeg");
    process.exitCode = 1;
  }
}

async function assertTooling(jobs) {
  const needsCwebp = jobs.some((job) => job.kind === "webp");
  const needsFfmpeg = jobs.some((job) => job.kind === "webm");

  if (needsCwebp && !(await commandExists("cwebp"))) {
    throwMissingTool("cwebp", "brew install webp");
  }

  if (needsFfmpeg && !(await commandExists("ffmpeg"))) {
    throwMissingTool("ffmpeg", "brew install ffmpeg");
  }
}

function throwMissingTool(tool, installCommand) {
  console.error(`${tool} is not installed.`);
  console.error(`Install it on macOS with: ${installCommand}`);
  console.error("Then rerun: npm run media:convert");
  process.exit(1);
}

async function collectFiles(inputs) {
  const files = [];

  for (const input of inputs) {
    const absolute = path.resolve(input);

    if (!(await fileExists(absolute))) {
      console.warn(`skip missing ${input}`);
      continue;
    }

    const inputStat = await stat(absolute);
    if (inputStat.isDirectory()) {
      files.push(...(await walkDirectory(absolute)));
    } else if (inputStat.isFile()) {
      files.push({
        file: absolute,
        root: path.dirname(absolute)
      });
    }
  }

  return files;
}

async function walkDirectory(root) {
  const entries = await readdir(root, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolute = path.join(root, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await walkDirectory(absolute)));
    } else if (entry.isFile()) {
      files.push({ file: absolute, root });
    }
  }

  return files;
}

function createJob(fileInfo, options) {
  const extension = path.extname(fileInfo.file).toLowerCase();
  const relative = path.relative(fileInfo.root, fileInfo.file);

  if (imageExtensions.has(extension)) {
    return {
      kind: "webp",
      input: fileInfo.file,
      output: path.resolve(options.output, replaceExtension(relative, ".webp"))
    };
  }

  if (videoExtensions.has(extension)) {
    return {
      kind: "webm",
      input: fileInfo.file,
      output: path.resolve(options.output, replaceExtension(relative, ".webm"))
    };
  }

  return null;
}

function buildCwebpArgs(input, output, options) {
  const args = [
    "-preset",
    options.preset,
    "-q",
    String(options.quality),
    "-m",
    String(options.method),
    "-metadata",
    options.metadata,
    "-mt",
    "-quiet"
  ];

  if (options.lossless) {
    args.push("-lossless");
  }

  if (options.resize) {
    args.push("-resize", String(options.resize.width), String(options.resize.height));
  }

  args.push("-o", output, "--", input);
  return args;
}

function buildFfmpegArgs(input, output, options) {
  const args = [
    "-hide_banner",
    "-loglevel",
    "error",
    "-y",
    "-i",
    input,
    "-map",
    "0:v:0",
    "-map",
    "0:a?",
    "-c:v",
    "libvpx-vp9",
    "-b:v",
    "0",
    "-crf",
    String(options.webmCrf),
    "-row-mt",
    "1",
    "-pix_fmt",
    "yuv420p",
    "-c:a",
    "libopus"
  ];

  if (options.webmScale) {
    args.push("-vf", `scale=${options.webmScale}`);
  }

  args.push(output);
  return args;
}

function replaceExtension(filePath, extension) {
  return path.join(path.dirname(filePath), `${path.basename(filePath, path.extname(filePath))}${extension}`);
}

async function commandExists(command) {
  return new Promise((resolve) => {
    const child = spawn(command, ["-version"], { stdio: "ignore" });
    child.on("error", () => resolve(false));
    child.on("close", (code) => resolve(code === 0));
  });
}

async function fileExists(filePath) {
  try {
    await access(filePath, fsConstants.F_OK);
    return true;
  } catch {
    return false;
  }
}

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: "inherit" });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${command} exited with code ${code}`));
      }
    });
  });
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
