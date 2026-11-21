# Progress Report

> Status: Living document · Last updated: 2026-11-19
> This is the project state summary. It must match `TASK_BOARD.md`.

## 1. Current state

| Item | State |
|---|---|
| Phase | 1 — Project Foundation |
| Milestone | M1 in progress |
| Application code | Vite + React + TypeScript scaffold with Tailwind tokens and a camera preview scaffold; no tracking or rendering |
| Dependencies | Installed and pinned |
| Git repository | Initialized locally; no remote |
| Deployment | None |
| Implementation authorization | Granted 2026-11-18 |

## 2. Completion

| Metric | Value |
|---|---|
| Tasks total | 71 |
| Done | 29 |
| In progress | 0 |
| Blocked | 4 |
| Review | 0 |
| To do | 38 |
| Overall completion | 41% |

| Milestone | Completion |
|---|---|
| M0 Documentation & Research | 94% (16/17) |
| M1 Project Foundation | 89% (8/9) |
| M2 Camera System | 100% (4/4) |
| M3 Face Detection & Tracking | 13% (1/8) |
| M4 Hairstyle Rendering | 0% |
| M5 User Experience | 0% |
| M6 Quality & Optimization | 0% (0/10) |
| M7 Deployment | 0% |

## 3. What was completed in this session

- Phase 0: repository audit, archived planning document, full documentation system (35 required
  documents plus ADR index and audit report), technology verification from official sources,
  requirements/acceptance criteria/test cases, 71-task execution plan.
- Approvals: PRD, scope, MVP, acceptance criteria, ADR-001…ADR-011, privacy notice and consent copy.
- Phase 1: git initialized (local only), Vite 8.3.8 + React 19.3.1 + TypeScript 7.0.2 scaffold,
  Tailwind 4.3.5 with the design tokens implemented in `src/styles/index.css`.

## 4. Blockers

| ID | Blocker | Owner | Impact |
|---|---|---|---|
| B-01 | Asset sourcing/licensing undecided (TASK-015) | Project owner | Blocks TASK-051 and all of Phase 4 |
| B-02 | No git remote chosen (TASK-085) | Project owner | No backup or collaboration |
| B-03 | picomatch advisory unfixed upstream (TASK-086) | Upstream | Build toolchain only; not shipped |
| B-04 | Model bundle license unconfirmed (P-009) | Project owner | Blocks commercial launch, not development |

## 5. Risk register

| ID | Risk | Likelihood | Impact | Mitigation | Task |
|---|---|---|---|---|---|
| R-01 | Overlay looks misaligned at the hairline | High | High | Per-asset calibration, manual adjustment, UAT | 052, 058 |
| R-02 | Tracking jitter or lag | Medium | High | One Euro smoothing, tuning, benchmarking | 044, 047 |
| R-03 | Mobile performance below target | Medium | High | Adaptive resolution, profiling, worker evaluation | 047, 075 |
| R-04 | Assets unavailable or unlicensed | High | High | Decide sourcing early; start with 3 assets | 015, 051 |
| R-05 | Browser/iOS behavior differs | Medium | Medium | Device matrix, real-device testing | 074 |
| R-06 | Model bundle license blocks redistribution | Medium | High | Confirm before Phase 1 | 014 |
| R-07 | Privacy promise violated by third-party requests | Low | Severe | Self-host runtime; CSP; network audit | 040, 076 |
| R-08 | Scope creep toward generative try-on | Medium | Medium | Scope control; ADR required | Governance |
| R-09 | 2D assets cannot occlude existing hair | High | Medium | Accept as MVP limitation; document | 058, 073 |
| R-10 | Thermal throttling in long sessions | Medium | Medium | Benchmark 5-minute sessions; degrade gracefully | 075 |

## 6. Open questions

See `docs/01-product/prd.md` §7 and `docs/09-project-history/decision-log.md` §2.

## 7. Next actions

1. Phase 3 (Face Detection & Tracking): TASK-041 (Integrate Face Landmarker in VIDEO mode).
2. Decide asset sourcing (TASK-015) before Phase 4.
3. Choose a git remote (TASK-085).

## 8. Session log

### 2026-11-22 — MediaPipe WASM and model assets self-hosting (TASK-040)

- Tasks: TASK-040.
- Completed:
  - Installed `@mediapipe/tasks-vision` pinned in `package.json`.
  - Added self-hosted MediaPipe WASM runtime under `public/wasm/` and `face_landmarker.task` under `public/models/`.
  - Added `scripts/sync-mediapipe.js` and npm script `sync:mediapipe`.
  - Added Playwright test `e2e/assets.spec.ts` to verify asset reachability and size.
  - Updated `eslint.config.js` to ignore `public/**` and `scripts/**`.
