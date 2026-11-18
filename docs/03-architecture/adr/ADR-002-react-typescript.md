# ADR-002 — Frontend: React + TypeScript

**Status:** APPROVED (2026-11-18)
**Date:** 2026-11-09

## Context

The UI has discrete states (camera, tracking, catalog, snapshot) and coordinate-heavy logic that
benefits from strong typing. The original document proposes React and TypeScript.

## Problem statement

Which frontend framework and language should the MVP use?

## Options considered

1. React + TypeScript.
2. Vue + TypeScript.
3. Svelte + TypeScript.
4. Solid + TypeScript.
5. Vanilla TypeScript.

## Decision

React 19.x with TypeScript in strict mode.

## Rationale

- Mature ecosystem and tooling.
- Component model fits the screen/state structure.
- TypeScript catches coordinate and state-contract errors early.
- Large talent pool and documentation.
- No framework-specific capability is required for the MVP.

## Trade-offs

- React re-renders can cause jank if the frame loop is coupled to state.
- More boilerplate than Svelte/Solid.
- Bundle size larger than minimal alternatives.

## Consequences

- The frame loop must live outside React render (component architecture §4).
- Per-frame values use refs/imperative canvas writes.
- Strict TypeScript is enforced by the coding standards.
- Framework choice does not affect the vision or tracking design.

## Verification requirements

- Type check passes in CI (TASK-027).
- No per-frame React state churn in profiling (TASK-047).
- Build output loads on the target matrix (TASK-074).
