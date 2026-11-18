# Benchmark Plan

> Status: PROPOSED · Last updated: 2026-11-09
> No benchmark has been executed. This document defines how results will be produced and judged.

## 1. Purpose

Replace assumptions with measured evidence for:

- Camera initialization time.
- Preview frame rate.
- Tracking-to-render latency.
- Overlay alignment error.
- Memory and thermal behavior.
- First-load payload and time.

## 2. Hypotheses

| ID | Hypothesis | Falsified if |
|---|---|---|
| H-01 | Camera becomes usable in under 5 s on supported devices. | Median > 5 s |
| H-02 | Desktop preview reaches 24–30 FPS. | Median < 24 FPS |
| H-03 | Mid-range mobile reaches 15–24 FPS. | Median < 15 FPS |
| H-04 | Tracking-to-render latency stays under 150 ms. | Median > 150 ms |
| H-05 | Near-frontal overlay alignment is acceptable without manual adjustment for at least 3 assets. | Any approved asset fails visual criteria |
| H-06 | Self-hosted model + WASM load in under 5 s on a typical connection. | Median > 5 s |

Targets come from the PRD (NFR-01…NFR-03) and are engineering targets, not guarantees.

## 3. Metrics and definitions

| Metric | Definition | Instrumentation |
|---|---|---|
| Camera init | `start` click → first playable frame | `performance.now()` marks |
| FPS | Frames drawn per second over a 30 s window | Frame counter |
| Inference time | `detectForVideo` call duration | `performance.now()` around the call |
| Render time | Canvas composition duration | `performance.now()` |
| End-to-end latency | Frame capture timestamp → canvas present | Timestamp diff per frame |
| Dropped frames | Frames where no new video frame was processed | `video.currentTime` guard |
| Alignment error | Visual offset of hairline/temples vs reference, in face-width % | Manual annotation on stills |
| Payload | Bytes transferred on first load | Network panel/export |
| Memory | JS heap and GPU memory where exposed | Browser tooling |
| Thermal | FPS over a 5-minute session | Rolling FPS log |

## 4. Test scenarios

1. Static face, good lighting, near-frontal.
2. Slow pan left/right.
3. Nod up/down.
4. Roll (head tilt).
5. Leave frame and return.
6. Two faces in frame.
7. Low light.
8. Backlit subject.
9. Different skin tones and hair lengths.
10. 5-minute continuous session (thermal).

## 5. Device matrix

| Class | Example | Required |
|---|---|---|
| Desktop | MacBook, Chrome | Yes |
| Desktop | Windows, Edge | Yes |
| Desktop | Safari macOS | Yes |
| Mobile | Mid-range Android, Chrome | Yes |
| Mobile | iPhone, Safari | Yes if available |
| Mobile | Low-end Android | Optional |

Exact models are recorded with results; "mid-range" alone is not evidence.

## 6. Procedure

1. Build a production bundle with the debug overlay enabled.
2. Clear cache for a cold-load measurement; repeat warm.
3. Run each scenario for 30 s; record metrics.
4. Capture stills for alignment measurement.
5. Repeat each measurement 3 times; report median and range.
6. Store raw logs and stills with the task evidence.
7. Do not tune parameters between runs without recording it.

## 7. Pass/fail rules

- A hypothesis passes if the median meets the target and the worst run is within 20%.
- A miss is not a failure of the project; it requires documented mitigation or explicit acceptance.
- Alignment is judged per asset by two reviewers; disagreement escalates to the project owner.
- Results are recorded even when they contradict expectations.

## 8. Evidence format

Each benchmark report includes:

- Date, commit hash, build ID.
- Device and OS versions.
- Browser and version.
- Model/WASM versions.
- Scenario and duration.
- Median, min, max for each metric.
- Raw log file path.
- Screenshots/recordings for alignment.
- Deviations from the procedure.

## 9. Schedule

| When | What | Task |
|---|---|---|
| After tracking integration | Tracking and render timing | TASK-047 |
| After renderer calibration | Alignment measurement | TASK-058 |
| Before release | Full device matrix | TASK-074 |
| Before release | Mobile optimization verification | TASK-075 |

## 10. Explicit non-claims

This plan does not assert that any target is achievable. The original document's numbers are
targets, not results.
