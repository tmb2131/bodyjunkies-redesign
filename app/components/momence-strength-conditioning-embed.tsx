"use client";

import { useEffect, useRef } from "react";

const MOMENCE_SCRIPT_SRC =
  "https://momence.com/plugin/host-schedule/host-schedule.js";

export function MomenceStrengthConditioningEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const existing = document.querySelector(
      `script[src="${MOMENCE_SCRIPT_SRC}"]`
    );
    if (existing) {
      existing.remove();
    }

    const script = document.createElement("script");
    script.async = true;
    script.type = "module";
    script.setAttribute("host_id", "93353");
    script.setAttribute("teacher_ids", "[]");
    script.setAttribute("location_ids", "[95520]");
    script.setAttribute("tag_ids", "[164836]");
    script.setAttribute("lite_mode", "true");
    script.setAttribute("default_filter", "show-all");
    script.setAttribute("locale", "en");
    script.src = MOMENCE_SCRIPT_SRC;

    const wrapper = document.createElement("div");
    wrapper.id = "ribbon-schedule";
    container.innerHTML = "";
    container.appendChild(wrapper);
    container.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return <div ref={containerRef} className="min-h-[400px]" />;
}
