# Technical Stack Evaluation

> Status: PROPOSED · Last updated: 2026-11-09
> Verification date: 2026-11-09. Sources are official docs, npm registry metadata, and the
> MediaPipe license file. No runtime benchmark was executed; performance claims are targets.

## 1. Verified package snapshot

Versions below are the `latest` dist-tags read from the npm registry on 2026-11-09. They must be
pinned and re-verified at implementation time.

| Package | Latest | License | Engines | Unpacked size |
|---|---|---|---|---|
| `@mediapipe/tasks-vision` | 1.2.2 | Apache-2.0 | not declared | 31.3 MB (all WASM variants) |
| `react` | 19.3.1 | MIT | `node >=0.10.0` | 179 KB |
| `vite` | 8.3.6 | MIT | `node ^20.19.0 \|\| >=22.12.0` | 2.4 MB |
| `typescript` | 7.0.2 | Apache-2.0 | `node >=16.20.0` | 2.5 MB |
| `tailwindcss` | 4.3.5 | MIT | not declared | 787 KB |
| `vitest` | 5.1.0 | MIT | `node ^22.12.0 \|\| ^24.0.0 \|\| >=26.0.0` | 2.9 MB |
| `@playwright/test` | 1.65.0 | Apache-2.0 | `node >=20` | 28.5 KB |

**Practical Node baseline:** Node.js 22.12 or newer satisfies Vite and Vitest simultaneously.

## 2. Face tracking — MediaPipe Face Landmarker

**What it does (VERIFIED).** Detects faces and returns 478 3D facial landmarks per face, optional
52 blendshape scores, and an optional 4×4 facial transformation matrix from canonical face
coordinates to the detected face. On the web it supports `IMAGE` and `VIDEO` running modes.
`detectForVideo()` requires monotonically increasing timestamps. With `numFaces: 1`, temporal
smoothing is applied by the library.

**Why considered.** On-device execution, no API key, no per-request cost, a maintained web package,
and a documented output suitable for overlay positioning.

**Alternatives.** TensorFlow.js face-landmarks-detection, face-api.js, commercial SDKs
(Banuba, DeepAR), cloud vision APIs, custom models. See `docs/04-ai-research/model-evaluation.md`.

**Benefits.**
- Runs locally; no image leaves the device.
- 478 points and a pose matrix in one call.
- Apache-2.0 licensed SDK.
- Documented web setup and official samples.

**Limitations (VERIFIED or explicitly uncertain).**
- Landmarks describe the face surface, not the hairline or skull. Accurate hairstyle alignment is
  **not** provided out of the box; it requires calibration.
- Web has no `LIVE_STREAM` mode; the documented pattern is `VIDEO` + `requestAnimationFrame`.
- Inference is synchronous in the web API; it competes with rendering on the main thread unless
  moved to a worker.
- Exact model-bundle license terms were not independently verified (model card links are published;
  confirm before redistribution).
- Accuracy under extreme yaw/pitch, occlusion, low light, and varied hair is unverified.
- Performance on mid-range mobile is unverified.

**Browser compatibility (VERIFIED).** MediaPipe web requires a modern browser with WebAssembly
support: Chrome, Edge, Safari, Firefox. WebGPU is recommended only for large generative models,
not for this task.

**Licensing (VERIFIED).** SDK repository license is Apache-2.0. Model bundle license: **OPEN** —
confirm before redistribution or commercial launch.

**Performance considerations.** WASM + 3.6 MB model download; first inference includes
initialization cost; GPU delegate uses WebGL/WebGPU. All numbers must be measured (TASK-047).

**Verification results.** API shape, outputs, running modes, coordinate semantics, and model size
verified from official documentation. Runtime performance: not measured.

**Remaining uncertainties.**
- Real-world landmark stability on varied skin tones, lighting, and hair.
- Alignment error at the hairline.
- Thermal throttling on mobile.
- Model bundle licensing.

## 3. Camera — `navigator.mediaDevices.getUserMedia`

**VERIFIED facts.**
- Available only in secure contexts (HTTPS or localhost); in insecure contexts
  `navigator.mediaDevices` is `undefined`.
- Always requires user permission; the browser shows a camera-in-use indicator.
- Rejects with `NotAllowedError` (denied/insecure), `NotFoundError` (no device),
  `NotReadableError` (hardware/browser failure), `OverconstrainedError` (constraints unsatisfiable).
