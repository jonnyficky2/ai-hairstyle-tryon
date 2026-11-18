# ADR-010 — Deployment: Static HTTPS Hosting

**Status:** APPROVED (2026-11-18)
**Date:** 2026-11-09

## Context

The MVP is client-only (ADR-006) and requires a secure context for camera access.

## Problem statement

How should the application be built, hosted, and served?

## Options considered

1. Static HTTPS hosting (CDN or static host).
2. Containerized web server.
3. Serverless functions plus static assets.
4. Self-hosted VPS.

## Decision

Deploy the production build as static files over HTTPS.

## Rationale

- No server runtime is needed.
- HTTPS satisfies the camera secure-context requirement.
- CDN caching improves global load time for model/WASM.
- Lowest operational cost and attack surface.

## Trade-offs

- Cache invalidation must be managed explicitly.
- No server-side logic for future features without adding infrastructure.
- Correct MIME types and compression must be configured.

## Consequences

- Build output is a static directory.
- Long-lived caching for hashed assets; revalidation for `index.html`.
- Model/WASM files need explicit cache and compression settings.
- Security headers must be configured at the host/CDN.

## Verification requirements

- Production URL loads over HTTPS (TASK-081).
- Camera works in production (TASK-082).
- Cache headers verified (TASK-081).
- No development configuration leaks (TASK-081).
