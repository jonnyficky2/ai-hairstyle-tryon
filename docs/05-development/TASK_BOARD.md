# TASK BOARD

> **Authoritative execution tracker.** Last updated: 2026-11-19.
> Detail lives here; do not create a second task list elsewhere.
> Status changes require evidence recorded in the task entry.

## Status legend

| Status | Meaning |
|---|---|
| `TODO` | Defined, not started, dependencies may still be open |
| `IN_PROGRESS` | Actively being worked |
| `BLOCKED` | Cannot proceed; blocker recorded |
| `REVIEW` | Work complete, awaiting verification/approval |
| `DONE` | Acceptance criteria verified with evidence |
| `CANCELLED` | Deliberately dropped; reason recorded |

Rules:
- A task is `DONE` only per `docs/05-development/definition-of-done.md`.
- Never assume a dependency is complete; open its evidence first.
- IDs are permanent. Next free numeric ID: **087**.

## Summary

| Metric | Value |
|---|---|
| Total tasks | 71 |
| DONE | 24 |
| TODO | 43 |
| BLOCKED | 4 |
| IN_PROGRESS | 0 |
| REVIEW | 0 |
| CANCELLED | 0 |
| P0 tasks | 55 |
| P1 tasks | 15 |
| Overall completion | 34% (24/71) |

## Milestones

| Milestone | Title | Tasks | Done | Completion | Status |
|---|---|---|---|---|---|
| M0 | Documentation & Research | TASK-001…017 | 16/17 | 94% | IN_PROGRESS |
| M1 | Project Foundation | TASK-020…027, 085 | 4/9 | 44% | IN_PROGRESS |
| M2 | Camera System | TASK-030…033 | 4/4 | 100% | DONE |
| M3 | Face Detection & Tracking | TASK-040…047 | 0/8 | 0% | TODO |
| M4 | Hairstyle Rendering | TASK-050…058 | 0/9 | 0% | TODO |
| M5 | User Experience | TASK-060…068 | 0/9 | 0% | TODO |
| M6 | Quality & Optimization | TASK-070…078, 086 | 0/10 | 0% | TODO |
| M7 | Deployment | TASK-080…084 | 0/5 | 0% | TODO |

M0 is not complete: asset sourcing (TASK-015) is blocked and blocks TASK-051. All approval gates
(TASK-013, TASK-014, TASK-016, TASK-017) closed on 2026-11-18.

## Index by status

| Status | Tasks |
|---|---|
| DONE | TASK-001…014, TASK-016, TASK-017, TASK-020…022, TASK-024, TASK-030…033 |
| TODO | TASK-023, 025…027, 040…047, 050, 052…058, 060…068, 070…078, 080…084 |
| BLOCKED | TASK-015, TASK-051, TASK-085, TASK-086 |
| IN_PROGRESS | — |
| REVIEW | — |
| CANCELLED | — |

## Index by priority

| Priority | Tasks |
|---|---|
| P0 | TASK-001…017, 020…027, 030…032, 040…045, 047, 051…056, 058, 061, 066, 067, 073…078, 080…082, 084 |
| P1 | TASK-033, 046, 050, 057, 060, 062…065, 068, 070…072, 083 |

## Critical path

```
TASK-013 → TASK-020 → TASK-021 → TASK-040 → TASK-041 → TASK-042
→ TASK-043 → TASK-044 → TASK-053 → TASK-054 → TASK-055 → TASK-058
→ TASK-066 → TASK-073 → TASK-082 → TASK-084
```

Parallel branch that can delay the path: TASK-015 → TASK-051 → TASK-052 (asset sourcing).

---

# Task register

## Phase 0 — Documentation & Research (M0)

### TASK-001 — Repository and documentation audit
- Phase: 0 · Milestone: M0 · Priority: P0 · Status: **DONE** · Complexity: S
- Dependencies: —
- Description: Inspect all existing files, identify documentation gaps, inconsistencies, and unverified assumptions.
- Acceptance: Inventory recorded; gaps and inconsistencies listed; no existing content destroyed.
- Verification: File inventory and audit report reviewed.
- Evidence: `docs/09-project-history/documentation-audit-2026-11-09.md`; repository listing.

### TASK-002 — Archive the original planning document
- Phase: 0 · Milestone: M0 · Priority: P0 · Status: **DONE** · Complexity: S
- Dependencies: TASK-001
- Description: Preserve the original v1.0 planning document unmodified as history.
- Acceptance: Original content preserved at a stable path; no duplicate authoritative PRD.
- Verification: File exists and matches the received content.
- Evidence: `docs/09-project-history/original-planning-document-v1.0.md`.

### TASK-003 — Product documentation set
- Phase: 0 · Milestone: M0 · Priority: P0 · Status: **DONE** · Complexity: L
- Dependencies: TASK-001
- Description: Write vision, scope, PRD, MVP spec, user journey, user stories, and acceptance criteria.
- Acceptance: All seven documents exist, cross-link correctly, and use consistent requirement IDs.
- Verification: Phase 4 consistency review.
- Evidence: `docs/00-project-overview/`, `docs/01-product/`.

