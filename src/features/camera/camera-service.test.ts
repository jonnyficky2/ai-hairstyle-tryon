import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CameraError, CameraService, type MediaDevicesLike } from "./camera-service";
import type { CameraErrorCode, CameraState } from "./camera-state";

// INITIALIZING, NO_FACE, MULTIPLE_FACES, TRACKING and TRACKING_LOST are produced by the
// tracking layer (TASK-041/045); CameraService has no transition targeting them.

function fakeStream(trackCount = 1) {
  const tracks = Array.from({ length: trackCount }, () => ({ stop: vi.fn() }));
  return { stream: { getTracks: () => tracks } as unknown as MediaStream, tracks };
}

function namedError(name: string): Error {
  const error = new Error(name);
  error.name = name;
  return error;
}

function makeService(
  getUserMedia: MediaDevicesLike["getUserMedia"],
  enumerateDevices: MediaDevicesLike["enumerateDevices"] = async () => [],
): CameraService {
  return new CameraService({ getUserMedia, enumerateDevices });
}

beforeEach(() => {
  vi.stubGlobal("navigator", { mediaDevices: {} });
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("CameraService state machine (TC-02…TC-06, AC-13, AC-15, AC-18)", () => {
  it("starts in IDLE", () => {
    expect(makeService(async () => fakeStream().stream).getState()).toBe("IDLE");
  });

  it("moves IDLE → REQUESTING → ACTIVE and returns the stream", async () => {
    const { stream } = fakeStream();
    let resolveStream: (stream: MediaStream) => void = () => {};
    const getUserMedia = vi.fn(
      () =>
        new Promise<MediaStream>((resolve) => {
          resolveStream = resolve;
        }),
    );
    const service = makeService(getUserMedia);

    const pending = service.start();
    expect(service.getState()).toBe("REQUESTING");
    resolveStream(stream);
    await expect(pending).resolves.toBe(stream);
    expect(service.getState()).toBe("ACTIVE");
  });

  it("reuses the active stream instead of reinitializing", async () => {
    const { stream } = fakeStream();
    const getUserMedia = vi.fn(async () => stream);
    const service = makeService(getUserMedia);

    await service.start();
    await expect(service.start()).resolves.toBe(stream);
    expect(getUserMedia).toHaveBeenCalledOnce();
    expect(service.getState()).toBe("ACTIVE");
  });

  it.each([
    ["NotAllowedError", "PERMISSION_DENIED", "DENIED"],
    ["NotFoundError", "NO_DEVICE", "DEVICE_UNAVAILABLE"],
    ["NotReadableError", "DEVICE_BUSY", "DEVICE_UNAVAILABLE"],
    ["OverconstrainedError", "CONSTRAINT_UNSATISFIABLE", "ERROR"],
    ["AbortError", "UNKNOWN", "ERROR"],
  ] as const)("maps %s to %s / %s", async (name, code: CameraErrorCode, state: CameraState) => {
    const service = makeService(async () => {
      throw namedError(name);
    });

    await expect(service.start()).rejects.toMatchObject({ code });
    expect(service.getState()).toBe(state);
  });

  it("maps an insecure context to INSECURE_CONTEXT / ERROR", async () => {
    vi.stubGlobal("navigator", {});
    const getUserMedia = vi.fn(async () => fakeStream().stream);
    const service = makeService(getUserMedia);

    await expect(service.start()).rejects.toMatchObject({ code: "INSECURE_CONTEXT" });
    expect(service.getState()).toBe("ERROR");
    expect(getUserMedia).not.toHaveBeenCalled();
  });

  it("preserves an injected CameraError and maps its state", async () => {
    const error = new CameraError("NO_DEVICE");
    const service = makeService(async () => {
      throw error;
    });

    await expect(service.start()).rejects.toBe(error);
    expect(service.getState()).toBe("DEVICE_UNAVAILABLE");
  });

  it("maps a non-Error rejection to UNKNOWN / ERROR with a fallback message", async () => {
    const service = makeService(async () => {
      throw "camera failed";
    });

    await expect(service.start()).rejects.toMatchObject({
      code: "UNKNOWN",
      message: "Camera start failed",
    });
    expect(service.getState()).toBe("ERROR");
  });

  it("stops every track and moves ACTIVE → STOPPED", async () => {
    const { stream, tracks } = fakeStream(2);
    const service = makeService(async () => stream);
    await service.start();

    service.stop();

    tracks.forEach((track) => expect(track.stop).toHaveBeenCalledOnce());
    expect(service.getState()).toBe("STOPPED");
  });

  it("stop() before start is a no-op transition to STOPPED", () => {
    const service = makeService(async () => fakeStream().stream);
    service.stop();
    expect(service.getState()).toBe("STOPPED");
  });

  it("allows a retry after a recoverable error", async () => {
    const { stream } = fakeStream();
    let attempts = 0;
    const service = makeService(async () => {
      attempts += 1;
      if (attempts === 1) throw namedError("NotAllowedError");
      return stream;
    });

    await expect(service.start()).rejects.toMatchObject({ code: "PERMISSION_DENIED" });
    expect(service.getState()).toBe("DENIED");
    await expect(service.start()).resolves.toBe(stream);
    expect(service.getState()).toBe("ACTIVE");
  });

  it("delegates device listing to the injected mediaDevices", async () => {
    const devices: MediaDeviceInfo[] = [];
    const enumerateDevices = vi.fn(async () => devices);
    const service = makeService(async () => fakeStream().stream, enumerateDevices);

    await expect(service.listDevices()).resolves.toBe(devices);
    expect(enumerateDevices).toHaveBeenCalledOnce();
  });

  it("uses navigator.mediaDevices when no interface is injected", async () => {
    const { stream } = fakeStream();
    const getUserMedia = vi.fn(async () => stream);
    const enumerateDevices = vi.fn(async () => [] as MediaDeviceInfo[]);
    vi.stubGlobal("navigator", { mediaDevices: { getUserMedia, enumerateDevices } });
    const service = new CameraService();

    await expect(service.start()).resolves.toBe(stream);
    await expect(service.listDevices()).resolves.toEqual([]);
    expect(getUserMedia).toHaveBeenCalledOnce();
    expect(enumerateDevices).toHaveBeenCalledOnce();
  });
});
