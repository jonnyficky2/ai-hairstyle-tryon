# ADR-006 — Processing Location: Client-Side Only

**Status:** APPROVED (2026-11-18)
**Date:** 2026-11-09

## Context

Camera frames and face data are sensitive. The product principles require local processing and no
automatic uploads.

## Problem statement

Where should inference and rendering run: on the user's device, on a server, or both?

## Options considered

1. Client-side only.
2. Server-side inference.
3. Hybrid (client preview, server refinement).
4. Cloud generative replacement.

## Decision

Client-side only for the MVP. No backend, no upload endpoint, no server inference.

## Rationale

- Strongest privacy posture: frames never leave the device.
- No per-request inference cost.
- No backend to build, secure, or operate.
- Lower latency for live preview.
- Aligns with the product's privacy-first principle.

## Trade-offs

- Performance is bounded by the user's device.
- Model size and WASM must be downloaded.
- No server-side logging or model updates.
- Generative or photorealistic features are out of reach for the MVP.

## Consequences

- The app can be hosted as static files.
- Model and WASM must be self-hosted (ADR-011).
- Device performance must be benchmarked and disclosed.
- Any future cloud feature requires explicit consent and a new ADR.

## Verification requirements

- Network capture shows no image/video upload (TASK-076).
- Static deployment has no API dependency (TASK-081).
- Privacy notice matches actual behavior (TASK-017).
