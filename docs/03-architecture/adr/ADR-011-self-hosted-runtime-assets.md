# ADR-011 — Self-Host MediaPipe WASM and Model Assets

**Status:** APPROVED (2026-11-18)
**Date:** 2026-11-09
**Related:** ADR-004, ADR-006, ADR-010

## Context

The official MediaPipe examples load the WASM runtime and model from third-party CDNs. The product
promises local processing and predictable behavior.

## Problem statement

Should the MediaPipe runtime (`/wasm`) and `face_landmarker.task` be loaded from a public CDN or
served from the application's own origin?

## Options considered

1. Load both from a public CDN (jsDelivr) as in the official quickstart.
2. Self-host both from the application origin.
3. Self-host the model, load WASM from a CDN.
4. Self-host WASM, load the model from a CDN.

## Decision

Self-host both the WASM runtime and the model bundle from the application origin.

## Rationale

- No third-party request is needed to initialize face processing, which supports the privacy story.
- Removes a runtime dependency on CDN availability, version drift, and `@latest` resolution.
- Enables pinning and integrity control.
- Allows cache and compression tuning on our own host.
- Keeps production behavior reproducible.

## Trade-offs

- Adds static payload: model bundle is 3,758,596 bytes (VERIFIED), and the npm package contains
  multiple WASM variants (31.3 MB unpacked, not all served).
- Requires copying runtime files into the build and updating them on upgrades.
- Slightly more build configuration.

## Consequences

- The app must serve correct MIME types for `.wasm` and `.task`.
- Cache headers must be deliberate (hashed or versioned paths).
- A build-time step or documented copy procedure is required (TASK-040).
- CDN fallback is not implemented in the MVP.

## Verification requirements

- Network log shows no third-party runtime/model fetch (TASK-040, TASK-076).
- App initializes with the network blocked except the app origin (TASK-082).
- WASM and model load on the target browser matrix (TASK-074).
- Licensing terms for redistribution confirmed (TASK-014).
