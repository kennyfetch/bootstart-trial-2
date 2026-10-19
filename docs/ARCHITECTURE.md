# Architecture

One page, kept current. Describe the shape of the system; details belong in code, and the reasons
behind choices belong in `docs/decisions/`.

## Purpose

A web page that converts values between units of length, mass and temperature, for anyone who
needs a quick conversion in the browser.

## Context

A static single-page app running in the browser. It talks to no external system: no API, no
storage, no network calls after the page loads.

## Module map

| Path | Responsibility |
|---|---|
| `index.html` | HTML shell that loads `src/main.tsx` |
| `src/main.tsx` | Browser entry point: mounts `<App />` into `#root` |
| `src/app.tsx` | Root component of the page |
| `src/pricing.ts` | Template example module — delete once real code is tested |

## Main flows

_The two or three most important flows, step by step (e.g. "an order is placed")._

## Constraints

- Runs offline once loaded; no server-side code.
- Any static hosting must work: no runtime configuration or secrets.

## Key decisions

_Links to the ADRs that explain the structure above._

- [0001 — Stack choice](decisions/0001-stack-choice.md)
