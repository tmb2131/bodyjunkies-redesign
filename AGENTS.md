# AGENTS.md

## Cursor Cloud specific instructions

### Overview

Bodyjunkies is a Next.js 16 (App Router) marketing/booking website for a boxing gym. It is a purely front-end app — no backend, no database, no auth, no environment variables. All dynamic content (booking, schedule, reviews) comes from embedded **Momence** widgets loaded via `<script>`/`<iframe>`.

### Running the app

- **Dev server:** `npm run dev` (starts on `localhost:3000` via Turbopack)
- **Lint:** `npm run lint` (ESLint 9 + eslint-config-next)
- **Build:** `npm run build` — note: there is a pre-existing TypeScript strict-mode error in `app/components/momence-personal-training-embed.tsx` (line 15, "Object is possibly 'undefined'") that causes the production build to fail. The dev server is unaffected.
- See `package.json` `scripts` for all available commands.

### Caveats

- No `.env` files or secrets are needed.
- Momence embeds (schedule, reviews, checkout) require internet access to render; they degrade gracefully without it.
- The lint has pre-existing issues (1 error + 1 warning) that are not agent-introduced.