### TASK-004 — UI/UX and design system specification
- Phase: 0 · Milestone: M0 · Priority: P0 · Status: **DONE** · Complexity: M
- Dependencies: TASK-003
- Description: Define screens, layouts, states, accessibility, tokens, and components.
- Acceptance: Every camera state has a defined presentation; tokens are proposed and consistent.
- Verification: Phase 4 review against user journey states.
- Evidence: `docs/02-design/ui-ux-specification.md`, `docs/02-design/design-system.md`.

### TASK-005 — Technical stack evaluation
- Phase: 0 · Milestone: M0 · Priority: P0 · Status: **DONE** · Complexity: M
- Dependencies: TASK-001
- Description: Verify versions, licenses, engine constraints, browser support, and alternatives.
- Acceptance: Each critical technology has verified facts, limitations, and open questions.
- Verification: Sources cited; registry data re-checked.
- Evidence: `docs/03-architecture/technical-stack-evaluation.md`.

### TASK-006 — AI research record
- Phase: 0 · Milestone: M0 · Priority: P0 · Status: **DONE** · Complexity: L
- Dependencies: TASK-005
- Description: Research landmarks, coordinates, pose, smoothing, overlay positioning, assets, mobile, privacy.
- Acceptance: Findings tagged VERIFIED/ASSUMPTION/OPEN; no invented results.
- Verification: Every VERIFIED claim cites an official source.
- Evidence: `docs/04-ai-research/ai-research.md`.

### TASK-007 — Model evaluation record
- Phase: 0 · Milestone: M0 · Priority: P0 · Status: **DONE** · Complexity: M
- Dependencies: TASK-005
- Description: Desk evaluation of face tracking candidates against weighted criteria.
- Acceptance: Alternatives compared; decision and change triggers documented.
- Verification: Review for unsupported claims.
- Evidence: `docs/04-ai-research/model-evaluation.md`.

### TASK-008 — Benchmark plan
- Phase: 0 · Milestone: M0 · Priority: P0 · Status: **DONE** · Complexity: M
- Dependencies: TASK-006
- Description: Define metrics, hypotheses, scenarios, device matrix, pass/fail rules, evidence format.
- Acceptance: No benchmark results claimed; procedure is reproducible.
- Verification: Review against PRD NFRs.
- Evidence: `docs/04-ai-research/benchmark-plan.md`.

### TASK-009 — Architecture specification set
- Phase: 0 · Milestone: M0 · Priority: P0 · Status: **DONE** · Complexity: L
- Dependencies: TASK-003, TASK-005
- Description: System, components, camera pipeline, face tracking, rendering, and asset specifications.
- Acceptance: Layers, contracts, failure modes, and limitations are documented consistently.
- Verification: Phase 4 cross-document review.
- Evidence: `docs/03-architecture/*.md`.

### TASK-010 — ADR set (ADR-001…ADR-011)
- Phase: 0 · Milestone: M0 · Priority: P0 · Status: **DONE** · Complexity: L
- Dependencies: TASK-005, TASK-009
- Description: Write ADRs with context, problem, options, decision, rationale, trade-offs, consequences, verification.
- Acceptance: All ADRs marked PROPOSED; no decision presented as approved.
- Verification: ADR index and content review.
- Evidence: `docs/03-architecture/adr/`.

### TASK-011 — Task board and implementation plan
- Phase: 0 · Milestone: M0 · Priority: P0 · Status: **DONE** · Complexity: L
- Dependencies: TASK-003, TASK-009, TASK-010
- Description: Build the task register, milestones, dependencies, and execution order.
- Acceptance: Every task has all required fields; dependency graph has no cycles.
- Verification: Phase 4 validation.
- Evidence: This file; `docs/05-development/implementation-plan.md`.

### TASK-012 — Documentation consistency review
- Phase: 0 · Milestone: M0 · Priority: P0 · Status: **DONE** · Complexity: M
- Dependencies: TASK-001…TASK-011
- Description: Validate links, IDs, status consistency, and conflicting statements.
- Acceptance: No broken internal links; no duplicate source of truth; conflicts resolved or recorded.
- Verification: Automated link/ID checks plus manual review.
- Evidence: `docs/09-project-history/documentation-audit-2026-11-09.md` §Consistency.

### TASK-013 — Approve product scope and PRD
- Phase: 0 · Milestone: M0 · Priority: P0 · Status: **DONE** · Complexity: S
- Dependencies: TASK-003, TASK-012
- Description: Project owner reviews and approves vision, scope, PRD, MVP spec, and acceptance criteria.
- Acceptance: Written approval recorded; open product questions either resolved or explicitly deferred.
- Verification: Approval record in the decision log.
- Evidence: `docs/09-project-history/decision-log.md` D-012, P-001 (approved 2026-11-18 by project owner).

