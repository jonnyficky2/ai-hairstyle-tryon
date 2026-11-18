# Project Overview

> Status: Draft (awaiting approval) · Last updated: 2026-11-09
> Source of truth for project state and document navigation.

## 1. What this project is

AI Hairstyle Try-On is a responsive web application that overlays hairstyles on a user's face
using a live camera feed. The MVP proves three things:

1. The camera works reliably across supported browsers and devices.
2. The face is detected and tracked with acceptable stability.
3. A hairstyle asset can be positioned and scaled on the head well enough to be useful.

The MVP is **not** a photorealistic generative hair replacement system.

## 2. Current state

| Item | State |
|---|---|
| Phase | Phase 1 — Project foundation |
| Application source code | Scaffold only (no features) |
| Dependencies installed | Yes, pinned |
| Git repository | Initialized locally, no remote |
| Documentation system | Approved |
| Product scope approval | Closed 2026-11-18 |
| Architecture approval | Closed 2026-11-18 |
| Implementation authorization | Granted 2026-11-18 |

Phase 4 (hairstyle assets) cannot start until TASK-015 is resolved.

## 3. Documentation layers

| Layer | Folder | Answers |
|---|---|---|
| Overview | `docs/00-project-overview/` | Why does this exist, what state is it in? |
| Product | `docs/01-product/` | What are we building and for whom? |
| Design | `docs/02-design/` | How does it look and behave? |
| Architecture | `docs/03-architecture/` | How is it built? What was decided and why? |
| Research | `docs/04-ai-research/` | What is verified about the AI/vision technology? |
| Development | `docs/05-development/` | How is work planned, executed, and tracked? |
| Quality | `docs/06-quality/` | How do we know it works? |
| Security | `docs/07-security/` | How is user data and the device protected? |
| Operations | `docs/08-operations/` | How is it released and run? |
| History | `docs/09-project-history/` | What changed, what was decided, what happened? |

Full document index: root `README.md`.

## 4. Evidence vocabulary

Every technical statement in this documentation set is tagged, explicitly or implicitly, as one of:

| Tag | Meaning |
|---|---|
| VERIFIED | Checked against an official source on the stated date (link included). |
| ASSUMPTION | Believed true, not yet tested. Must be validated by a named task. |
| PROPOSAL | Suggested design or decision, awaiting approval. |
| OPEN QUESTION | Unresolved; blocks or constrains downstream work. |

Verified facts currently come from: MediaPipe official task documentation and setup guide,
MDN `getUserMedia` reference, npm registry metadata, and the MediaPipe repository license file.
Verification date for this documentation set: **2026-11-09**.

## 5. Non-negotiable product constraints

1. Camera processing stays on-device for the MVP.
2. The camera starts only after explicit user permission and stops on demand.
3. No video is uploaded automatically.
4. No face recognition or biometric identity is performed.
5. The MVP must degrade gracefully when the camera, WebAssembly, or GPU is unavailable.

## 6. Glossary

| Term | Meaning |
|---|---|
| Landmark | One of 478 3D facial points returned by the Face Landmarker. |
| Anchor | Normalized point in a hairstyle asset that maps to a facial reference point. |
| Head pose | Estimated orientation (yaw, pitch, roll) and scale of the head. |
| Overlay | The hairstyle image drawn on top of the camera frame. |
| Snapshot | A user-triggered still image combining camera frame and overlay. |
| Track lost | No face detected or confidence below threshold for a defined period. |
| Liveness | Whether tracking is currently producing usable results. |
