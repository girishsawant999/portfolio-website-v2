import fs from "fs";
import { NextRequest } from "next/server";
import path from "path";

export const runtime = "nodejs";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const range = req.headers.get("range");
  if (!range) {
    return new Response("Range header required", { status: 400 });
  }

  const relativePath = (await params).path.join("/");
  if (!relativePath) {
    return new Response("Missing video path in URL", { status: 400 });
  }

  const videoPath = path.join(process.cwd(), "public", relativePath);
  if (!videoPath.startsWith(path.join(process.cwd(), "public"))) {
    return new Response("Invalid file path", { status: 400 });
  }

  if (!fs.existsSync(videoPath)) {
    return new Response("Video not found", { status: 404 });
  }

  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;

  const CHUNK_SIZE = 1_000_000;
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, fileSize - 1);
  const contentLength = end - start + 1;

  const headers = new Headers({
    "Content-Range": `bytes ${start}-${end}/${fileSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength.toString(),
    "Content-Type": "video/mp4",
  });

  const stream = fs.createReadStream(videoPath, { start, end });
  return new Response(stream as unknown as BodyInit, {
    status: 206,
    headers,
  });
}
