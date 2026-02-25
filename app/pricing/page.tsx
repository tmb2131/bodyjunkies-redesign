import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Pricing & Memberships | Bodyjunkies",
  description:
    "Explore Bodyjunkies pricing pathways: Starter Pack, class bookings, and personal training options in Islington.",
};

export default function PricingPage() {
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

        <section className="rounded-2xl border border-white/15 bg-white/[0.03] p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            Pricing
          </p>
          <h1 className="mt-3 text-3xl font-black uppercase text-white sm:text-4xl">
            Choose Your Path
          </h1>
          <p className="mt-4 max-w-3xl text-sm text-white/80 sm:text-base">
            Start where you are. Move with intent. Build consistency round by
            round with clear options.
          </p>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <article className="rounded-2xl border border-[var(--bj-red)]/60 bg-[var(--bj-red)]/15 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/80">
                Most Popular Start
              </p>
              <h2 className="mt-3 text-2xl font-black uppercase text-white">
                Starter Pack
              </h2>
              <p className="mt-2 text-4xl font-black uppercase text-white">£49</p>
              <p className="mt-3 text-sm text-white/85">
                Best for beginners. Includes intro sessions and your gloves so
                you can build a proper base from day one.
              </p>
              <a
                href="/starter-pack"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-[var(--bj-red)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:scale-[1.02]"
              >
                Start Here
                <ArrowRight className="h-4 w-4" />
              </a>
            </article>

            <article className="rounded-2xl border border-white/15 bg-black/20 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/75">
                Experienced Track
              </p>
              <h2 className="mt-3 text-2xl font-black uppercase text-white">
                Class Booking
              </h2>
              <p className="mt-2 text-sm text-white/80">
                Already ready to move? Book straight into available sessions.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-white/85">
                <li>High-intensity boxing sessions</li>
                <li>Strength and conditioning blocks</li>
                <li>Live schedule availability</li>
              </ul>
              <a
                href="/schedule"
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:scale-[1.02]"
              >
                View Schedule
                <ArrowRight className="h-4 w-4" />
              </a>
            </article>

            <article className="rounded-2xl border border-white/15 bg-black/20 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/75">
                Personal Focus
              </p>
              <h2 className="mt-3 text-2xl font-black uppercase text-white">
                1:1 Coaching
              </h2>
              <p className="mt-2 text-sm text-white/80">
                Personal training for technique, conditioning, and goals that
                need tighter structure.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-white/85">
                <li>Book direct PT appointments</li>
                <li>Share goals with lead form</li>
                <li>Tailored coaching approach</li>
              </ul>
              <a
                href="/personal-training"
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:scale-[1.02]"
              >
                Book 1:1
                <ArrowRight className="h-4 w-4" />
              </a>
            </article>
          </div>

          <div className="mt-6 rounded-xl border border-white/15 bg-black/20 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
              Membership Notes
            </p>
            <p className="mt-2 text-sm text-white/85">
              Ongoing package and membership options can change by season and
              class demand. Confirm latest pricing and billing details at
              checkout in Momence.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