### TASK-014 — Approve architecture decisions
- Phase: 0 · Milestone: M0 · Priority: P0 · Status: **DONE** · Complexity: M
- Dependencies: TASK-010, TASK-012
- Description: Review ADR-001…ADR-011; confirm or reject each; confirm model license terms.
- Acceptance: Each ADR marked APPROVED or REJECTED with notes; model license confirmed.
- Verification: ADR status table updated.
- Evidence: `docs/03-architecture/adr/README.md` approval record — all 11 approved 2026-11-18. Model bundle license remains OPEN (P-009) and blocks commercial launch only.

### TASK-015 — Hairstyle asset sourcing and licensing decision
- Phase: 0 · Milestone: M0 · Priority: P0 · Status: **BLOCKED** · Complexity: M
- Dependencies: TASK-003, TASK-012
- Description: Decide how assets are obtained (commission, license, AI-generated, in-house) and record terms.
- Acceptance: A sourcing decision with license terms and budget/effort estimate.
- Verification: Written decision; license template available.
- Evidence: Decision-log entry; asset license template.
- Blocker: No sourcing decision or budget exists. Owner input required.

### TASK-016 — Resolve open product questions
- Phase: 0 · Milestone: M0 · Priority: P0 · Status: **DONE** · Complexity: M
- Dependencies: TASK-003, TASK-012
- Description: Resolve UI language, multi-face policy, supported angle claim, device baseline, watermark, asset sourcing dependency.
- Acceptance: Each question has a recorded answer or an explicit deferral with impact.
- Verification: PRD §7 updated to match.
- Evidence: `docs/01-product/prd.md` §7; decision log D-014…D-017. Asset sourcing (P-003) explicitly deferred to TASK-015.

### TASK-017 — Privacy notice and consent copy approval
- Phase: 0 · Milestone: M0 · Priority: P0 · Status: **DONE** · Complexity: S
- Dependencies: TASK-016
- Description: Draft and approve privacy notice and consent text matching actual behavior.
- Acceptance: Notice states local processing, no upload, camera control, and third-party requests accurately.
- Verification: Review against network behavior and `privacy-policy-requirements.md`.
- Evidence: `docs/07-security/privacy-notice-copy.md` (approved 2026-11-18). Host logging and operator contact remain placeholders until TASK-081.

## Phase 1 — Project Foundation (M1)

### TASK-020 — Initialize git repository
- Phase: 1 · Milestone: M1 · Priority: P0 · Status: **DONE** · Complexity: S
- Dependencies: TASK-013, TASK-014
- Description: Initialize git, add `.gitignore`, create the initial commit.
- Acceptance: Repository initialized; documentation committed; build artifacts ignored.
- Verification: `git log`, `git status`, `.gitignore` inspection.
- Evidence: commits `061d2e9` (docs baseline) and `16deee8` (scaffold); `git status` clean.
- Note: remote connection split out to TASK-085 (D-019).

### TASK-021 — Scaffold Vite + React + TypeScript
- Phase: 1 · Milestone: M1 · Priority: P0 · Status: **DONE** · Complexity: M
- Dependencies: TASK-020
- Description: Create the app with pinned versions and strict TypeScript.
- Acceptance: Dev server runs; production build succeeds; versions pinned.
- Verification: `npm run build`, `tsc --noEmit`.
- Evidence: `tsc --noEmit` exit 0; `npm run build` produced `dist/index.html` + `dist/assets/index-BmJ4yGqb.js` (219.75 kB, gzip 68.71 kB); dev server returned HTTP 200 with React refresh injected. Pinned: vite 8.3.8, react/react-dom 19.3.1, typescript 7.0.2, @vitejs/plugin-react 6.3.0.
- Note: port 5173 is occupied by another local project, so `npm run dev` falls through to 5174. Use `npx vite --port <n> --strictPort` when a fixed port matters.

### TASK-022 — Configure Tailwind CSS and design tokens
- Phase: 1 · Milestone: M1 · Priority: P0 · Status: **DONE** · Complexity: M
- Dependencies: TASK-021
- Description: Install and configure Tailwind; define token variables from the design system.
- Acceptance: Tokens available as classes/variables; no raw hex in components.
- Verification: Build passes; visual token sample.
- Evidence: `tailwindcss` + `@tailwindcss/vite` 4.3.5 in `package.json`, plugin wired in `vite.config.ts`, `@theme` token block in `src/styles/index.css`, token-only classes in `src/App.tsx`. `npx tsc --noEmit` exit 0; `npm run build` → `dist/assets/index-6NP9oSDn.css` 10.36 kB (gzip 2.78 kB), JS 220.16 kB. Emitted CSS contains `--color-bg:#0b0d10`, `--color-accent:#7c9cff`, `--radius-lg:20px`, `--shadow-panel:`, `--ease-standard:`, `:root{--duration-fast:.12s;--duration-base:.2s}` and the utilities `.bg-bg`, `.bg-surface`, `.text-text-muted`, `.border-border`, `.rounded-lg`, `.text-2xl`. Screenshot: `docs/02-design/evidence/task-022-token-sample.png` (headless Chrome, 900×600, served with `vite preview`).
- Note: Tailwind v4 has no `--duration-*` theme namespace, so the two durations stay plain `:root` variables (design-system §7).

