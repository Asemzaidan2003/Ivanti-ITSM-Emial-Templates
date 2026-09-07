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
one is a self-contained, complete re-implementation of the same notification set. Each design
folder has its own `CLAUDE.md` (`Spectrum/CLAUDE.md`, `Ledger/CLAUDE.md`) documenting that
design's template inventory, layout system, and color key — read the one for whichever design
you're working in.

When asked to add a template, first ask (or infer from context) *which design* it belongs to —
default to `Spectrum/` unless told otherwise. When asked for a new design of the whole set,
create a new sibling folder at the root — never nest one design inside another, and never
overwrite `Spectrum/` or `Ledger/`.

## Design: Spectrum

Named for its defining trait: every module gets its own accent-color gradient, so ticket type
and severity are readable from the inbox before opening the email. 64 files across 11 module
folders. Full template inventory, layout system, and color key: **`Spectrum/CLAUDE.md`**.

## Design: Ledger

Named for its defining trait: every template reads like a page torn from a corporate ledger —
a letterhead masthead, a metadata strip, and a fully gridded record table — favoring typographic
discipline and structure over Spectrum's color-gradient/badge language. 60 files across the
same 11 module folders, same statuses/content/cast/example IDs as Spectrum — only the visual
design and markup structure differ. Full template inventory, layout system, and color key:
**`Ledger/CLAUDE.md`**.

## Recurring cast (use these names/IDs for example data — keeps every design internally consistent; reuse the same cast in any new design too, so all designs render the "same" example email)

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

## Known outstanding requests (not started — do this only when asked)

- A third design, or a fuller Employee lifecycle (offboarding/deactivation, role change,
  password reset) inside `Spectrum/` (and replicated into `Ledger/`), have both been flagged in
  the past but not built. Neither is scheduled — pick either up only on explicit request, and
  when adding a new design, follow the same pattern as Ledger: new sibling root folder, same 11
  module folders and file names, same cast/example IDs, own layout rules + color key documented
  in a new top-level section here.
