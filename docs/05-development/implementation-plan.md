# Implementation Plan

> Status: PROPOSED · Last updated: 2026-11-09
> Companion to `TASK_BOARD.md`. This document explains sequencing, not task detail.

## 1. Eligibility rule

A task is eligible when:

1. Its status is `TODO` (not `BLOCKED`, `IN_PROGRESS`, `REVIEW`, `DONE`, `CANCELLED`).
2. Every dependency is `DONE` with evidence.
3. Its milestone entry criteria are met.
4. No approval gate is open for its scope.

If no task is eligible, the correct action is to resolve a blocker, not to start downstream work.

## 2. Execution order

```
M0 approvals
  → M1 foundation (020→027)
  → M2 camera (030→033)
  → M3 tracking (040→047)
  → M4 rendering (050→058)
  → M5 experience (060→068)
  → M6 quality (070→078)
  → M7 release (080→084)
```

Within a milestone, follow the dependency graph. Parallel work is allowed only when tasks share no
files and no runtime contract.

## 3. Critical path

```
TASK-013 → TASK-020 → TASK-021 → TASK-040 → TASK-041 → TASK-042
→ TASK-043 → TASK-044 → TASK-053 → TASK-054 → TASK-055 → TASK-058
→ TASK-066 → TASK-073 → TASK-082 → TASK-084
```

Delays here delay the release. The asset branch (`TASK-015 → 051 → 052`) is the second-most
critical path and is currently blocked.

## 4. Parallel workstreams

| Workstream | Tasks | Can run alongside |
|---|---|---|
| Foundation | 020–027 | Documentation approvals |
| Camera | 030–033 | Foundation tail |
| Vision | 040–047 | Camera tail, after 021 |
| Assets | 050–052 | Vision, after TASK-015 |
| Renderer | 053–058 | Assets, after 042 |
| UX | 060–068 | Renderer tail |
| Quality | 070–078 | UX tail |
| Release | 080–084 | Quality tail |

## 5. File ownership to avoid conflicts

| Area | Files |
|---|---|
| Camera | `src/features/camera/**`, `src/hooks/use-camera.ts` |
| Tracking | `src/features/face-tracking/**`, `src/hooks/use-face-tracking.ts` |
| Renderer | `src/features/renderer/**` |
| Catalog | `src/features/hairstyle/**`, `public/assets/hairstyles/**` |
| UI | `src/components/**`, `src/app/**` |
| Quality | `tests/**` |

Two tasks that touch the same area should not run concurrently.

## 6. Verification checkpoints

| Checkpoint | Gate |
|---|---|
| After M1 | CI green on scaffold |
| After M2 | Camera states demonstrated |
| After M3 | Pose direction and smoothing verified |
| After M4 | Three assets visually accepted |
| After M5 | Full journey on desktop and mobile |
| After M6 | UAT, privacy, security signed off |
| After M7 | Production smoke test |

## 7. Change control during implementation

- New requirement → update PRD/scope → create task → approve → implement.
- Discovered technical constraint → ADR update or new ADR → approve → implement.
- Scope creep → note it, do not implement it silently.
- Defect → create a task (next free ID) unless it is within the current task's scope.

## 8. Session protocol

1. Read `AGENTS.md`, `TASK_BOARD.md`, and the task entry.
2. Inspect the repository and verify dependencies with evidence.
3. Write a short plan in the task's execution notes.
4. Implement only the scope.
5. Run typecheck, lint, tests, build.
6. Verify each acceptance criterion.
7. Update documentation.
8. Update status, milestone percentage, progress report.
9. Report files changed, commands run, results, and remaining work.

If interrupted, record partial progress and the exact next step before stopping.

## 9. Relative effort (no calendar estimates)

| Complexity | Meaning |
|---|---|
| S | One focused change, low uncertainty |
| M | Multiple files or a new subsystem integration |
| L | Cross-cutting change with calibration or verification work |

Calendar estimates are intentionally omitted until the team and device access are known.
