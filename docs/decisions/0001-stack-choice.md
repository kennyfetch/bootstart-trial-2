# 0001 — Stack choice

- **Status:** Accepted
- **Date:** 2026-10-19

## Context

The project is a single web page that converts values between units of length, mass and
temperature. It runs entirely in the browser as a static page: no back-end, no SEO or server
rendering needs, no hard constraint on hosting or performance. It is maintained by a small team
working with AI coding agents.

## Options considered

1. **TypeScript + Vite + React** — the default for a single-page front-end in `docs/STACKS.md`;
   mature tooling and the best AI-agent familiarity; slightly heavier than needed for one page.
2. **SvelteKit** — smaller and simpler for a tiny UI; less agent familiarity and no shipped pack.

## Decision

TypeScript + Vite + React on top of the `typescript` pack: pnpm, Biome (format + lint), `tsc`
(strict), Vitest with V8 coverage. Components are tested in jsdom with React Testing Library.

## Consequences

- The `just` recipes, CI and Dependabot come from the pack; `just dev` starts the Vite dev server.
- React, Vite, jsdom and Testing Library are the only dependencies added to the pack.
- Static output: the page can be hosted anywhere that serves files.
