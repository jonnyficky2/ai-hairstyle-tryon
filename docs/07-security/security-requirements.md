# Security Requirements

> Status: PROPOSED · Last updated: 2026-11-09
> Verification: TASK-076 (privacy), TASK-077 (security review).

## 1. Threat model (MVP)

| Threat | Impact | Mitigation |
|---|---|---|
| Camera stream leaks to a third party | Severe privacy breach | No upload code path; self-hosted runtime; CSP connect-src |
| Malicious/compromised dependency | Code execution in the page | Pinned versions, lockfile, review, no `@latest` |
| XSS via catalog or stored data | Data theft, UI spoofing | Validate/escape data; React escaping; no `dangerouslySetInnerHTML` |
| Clickjacking | Tricked camera consent | `frame-ancestors 'none'` |
| Insecure context | Camera API unavailable; downgrade | HTTPS only, HSTS |
| Model/WASM tampering | Arbitrary code execution | Serve from own origin; pinned files; integrity of build |
| Snapshot exfiltration | Private image disclosure | Local-only blob and download; no network |
| Over-permissive camera | Capture beyond need | Video only, no audio, stop on exit |
| Shoulder surfing of snapshots | Privacy | User-initiated capture; no auto-save |

## 2. Required headers (proposed)

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'wasm-unsafe-eval';
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data:;
  media-src 'self' blob:;
  connect-src 'self';
  worker-src 'self' blob:;
  object-src 'none';
  base-uri 'none';
  frame-ancestors 'none';

Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
Referrer-Policy: no-referrer
Permissions-Policy: camera=(self), microphone=()
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-origin
```

Notes:
- `wasm-unsafe-eval` may be required for WebAssembly; verify the exact minimum during TASK-077.
- `style-src 'unsafe-inline'` may be avoidable depending on the styling setup; tighten if possible.
- `connect-src 'self'` enforces the no-upload rule at the browser level.
- Do not add third-party analytics or fonts without an ADR and privacy review.

## 3. Camera permissions

- `Permissions-Policy: camera=(self)`; no cross-origin iframes.
- Request only video, never audio.
- Stop tracks on stop, route change, and unmount.
- Handle permission denial without retry loops.

## 4. Dependency and supply chain

- Pin exact versions; commit the lockfile.
- No `@latest` URLs.
- Review new dependencies for license, size, and maintenance.
- Prefer packages with reproducible builds.
- Record the model bundle source and checksum in the repository.

## 5. Build and deployment

- No secrets in the client bundle.
- No source maps in production unless explicitly approved.
- Remove development flags and debug overlays from production builds.
- Static output only; no server-side secrets.
- Verify no `.env` or internal config is served.

## 6. Storage

- `localStorage` holds only favorites, preferences, and consent acknowledgement.
- Version keys with a prefix; validate parsed values.
- Never store frames, landmarks, snapshots, or any biometric data.

## 7. Logging

- Local debug logging is allowed behind a development flag.
- No remote logging of image data, landmarks, or personal data.
- Error reporting, if added later, must scrub sensitive fields and require an ADR.

## 8. Verification checklist

- [ ] HTTPS enforced.
- [ ] CSP present and effective.
- [ ] No third-party network requests in a normal session.
- [ ] `connect-src` blocks unintended uploads.
- [ ] Permissions policy set.
- [ ] Dependency versions pinned; lockfile committed.
- [ ] No secrets or dev config in the production bundle.
- [ ] Camera tracks stop correctly.
- [ ] `localStorage` contains only allowed keys.
- [ ] No face recognition or biometric template code.

## 9. Open security questions

- Exact CSP required by the MediaPipe WASM runtime.
- Whether the host injects headers or requires a configuration file.
- Subresource integrity strategy for self-hosted runtime files.
- Legal retention obligations for host logs.
