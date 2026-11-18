# Environment Setup

> Status: PROPOSED — not executed · Last updated: 2026-11-09
> No dependencies are installed and no application exists yet. This is the planned setup.

## 1. Prerequisites

| Tool | Requirement | Reason |
|---|---|---|
| Node.js | 22.12 or newer | Vite 8 requires `^20.19.0 \|\| >=22.12.0`; Vitest 5 requires `^22.12.0 \|\| ^24.0.0 \|\| >=26.0.0` |
| npm | Bundled with Node | Package management |
| Git | Current stable | Version control |
| Browser | Chrome, Edge, Safari, Firefox (current) | Camera + WebAssembly |
| Device | Webcam + microphone not required | Video only |

Node baseline verified from npm registry metadata on 2026-11-09.

## 2. Planned commands

These commands do not work yet; they describe the intended project.

```bash
# install
npm install

# development (https not required; localhost is a secure context)
npm run dev

# quality
npm run typecheck
npm run lint
npm run format:check
npm run test
npm run test:e2e

# production
npm run build
npm run preview
```

## 3. Local camera requirements

- Use `http://localhost:5173` (localhost is treated as a secure context). If 5173 is taken, Vite
  picks the next free port; check the terminal output.
- Do not test camera access over a plain-HTTP LAN IP; it will fail.
- Grant camera permission when prompted; verify the browser camera indicator.
- For remote-device testing, use HTTPS (tunnel or preview deployment).

## 4. Static assets (planned)

| Path | Contents |
|---|---|
| `public/models/face_landmarker.task` | Face Landmarker model bundle (~3.6 MB) |
| `public/wasm/` | MediaPipe runtime files copied from the installed package |
| `public/assets/hairstyles/` | PNG assets and `catalog.json` |
| `public/assets/hairstyles/thumbs/` | Thumbnails |

Exact copy procedure is defined in TASK-040. Do not fetch runtime assets from a CDN in production
(ADR-011).

## 5. Environment variables

No secrets are required for the MVP. If any are introduced:

- Use `.env.local` for local values; never commit it.
- Expose only `VITE_`-prefixed variables to the client.
- Never put an API key in client code.

## 6. Troubleshooting

| Symptom | Likely cause | Action |
|---|---|---|
| `navigator.mediaDevices` undefined | Insecure context | Use HTTPS or localhost |
| `NotAllowedError` | Permission denied | Reset site permission and retry |
| `NotFoundError` | No camera | Connect a camera or use another device |
| `NotReadableError` | Camera busy | Close other apps using the camera |
| WASM fails to load | Wrong MIME/path | Check `application/wasm` and the asset path |
| Model 404 | Asset not copied | Verify `public/models/face_landmarker.task` |
| Low FPS | Device/thermal | Check benchmark notes; try CPU/GPU delegate |

## 7. Browser testing notes

- Test camera on real hardware; emulation does not prove tracking quality.
- Playwright can use a fake media stream for flow tests, not for visual acceptance.
- iOS Safari requires a real device for reliable results.

## 8. Repository state

At the time of writing (2026-11-18):

- Git is initialized locally; no remote yet (TASK-085).
- `package.json` exists with pinned versions; `node_modules` is ignored.
- Scaffold only: `index.html`, `src/main.tsx`, `src/App.tsx`, `vite.config.ts`, `tsconfig.json`.
- No camera, tracking, rendering, or UI feature code exists.
- No test runner, linter, or CSS framework is configured yet (TASK-022, TASK-023, TASK-024).
