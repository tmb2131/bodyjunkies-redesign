---
name: bodyjunkies-ui-patterns
description: Apply Bodyjunkies website redesign standards—Next.js 15+ App Router, Tailwind, shadcn/ui, micro-interactions, framer-motion, high-contrast palette (Navy/White/Black/Red). Use when building or editing UI components, pages, layouts, or styling in the Bodyjunkies project, or when the user mentions design, "wow factor," hero, CTA, or Starter Pack.
---

# Bodyjunkies UI & Project Patterns

Apply this skill whenever you create or modify UI, components, or pages in the Bodyjunkies codebase so patterns are used consistently without being asked.

**Source of truth:** For current project rules, tech stack, and critical business logic, follow `.cursor/rules/main.mdc` as the source of truth.

## Tech Stack

- **Framework:** Next.js 15+ (App Router)
- **Styling:** Tailwind CSS
- **UI Library:** shadcn/ui
- **Icons:** Lucide React
- **Motion:** framer-motion (scroll animations, micro-interactions)

## Coding Standards

- Functional components only; no class components.
- Default to Server Components unless interactivity (`useState`, `useEffect`, etc.) is required.
- Mobile-first layout and styles.
- Be concise; avoid explaining standard patterns unless asked.

## “Wow Factor” (Apply by Default)

- **Micro-interactions:** Add subtle hover/active feedback on interactive elements (buttons, cards, links)—e.g. scale, opacity, or light transition.
- **Scroll animations:** Use `framer-motion` for section reveals (fade/slide on scroll).
- **Contrast:** Prefer high contrast—Black, White, and Action Red; avoid muddy or low-contrast combinations.
- **Media:** Use large, optimized images and lazy-loaded video where relevant.

## Brand & Visual System

- **Background:** Navy `#221E3A`
- **Text / space:** White `#FFFFFF`
- **Edge / contrast:** Black `#000000`
- **Primary CTA / hero:** Red `#940405`
- **Secondary accent / community:** Orange `#F69523`
- **Cards (mobile):** Glassmorphism where it fits depth without cluttering.
- **Buttons:** Primary = Hero Red; hover/active = subtle scale (e.g. `scale-105`).
- **Layout:** Plenty of negative space; avoid clutter.
- **Accessibility:** All text/background combos must meet WCAG 2.1 AA.

Typography: Nourd Bold (headings, caps), Aileron Regular (body), Monument Hollow only for rare hero/quote statements.

## Critical Business Rules

- **Hero CTA:** Do not remove the “Starter Pack” (£49) CTA from the hero section.
- **Copy and data:** Use `business_context.md` for gym details, prices, and marketing copy.

## When You Apply This Skill

- Adding or editing components, pages, or layouts.
- Implementing or refining buttons, cards, hero, or CTAs.
- Choosing colors, typography, or motion.
- Ensuring hero and pricing/CTA content stay aligned with business rules.

Reference `.cursor/rules/ui-standards.mdc` for full brand and accessibility details; reference `business_context.md` for copy and data.
