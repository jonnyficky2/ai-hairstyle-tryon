# User Journey

> Status: Draft · Last updated: 2026-11-09
> Related: FR-01…FR-18, `docs/03-architecture/camera-pipeline.md`

## 1. Primary journey

| Step | User action | System response | Failure handling |
|---|---|---|---|
| 1 | Opens the landing page | Explains the product and privacy model | — |
| 2 | Selects "Start Virtual Try-On" | Shows consent/permission screen | — |
| 3 | Grants camera permission | Initializes camera, shows loading state | AC-13: denied, unavailable, in-use states |
| 4 | Faces the camera | Detects face, starts landmark tracking | AC-17: "face not detected" state |
| 5 | Opens the hairstyle panel | Shows categories and thumbnails | Asset load failure state |
| 6 | Selects a hairstyle | Renders overlay on the head | AC-05 |
| 7 | Moves head | Overlay follows with smoothing | AC-06, AC-17 |
| 8 | Adjusts size/position or toggles overlay | Preview updates immediately | AC-09 |
| 9 | Switches styles | Overlay changes without camera restart | AC-07 |
| 10 | Captures a snapshot | Shows composed still image | AC-10 |
| 11 | Downloads the snapshot | Browser downloads an image file | AC-11 |
| 12 | Stops the session or leaves | Camera stream stops, tracks released | AC-15 |

## 2. Camera states

The UI must have a distinct, testable representation for each state.

| State | Meaning | UI behavior |
|---|---|---|
| `IDLE` | Not requested | Start button enabled |
| `REQUESTING` | Permission prompt open | Progress indicator, cancel available |
| `DENIED` | User or policy denied access | Explanation + retry instructions |
| `INITIALIZING` | Stream acquired, waiting for metadata | Loading indicator |
| `ACTIVE` | Video playing | Preview visible |
| `NO_FACE` | Stream active, no face | Guidance to center the face; overlay hidden |
| `MULTIPLE_FACES` | More than one face | Policy per TASK-016; default proposal: use the largest face and show a notice |
| `TRACKING` | Face tracked with confidence | Overlay visible |
| `TRACKING_LOST` | Previously tracked, now lost | Overlay hidden or faded; recovery guidance |
| `STOPPED` | User stopped the camera | Preview replaced with restart control |
| `DEVICE_UNAVAILABLE` | No camera or hardware failure | Explanation + retry |
| `ERROR` | Unclassified failure | Error message with retry |

`INITIALIZING` and the four tracking states are set by the video/face-tracking layer
(TASK-041/045); `CameraService` only manages the stream (D-022, `camera-pipeline.md` §3).

## 3. Interaction rules

- Changing hairstyle must never restart the camera.
- Overlay must hide when tracking is lost rather than freeze in place.
- The user can stop the camera from any active state.
- No camera action happens before explicit consent.
- Controls must remain reachable on small screens and with one hand.
- Destructive or privacy-relevant actions (stop camera, clear favorites) require clear labels.

## 4. Edge cases

- Permission prompt dismissed without a choice (promise may never settle).
- Camera in use by another application.
- Device rotated mid-session.
- Tab backgrounded, then restored.
- Browser without WebAssembly support.
- GPU delegate unavailable; CPU fallback.
- Asset fails to load after selection.
