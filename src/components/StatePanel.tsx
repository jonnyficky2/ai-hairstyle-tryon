import type { CameraState } from "../features/camera/camera-state";

interface StatePanelProps {
  state: CameraState;
}

export function StatePanel({ state }: StatePanelProps) {
  const messages: Record<string, string> = {
    REQUESTING: "Waiting for camera permission…",
    DENIED: "Camera permission denied. Please enable access in browser settings.",
    DEVICE_UNAVAILABLE: "No camera device found.",
    ERROR: "An error occurred with the camera.",
    INITIALIZING: "Initializing camera engine…",
    NO_FACE: "Center your face in the frame",
    MULTIPLE_FACES: "Detection paused: Multiple faces detected",
    TRACKING_LOST: "Face lost — move back into frame",
    STOPPED: "Camera is stopped",
  };

  const message = messages[state];
  if (!message) return null;

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
      <div className="bg-bg/80 backdrop-blur-md border border-border px-4 py-2 rounded-full shadow-lg text-sm font-medium text-text-muted">
        {message}
      </div>
    </div>
  );
}
