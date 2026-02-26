import { readdir } from "node:fs/promises";
import path from "node:path";

type AssetKind = "image" | "video";

export type HomeMedia = {
  gatewayImage: string;
  gatewayVideo: string | null;
  serviceAssets: string[];
};

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const VIDEO_EXTENSIONS = new Set([".mp4", ".webm"]);
const FALLBACK_IMAGE = "/assets/Boxing%20at%20BJ-2.webp";

function toAssetUrl(fileName: string) {
  return `/assets/${fileName.split("/").map(encodeURIComponent).join("/")}`;
}

function getKind(fileName: string): AssetKind | null {
  const ext = path.extname(fileName).toLowerCase();
  if (IMAGE_EXTENSIONS.has(ext)) return "image";
  if (VIDEO_EXTENSIONS.has(ext)) return "video";
  return null;
}

export async function getHomeMedia(): Promise<HomeMedia> {
  const assetsDir = path.join(process.cwd(), "public", "assets");

  try {
    const files = await readdir(assetsDir, { recursive: true });
    const fileNames = files.filter((entry): entry is string => typeof entry === "string");
    const mapped = fileNames
      .map((fileName) => ({ fileName, kind: getKind(fileName) }))
      .filter((entry): entry is { fileName: string; kind: AssetKind } => entry.kind !== null);

    const images = mapped.filter((entry) => entry.kind === "image").map((entry) => toAssetUrl(entry.fileName));
    const videos = mapped.filter((entry) => entry.kind === "video").map((entry) => toAssetUrl(entry.fileName));

    return {
      gatewayImage: images[0] ?? FALLBACK_IMAGE,
      gatewayVideo: videos[0] ?? null,
      serviceAssets: [...images.slice(0, 6), ...videos.slice(0, 2)],
    };
  } catch {
    return {
      gatewayImage: FALLBACK_IMAGE,
      gatewayVideo: null,
      serviceAssets: [],
    };
  }
}
