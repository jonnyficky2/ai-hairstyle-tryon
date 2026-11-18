# Face Tracking Specification

> Status: APPROVED (2026-11-18) · Last updated: 2026-11-18
> Requirements: FR-02, FR-03, FR-04, FR-17. ADR-004.
> Verified API facts are cited in `docs/04-ai-research/ai-research.md`.

## 1. Model configuration (proposed)

```ts
{
  baseOptions: { modelAssetPath: "/models/face_landmarker.task", delegate: "GPU" },
  runningMode: "VIDEO",
  numFaces: 1,
  outputFaceBlendshapes: false,
  outputFacialTransformationMatrixes: true,
  minFaceDetectionConfidence: 0.5,
  minFacePresenceConfidence: 0.5,
  minTrackingConfidence: 0.5
}
```

- `numFaces: 1` enables the library's temporal smoothing (VERIFIED).
- `outputFaceBlendshapes` is disabled for the MVP; expressions are not used.
- `outputFacialTransformationMatrixes` is enabled to support pose estimation.
- Thresholds are starting values; tune with the benchmark plan.
- If `GPU` initialization fails, retry with `CPU` and record the fallback.

## 2. Output contract

Each processed frame yields, for the single face:

| Field | Type | Meaning |
|---|---|---|
| `landmarks` | 478 × `{x, y, z}` | Normalized to the video frame. `x`, `y` in `[0,1]`; `z` scaled like `x`, relative to the head center (VERIFIED). |
| `transformMatrix` | 16 floats or undefined | Canonical-to-observed 4×4 matrix (VERIFIED existence; layout to verify). |
| `timestampMs` | number | Monotonic timestamp passed to `detectForVideo`. |
| `confidence` | number | **Derived heuristic**, see §5. MediaPipe does not document a per-face confidence field in the web result. |

## 3. Coordinate mapping

1. Landmarks are normalized to the **video frame**, not the canvas.
2. Convert to canvas pixels using the same cover-fit mapping used to draw the video
   (`docs/03-architecture/hairstyle-rendering-specification.md` §2).
3. Mirroring is applied by drawing the video and overlay inside the same mirrored canvas
   transform; landmark coordinates therefore do not need per-point flipping.
4. Handle `devicePixelRatio` once at canvas sizing, not per landmark.

## 4. Head pose estimation

### 4.1 Primary method: transformation matrix

- Decompose the rotation part of the 4×4 matrix into yaw, pitch, roll (Euler angles).
- Extract translation for the head center; derive scale from the matrix or from inter-ocular
  distance.
- **OPEN:** the matrix layout (row-major vs column-major, axis convention) is not stated in the
  documentation read during this audit. Verify empirically in TASK-043 by comparing against known
  head movements before relying on it.

### 4.2 Fallback method: landmark geometry

Used if the matrix is unavailable or fails verification.

- **Roll:** angle of the line between the outer eye corners.
- **Scale:** inter-ocular distance.
- **Yaw proxy:** horizontal offset of the nose tip relative to the face midline.
- **Pitch proxy:** vertical ratio of nose tip between eye line and chin.
- Landmark indices used must be confirmed visually in TASK-042. Commonly cited indices:
  outer eyes `33` / `263`, nose tip `1`, chin `152`, forehead top `10`, face sides `234` / `454`.
  **ASSUMPTION:** these indices are correct for the current model; verify with a debug overlay.

### 4.3 Output

`HeadPose { centerX, centerY, scale, yaw, pitch, roll }`, all normalized/radians, independent of
canvas size.

## 5. Tracking confidence (heuristic)

Because no per-face confidence is documented, define confidence as a derived value:

- `1.0` when exactly one face is returned and the inter-ocular distance is within a plausible range.
- Reduced when landmark jitter (frame-to-frame movement of stable points) exceeds a threshold.
- `0` when no face is returned.
- Exact formula and thresholds are decided in TASK-044 and covered by tests.

This heuristic must never be presented to users as an accuracy score.

## 6. Smoothing

### 6.1 Proposed filter: One Euro

Chosen because it adapts between low jitter at rest and low lag during movement.

```
cutoff = minCutoff + beta * |dx_filtered|
alpha  = 1 / (1 + (1 / (2π * cutoff)) / dt)
```

- Applied independently to `centerX`, `centerY`, `scale`, `yaw`, `pitch`, `roll`.
- Starting parameters (PROPOSAL, tune in TASK-044): `minCutoff = 1.0`, `beta = 0.007`,
  `dCutoff = 1.0`.
- Reset state when tracking is lost or the stream changes.
- Clamp `dt` to avoid jumps after tab resume.

### 6.2 Alternative

Exponential moving average (EMA). Simpler but introduces either lag or jitter; keep as fallback.

## 7. Lost tracking and multiple faces

| Condition | Behavior |
|---|---|
| No face for < 500 ms | Keep last pose but mark `unstable`; overlay may remain for continuity |
| No face for ≥ 500 ms | State `TRACKING_LOST`; hide overlay; show guidance |
| Face returns | Reset smoother; fade overlay in |
| More than one face | Policy pending TASK-016. Default proposal: detect with `numFaces: 2` only if needed; otherwise use the single returned face and show a notice. |
| Landmarks present but implausible | Treat as unstable; do not render |

## 8. Frame loop rules

- Use `requestAnimationFrame`; process only when `video.currentTime !== lastVideoTime`.
- Pass a monotonically increasing timestamp to `detectForVideo` (VERIFIED requirement).
- Never queue more than one inference at a time.
- Skip rendering if the canvas is not visible.
- Pause on `document.hidden`.

## 9. Performance instrumentation

Record per frame: inference time, render time, total frame time, dropped frames, delegate used.
Expose behind a development flag. Consumed by TASK-047 and the benchmark plan.

## 10. Testability

- Pose math and smoothing are pure functions with unit tests.
- The tracking service accepts an injected landmark source for integration tests without a camera.
- Synthetic landmark sequences (still, pan, jitter) drive deterministic assertions.

## 11. Explicit limitations

- No hairline or skull estimation from landmarks; alignment relies on asset anchors and calibration.
- Extreme yaw/pitch is not supported in the MVP.
- Occlusion by hands, hair, or objects degrades tracking; behavior is unverified.
- Accuracy across skin tones, lighting, and hair types must be validated in UAT, not assumed.
