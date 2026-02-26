"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type GalleryItem = {
  src: string;
  alt: string;
};

const CAROUSEL_BASE = "/assets/Carousel";

function carouselSrc(filename: string) {
  return `${CAROUSEL_BASE}/${encodeURIComponent(filename)}`;
}

const galleryItems: GalleryItem[] = [
  { src: carouselSrc("Boxing at BJ.jpg"), alt: "Group training at Bodyjunkies" },
  { src: carouselSrc("Boxing at BJ-72.jpg"), alt: "Boxing session in the studio" },
  { src: carouselSrc("Boxing at BJ-75.jpg"), alt: "Members training with gloves" },
  { src: carouselSrc("Boxing at BJ-77.jpg"), alt: "Conditioning rounds at Bodyjunkies" },
  { src: carouselSrc("Boxing at BJ-78.jpg"), alt: "Small-group boxing class" },
  { src: carouselSrc("Boxing at BJ-81.jpg"), alt: "Coach-led session in the room" },
  { src: carouselSrc("Boxing at BJ-90.jpg"), alt: "Tribe training together" },
  { src: carouselSrc("Boxing at BJ-95.jpg"), alt: "Boxing fitness at Bodyjunkies" },
  { src: carouselSrc("Boxing at BJ-96.jpg"), alt: "High-energy class moment" },
  { src: carouselSrc("boxing-gym-islington-fitness-classes-bodyjunkies-01 (1).jpg"), alt: "Boxing gym Islington fitness classes" },
  { src: carouselSrc("boxing-studio-north-london-hiit-conditioning-bodyjunkies-02 (1).jpg"), alt: "Boxing studio North London HIIT conditioning" },
  { src: carouselSrc("personal-trainer-islington-small-group-classes-bodyjunkies-03 (1).jpg"), alt: "Personal trainer small-group classes" },
  { src: carouselSrc("fitness-coaching-islington-small-group-sessions-bodyjunkies-05 (1).jpg"), alt: "Fitness coaching small-group sessions" },
  { src: carouselSrc("(WEB)BODYJUNKIES_210124_0208.jpg"), alt: "Bodyjunkies training" },
  { src: carouselSrc("(WEB)BODYJUNKIES_210124_0302.jpg"), alt: "Session in the room" },
  { src: carouselSrc("(WEB)BODYJUNKIES_210124_0771.jpg"), alt: "Members working combinations" },
  { src: carouselSrc("(WEB)BODYJUNKIES_210124_0837.jpg"), alt: "Coaching on the floor" },
  { src: carouselSrc("(WEB)BODYJUNKIES_210124_0865.jpg"), alt: "Boxing drill at Bodyjunkies" },
  { src: carouselSrc("(WEB)BODYJUNKIES_210124_1021.jpg"), alt: "Tribe in motion" },
  { src: carouselSrc("(WEB)BODYJUNKIES_210124_1022.jpg"), alt: "Training with inner fire" },
  { src: carouselSrc("(WEB)BODYJUNKIES_210124_1122.jpg"), alt: "Small-group standards" },
  { src: carouselSrc("(WEB)BODYJUNKIES_210124_1128.jpg"), alt: "Boxing and conditioning" },
  { src: carouselSrc("(WEB)BODYJUNKIES_210124_1137.jpg"), alt: "Real people, real coaching" },
  { src: carouselSrc("(WEB)BODYJUNKIES_210124_1148.jpg"), alt: "Bodyjunkies community" },
  { src: carouselSrc("(WEB)BODYJUNKIES_210124_1193.jpg"), alt: "Grit in the room" },
];

export function CommunityGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);

  const total = useMemo(() => galleryItems.length, []);

  useEffect(() => {
    const nodes = slideRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number((entry.target as HTMLElement).dataset.index ?? 0);
          setActiveIndex(index);
        });
      },
      {
        root: null,
        threshold: 0.65,
      }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="gallery"
      className="rounded-2xl border border-white/15 bg-white/[0.03] p-6 sm:p-8"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
        Gallery
      </p>
      <h2 className="mt-3 text-3xl font-black uppercase text-white sm:text-4xl">
        The Tribe In Motion
      </h2>
      <p className="mt-4 max-w-3xl text-sm text-white/85 sm:text-base">
        A quick look inside sessions, coaching moments, and the people that build
        the energy in the room.
      </p>

      <div className="mt-6 md:hidden">
        <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {galleryItems.map((item, index) => (
            <div
              key={item.src}
              ref={(node) => {
                slideRefs.current[index] = node;
              }}
              data-index={index}
              className="relative aspect-[4/5] w-[82%] shrink-0 snap-center overflow-hidden rounded-2xl border border-white/20"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover"
                sizes="82vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-center gap-2">
          {Array.from({ length: total }).map((_, index) => (
            <span
              key={index}
              className={`h-1.5 rounded-full transition-all ${
                index === activeIndex ? "w-6 bg-white" : "w-1.5 bg-white/35"
              }`}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>

      <div className="mt-6 hidden grid-cols-3 gap-3 md:grid">
        {galleryItems.map((item, index) => (
          <div
            key={item.src}
            className={`group relative overflow-hidden rounded-2xl border border-white/15 ${
              index % 3 === 0 ? "aspect-[4/5]" : "aspect-square"
            }`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              sizes="(max-width: 1024px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/10" />
          </div>
        ))}
      </div>
    </section>
  );
}
