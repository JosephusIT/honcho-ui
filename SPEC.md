# Honcho UI — Design System Specification

> Open-source Web UI for Honcho. Self-hosted dashboard for AI memory and session management.
> Aesthetic reference: hermes.nousresearch.com (dark, elegant, minimal)
> Functionality reference: app.honcho.dev

---

## 1. Color Palette

### Core Colors (Dark Theme)

```css
:root {
  /* Backgrounds */
  --bg-base: #09090b;           /* Deepest black - page background */
  --bg-surface: #0f0f12;        /* Card/panel background */
  --bg-elevated: #16161a;       /* Modals, dropdowns, elevated surfaces */
  --bg-hover: #1c1c21;          /* Hover states */
  --bg-active: #222228;         /* Active/selected states */

  /* Borders */
  --border-subtle: #18181b;     /* Subtle dividers */
  --border-default: #27272a;    /* Default borders */
  --border-strong: #3f3f46;    /* Emphasized borders */

  /* Accent — Violet/Indigo (NousResearch-inspired) */
  --accent-primary: #8b5cf6;    /* Primary violet */
  --accent-primary-hover: #a78bfa;
  --accent-secondary: #6366f1;  /* Indigo fallback */
  --accent-glow: rgba(139, 92, 246, 0.15);

  /* Text */
  --text-primary: #fafafa;      /* Primary text - near white */
  --text-secondary: #a1a1aa;    /* Secondary text - zinc-400 */
  --text-muted: #71717a;       /* Muted text - zinc-500 */
  --text-disabled: #52525b;    /* Disabled text */

  /* Semantic */
  --color-success: #22c55e;     /* Green-500 */
  --color-success-bg: rgba(34, 197, 94, 0.1);
  --color-warning: #f59e0b;    /* Amber-500 */
  --color-warning-bg: rgba(245, 158, 11, 0.1);
  --color-error: #ef4444;      /* Red-500 */
  --color-error-bg: rgba(239, 68, 68, 0.1);
  --color-info: #3b82f6;        /* Blue-500 */
  --color-info-bg: rgba(59, 130, 246, 0.1);

  /* Status */
  --status-online: #22c55e;
  --status-away: #f59e0b;
  --status-offline: #71717a;
}
```

### Gradient Accents

```css
--gradient-accent: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
--gradient-glow: radial-gradient(ellipse at center, rgba(139, 92, 246, 0.2) 0%, transparent 70%);
```

---

## 2. Typography

### Font Stack

```css
/* Primary — Inter (clean, modern, highly legible) */
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Monospace — JetBrains Mono (code, technical data) */
--font-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
```

### Type Scale

| Token | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| `--text-xs` | 11px | 400 | 16px | Badges, captions |
| `--text-sm` | 13px | 400 | 20px | Secondary text, metadata |
| `--text-base` | 15px | 400 | 24px | Body text |
| `--text-lg` | 17px | 500 | 28px | Subheadings |
| `--text-xl` | 20px | 600 | 28px | Section titles |
| `--text-2xl` | 24px | 700 | 32px | Page headings |
| `--text-3xl` | 30px | 700 | 36px | Hero text |
| `--text-4xl` | 36px | 800 | 40px | Display |

### Font Weights

```css
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
```

---

## 3. Spacing & Layout

### Spacing Scale (4px base)

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 4px | Tight gaps |
| `--space-2` | 8px | Icon-to-text, compact lists |
| `--space-3` | 12px | Default gaps |
| `--space-4` | 16px | Card padding, section gaps |
| `--space-5` | 20px | Larger sections |
| `--space-6` | 24px | Page padding |
| `--space-8` | 32px | Section separators |
| `--space-10` | 40px | Major sections |
| `--space-12` | 48px | Hero spacing |
| `--space-16` | 64px | Page margins |

### Layout Constants

```css
/* Sidebar */
--sidebar-width: 260px;
--sidebar-collapsed-width: 64px;

/* Header */
--header-height: 56px;

/* Content */
--content-max-width: 1200px;
--content-padding: 24px;

/* Card */
--card-padding: 20px;
--card-radius: 12px;
```

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 4px | Badges, small elements |
| `--radius-md` | 8px | Buttons, inputs |
| `--radius-lg` | 12px | Cards |
| `--radius-xl` | 16px | Modals, large panels |
| `--radius-full` | 9999px | Pills, avatars |

---

## 4. Component Library

