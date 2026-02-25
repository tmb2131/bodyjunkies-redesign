"use client";

import { useEffect, useRef } from "react";
import { useState } from "react";

const MOMENCE_REVIEWS_SCRIPT_SRC = "https://momence.com/plugin/reviews/reviews.js";

export function ReviewsCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(
    () => typeof window !== "undefined" && typeof IntersectionObserver === "undefined"
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (typeof IntersectionObserver === "undefined") {
      return;
    }
    const rootMargin = window.matchMedia("(max-width: 768px)").matches
      ? "120px 0px"
      : "240px 0px";

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    const container = containerRef.current;
    if (!container) return;

    const reviewsRoot = document.createElement("div");
    reviewsRoot.id = "momence-plugin-reviews";

    const script = document.createElement("script");
    script.async = true;
    script.type = "module";
    script.setAttribute("fetchpriority", "low");
    script.setAttribute("host_id", "93353");
    script.setAttribute("is_profile_picture_enabled", "true");
    script.setAttribute("is_text_only_enabled", "true");
    script.setAttribute("is_session_and_teacher_info_enabled", "true");
    script.setAttribute("layout", "horizontal");
    script.setAttribute(
      "signature",
      "98e0fe2b6e055a841810d060089c8fb203a0f4a8593d0bb1ca95f253339e433c"
    );
    script.src = MOMENCE_REVIEWS_SCRIPT_SRC;

    container.innerHTML = "";
    container.appendChild(reviewsRoot);
    container.appendChild(script);

    return () => {
      script.remove();
    };
  }, [shouldLoad]);

  return (
    <>
      <style jsx global>{`
        :root {
          --momenceReviewColorBackground: rgba(255, 255, 255, 0.04);
          --momenceReviewColorText: #ffffff;
          --momenceReviewColorRating: #f69523;
          --momenceReviewColorDateText: rgba(255, 255, 255, 0.72);
          --momenceBorder: 1px solid rgba(255, 255, 255, 0.14);
          --momenceBorderRadius: 12px;
          --momenceBoxShadow: 0 0 0 0 rgba(0, 0, 0, 0);
        }
      `}</style>
      <div ref={containerRef} className="min-h-[320px] w-full" />
    </>
  );
}
