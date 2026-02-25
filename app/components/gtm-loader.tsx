"use client";

import { useEffect } from "react";
import {
  COOKIE_CONSENT_EVENT,
  getStoredCookieConsent,
} from "../lib/cookie-consent";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

type GtmLoaderProps = {
  gtmId?: string;
};

function ensureGtmLoaded(gtmId: string) {
  if (typeof window === "undefined") return;
  if (document.getElementById("gtm-base")) return;

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });

  const script = document.createElement("script");
  script.id = "gtm-base";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
  document.head.appendChild(script);
}

export function GtmLoader({ gtmId }: GtmLoaderProps) {
  useEffect(() => {
    if (!gtmId) return;

    const maybeLoad = () => {
      if (getStoredCookieConsent() === "accepted") {
        ensureGtmLoaded(gtmId);
      }
    };

    maybeLoad();
    window.addEventListener(COOKIE_CONSENT_EVENT, maybeLoad);

    return () => {
      window.removeEventListener(COOKIE_CONSENT_EVENT, maybeLoad);
    };
  }, [gtmId]);

  return null;
}
