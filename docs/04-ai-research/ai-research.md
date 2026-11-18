# AI Research

> Status: Research record · Last updated: 2026-11-09
> Verification date: 2026-11-09. No runtime experiments were performed in this audit.
> Tags: **VERIFIED** (official source), **ASSUMPTION**, **PROPOSAL**, **OPEN**.

## 1. Research questions

1. Can a browser-based face landmark model provide a stable reference frame for a hairstyle overlay?
2. What does the model actually output, and how should coordinates be interpreted?
3. How can head pose be estimated reliably enough for a near-frontal overlay?
4. How should landmark jitter be smoothed without adding visible lag?
5. What is required to position a hairstyle asset on a head?
6. What are the performance and privacy constraints on mobile browsers?

## 2. MediaPipe Face Landmarker capabilities

**VERIFIED** from the official task documentation:

- Outputs **478 3D facial landmarks** per detected face.
- Outputs **52 blendshape scores** when `outputFaceBlendshapes` is enabled.
- Outputs an optional **4×4 facial transformation matrix** from canonical face coordinates to the
  detected face when `outputFacialTransformationMatrixes` is enabled.
- Web running modes are `IMAGE` and `VIDEO` only; there is no `LIVE_STREAM` mode on web.
- `detectForVideo()` requires monotonically increasing timestamps.
- With `numFaces: 1`, temporal smoothing is applied by the library.
- The model bundle is a pipeline: face detector (BlazeFace short-range), face landmark model
  (FaceLandmarker-V2, 256×256 input), and blendshape model.
- The model bundle `face_landmarker.task` is **3,758,596 bytes** (HEAD request, 2026-11-09).

**NOT provided:** a hairline, skull shape, hair segmentation, head depth beyond the face surface,
or a documented per-face confidence score in the web result.

Source: https://ai.google.dev/edge/mediapipe/solutions/vision/face_landmarker

## 3. Browser and camera compatibility

**VERIFIED** from MDN and MediaPipe setup:

- `getUserMedia` requires a secure context (HTTPS or localhost); otherwise
  `navigator.mediaDevices` is `undefined`.
- Permission is always required, and the browser shows a camera indicator.
- Documented rejection cases: `NotAllowedError`, `NotFoundError`, `NotReadableError`,
  `OverconstrainedError`, `AbortError`, `InvalidStateError`, `SecurityError`, `TypeError`.
- The permission promise may never settle if the user ignores the prompt.
- `facingMode: "user"` prefers the front camera; stop tracks before switching facing mode.
- MediaPipe web requires a modern browser with WebAssembly: Chrome, Edge, Safari, Firefox.

**OPEN:** exact iOS Safari behavior (stream reuse, autoplay, memory pressure) is unverified.
**OPEN:** behavior on low-end Android devices is unverified.

Sources:
- https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
- https://ai.google.dev/edge/mediapipe/solutions/setup_web

## 4. Landmark coordinate interpretation

**VERIFIED:**

- `x` and `y` are normalized to the input frame in `[0.0, 1.0]`.
- `z` is scaled like `x`, relative to the head center; it is not a metric depth.
- Coordinates refer to the **video frame**, not the canvas.

**Consequences:**

- Every landmark must be mapped through the same cover-fit transform used to draw the video.
- Aspect-ratio mismatch between video and canvas must be handled by cropping, not stretching.
- Mirroring must be applied consistently to video and overlay.
- `z` can support relative ordering but not reliable metric scale.

**ASSUMPTION:** the relative depth ordering is stable enough to inform minor scale adjustments.
This is not required for the MVP.

## 5. Head pose estimation

**Option A — transformation matrix (PROPOSAL, preferred).**

- Decompose the rotation part into yaw/pitch/roll.
- **OPEN:** matrix layout and axis convention are not stated in the documentation read. Verify
  empirically (TASK-043) before relying on it.

**Option B — landmark geometry (fallback).**

- Roll from the outer-eye line.
- Scale from inter-ocular distance.
- Yaw/pitch proxies from nose-tip offsets.
- Simpler and interpretable, but noisier and view-dependent.

**Option C — solvePnP with camera intrinsics.**

- Requires camera calibration; not available reliably from `getUserMedia`.
- Rejected for the MVP.

**ASSUMPTION:** near-frontal pose within roughly ±25–30° yaw and ±20° pitch is enough for the MVP.
Thresholds are to be calibrated, not asserted.

## 6. Landmark smoothing

**Library smoothing.** With `numFaces: 1`, MediaPipe applies temporal smoothing (VERIFIED).
The algorithm and parameters are not documented in the task page.

**Additional smoothing (PROPOSAL).**

