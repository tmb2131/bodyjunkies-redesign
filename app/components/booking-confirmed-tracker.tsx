"use client";

import { useEffect } from "react";
import { trackEvent } from "../lib/analytics";

export function BookingConfirmedTracker() {
  useEffect(() => {
    trackEvent("booking_complete", {
      source: "booking_confirmed_route",
      path: "/booking-confirmed",
    });
  }, []);

  return null;
}
