# AGENTS.md — Operating Rules for AI Agents

This file governs any AI agent (OpenCode, Codex, Claude, or other) working in this repository.
It applies to documentation, research, and future implementation.

---

## 1. Documentation-first workflow

1. Read the relevant documentation before changing anything.
2. If a requirement is not documented, document it first or ask the user. Do not invent scope.
3. Implementation tasks may only start when their dependencies and approval gates in
   `docs/05-development/TASK_BOARD.md` are satisfied.
4. Every implementation change must update the documents it invalidates in the same session.

## 2. Repository inspection (mandatory before any edit)

Before editing, an agent must:

- List the repository contents and read the files relevant to the task.
- Check `git status` when the directory is a git repository.
- Treat unfamiliar or uncommitted files as user work: do not delete or overwrite them.
- Confirm the current state against `TASK_BOARD.md` and `docs/09-project-history/progress-report.md`.
- Never assume a dependency is complete because a checkbox says so; verify the evidence listed
  in the task.

## 3. Taskboard synchronization

- `docs/05-development/TASK_BOARD.md` is the single authoritative task index.
- A task's status changes only with evidence recorded in the task entry.
- Valid statuses: `TODO`, `IN_PROGRESS`, `BLOCKED`, `REVIEW`, `DONE`, `CANCELLED`.
- When a task changes status, update: the task entry, the milestone percentage, and
  `docs/09-project-history/progress-report.md`.
- Task IDs are permanent and never reused. New work gets the next free ID.

## 4. Coding conventions

- Follow `docs/05-development/coding-standards.md`.
- TypeScript strict mode; no `any` without a written justification.
- Keep camera, tracking, rendering, and UI concerns separated as defined in
  `docs/03-architecture/component-architecture.md`.
- No dependency is added without being evaluated in
  `docs/03-architecture/technical-stack-evaluation.md` and pinned to a version.

## 5. Testing requirements

- Follow `docs/06-quality/testing-strategy.md`.
- Every non-trivial logic change ships with tests (unit or integration as appropriate).
- Run type checking, linting, unit tests, and build before claiming completion.
- Manual UAT is required for camera, tracking, and rendering changes.
- Never fabricate or paraphrase test output. Paste real results.

## 6. Change management

- Approved decisions live in `docs/03-architecture/adr/` and the
  `docs/09-project-history/decision-log.md`.
- An agent may **not** unilaterally change an approved ADR. Propose a new ADR or a superseding
  ADR and wait for user approval.
- Destructive operations (deleting files, rewriting history, removing features) require explicit
  user approval.
- Scope changes require a documented update to the PRD/scope plus user approval.

## 7. Scope control

- Implement only what the task states. Note adjacent issues instead of fixing them silently.
- MVP boundaries are defined in `docs/01-product/product-scope.md`. Clothing, generative
  replacement, accounts, cloud storage, and marketplace features are out of scope.
- Do not add "for later" abstractions, options, or configuration nobody requested.

## 8. Documentation update rules

Update these when affected:

| Change | Documents to update |
|---|---|
| Requirement or scope | PRD, product scope, acceptance criteria, task board |
| Architecture or technology | System architecture, component architecture, stack evaluation, ADR, decision log |
| UI behavior | UI/UX specification, design system, test cases |
| Camera/tracking/rendering behavior | Camera pipeline, face tracking spec, rendering spec, benchmark plan |
| Security/privacy behavior | Privacy requirements, security requirements |
| Process or tooling | Coding standards, environment setup, testing strategy |
| Release | Changelog, progress report, deployment guide |

Never leave two documents asserting conflicting facts. If two sources disagree, fix both and
record the resolution in the decision log.

## 9. AI agent handover

When ending a session, the agent must leave a handover note containing:

- Task ID and current status.
- What was completed, with file paths.
- Commands run and their real results.
- What remains, including the next concrete step.
- Known blockers and assumptions.
- Any files modified but not yet verified.

Record the handover in `docs/09-project-history/progress-report.md` (session log section).

## 10. DONE verification

A task may be marked `DONE` only when:

1. All acceptance criteria are checked individually.
2. The verification method in the task entry was executed.
3. The evidence listed in the task entry exists.
4. Relevant tests, type check, lint, and build pass.
5. Documentation is updated.
6. No known critical defect was introduced.

Documentation tasks additionally require a consistency review against the documentation map.
Writing a document is not, by itself, evidence that it is correct or approved.

## 11. Honesty rules

- Distinguish **VERIFIED** (checked against a source), **ASSUMPTION**, **PROPOSAL**, and
  **OPEN QUESTION**. Never present an assumption as a verified fact.
- Do not invent benchmark numbers, API capabilities, browser support, or licensing terms.
- If a tool or source cannot be checked, say so and record it as an open question.
