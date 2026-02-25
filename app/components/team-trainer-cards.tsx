"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type Trainer = {
  id: string;
  name: string;
  role: string;
  image: string;
  alt: string;
  professionalInfo: string;
  personalStyle: string;
};

const trainers: Trainer[] = [
  {
    id: "jordan",
    name: "Jordan Hale",
    role: "Head Boxing Coach",
    image: "/assets/%28WEB%29BODYJUNKIES_210124_0647.jpg",
    alt: "Jordan coaching combinations on the pads",
    professionalInfo:
      "England Boxing certified with 10+ years coaching amateurs and first-time members. Focused on clean mechanics, ring IQ, and measurable progress.",
    personalStyle:
      "Direct and technical. Jordan keeps rounds sharp, calls out details fast, and builds confidence through repetition under pressure.",
  },
  {
    id: "mara",
    name: "Mara Singh",
    role: "Strength & Conditioning Coach",
    image: "/assets/%28WEB%29BODYJUNKIES_210124_0647.jpg",
    alt: "Mara leading a conditioning block on the gym floor",
    professionalInfo:
      "Specialist in boxing-specific strength systems and energy development. Designs progressive blocks that support power, movement quality, and recovery.",
    personalStyle:
      "Calm intensity. Mara balances hard output with smart pacing so members can push without burning out.",
  },
  {
    id: "eli",
    name: "Eli Brooks",
    role: "Fundamentals Coach",
    image: "/assets/%28WEB%29BODYJUNKIES_210124_0647.jpg",
    alt: "Eli teaching guard, footwork, and stance",
    professionalInfo:
      "Works with beginners building stance, guard, footwork, and punch sequencing. Known for turning complex boxing cues into simple repeatable actions.",
    personalStyle:
      "Patient and clear. Eli slows the right moments down, then layers speed once movement quality is locked in.",
  },
  {
    id: "tasha",
    name: "Tasha Reid",
    role: "Performance Boxing Coach",
    image: "/assets/%28WEB%29BODYJUNKIES_210124_0647.jpg",
    alt: "Tasha running high-tempo bag and pad rounds",
    professionalInfo:
      "Leads intermediate and advanced sessions centered on tempo control, combination depth, and tactical transitions between offense and defense.",
    personalStyle:
      "High-energy and demanding. Tasha pushes intent every round while keeping technique tight and accountable.",
  },
];

export function TeamTrainerCards() {
  const [openId, setOpenId] = useState<string | null>(trainers[0]?.id ?? null);

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {trainers.map((trainer) => {
        const isOpen = trainer.id === openId;
        const panelId = `trainer-panel-${trainer.id}`;

        return (
          <motion.article
            key={trainer.id}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden rounded-2xl border border-white/15 bg-white/[0.03]"
          >
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenId((current) => (current === trainer.id ? null : trainer.id))}
              className="group block w-full text-left"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={trainer.image}
                  alt={trainer.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-4">
                  <div>
                    <p className="text-xl font-black uppercase text-white">{trainer.name}</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/80">
                      {trainer.role}
                    </p>
                  </div>
                  <span className="rounded-full border border-white/30 bg-white/10 p-2 text-white backdrop-blur-sm">
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </span>
                </div>
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="space-y-4 border-t border-white/10 p-4">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">
                        Professional
                      </p>
                      <p className="mt-2 text-sm text-white/85">{trainer.professionalInfo}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">
                        Personal Style
                      </p>
                      <p className="mt-2 text-sm text-white/85">{trainer.personalStyle}</p>
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.article>
        );
      })}
    </div>
  );
}
