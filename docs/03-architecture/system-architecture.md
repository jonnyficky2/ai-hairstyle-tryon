# System Architecture

> Status: PROPOSED · Last updated: 2026-11-09
> Decisions referenced as ADR-xxx live in `docs/03-architecture/adr/`.

## 1. Architectural style

A client-only, layered web application. There is no backend in the MVP (ADR-006). All inference
and rendering happen in the browser. Static assets (app bundle, WASM, model, hairstyle images)
are served from the application origin (ADR-011).

## 2. Layers

| Layer | Responsibility | Must not |
|---|---|---|
| Presentation | Screens, controls, state presentation, accessibility | Access MediaPipe directly |
| Application/state | Session state machine, orchestration, error mapping | Contain rendering math |
| Camera | Permission, stream lifecycle, device selection, track cleanup | Draw overlays |
| Vision | Model loading, frame inference, landmark output | Know about UI |
| Tracking/pose | Coordinate mapping, pose estimation, smoothing, confidence | Load assets |
| Rendering | Transform calculation, canvas composition, snapshot encoding | Request permissions |
| Catalog | Metadata, validation, filtering, favorites | Render |
| Platform services | Local storage, download, feature detection | Business rules |

## 3. Data flow

```
User action
  → Application state machine
  → CameraService.start()
  → MediaStream → <video> (hidden or preview source)
  → requestAnimationFrame loop (only while TRACKING/ACTIVE)
  → FaceTrackingService.detectForVideo(video, timestampMs)
  → 478 landmarks (+ optional 4×4 matrix)
  → PoseEstimator.estimate()
  → Smoother.filter(dt)
  → OverlayTransform.compute(pose, metrics, asset anchors, user adjustment)
  → Renderer.render(videoFrame, asset, transform)
  → <canvas> visible preview
  → SnapshotService.capture(canvas) → download
```

## 4. Runtime boundaries and failure isolation

| Failure | Isolation strategy |
|---|---|
| Camera denied/unavailable | Camera layer returns a typed error; app maps to a UI state; no vision init |
| WASM/model load failure | Vision layer reports a load error; app offers retry; camera can still show preview |
| GPU delegate failure | Fall back to CPU delegate; record capability in state |
| Face lost | Tracking layer emits `TRACKING_LOST`; renderer hides overlay |
| Asset load failure | Catalog layer marks the item unavailable; renderer keeps the last valid asset |
| Tab backgrounded | Loop pauses; on resume, timestamps are re-baselined |
| Main-thread stall | Frame skipping; never queue unbounded inference calls |

## 5. Threading model

- Model inference is synchronous from the caller's perspective in `VIDEO` mode; it must be invoked
  from a frame loop, not from React render.
- Rendering happens in the same frame loop after inference.
- No Web Worker is required for the MVP. Moving inference off the main thread is a performance
  option to evaluate in TASK-075, not a current commitment.
- Long tasks must be measured, not assumed.

## 6. Deployment topology

```
Static host (HTTPS)
├── index.html, JS/CSS bundle
├── /models/face_landmarker.task
├── /wasm/*                     (MediaPipe runtime files)
└── /assets/hairstyles/*.png + catalog.json
```

No application server, no database, no image upload endpoint.

## 7. Cross-cutting concerns

| Concern | Approach |
|---|---|
| Privacy | Local processing, consent gate, no telemetry carrying image data |
| Security | Secure context, strict CSP, pinned dependencies, self-hosted runtime |
| Accessibility | Keyboard, labels, live-region state announcements |
| Performance | Frame loop with timestamp guard, adaptive resolution (proposal), profiling |
| Observability | Local debug overlay (FPS, state, confidence) behind a development flag; no remote analytics in MVP |
| Internationalization | UI strings centralized; language decision open (TASK-016) |

## 8. Key architectural risks

1. Landmark-based alignment may be visibly wrong at the hairline; calibration is the main unknown.
2. 2D assets cannot occlude existing hair realistically.
3. Mobile thermal throttling may degrade frame rate over time.
4. Self-hosted model/WASM adds ~4–35 MB of static payload; caching strategy matters.
5. Browser permission behavior differs; the state machine must cover silent dismissal.

See `docs/04-ai-research/ai-research.md` and the risk register in
`docs/09-project-history/progress-report.md`.
