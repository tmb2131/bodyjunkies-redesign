"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { trackEvent } from "../lib/analytics";

const LEAD_FORM_SCRIPT_SRC = "https://momence.com/plugin/lead-form/lead-form.js";
const IFRAME_ID = "iframe_appointments_93353";
const LEAD_FORM_CONTAINER_ID = "momence-plugin-lead-form";
const BOOKING_CONFIRMED_URL = "https://bodyjunkies.co.uk/booking-confirmed";
const APPOINTMENTS_BASE_URL = "https://momence.com/appointments/93353";

function withReturnUrl(url: string) {
  const nextUrl = new URL(url);
  // Add common return-url keys so completion can route back deterministically.
  nextUrl.searchParams.set("return_url", BOOKING_CONFIRMED_URL);
  nextUrl.searchParams.set("returnUrl", BOOKING_CONFIRMED_URL);
  return nextUrl.toString();
}

const APPOINTMENTS_URL = withReturnUrl(APPOINTMENTS_BASE_URL);

export function MomencePersonalTrainingEmbed() {
  const leadFormRef = useRef<HTMLDivElement>(null);
  const hasTrackedLeadSubmitRef = useRef(false);
  const hasTrackedBookingCompleteRef = useRef(false);

  useEffect(() => {
    function handleResizeMessage(e: MessageEvent) {
      const payload =
        typeof e.data === "object" && e.data !== null
          ? (e.data as { height?: number | string; type?: string })
          : {};
      const height = Number(payload.height ?? Number.NaN);
      const type = payload.type;
      const iframe = document.querySelector<HTMLIFrameElement>(`#${IFRAME_ID}`);

      if (!type || !type.match("iframe_appointments_93353_resize") || Number.isNaN(height) || !iframe) {
        return;
      }

      iframe.height = `${height}px`;

      const textPayload =
        typeof e.data === "string" ? e.data.toLowerCase() : JSON.stringify(e.data).toLowerCase();
      if (
        !hasTrackedBookingCompleteRef.current &&
        /(book|appointment|checkout).*(complete|success|confirmed)|confirmation/.test(
          textPayload
        )
      ) {
        hasTrackedBookingCompleteRef.current = true;
        trackEvent("booking_complete", {
          source: "momence_post_message",
          path: window.location.pathname,
        });
      }
    }

    window.addEventListener("message", handleResizeMessage, false);

    return () => {
      window.removeEventListener("message", handleResizeMessage, false);
    };
  }, []);

  useEffect(() => {
    const leadFormContainer = leadFormRef.current;
    if (!leadFormContainer) return;

    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${LEAD_FORM_SCRIPT_SRC}"]`
    );
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement("script");
    script.async = true;
    script.type = "module";
    script.id = "momence-plugin-lead-form-src";
    script.setAttribute("host_id", "93353");
    script.setAttribute("fields", "firstName,lastName,email,phoneNumber");
    script.setAttribute("token", "zyXo3KnqXB");
    script.setAttribute("country_code", "gb");
    script.setAttribute(
      "data-field-def",
      '{"firstName":{"type":"text","label":"First name","required":true},"lastName":{"type":"text","label":"Last name","required":true},"email":{"type":"email","label":"Email","required":true},"phoneNumber":{"type":"phone-number","label":"Phone number","required":true}}'
    );
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

    const onMessage = (event: MessageEvent) => {
      const message =
        typeof event.data === "string"
          ? event.data.toLowerCase()
          : JSON.stringify(event.data).toLowerCase();

      if (
        !hasTrackedLeadSubmitRef.current &&
        /(lead|form).*(submit|success)|enquiry|inquiry/.test(message)
      ) {
        hasTrackedLeadSubmitRef.current = true;
        trackEvent("pt_form_submit", {
          source: "lead_form_post_message",
          path: window.location.pathname,
        });
      }

      if (
        !hasTrackedBookingCompleteRef.current &&
        /(book|appointment|checkout).*(complete|success|confirmed)|confirmation/.test(
          message
        )
      ) {
        hasTrackedBookingCompleteRef.current = true;
        trackEvent("booking_complete", {
          source: "momence_post_message",
          path: window.location.pathname,
        });
      }
    };
    window.addEventListener("message", onMessage);

    return () => {
      leadFormContainer.removeEventListener("submit", onSubmit, true);
      window.removeEventListener("message", onMessage);
      script.remove();
    };
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4">
      <motion.article
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
          <iframe
            id={IFRAME_ID}
            src={APPOINTMENTS_URL}
            className="min-h-[60vh] w-full border-0"
            allowFullScreen
            scrolling="no"
            title="Bodyjunkies Personal Training Appointments"
          />
        </div>
      </motion.article>

      <motion.article
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
          <div ref={leadFormRef} className="min-h-[140px]" />
        </div>
      </motion.article>
    </div>
  );
}
