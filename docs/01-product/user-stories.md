# User Stories

> Status: Draft · Last updated: 2026-11-09
> Format: As a … I want … so that …
> Acceptance criteria are defined in `docs/01-product/acceptance-criteria.md`.

## Visitor

| ID | Story | Priority | Requirement |
|---|---|---|---|
| US-01 | As a visitor, I want to understand what the app does and how my camera is used before enabling it, so that I can decide whether to trust it. | P0 | FR-16 |
| US-02 | As a visitor, I want to start the try-on with one clear action, so that I do not have to configure anything. | P0 | FR-01 |
| US-03 | As a visitor whose camera permission was denied, I want clear instructions to re-enable it, so that I can recover without guessing. | P0 | FR-13, FR-18 |

## Try-on user

| ID | Story | Priority | Requirement |
|---|---|---|---|
| US-04 | As a user, I want to see a hairstyle on my face in real time, so that I can judge whether it suits me. | P0 | FR-05, FR-06 |
| US-05 | As a user, I want the hairstyle to follow my head when I move, so that the preview feels credible. | P0 | FR-04, FR-06 |
| US-06 | As a user, I want the overlay to disappear when my face is not detected, so that I am not shown a misleading frozen image. | P0 | FR-17 |
| US-07 | As a user, I want to switch hairstyles without the camera restarting, so that comparison is fast. | P0 | FR-07 |
| US-08 | As a user, I want to browse styles by category and see thumbnails, so that I can find a style quickly. | P1 | FR-08 |
| US-09 | As a user, I want to adjust the overlay size and position, so that I can correct small alignment errors. | P1 | FR-09 |
| US-10 | As a user, I want to capture and download a snapshot, so that I can show it to my barber. | P1 | FR-10, FR-11 |
| US-11 | As a user, I want to favorite styles, so that I can return to them later on the same device. | P1 | FR-12 |
| US-12 | As a user, I want to stop the camera at any time, so that I stay in control of my privacy. | P0 | FR-15 |

## Mobile user

| ID | Story | Priority | Requirement |
|---|---|---|---|
| US-13 | As a mobile user, I want the camera preview to dominate the screen and controls to be reachable with one hand, so that the experience works on a phone. | P0 | FR-14 |
| US-14 | As a mobile user, I want the layout to adapt when I rotate the device, so that the preview stays usable. | P1 | FR-14 |

## Accessibility

| ID | Story | Priority | Requirement |
|---|---|---|---|
| US-15 | As a keyboard or screen-reader user, I want all controls to be reachable and labeled, so that I can operate the app. | P1 | NFR-07 |

## Future (post-MVP, not scheduled)

| ID | Story | Priority |
|---|---|---|
| US-16 | As a user, I want a hairstyle recommendation based on my face shape, so that I can explore styles I would not have considered. | P2 |
| US-17 | As a user, I want to change hair color, so that I can preview color before dyeing. | P2 |
| US-18 | As a stylist, I want to save client previews, so that I can consult more effectively. | P2 |