### Button

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  transition: all 150ms ease;
  cursor: pointer;
  border: none;
  outline: none;
}

.btn-primary {
  background: var(--accent-primary);
  color: white;
}
.btn-primary:hover {
  background: var(--accent-primary-hover);
  box-shadow: 0 0 20px var(--accent-glow);
}

.btn-secondary {
  background: var(--bg-elevated);
  color: var(--text-primary);
  border: 1px solid var(--border-default);
}
.btn-secondary:hover {
  background: var(--bg-hover);
  border-color: var(--border-strong);
}

.btn-ghost {
  background: transparent;
  color: var(--text-secondary);
}
.btn-ghost:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}

.btn-danger {
  background: var(--color-error);
  color: white;
}
.btn-danger:hover {
  background: #dc2626;
}

.btn-sm {
  padding: var(--space-1) var(--space-3);
  font-size: var(--text-xs);
}

.btn-lg {
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-base);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

### Card

```css
.card {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: var(--card-padding);
  transition: border-color 200ms ease;
}

.card:hover {
  border-color: var(--border-default);
}

.card-elevated {
  background: var(--bg-elevated);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
}

.card-interactive {
  cursor: pointer;
}
.card-interactive:hover {
  border-color: var(--accent-primary);
}
```

### Input

```css
.input {
  width: 100%;
  padding: var(--space-2) var(--space-3);
  background: var(--bg-base);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: var(--text-sm);
  transition: all 150ms ease;
}

.input:focus {
  outline: none;
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px var(--accent-glow);
}

.input::placeholder {
  color: var(--text-muted);
}

.input-error {
  border-color: var(--color-error);
}
```

### Badge

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: 2px var(--space-2);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
}

.badge-default {
  background: var(--bg-elevated);
  color: var(--text-secondary);
}

.badge-success {
  background: var(--color-success-bg);
  color: var(--color-success);
}

.badge-warning {
  background: var(--color-warning-bg);
  color: var(--color-warning);
}

.badge-error {
  background: var(--color-error-bg);
  color: var(--color-error);
}

.badge-info {
  background: var(--color-info-bg);
  color: var(--color-info);
}

.badge-accent {
  background: var(--accent-glow);
  color: var(--accent-primary);
}
```

### Modal / Dialog

```css
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  animation: fadeIn 150ms ease;
}

.modal {
  background: var(--bg-elevated);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  max-width: 480px;
  width: 90%;
  max-height: 85vh;
  overflow-y: auto;
  animation: slideUp 200ms ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
```

### Sidebar Navigation

```css
.sidebar {
  width: var(--sidebar-width);
  height: 100vh;
  background: var(--bg-surface);
  border-right: 1px solid var(--border-subtle);
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
}

.sidebar-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  color: var(--text-secondary);
  font-size: var(--text-sm);
  transition: all 150ms ease;
  cursor: pointer;
}

.sidebar-item:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}

.sidebar-item-active {
  background: var(--accent-glow);
  color: var(--accent-primary);
  border-right: 2px solid var(--accent-primary);
}

.sidebar-section-title {
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: var(--space-4) var(--space-4) var(--space-2);
}
```

### Header Bar

```css
.header {
  height: var(--header-height);
  background: var(--bg-surface);
  border-bottom: 1px solid var(--border-subtle);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-6);
  position: fixed;
  top: 0;
  left: var(--sidebar-width);
  right: 0;
  z-index: 40;
}

.header-title {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}
```

### Skeleton / Loading

```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--bg-surface) 0%,
    var(--bg-elevated) 50%,
    var(--bg-surface) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: var(--radius-md);
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.skeleton-text {
  height: 14px;
  margin-bottom: var(--space-2);
}

.skeleton-title {
  height: 20px;
  width: 60%;
  margin-bottom: var(--space-3);
}

.skeleton-avatar {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
}
```

---

## 5. Motion & Animation

### Durations

```css
--duration-fast: 150ms;    /* Hover, focus */
--duration-normal: 250ms;   /* Transitions, reveals */
--duration-slow: 400ms;     /* Page transitions, modals */
--duration-slower: 600ms;   /* Large animations */
```

### Easing

```css
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);      /* Exits, reveals */
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);  /* State changes */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* Bouncy, playful */
```

### Common Animations

```css
/* Hover lift */
.hover-lift {
  transition: transform var(--duration-fast) var(--ease-out),
              box-shadow var(--duration-fast) var(--ease-out);
}
.hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