- Commands run and real results:
  - `npm run sync:mediapipe` → MediaPipe WASM files synced.
  - `npm run typecheck` → exit 0.
  - `npm run lint` → exit 0.
  - `npm test` → 16 passed.
  - `npm run test:e2e` → 2 passed (smoke and assets tests).
  - `npm run build` → exit 0.
- Remaining: TASK-041…TASK-047 (Milestone 3). Next concrete step: TASK-041.
- Blockers: TASK-015 (asset sourcing), TASK-085 (no remote), TASK-086 (upstream advisory), P-009 (model license).
- Assumptions: none.
- Files modified: `package.json`, `package-lock.json`, `eslint.config.js`, `scripts/sync-mediapipe.js`, `e2e/assets.spec.ts`, `docs/05-development/TASK_BOARD.md`, `docs/09-project-history/progress-report.md`.

### 2026-11-22 — CI Pipeline configuration

- Tasks: TASK-027.
- Completed:
  - Created `.github/workflows/ci.yml` with typecheck, lint, test, playwright e2e, and build jobs.
- Commands run and real results:
  - `npm run typecheck` → exit 0.
  - `npm run lint` → exit 0.
  - `npm test` → 16 passed.
  - `npm run test:e2e` → 1 passed.
  - `npm run build` → exit 0.
- Remaining: Milestone 3 (TASK-040…TASK-047).
- Blockers: TASK-015 (asset sourcing), TASK-085 (no remote), TASK-086 (upstream advisory),
  P-009 (model license).
- Assumptions: none.
- Files modified: `.github/workflows/ci.yml`, `TASK_BOARD.md`, `progress-report.md`.

### 2026-11-09 — Documentation baseline

- Task: TASK-001…TASK-012.
- Completed: audit, archive, full documentation set, research verification, task board,
  consistency review.
- Commands run: repository listing; official documentation fetches; npm registry queries;
  MediaPipe license and model HEAD request; internal link/ID checks.
- Results: documentation created; no application code; no tests to run.
- Remaining: approvals (TASK-013, 014, 016, 017), asset sourcing (TASK-015).
- Assumptions: see `docs/04-ai-research/ai-research.md`.
- Files modified: documentation only.

### 2026-11-21 — Folder architecture & App shell

- Tasks: TASK-025, TASK-026.
- Completed:
  - Created source folder architecture (`src/` modular folders and `src/types/index.ts`).
  - Built responsive application shell and layout skeleton (`TopBar`, `HairstyleStrip`, `ControlBar`, `StatePanel` in `src/App.tsx`).
- Commands run and real results:
  - `npm run typecheck` → exit 0.
  - `npm run lint` → exit 0.
  - `npm test` → 16 passed.
  - `npm run test:e2e` → 1 passed.
  - `npm run build` → exit 0.
- Remaining: TASK-027 (CI).
- Blockers: TASK-015 (asset sourcing), TASK-085 (no remote), TASK-086 (upstream advisory),
  P-009 (model license).
- Assumptions: none.
- Files modified: `src/components/*`, `src/App.tsx`, `TASK_BOARD.md`, `progress-report.md`.

### 2026-11-18 — Phase 0 approvals closed, Phase 1 scaffold

- Tasks: TASK-013, TASK-014, TASK-016, TASK-017, TASK-020, TASK-021.
- Completed:
  - Approved PRD/scope/MVP/acceptance criteria (TASK-013).
  - Approved ADR-001…ADR-011; ADR index carries the approval record (TASK-014).
  - Resolved open product questions: English UI with centralized strings, single-face
    detection, ±25°/±15°/±20° support claim, latest-2-versions browser baseline, no snapshot
    watermark (TASK-016).
  - Wrote and approved the privacy notice and consent copy at
    `docs/07-security/privacy-notice-copy.md` (TASK-017).
  - Initialized git, added `.gitignore`, two commits: `061d2e9` docs baseline, `16deee8`
    scaffold (TASK-020).
  - Scaffolded Vite 8.3.8 + React 19.3.1 + TypeScript 7.0.2 with strict mode
    (TASK-021).
- Commands run and real results:
  - `node -v` → v24.16.0; `npm -v` → 11.13.0; `git --version` → 2.50.1.
  - `npm install` → 24 packages added, 5 high-severity advisories (dev toolchain only).
  - `npx tsc --noEmit` → exit 0.
  - `npm run build` → `dist/index.html` 0.33 kB, `dist/assets/index-BmJ4yGqb.js` 219.75 kB
    (gzip 68.71 kB), built in 55 ms.
  - `npm audit` → GHSA-fc5q-39xc-vjpf via `vite → tinyglobby → fdir → picomatch`; only fix is a
    breaking Vite downgrade. Recorded as TASK-086, not fixed.
  - `git status --short` → clean.
