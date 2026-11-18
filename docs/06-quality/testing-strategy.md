# Testing Strategy

> Status: PROPOSED · Last updated: 2026-11-09
> Tooling: Vitest + Playwright. Manual UAT is mandatory for vision and camera behavior.

## 1. Test pyramid

| Layer | Tool | Scope | Speed |
|---|---|---|---|
| Unit | Vitest | Pure math, state machines, validation, smoothing | Fast |
| Integration | Vitest + injected dependencies | Camera service, tracking service, renderer pipeline | Medium |
| E2E | Playwright | User flows with a fake media stream | Slow |
| Manual UAT | Human | Real camera, real devices, visual alignment | Slow |
| Benchmark | Instrumented build | FPS, latency, memory, thermal | Manual |

## 2. What must be tested

### Unit
- Anchor, scale, rotation, and cover-fit math.
- Smoothing filter behavior (jitter, lag, reset).
- Camera state transitions and error mapping.
- Catalog filtering and metadata validation.
- Snapshot filename and format logic.
- Local storage read/write/failure.

### Integration
- Camera service with a mocked `MediaDevices`.
- Tracking service with a synthetic landmark source.
- Renderer with a synthetic video frame and asset.
- Asset switching without stream reinitialization.
- Error propagation from service to UI state.

### E2E (Playwright, fake media)
- Consent gate: no camera request before consent.
- Happy path: start → select → snapshot → download.
- Style switching preserves the stream.
- Stop releases the camera.
- Permission-denied state renders.

### Manual UAT
- Real face, real lighting, real movement.
- Alignment per asset.
- Lost-tracking behavior.
- Mobile orientation and one-handed reach.
- Camera indicator off after stop.
- Thermal behavior over 5 minutes.

## 3. What automation cannot prove

- Landmark accuracy on real faces.
- Visual alignment quality.
- Real camera permission UX across browsers.
- Performance on physical devices.
- Privacy in the browser's implementation.

These require manual evidence.

## 4. Determinism rules

- No test depends on wall-clock time; inject time or use fake timers.
- No test depends on a real camera or network.
- Synthetic landmark sequences are fixtures with known expected outputs.
- Flaky tests are quarantined with a task, not ignored.

## 5. Coverage policy (proposed)

- Pure logic modules: ≥ 90% line coverage.
- Services: ≥ 80%.
- UI components: behavior-focused, no hard global number.
- Coverage is a floor, not a goal; untested branches matter more than the percentage.

Exact thresholds are enforced in TASK-070.

## 6. CI gates

Every pull request:

1. Type check.
2. Lint with zero warnings.
3. Unit + integration tests.
4. Production build.
5. E2E smoke (fake media).
6. Documentation link check (when available).

Release additionally requires manual UAT and benchmark evidence.

## 7. Test data

- Landmark fixtures: still, slow pan, nod, roll, jitter, loss.
- Face widths: narrow, medium, wide.
- Assets: at least one short and one long style.
- Corrupt catalog entries for validation tests.
- Permission outcomes: granted, denied, dismissed, unavailable.

## 8. Defect handling

- Every fixed defect gets a regression test.
- Critical defects block release.
- Known limitations are documented, not hidden as passing tests.
- Test results are pasted verbatim in task evidence.

## 9. Environment matrix

| Environment | Required |
|---|---|
| Local Chrome desktop | Yes |
| CI headless Chromium (fake media) | Yes |
| Safari macOS | Yes |
| Chrome Android | Yes |
| Safari iOS | Yes if available |

## 10. Reporting

Each test task records:

- Command executed.
- Pass/fail counts.
- Coverage where applicable.
- Failing test names and reasons.
- Link to CI run or raw output.
