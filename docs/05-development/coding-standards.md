# Coding Standards

> Status: PROPOSED · Last updated: 2026-11-09
> Applies to all application code once Phase 1 starts.

## 1. Language and type safety

- TypeScript strict mode; `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes` recommended.
- No `any`. Use `unknown` plus narrowing. A justified `any` needs a comment and review.
- Prefer discriminated unions for states (`CameraState`, error codes).
- No non-null assertions (`!`) unless the invariant is obvious and commented.
- Avoid type casts that hide a real mismatch; validate at boundaries.

## 2. Naming

| Kind | Convention | Example |
|---|---|---|
| Files (modules) | kebab-case | `face-tracking-service.ts` |
| React components | PascalCase file | `CameraPreview.tsx` |
| Functions/variables | camelCase | `computeOverlayTransform` |
| Types/interfaces | PascalCase | `HeadPose` |
| Constants | SCREAMING_SNAKE | `MAX_TRACKING_LOSS_MS` |
| CSS tokens | kebab-case | `--color-surface-raised` |
| Test files | `*.test.ts` / `*.spec.ts` | `smoothing.test.ts` |

Names describe intent, not implementation. Avoid abbreviations except `px`, `ms`, `dpr`.

## 3. Module structure

- One responsibility per module.
- Pure math in `src/utils` or feature-level `*-math.ts`; no DOM access there.
- Services own side effects; components own presentation.
- No cross-feature imports of internals; share through `src/types` or pure utilities.
- Barrel files are allowed only at feature boundaries, not everywhere.

## 4. React rules

- The animation loop must not live in render.
- Per-frame data goes to refs or directly to canvas, not React state.
- React state is for discrete transitions only.
- Effects clean up tracks, timers, and model instances.
- Avoid `useEffect` for derived state; compute during render.
- Memoize only measured hotspots, not by default.
- Keys must be stable IDs, never array indices for reorderable lists.

## 5. Error handling

- Never swallow an error silently.
- Map browser errors to typed app errors at the boundary.
- User-facing messages say what happened and what to do next.
- Distinguish recoverable (retry) from fatal states.
- Log technical detail locally; do not send image data or personal data to a logging service.

## 6. Performance rules

- No allocation-heavy work in the frame loop without measurement.
- Reuse canvas/context and decoded assets.
- Guard inference with `video.currentTime !== lastVideoTime`.
- Avoid layout thrash; batch reads/writes.
- Measure before optimizing; record before/after numbers.

## 7. Accessibility rules

- Every interactive element has an accessible name.
- Keyboard reachable in logical order; visible focus.
- State changes announced through a polite live region.
- Respect `prefers-reduced-motion`.
- Do not convey status by color alone.

## 8. Testing rules

- Pure logic: unit tests.
- Service integration: tests with injected dependencies.
- User flows: Playwright.
- Bug fixes include a regression test.
- Tests must be deterministic; no reliance on wall-clock time or real camera.
- A skipped test is a documented TODO, not a pass.

## 9. Comments and documentation

- Comment the **why**, not the **what**.
- Any workaround gets: `shortcut: <limit>, <when to upgrade>`.
- Update the relevant document in the same change when behavior changes.
- No commented-out code committed; use version control.

## 10. Dependencies

- Every dependency must be justified in the stack evaluation and pinned.
- Prefer platform APIs over libraries for small needs.
- Check license and bundle impact before adding.
- No `@latest` in production imports or CDN URLs.

## 11. Git conventions

- Small, focused commits with imperative messages.
- Prefix: `feat:`, `fix:`, `docs:`, `test:`, `chore:`, `refactor:`.
- Reference the task ID in the commit body.
- Do not commit secrets, model binaries without a license decision, or `node_modules`.
- Do not rewrite shared history without approval.

## 12. Privacy and security in code

- No network call may carry camera frames, snapshots, or landmarks.
- No face recognition, identity matching, or biometric template creation.
- Store only non-sensitive preferences.
- Validate all external data (catalog JSON, stored values).
- Use `noopener`/`noreferrer` for external links.

## 13. Formatting

- Prettier with project defaults; no manual formatting debates.
- ESLint must pass with zero warnings in CI.
- Import order enforced by the linter.
