# ADR-009 — Storage: localStorage for Preferences

**Status:** APPROVED (2026-11-18)
**Date:** 2026-11-09

## Context

The MVP needs to remember favorite hairstyles between visits. There is no account system.

## Problem statement

Where should non-sensitive user preferences be stored?

## Options considered

1. `localStorage`.
2. `sessionStorage`.
3. IndexedDB.
4. Cookies.
5. Server-side storage (requires accounts).

## Decision

Use `localStorage` for favorites and simple preferences only.

## Rationale

- Simple synchronous API.
- Persists across sessions on the same origin.
- No backend required.
- Adequate for a small list of IDs and flags.

## Trade-offs

- Synchronous; not for large data.
- Clearable by the user or browser.
- Not encrypted; unsuitable for sensitive data.
- Per-origin, so changing domains loses favorites.

## Consequences

- Only non-sensitive data may be stored: hairstyle IDs, overlay preferences, consent acknowledgement.
- Images, landmarks, and biometric data are never stored.
- Storage failures (quota, privacy mode) must be handled gracefully.
- A versioned key prefix is required to allow migration.

## Verification requirements

- Favorite persistence tested (TASK-065).
- No sensitive data in storage inspected during privacy review (TASK-076).
- Storage failure path tested (TASK-065).
