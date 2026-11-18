# Component Architecture

> Status: APPROVED (2026-11-18) · Last updated: 2026-11-18
> Interfaces are contracts, not implementation. Only a Vite + React + TypeScript scaffold exists.

## 1. Module map

| Module | Folder (proposed) | Responsibility |
|---|---|---|
| App shell | `src/app/` | Routing, layout, providers, error boundary |
| Camera | `src/features/camera/` | Permission, stream, devices, lifecycle |
| Face tracking | `src/features/face-tracking/` | Model loading, inference, landmarks |
| Pose | `src/features/face-tracking/` | Pose estimation, smoothing, confidence |
| Renderer | `src/features/renderer/` | Transform math, canvas composition |
| Hairstyle | `src/features/hairstyle/` | Catalog, assets, favorites |
| Snapshot | `src/features/snapshot/` | Capture and download |
| UI | `src/components/` | Presentational components |
| Hooks | `src/hooks/` | React adapters for services |
| Services | `src/services/` | Storage, download, feature detection |
| Types | `src/types/` | Shared domain types |
| Utils | `src/utils/` | Pure math and helpers |
| Styles | `src/styles/` | Tokens and global CSS |

## 2. Core contracts

```ts
type CameraState =
  | "IDLE" | "REQUESTING" | "DENIED" | "INITIALIZING" | "ACTIVE"
  | "NO_FACE" | "MULTIPLE_FACES" | "TRACKING" | "TRACKING_LOST"
  | "STOPPED" | "DEVICE_UNAVAILABLE" | "ERROR";

type CameraErrorCode =
  | "PERMISSION_DENIED" | "NO_DEVICE" | "DEVICE_BUSY"
  | "CONSTRAINT_UNSATISFIABLE" | "INSECURE_CONTEXT" | "UNKNOWN";

interface Landmark { x: number; y: number; z: number } // normalized to the video frame

interface TrackingFrame {
  landmarks: Landmark[];          // 478 points
  transformMatrix?: number[];     // 16 values, row-major, if enabled
  timestampMs: number;
  confidence: number;             // derived, see face tracking spec
}

interface HeadPose {
  centerX: number; centerY: number; // normalized video coordinates
  scale: number;                    // inter-ocular distance in normalized units
  yaw: number; pitch: number; roll: number; // radians
}

interface OverlayTransform {
  x: number; y: number;            // canvas pixels, anchor origin
  width: number; height: number;   // canvas pixels
  rotation: number;                // radians
  visible: boolean;
}
```

## 3. Service responsibilities

### CameraService
- `start(constraints): Promise<MediaStream>`
- `stop(): void` — stops all tracks, clears `srcObject`
- `switchDevice(deviceId): Promise<void>` — stops old tracks first
- `listDevices(): Promise<MediaDeviceInfo[]>`
- Emits state and typed errors. Owns no UI.

### FaceTrackingService
- `initialize(modelUrl, wasmUrl, delegate): Promise<void>`
- `detect(video, timestampMs): TrackingFrame | null`
- `dispose(): void`
- Must never be called more than once per animation frame.

### PoseEstimator
- Pure function: `estimate(frame, videoAspect): HeadPose`
- Uses the transformation matrix when available; falls back to landmark geometry.
- No side effects.

### Smoother
- `filter(pose: HeadPose, dtSeconds: number): HeadPose`
- Resets when tracking is lost.
- Deterministic and unit-testable.

### OverlayTransform
- `compute(pose, asset, adjustment): OverlayTransform`
- Pure function. Owns anchor math and user adjustment.

### Renderer
- `render(frameSource, asset, transform): void`
- Handles device pixel ratio and canvas sizing.
- Does not load assets.

### CatalogService
- `load(): Promise<Hairstyle[]>`
- `filter(category): Hairstyle[]`
- `favorite(id, on): void`
- Validates metadata at load time.

### SnapshotService
- `capture(canvas): Promise<Blob>`
- `download(blob, filename): void`
- No network calls.

## 4. React integration rules

1. The frame loop lives in a service/hook, never inside a component render.
2. Per-frame values are written to refs or imperatively to canvas; they do not trigger React state
   updates every frame.
3. React state changes only for discrete events (state machine transitions, selection, errors).
4. Cleanup on unmount must stop tracks and dispose the model.

## 5. Dependency direction

```
app → features → services/utils/types
UI components → design tokens only
features must not import each other's internals; share via types and pure functions
```

## 6. Proposed file-level mapping

| Concern | Expected files |
|---|---|
| Camera | `camera-service.ts`, `use-camera.ts`, `camera-state.ts` |
| Tracking | `face-tracking-service.ts`, `use-face-tracking.ts`, `landmark-math.ts` |
| Pose | `pose-estimator.ts`, `smoothing.ts` |
| Rendering | `overlay-transform.ts`, `renderer.ts`, `canvas-sizing.ts` |
| Catalog | `catalog-service.ts`, `catalog.json`, `hairstyle-types.ts` |
| Snapshot | `snapshot-service.ts`, `download.ts` |
| UI | `camera-preview.tsx`, `hairstyle-strip.tsx`, `control-bar.tsx`, `state-panel.tsx` |

Exact filenames are finalized in TASK-025.
