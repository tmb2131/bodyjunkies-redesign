"use client";

export const COOKIE_CONSENT_KEY = "bj_cookie_consent_v1";
export const COOKIE_CONSENT_EVENT = "bj-cookie-consent-change";

export type CookieConsentStatus = "accepted" | "rejected";

export function getStoredCookieConsent(): CookieConsentStatus | null {
  if (typeof window === "undefined") return null;

  const value = window.localStorage.getItem(COOKIE_CONSENT_KEY);
  if (value === "accepted" || value === "rejected") {
    return value;
  }

  return null;
}

export function setStoredCookieConsent(status: CookieConsentStatus) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(COOKIE_CONSENT_KEY, status);
  window.dispatchEvent(
    new CustomEvent(COOKIE_CONSENT_EVENT, {
      detail: { status },
    })
  );
}
