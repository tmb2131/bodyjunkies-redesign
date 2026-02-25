"use client";

import dynamic from "next/dynamic";

const MobileBottomNav = dynamic(
  () => import("./mobile-bottom-nav").then((module) => module.MobileBottomNav),
  { ssr: false }
);

export function MobileBottomNavLazy() {
  return <MobileBottomNav />;
}
