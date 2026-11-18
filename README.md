# AI Hairstyle Try-On

Live-camera virtual hairstyle try-on for the browser. Users see hairstyles rendered on their
own face in real time, compare styles, and download a snapshot. Processing is intended to stay
on-device.

**Status:** Phase 0 (documentation and research) — documentation system complete, **implementation not started**.
No application source code, dependencies, or deployment exist in this repository yet.

**Approval gates open:** product scope (TASK-013), architecture decisions (TASK-014), open product
questions (TASK-016). See [TASK_BOARD.md](docs/05-development/TASK_BOARD.md).

---

## Read this first

| If you want to... | Read |
|---|---|
| Understand the product | [Product Vision](docs/00-project-overview/product-vision.md), [PRD](docs/01-product/prd.md) |
| Understand what is in scope | [Product Scope](docs/01-product/product-scope.md), [MVP Specification](docs/01-product/mvp-specification.md) |
| See the current work queue | [TASK_BOARD.md](docs/05-development/TASK_BOARD.md) |
| Know the rules for AI agents | [AGENTS.md](AGENTS.md) |
| Know what is verified vs assumed | [Technical Stack Evaluation](docs/03-architecture/technical-stack-evaluation.md), [AI Research](docs/04-ai-research/ai-research.md) |
| Build it | [Environment Setup](docs/05-development/environment-setup.md), [Implementation Plan](docs/05-development/implementation-plan.md) |
| Test it | [Testing Strategy](docs/06-quality/testing-strategy.md), [Manual UAT](docs/06-quality/manual-uat.md) |
| Deploy it | [Deployment Guide](docs/08-operations/deployment-guide.md) |

## Documentation map

| # | Document | Path |
|---|---|---|
| 1 | Product Vision | `docs/00-project-overview/product-vision.md` |
| 2 | Product Scope | `docs/01-product/product-scope.md` |
| 3 | Project Overview | `docs/00-project-overview/project-overview.md` |
| 4 | PRD | `docs/01-product/prd.md` |
| 5 | MVP Specification | `docs/01-product/mvp-specification.md` |
| 6 | User Journey | `docs/01-product/user-journey.md` |
| 7 | User Stories | `docs/01-product/user-stories.md` |
| 8 | Acceptance Criteria | `docs/01-product/acceptance-criteria.md` |
| 9 | UI/UX Specification | `docs/02-design/ui-ux-specification.md` |
| 10 | Design System | `docs/02-design/design-system.md` |
| 11 | System Architecture | `docs/03-architecture/system-architecture.md` |
| 12 | Technical Stack Evaluation | `docs/03-architecture/technical-stack-evaluation.md` |
| 13 | Component Architecture | `docs/03-architecture/component-architecture.md` |
| 14 | Camera Pipeline | `docs/03-architecture/camera-pipeline.md` |
| 15 | Face Tracking Specification | `docs/03-architecture/face-tracking-specification.md` |
| 16 | Hairstyle Rendering Specification | `docs/03-architecture/hairstyle-rendering-specification.md` |
| 17 | Hairstyle Asset Specification | `docs/03-architecture/hairstyle-asset-specification.md` |
| 18 | AI Research | `docs/04-ai-research/ai-research.md` |
| 19 | Model Evaluation | `docs/04-ai-research/model-evaluation.md` |
| 20 | Benchmark Plan | `docs/04-ai-research/benchmark-plan.md` |
| 21 | Development Roadmap | `docs/05-development/development-roadmap.md` |
| 22 | Implementation Plan | `docs/05-development/implementation-plan.md` |
| 23 | Task Board | `docs/05-development/TASK_BOARD.md` |
| 24 | Coding Standards | `docs/05-development/coding-standards.md` |
| 25 | Definition of Done | `docs/05-development/definition-of-done.md` |
| 26 | Testing Strategy | `docs/06-quality/testing-strategy.md` |
| 27 | Test Cases | `docs/06-quality/test-cases.md` |
| 28 | Manual UAT | `docs/06-quality/manual-uat.md` |
| 29 | Privacy Policy Requirements | `docs/07-security/privacy-policy-requirements.md` |
| 30 | Security Requirements | `docs/07-security/security-requirements.md` |
| 31 | Deployment Guide | `docs/08-operations/deployment-guide.md` |
| 32 | Environment Setup | `docs/05-development/environment-setup.md` |
| 33 | Decision Log | `docs/09-project-history/decision-log.md` |
| 34 | Changelog | `docs/09-project-history/changelog.md` |
| 35 | Progress Report | `docs/09-project-history/progress-report.md` |
| — | ADR index (ADR-001…ADR-011) | `docs/03-architecture/adr/` |
| — | Original planning document (archive) | `docs/09-project-history/original-planning-document-v1.0.md` |

## Non-negotiables

1. Documentation precedes implementation.
2. No feature is DONE without evidence (tests, build, manual verification).
3. Camera frames never leave the device unless a separately approved feature says so.
4. Approved architectural decisions are not changed unilaterally by an agent.
