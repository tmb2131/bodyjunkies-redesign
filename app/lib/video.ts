export type VideoSource = {
  src: string;
  type?: "video/mp4" | "video/webm" | "video/quicktime";
};

function inferVideoType(src: string): VideoSource["type"] {
  const extension = src.split("?")[0]?.toLowerCase().split(".").pop();
  if (extension === "webm") return "video/webm";
  if (extension === "mov") return "video/quicktime";
  if (extension === "mp4") return "video/mp4";
  return undefined;
}

export function getVideoSourceCandidates(src: string): VideoSource[] {
  const baseWithoutExt = src.replace(/\.[^.]+$/, "");
  const candidates = [`${baseWithoutExt}.webm`, `${baseWithoutExt}.mp4`, src];
  const uniqueSources = [...new Set(candidates)];

  return uniqueSources.map((candidate) => ({
    src: candidate,
    type: inferVideoType(candidate),
  }));
}