- Remaining: TASK-022…027 (Tailwind, lint, test runners, folders, shell, CI).
- Blockers: TASK-015 (asset sourcing), TASK-085 (no remote), TASK-086 (upstream advisory),
  P-009 (model license).
- Assumptions: none new. Browser baseline and head-angle claim still need measurement
  (TASK-058, TASK-074).
- Files modified but not verified: none. No camera, tracking, or rendering code exists.

### 2026-11-18 — Tailwind CSS and design tokens (TASK-022)

- Task: TASK-022.
- Completed:
  - Installed `tailwindcss` 4.3.5 and `@tailwindcss/vite` 4.3.5; wired the plugin in
    `vite.config.ts`.
  - Declared every design-system token in an `@theme` block in `src/styles/index.css`; durations
    live in `:root` because Tailwind v4 has no `--duration-*` namespace.
  - Replaced the scaffold markup with a token-only sample in `src/App.tsx` (no raw hex).
- Commands run and real results:
  - `npm install` → 23 packages added, audited 54, still 5 high-severity advisories
    (TASK-086, unchanged).
  - `npx tsc --noEmit` → exit 0.
  - `npm run build` → `dist/index.html` 0.40 kB, `dist/assets/index-6NP9oSDn.css` 10.36 kB
    (gzip 2.78 kB), `dist/assets/index-CgQS1hLJ.js` 220.16 kB (gzip 68.88 kB), built in 78 ms.
  - Emitted CSS check → `--color-bg:#0b0d10`, `--color-accent:#7c9cff`, `--radius-lg:20px`,
    `--shadow-panel:`, `--ease-standard:`, `:root{--duration-fast:.12s;--duration-base:.2s}` and
    utilities `.bg-bg`, `.bg-surface`, `.text-text-muted`, `.border-border`, `.rounded-lg`,
    `.text-2xl` all present.
  - `npx vite preview --port 4180` → HTTP 200; headless Chrome screenshot at 900×600 saved to
    `docs/02-design/evidence/task-022-token-sample.png`.
- Remaining: TASK-023…027 (lint, test runners, folders, shell, CI).
- Blockers: unchanged (TASK-015, TASK-085, TASK-086, P-009).
- Assumptions: token values remain proposals; no brand approval exists yet.
- Files modified but not verified: none.

### 2026-11-19 — Test runners (TASK-024)

- Task: TASK-024.
- Completed: installed and pinned Vitest 5.1.0 and @playwright/test 1.65.0; added `test` and
  `test:e2e` scripts; added `vitest.config.ts`, `playwright.config.ts`, one unit smoke test
  (`src/features/camera/camera-service.test.ts`) and one E2E smoke test (`e2e/smoke.spec.ts`).
- Commands run and real results:
  - `npm install -D --save-exact vitest@5.1.0 @playwright/test@1.65.0` → 19 packages added, audited
    67, 0 vulnerabilities.
  - `npx playwright install chromium` → Chromium 158.0.8127.18 (v1254), FFmpeg v1013 and headless
    shell downloaded to the Playwright cache.
  - `npm run typecheck` → exit 0.
  - `npm test` → 1 test file / 1 test passed, 66 ms.
  - `npm run build` → `dist/index.html` 0.40 kB, `dist/assets/index-DplKxRef.css` 10.54 kB,
    `dist/assets/index-Cpiq5khJ.js` 223.74 kB (gzip 70.12 kB), built in 75 ms.
  - `npm run test:e2e` → 1 passed (3.3 s) on Chromium. First run timed out waiting for the
    webServer; fixed by binding the dev server with `--host 127.0.0.1`.
- Remaining: TASK-023 (lint), TASK-025 (folders), TASK-026 (shell), TASK-033 (camera state tests).
- Blockers: unchanged (TASK-015, TASK-085, TASK-086, P-009). Note: `npm audit` now reports 0
  vulnerabilities, so TASK-086 needs re-verification before it can be closed.
- Assumptions: none new.
- Files modified but not verified: none.

### 2026-11-19 — Camera state machine tests (TASK-033)

