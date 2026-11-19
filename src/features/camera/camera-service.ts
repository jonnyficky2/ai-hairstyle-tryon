import type { CameraErrorCode, CameraState } from "./camera-state";

export interface MediaDevicesLike {
  getUserMedia(constraints: MediaStreamConstraints): Promise<MediaStream>;
  enumerateDevices(): Promise<MediaDeviceInfo[]>;
}

export class CameraError extends Error {
  readonly code: CameraErrorCode;

  constructor(code: CameraErrorCode, message?: string) {
    super(message ?? code);
    this.name = "CameraError";
    this.code = code;
  }
}

const DEFAULT_CONSTRAINTS: MediaStreamConstraints = {
  audio: false,
  video: {
    facingMode: "user",
    width: { ideal: 1280 },
    height: { ideal: 720 },
    frameRate: { ideal: 30, max: 30 },
  },
};

const defaultMediaDevices: MediaDevicesLike = {
  getUserMedia: (constraints) =>
    navigator.mediaDevices.getUserMedia(constraints),
  enumerateDevices: () => navigator.mediaDevices.enumerateDevices(),
};

export class CameraService {
  private state: CameraState = "IDLE";
  private stream: MediaStream | null = null;
  private readonly mediaDevices: MediaDevicesLike;

  constructor(mediaDevices: MediaDevicesLike = defaultMediaDevices) {
    this.mediaDevices = mediaDevices;
  }

  getState(): CameraState {
    return this.state;
  }

  async start(
    constraints: MediaStreamConstraints = DEFAULT_CONSTRAINTS,
  ): Promise<MediaStream> {
    if (this.state === "ACTIVE" && this.stream) {
      return this.stream;
    }
    if (!navigator.mediaDevices) {
      this.state = "ERROR";
      throw new CameraError("INSECURE_CONTEXT");
    }
    this.state = "REQUESTING";
    try {
      const stream = await this.mediaDevices.getUserMedia(constraints);
      this.stream = stream;
      this.state = "ACTIVE";
      return stream;
    } catch (err) {
      this.state = this.toErrorState(err);
      if (err instanceof CameraError) {
        throw err;
      }
      throw new CameraError(
        this.toErrorCode(err),
        err instanceof Error ? err.message : "Camera start failed",
      );
    }
  }

  stop(): void {
    this.stream?.getTracks().forEach((track) => track.stop());
    this.stream = null;
    this.state = "STOPPED";
  }

  async listDevices(): Promise<MediaDeviceInfo[]> {
    return this.mediaDevices.enumerateDevices();
  }

  private toErrorState(err: unknown): CameraState {
    const code = err instanceof CameraError ? err.code : this.toErrorCode(err);
    if (code === "PERMISSION_DENIED") {
      return "DENIED";
    }
    if (code === "NO_DEVICE" || code === "DEVICE_BUSY") {
      return "DEVICE_UNAVAILABLE";
    }
    return "ERROR";
  }

  private toErrorCode(err: unknown): CameraErrorCode {
    const name = err instanceof Error ? err.name : "";
    if (name === "NotAllowedError") {
      return "PERMISSION_DENIED";
    }
    if (name === "NotFoundError") {
      return "NO_DEVICE";
    }
    if (name === "NotReadableError") {
      return "DEVICE_BUSY";
    }
    if (name === "OverconstrainedError") {
      return "CONSTRAINT_UNSATISFIABLE";
    }
    return "UNKNOWN";
  }
}
