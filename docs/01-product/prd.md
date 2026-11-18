# Product Requirements Document (PRD)

> Status: Draft — awaiting approval (TASK-013) · Last updated: 2026-11-09
> This is the authoritative product requirements document. The original planning document is
> preserved unmodified at `docs/09-project-history/original-planning-document-v1.0.md`.

## 1. Product summary

A responsive web app that renders hairstyles over a live camera feed and lets users compare,
save, and download the result. Client-side processing is the default. The MVP validates camera
reliability, face tracking, and overlay alignment.

## 2. Goals and non-goals

Goals and non-goals are defined in `docs/00-project-overview/product-vision.md` and
`docs/01-product/product-scope.md`. This PRD does not repeat them.

## 3. Functional requirements

Priority: P0 = MVP blocker, P1 = MVP supporting, P2 = post-MVP.

| ID | Requirement | Priority | Acceptance |
|---|---|---|---|
| FR-01 | Request camera permission and start a front-facing video stream after an explicit user action. | P0 | AC-01 |
| FR-02 | Detect a single face in the camera stream and expose a detected/not-detected state. | P0 | AC-02 |
| FR-03 | Obtain 478 facial landmarks continuously at a usable rate. | P0 | AC-03 |
| FR-04 | Estimate head position, scale, and orientation (yaw, pitch, roll) from tracking output. | P0 | AC-04 |
| FR-05 | Render a transparent hairstyle asset aligned to the head. | P0 | AC-05 |
| FR-06 | Update the overlay every processed frame so it follows head movement. | P0 | AC-06 |
| FR-07 | Switch hairstyles without stopping the camera or losing tracking. | P0 | AC-07 |
| FR-08 | Present a catalog of hairstyles with thumbnails and category filters. | P1 | AC-08 |
| FR-09 | Allow the user to adjust overlay size and vertical position and to toggle the overlay. | P1 | AC-09 |
| FR-10 | Capture a snapshot of the composed camera frame and overlay. | P1 | AC-10 |
| FR-11 | Download the snapshot as an image file. | P1 | AC-11 |
| FR-12 | Persist favorite hairstyles in local storage. | P1 | AC-12 |
| FR-13 | Present clear states and recovery guidance for camera and tracking failures. | P0 | AC-13 |
| FR-14 | Work on desktop and mobile layouts without horizontal scrolling or unreachable controls. | P0 | AC-14 |
| FR-15 | Stop the camera when the user stops the session or leaves the try-on screen. | P0 | AC-15 |
| FR-16 | Provide a privacy notice and require explicit consent before camera start. | P0 | AC-16 |
| FR-17 | Display an explicit "face not detected" and "tracking lost" state instead of a stale overlay. | P0 | AC-17 |
| FR-18 | Offer a way to retry camera initialization after a recoverable error. | P1 | AC-18 |

## 4. Non-functional requirements

| ID | Requirement | Priority | Verification |
|---|---|---|---|
| NFR-01 | Camera initialization under 5 s on supported devices (target, not a verified benchmark). | P0 | Benchmark plan |
| NFR-02 | Desktop preview target 24–30 FPS; mid-range mobile target 15–24 FPS. | P0 | Benchmark plan |
| NFR-03 | Tracking-to-render latency target under 150 ms. | P0 | Benchmark plan |
| NFR-04 | Camera access only in a secure context (HTTPS or localhost). | P0 | Security tests |
| NFR-05 | No automatic upload of camera frames, video, or snapshots. | P0 | Privacy verification |
| NFR-06 | No face recognition or biometric identification. | P0 | Privacy verification |
| NFR-07 | Usable with keyboard and screen-reader-compatible controls; visible focus. | P1 | Accessibility pass |
| NFR-08 | Application remains responsive during inference; no blocking main-thread work over 50 ms per frame. | P1 | Performance profiling |

## 5. Constraints

- Browser-only, no native app, no backend for the MVP.
- MediaPipe WASM and model assets must be served from the application origin (ADR-011).
- Camera permission is user-controlled and may be denied or revoked at any time.
- The supported head-angle range for the MVP is limited to near-frontal views. Extreme angles are
  explicitly not guaranteed.
- Supported browsers must be verified in TASK-074 before release.

## 6. Assumptions

| ID | Assumption | Validation task |
|---|---|---|
| A-01 | MediaPipe Face Landmarker runs acceptably on target mid-range mobile hardware. | TASK-047, TASK-075 |
| A-02 | 478 landmarks provide a sufficient basis for near-frontal overlay alignment. | TASK-058 |
| A-03 | Transparent 2D assets can look acceptable without 3D hair simulation. | TASK-058, TASK-073 |
| A-04 | Self-hosted WASM/model assets load fast enough on mobile networks. | TASK-047 |
| A-05 | A single front-facing camera stream is sufficient for the MVP. | TASK-031 |

## 7. Product questions — resolved 2026-11-18 (TASK-016)

| # | Question | Decision |
|---|---|---|
| 1 | UI language | English UI copy, all strings in one module so a second language can be added without touching components. |
| 2 | Multi-face policy | Detect one face (`numFaces: 1`). Additional faces in frame are ignored silently; no warning, no blocking. |
| 3 | Supported head-angle claim | Near-frontal only: ±25° yaw, ±15° pitch, ±20° roll. Outside that range the overlay fades out. Must be confirmed by measurement in TASK-058. |
| 4 | Device/browser baseline | Latest 2 versions of Chrome and Edge on desktop, Safari on macOS, Chrome on Android, Safari on iOS. Exact devices confirmed in TASK-074. |
| 5 | Snapshot watermark | None. |
| 6 | Asset sourcing | **Still open** — TASK-015, blocks Phase 4. |

Model bundle redistribution terms (P-009) remain open; they block commercial launch, not
development.

## 8. Traceability

Requirements → stories → acceptance criteria → tasks:

- Stories: `docs/01-product/user-stories.md`
- Acceptance criteria: `docs/01-product/acceptance-criteria.md`
- Tasks: `docs/05-development/TASK_BOARD.md`
- Test cases: `docs/06-quality/test-cases.md`
