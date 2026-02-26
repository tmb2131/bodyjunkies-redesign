"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarCheck2, Dumbbell, House, Mail, Wallet } from "lucide-react";
import { useEffect, useState, type MouseEvent } from "react";

const links = [
  { label: "Home", href: "/", icon: House },
  { label: "Services", href: "/#services", icon: Dumbbell },
  { label: "Pricing", href: "/pricing", icon: Wallet },
  { label: "Schedule", href: "/schedule", icon: CalendarCheck2 },
  { label: "Contact", href: "/contact", icon: Mail },
];
const CTA_REVEAL_VIEWPORT_RATIO = 0.2;

export function MobileBottomNav() {
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const [showStarterPackCta, setShowStarterPackCta] = useState(false);

  useEffect(() => {
    const updateHash = () => {
      setHash(window.location.hash);
    };

    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setHash(window.location.hash);
  }, [pathname]);

  useEffect(() => {
    const shouldTrackBeginnerCard = pathname === "/";

    if (!shouldTrackBeginnerCard) {
      setShowStarterPackCta(false);
      return;
    }

    const updateStarterPackVisibility = () => {
      const beginnerCard = document.getElementById("gateway-beginner-card");

      if (!beginnerCard) {
        setShowStarterPackCta(false);
        return;
      }

      const beginnerCardBounds = beginnerCard.getBoundingClientRect();
      const revealLine = window.innerHeight * CTA_REVEAL_VIEWPORT_RATIO;
      setShowStarterPackCta(beginnerCardBounds.bottom <= revealLine);
    };

    updateStarterPackVisibility();
    window.addEventListener("scroll", updateStarterPackVisibility, { passive: true });
    window.addEventListener("resize", updateStarterPackVisibility);

    return () => {
      window.removeEventListener("scroll", updateStarterPackVisibility);
      window.removeEventListener("resize", updateStarterPackVisibility);
    };
  }, [pathname]);

  const isActiveLink = (href: string) => {
    if (href.startsWith("/#")) {
      return pathname === "/" && hash === href.replace("/", "");
    }

    if (href === "/") {
      return pathname === "/" && hash === "";
    }

    return pathname === href;
  };

  const handleNavClick =
    (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
      if (typeof window === "undefined") return;

      if (href.startsWith("/#")) {
        setHash(href.slice(1));
        return;
      }

      if (href === "/" && pathname === "/") {
        event.preventDefault();

        if (window.location.hash) {
          window.history.replaceState(null, "", "/");
          setHash("");
        }

        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

  return (
    <nav
      aria-label="Mobile navigation"
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-white/15 bg-[color:var(--bj-navy)]/95 px-3 pb-[calc(0.8rem+env(safe-area-inset-bottom))] [transform:translateZ(0)] transition-[padding-top] duration-200 md:hidden ${showStarterPackCta ? "pt-2.5" : "pt-1.5"}`}
    >
      <motion.div
        initial={false}
        animate={
          showStarterPackCta
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 10, scale: 0.98 }
        }
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        className={`mx-auto flex max-w-lg justify-center overflow-hidden transition-[height,margin-bottom] duration-200 ${showStarterPackCta ? "mb-1.5 h-10" : "mb-0 h-0"}`}
        style={{ pointerEvents: showStarterPackCta ? "auto" : "none" }}
      >
        <motion.div whileTap={{ scale: 0.99 }} whileHover={{ scale: 1.01 }}>
          <Link
            href="/starter-pack"
            aria-label="Book Starter Pack £49"
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/15 bg-[var(--bj-red)]/95 px-4 py-2 text-xs font-bold uppercase tracking-[0.1em] text-white shadow-[0_6px_14px_rgba(148,4,5,0.24)]"
          >
            <CalendarCheck2 className="h-3.5 w-3.5" />
            Starter Pack £49
          </Link>
        </motion.div>
      </motion.div>
      <ul className="mx-auto grid max-w-lg grid-cols-5 gap-2 rounded-2xl border border-white/10 bg-black/20 px-2 py-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = isActiveLink(link.href);

          return (
            <motion.li key={link.label} whileTap={{ scale: 0.94 }}>
              <Link
                href={link.href}
                onClick={handleNavClick(link.href)}
                className={`flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl text-[11px] font-semibold uppercase tracking-[0.06em] transition ${isActive ? "bg-white/15 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18)]" : "text-white/70 hover:bg-white/10 hover:text-white"}`}
              >
                <Icon className={`h-4 w-4 transition-transform ${isActive ? "scale-105" : ""}`} />
                {link.label}
              </Link>
            </motion.li>
          );
        })}
      </ul>
    </nav>
  );
}
