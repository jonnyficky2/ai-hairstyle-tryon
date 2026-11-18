# Changelog

All notable documentation and project changes. Application releases will be added here when they
exist. Format loosely follows Keep a Changelog.

## [Unreleased]

### Added
- Phase 1 scaffold: Vite 8.3.8, React 19.3.1, TypeScript 7.0.2 (strict), `.gitignore`.
- Tailwind 4.3.5 + `@tailwindcss/vite` 4.3.5 with design tokens in `src/styles/index.css`.
- `docs/07-security/privacy-notice-copy.md` — approved privacy and consent copy.
- TASK-085 (connect git remote) and TASK-086 (picomatch advisory tracking).

### Changed
- ADR-001…ADR-011 moved from PROPOSED to APPROVED (2026-11-18).
- PRD §7 replaced with resolved product decisions.
- Decision log P-001…P-010 resolved except asset sourcing and model licence.
- TASK-020 scope reduced to local repository init; remote split to TASK-085.
- Vite pin corrected from 8.3.6 to 8.3.8.
- Design system §7 and stack evaluation §7 record the confirmed Tailwind v4 mapping (D-021).

### Added (documentation baseline)
- Complete documentation system under `docs/00-project-overview` … `docs/09-project-history`.
- Product vision, scope, PRD, MVP specification, user journey, user stories, acceptance criteria.
- UI/UX specification and proposed design system.
- System, component, camera, face-tracking, rendering, and asset specifications.
- Technical stack evaluation with verified versions, licenses, and engine constraints.
- AI research, model evaluation, and benchmark plan.
- Architecture Decision Records ADR-001…ADR-011 (all PROPOSED).
- Task board with 69 tasks, milestones, dependencies, and evidence requirements.
- Development roadmap, implementation plan, coding standards, Definition of Done, environment setup.
- Testing strategy, test cases, and manual UAT plan.
- Privacy and security requirements.
- Deployment guide.
- Decision log, progress report, and documentation audit report.

### Changed
- Original planning document moved to `docs/09-project-history/original-planning-document-v1.0.md`
  and preserved unmodified. It is no longer the active PRD.

### Removed
- Nothing.

## [0.1.0-docs] — 2026-11-09

- Initial documentation baseline. No application code, dependencies, or deployment.

## Notes

- Versions verified on 2026-11-09 via npm registry and official documentation. Re-verify before
  implementation.
- No benchmark results exist yet.
