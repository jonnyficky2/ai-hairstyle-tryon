# Design System

> Status: PROPOSED · Last updated: 2026-11-09
> Tokens below are proposals, not approved brand assets. Implementation task: TASK-022.

## 1. Principles

- Neutral, calm surfaces so the camera image carries the color.
- One accent color used sparingly for primary actions and selected states.
- Typography optimized for readability over style.
- Tokens are the only place raw values are defined.

## 2. Color tokens (proposed)

| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#0B0D10` | App background |
| `--color-surface` | `#14171C` | Panels, cards |
| `--color-surface-raised` | `#1C2027` | Hover, selected surface |
| `--color-border` | `#2A2F38` | Dividers, outlines |
| `--color-text` | `#F2F4F7` | Primary text |
| `--color-text-muted` | `#A0A8B4` | Secondary text |
| `--color-accent` | `#7C9CFF` | Primary action, selected |
| `--color-accent-contrast` | `#0B0D10` | Text on accent |
| `--color-success` | `#3DDC97` | Success state |
| `--color-warning` | `#F5B544` | Warning state |
| `--color-danger` | `#FF6B6B` | Error state |

Contrast must be validated during implementation; values above are starting points.

## 3. Typography (proposed)

| Token | Value | Use |
|---|---|---|
| `--font-sans` | `Inter, system-ui, sans-serif` | All UI text |
| `--text-xs` | 12 px / 16 px | Captions, metadata |
| `--text-sm` | 14 px / 20 px | Secondary UI |
| `--text-base` | 16 px / 24 px | Body |
| `--text-lg` | 20 px / 28 px | Section titles |
| `--text-xl` | 28 px / 36 px | Screen titles |
| `--text-2xl` | 40 px / 48 px | Landing headline |

## 4. Spacing, radius, elevation

| Token | Value |
|---|---|
| `--space-1` … `--space-8` | 4, 8, 12, 16, 24, 32, 48, 64 px |
| `--radius-sm` | 6 px |
| `--radius-md` | 12 px |
| `--radius-lg` | 20 px |
| `--radius-full` | 9999 px |
| `--shadow-panel` | `0 8px 32px rgb(0 0 0 / 0.35)` |

## 5. Motion

| Token | Value | Use |
|---|---|---|
| `--duration-fast` | 120 ms | Hover, toggle |
| `--duration-base` | 200 ms | Panel open/close |
| `--ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` | Default |

Reduced-motion mode removes non-essential transitions.

## 6. Components

| Component | States |
|---|---|
| Button (primary, secondary, ghost, danger) | default, hover, focus, active, disabled, loading |
| Icon button | default, hover, focus, pressed, disabled |
| Category chip | default, hover, focus, selected |
| Hairstyle card | default, hover, focus, selected, favorite, loading, error |
| Slider / stepper | default, focus, disabled, value-visible |
| Toggle switch | off, on, focus, disabled |
| Toast / inline alert | info, success, warning, error |
| Modal / sheet | open, closing, focus-trapped |
| Spinner / skeleton | active, reduced-motion |
| Camera state panel | per state in UI/UX §5 |

## 7. Tailwind mapping

- Tokens are defined as CSS custom properties and exposed to Tailwind theme variables.
- Components use token classes, not raw hex values.
- Tailwind v4 CSS-first configuration is the proposed default; confirm during TASK-022.
- No component library is adopted in the MVP unless a later ADR approves it.

## 8. Iconography

- Single outline icon set, consistent stroke width.
- Icons never replace a text label for primary actions.
- Camera, privacy, download, favorite, close, retry are the minimum set.

## 9. Open items

- Final brand palette and logo: not defined.
- Font licensing and loading strategy: not decided.
- Dark-only vs light theme: dark proposed for MVP.
