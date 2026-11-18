# Test Cases

> Status: PROPOSED · Last updated: 2026-11-09
> Automated cases are implemented in Phase 1–6. Manual cases are executed in TASK-073.
> `U` = unit, `I` = integration, `E` = E2E, `M` = manual.

## Camera

| ID | Type | Given / When / Then | AC |
|---|---|---|---|
| TC-01 | E | Consent given, camera available → start → live preview appears | AC-01 |
| TC-02 | I | Permission denied → typed `PERMISSION_DENIED`, state `DENIED` | AC-13 |
| TC-03 | I | No device → `NO_DEVICE`, state `DEVICE_UNAVAILABLE` | AC-13 |
| TC-04 | I | Device busy → `DEVICE_BUSY`, actionable message | AC-13 |
| TC-05 | E | Permission prompt ignored → user can cancel, no hang | AC-13 |
| TC-06 | I | Stop → every track `readyState === "ended"` | AC-15 |
| TC-07 | M | Stop → OS/browser camera indicator turns off | AC-15 |
| TC-08 | E | Retry after recoverable error → initialization attempted | AC-18 |
| TC-09 | M | Insecure context → HTTPS guidance shown | AC-13 |

## Tracking

| ID | Type | Given / When / Then | AC |
|---|---|---|---|
| TC-10 | I | One face → detected state within 1 s | AC-02 |
| TC-11 | U | Landmark fixture → 478 points returned and mapped | AC-03 |
| TC-12 | U | Known left turn → yaw sign matches convention | AC-04 |
| TC-13 | U | Known tilt → roll matches eye-line angle | AC-04 |
| TC-14 | U | Still fixture → smoother variance below raw variance | AC-06 |
| TC-15 | U | Sudden jump → smoother does not overshoot | AC-06 |
| TC-16 | I | Face leaves frame 500 ms → `TRACKING_LOST`, overlay hidden | AC-17 |
| TC-17 | I | Face returns → overlay reappears, smoother reset | AC-17 |
| TC-18 | M | Two faces → policy from TASK-016 is applied | AC-17 |

## Rendering

| ID | Type | Given / When / Then | AC |
|---|---|---|---|
| TC-19 | U | Fixed pose + asset → expected transform within tolerance | AC-05 |
| TC-20 | U | Cover-fit mapping at 16:9, 4:3, 1:1 → no distortion | AC-05 |
| TC-21 | M | Each approved asset → hairline within tolerance | AC-05 |
| TC-22 | E | Switch style → stream object unchanged | AC-07 |
| TC-23 | I | Asset load failure → previous overlay kept or hidden + error | AC-19 |
| TC-24 | M | Move head left/right/up/down → overlay follows | AC-06 |
| TC-25 | M | Extreme yaw → overlay fades/hides per calibration | AC-06 |

## UX

| ID | Type | Given / When / Then | AC |
|---|---|---|---|
| TC-26 | U | Catalog filter by category → only matching items | AC-08 |
| TC-27 | E | Favorite → reload → state restored | AC-12 |
| TC-28 | E | Size/position change → next frame reflects it | AC-09 |
| TC-29 | E | Snapshot → PNG produced, dimensions match preview | AC-10 |
| TC-30 | E | Download → file downloaded, no image network request | AC-11 |
| TC-31 | M | 360×640 viewport → no horizontal scroll | AC-14 |
| TC-32 | M | Rotate device → layout adapts, preview usable | AC-14 |
| TC-33 | E | First load → no camera request before consent | AC-16 |
| TC-34 | M | Keyboard-only → all controls reachable, focus visible | NFR-07 |

## Quality and privacy

| ID | Type | Given / When / Then | AC |
|---|---|---|---|
| TC-35 | I | Corrupt catalog entry → excluded, app does not crash | AC-19 |
| TC-36 | M | Full session network capture → no image/video upload | AC-22 |
| TC-37 | M | localStorage dump → only non-sensitive keys | AC-22 |
| TC-38 | M | 5-minute session → FPS recorded, thermal note | NFR-02 |
| TC-39 | M | Production build → camera and download work over HTTPS | AC-01, AC-11 |
| TC-40 | M | Offline except app origin → model/WASM still load | ADR-011 |

## Traceability

Each automated test must reference its requirement or acceptance ID in its name or description.
Manual cases must record device, browser, date, result, and evidence path.
