import { useEffect, useRef, useState } from "react";
import { useCamera } from "./features/camera/use-camera";
import { TopBar } from "./components/TopBar";
import { HairstyleStrip } from "./components/HairstyleStrip";
import { ControlBar } from "./components/ControlBar";
import { StatePanel } from "./components/StatePanel";

export default function App() {
  const { state, stream, start, stop } = useCamera();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [starting, setStarting] = useState(false);
  const [selectedHairstyle, setSelectedHairstyle] = useState<string | null>("short-1");

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

  const handleSnapshot = () => {
    alert("Snapshot functionality will be available in Phase 5!");
  };

  return (
    <div className="flex min-h-dvh flex-col bg-bg text-text">
      <TopBar />

      <main className="flex flex-1 flex-col items-center justify-between p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full gap-6">
        {/* Camera / Viewport Area */}
        <div className="relative flex w-full max-w-4xl flex-1 items-center justify-center overflow-hidden rounded-2xl border border-border bg-surface shadow-panel aspect-4/3 md:aspect-16/9 min-h-[320px]">
          <StatePanel state={state} />

          <video
            ref={videoRef}
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover -scale-x-100"
          />

          <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full object-cover -scale-x-100"
          />

          {state !== "ACTIVE" && (
            <div className="flex flex-col items-center justify-center p-6 text-center z-0">
              <div className="h-16 w-16 mb-4 rounded-full bg-surface-raised border border-border flex items-center justify-center text-2xl">
                👤
              </div>
              <h2 className="text-lg font-medium text-text">Camera Inactive</h2>
              <p className="text-sm text-text-muted mt-1 max-w-sm">
                Press &quot;Start Camera&quot; to begin real-time hairstyle try-on.
              </p>
            </div>
          )}
        </div>

        {/* Bottom Interactive Area */}
        <div className="w-full max-w-4xl space-y-4">
          <ControlBar
            isCameraActive={state === "ACTIVE"}
            onStart={handleStart}
            onStop={stop}
            onSnapshot={handleSnapshot}
            starting={starting}
          />

          <div className="rounded-xl border border-border bg-surface p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">
              Select Hairstyle
            </h3>
            <HairstyleStrip
              selectedId={selectedHairstyle}
              onSelect={setSelectedHairstyle}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
