# Manual UAT

> Status: PROPOSED · Last updated: 2026-11-09
> Executed in TASK-073 and TASK-082. Results are recorded here, not in chat.

## 1. Purpose

Automation cannot validate real camera behavior, tracking quality, or perceived alignment. Manual
UAT is the release gate for those concerns.

## 2. Device matrix

| ID | Device | OS | Browser | Required |
|---|---|---|---|---|
| D1 | MacBook (or equivalent) | macOS current | Chrome current | Yes |
| D2 | Windows laptop | Windows current | Edge current | Yes |
| D3 | MacBook | macOS current | Safari current | Yes |
| D4 | Mid-range Android | Android current | Chrome current | Yes |
| D5 | iPhone | iOS current | Safari current | Yes if available |
| D6 | Low-end Android | Android current | Chrome current | Optional |

Record exact model and OS version with results. "Mid-range" alone is not evidence.

## 3. UAT scenarios

| ID | Scenario | Expected |
|---|---|---|
| UAT-01 | Front-facing face, good light | Overlay aligned |
| UAT-02 | Head moves left | Overlay follows without detaching |
| UAT-03 | Head moves right | Overlay follows |
| UAT-04 | Head moves up/down | Overlay stays reasonably aligned |
| UAT-05 | Head tilts | Roll matches |
| UAT-06 | Face leaves frame | Overlay hides, guidance shown |
| UAT-07 | Face returns | Overlay reappears smoothly |
| UAT-08 | Camera permission denied | Helpful, actionable message |
| UAT-09 | Switch hairstyle | Preview updates, camera does not restart |
| UAT-10 | Adjust size/position | Preview reflects immediately |
| UAT-11 | Toggle overlay | On/off without layout shift |
| UAT-12 | Snapshot | Correct composed image |
| UAT-13 | Download | File saved, opens correctly |
| UAT-14 | Stop camera | Indicator off, restart available |
| UAT-15 | Rotate mobile device | Layout adapts |
| UAT-16 | Low light | Tracking degrades gracefully |
| UAT-17 | Backlit subject | No crash; guidance if tracking fails |
| UAT-18 | Different skin tones and hair lengths | No systematic tracking failure observed |
| UAT-19 | Two faces | Policy behaves as decided |
| UAT-20 | 5-minute session | No crash; FPS recorded |

## 4. Alignment acceptance

For each approved asset:

1. Capture a still at three face widths (near, medium, far).
2. Capture a still at moderate yaw left and right.
3. Reviewers check: hairline position, temple alignment, rotation, obvious gaps.
4. Pass requires both reviewers to accept, or a documented deviation.
5. Failures return to TASK-052 for calibration.

## 5. Result record

| Field | Required |
|---|---|
| Date | Yes |
| Device / OS / browser versions | Yes |
| Build commit | Yes |
| Scenario ID | Yes |
| Result (PASS/FAIL/BLOCKED) | Yes |
| Notes | Yes |
| Evidence path | Yes |

## 6. Sign-off

UAT is complete when:

- All P0 scenarios PASS.
- P1 scenarios PASS or are explicitly deferred.
- No critical defect is open.
- Results are recorded in this document and linked from TASK-073.

| Role | Name | Date | Signature |
|---|---|---|---|
| Tester | — | — | — |
| Reviewer | — | — | — |
| Project owner | — | — | — |

## 7. Current status

Not executed. No application exists yet.