- The permission promise may never settle if the user ignores the prompt.
- `facingMode: "user"` prefers the front camera; stop tracks before switching facing mode.
- `deviceId` selection is available via `enumerateDevices()`; labels may require permission.

**Why considered.** Native browser API, no dependency, works across target browsers.

**Alternatives.** `MediaRecorder` is for recording, not preview. Native apps are out of scope.
Third-party capture libraries add no value for a single stream.

**Limitations.** Permission UX varies by browser; iOS Safari has historically stricter behavior
around streams and autoplay; exact behavior must be tested on the device matrix.

**Verification results.** API semantics verified from MDN. iOS-specific behavior: not tested.

## 4. Rendering — Canvas 2D

**What it does.** Draws the video frame and the transparent hairstyle image, applies transforms,
and encodes snapshots.

**Why considered.** Simple, universally supported, sufficient for a 2D overlay, no 3D pipeline.

**Alternatives.** WebGL (better for complex compositing and shaders), CSS transforms over a video
element (limited compositing and snapshot control), WebGPU (overkill, less support).

**Benefits.** Predictable 2D compositing; easy snapshot via `toBlob`; no shader complexity.

**Limitations.** Per-frame full-canvas draw cost at high resolution; no built-in hair occlusion;
quality depends on asset realism; main-thread drawing competes with inference.

**Verification results.** Supported everywhere; performance on target devices unmeasured.

## 5. Frontend — React + TypeScript

**Why considered.** Component model for the UI, strong typing for coordinate and state contracts,
large ecosystem, team familiarity (assumption).

**Alternatives.** Svelte, Vue, Solid, vanilla TypeScript. None offers a decisive MVP advantage;
React is retained as a proposal, not a verified requirement.

**Limitations.** React re-renders must not drive the per-frame loop; camera/tracking state must live
outside React render cycles to avoid jank.

**Verification results.** Package/license verified. Suitability is a proposal.

## 6. Build — Vite

**Why considered.** Fast dev server, native TS/ESM, simple static build output.

**Verified constraint.** Vite 8.3.6 requires Node `^20.19.0 || >=22.12.0`.

**Alternatives.** Parcel, Webpack, Rspack. Vite is sufficient and simpler for a static SPA.

## 7. Styling — Tailwind CSS

**Why considered.** Token-driven utility styling, small runtime, fast iteration.

**Verified.** Tailwind 4.3.5, MIT. v4 uses CSS-first configuration; confirm exact setup during
TASK-022.

**Alternatives.** CSS Modules, vanilla-extract, styled-components. Tailwind is a proposal.

## 8. Testing — Vitest + Playwright

**Verified.** Vitest 5.1.0 requires Node `^22.12.0 || ^24.0.0 || >=26.0.0`. Playwright 1.65.0
requires Node ≥20.

**Roles.** Vitest for pure math, state machines, and component logic; Playwright for browser flows
and permission scenarios. Camera hardware cannot be validated by automation alone; manual UAT is
mandatory.

**Limitations.** Playwright can fake media streams with launch flags, but that does not prove real
camera behavior or tracking quality.

## 9. Storage — localStorage

**Use.** Favorites and non-sensitive preferences only. No biometric data, no images.

**Limitations.** Synchronous, origin-scoped, clearable by the user, not encrypted. Acceptable for
non-sensitive preferences (ADR-009).

## 10. Rejected / deferred options

| Option | Reason |
|---|---|
| Cloud inference API | Cost, latency, privacy, needs a backend (deferred) |
| TensorFlow.js face landmarks | Viable alternative; MediaPipe chosen for documented 478-point + pose output |
| face-api.js | Older, less actively maintained; no advantage verified |
| Commercial AR SDK | Licensing cost and lock-in; not needed to prove the MVP |
| WebGL renderer | Deferred until 2D proves insufficient |
| Backend/accounts | Out of MVP scope |

## 11. Verification checklist before Phase 1

- [ ] Re-read npm versions and pin exact versions.
- [ ] Confirm model bundle license and redistribution terms.
- [ ] Confirm MediaPipe WASM files can be self-hosted from the installed package.
- [ ] Confirm Node version available in the target environment.
- [ ] Confirm Safari/iOS behavior with a real device.
