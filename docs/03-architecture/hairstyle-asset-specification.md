# Hairstyle Asset Specification

> Status: APPROVED (2026-11-18) · Last updated: 2026-11-18
> Requirement: FR-05, FR-08. ADR-008. Sourcing is blocked by TASK-015.

## 1. Format

| Property | Requirement |
|---|---|
| Container | PNG (24-bit + alpha) |
| Color space | sRGB |
| Background | Fully transparent outside the hair |
| Premultiplied alpha | No (standard straight alpha) |
| Compression | Lossless |
| Animated | No |

WebP/AVIF may be evaluated later for size, but PNG is the MVP baseline for predictable alpha.

## 2. Canvas and content

- Canonical canvas: `1024 × 1024` for short/medium styles; `1024 × 1536` for long styles.
- The canvas is fixed per asset; anchors are normalized to the canvas.
- Hair must not touch the canvas edge unless the style intentionally extends beyond it.
- No baked-in background, frame, or text.
- Lighting direction: consistent across the catalog (proposal: soft top-front).
- Resolution must remain sharp when the face occupies roughly 60–70% of the preview width.

## 3. Metadata schema

```json
{
  "id": "short-textured-crop-001",
  "name": "Textured Crop",
  "category": "short",
  "texture": "straight",
  "length": "short",
  "version": 1,
  "asset": "/assets/hairstyles/short-textured-crop-001.png",
  "thumbnail": "/assets/hairstyles/thumbs/short-textured-crop-001.webp",
  "canvas": { "width": 1024, "height": 1024 },
  "anchors": {
    "hairlineCenter": { "x": 0.50, "y": 0.22 },
    "leftTemple": { "x": 0.18, "y": 0.52 },
    "rightTemple": { "x": 0.82, "y": 0.52 }
  },
  "calibration": { "scaleFactor": 1.0, "offsetY": 0.0, "maxYawDeg": 25, "maxPitchDeg": 20 },
  "supportedViews": ["front"],
  "license": { "type": "TBD", "source": "TBD", "attribution": "TBD" },
  "status": "draft"
}
```

Field rules:

- `id` is permanent and unique; never reused.
- `anchors` values are normalized `0..1` relative to the asset canvas.
- `calibration` values are per-asset and set by TASK-052.
- `license` must be filled before an asset enters the catalog (TASK-015).
- `status`: `draft` | `calibrated` | `approved` | `retired`.

## 4. Naming

```
<category>-<style>-<variant>-<version>.png
```

Examples: `short-textured-crop-001.png`, `long-straight-001.png`.
Thumbnails: `thumbs/<same-id>.webp`.

## 5. Anchor calibration procedure (TASK-052)

1. Display the asset over a synthetic face or a recorded reference frame.
2. Align `hairlineCenter` to the forehead center at the hairline.
3. Align `leftTemple` and `rightTemple` to the face edges at eye level.
4. Adjust `calibration.scaleFactor` and `offsetY` until alignment holds across 3 face widths.
5. Record the test images and the final values in the asset metadata.
6. Mark `status: calibrated` only after TASK-058 visual UAT.

## 6. Quality checklist

- [ ] Transparent background, no halos.
- [ ] Consistent lighting and color temperature with the rest of the catalog.
- [ ] No visible canvas edge or rectangular alpha artifacts.
- [ ] Hairline shape plausible for the style.
- [ ] Anchors documented and visually correct.
- [ ] Calibration values recorded.
- [ ] License and source recorded.
- [ ] File size reasonable for web delivery (target under 1 MB; measure).
- [ ] Thumbnail generated and visually consistent.
- [ ] Tested at 3 face widths and moderate yaw/pitch.

## 7. Sourcing and licensing

- Every asset needs a documented license that permits web display and modification.
- Options (TASK-015): commissioned illustration, licensed asset pack, AI-generated with a license
  that permits commercial use, or original in-house art.
- AI-generated assets must not imitate a real person's likeness or a protected character.
- No asset enters `status: approved` without a recorded license.

## 8. Catalog data

- The catalog is a single JSON file validated at load time.
- Validation rejects: duplicate `id`, missing asset, invalid anchors, missing license.
- Invalid entries are excluded and logged; the app must not crash.
- Category values are restricted to `short`, `medium`, `long`, `curly-wavy`.

## 9. Versioning

- Changing an asset's artwork or anchors requires a version bump.
- `id` stays stable across versions so favorites remain valid.
- Retired assets stay in the repository until references are removed.
