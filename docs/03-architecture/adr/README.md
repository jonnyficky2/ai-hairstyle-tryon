# Architecture Decision Records

All decisions were **PROPOSED** until explicitly approved by the project owner.
An approved ADR may only be changed by a superseding ADR, never edited silently.

| ADR | Decision | Status |
|---|---|---|
| [ADR-001](ADR-001-web-platform.md) | Application platform: web | APPROVED |
| [ADR-002](ADR-002-react-typescript.md) | Frontend: React + TypeScript | APPROVED |
| [ADR-003](ADR-003-vite.md) | Build tool: Vite | APPROVED |
| [ADR-004](ADR-004-mediapipe-face-landmarker.md) | Face tracking: MediaPipe Face Landmarker | APPROVED |
| [ADR-005](ADR-005-canvas-2d.md) | Rendering: Canvas 2D | APPROVED |
| [ADR-006](ADR-006-client-side-processing.md) | Processing location: client-side only | APPROVED |
| [ADR-007](ADR-007-mediadevices-camera.md) | Camera: MediaDevices `getUserMedia` | APPROVED |
| [ADR-008](ADR-008-transparent-2d-assets.md) | Hairstyle assets: transparent 2D images | APPROVED |
| [ADR-009](ADR-009-localstorage.md) | Storage: localStorage for preferences | APPROVED |
| [ADR-010](ADR-010-static-https-hosting.md) | Deployment: static HTTPS hosting | APPROVED |
| [ADR-011](ADR-011-self-hosted-runtime-assets.md) | Self-host WASM and model assets | APPROVED |

## Approval record

| ADR | Approved by | Date | Notes |
|---|---|---|---|
| ADR-001…ADR-011 | Project owner | 2026-11-18 | Approved as a set via TASK-014. No ADR rejected, no amendments requested. |
| ADR-004 | Project owner | 2026-11-18 | Approved for development. Model bundle redistribution terms remain OPEN (P-009) and block commercial launch, not development. |

## Standing conditions

1. Model bundle license (P-009) must be confirmed before any commercial release.
2. Any change to an approved ADR requires a superseding ADR with its own approval record.
