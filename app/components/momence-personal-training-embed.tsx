"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { trackEvent } from "../lib/analytics";

const LEAD_FORM_SCRIPT_SRC = "https://momence.com/plugin/lead-form/lead-form.js";
const IFRAME_ID = "iframe_appointments_93353";
const LEAD_FORM_CONTAINER_ID = "momence-plugin-lead-form";
const BOOKING_CONFIRMED_URL = "https://bodyjunkies.co.uk/booking-confirmed";
const APPOINTMENTS_BASE_URL = "https://momence.com/appointments/93353";
const FALLBACK_BOOKING_URL = APPOINTMENTS_BASE_URL;
const BOOKING_COMPLETE_PATTERN =
  /(book|appointment|checkout).*(complete|success|confirmed)|confirmation/;
const LEAD_SUBMIT_PATTERN = /(lead|form).*(submit|success)|enquiry|inquiry/;

function withReturnUrl(url: string) {
  const nextUrl = new URL(url);
  // Add common return-url keys so completion can route back deterministically.
  nextUrl.searchParams.set("return_url", BOOKING_CONFIRMED_URL);
  nextUrl.searchParams.set("returnUrl", BOOKING_CONFIRMED_URL);
  return nextUrl.toString();
}

const APPOINTMENTS_URL = withReturnUrl(APPOINTMENTS_BASE_URL);

function isMomenceOrigin(origin: string) {
  if (!origin) return false;
  try {
    const hostname = new URL(origin).hostname;
    return hostname === "momence.com" || hostname.endsWith(".momence.com");
  } catch {
    return false;
  }
}

function getMessageText(data: unknown) {
  if (typeof data === "string") return data.toLowerCase();
  if (!data || typeof data !== "object") return "";
  const payload = data as Record<string, unknown>;
  const textParts = ["type", "event", "status", "message", "action", "name"]
    .map((key) => payload[key])
    .filter((value): value is string => typeof value === "string")
    .map((value) => value.toLowerCase());
  return textParts.join(" ");
}