### TASK-023 — Configure ESLint and Prettier
- Phase: 1 · Milestone: M1 · Priority: P0 · Status: **TODO** · Complexity: S
- Dependencies: TASK-021
- Description: Add linting and formatting with TypeScript rules.
- Acceptance: `lint` and `format:check` pass on the scaffold.
- Verification: Command output.
- Evidence: Config files; command output.

### TASK-024 — Configure Vitest and Playwright
- Phase: 1 · Milestone: M1 · Priority: P0 · Status: **DONE** · Complexity: M
- Dependencies: TASK-021
- Description: Add unit and E2E test runners with one passing smoke test each.
- Acceptance: `test` and `test:e2e` run; smoke tests pass.
- Verification: Command output.
- Evidence: `vitest.config.ts`, `playwright.config.ts`, `src/features/camera/camera-service.test.ts`,
  `e2e/smoke.spec.ts`; `vitest` 5.1.0 and `@playwright/test` 1.65.0 pinned in `package.json`.
  `npm run typecheck` exit 0; `npm test` → 1 file / 1 test passed (66 ms); `npm run build` →
  `dist/index.html` 0.40 kB, `index-DplKxRef.css` 10.54 kB, `index-Cpiq5khJ.js` 223.74 kB (75 ms);
  `npm run test:e2e` → 1 passed (3.3 s) on Chromium. Playwright webServer binds the dev server to
  127.0.0.1; without `--host 127.0.0.1` startup timed out. `npm audit` now reports 0 vulnerabilities
  (TASK-086 still needs its own verification before closing).

### TASK-025 — Create source folder architecture
- Phase: 1 · Milestone: M1 · Priority: P0 · Status: **TODO** · Complexity: S
- Dependencies: TASK-021
- Description: Create the folder structure from the component architecture.
- Acceptance: Folders exist; no empty placeholder modules beyond agreed structure.
- Verification: Directory listing.
- Evidence: Tree output.

### TASK-026 — Build application shell and layout skeleton
- Phase: 1 · Milestone: M1 · Priority: P0 · Status: **TODO** · Complexity: M
- Dependencies: TASK-022, TASK-025
- Description: Build the responsive shell with placeholder panels and route structure.
- Acceptance: Desktop and mobile layouts render without horizontal scroll.
- Verification: Screenshots at 3 viewports; build passes.
- Evidence: Screenshots.

### TASK-027 — Configure CI pipeline
- Phase: 1 · Milestone: M1 · Priority: P0 · Status: **TODO** · Complexity: M
- Dependencies: TASK-023, TASK-024
- Description: Run install, typecheck, lint, unit tests, build, and E2E smoke in CI.
- Acceptance: CI green on the initial commit; failures block merge.
- Verification: CI run URL/log.
- Evidence: CI configuration; passing run.

## Phase 2 — Camera System (M2)

### TASK-030 — Implement camera permission and lifecycle service
- Phase: 2 · Milestone: M2 · Priority: P0 · Status: **DONE** · Complexity: L
- Dependencies: TASK-026
- Description: Implement start, stop, device listing, typed errors, and state transitions.
- Acceptance: AC-01, AC-15; all documented error codes mapped.
- Verification: Unit tests with injected media devices; manual permission tests.
- Evidence: `src/features/camera/camera-service.ts`; 16 unit tests pass with 100% coverage of the
  service (TASK-033). Owner reported manual permission/lifecycle UAT passed in a real browser on
  2026-11-19. No screenshot files were supplied; the UAT result is owner-reported, not re-run by
  the agent.
- Note (2026-11-18): implementation created `src/features/camera/` (`camera-state.ts`,
  `camera-service.ts`, `use-camera.ts`) per the approved component architecture.

### TASK-031 — Implement video preview and device selection
- Phase: 2 · Milestone: M2 · Priority: P0 · Status: **DONE** · Complexity: M
- Dependencies: TASK-030
- Description: Render the stream to a video element and canvas; support front/back selection if P1 is kept.
- Acceptance: Live preview visible; device switch does not leak tracks.
- Verification: Manual + unit test for track stop.
- Evidence: `src/App.tsx` renders the stream to `<video>` + `<canvas>` via `useCamera()` with an rAF
  draw loop; track stop is covered by TASK-033 unit tests. Owner reported manual preview UAT passed
  in a real browser on 2026-11-19; no recording was supplied.
- Note: front/back device switching was P1 and was not implemented; no track leak is introduced
  because no switch path exists.

### TASK-032 — Implement camera error and permission states UI
- Phase: 2 · Milestone: M2 · Priority: P0 · Status: **DONE** · Complexity: M
- Dependencies: TASK-030
- Description: Build UI for REQUESTING, DENIED, INITIALIZING, DEVICE_UNAVAILABLE, STOPPED, ERROR.
- Acceptance: AC-13, AC-18; every state has actionable copy.
- Verification: Manual walkthrough of each state.
- Evidence: state-driven copy in `src/App.tsx`; owner reported the manual state walkthrough passed
  in a real browser on 2026-11-19. No per-state screenshots were supplied.
