# Model Evaluation

> Status: Desk evaluation (no runtime benchmark executed) · Last updated: 2026-11-09
> Ratings are qualitative and justified. They are not measured results.

## 1. Evaluation criteria

| Criterion | Weight | Why it matters |
|---|---|---|
| On-device execution | High | Privacy and latency |
| Landmark richness | High | Overlay alignment reference |
| Head pose output | High | Rotation and scale |
| Browser support | High | Target platforms |
| License | High | Distribution and commercial use |
| Maintenance | Medium | Longevity and bug fixes |
| Integration effort | Medium | Time to MVP |
| Cost | Medium | No per-request fees for MVP |
| Mobile performance | High | Core product principle |
| Hairline/occlusion support | High | Final visual quality |

## 2. Candidates

### 2.1 MediaPipe Face Landmarker

| Criterion | Rating | Notes |
|---|---|---|
| On-device | Strong | WASM in browser (VERIFIED) |
| Landmark richness | Strong | 478 points (VERIFIED) |
| Head pose | Strong | Optional 4×4 matrix (VERIFIED) |
| Browser support | Strong | Chrome, Edge, Safari, Firefox with WASM (VERIFIED) |
| License | Strong | SDK Apache-2.0 (VERIFIED); model bundle license OPEN |
| Maintenance | Strong | Official Google package, active |
| Integration effort | Medium | Web has VIDEO-only; custom frame loop needed |
| Cost | Strong | No per-request cost |
| Mobile performance | Unknown | Unverified on target devices |
| Hairline/occlusion | Weak | Face-only model; no hairline |

### 2.2 TensorFlow.js face-landmarks-detection

| Criterion | Rating | Notes |
|---|---|---|
| On-device | Strong | WebGL/WASM |
| Landmark richness | Adequate | Face mesh available |
| Head pose | Weak/Unknown | Pose requires custom work |
| Browser support | Strong | Broad |
| License | Strong | Apache-2.0 |
| Maintenance | Adequate | Varies by model |
| Integration effort | Medium | Comparable |
| Cost | Strong | No per-request cost |
| Mobile performance | Unknown | Unverified |
| Hairline/occlusion | Weak | Same fundamental limitation |

**Why not selected:** no verified advantage over MediaPipe for this use case; pose work would be
additional.

### 2.3 face-api.js

| Criterion | Rating | Notes |
|---|---|---|
| Maintenance | Weak | Older project, slower cadence |
| Landmark richness | Adequate | 68-point style output in common models |
| Head pose | Adequate | Pose estimation available |
| Integration effort | Medium | Older tooling |
| Hairline/occlusion | Weak | Same limitation |

**Why not selected:** less suitable for a 478-point, actively maintained pipeline.

### 2.4 Commercial AR SDK (Banuba, DeepAR)

| Criterion | Rating | Notes |
|---|---|---|
| Hair realism | Potentially Strong | Built for AR try-on, occlusion possible |
| License | Weak | Commercial licensing cost |
| Lock-in | Weak | Proprietary |
| Integration effort | Medium | SDK-specific |
| Privacy | Unknown | Depends on processing location |

**Why not selected for MVP:** cost and lock-in before proving the core experience. Revisit if 2D
quality is insufficient.

### 2.5 Cloud vision / generative APIs

| Criterion | Rating | Notes |
|---|---|---|
| Visual realism | Potentially Strong | Generative replacement |
| Privacy | Weak | Requires upload and consent |
| Cost | Weak | Per-request |
| Latency | Weak | Network round trip |
| Backend | Weak | Violates client-only MVP |

**Why not selected:** conflicts with MVP privacy and architecture decisions.

## 3. Decision

MediaPipe Face Landmarker is the **approved** choice (ADR-004, 2026-11-18). It is the strongest documented option for
on-device landmarks plus pose, but it does not solve hairstyle alignment or occlusion.

## 4. What would change the decision

- MediaPipe fails the performance benchmark on the target mobile device.
- Alignment quality is unacceptable even after calibration.
- Model licensing prevents redistribution.
- A commercial SDK becomes necessary for acceptable visual quality.

## 5. Evidence still required

| Question | Task |
|---|---|
| Runtime FPS and latency | TASK-047 |
| Pose matrix usability | TASK-043 |
| Alignment quality | TASK-058 |
| Cross-browser behavior | TASK-074 |
| Model license | TASK-014 |
| Mobile thermal behavior | TASK-075 |
