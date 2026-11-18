import { useEffect, useRef, useState } from "react";
import { useCamera } from "./features/camera/use-camera";

export default function App() {
  const { state, stream, start, stop } = useCamera();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    if (state !== "ACTIVE" || !stream) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    video.srcObject = stream;
    void video.play();
    let raf = 0;
    const draw = () => {
      const v = videoRef.current;
      const c = canvasRef.current;
      if (v && c) {
        const ctx = c.getContext("2d");
        if (ctx && v.readyState >= 2 && v.videoWidth > 0 && v.videoHeight > 0) {
          c.width = v.videoWidth;
          c.height = v.videoHeight;
          ctx.drawImage(v, 0, 0, c.width, c.height);
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [state, stream]);

  const handleStart = async () => {
    setStarting(true);
    try {
      await start();
    } finally {
      setStarting(false);
    }
  };

  return (
    <main className="min-h-dvh bg-bg p-6 text-text">
      <h1 className="text-2xl font-semibold">AI Hairstyle Try-On</h1>
      <p className="mt-2 text-sm text-text-muted">Phase 2 — live camera preview scaffold.</p>
      <div className="mt-6 rounded-lg border border-border bg-surface p-4 shadow-panel">
        <video ref={videoRef} muted playsInline className="h-64 w-full rounded-lg bg-black" />
        <canvas ref={canvasRef} className="mt-2 h-64 w-full rounded-lg bg-black" />
      </div>
      {state === "REQUESTING" && <p className="mt-2 text-sm text-text-muted">Waiting for camera permission…</p>}
      {state === "INITIALIZING" && <p className="mt-2 text-sm text-text-muted">Starting camera…</p>}
      {state === "DENIED" && <p className="mt-2 text-sm text-text-muted">Camera permission denied. Enable camera access in your browser settings, then retry.</p>}
      {state === "DEVICE_UNAVAILABLE" && <p className="mt-2 text-sm text-text-muted">No camera device available. Connect a webcam.</p>}
      {state === "ERROR" && <p className="mt-2 text-sm text-text-muted">Camera error occurred. Retry or check your camera connection.</p>}
      {state === "STOPPED" && <p className="mt-2 text-sm text-text-muted">Camera stopped.</p>}
      <div className="mt-6 flex gap-2">
        <button type="button" onClick={handleStart} disabled={starting || state === "ACTIVE"}>
          Start camera
        </button>
        <button type="button" onClick={stop} disabled={state !== "ACTIVE"}>
          Stop camera
        </button>
      </div>
      <div className="mt-6 rounded-lg border border-border bg-surface p-4 shadow-panel">
        <p className="text-xs text-text-muted">Design tokens</p>
        <p className="mt-1 text-base">surface · border · radius-lg · shadow-panel</p>
      </div>
    </main>
  );
}
