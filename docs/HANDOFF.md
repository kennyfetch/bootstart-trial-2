# Handoff

Snapshot of where the work stands, so anyone — human or AI — can pick it up without the chat history.
Overwritten (not appended) at the end of each session by the `handoff` workflow. Git is the log.
Keep it under ~60 lines.

**Last updated:** 2026-10-19 · **Branch:** `main`

## Current state

- Project initialized from Bootstart: TypeScript + Vite + React (ADR 0001), team mode, MIT.
- `just dev` serves an empty page (heading only); `just check` passes.
- `src/pricing.ts` and its tests are the template's example module, kept as a conventions guide.

## In progress

- _Nothing._

## Next steps

1. First feature: convert a value between two length units (`/feature`).
2. Delete `src/pricing.ts` and `tests/pricing.test.ts` once real code is tested.

## Pitfalls

- Component tests run in jsdom (`vitest.config.ts`); `src/main.tsx` is excluded from coverage.

## Open questions

- _None._
