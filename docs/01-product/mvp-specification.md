# MVP Specification

> Status: Draft — awaiting approval (TASK-013) · Last updated: 2026-11-09
> Requirements use the IDs defined in `docs/01-product/prd.md`.

## 1. MVP objective

Prove that the core live try-on experience works before investing in realism or intelligence:

1. Camera works reliably.
2. Face detection and tracking are stable enough to be useful.
3. A hairstyle asset follows the head well enough that a user would use the result.

## 2. P0 — Core (MVP blocker)

| Feature | Requirement | Acceptance |
|---|---|---|
| Camera access | FR-01 | AC-01 |
| Face detection | FR-02 | AC-02 |
| Face landmarks | FR-03 | AC-03 |
| Head tracking | FR-04 | AC-04 |
| Hairstyle overlay | FR-05 | AC-05 |
| Live update | FR-06 | AC-06 |
| Hairstyle selection | FR-07 | AC-07 |
| Responsive UI | FR-14 | AC-14 |
| Error handling | FR-13 | AC-13 |
| Camera stop | FR-15 | AC-15 |
| Consent gate | FR-16 | AC-16 |
| Tracking-lost state | FR-17 | AC-17 |

## 3. P1 — Supporting

| Feature | Requirement | Acceptance |
|---|---|---|
| Catalog and filter | FR-08 | AC-08 |
| Preview controls | FR-09 | AC-09 |
| Snapshot | FR-10 | AC-10 |
| Download | FR-11 | AC-11 |
| Favorites | FR-12 | AC-12 |
| Camera retry | FR-18 | AC-18 |

## 4. P2 — Post-MVP enhancement

- Face shape analysis.
- AI hairstyle recommendation.
- Hair color customization.
- Pose-aware rendering improvements.
- Hairstyle personalization.
- Multi-result comparison.

## 5. MVP non-goals

See `docs/01-product/product-scope.md` §2.

## 6. Minimum deliverable for a usable demo

- One supported desktop browser, verified.
- At least 3 calibrated hairstyles in 2 categories.
- Front-facing camera, single face, near-frontal head angles.
- Snapshot download works.
- Privacy notice and camera stop control work.
- No known critical defect.

## 7. Definition of Done

A feature is DONE only per `docs/05-development/definition-of-done.md`. Writing code is not
evidence of completion.

## 8. Exit criteria for the MVP

1. All P0 acceptance criteria pass with evidence.
2. P1 acceptance criteria pass or are explicitly deferred with approval.
3. Manual UAT PASS on the minimum device matrix.
4. Benchmark targets met or deviations documented and approved.
5. Privacy and security requirements verified.
6. Deployment smoke test passes on production HTTPS.
