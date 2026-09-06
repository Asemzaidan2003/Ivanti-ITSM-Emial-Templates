# Ivanti ITSM Email Notification Templates

This project is a library of HTML email notification templates for an Ivanti Neurons for ITSM
deployment (customer TjDeeD Technology). Read this file before creating, editing, or reviewing
any template here — it captures the established design system so it doesn't need to be
re-derived from scratch (and so we don't re-read dozens of files just to learn the conventions).

## Repo hosting: public GitHub repo + GitHub Pages live previews

This is pushed to `https://github.com/Asemzaidan2003/Ivanti-ITSM-Emial-Templates` and is
**public** (deliberately switched from private, with the user's explicit sign-off) specifically
so GitHub Pages could be enabled — GitHub's Free plan does not support Pages on private repos at
all, there is no private-Pages option outside paid plans. Pages is enabled serving `main`
branch, root path, at `https://asemzaidan2003.github.io/Ivanti-ITSM-Emial-Templates/`.

The Pages entry point is a **real multi-page portfolio site** (owner: Asem Zaidan) — every
section is its own directory with its own `index.html`, not one file doing client-side routing.
This was deliberately rebuilt this way (moving off an earlier single-file `browse/spectrum.html`
JS-driven browser) per explicit direction to treat it as a real product with a real directory
structure, not "just one index file". Site pages, separate from the templates themselves:

- **`index.html`** (root) — the homepage: nav bar, hero, and a gallery of design cards. Each
  card embeds a live scaled-down iframe preview of one representative template from that design
  (see the `.thumb` CSS technique in `assets/site.css` — a fixed-size iframe,
  `transform: scale()`, `overflow: hidden`) and links to `designs/<slug>/index.html`.
- **`designs/index.html`** — the full designs gallery as its own dedicated page (same card
  pattern as the homepage's teaser section).
- **`designs/<design-slug>/index.html`** (e.g. `designs/spectrum/index.html`) — that design's
  overview: color-swatch legend, and a grid of its module cards (same `.design-card` component,
  reused), each linking to `designs/<design-slug>/<module-slug>/index.html`.
- **`designs/<design-slug>/<module-slug>/index.html`** — one real static page per module (e.g.
  `designs/spectrum/incident/index.html`), listing every template in that module as a card
  (thumbnail iframe preview + one-line description + an "Open Template ↗" link straight to the
  real file under `Spectrum/<Module>/`, opened in a new tab). **No JS data arrays** — every
  template card is hand-written HTML in its module's page, so the page's content is real markup
  on disk, not something assembled at runtime.
- **`docs/index.html`** — how to bring these templates into a real Ivanti environment (paste
  instructions, the `$(If...)` syntax, bilingual structure, repo layout).
- **`about/index.html`** — about the project and Asem Zaidan as author/owner.
- **`assets/site.css` / `assets/site.js`** — shared styling and behavior (nav toggle, scroll
  reveal, `.design-card`/`.thumb`/`.page-head`/`.prose` components) for every page above. Not
  used by anything under `Spectrum/` — that folder must stay pure Ivanti-pasteable template
  content, no site chrome.

**Whenever a template is added, removed, or renamed in `Spectrum/`, update the matching
module's page at `designs/spectrum/<module-slug>/index.html`** by hand (add/remove/edit its
card) — and update that module's template count badge on `designs/spectrum/index.html` and in
`README.md`/`CLAUDE.md` too. There is no shared data source to keep in sync automatically by
design; each page's content must be edited directly. If a new design folder is added at the repo
root, it needs the same shape as `designs/spectrum/`: an overview page, one page per module, and
a new (non-"coming soon") card added to both `index.html`'s and `designs/index.html`'s grids.

## Top-level structure: this repo holds multiple *designs*

The root directory is a container for **designs**, not templates directly. Each design is its
own folder (e.g. `Spectrum/`) containing the full, identical set of module folders and template
files — same statuses, same content, same modules covered — but with its own distinct visual
design language and HTML structure. Designs never share or reference each other's markup; each
one is a self-contained, complete re-implementation of the same notification set.

```
My Templates/
├── CLAUDE.md              ← this file (repo-wide, not design-specific)
├── Spectrum/               ← first design (see below)
│   ├── Incident/
│   ├── Service Request/
│   ├── Approval/
│   ├── Escalation/
│   ├── Task Management/
│   ├── Asset Management/
│   ├── Knowledge Management/
│   ├── Problem Management/
│   ├── Maintenance Operations/
│   ├── Feedback/
│   └── Employee/
└── <Next Design Name>/    ← future sibling, same module folders, different design (see below)
```

When asked to add a template, first ask (or infer from context) *which design* it belongs to —
default to `Spectrum/` unless told otherwise or a second design folder already exists and is the
active one. When asked for a new design of the whole set, create a new sibling folder at the
root — never nest one design inside another, and never overwrite `Spectrum/`.

## Design: Spectrum

Named for its defining trait: every module gets its own accent-color gradient, so ticket type
and severity are readable from the inbox before opening the email.

### Template inventory (64 files across 11 module folders)

- **Incident/** (11) — new ticket (customer-facing base template, also the "analyst assigned"
  equivalent), team assignment, reassigned (owner + team), 6 lifecycle statuses (waiting for
  customer, on hold/pending vendor, resolved, reopened, closed, cancelled), feedback survey.
- **Service Request/** (12) — customer submitted, analyst assigned, team assignment, reassigned
  (owner + team), 6 lifecycle statuses (waiting for customer, waiting for development, on hold,
  fulfilled, closed, cancelled), feedback survey. Also holds a `-customer` suffixed duplicate of
  the base template for clarity alongside the `-analyst` one.
- **Approval/** (6) — request-to-customer, request-to-approver (with Approve/Reject buttons),
  approved, rejected, timed-out, cancelled.
- **Escalation/** (4) — Level 1/2/3 (Team Lead → Manager → Director) with a visual tier tracker,
  plus SLA Breach (darkest tier, tracker shows all levels exhausted).
- **Task Management/** (6) — assigned to you, team assignment, completed, overdue, reassigned,
  cancelled.
- **Asset Management/** (5) — assigned to you, warranty expiring, retirement notice, audit
  required, returned confirmation.
- **Knowledge Management/** (4) — article published, review due, approval needed, retired.
- **Problem Management/** (3) — problem record created, known error published (workaround),
  resolved & closed.
- **Maintenance Operations/** (5) — scheduled notice, 24h reminder, in progress, completed,
  rescheduled.
- **Feedback/** (3) — CSAT reminder (final nudge), survey completed (thank-you), low satisfaction
  alert (internal, to a manager).
- **Employee/** (1) — welcome / new user created. Thin on purpose; only one lifecycle event exists
  for this module so far.

Gaps knowingly left for later: a fuller Employee lifecycle (offboarding/deactivation, role
change, password reset) was flagged but not built. When it is, it stays inside `Spectrum/` (and
gets replicated into any other design folder that also wants it) — it is not a new design.

### Spectrum design system (apply to every new/edited template inside `Spectrum/`)

**Structure.** Single `<div>` root (no `<html>`/`<head>`/`<body>` — these get pasted into
Ivanti's HTML body field), everything inside via nested `<table role="presentation">` for email
client compatibility. Never use CSS flex/grid — tables only.

**Two visual layouts exist, both valid, pick by folder precedent:**
1. *Incident-style* (older, still used in Incident/Escalation/Employee/Asset/Knowledge/Problem/
   Maintenance/Feedback): outer card `border-radius:16px`, logo sits directly in the dark
   `#0f172a` header, status ribbon pill appears right below the header, CTA button is a rounded
   rectangle (`border-radius:10px`).
2. *Service-Request-style* (newer, used in Service Request/Task Management/Approval): outer card
   `border-radius:20px`, a circular white icon badge (68px, containing a 60px tinted-gradient
   inner circle with an emoji) straddles the header/body boundary via `margin-bottom:-34px` on
   its wrapper table, CTA button is a full pill (`border-radius:50px`).

Both layouts share: `#eef1f6` (Incident-style) or `#f1f5f9` (SR-style) as the page background,
`#0f172a` dark header, a details card with `background:#f8fafc; border:1px solid #e2e8f0;
border-radius:12–14px`, and the same footer block (see below). Match whichever style the
existing files in that folder use — don't mix styles within one folder.

**Bilingual EN/AR is mandatory** for every template. Structure: full English section first, then
a dashed divider row with the word "عربي" centered, then a full Arabic section with `dir="rtl"`
on every `<td>` that contains RTL text (title, subtext, table cells, buttons). Arabic table
cells swap `text-align:left/right` versus their English counterparts (mirrored, not identical).
The preheader `<div>` at the very top contains both languages separated by ` / `.

**Top accent bar**: a 6px-tall `<td>` with a `linear-gradient(90deg, ...)` unique to the
module/status, signals ticket type and severity before the reader opens the email. See the
color table below.

**Details card fields** always use the pattern: label cell (`font-size:13px; color:#94a3b8;
font-weight:600`) + value cell (`font-size:14px; color:#0f172a`), rows separated by
`border-bottom:1px solid #e2e8f0` except the last row. Priority/Status badges use Ivanti's
`$(If Field == value Then '<span style="...">...</span>' Else (If ...))` placeholder syntax —
this is real Ivanti template syntax, not a documentation placeholder, so preserve it exactly
(single quotes around the HTML, parenthesized nested `Else (If ...)`).

**Footer** (identical structure every time): divider rule → English "automated notification,
please do not reply" paragraph → Arabic equivalent → `© CurrentYear Customer Name` (Ivanti
token, left as literal text) → outside the card, a bottom spacer table with
`© currentYear TjDeeD Technology. All Rights Reserved` linking to https://tjdeed.com/, colored
to match that template's accent.

**Logo**: always
`https://tjdeed.com/wp-content/uploads/2023/03/TjdeedLogoFullColors-01.png.webp`, 150–160px wide.

### Spectrum color-per-module key (top accent gradient + CTA button color)

| Module / meaning | Colors |
|---|---|
| Incident (base) | indigo `#4f46e5` → purple `#7c3aed` → cyan `#06b6d4` |
| Service Request (customer) | violet `#7c3aed` → indigo `#4f46e5` → cyan `#06b6d4` → emerald `#10b981` |
| Task Management | teal `#0891b2` → cyan `#06b6d4` → indigo `#4f46e5` |
| Approval (pending decision) | amber `#f59e0b` → orange `#ea580c`/`#dc2626` |
| Approved / Fulfilled / Resolved / positive outcome | emerald `#10b981` → green `#059669` |
| Rejected / Cancelled / low satisfaction | red `#ef4444`/`#dc2626` |
| Waiting-for-customer / needs-input / reminders | amber `#f59e0b` |
| On hold / neutral wait / closed / terminal state | slate `#94a3b8`/`#475569` |
| Reopened | orange `#f97316`/`#ea580c` |
| Escalation L1→L3→Breach | amber → orange → red → near-black maroon `#7f1d1d`/`#450a0a` (severity ramps) |
| Asset Management | sky blue `#0ea5e9` → `#0284c7` → indigo `#4f46e5` |
| Knowledge Management | teal `#0d9488` → emerald `#059669` → cyan `#06b6d4` |
| Problem Management | violet/magenta `#a21caf` → purple `#7c3aed` → indigo `#4f46e5` |
| Maintenance/Operations | amber `#f59e0b` → orange `#ea580c`/`#dc2626` |
| Reassignment (owner or team level) | indigo `#4338ca` → cyan `#06b6d4` (a distinct shade from the base module color, so reassignment reads differently from "new"/"assigned" in an inbox) |

### Recurring cast (use these names/IDs for example data — keeps Spectrum internally consistent; reuse the same cast in any new design too, so all designs render the "same" example email)

- **Ahmad Nasser** — Service Request requester, Finance & Operations dept.
- **Sarah Malik** — Incident requester.
- **Khalid Hassan** — Incident analyst / Team Lead (L1).
- **Layla Suleiman** — Service Request analyst / Fulfillment.
- **Fatima Al-Sayed** — Approver / Department Manager.
- **Omar Khalil** — Senior Manager / Director (escalation L3, breach).
- Example IDs: Incident `#TCK-24851`, Service Request `#SR-10293`, Task `#TSK-30456`,
  Approval `#APR-58231`, Problem `#PRB-3007`, Asset `#AST-8821`, Knowledge Article `#KB-1042`,
  Maintenance `#MNT-215`.
- Placeholder URLs use `https://your-itsm-system.com/...` — never invent a real domain.

## Known outstanding request (not started — do this only when asked)

The user wants a **second design**: the same full set of statuses/content/modules listed above,
rebuilt with a different visual design language and different HTML structure than Spectrum's.
This is an explicit future task, not a redesign of Spectrum's files.

When picking it up:
- Create a new folder at the repo root, sibling to `Spectrum/` (e.g. `My Templates/<Design
  Name>/`), named for that design's own visual identity — don't call it `v2` or reuse
  "Spectrum" in the name.
- Recreate the same 11 module folders inside it, with the same template files (same filenames
  are fine, since they now live under a different design root) covering the same statuses.
- Reuse the recurring cast and example IDs above so every design renders the same example
  scenarios — only the visual design and markup structure should differ, not the content.
- Do not touch `Spectrum/` or its files.
- Add a new top-level section to this file (mirroring "Design: Spectrum" above) documenting the
  new design's own layout rules and color key, once it exists.
