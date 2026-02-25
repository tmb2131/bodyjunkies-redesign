"use client";

import { motion } from "framer-motion";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowRight, Flame, ShieldCheck, Sparkles, Users } from "lucide-react";
import { useState } from "react";

const values = ["Community", "Accountability", "Empowerment", "Growth"];
const STARTER_PACK_PATH = "/starter-pack";

const storyCards = [
  {
    title: "Why",
    copy: "We believe life is better when we ignite our inner fire, test our limits, and lift each other higher.",
    icon: Flame,
  },
  {
    title: "How",
    copy: "We challenge anyone with an inner fire to train like a boxer by building strength, resilience, and confidence through expert coaching, personal guidance, and a tribe that rises together.",
    icon: ShieldCheck,
  },
  {
    title: "What",
    copy: "Bodyjunkies delivers dynamic small-group Boxing & Fitness sessions led by expert coaches who inspire and challenge us, with personal guidance, progress tracking, and recognition to keep us accountable and motivated.",
    icon: Sparkles,
  },
];

export function AboutContent() {
  const { scrollY } = useScroll();
  const [showFloatingCta, setShowFloatingCta] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setShowFloatingCta(latest > 760);
  });

  return (
    <>
      <div className="space-y-5 sm:space-y-6">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-white/15 bg-white/[0.03] p-6 sm:p-8"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            Fuel Your Fire
          </p>
          <h1 className="mt-3 text-3xl font-black uppercase leading-tight text-white sm:text-4xl">
            About Bodyjunkies
          </h1>
          <p className="mt-4 max-w-3xl text-sm text-white/85 sm:text-base">
            We bring the grit back to boxing through dynamic, people-focused
            small-group classes for anyone ready to train with intent.
          </p>
          <motion.a
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: 1.02 }}
            href={STARTER_PACK_PATH}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm"
          >
            Starter Pack £49
            <ArrowRight className="h-4 w-4" />
          </motion.a>
        </motion.section>

        <section className="grid gap-4 md:grid-cols-2">
        <motion.article
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
          whileHover={{ y: -3 }}
          className="rounded-2xl border border-white/15 bg-white/[0.03] p-6 sm:p-8"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            Mission
          </p>
          <p className="mt-3 text-sm text-white/85 sm:text-base">
            Our mission is to bring the grit back to boxing through dynamic
            people-focused small-group classes. Our training regime and boxing
            protocols invite anyone with an inner fire to test their limits and
            prove their power, in and out of the ring.
          </p>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, delay: 0.04 }}
          whileHover={{ y: -3 }}
          className="rounded-2xl border border-white/15 bg-white/[0.03] p-6 sm:p-8"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            Vision
          </p>
          <p className="mt-3 text-sm text-white/85 sm:text-base">
            Our vision is to give people physical strength and fitness, mental
            fortitude, and confidence through developing healthy relationships
            with exercise.
          </p>
        </motion.article>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
        {storyCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              whileHover={{ y: -3 }}
              className="rounded-2xl border border-white/15 bg-white/[0.03] p-6"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                <Icon className="h-4 w-4 text-white" />
              </span>
              <h2 className="mt-4 text-2xl font-black uppercase text-white">
                {card.title}
              </h2>
              <p className="mt-3 text-sm text-white/85">{card.copy}</p>
            </motion.article>
          );
        })}
        </section>

        <motion.section
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl border border-white/15 bg-white/[0.03] p-6 sm:p-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
          What We Stand For
        </p>
        <h2 className="mt-3 text-3xl font-black uppercase text-white sm:text-4xl">
          Values In Every Session
        </h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {values.map((value) => (
            <div
              key={value}
              className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/5 px-4 py-3"
            >
              <Users className="h-4 w-4 text-[var(--bj-orange)]" />
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-white">
                {value}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-5 max-w-3xl text-sm text-white/85 sm:text-base">
          We stand for community, accountability, empowerment, and growth, and
          we express it through boxing and fitness.
        </p>
        </motion.section>

        <motion.section
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl border border-white/15 bg-white/[0.03] p-6 sm:p-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
          The Tribe
        </p>
        <h2 className="mt-3 text-3xl font-black uppercase text-white sm:text-4xl">
          Built Inside And Outside The Studio
        </h2>
        <p className="mt-4 max-w-3xl text-sm text-white/85 sm:text-base">
          Beyond sessions, we come together through social adventures including
          bootcamps abroad, boxing events, and regular get-togethers that keep
          the tribe connected and rising together.
        </p>
        </motion.section>

        <motion.section
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl border border-white/15 bg-white/[0.03] p-6 sm:p-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
          Start Your Lane
        </p>
        <h2 className="mt-3 text-3xl font-black uppercase text-white sm:text-4xl">
          Train Your Way In
        </h2>
        <p className="mt-4 max-w-3xl text-sm text-white/85 sm:text-base">
          New to boxing? Start with the Starter Pack. Already training and ready
          to move? Lock your next class slot now.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="/starter-pack"
            className="inline-flex items-center justify-center rounded-full bg-[var(--bj-red)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white"
          >
            Starter Pack £49
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="/schedule"
            className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white"
          >
            View Class Schedule
          </motion.a>
        </div>
        </motion.section>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: showFloatingCta ? 1 : 0, y: showFloatingCta ? 0 : 16 }}
        transition={{ duration: 0.25 }}
        className="pointer-events-none fixed inset-x-4 bottom-[calc(5.5rem+env(safe-area-inset-bottom))] z-50 flex justify-center md:inset-x-auto md:right-6 md:bottom-6"
      >
        <motion.a
          whileTap={{ scale: 0.98 }}
          whileHover={{ scale: 1.02 }}
          href={STARTER_PACK_PATH}
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/40 bg-black/70 px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-sm"
        >
          Starter Pack £49
          <ArrowRight className="h-4 w-4" />
        </motion.a>
      </motion.div>
    </>
  );
}