export function MomencePersonalTrainingEmbed() {
  const leadFormRef = useRef<HTMLDivElement>(null);
  const hasTrackedLeadSubmitRef = useRef(false);
  const hasTrackedBookingCompleteRef = useRef(false);
  const [appointmentsStatus, setAppointmentsStatus] = useState<
    "idle" | "loading" | "ready" | "error"
  >("loading");
  const [leadFormStatus, setLeadFormStatus] = useState<
    "idle" | "loading" | "ready" | "error"
  >("loading");
  const shouldLoadAppointments = true;
  const shouldLoadLeadForm = true;

  useEffect(() => {
    if (!shouldLoadAppointments && !shouldLoadLeadForm) return;

    function handleMomenceMessage(event: MessageEvent) {
      if (!isMomenceOrigin(event.origin)) return;

      const payload =
        typeof event.data === "object" && event.data !== null
          ? (event.data as { height?: number | string; type?: string })
          : {};
      const height = Number(payload.height ?? Number.NaN);
      const type = payload.type;
      if (shouldLoadAppointments && type?.includes("iframe_appointments_93353_resize")) {
        const iframe = document.querySelector<HTMLIFrameElement>(`#${IFRAME_ID}`);
        if (!Number.isNaN(height) && iframe) {
          iframe.height = `${height}px`;
        }
      }

      const textPayload = getMessageText(event.data);
      if (
        !hasTrackedBookingCompleteRef.current &&
        BOOKING_COMPLETE_PATTERN.test(textPayload)
      ) {
        hasTrackedBookingCompleteRef.current = true;
        trackEvent("booking_complete", {
          source: "momence_post_message",
          path: window.location.pathname,
        });
      }

      if (!hasTrackedLeadSubmitRef.current && LEAD_SUBMIT_PATTERN.test(textPayload)) {
        hasTrackedLeadSubmitRef.current = true;
        trackEvent("pt_form_submit", {
          source: "lead_form_post_message",
          path: window.location.pathname,
        });
      }
    }

    window.addEventListener("message", handleMomenceMessage, false);
    return () => {
      window.removeEventListener("message", handleMomenceMessage, false);
    };
  }, [shouldLoadAppointments, shouldLoadLeadForm]);

  useEffect(() => {
    if (!shouldLoadLeadForm) return;
    const leadFormContainer = leadFormRef.current;
    if (!leadFormContainer) return;

    const script = document.createElement("script");
    script.async = true;
    script.type = "module";
    script.id = "momence-plugin-lead-form-src";
    script.setAttribute("fetchpriority", "low");
    script.setAttribute("host_id", "93353");
    script.setAttribute("fields", "firstName,lastName,email,phoneNumber");
    script.setAttribute("token", "zyXo3KnqXB");
    script.setAttribute("country_code", "gb");
    script.setAttribute(
      "data-field-def",
      '{"firstName":{"type":"text","label":"First name","required":true},"lastName":{"type":"text","label":"Last name","required":true},"email":{"type":"email","label":"Email","required":true},"phoneNumber":{"type":"phone-number","label":"Phone number","required":true}}'
    );
    script.onload = () => setLeadFormStatus("ready");
    script.onerror = () => setLeadFormStatus("error");
    script.src = LEAD_FORM_SCRIPT_SRC;

    leadFormContainer.innerHTML = "";
    const wrapper = document.createElement("div");
    wrapper.id = LEAD_FORM_CONTAINER_ID;
    leadFormContainer.appendChild(wrapper);
    leadFormContainer.appendChild(script);

    const onSubmit = () => {
      if (hasTrackedLeadSubmitRef.current) return;
      hasTrackedLeadSubmitRef.current = true;
      trackEvent("pt_form_submit", {
        source: "lead_form",
        path: window.location.pathname,
      });
    };
    leadFormContainer.addEventListener("submit", onSubmit, true);

    return () => {
      leadFormContainer.removeEventListener("submit", onSubmit, true);
      script.remove();
    };
  }, [shouldLoadLeadForm]);

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="rounded-2xl border border-white/15 bg-white/[0.02] p-4 sm:p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
          Choose Your Route
        </p>
        <p className="mt-2 text-sm text-white/80 sm:text-base">
          New to 1:1 coaching? Share your goal first. Ready now? Book your slot straight away.
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <a
            href="#pt-goal"
            className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Share Goal First
          </a>
          <a
            href="#pt-book"
            className="inline-flex items-center justify-center rounded-full bg-[var(--bj-red)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Book Slot Now
          </a>
        </div>
      </div>
      <motion.article
        id="pt-book"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.4 }}
        whileHover={{ y: -3 }}
        className="group rounded-2xl border border-white/15 bg-white/[0.02] p-4 sm:p-6"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
          Appointments
        </p>
        <h2 className="mt-2 text-3xl font-black uppercase leading-tight text-white sm:text-4xl">
          Book Personal Training
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-white/80 sm:text-base">
          Choose a 1:1 slot that fits your week and lock it in directly below.
        </p>
        <div className="mt-5 overflow-hidden rounded-xl border border-white/15 bg-black/20 p-2 sm:p-3">
          {appointmentsStatus === "loading" ? (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 px-5 text-center">
              <div className="h-10 w-10 animate-pulse rounded-full border border-white/25 bg-white/10" />
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/75">
                Loading Personal Training Appointments
              </p>
            </div>
          ) : null}
          {appointmentsStatus === "error" ? (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-5 text-center">
              <p className="max-w-md text-sm text-white/80">
                Booking did not load. Open appointments directly in a new tab.
              </p>
              <a
                href={FALLBACK_BOOKING_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[var(--bj-red)] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Open Booking In New Tab
              </a>
            </div>
          ) : null}
          {shouldLoadAppointments && appointmentsStatus !== "error" ? (
            <iframe
              id={IFRAME_ID}
              src={APPOINTMENTS_URL}
              className="min-h-[60vh] w-full border-0"
              allowFullScreen
              scrolling="no"
              loading="lazy"
              title="Bodyjunkies Personal Training Appointments"
              onLoad={() => setAppointmentsStatus("ready")}
              onError={() => setAppointmentsStatus("error")}
            />
          ) : null}
        </div>
      </motion.article>

      <motion.article
        id="pt-goal"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.4, delay: 0.04 }}
        whileHover={{ y: -3 }}
        className="group rounded-2xl border border-white/15 bg-white/[0.02] p-4 sm:p-6"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
          Lead Form
        </p>
        <h2 className="mt-2 text-3xl font-black uppercase leading-tight text-white sm:text-4xl">
          Share Your Goal First
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-white/80 sm:text-base">
          Reach out and we&apos;ll discuss where you are now and what you want from your sessions.
        </p>
        <div className="mt-5 rounded-xl border border-white/10 bg-black/20 p-3 sm:p-4">
          {leadFormStatus === "loading" ? (
            <div className="flex min-h-[140px] flex-col items-center justify-center gap-3 px-5 text-center">
              <div className="h-10 w-10 animate-pulse rounded-full border border-white/25 bg-white/10" />
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/75">
                Loading Goal Form
              </p>
            </div>
          ) : null}
          {leadFormStatus === "error" ? (
            <div className="flex min-h-[140px] flex-col items-center justify-center gap-3 px-5 text-center">
              <p className="max-w-md text-sm text-white/80">
                Form did not load. Use appointments and add goals in your note.
              </p>
              <a
                href={FALLBACK_BOOKING_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Open Appointments
              </a>
            </div>
          ) : null}
          <div ref={leadFormRef} className="min-h-[140px]" />
        </div>
      </motion.article>
    </div>
  );
}
