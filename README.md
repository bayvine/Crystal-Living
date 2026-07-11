# Crystal Living

Next.js scaffold for a motion-forward editorial portfolio/site using GSAP, Tailwind CSS, Prismic, and Netlify.

The app is ready to run without Prismic. It shows local starter content until `NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME` is set, then reads the `home` singleton and repeatable `page` documents from Prismic.

## Local Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Connect Prismic

1. Create a Prismic repository at `https://prismic.io/dashboard`.
2. Copy the repository name from the Prismic URL. Example: `your-repo-name` from `https://your-repo-name.prismic.io`.
3. Set it in `.env.local`:

```bash
NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME=your-repo-name
PRISMIC_ACCESS_TOKEN=
PRISMIC_WEBHOOK_SECRET=make-a-long-random-string
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. Confirm `prismic.config.json` uses the same `repositoryName`.
5. Start the site and check the Prismic model status:

```bash
npm run dev
npm run prismic:status
```

6. Push the custom types and slices with `npm run prismic:push`.
7. In Prismic, create the `Home` singleton and add Hero, Featured Work, and Text Block slices.
8. Add Prismic preview URL after Netlify deploy:

```text
https://YOUR-SITE.netlify.app/api/preview
```

9. Add a Prismic webhook for publish events:

```text
https://YOUR-SITE.netlify.app/api/revalidate?secret=YOUR_PRISMIC_WEBHOOK_SECRET
```

## Upload To GitHub

Using GitHub CLI:

```bash
git add .
git commit -m "Scaffold Next Prismic GSAP Netlify site"
gh auth login
gh repo create crystal-living --public --source=. --remote=origin --push
```

Without GitHub CLI:

```bash
git add .
git commit -m "Scaffold Next Prismic GSAP Netlify site"
git branch -M main
git remote add origin git@github.com:YOUR_USER_OR_ORG/crystal-living.git
git push -u origin main
```

## Deploy To Netlify

Option A, Netlify UI:

1. Go to Netlify and choose **Add new site** then **Import an existing project**.
2. Choose GitHub and select the `crystal-living` repository.
3. Use these build settings:

```text
Build command: npm run build
Publish directory: .next
```

4. Add environment variables:

```text
NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME=your-repo-name
PRISMIC_ACCESS_TOKEN=
PRISMIC_WEBHOOK_SECRET=make-a-long-random-string
NEXT_PUBLIC_SITE_URL=https://YOUR-SITE.netlify.app
```

5. Deploy the site.

Option B, Netlify CLI:

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify env:set NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME your-repo-name
netlify env:set PRISMIC_WEBHOOK_SECRET make-a-long-random-string
netlify env:set NEXT_PUBLIC_SITE_URL https://YOUR-SITE.netlify.app
netlify deploy --build --prod
```

## Convert Uploads To WebP And WebM

This project includes a local media conversion script at `scripts/convert-media.mjs`.

It follows Google's `cwebp` command shape for still images:

```text
cwebp [options] input_file -o output_file.webp
```

The script converts:

- `.png`, `.jpg`, `.jpeg`, `.tif`, `.tiff`, `.webp` to `.webp` using `cwebp`
- `.gif`, `.mp4`, `.mov`, `.m4v`, `.avi`, `.mkv`, `.webm` to `.webm` using `ffmpeg`

Install the native tools first:

```bash
brew install webp ffmpeg
```

Check your machine:

```bash
npm run media:doctor
```

Put originals in:

```text
public/uploads/originals
```

Then convert everything into:

```text
public/uploads/optimized
```

```bash
npm run media:convert
```

Convert another folder:

```bash
npm run media:convert -- ./assets --output ./public/media
```

Useful options:

```bash
npm run media:convert -- --quality 86 --preset photo
npm run media:convert -- --lossless --metadata all
npm run media:convert -- --resize 1800x0
npm run media:convert -- ./video.mp4 --webm-crf 34 --webm-scale 1280:-2
npm run media:convert -- --overwrite
```

## What Is Included

- Next.js App Router
- Tailwind CSS
- GSAP page and scroll animation
- Prismic client, previews, Slice Machine config, slices, and custom types
- Netlify build config with the official Next.js plugin
- GitHub Actions CI for lint, typecheck, and build
- Media conversion script for WebP/WebM upload optimization
