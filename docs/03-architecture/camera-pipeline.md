# Camera Pipeline

> Status: PROPOSED · Last updated: 2026-11-09
> Requirement: FR-01, FR-13, FR-15, FR-18. ADR-007.

## 1. Constraints and preconditions

- Secure context required (HTTPS or localhost). In insecure contexts `navigator.mediaDevices` is
  `undefined` (VERIFIED, MDN).
- Explicit user action and consent required before requesting permission.
- Front camera preferred: `facingMode: "user"`.
- No audio track is requested.
- Resolution target: start at 1280×720 ideal, allow the browser to choose. Adaptive downscaling is
  a later optimization (TASK-075).

## 2. Proposed constraints

```ts
{
  audio: false,
  video: {
    facingMode: "user",
    width:  { ideal: 1280 },
    height: { ideal: 720 },
    frameRate: { ideal: 30, max: 30 }
  }
}
```

These are proposals; validate on the device matrix.

## 3. Lifecycle

```
IDLE
  → (user consents + starts) → REQUESTING
  → granted → INITIALIZING
  → video metadata loaded + play() resolved → ACTIVE
  → tracking started → NO_FACE | TRACKING
  → (user stops | route leaves | unmount) → STOPPED
  → (retry) → REQUESTING
```

## 4. Error mapping

| Browser error | App code | UI state |
|---|---|---|
| `NotAllowedError` (denied) | `PERMISSION_DENIED` | `DENIED` |
| `NotFoundError` | `NO_DEVICE` | `DEVICE_UNAVAILABLE` |
| `NotReadableError` | `DEVICE_BUSY` | `DEVICE_UNAVAILABLE` |
| `OverconstrainedError` | `CONSTRAINT_UNSATISFIABLE` | `ERROR` with fallback retry |
| `navigator.mediaDevices` undefined | `INSECURE_CONTEXT` | `ERROR` with HTTPS guidance |
| Anything else | `UNKNOWN` | `ERROR` |

The permission promise may never settle (VERIFIED, MDN). The UI must therefore offer a cancel path
and must not show an infinite spinner with no escape.

## 5. Stop and cleanup rules

On stop, route change, or unmount:

1. Stop every track: `stream.getTracks().forEach(t => t.stop())`.
2. Set `video.srcObject = null`.
3. Cancel the animation frame.
4. Dispose tracking resources only if the session is truly ending; a style switch must not dispose.
5. Verify the camera indicator turns off (manual evidence).

## 6. Device switching

- `enumerateDevices()` may hide labels until permission is granted.
- Stop the current tracks before requesting a different `facingMode` (MDN guidance).
- Reinitialize tracking timestamps after a stream change.
- Switching is P1 and may be deferred without blocking the MVP.

## 7. Video element handling

- The `<video>` element is the inference source.
- It must be `muted` and `playsInline` for mobile autoplay behavior.
- `video.play()` may reject; treat it as an initialization error with retry.
- The visible preview is drawn to a canvas; the video element itself can be hidden.
- Display mirroring is applied at draw time (see rendering spec), not via CSS, so the snapshot
  matches the preview.

## 8. Background and visibility

- On `visibilitychange` to hidden, pause the frame loop.
- On resume, re-baseline `lastVideoTime` and the smoother time step.
- Do not request a new stream on resume unless the tracks ended.

## 9. Testability

The camera service must accept an injected `MediaDevices`-like interface so unit tests can simulate
permission denial, missing devices, and track stopping without hardware.

## 10. Verification requirements

- Unit: state transitions and error mapping (TASK-033).
- Manual: permission grant/deny/dismiss, device busy, stop, retry, orientation change.
- Evidence: test output plus screenshots/video for each manual state.
