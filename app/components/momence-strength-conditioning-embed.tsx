"use client";

import { useEffect, useRef, useState } from "react";

const MOMENCE_SCRIPT_SRC =
  "https://momence.com/plugin/host-schedule/host-schedule.js";
const FALLBACK_BOOKING_URL = "https://momence.com/appointments/93353";

export function MomenceStrengthConditioningEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pluginMountRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(
    () => typeof window !== "undefined" && !("IntersectionObserver" in window)
  );
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">(
    shouldLoad ? "loading" : "idle"
  );

  useEffect(() => {
    if (shouldLoad) return;
    const container = containerRef.current;
    if (!container || !("IntersectionObserver" in window)) return;
    const rootMargin = window.matchMedia("(max-width: 768px)").matches
      ? "120px 0px"
      : "300px 0px";

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setShouldLoad(true);
        setStatus("loading");
        observer.disconnect();
      },
      { rootMargin }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [shouldLoad]);

  useEffect(() => {
    if (!shouldLoad) return;
    const pluginMount = pluginMountRef.current;
    if (!pluginMount) return;

    const script = document.createElement("script");
    script.async = true;
    script.type = "module";
    script.setAttribute("fetchpriority", "low");
    script.setAttribute("host_id", "93353");
    script.setAttribute("teacher_ids", "[]");
    script.setAttribute("location_ids", "[95520]");
    script.setAttribute("tag_ids", "[164836]");
    script.setAttribute("lite_mode", "true");
    script.setAttribute("default_filter", "show-all");
    script.setAttribute("locale", "en");
    script.onload = () => setStatus("ready");
    script.onerror = () => setStatus("error");
    script.src = MOMENCE_SCRIPT_SRC;

    const wrapper = document.createElement("div");
    wrapper.id = "ribbon-schedule";
    pluginMount.replaceChildren(wrapper, script);

    return () => {
      script.onload = null;
      script.onerror = null;
      pluginMount.replaceChildren();
    };
  }, [shouldLoad]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[540px] rounded-xl border border-white/10 bg-black/20"
    >
      <div ref={pluginMountRef} className="min-h-[540px]" />
      {!shouldLoad || status === "loading" ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-5 text-center">
          <div className="h-10 w-10 animate-pulse rounded-full border border-white/25 bg-white/10" />
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/75">
            Loading Strength &amp; Conditioning Schedule
          </p>
        </div>
      ) : null}
      {status === "error" ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-5 text-center">
          <p className="max-w-md text-sm text-white/80">
            The booking panel did not load on this connection.
          </p>
          <a
            href={FALLBACK_BOOKING_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[var(--bj-red)] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Open Booking In New Tab
          </a>
        </div>
      ) : null}
    </div>
  );
}
