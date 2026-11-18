# Product Scope

> Status: Draft — awaiting approval (TASK-013) · Last updated: 2026-11-09

## 1. In scope (MVP)

| Area | Included |
|---|---|
| Camera | Front-facing live video, permission handling, lifecycle, device errors |
| Face detection | Single-face detection and confidence state |
| Tracking | 478 landmarks, near-frontal head pose, smoothing, lost-tracking handling |
| Rendering | Canvas 2D overlay of transparent hairstyle assets |
| Catalog | Hairstyle list, thumbnails, category filter, favorites (local) |
| Controls | Style switching, overlay toggle, size and vertical position adjustment |
| Output | Snapshot capture and download |
| UX | Responsive desktop/mobile layouts, explicit loading and error states |
| Privacy | Local processing, consent gate, camera stop control, privacy notice |

## 2. Out of scope (MVP)

- Photorealistic or generative hairstyle replacement.
- 3D hair simulation, physics, or strand rendering.
- Occlusion of the user's existing hair beyond what a 2D asset can approximate.
- Rear-camera or multi-camera capture.
- User accounts, authentication, cloud storage, or sync.
- Social sharing, payments, marketplace, barber booking.
- Clothing, pants, shoes, bags, accessories, or full-outfit try-on.
- Face-shape analysis and AI recommendations (P2, post-MVP).
- Hair-color customization (P2).
- Backend services or server-side inference.

## 3. Hairstyle catalog scope

Categories are based on style characteristics, not gender.

| Category | Styles |
|---|---|
| Short | Buzz Cut, Crew Cut, French Crop, Textured Crop, Pixie Cut, Short Bob |
| Medium | Two Block, Side Part, Curtains, Wolf Cut, Layered Medium Hair, Shag |
| Long | Long Layers, Straight Long Hair, Wavy Long Hair, Long Bob, Butterfly Cut |
| Curly & Wavy | Curly Crop, Curly Fringe, Curly Bob, Wavy Layers |

MVP delivery does not require the full list. The MVP requires **at least 3 calibrated styles**
across at least 2 categories (TASK-051). Full-list delivery is a post-MVP catalog task.

Variations (color, volume, length, texture) depend on validated assets and are not MVP-blocking.

## 4. Product boundaries

- The product simulates hair only.
- Every asset must have documented usage rights before it is added to the catalog.
- The catalog is data-driven; adding a style must not require renderer changes.

## 5. Scope control

Any addition to MVP scope requires:

1. A written change proposal.
2. Impact analysis on schedule, tests, and privacy.
3. User approval.
4. Updates to PRD, scope, acceptance criteria, and task board.

## 6. Scope decisions pending

See PRD §7 and TASK-016.
