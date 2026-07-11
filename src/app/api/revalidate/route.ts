import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const url = new URL(request.url);
  const configuredSecret = process.env.PRISMIC_WEBHOOK_SECRET;
  const providedSecret =
    request.headers.get("x-prismic-secret") || url.searchParams.get("secret");

  if (configuredSecret && providedSecret !== configuredSecret) {
    return NextResponse.json({ revalidated: false }, { status: 401 });
  }

  revalidateTag("prismic", "max");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}

export const GET = POST;