- One Euro filter: adaptive cutoff, low jitter at rest, low lag during motion.
- EMA: simpler, but trades lag against jitter.
- Apply per component (position, scale, yaw, pitch, roll).
- Reset on tracking loss, stream change, and tab resume.
- Tune with recorded sequences; no universal parameters.

**OPEN:** how much additional smoothing is needed once the library's built-in smoothing is active.
Over-smoothing can make the overlay feel detached from the head.

## 7. Hairstyle overlay positioning

**Core finding: MediaPipe does not solve hairstyle alignment.** Landmarks describe the face, not the
hairline or the skull silhouette.

A workable MVP approach (PROPOSAL):

1. Use forehead landmarks (e.g., landmark 10 and the brow line) to estimate a hairline reference.
2. Use temple/cheek landmarks for face width.
3. Add a per-asset vertical offset and scale factor calibrated once per asset.
4. Rotate by roll; apply limited yaw/pitch adjustments.
5. Hide or fade the overlay when the pose leaves the calibrated range.

**ASSUMPTION:** this is good enough for near-frontal views. It must be proven visually, not assumed.
**OPEN:** the best landmark set and offset formula.

## 8. Hairline and head-shape approximation

- The face mesh stops at the forehead; it does not model the cranium.
- Hairline position varies by person (recession, widow's peak, hair volume).
- A single fixed offset will be wrong for some users.
- The MVP accepts this limitation and exposes manual size/position adjustment (FR-09).
- A future improvement could estimate a head ellipse from face landmarks and scale the asset to it.
  That is post-MVP and requires validation.

## 9. Canvas rendering performance

**VERIFIED:** Canvas 2D is available in all target browsers.
**UNVERIFIED:** frame cost on target devices.

Known cost drivers (PROPOSAL to measure):

- Drawing the video frame at canvas resolution every frame.
- Drawing a large transparent PNG every frame.
- Canvas size and device pixel ratio.
- Inference time competing for the main thread.

Mitigations to evaluate: lower processing resolution, `ImageBitmap` caching, offscreen canvas,
frame skipping, worker-based inference, WebGL later.

## 10. Transparent asset requirements

- PNG with straight alpha, sRGB, transparent background.
- Soft edges reduce cutout artifacts; hard edges look pasted on.
- No baked background or shadow outside the alpha.
- Consistent lighting across the catalog.
- Alpha halos appear when assets are authored on white; validate on dark and light backgrounds.
- Asset resolution must survive scaling to roughly 60–70% of preview width.

## 11. Mobile browser performance and constraints

**VERIFIED:** MediaPipe runs in mobile browsers with WebAssembly.
**UNVERIFIED:** sustained frame rate, thermal throttling, memory limits, and battery impact.

Risks:

- First-load cost of WASM + 3.6 MB model.
- GPU delegate may be unavailable or slower on some devices.
- iOS memory pressure can terminate background tabs.
- Camera resolution constraints may not be honored exactly.

Mitigation plan: benchmark on the device matrix (TASK-047, TASK-074, TASK-075); adaptive resolution
if needed.

## 12. Privacy implications

**VERIFIED:**

- `getUserMedia` requires explicit permission and a secure context.
- Browsers display a camera-in-use indicator.
- MediaPipe web runs locally in the browser.

**Design consequences:**

- No frame, video, or snapshot upload in the MVP.
- Self-host WASM and model so initialization does not contact third parties (ADR-011).
- Store only non-sensitive preferences (ADR-009).
- Do not perform face recognition or create biometric templates.
- Provide a privacy notice and a stop-camera control.
- **OPEN:** whether the host/CDN logs IP addresses or request metadata; this must be disclosed in
  the privacy notice.

## 13. Alternatives and why they were not selected

| Alternative | Assessment |
|---|---|
| TensorFlow.js face landmarks | Viable; fewer documented pose outputs; would need separate pose work |
| face-api.js | Older ecosystem; no verified advantage |
| Commercial AR SDK | Better hair occlusion potential; cost and lock-in |
| Cloud vision API | Privacy and latency conflict with product principles |
| Generative replacement | Out of MVP scope; needs cloud or heavy local models |

Detailed desk evaluation: `docs/04-ai-research/model-evaluation.md`.

## 14. Open research questions

1. Real alignment error at the hairline for representative faces.
2. Landmark stability across skin tones and lighting.
3. Actual FPS/latency on mid-range Android and iOS Safari.
4. Whether the 4×4 matrix is usable and how its axes are oriented.
5. Whether built-in smoothing is sufficient without an extra filter.
6. Model bundle license terms for redistribution.
7. Thermal behavior during a 5-minute session.
