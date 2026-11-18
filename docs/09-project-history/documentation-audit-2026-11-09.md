# Documentation & Architecture Audit — 2026-11-09

> Status: Complete (Phase 0 audit) · Auditor: AI agent acting as architect/product/researcher
> Scope: initial planning document v1.0 and empty repository.

## 1. Inputs inspected

| Input | Finding |
|---|---|
| Repository files | Only the initial planning document existed at `docs/PRD.md` (now archived) |
| Git | Not a repository |
| Source code | None |
| Dependencies | None |
| Tests | None |

## 2. Initial document audit

### 2.1 Strengths

- Clear product vision and boundaries.
- Explicit MVP non-goals.
- Sensible privacy principles.
- Recognizes that hairstyle alignment is not solved by landmarks alone (§5.4 note).
- Phase-based roadmap with exit criteria.
- Governance rules that require documentation and verification.

### 2.2 Inconsistencies and gaps found

| ID | Finding | Resolution |
|---|---|---|
| F-01 | Proposed folder structure (`docs/00-overview`, `docs/01-product`, …) differs from the required structure for this audit. | Adopted `docs/00-project-overview` … `docs/09-project-history`. |
| F-02 | "Tracking confidence" is treated as an output, but the MediaPipe web result does not document a per-face confidence field. | Defined a derived heuristic in the face tracking spec; flagged as not an accuracy score. |
| F-03 | The document implies landmarks enable hairstyle alignment; it also notes they do not cover the hairline. | Made alignment an explicit calibration problem; added asset anchor/calibration spec. |
| F-04 | P0 "Head tracking" has no measurable acceptance criterion. | Added AC-04 with direction checks and manual verification. |
| F-05 | Performance numbers are presented without benchmark evidence. | Reclassified as engineering targets; added a benchmark plan. |
| F-06 | Browser list omits Firefox even though MediaPipe web supports it. | Added Firefox to the evaluated matrix; support claim remains pending device testing. |
| F-07 | No task IDs, dependencies, or evidence requirements. | Created 69 tasks with dependencies, verification, and evidence. |
| F-08 | No test-case traceability from requirements. | Added TC-01…TC-40 mapped to acceptance criteria. |
| F-09 | "Multiple faces detected" state exists but no policy. | Recorded as open question P-005 / TASK-016. |
| F-10 | Privacy claims local processing, but official examples load WASM/model from a CDN. | Proposed self-hosting (ADR-011) and added network verification. |
| F-11 | Asset metadata example lacks license, version, calibration, and thumbnail fields. | Extended the schema in the asset specification. |
| F-12 | No defined supported head-angle range. | Recorded as open question P-006; MVP limited to near-frontal. |
| F-13 | No accessibility requirement. | Added NFR-07 and an accessibility pass task. |
| F-14 | No error taxonomy for camera failures. | Added typed error codes and a state table. |
| F-15 | No decision on mirroring or snapshot orientation. | Proposed draw-time mirroring so the snapshot matches the preview. |
| F-16 | No minimum asset count for a usable MVP. | Set at 3 styles across 2 categories. |
| F-17 | No CI, deployment, or environment specifics. | Added CI, environment setup, and deployment guide. |
| F-18 | Node runtime requirement absent; Vite/Vitest need modern Node. | Set Node 22.12+ baseline from verified engine fields. |
| F-19 | Original PRD would become a competing source of truth after expansion. | Archived it unmodified and made `docs/01-product/prd.md` authoritative. |
| F-20 | No explicit distinction between verified facts and assumptions. | Added the evidence vocabulary and tagged claims. |

## 3. Technical findings

1. MediaPipe Face Landmarker returns 478 landmarks, optional 52 blendshapes, and an optional 4×4
   transformation matrix; web supports `IMAGE` and `VIDEO` only (VERIFIED).
2. `detectForVideo` requires monotonically increasing timestamps; the documented live pattern is
   `VIDEO` + `requestAnimationFrame` (VERIFIED).
3. With `numFaces: 1`, the library applies temporal smoothing (VERIFIED); the algorithm is not
   documented.
4. Landmarks are normalized to the video frame; `z` is scaled like `x`, not metric depth (VERIFIED).
5. The model bundle is 3,758,596 bytes (VERIFIED via HEAD request).
6. `getUserMedia` requires a secure context, explicit permission, and can reject with several
   documented error types; the permission promise may never settle (VERIFIED).
7. The MediaPipe SDK is Apache-2.0 (VERIFIED). Model bundle redistribution terms remain OPEN.
8. Verified package versions on 2026-11-09: `@mediapipe/tasks-vision` 1.2.2, React 19.3.1, Vite
   8.3.6, TypeScript 7.0.2, Tailwind 4.3.5, Vitest 5.1.0, Playwright 1.65.0.
9. Vite and Vitest together require Node 22.12+.
10. No runtime benchmark was performed; all performance numbers remain targets.

## 4. Deliverables produced

See `docs/09-project-history/changelog.md` for the full list. Highlights:

- 35 required documents plus ADR index and this audit.
- ADR-001…ADR-011, all PROPOSED.
- TASK_BOARD with 69 tasks.
- Decision log with 11 recorded and 10 pending decisions.

## 5. Consistency review (Phase 4)

Checks performed:

- All internal links resolve to existing files.
- All task IDs referenced in documents exist.
- No duplicate task IDs.
- No circular dependencies (all edges point to lower IDs).
- Task counts in the board, progress report, and changelog agree.
- No document claims implementation or benchmark results.
- The archived original is not referenced as the active PRD.

Result: PASS, with open approvals noted below.

## 6. Readiness assessment

**Not ready to start implementation.** Documentation is complete and internally consistent, but:

- Product scope/PRD approval is pending (TASK-013).
- Architecture decisions are PROPOSED (TASK-014).
- Open product questions remain (TASK-016).
- Asset sourcing/licensing is undecided and blocking (TASK-015).
- Model bundle license is unconfirmed.
- No runtime benchmark exists.

Once TASK-013, TASK-014, TASK-016, and TASK-017 are resolved, Phase 1 (TASK-020, TASK-021) may
begin. TASK-015 can proceed in parallel but blocks Phase 4.

## 7. Confirmation

No application source code was written, no dependencies were installed, no application was
initialized, and nothing was deployed. Only documentation and research records were produced.
