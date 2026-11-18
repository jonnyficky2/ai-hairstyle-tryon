# ADR-001 — Application Platform: Web

**Status:** APPROVED (2026-11-18)
**Date:** 2026-11-09
**Decision owner:** Project owner (approval: TASK-014)

## Context

The product must let users preview hairstyles on their own face with minimal friction. The target
audience uses both desktop and mobile browsers. The original planning document proposes a
responsive web application.

## Problem statement

Should the MVP ship as a web app, a native mobile app, or a desktop app?

## Options considered

1. Responsive web application.
2. Native mobile app (iOS/Android).
3. Desktop application (Electron/Tauri).
4. Hybrid (web + native shell).

## Decision

Build a responsive web application. No native or desktop client in the MVP.

## Rationale

- Zero install; a link is the entire distribution.
- One codebase for desktop and mobile browsers.
- Camera access is available through a standard browser API.
- On-device inference is feasible with WebAssembly.
- Fastest path to validating the core try-on experience.

## Trade-offs

- Dependent on browser camera and WebAssembly behavior.
- Less control over performance than native.
- iOS Safari has stricter media and memory behavior.
- No access to platform-specific camera APIs or depth sensors.

## Consequences

- The product must handle browser permission and compatibility differences.
- HTTPS is mandatory.
- Performance targets must be validated per browser/device.
- Future native apps would be a separate decision.

## Verification requirements

- Camera works on the minimum browser matrix (TASK-074).
- WASM inference runs on target devices (TASK-047).
- Production HTTPS deployment verified (TASK-082).
