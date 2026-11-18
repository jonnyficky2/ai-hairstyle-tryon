# ADR-005 — Rendering: Canvas 2D

**Status:** APPROVED (2026-11-18)
**Date:** 2026-11-09

## Context

The MVP composites a camera frame with one transparent hairstyle image and must produce a snapshot.

## Problem statement

Which rendering technology should composite the live preview and snapshot?

## Options considered

1. Canvas 2D.
2. WebGL.
3. WebGPU.
4. CSS layering over a `<video>` element.

## Decision

Canvas 2D for the MVP.

## Rationale

- Sufficient for a single 2D overlay.
- Simple, predictable, universally supported.
- Snapshot is straightforward via `toBlob`.
- No shader or 3D pipeline to maintain.
- Easier to test and reason about.

## Trade-offs

- Per-frame full-canvas drawing can be expensive at high resolution.
- No advanced compositing, masks, or hair physics.
- Snapshot resolution is limited by the canvas we choose to allocate.
- Future occlusion or 3D hair would require WebGL/WebGPU.

## Consequences

- The canvas must be reused, not recreated per frame.
- Device pixel ratio handled once at sizing.
- Rendering and inference share the main thread initially.
- WebGL migration remains an option behind a new ADR.

## Verification requirements

- Frame timing measured (TASK-047).
- Snapshot dimensions and format verified (TASK-063).
- No per-frame allocation regressions in profiling (TASK-075).
