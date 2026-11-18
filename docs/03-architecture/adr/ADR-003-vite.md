# ADR-003 — Build Tool: Vite

**Status:** APPROVED (2026-11-18)
**Date:** 2026-11-09

## Context

The app is a static single-page application with TypeScript, a WASM runtime, and static model and
image assets. Fast local iteration and a simple production build are required.

## Problem statement

Which build tool should produce the development server and production bundle?

## Options considered

1. Vite.
2. Webpack.
3. Parcel.
4. Rspack.
5. No bundler (native ESM).

## Decision

Vite 8.x.

## Rationale

- Native ESM dev server with fast startup.
- First-class TypeScript support.
- Simple static output suitable for HTTPS static hosting.
- Straightforward handling of static assets under `public/`.
- Verified Node requirement: `^20.19.0 || >=22.12.0`.

## Trade-offs

- WASM and large model files need explicit asset handling and cache headers.
- Less mature than Webpack for unusual legacy needs.
- Vite major versions move quickly; pinning is required.

## Consequences

- Node baseline becomes 22.12+ to also satisfy Vitest.
- Static assets are served from `public/` and referenced by absolute paths.
- Production output is a static folder with no server runtime.

## Verification requirements

- `npm run build` succeeds (TASK-021, TASK-080).
- Built app loads self-hosted WASM and model (TASK-040).
- Cache headers verified in deployment (TASK-081).