- Note: after D-022, `INITIALIZING` is set by the video/tracking layer (TASK-041/045), so its UI
  copy is present but not yet reachable from `CameraService`.

### TASK-033 — Add camera state machine unit tests
- Phase: 2 · Milestone: M2 · Priority: P1 · Status: **DONE** · Complexity: M
- Dependencies: TASK-030, TASK-032
- Description: Test transitions, error mapping, retry, and cleanup.
- Acceptance: All transitions covered; no unreachable state.
- Verification: Coverage report.
- Evidence: `src/features/camera/camera-service.test.ts`. `npm test -- --coverage` → 16 passed;
  `camera-service.ts` 100% statements (47/47), branches (32/32), functions (11/11) and lines
  (46/46); `npm run typecheck` exit 0; `npm run build` exit 0; `npm run test:e2e` → 1 passed.
- Note: the earlier lifecycle mismatch was resolved by owner decision D-022 — `camera-pipeline.md`
  §3 and `component-architecture.md` §2 now assign `INITIALIZING` and the four tracking states to
  the video/tracking layer (TASK-041/045). `camera-service.ts` was not changed.

## Phase 3 — Face Detection & Tracking (M3)

### TASK-040 — Self-host MediaPipe WASM and model assets
- Phase: 3 · Milestone: M3 · Priority: P0 · Status: **TODO** · Complexity: M
- Dependencies: TASK-021
- Description: Copy runtime WASM and `face_landmarker.task` into the build; configure MIME and caching.
- Acceptance: App initializes with only same-origin requests; no CDN dependency.
- Verification: Network log; offline-except-origin test.
- Evidence: Network capture; asset paths.

### TASK-041 — Integrate Face Landmarker in VIDEO mode
- Phase: 3 · Milestone: M3 · Priority: P0 · Status: **TODO** · Complexity: L
- Dependencies: TASK-031, TASK-040
- Description: Initialize the model, run `detectForVideo` in a rAF loop with timestamp guard, handle GPU→CPU fallback.
- Acceptance: AC-02, AC-03; 478 landmarks returned; no duplicate inference per frame.
- Verification: Integration test with a synthetic source; manual camera test.
- Evidence: Test output; debug overlay.

### TASK-042 — Implement landmark normalization and mapping
- Phase: 3 · Milestone: M3 · Priority: P0 · Status: **TODO** · Complexity: M
- Dependencies: TASK-041
- Description: Map normalized landmarks to canvas coordinates with cover-fit and DPR; verify landmark indices.
- Acceptance: Mapped points align with the visible face at multiple aspect ratios.
- Verification: Debug overlay comparison; unit tests for mapping math.
- Evidence: Screenshots; test output.

### TASK-043 — Implement head pose estimation
- Phase: 3 · Milestone: M3 · Priority: P0 · Status: **TODO** · Complexity: L
- Dependencies: TASK-042
- Description: Decompose the 4×4 matrix into yaw/pitch/roll; implement landmark fallback; verify axis conventions.
- Acceptance: AC-04; rotation direction correct for known movements.
- Verification: Unit tests with synthetic poses; manual movement test.
- Evidence: Test output; recording.

### TASK-044 — Implement landmark smoothing filter
- Phase: 3 · Milestone: M3 · Priority: P0 · Status: **TODO** · Complexity: M
- Dependencies: TASK-043
- Description: Implement One Euro (or EMA fallback), reset rules, dt clamping, and tuning parameters.
- Acceptance: Jitter reduced without visible lag; deterministic unit tests.
- Verification: Unit tests with synthetic sequences; manual A/B.
- Evidence: Test output; parameter record.

### TASK-045 — Handle tracking loss and multiple faces
- Phase: 3 · Milestone: M3 · Priority: P0 · Status: **TODO** · Complexity: M
- Dependencies: TASK-041
- Description: Implement 500 ms loss rule, overlay hiding, recovery, and the multi-face policy.
- Acceptance: AC-17; policy matches TASK-016 decision.
- Verification: Integration test; manual occlusion test.
- Evidence: Test output; recording.

### TASK-046 — Add tracking unit and integration tests
- Phase: 3 · Milestone: M3 · Priority: P1 · Status: **TODO** · Complexity: M
- Dependencies: TASK-042, TASK-043, TASK-044
- Description: Cover mapping, pose, smoothing, and tracking state with synthetic inputs.
- Acceptance: Deterministic tests pass in CI.
- Verification: Test output.
- Evidence: Test files; CI run.

### TASK-047 — Profile tracking performance against benchmark plan
- Phase: 3 · Milestone: M3 · Priority: P0 · Status: **TODO** · Complexity: M
- Dependencies: TASK-041
- Description: Measure inference, render, FPS, latency, and delegate on the benchmark devices.
- Acceptance: Results recorded with raw data; deviations documented.
- Verification: Benchmark report review.
- Evidence: Benchmark report; raw logs.