- Task: TASK-033.
- Completed: expanded `src/features/camera/camera-service.test.ts` from the TASK-024 smoke test to
  16 cases covering IDLE → REQUESTING → ACTIVE, active-stream reuse, all five browser error mappings,
  insecure context, `CameraError` passthrough, non-Error rejection, stop/track cleanup, retry and
  device listing. Added `@vitest/coverage-v8` 5.1.0 (pinned, evaluated in the stack evaluation §8)
  and a V8 coverage block in `vitest.config.ts` scoped to `camera-service.ts`.
- Commands run and real results:
  - `npm install -D --save-exact @vitest/coverage-v8@5.1.0` → 12 packages added, audited 79,
    0 vulnerabilities.
  - `npm run typecheck` → exit 0.
  - `npm test -- --coverage` → 16 passed; `camera-service.ts` statements 100% (47/47), branches
    100% (32/32), functions 100% (11/11), lines 100% (46/46).
  - `npm run build` → `dist/index.html` 0.40 kB, `dist/assets/index-DsItyQPu.css` 11.11 kB,
    `dist/assets/index-D3Mzq_gy.js` 223.74 kB (gzip 70.12 kB), built in 100 ms.
  - `npm run test:e2e` → 1 passed (912 ms).
- Remaining: manual camera UAT for TASK-030/031/032; TASK-023, TASK-025, TASK-026.
- Adjacent finding (not fixed): the approved lifecycle (`camera-pipeline.md` §3) includes
  `INITIALIZING`, but `CameraService` jumps `REQUESTING → ACTIVE`. The four tracking states are not
  produced until TASK-041/045. Needs an owner decision; no spec or implementation was changed here.
- Blockers: unchanged (TASK-015, TASK-085, TASK-086, P-009).
- Assumptions: none new.
- Files modified but not verified: none.

### 2026-11-19 — Camera milestone closed (TASK-030…033, D-022)

- Tasks: TASK-030, TASK-031, TASK-032 marked DONE from owner-reported manual browser UAT; TASK-033
  already DONE. M2 is 4/4 (100%).
- Completed:
  - Owner decision D-022 recorded: `camera-pipeline.md` §3 now assigns `REQUESTING → ACTIVE` to
    `CameraService` and moves `INITIALIZING` + the four tracking states to the video/tracking layer
    (TASK-041/045). `component-architecture.md` §2 and `user-journey.md` updated for consistency.
    `camera-service.ts` was not changed.
  - Tailwind v4 `@source not` exclusions for `*.test.*`, `*.spec.*` and `e2e/` added to
    `src/styles/index.css`.
- Commands run and real results:
  - `npm test` → 16 passed (60 ms).
  - `npm run typecheck` → exit 0.
  - `npm run build` → `dist/index.html` 0.40 kB, `dist/assets/index-DplKxRef.css` 10.54 kB
    (gzip 2.84 kB), `dist/assets/index-Cpiq5khJ.js` 223.74 kB (gzip 70.12 kB), built in 67 ms.
    CSS is back to the pre-test-file size (was 11.11 kB).
- Remaining: TASK-025 (folder structure), TASK-026 (app shell), then CI.
- Blockers: unchanged (TASK-015, TASK-085, TASK-086, P-009).
- Assumptions: the manual UAT pass is owner-reported; no screenshots or recording were supplied,
  so those artifacts are absent from the evidence.
- Files modified but not verified: none.

### 2026-11-19 — Lint and formatting (TASK-023)

- Task: TASK-023.
- Completed: ESLint 10.15.0 + `@eslint/js` 10.0.1 + `typescript-eslint` 8.73.0 and Prettier 3.10.1
  installed and pinned. Added `eslint.config.js`, `.prettierignore`, and `lint` / `format` /
  `format:check` scripts. TypeScript 7 side-by-side aliases adopted (D-023). Prettier reformatted
  only code/config files; the 35 documentation files remain untouched.
- Commands run and real results:
  - `npm install` → 0 vulnerabilities; one npm warning about typescript-estree's optional
    `@typescript/native` peer range (`>=7.1` dev).
  - `npx tsc --version` → 7.0.2 (unchanged after aliasing).
  - `npm run lint` → exit 0, zero warnings.
  - `npm run format` → reformatted 5 files; `npm run format:check` → "All matched files use
    Prettier code style!"
  - `npm run typecheck` → exit 0; `npm test` → 16 passed (75 ms); `npm run build` → CSS 10.54 kB,
    JS 223.74 kB (78 ms); `npm run test:e2e` → 1 passed (979 ms).
- Remaining: TASK-025 (folder structure), TASK-026 (app shell), TASK-027 (CI).
- Blockers: unchanged (TASK-015, TASK-085, TASK-086, P-009).
- Assumptions: none new. The npm peer warning is non-blocking; lint and typecheck both pass.
- Files modified but not verified: none.
