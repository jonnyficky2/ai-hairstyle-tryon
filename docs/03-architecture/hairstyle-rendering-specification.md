# Hairstyle Rendering Specification

> Status: APPROVED (2026-11-18) · Last updated: 2026-11-18
> Requirements: FR-05, FR-06, FR-09, FR-10. ADR-005, ADR-008.

## 1. Pipeline

```
video frame
  → cover-fit mapping to canvas
  → head pose (smoothed)
  → face metrics (inter-ocular / temple width)
  → asset anchor mapping
  → scale, rotation, translation
  → draw video (mirrored)
  → draw hairstyle (mirrored, same transform)
  → visible canvas
  → snapshot (same pipeline, offscreen)
```

## 2. Canvas sizing and coordinate mapping

- CSS size: responsive container.
- Backing store: `canvas.width = cssWidth * dpr`, `canvas.height = cssHeight * dpr`.
- Context transform: `ctx.setTransform(dpr, 0, 0, dpr, 0, 0)` so drawing uses CSS pixels.
- Cover-fit (no distortion, crop overflow):

```
scale   = max(canvasW / videoW, canvasH / videoH)
drawW   = videoW * scale
drawH   = videoH * scale
offsetX = (canvasW - drawW) / 2
offsetY = (canvasH - drawH) / 2
```

- Normalized landmark `(x, y)` → canvas `(offsetX + x * drawW, offsetY + y * drawH)`.
- Letterboxing is not used; cropping is preferred so the face fills the preview.

## 3. Mirroring

- Selfie view is mirrored for familiarity.
- Implementation: wrap video and overlay drawing in one mirrored transform
  (`translate(canvasW, 0); scale(-1, 1)`), so both stay consistent and no per-landmark flip is
  needed.
- Consequence: the snapshot is mirrored, matching what the user saw. This is the proposed default.
  If an unmirrored export is desired later, it becomes an explicit option, not a silent change.
- Blendshapes are not used, so the documented left/right mirror caveat does not affect the MVP.

## 4. Asset anchor model

Each asset defines normalized anchors within its own canvas (see asset specification):

| Anchor | Meaning |
|---|---|
| `hairlineCenter` | Where the asset's hairline meets the forehead center |
| `leftTemple` | Asset edge that should sit near the subject's left temple |
| `rightTemple` | Asset edge that should sit near the subject's right temple |

Mapping:

```
faceWidthPx = distance(landmark leftTemple, landmark rightTemple)
assetSpan   = asset.rightTemple.x - asset.leftTemple.x   // normalized, 0..1
scale       = (faceWidthPx / assetSpan) / asset.pixelWidth
originX     = pose.centerX - asset.hairlineCenter.x * asset.pixelWidth * scale
originY     = pose.centerY - asset.hairlineCenter.y * asset.pixelHeight * scale
rotation    = pose.roll
```

- `pose.centerX/centerY` is the canvas-space position of the hairline reference point, derived from
  the forehead/eye landmarks plus a calibrated vertical offset.
- A per-asset `calibration.scaleFactor` and `calibration.offsetY` correct systematic error.
- User adjustment (FR-09) multiplies scale and adds a vertical offset; it is applied after
  calibration and is not persisted unless favorites require it.

## 5. Pose-aware adjustments (MVP limits)

| Pose | MVP behavior |
|---|---|
| Roll (tilt) | Rotate the asset by `roll` |
| Yaw (turn) | Small horizontal shift and mild width change (proposal); beyond a calibrated limit, fade or hide |
| Pitch (nod) | Small vertical shift; beyond a limit, fade or hide |

Limits are per-asset calibration values, not global guesses. Exact thresholds are set in TASK-052
and validated in TASK-058.

## 6. Layering and occlusion

- MVP order: video → hairstyle.
- No hair mask, no head segmentation, no depth ordering.
- Assets should include soft alpha edges to reduce harsh cutouts.
- The user's existing hair may show through or be covered unnaturally. This is a known MVP
  limitation, documented in the product scope.
- Occlusion improvements are post-MVP and require a new ADR.

## 7. Smoothing application

- Primary smoothing is on the pose (face tracking spec §6).
- Optional secondary EMA on the final `OverlayTransform` (position, scale, rotation) to remove
  residual jitter; must not add more than one frame of visible lag.
- Reset on tracking loss or asset switch.

## 8. Asset switching

- Preload the next asset before switching, or keep a decoded `ImageBitmap` cache.
- Switching updates only the active asset reference; it must not touch the camera stream, the
  tracking model, or the canvas size.
- If an asset fails to load, keep the previous overlay and show a non-blocking error (AC-19).

## 9. Snapshot

- Render the same pipeline into an offscreen canvas at the visible preview resolution (or the
  video's native resolution if higher and performance allows).
- Use `canvas.toBlob("image/png")`.
- Do not include UI chrome, guides, or debug overlays.
- Do not upload the blob.

## 10. Performance rules

- Reuse a single canvas and context; never recreate per frame.
- Avoid per-frame `drawImage` scaling of the video more than once.
- Cache decoded assets; do not re-fetch per frame.
- Avoid allocations in the hot loop where practical (measure first, then optimize).
- Skip rendering when hidden or when the overlay is toggled off and the video is not being redrawn.

## 11. Testability

- `OverlayTransform.compute()` is pure and unit-tested with fixed poses and assets.
- Canvas drawing is verified with golden-image or pixel-sample tests where stable, and with manual
  visual calibration otherwise.
- Snapshot tests assert dimensions, format, and absence of UI chrome.

## 12. Known limitations

- 2D assets cannot faithfully represent hair volume, strands, or occlusion.
- Alignment quality is bounded by anchor calibration and landmark stability.
- Extreme head angles are out of scope.
