import { useCallback, useRef, useState } from "react";
import { CameraService } from "./camera-service";
import type { CameraState } from "./camera-state";

export function useCamera() {
  const [state, setState] = useState<CameraState>("IDLE");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const serviceRef = useRef<CameraService | null>(null);
  if (serviceRef.current === null) {
    serviceRef.current = new CameraService();
  }
  const service = serviceRef.current;

  const start = useCallback(
    async (constraints?: MediaStreamConstraints) => {
      const next = await service.start(constraints);
      setStream(next);
      setState(service.getState());
      return next;
    },
    [service],
  );

  const stop = useCallback(() => {
    service.stop();
    setStream(null);
    setState("STOPPED");
  }, [service]);

  return { state, stream, start, stop };
}
