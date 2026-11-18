# Development Roadmap

> Status: PROPOSED · Last updated: 2026-11-09
> Task IDs refer to `docs/05-development/TASK_BOARD.md`.

## Phase overview

| Phase | Milestone | Outcome | Entry | Exit |
|---|---|---|---|---|
| 0 | M0 | Approved, consistent documentation and research | Project start | TASK-013, TASK-014, TASK-016, TASK-017 resolved |
| 1 | M1 | Runnable, tested, CI-backed scaffold | M0 exit | App runs, build passes, tests and CI work |
| 2 | M2 | Reliable camera lifecycle | M1 exit | Camera starts/stops, all error states handled |
| 3 | M3 | Stable face tracking and pose | M2 exit | Tracking follows near-frontal movement; performance measured |
| 4 | M4 | Calibrated hairstyle overlay | M3 exit | ≥3 assets aligned and accepted |
| 5 | M5 | Complete MVP user experience | M4 exit | Full journey works on desktop and mobile |
| 6 | M6 | Verified quality and privacy | M5 exit | UAT pass, no critical defects, privacy/security verified |
| 7 | M7 | Production MVP release | M6 exit | Production smoke tests pass |

## Phase 0 — Documentation & Research

- **Goal:** remove ambiguity before code.
- **Deliverables:** all documents in `README.md`; ADR-001…011; task board.
- **Exit criteria:** product scope approved (TASK-013); architecture approved (TASK-014); open
  questions resolved or explicitly deferred (TASK-016); privacy copy approved (TASK-017); asset
  sourcing decided (TASK-015).
- **Status:** closed 2026-11-18. All approval gates resolved except asset sourcing (TASK-015).

## Phase 1 — Project Foundation

- Tasks: TASK-020…027.
- **Exit criteria:** dev server runs; production build passes; typecheck, lint, unit tests, E2E smoke
  pass in CI; folder structure matches the component architecture.

## Phase 2 — Camera System

- Tasks: TASK-030…033.
- **Exit criteria:** AC-01, AC-13, AC-15, AC-18 pass; every camera state has a UI and a test or
  manual evidence; no track leaks.

## Phase 3 — Face Detection & Tracking

- Tasks: TASK-040…047.
- **Exit criteria:** AC-02, AC-03, AC-04, AC-17 pass; pose direction verified; smoothing reduces
  jitter without visible lag; performance measured against the benchmark plan.
- **Gate:** do not start Phase 4 until TASK-043 and TASK-044 are verified.

## Phase 4 — Hairstyle Rendering

- Tasks: TASK-050…058.
- **Exit criteria:** AC-05, AC-06, AC-07 pass; at least 3 assets calibrated and accepted; switching
  does not restart the camera.
- **Gate:** asset licensing (TASK-015) must be resolved before TASK-051.

## Phase 5 — User Experience

- Tasks: TASK-060…068.
- **Exit criteria:** AC-08…AC-12, AC-14, AC-16 pass; responsive layouts verified at 360 px and above;
  accessibility pass complete.

## Phase 6 — Quality & Optimization

- Tasks: TASK-070…078.
- **Exit criteria:** UAT PASS on the device matrix; no critical defects; privacy and security
  verified; benchmark targets met or deviations approved.

## Phase 7 — Deployment

- Tasks: TASK-080…084.
- **Exit criteria:** HTTPS production deployment; camera and download verified in production; no dev
  configuration leaked; release documented.

## Release gates (non-negotiable)

1. No Phase 1 start before TASK-013 and TASK-014.
2. No Phase 4 asset work before TASK-015.
3. No Phase 6 sign-off without TASK-073 and TASK-076.
4. No release without TASK-082.

## Post-MVP direction

Sequenced by value and risk, not committed:

1. V1.1 — better alignment, more assets, hair color, lighting adaptation.
2. V1.2 — face-shape analysis and explainable recommendations.
3. V2 — generative/3D hair with occlusion, requiring new ADRs and likely a backend.
4. V3 — broader appearance platform (clothing, accessories).

Future work must not destabilize the hairstyle module.
