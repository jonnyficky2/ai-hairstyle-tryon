# ADR-004 — Face Tracking: MediaPipe Face Landmarker

**Status:** APPROVED (2026-11-18)
**Date:** 2026-11-09
**Research:** `docs/04-ai-research/ai-research.md`, `docs/04-ai-research/model-evaluation.md`

## Context

The overlay needs a stable facial reference frame: face position, scale, and orientation. The
original planning document proposes MediaPipe.

## Problem statement

Which face tracking technology provides the best trade-off between accuracy, on-device privacy,
browser support, licensing, and integration effort for a live 2D hairstyle overlay?

## Options considered

1. MediaPipe Face Landmarker (`@mediapipe/tasks-vision`).
2. TensorFlow.js face-landmarks-detection.
3. face-api.js.
4. Commercial AR SDK (Banuba, DeepAR).
5. Cloud vision API.
6. Custom model.

## Decision

Use MediaPipe Face Landmarker in `VIDEO` running mode with 478 landmarks and the optional 4×4
transformation matrix. **PROPOSED**, not approved.

## Rationale

- On-device execution; no image upload.
- Documented output: 478 landmarks, optional 52 blendshapes, optional pose matrix (VERIFIED).
- Apache-2.0 SDK license (VERIFIED).
- Maintained web package and official setup guide (VERIFIED).
- Single call returns both landmarks and pose, simplifying the pipeline.
- `numFaces: 1` enables built-in temporal smoothing (VERIFIED).

## Trade-offs

- Web API has no `LIVE_STREAM` mode; must use `VIDEO` + `requestAnimationFrame` (VERIFIED).
- Inference is synchronous on the calling thread; may compete with rendering.
- The model describes the face, **not the hairline or skull**; overlay alignment requires
  calibration and is not automatic.
- No documented per-face confidence field; confidence must be derived heuristically.
- Model bundle licensing and redistribution terms need confirmation.
- Performance on mid-range mobile is unverified.
- Accuracy across skin tones, lighting, and hair types is unverified.

## Consequences

- A calibration step is mandatory for every hairstyle asset.
- The MVP supports near-frontal views only.
- Self-hosting of WASM/model is required for privacy and reliability (ADR-011).
- A fallback to CPU delegate is required.
- Benchmarking (TASK-047) is a gate before claiming performance.

## Verification requirements

- Landmark count and output shape asserted by tests (TASK-046).
- Pose direction correctness verified with known head movements (TASK-043).
- Alignment quality verified visually for each approved asset (TASK-058).
- Performance measured against the benchmark plan (TASK-047).
- Model license confirmed (TASK-015/TASK-014).
