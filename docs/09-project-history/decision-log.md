# Decision Log

> Status: Living document · Last updated: 2026-11-09
> ADRs are the detailed record; this log is the chronological index.

## 1. Decisions recorded

| ID | Date | Decision | Type | Status | Reference |
|---|---|---|---|---|---|
| D-001 | 2026-11-09 | Preserve the original planning document as an unmodified archive. | Documentation | Accepted (internal) | `docs/09-project-history/original-planning-document-v1.0.md` |
| D-002 | 2026-11-09 | Use a layered documentation system under `docs/00…09` with a single task board. | Documentation | Accepted (internal) | `README.md`, `AGENTS.md` |
| D-003 | 2026-11-09 | Treat all architecture decisions as PROPOSED until explicit approval. | Governance | Accepted (internal) | `docs/03-architecture/adr/README.md` |
| D-004 | 2026-11-09 | Tag technical statements VERIFIED / ASSUMPTION / PROPOSAL / OPEN. | Documentation | Accepted (internal) | `project-overview.md` §4 |
| D-005 | 2026-11-09 | Defer application implementation until approval gates close. | Governance | Accepted (internal) | `TASK_BOARD.md` |
| D-006 | 2026-11-09 | Propose MediaPipe Face Landmarker for tracking. | Architecture | PROPOSED | ADR-004 |
| D-007 | 2026-11-09 | Propose Canvas 2D for rendering. | Architecture | PROPOSED | ADR-005 |
| D-008 | 2026-11-09 | Propose client-side-only processing. | Architecture | PROPOSED | ADR-006 |
| D-009 | 2026-11-09 | Propose self-hosting WASM and model assets. | Architecture | PROPOSED | ADR-011 |
| D-010 | 2026-11-09 | Adopt Node 22.12+ as the baseline. | Tooling | PROPOSED | Stack evaluation §1 |
| D-011 | 2026-11-09 | Keep the MVP asset count at a minimum of 3 styles across 2 categories. | Product | PROPOSED | Product scope §3 |

## 2. Approvals and resolutions (2026-11-18)

| ID | Question | Decision | Status |
|---|---|---|---|
| P-001 | Approve product scope and PRD | Approved as written; no amendments requested | RESOLVED |
| P-002 | Approve or reject ADR-001…011 | All 11 approved; none rejected | RESOLVED |
| P-003 | Asset sourcing and licensing | Undecided | **OPEN** — blocks TASK-051 |
| P-004 | UI language | English UI, strings centralized in one module | RESOLVED |
| P-005 | Multi-face policy | One face (`numFaces: 1`); extra faces ignored silently | RESOLVED |
| P-006 | Supported head-angle claim | Near-frontal: ±25° yaw, ±15° pitch, ±20° roll; fade outside | RESOLVED (to be measured in TASK-058) |
| P-007 | Device/browser baseline | Latest 2 versions: Chrome/Edge desktop, Safari macOS, Chrome Android, Safari iOS | RESOLVED (to be confirmed in TASK-074) |
| P-008 | Snapshot watermark | None | RESOLVED |
| P-009 | Model bundle license | Unconfirmed; blocks commercial launch only | **OPEN** |
| P-010 | Privacy jurisdiction | Indonesia (UU 27/2022 PDP) assumed; legal review deferred | RESOLVED as assumption |

Related records: `docs/03-architecture/adr/README.md` (approval record),
`docs/07-security/privacy-notice-copy.md` (approved copy), TASK-013/014/016/017 evidence.

## 3. Decisions added at approval

| ID | Date | Decision | Status | Reference |
|---|---|---|---|---|
| D-012 | 2026-11-18 | Approve PRD, product scope, MVP specification, and acceptance criteria. | ACCEPTED | TASK-013 |
| D-013 | 2026-11-18 | Approve ADR-001…ADR-011 as a set. | ACCEPTED | ADR index |
| D-014 | 2026-11-18 | English UI copy, centralized strings module. | ACCEPTED | PRD §7 |
| D-015 | 2026-11-18 | Single-face detection; extra faces ignored without warning. | ACCEPTED | PRD §7 |
| D-016 | 2026-11-18 | Near-frontal support claim (±25° yaw, ±15° pitch, ±20° roll). | ACCEPTED | PRD §7 |
| D-017 | 2026-11-18 | No snapshot watermark. | ACCEPTED | PRD §7 |
| D-018 | 2026-11-18 | Pin Vite 8.3.8 (registry moved from 8.3.6 recorded in Phase 0). | ACCEPTED | Stack evaluation §1 |

## 3. Decision process

1. Proposal written with context, options, and trade-offs.
2. Impact checked against scope, privacy, and schedule.
3. Project owner approves or rejects in writing.
4. ADR status updated; this log updated.
5. Implementation may reference the decision.

Agents may not change an approved decision; they must propose a superseding ADR.
