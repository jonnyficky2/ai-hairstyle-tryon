# ADR-008 — Hairstyle Assets: Transparent 2D Images

**Status:** APPROVED (2026-11-18)
**Date:** 2026-11-09

## Context

The MVP must display recognizable hairstyles on a tracked head without a 3D hair pipeline.

## Problem statement

What asset format and representation should the hairstyle catalog use?

## Options considered

1. Transparent 2D PNG images with anchor metadata.
2. 3D hair models (glTF) with strand rendering.
3. Generative image replacement.
4. Layered 2D parts (front/side/back).

## Decision

Transparent 2D PNG assets with per-asset anchor and calibration metadata.

## Rationale

- Compatible with the Canvas 2D renderer (ADR-005).
- Simple to author, review, and license.
- Fast to load and draw.
- Sufficient to prove the overlay concept.
- Catalog can grow without renderer changes.

## Trade-offs

- Limited realism; no true volume or occlusion.
- Alignment depends on manual calibration.
- Extreme head angles break the illusion.
- Asset quality dominates perceived product quality.

## Consequences

- A strict asset specification is required (`hairstyle-asset-specification.md`).
- Every asset needs anchors, calibration, and a license.
- Asset sourcing is a project risk and a blocking task (TASK-015).
- A layered/3D approach would require a new ADR.

## Verification requirements

- Assets pass the quality checklist (TASK-051, TASK-052).
- Visual alignment accepted in UAT (TASK-058, TASK-073).
- Licenses recorded before catalog approval (TASK-015).
