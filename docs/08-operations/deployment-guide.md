# Deployment Guide

> Status: PROPOSED — not executed · Last updated: 2026-11-09
> Related: ADR-010, ADR-011, TASK-080…TASK-084.

## 1. Target

Static files over HTTPS. No application server, no database, no API.

```
/                     index.html + hashed JS/CSS
/models/              face_landmarker.task
/wasm/                MediaPipe runtime files
/assets/hairstyles/   PNG assets, thumbnails, catalog.json
```

## 2. Build

```bash
npm ci
npm run typecheck
npm run lint
npm run test
npm run build
```

Output: a static directory (default `dist/`). The build must be reproducible and must not include
source maps or development flags.

## 3. Hosting configuration

| Item | Requirement |
|---|---|
| HTTPS | Enforced; HTTP redirects to HTTPS |
| HSTS | Enabled after verifying HTTPS |
| MIME `.wasm` | `application/wasm` |
| MIME `.task` | `application/octet-stream` |
| Compression | Brotli/gzip for text; model file may be pre-compressed |
| Cache: hashed assets | `public, max-age=31536000, immutable` |
| Cache: `index.html` | `no-cache` |
| Cache: model/WASM | Long-lived with a versioned path |
| Security headers | Per `docs/07-security/security-requirements.md` |

## 4. Deploy steps

1. Build from a clean checkout at the release commit.
2. Verify the output contains model and WASM files.
3. Upload to the static host.
4. Invalidate the CDN cache for `index.html`.
5. Confirm HTTPS and headers with `curl -I`.
6. Run the production smoke test (below).
7. Tag the release.

## 5. Production smoke test

| Check | Expected |
|---|---|
| Page loads over HTTPS | 200, no mixed content |
| Camera permission prompt | Appears only after consent action |
| Video preview | Visible within 5 s |
| Face detection | Enters tracked state |
| Overlay | Aligned on a frontal face |
| Style switch | Updates without camera restart |
| Snapshot | Produces a correct image |
| Download | Saves a PNG |
| Stop | Camera indicator off |
| Network | No third-party or image-upload requests |
| Console | No errors |

Record device, browser, build hash, and evidence.

## 6. Rollback

- Keep the previous build available.
- Roll back by redeploying the previous artifact and invalidating `index.html`.
- Do not roll back the model/WASM paths unless the app version expects them.
- Record the incident and cause.

## 7. Environment variables

None required for the MVP. If introduced:

- Set them at build time only.
- Never expose secrets to the client.
- Document each variable in `environment-setup.md`.

## 8. Monitoring (MVP)

- No analytics by default.
- Optional: uptime check on the static URL (no user data).
- Error reporting requires an ADR and privacy review.

## 9. Release checklist

- [ ] All release-level DoD items satisfied.
- [ ] Manual UAT signed off.
- [ ] Privacy verification signed off.
- [ ] Security headers verified.
- [ ] Production smoke test passed.
- [ ] Changelog and README updated.
- [ ] Known limitations documented.
- [ ] Rollback artifact available.

## 10. Current status

Not deployed. No build exists.
