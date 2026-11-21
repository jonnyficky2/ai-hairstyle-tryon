import { expect, test } from "@playwright/test";

test("self-hosted assets are reachable from the origin", async ({ request }) => {
  const modelRes = await request.get("/models/face_landmarker.task");
  expect(modelRes.status()).toBe(200);
  const modelBuf = await modelRes.body();
  expect(modelBuf.byteLength).toBe(3758596);

  const wasmRes = await request.get("/wasm/vision_wasm_internal.wasm");
  expect(wasmRes.status()).toBe(200);
  const wasmBuf = await wasmRes.body();
  expect(wasmBuf.byteLength).toBeGreaterThan(1000000);
});
