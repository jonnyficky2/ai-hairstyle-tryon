# Acceptance Criteria

> Status: Draft — awaiting approval (TASK-013) · Last updated: 2026-11-09
> Each criterion is independently verifiable. Evidence must be recorded in the task entry.
> Verification methods: **U** = unit test, **I** = integration test, **E** = E2E, **M** = manual UAT,
> **P** = performance measurement, **R** = review/inspection.

## P0 — Core

### AC-01 — Camera access
**Given** the user has granted camera permission and is on a secure context
**When** the user starts the try-on
**Then** a live front-facing video stream is visible within 5 seconds on a supported device, and
the UI state is `ACTIVE`.
**Verify:** E, M. **Evidence:** test output + device screenshot/video with timestamp.

### AC-02 — Face detection
**Given** an active camera stream with one face in frame
**When** detection runs
**Then** the app reports a detected face and leaves `NO_FACE` within 1 second.
**Verify:** I, M. **Evidence:** state-transition test output.

### AC-03 — Face landmarks
**Given** a detected face
**When** tracking runs
**Then** 478 landmarks are available per processed frame and the count is asserted in a test.
**Verify:** U, I. **Evidence:** test output.

### AC-04 — Head tracking
**Given** an active tracked face
**When** the head rotates moderately left, right, up, or down
**Then** the estimated yaw/pitch/roll changes in the correct direction and the overlay follows.
**Verify:** U (math) + M (visual). **Evidence:** unit test + UAT recording.

### AC-05 — Hairstyle overlay
**Given** an active tracked face and a selected hairstyle
**When** rendering runs
**Then** the hairstyle is drawn on the head, horizontally centered on the face, with the hairline
anchor within the calibrated tolerance defined in the asset specification.
**Verify:** M, E. **Evidence:** annotated screenshots for each MVP asset.

### AC-06 — Live update
**Given** a rendered overlay
**When** the head moves continuously
**Then** the overlay position updates at the measured processing rate with no visible freeze longer
than 500 ms during normal movement.
**Verify:** M, P. **Evidence:** screen recording + frame timing log.

### AC-07 — Hairstyle selection
**Given** an active camera and overlay
**When** the user selects a different hairstyle
**Then** the new overlay appears without the camera stopping, the video element being recreated, or
tracking being reinitialized.
**Verify:** E, M. **Evidence:** test asserting stream identity + UAT.

### AC-08 — Catalog and filter
**Given** a loaded catalog
**When** the user selects a category
**Then** only styles in that category are listed, and each item shows a thumbnail or a documented
fallback.
**Verify:** U, E. **Evidence:** test output.

### AC-09 — Preview controls
**Given** an active overlay
**When** the user changes size or vertical position, or toggles the overlay
**Then** the preview reflects the change on the next rendered frame.
**Verify:** U, E. **Evidence:** test output + screenshot.

### AC-10 — Snapshot
**Given** an active composed preview
**When** the user captures a snapshot
**Then** a still image is produced containing the current camera frame and overlay at the displayed
aspect ratio.
**Verify:** E, M. **Evidence:** generated image file inspected.

### AC-11 — Download
**Given** a captured snapshot
**When** the user selects download
**Then** the browser downloads an image file with a predictable name and no server request carrying
image data.
**Verify:** E, R (network log). **Evidence:** downloaded file + network log.

### AC-12 — Favorites
**Given** the catalog is loaded
**When** the user favorites a style and reloads the page
**Then** the favorite state persists in local storage and is restored.
**Verify:** U, E. **Evidence:** test output.

### AC-13 — Error handling
**Given** camera permission is denied, the device is unavailable, or the camera is in use
**When** the user attempts to start
**Then** a specific, actionable message is shown and the app does not crash or hang.
**Verify:** I, M. **Evidence:** screenshots per error class.

### AC-14 — Responsive UI
**Given** a viewport of 360×640 CSS px or larger
**When** the try-on screen is shown
**Then** there is no horizontal scrolling, the camera preview is the dominant element, and all
primary controls are visible or reachable without zooming.
**Verify:** M, E. **Evidence:** screenshots at 360×640, 768×1024, 1440×900.

### AC-15 — Camera stop
**Given** an active camera stream
**When** the user stops the session or navigates away
**Then** every media track is stopped and the camera indicator turns off.
**Verify:** I, M. **Evidence:** test asserting `track.readyState === "ended"` + device indicator check.

### AC-16 — Consent gate
**Given** a first-time visitor
**When** the page loads
**Then** no camera request occurs until the user explicitly consents and starts the try-on.
**Verify:** E, R. **Evidence:** network/permission log.

### AC-17 — Tracking lost
**Given** a tracked face
**When** the face leaves the frame or confidence falls below threshold for 500 ms
**Then** the overlay is hidden or faded out and a recovery message appears.
**Verify:** I, M. **Evidence:** test output + recording.

### AC-18 — Camera retry
**Given** a recoverable camera error
**When** the user selects retry
**Then** initialization is attempted again without a page reload, and the resulting state is
reported accurately.
**Verify:** E, M. **Evidence:** test output.

## P1 — Supporting

### AC-19 — Asset failure
**Given** a selected hairstyle whose asset fails to load
**When** selection occurs
**Then** the previous valid overlay is kept or the overlay is hidden, and an error is shown.
**Verify:** I. **Evidence:** test output.

### AC-20 — Reduced motion / no animation requirement
**Given** the user prefers reduced motion
**When** UI transitions occur
**Then** non-essential animations are reduced without breaking state changes.
**Verify:** M. **Evidence:** inspection notes.

## Non-functional

### AC-21 — Performance targets
Measured per `docs/04-ai-research/benchmark-plan.md`. Targets from NFR-01…NFR-03 are engineering
targets, not guaranteed results. A miss requires documented mitigation or approved acceptance.
**Verify:** P. **Evidence:** benchmark report.

### AC-22 — Privacy
**Given** any normal session
**When** the user tries on hairstyles, captures, and downloads
**Then** no image or video data is sent over the network, and no biometric template is stored.
**Verify:** R (network capture), E. **Evidence:** network log review signed off in TASK-076.

## Definition of Done

See `docs/05-development/definition-of-done.md`.
