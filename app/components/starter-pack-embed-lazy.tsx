"use client";

import dynamic from "next/dynamic";

const StarterPackEmbed = dynamic(
  () => import("./starter-pack-embed").then((module) => module.StarterPackEmbed),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[1000px] items-center justify-center p-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/75">
          Preparing checkout...
        </p>
      </div>
    ),
  }
);

export function StarterPackEmbedLazy() {
  return <StarterPackEmbed />;
}