## Phase 4 — Hairstyle Rendering (M4)

### TASK-050 — Implement hairstyle metadata schema validation
- Phase: 4 · Milestone: M4 · Priority: P1 · Status: **TODO** · Complexity: M
- Dependencies: TASK-021
- Description: Validate catalog entries at load; reject duplicates, missing assets, invalid anchors, missing licenses.
- Acceptance: Invalid entries excluded without crashing; tests cover each rule.
- Verification: Unit tests.
- Evidence: Test output.

### TASK-051 — Produce initial hairstyle asset set
- Phase: 4 · Milestone: M4 · Priority: P0 · Status: **BLOCKED** · Complexity: L
- Dependencies: TASK-015, TASK-050
- Description: Obtain at least 3 assets across 2 categories with recorded licenses.
- Acceptance: Assets meet the asset specification; licenses recorded.
- Verification: Asset checklist review.
- Evidence: Asset files; license records; thumbnails.
- Blocker: Sourcing/licensing decision (TASK-015) unresolved.

### TASK-052 — Calibrate hairstyle anchors
- Phase: 4 · Milestone: M4 · Priority: P0 · Status: **TODO** · Complexity: L
- Dependencies: TASK-050, TASK-051
- Description: Set anchors, scale factor, offsets, and angle limits per asset using reference frames.
- Acceptance: Alignment holds across 3 face widths per asset.
- Verification: Calibration sheets reviewed.
- Evidence: Calibration images; final metadata values.

### TASK-053 — Implement Canvas 2D renderer core
- Phase: 4 · Milestone: M4 · Priority: P0 · Status: **TODO** · Complexity: L
- Dependencies: TASK-042
- Description: Draw the video with cover-fit and DPR, reuse canvas/context, support mirroring.
- Acceptance: Video renders correctly at multiple aspect ratios; no per-frame context creation.
- Verification: Visual tests; code review.
- Evidence: Screenshots; profiling note.

### TASK-054 — Implement scale, rotation, translation mapping
- Phase: 4 · Milestone: M4 · Priority: P0 · Status: **TODO** · Complexity: L
- Dependencies: TASK-043, TASK-053
- Description: Implement anchor-based overlay transform and user adjustments.
- Acceptance: AC-05, AC-09; pure function covered by tests.
- Verification: Unit tests with fixed poses/assets; visual check.
- Evidence: Test output; annotated screenshots.

### TASK-055 — Apply smoothing to render transform
- Phase: 4 · Milestone: M4 · Priority: P0 · Status: **TODO** · Complexity: M
- Dependencies: TASK-044, TASK-054
- Description: Apply secondary smoothing to the final transform with reset rules.
- Acceptance: AC-06; no added lag beyond one frame.
- Verification: Unit test; manual recording.
- Evidence: Test output; recording.

### TASK-056 — Implement hairstyle switching without camera restart
- Phase: 4 · Milestone: M4 · Priority: P0 · Status: **TODO** · Complexity: M
- Dependencies: TASK-053
- Description: Preload/cache assets and swap the active asset without touching the stream or model.
- Acceptance: AC-07, AC-19.
- Verification: E2E test asserting stream identity; manual test.
- Evidence: Test output.

### TASK-057 — Add renderer unit tests
- Phase: 4 · Milestone: M4 · Priority: P1 · Status: **TODO** · Complexity: M
- Dependencies: TASK-053, TASK-054
- Description: Test anchor math, scale, rotation, cover-fit, and snapshot dimensions.
- Acceptance: Deterministic tests pass.
- Verification: CI run.
- Evidence: Test output.

### TASK-058 — Execute visual calibration UAT
- Phase: 4 · Milestone: M4 · Priority: P0 · Status: **TODO** · Complexity: M
- Dependencies: TASK-052, TASK-055, TASK-057
- Description: Visually validate alignment for each approved asset across face widths and poses.
- Acceptance: AC-05 met; each asset approved or rejected with notes.
- Verification: Two-reviewer sign-off.
- Evidence: Annotated screenshots; sign-off record.

## Phase 5 — User Experience (M5)

### TASK-060 — Build hairstyle catalog data and category filtering
- Phase: 5 · Milestone: M5 · Priority: P1 · Status: **TODO** · Complexity: M
- Dependencies: TASK-051
- Description: Load catalog JSON, expose categories, filter, and favorites.
- Acceptance: AC-08, AC-12.
- Verification: Unit + E2E tests.
- Evidence: Test output.

### TASK-061 — Build hairstyle selection panel
- Phase: 5 · Milestone: M5 · Priority: P0 · Status: **TODO** · Complexity: L
- Dependencies: TASK-060, TASK-026
- Description: Desktop sidebar/strip and mobile chips/strip with thumbnails and selected state.
- Acceptance: AC-07, AC-08, AC-14.
- Verification: Screenshots; E2E.
- Evidence: Screenshots at 3 viewports.

