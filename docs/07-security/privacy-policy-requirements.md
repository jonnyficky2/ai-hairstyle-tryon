# Privacy Policy Requirements

> Status: PROPOSED — awaiting approval (TASK-017) · Last updated: 2026-11-09
> This document defines what the privacy notice must say and what the product must actually do.

## 1. Data inventory

| Data | Where it lives | Retention | Leaves device? |
|---|---|---|---|
| Camera frames | Memory only | Discarded after each frame | No |
| Facial landmarks | Memory only | Discarded after use | No |
| Head pose | Memory only | Discarded after use | No |
| Snapshot | Memory until user downloads | Until tab closes or download | No (download is local) |
| Favorite IDs | `localStorage` | Until cleared | No |
| Consent acknowledgement | `localStorage` | Until cleared | No |
| Runtime assets (WASM/model) | HTTP cache | Browser-managed | Downloaded from app origin only |
| Server logs (host/CDN) | Host provider | Provider-defined | IP and request metadata may be logged |

**Not collected:** names, accounts, email, precise location, biometric templates, face embeddings,
identity matches.

## 2. Required product behavior

1. No camera request before an explicit user action.
2. The camera can be stopped at any time; stopping releases all tracks.
3. No automatic upload of frames, video, or snapshots.
4. No face recognition or identity inference.
5. No biometric profile is created or stored.
6. Third-party requests during a normal session: none beyond the app origin (ADR-011).
7. Snapshot files are created only on user action.
8. Clearing favorites and consent must be available in settings.

## 3. Privacy notice content (minimum)

The notice must state, in plain language:

- What the app does: overlays hairstyles on a live camera feed.
- That processing happens in the browser on the user's device.
- That camera access requires permission and can be revoked.
- That frames and snapshots are not uploaded by the MVP.
- That favorites and consent are stored locally on the device.
- That the app does not identify people or create biometric profiles.
- How to stop the camera and clear local data.
- What the hosting provider may log (IP, request metadata), if applicable.
- How to contact the operator (placeholder until decided).

## 4. Consent

- Consent is explicit and separate from the camera permission prompt.
- The user must be able to use the site's explanatory content without granting camera access.
- Consent state is stored locally and can be withdrawn.
- Withdrawing consent stops the camera and does not require a page reload.

## 5. Children

- The MVP is not directed at children.
- No age verification is implemented in the MVP; this is an open legal question.
- The privacy notice must not imply suitability for children.

## 6. Future cloud features

If any future feature uploads images:

- It requires a new ADR and explicit consent.
- It must state purpose, retention, and deletion.
- It must not be bundled into the MVP consent.

## 7. Legal review items (OPEN)

- Applicable jurisdiction and regulation (e.g., GDPR, Indonesia's PDP Law).
- Whether camera/face processing counts as sensitive data under the applicable law.
- Required retention and deletion statements.
- Whether a cookie banner is needed (MVP uses no tracking cookies).
- Operator identity and contact details.

## 8. Verification

- TASK-076: network capture, storage inspection, consent flow.
- TASK-017: copy approval.
- TASK-077: security review.
