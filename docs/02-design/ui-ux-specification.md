# UI/UX Specification

> Status: Draft · Last updated: 2026-11-09
> Visual tokens: `docs/02-design/design-system.md`. States: `docs/01-product/user-journey.md` §2.

## 1. Design direction

Modern, minimal, premium, calm, camera-centric. The camera preview is the hero; chrome recedes.
Mobile-first responsive layout. No decorative animation that competes with the live preview.

## 2. Screens

| ID | Screen | Purpose |
|---|---|---|
| S1 | Landing | Explain product, privacy, and the single start action |
| S2 | Consent & permission | Explicit consent, then request camera |
| S3 | Live try-on | Camera preview, overlay, controls |
| S4 | Hairstyle panel | Categories, thumbnails, favorites |
| S5 | Style detail | Larger preview, metadata, apply action |
| S6 | Snapshot preview | Review captured image, download, discard |
| S7 | Comparison | Side-by-side of saved snapshots (P2) |
| S8 | Privacy & settings | Privacy notice, camera stop, clear favorites |

## 3. Layout

### Desktop (≥ 1024 px)

```
┌──────────────────────────────────────────────────────────┐
│ Top bar: product name · privacy · settings               │
├───────────────┬──────────────────────────────────────────┤
│ Category      │                                          │
│ sidebar       │            Camera preview                │
│ (240 px)      │            (16:9 or 4:3)                 │
│               │                                          │
│               ├──────────────────────────────────────────┤
│               │ Control bar: overlay toggle · size · pos │
├───────────────┴──────────────────────────────────────────┤
│ Hairstyle strip: thumbnails, horizontally scrollable     │
└──────────────────────────────────────────────────────────┘
```

### Mobile (< 768 px)

```
┌──────────────────────────┐
│ Top bar (compact)        │
├──────────────────────────┤
│                          │
│     Camera preview       │
│     (dominant, 4:5/1:1)  │
│                          │
├──────────────────────────┤
│ Category chips (scroll)  │
├──────────────────────────┤
│ Hairstyle thumbnails     │
│ (horizontal scroll)      │
├──────────────────────────┤
│ Controls (thumb reach)   │
└──────────────────────────┘
```

## 4. Key interactions

| Interaction | Behavior |
|---|---|
| Start | Explicit button; no auto camera request |
| Stop | Immediately stops tracks, shows restart |
| Select style | Applies within one rendered frame; camera untouched |
| Toggle overlay | On/off with no layout shift |
| Size/position | Slider or stepper with visible value; reset action |
| Snapshot | Brief capture feedback, then preview screen |
| Download | Native download; filename `hairstyle-<id>-<timestamp>.png` |
| Favorite | Toggle with pressed state announced to assistive tech |
| Error | Inline message near the preview + recovery action |

## 5. State presentations

| State | Visual |
|---|---|
| `REQUESTING` | Neutral panel, spinner, "Waiting for camera permission" |
| `DENIED` | Icon + explanation + browser-specific re-enable guidance |
| `INITIALIZING` | Preview skeleton, no fake video |
| `NO_FACE` | Dashed face guide, "Center your face in the frame" |
| `MULTIPLE_FACES` | Notice per TASK-016 decision |
| `TRACKING_LOST` | Overlay hidden; "Face lost — move back into frame" |
| `DEVICE_UNAVAILABLE` | Explanation + retry |
| `STOPPED` | Static placeholder + restart button |

## 6. Copy rules

- Short, direct, non-blaming error messages.
- State what happened and what the user can do next.
- Never imply the app identifies a person.
- Do not present style suggestions as objective judgments.
- UI language (ID/EN) is an open question (TASK-016). Until decided, all copy lives in a single
  string module and is not hard-coded in components.

## 7. Accessibility

- Visible focus ring on every interactive element.
- All icon-only buttons have accessible names.
- Camera state changes announced via a polite live region.
- Contrast at least 4.5:1 for body text, 3:1 for large text and UI boundaries.
- Controls reachable by keyboard in logical order.
- Respect `prefers-reduced-motion`.
- Video is decorative to screen readers; the state text carries the meaning.

## 8. Responsive breakpoints

| Token | Width | Layout |
|---|---|---|
| `sm` | ≥ 640 px | Single column, larger preview |
| `md` | ≥ 768 px | Two-column starts |
| `lg` | ≥ 1024 px | Sidebar + preview + strip |
| `xl` | ≥ 1280 px | Max content width, centered |

## 9. Out of scope for this specification

- Brand logo and marketing pages.
- Dark/light theme switching beyond the proposed default.
- Comparison screen implementation (P2).