### TASK-062 — Build preview controls
- Phase: 5 · Milestone: M5 · Priority: P1 · Status: **TODO** · Complexity: M
- Dependencies: TASK-054
- Description: Size, vertical position, overlay toggle, reset.
- Acceptance: AC-09.
- Verification: E2E + manual.
- Evidence: Test output; screenshots.

### TASK-063 — Implement snapshot capture
- Phase: 5 · Milestone: M5 · Priority: P1 · Status: **TODO** · Complexity: M
- Dependencies: TASK-053
- Description: Render the composed frame to an offscreen canvas and produce a PNG blob.
- Acceptance: AC-10; no UI chrome in the output.
- Verification: E2E; image inspection.
- Evidence: Generated image files.

### TASK-064 — Implement snapshot download
- Phase: 5 · Milestone: M5 · Priority: P1 · Status: **TODO** · Complexity: S
- Dependencies: TASK-063
- Description: Trigger a local download with a predictable filename.
- Acceptance: AC-11; no network request carrying image data.
- Verification: E2E; network log.
- Evidence: Downloaded file; network capture.

### TASK-065 — Implement favorites with localStorage
- Phase: 5 · Milestone: M5 · Priority: P1 · Status: **TODO** · Complexity: M
- Dependencies: TASK-060
- Description: Persist favorite IDs with versioned keys and graceful storage-failure handling.
- Acceptance: AC-12; no sensitive data stored.
- Verification: Unit + E2E; storage inspection.
- Evidence: Test output; storage dump.

### TASK-066 — Complete responsive layout pass
- Phase: 5 · Milestone: M5 · Priority: P0 · Status: **TODO** · Complexity: L
- Dependencies: TASK-061
- Description: Finalize breakpoints, mobile control placement, orientation handling.
- Acceptance: AC-14; no horizontal scroll at 360 px.
- Verification: Screenshots at 3+ viewports and both orientations.
- Evidence: Screenshot set.

### TASK-067 — Build landing and permission screens
- Phase: 5 · Milestone: M5 · Priority: P0 · Status: **TODO** · Complexity: M
- Dependencies: TASK-026, TASK-030
- Description: Landing explanation, privacy summary, consent, and start action.
- Acceptance: AC-16; no camera request before consent.
- Verification: E2E; network/permission log.
- Evidence: Test output; screenshots.

### TASK-068 — Complete accessibility pass
- Phase: 5 · Milestone: M5 · Priority: P1 · Status: **TODO** · Complexity: M
- Dependencies: TASK-061, TASK-066
- Description: Keyboard order, labels, live regions, focus, contrast, reduced motion.
- Acceptance: NFR-07; no critical axe violations.
- Verification: Manual keyboard walkthrough; automated scan.
- Evidence: Scan report; notes.

## Phase 6 — Quality & Optimization (M6)

### TASK-070 — Enforce unit test coverage gate
- Phase: 6 · Milestone: M6 · Priority: P1 · Status: **TODO** · Complexity: S
- Dependencies: TASK-024, TASK-057
- Description: Set a coverage threshold for pure logic and enforce it in CI.
- Acceptance: CI fails below threshold.
- Verification: CI run with an intentional failure.
- Evidence: CI config; coverage report.

### TASK-071 — Add integration tests
- Phase: 6 · Milestone: M6 · Priority: P1 · Status: **TODO** · Complexity: L
- Dependencies: TASK-046, TASK-057
- Description: Test camera→tracking→renderer integration with injected sources.
- Acceptance: Core pipeline covered; deterministic.
- Verification: CI run.
- Evidence: Test output.

### TASK-072 — Add Playwright E2E happy path
- Phase: 6 · Milestone: M6 · Priority: P1 · Status: **TODO** · Complexity: L
- Dependencies: TASK-066
- Description: Automate consent, fake camera, style selection, snapshot, and download.
- Acceptance: Happy path passes in CI with a fake media stream.
- Verification: CI run.
- Evidence: Test output; trace.

### TASK-073 — Execute manual UAT
- Phase: 6 · Milestone: M6 · Priority: P0 · Status: **TODO** · Complexity: L
- Dependencies: TASK-058, TASK-066
- Description: Run the UAT matrix on real devices and record results.
- Acceptance: All P0 UAT cases pass or have approved deviations.
- Verification: Signed UAT report.
- Evidence: `docs/06-quality/manual-uat.md` results.

### TASK-074 — Execute cross-browser and device matrix
- Phase: 6 · Milestone: M6 · Priority: P0 · Status: **TODO** · Complexity: L
- Dependencies: TASK-066
- Description: Test Chrome, Edge, Safari macOS, Safari iOS, Chrome Android.
- Acceptance: Supported list confirmed; unsupported behavior documented.
- Verification: Matrix report.
- Evidence: Device/browser result table.

### TASK-075 — Optimize mobile performance
- Phase: 6 · Milestone: M6 · Priority: P0 · Status: **TODO** · Complexity: L
- Dependencies: TASK-047, TASK-074
- Description: Adaptive resolution, asset caching, frame skipping, or worker evaluation as needed.
- Acceptance: Targets met or deviations accepted.
- Verification: Re-run benchmark.
- Evidence: Before/after metrics.

