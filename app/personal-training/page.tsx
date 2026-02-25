import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MomencePersonalTrainingEmbed } from "../components/momence-personal-training-embed";

export const metadata = {
  title: "Personal Training | Bodyjunkies",
  description:
    "Book personal training sessions or share your goals through the lead form at Bodyjunkies.",
};

export default function PersonalTrainingPage() {
  return (
    <main className="min-h-screen bg-[#221E3A] pb-nav-offset">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.12em] text-white/80 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            Personal Training
          </p>
          <h1 className="mt-2 text-3xl font-black uppercase leading-tight text-white sm:text-4xl">
            1:1 Coaching
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-white/80 sm:text-base">
            Book a focused personal training slot, or send your goals first through the lead form.
          </p>
          <p className="mt-2 max-w-2xl text-xs uppercase tracking-[0.16em] text-white/65">
            Goal-first if you need direction. Direct booking if you are ready.
          </p>
        </div>
        <MomencePersonalTrainingEmbed />
      </div>
      <div className="fixed inset-x-0 bottom-[calc(var(--mobile-nav-height)+0.75rem)] z-40 px-4 md:hidden">
        <div className="mx-auto flex w-full max-w-md gap-2 rounded-2xl border border-white/15 bg-[#221E3A]/95 p-2 backdrop-blur">
          <Link
            href="/starter-pack"
            className="inline-flex flex-1 items-center justify-center rounded-full bg-[var(--bj-red)] px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-white"
          >
            Starter Pack £49
          </Link>
          <Link
            href="/schedule"
            className="inline-flex flex-1 items-center justify-center rounded-full border border-white/35 bg-white/10 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-white"
          >
            Class Schedule
          </Link>
        </div>
      </div>
    </main>
  );
}
