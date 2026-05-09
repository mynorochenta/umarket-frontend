# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # start dev server (Next.js Turbopack)
npm run build    # production build
npm run start    # serve production build
npm run lint     # ESLint 9 flat config (eslint.config.mjs)
```

No test runner is configured yet.

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.2.6 (App Router) |
| UI | React 19.2.4 |
| Language | TypeScript 5 — strict mode |
| Styling | Tailwind CSS v4 via `@tailwindcss/postcss` |
| Linting | ESLint 9 flat config with `next/core-web-vitals` + `next/typescript` |

## Architecture

App Router only — no `src/` directory. Routes live under `app/`.

```
app/
  layout.tsx   # root layout — Geist fonts, html/body shell
  page.tsx     # home route
  globals.css  # Tailwind v4 entry (@import "tailwindcss")
public/        # static assets
```

**Path alias**: `@/*` resolves to the project root (e.g. `@/app/...`, `@/components/...`).

**Fonts**: Geist Sans (`--font-geist-sans`) and Geist Mono (`--font-geist-mono`) loaded via `next/font/google` and applied as CSS variables on `<html>`.

**Tailwind v4** uses a CSS-first config — theme tokens are defined in `globals.css` with `@theme`, not `tailwind.config.js`.
