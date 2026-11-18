# Privacy Notice and Consent Copy

> Status: APPROVED 2026-11-18 (TASK-017) · Language: English (D-014)
> These are the exact strings the app must display. Changing them requires re-approval.
> Requirements: `docs/07-security/privacy-policy-requirements.md`.

## 1. Landing page — privacy summary

**Your camera stays on your device.**

- Hairstyles are drawn on your own camera feed inside this browser.
- Your video, photos, and face data are never uploaded to a server.
- You can stop the camera at any time.
- We do not identify you or build a face profile.
- Your favourites are saved only in this browser.

## 2. Consent screen — before the camera starts

**Before we turn on your camera**

This app uses your camera to show hairstyles on your face in real time. Everything is processed
in your browser — nothing is sent anywhere.

By continuing you agree that:
- the camera turns on only after you press the button below;
- you can stop it whenever you want;
- your favourites and this acknowledgement are stored locally on this device.

[ Start camera ]  [ Not now ]

Helper text under the button:
> Your browser will also ask for camera permission. That prompt is separate from this one.

## 3. Permission denied

**Camera access is blocked**

Your browser is blocking the camera for this site. Nothing was recorded and nothing was sent.

To fix it:
1. Open the site settings in your browser's address bar.
2. Allow camera access for this site.
3. Come back and press Retry.

[ Retry ]  [ Read the privacy notice ]

## 4. Camera unavailable / in use

**We can't reach your camera**

The camera may be disconnected or another app is using it. Close the other app, check that the
camera is connected, then press Retry.

[ Retry ]

## 5. Settings — privacy panel

**Privacy**

- Camera: [ Stopped / Running ] — [ Stop camera ]
- Stored on this device: hairstyle favourites, consent acknowledgement.
- Not stored: video, photos, face data.
- [ Clear local data ]

Confirm dialog for clearing:
> This removes your favourites and consent from this browser. It does not delete anything else.
> [ Clear ] [ Cancel ]

## 6. Footer / notice link

> Privacy notice — this app processes your camera feed locally and does not upload it.

## 7. Claims this copy must never make

- That the app is "100% private" or "cannot be accessed by anyone".
- That tracking is accurate, medical, or diagnostic.
- That the user's identity is recognised.
- That data is deleted from servers, because no data reaches a server.

## 8. Known accuracy limits of this copy

| Item | Status |
|---|---|
| Hosting provider may log IP and request metadata | Must be stated if the host logs requests. Text pending host selection (TASK-081). |
| Operator identity and contact | Not defined. Placeholder required before release (P-010). |
| Jurisdiction | Indonesia (UU 27/2022) assumed. Legal review deferred. |

## 9. Verification

- TASK-076 confirms the copy matches observed network and storage behaviour.
- TASK-017 approval recorded in `docs/09-project-history/decision-log.md`.
