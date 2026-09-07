# Design: Ledger

Named for its defining trait: every template reads like a page torn from a corporate ledger —
a letterhead masthead, a metadata strip, and a fully gridded record table — favoring
typographic discipline and structure over Spectrum's color-gradient/badge language. Built as
the repo's explicit second design, sibling to `Spectrum/`, with the same 11 module folders and
identical statuses/content/cast/example IDs — only the visual design and markup structure
differ. Lives in `Ledger/` at the repo root; never touches or references `Spectrum/`.

Shared repo-wide conventions (site hosting, top-level structure, the recurring cast of example
data, outstanding requests) live in the root `CLAUDE.md` — read that first if you haven't. This
file covers only what's specific to `Ledger/`.

### Template inventory (60 files across 11 module folders)

Same coverage as Spectrum, module-for-module and status-for-status (see `Spectrum/CLAUDE.md`'s
inventory for the full breakdown) — Ledger has no Employee-module "welcome" gap the way
Spectrum's notes don't call one out, since it mirrors Spectrum's actual file list exactly, file
for file.

### Ledger design system (apply to every new/edited template inside `Ledger/`)

**Structure.** Single `<div>` root, no `<html>`/`<head>`/`<body>`/`<style>` — inline styles only,
everything laid out via nested `<table role="presentation">`. Never CSS flex/grid. Fonts are
`'Segoe UI',Tahoma,Arial,sans-serif` only, plus `Consolas,'Courier New',monospace` for the
masthead date and the REF value — no Google Fonts, no `<link>`, no web fonts, ever.

**One layout, used everywhere** (unlike Spectrum's two interchangeable layouts): page background
`#eef0f3`; card `620px` wide, `background-color:#ffffff; border:1px solid #d1d5db;
border-radius:16px; overflow:hidden` — no sharp 90-degree corners anywhere in the design.

1. **Letterhead masthead** — 34px logo on a `#1a2233` rounded chip (`border-radius:10px`),
   "TjDeeD Technology" / "IT Service Management" lockup beside it, a right-aligned monospace
   date, then a `1px solid #1a2233` rule.
2. **Meta strip** — `background-color:#f8f9fb` with a bottom border, three cells split by
   vertical rules: `MODULE <name>` | `STATUS <dot> <label>` | right-aligned `REF <ID>`. The dot
   is an 8px `border-radius:50%` span in the status's semantic color (see table below).
3. **Heading** — a 3px vertical accent bar beside a bold 22px left-aligned heading.
4. **Subtext** paragraph in `#4b5563`.
5. **Record table** — `border:1px solid #d1d5db; border-radius:12px; overflow:hidden`, a
   `#f8f9fb` caption row (e.g. "Ticket Record", "Request Record", "Asset Record", "Article
   Record", "Approval Record", "Task Record", "Problem Record", "Maintenance Record"), then one
   row per field: label cell (38% width, `border-right`, 12px/700/`#6b7280`) + value cell
   (13px/`#1a2233`). Last row has no `border-bottom`.
6. **CTA row** — solid accent button `border-radius:8px`, plus an optional secondary underlined
   text link carried over from Spectrum's helper link where the source has one.
7. Language divider → mirrored Arabic repeat of 3–6 (`dir="rtl"`, `text-align:right`, borders
   flipped to `border-left`) → identical footer.

**Optional components**, used only where the Spectrum source has an equivalent:
- **Segmented progress bar** replaces Spectrum's circle-and-connector stepper (Service Request)
  and its escalation tier tracker: one row of equal-width 6px-tall `border-radius:3px` segments
  with 4px gaps, completed/current segments filled in the accent color, upcoming ones `#e5e7eb`,
  small uppercase 10px labels underneath. Never circles, checkmark bubbles, or connector lines.
- **Callout row** for SLA warnings, breach notices, or deadlines: full-width cell with a light
  tint (`#fef2f2` red, `#fffbeb` amber, `#f0fdf4` green, `#eff6ff` blue), matching light border,
  `border-radius:10px`, bold accent-colored label + body text.
- **Approve / Reject dual buttons** (Approval → approver view only): two solid buttons side by
  side, `#166534` and `#b91c1c`, same 8px radius.

**Bilingual EN/AR, footer, logo, and Ivanti `$(If ...)` placeholder syntax rules are identical
to Spectrum** (see `Spectrum/CLAUDE.md`) — only the inner `<span>` styling on priority/status
tags changes to Ledger's tag look: `background-color:<semantic hex>; color:#fff;
border-radius:6px; padding:3px 9px; font-weight:700; font-size:11px;`.

### Ledger color system

**Module accents** (heading bar, CTA button, bottom copyright link, "new/active" status dot):

| Module | Accent |
|---|---|
| Incident | `#1e3a5f` |
| Service Request | `#0f766e` |
| Approval | `#b45309` |
| Task Management | `#155e75` |
| Asset Management | `#1d4ed8` |
| Knowledge Management | `#15803d` |
| Problem Management | `#7c2d92` |
| Maintenance Operations | `#92400e` |
| Feedback | `#be185d` |
| Employee | `#3730a3` |
| Escalation L1 / L2 / L3 / SLA Breach | `#b45309` / `#c2410c` / `#b91c1c` / `#450a0a` |

**Status semantics** (meta-strip dot, and any status tag) — these override the module accent for
the dot when the template is about a lifecycle outcome:

| Meaning | Hex |
|---|---|
| Positive — resolved, fulfilled, completed, approved, published, returned, closed-successful | `#166534` |
| Negative — rejected, cancelled, breached, low satisfaction | `#b91c1c` |
| Waiting / pending / reminder / due / timed-out / audit required / warranty expiring | `#b45309` |
| Neutral — on hold, closed, retired, terminal | `#64748b` |
| Reopened / overdue | `#c2410c` |
| New / created / assigned / in progress | the module's own accent |

**Reassignment override:** any template whose subject is a reassignment (owner or team) uses
`#6d28d9` as its accent instead of the module accent (status dot too), the same way Spectrum
uses a distinct shade for reassignment.

**Fixed neutrals:** page `#eef0f3` · card `#ffffff` · borders `#d1d5db` · strip/caption fill
`#f8f9fb` · heading ink `#1a2233` · body ink `#4b5563` · label ink `#6b7280` · muted `#9aa1ad` ·
footer faint `#c3c8d1`.