### TASK-076 — Verify privacy requirements
- Phase: 6 · Milestone: M6 · Priority: P0 · Status: **TODO** · Complexity: M
- Dependencies: TASK-041, TASK-067
- Description: Network capture, storage inspection, third-party request audit, consent flow check.
- Acceptance: AC-22; no image/video upload; no biometric storage.
- Verification: Network log review; sign-off.
- Evidence: Capture files; checklist.

### TASK-077 — Execute security review
- Phase: 6 · Milestone: M6 · Priority: P0 · Status: **TODO** · Complexity: M
- Dependencies: TASK-076
- Description: Review CSP, headers, dependency pinning, MIME types, and permission policy.
- Acceptance: No high-severity findings open.
- Verification: Security checklist.
- Evidence: Review report.

### TASK-078 — Resolve QA defects
- Phase: 6 · Milestone: M6 · Priority: P0 · Status: **TODO** · Complexity: L
- Dependencies: TASK-073
- Description: Fix defects found in UAT, cross-browser testing, and reviews.
- Acceptance: No known critical defect; fixed defects have regression tests.
- Verification: Retest.
- Evidence: Defect log; test output.

## Phase 7 — Deployment (M7)

### TASK-080 — Configure production build
- Phase: 7 · Milestone: M7 · Priority: P0 · Status: **TODO** · Complexity: M
- Dependencies: TASK-021
- Description: Production build settings, asset hashing, compression, and environment config.
- Acceptance: Build output is static and reproducible.
- Verification: Build twice; compare.
- Evidence: Build logs; output listing.

### TASK-081 — Configure static hosting and HTTPS
- Phase: 7 · Milestone: M7 · Priority: P0 · Status: **TODO** · Complexity: M
- Dependencies: TASK-080
- Description: Deploy static output with HTTPS, cache headers, and security headers.
- Acceptance: HTTPS enforced; correct MIME for `.wasm`/`.task`; no dev config leaked.
- Verification: Header inspection; curl checks.
- Evidence: Header output; deployment URL.

### TASK-082 — Execute production smoke tests
- Phase: 7 · Milestone: M7 · Priority: P0 · Status: **TODO** · Complexity: M
- Dependencies: TASK-081, TASK-073
- Description: Verify camera, tracking, overlay, snapshot, and download on production.
- Acceptance: Smoke suite passes on at least desktop and one mobile device.
- Verification: Signed smoke report.
- Evidence: Recordings; checklist.

### TASK-083 — Publish release documentation
- Phase: 7 · Milestone: M7 · Priority: P1 · Status: **TODO** · Complexity: S
- Dependencies: TASK-082
- Description: Update changelog, README, deployment guide, and progress report.
- Acceptance: Documents match the released build.
- Verification: Documentation review.
- Evidence: Commit with docs; release notes.

### TASK-084 — Release MVP v0.1.0
- Phase: 7 · Milestone: M7 · Priority: P0 · Status: **TODO** · Complexity: S
- Dependencies: TASK-082, TASK-083
- Description: Tag and announce the MVP release.
- Acceptance: Tag exists; release notes published; known limitations listed.
- Verification: Tag inspection; release page.
- Evidence: Tag hash; release URL.

## Phase 8 — Repository & Supply Chain Follow-ups

### TASK-085 — Connect git remote
- Phase: 8 · Milestone: M1 · Priority: P1 · Status: **BLOCKED** · Complexity: S
- Dependencies: TASK-020
- Description: Create the remote repository and push the local history.
- Acceptance: `git remote -v` shows an origin; `git push -u origin main` succeeds.
- Verification: `git remote -v` and `git log --oneline origin/main`.
- Evidence: Remote URL; push output.
- Blocker: Host and account not chosen by the project owner. No remote exists.

### TASK-086 — Track picomatch ReDoS advisory in the build toolchain
- Phase: 8 · Milestone: M6 · Priority: P1 · Status: **BLOCKED** · Complexity: S
- Dependencies: TASK-021
- Description: `npm audit` reports 5 high-severity advisories (GHSA-fc5q-39xc-vjpf) reached through `vite → tinyglobby → fdir → picomatch`. The only offered fix downgrades Vite to 6.2.7, which is a breaking change. The package is build-time only and is not shipped in `dist/`.
- Acceptance: Advisory resolved by an upstream Vite release, or an explicit accepted-risk record with justification.
- Verification: `npm audit` shows 0 high-severity findings, or the accepted-risk record is approved.
- Evidence: `npm audit` output before and after.
- Blocker: Upstream fix not released.

---

## Dependency validation

- All dependency IDs exist.
- No dependency points to a higher-numbered task except none; the graph is acyclic.
- Blocked tasks: TASK-015 (no sourcing decision), TASK-051 (depends on TASK-015),
  TASK-085 (no remote chosen), TASK-086 (upstream advisory unfixed).
- Independent work that can start now: TASK-023, TASK-025, then TASK-040.
- Verification of completion is by evidence, not by checkbox.
