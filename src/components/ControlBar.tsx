interface ControlBarProps {
  isCameraActive: boolean;
  onStart: () => void;
  onStop: () => void;
  onSnapshot: () => void;
  starting: boolean;
}

export function ControlBar({
  isCameraActive,
  onStart,
  onStop,
  onSnapshot,
  starting,
}: ControlBarProps) {
  return (
    <div className="flex items-center justify-center gap-4 rounded-lg border border-border bg-surface p-4">
      {!isCameraActive ? (
        <button
          type="button"
          onClick={onStart}
          disabled={starting}
          className="rounded-lg bg-accent px-6 py-2 font-medium text-accent-contrast hover:opacity-90 disabled:opacity-50"
        >
          {starting ? "Starting..." : "Start Camera"}
        </button>
      ) : (
        <>
          <button
            type="button"
            onClick={onSnapshot}
            className="flex items-center gap-2 rounded-lg border border-border bg-bg px-4 py-2 hover:bg-surface-raised"
          >
            📸 Capture
          </button>
          <button
            type="button"
            onClick={onStop}
            className="rounded-lg border border-danger bg-danger/10 px-6 py-2 font-medium text-danger hover:bg-danger/20"
          >
            Stop
          </button>
        </>
      )}
    </div>
  );
}
