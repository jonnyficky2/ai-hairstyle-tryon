# ADR-007 — Camera: MediaDevices `getUserMedia`

**Status:** APPROVED (2026-11-18)
**Date:** 2026-11-09

## Context

The app needs a live camera stream in the browser with user consent.

## Problem statement

How should the app acquire and manage the camera stream?

## Options considered

1. `navigator.mediaDevices.getUserMedia`.
2. Legacy `navigator.getUserMedia`.
3. `MediaRecorder` (recording only).
4. Third-party capture library.

## Decision

Use `navigator.mediaDevices.getUserMedia` with explicit consent and full lifecycle management.

## Rationale

- Standard browser API; no dependency.
- Required secure context enforces HTTPS.
- Supports facing mode and device selection.
- Well-documented error model.

## Trade-offs

- Permission UX differs across browsers.
- The permission promise may never settle if ignored (VERIFIED).
- iOS Safari behavior differs and must be tested.
- No depth or intrinsic camera calibration data.

## Consequences

- HTTPS is mandatory.
- A cancel path is required while requesting permission.
- All tracks must be stopped on exit.
- Device switching must stop the previous stream first.

## Verification requirements

- Permission grant, deny, dismiss, and retry tested (TASK-033, TASK-073).
- Track stop verified (TASK-033).
- Insecure-context behavior shows guidance (TASK-032).