/* Fade in */
.fade-in {
  animation: fadeIn var(--duration-normal) var(--ease-out);
}

/* Slide in from right */
.slide-in-right {
  animation: slideInRight var(--duration-normal) var(--ease-out);
}

@keyframes slideInRight {
  from { transform: translateX(20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

/* Scale in */
.scale-in {
  animation: scaleIn var(--duration-normal) var(--ease-spring);
}

@keyframes scaleIn {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
```

---

## 6. Responsive Breakpoints

```css
/* Mobile: < 640px */
@media (max-width: 639px) {
  :root {
    --sidebar-width: 0px;
    --content-padding: 16px;
  }

  .sidebar {
    transform: translateX(-100%);
    transition: transform var(--duration-normal) var(--ease-out);
  }

  .sidebar-open {
    transform: translateX(0);
  }
}

/* Tablet: 640px - 1024px */
@media (min-width: 640px) and (max-width: 1023px) {
  :root {
    --sidebar-width: 200px;
  }
}

/* Desktop: > 1024px */
@media (min-width: 1024px) {
  :root {
    --sidebar-width: 260px;
    --content-max-width: 1200px;
  }
}
```

---

## 7. Icons

**Library**: Lucide React (MIT, tree-shakeable, consistent stroke width)

```bash
npm install lucide-react
```

Usage:
```tsx
import { Home, Search, Users, Settings, ChevronRight } from 'lucide-react';
```

Common icons needed:
- `Home` — Dashboard overview
- `Search` — Search page
- `Users` — Peers page
- `MessageSquare` — Sessions
- `Settings` — Settings
- `ChevronRight` — Navigation arrows
- `ChevronDown` — Expand/collapse
- `Plus` — Add new
- `RefreshCw` — Sync/refresh
- `Zap` — Status/activity
- `Clock` — Timestamps
- `Hash` — IDs/tokens
- ` Globe` — API status

---

## 8. API Integration

### Configuration

```typescript
// Environment / localStorage
HONCHO_API_URL=http://honcho.bouba.ar  // default
HONCHO_WORKSPACE=hermes               // default
HONCHO_API_TOKEN=<user's token>        // from settings
```

### Key Endpoints (from Honcho API)

```
GET  /api/v1/workspaces/<workspace>/stats
GET  /api/v1/workspaces/<workspace>/sessions
GET  /api/v1/workspaces/<workspace>/sessions/<id>
GET  /api/v1/workspaces/<workspace>/sessions/<id>/messages
GET  /api/v1/workspaces/<workspace>/peers
GET  /api/v1/workspaces/<workspace>/peers/<id>
GET  /api/v1/workspaces/<workspace>/peers/<id>/representations
GET  /api/v1/workspaces/<workspace>/search?q=<query>
POST /api/v1/workspaces/<workspace>/dialectic
```

### Data Flow

```
User Input → React Component → fetch() → Honcho API → localStorage (cache)
                                          ↓
                                    Optimistic UI → Error handling
```

---

## 9. File Structure

```
honcho-ui/
├── SPEC.md                    # This file
├── README.md
├── package.json
├── vite.config.ts
├── tsconfig.json
├── index.html
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css              # Global styles + CSS variables
│   ├── lib/
│   │   ├── api.ts             # Honcho API client
│   │   └── utils.ts
│   ├── components/
│   │   ├── ui/                # Base components (Button, Card, Input, Badge, Modal)
│   │   ├── layout/            # Sidebar, Header, PageLayout
│   │   └── features/          # Feature-specific components
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── Sessions.tsx
│   │   ├── SessionDetail.tsx
│   │   ├── Peers.tsx
│   │   ├── PeerDetail.tsx
│   │   ├── Search.tsx
│   │   └── Settings.tsx
│   └── types/
│       └── index.ts           # TypeScript interfaces
└── public/
    └── favicon.svg
```

---

## 10. Technical Stack

- **Framework**: React 18 + TypeScript
- **Build**: Vite 5
- **Routing**: React Router v6 (HashRouter for static hosting)
- **Icons**: Lucide React
- **Styling**: Plain CSS with CSS variables (no Tailwind, no CSS-in-JS)
- **State**: React useState/useContext (no Redux needed for UI-only)
- **HTTP**: Native fetch (no axios needed)
- **Deployment**: Static files (can host on any CDN)

---

*Last updated: 2026-05-26*
*Version: 1.0.0*