# Ivanti ITSM Email Templates

A library of bilingual (English / Arabic) HTML email notification templates built for an
**Ivanti Neurons for ITSM** deployment. Every template is self-contained, table-based HTML
designed to be pasted directly into Ivanti's notification/template editor — no external
stylesheets, no build step.

This repository is organized as a collection of **designs**. A design is a complete,
self-contained visual system covering every ITSM module and status below. Right now there is
one design, **Spectrum**, but the structure is built so additional designs can sit alongside it
later without touching what's already here (see [Roadmap](#roadmap)).

> For the full, exhaustive conventions this project follows (exact colors, markup patterns,
> example-data cast, etc.), see [`CLAUDE.md`](./CLAUDE.md) — this README is the human-facing
> overview, that file is the detailed reference used when building new templates.

## Live previews

🔗 **[asemzaidan2003.github.io/Ivanti-ITSM-Emial-Templates](https://asemzaidan2003.github.io/Ivanti-ITSM-Emial-Templates/)**

GitHub Pages serves every template as a live, rendered HTML page — click through the index above
to browse them by module, or jump straight to one, e.g.
[Incident → New Ticket Created](https://asemzaidan2003.github.io/Ivanti-ITSM-Emial-Templates/Spectrum/Incident/incident-email-template.html).
(Markdown on GitHub can't render styled HTML inline — this is why the preview lives on Pages
instead of embedded in this file.)

## Repository structure

```
My Templates/
├── README.md               ← you are here
├── CLAUDE.md                ← detailed design-system reference
└── Spectrum/                 ← design #1 (see below)
    ├── Incident/
    ├── Service Request/
    ├── Approval/
    ├── Escalation/
    ├── Task Management/
    ├── Asset Management/
    ├── Knowledge Management/
    ├── Problem Management/
    ├── Maintenance Operations/
    ├── Feedback/
    └── Employee/
```

Each module folder contains one `.html` file per notification/status — open any file directly
in a browser to preview it, or paste its contents into Ivanti's HTML template editor.

## What's inside (60 templates across 11 modules)

| Module | Files | Covers |
|---|---|---|
| **Incident** | 11 | New ticket created, team-queue assignment, reassignment (to an owner / to a team), 6 lifecycle statuses (waiting for customer, on hold / pending vendor, resolved, reopened, closed, cancelled), post-resolution CSAT survey |
| **Service Request** | 12 | Customer-facing submission notice, analyst assignment, team-queue assignment, reassignment (owner / team), 6 lifecycle statuses (waiting for customer, waiting for development, on hold, fulfilled, closed, cancelled), CSAT survey |
| **Approval** | 6 | Approval requested (customer view + approver view with Approve/Reject buttons), approved, rejected, timed out, cancelled |
| **Escalation** | 4 | Level 1 → 2 → 3 (Team Lead → Manager → Director) with a visual escalation-tier tracker, plus a formal SLA Breach notice |
| **Task Management** | 6 | Task assigned to a person, assigned to a team queue, completed, overdue, reassigned, cancelled |
| **Asset Management** | 5 | Asset assigned to an employee, warranty expiring, scheduled retirement, audit confirmation required, asset returned |
| **Knowledge Management** | 4 | Article published, review due, pending author/editor approval, retired |
| **Problem Management** | 3 | Problem record opened from linked incidents, known-error/workaround published, root cause resolved & closed |
| **Maintenance Operations** | 5 | Maintenance scheduled, 24-hour reminder, maintenance in progress, completed, rescheduled |
| **Feedback** | 3 | CSAT reminder (final nudge), survey completed (thank-you), low-satisfaction alert (internal, routed to a manager) |
| **Employee** | 1 | Welcome email for a newly created user account |

Every template is bilingual: a full English section, a dashed "عربي" divider, then a full
right-to-left Arabic section — so one file serves both audiences without duplicating templates
per language.

## Design: Spectrum

Spectrum's defining idea is **one accent color per module**, so the ticket type and severity are
readable from the subject line / inbox preview before the email is even opened. A 6px gradient
bar runs across the top of every email; its colors shift by module and, within a module, by
how urgent or positive the status is (amber for "needs your input", emerald for a good outcome,
red for rejected/low-satisfaction, deepening reds/maroon as Escalation approaches an SLA breach).

**Layout at a glance:**
- Dark navy (`#0f172a`) header carrying the company logo.
- Either a status "ribbon" pill directly under the header (Incident-style modules), or a
  circular icon badge with an emoji that straddles the header and body (Service
  Request / Task Management / Approval-style modules).
- A rounded details card (`#f8fafc` background) listing the record's key fields — ticket ID,
  subject, priority, requester, dates — with color-coded priority/status badges.
- A single clear call-to-action button (pill or rounded-rectangle depending on module style).
- A consistent bilingual footer with the automated-notification disclaimer and company branding.

### Color key

| Meaning | Accent |
|---|---|
| Incident (base) | Indigo → Purple → Cyan |
| Service Request (customer) | Violet → Indigo → Cyan → Emerald |
| Task Management | Teal → Cyan → Indigo |
| Approval (pending decision) | Amber → Orange |
| Positive outcome (approved / fulfilled / resolved) | Emerald → Green |
| Negative outcome (rejected / cancelled / low satisfaction) | Red |
| Needs your input / reminder | Amber |
| Neutral wait / closed / terminal state | Slate |
| Reopened | Orange |
| Escalation L1 → L2 → L3 → SLA Breach | Amber → Orange → Red → Near-black maroon |
| Asset Management | Sky blue → Indigo |
| Knowledge Management | Teal → Emerald → Cyan |
| Problem Management | Violet/Magenta → Purple → Indigo |
| Maintenance Operations | Amber → Orange |
| Reassignment (owner or team) | Indigo → Cyan (kept distinct from the base module color) |

### Sample

Below is a trimmed excerpt from
[`Spectrum/Incident/incident-email-template.html`](./Spectrum/Incident/incident-email-template.html)
showing the header, accent bar, and status ribbon that open every Spectrum email:

```html
<div style="margin:0; padding:0; background-color:#eef1f6;">
  <table role="presentation" width="100%" style="background-color:#eef1f6; padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="600" style="background-color:#ffffff; border-radius:16px;
          box-shadow:0 4px 24px rgba(23,43,77,0.08);">

        <!-- Top accent bar -->
        <tr><td style="height:6px; background-image:linear-gradient(90deg,
            #4f46e5 0%, #7c3aed 50%, #06b6d4 100%);">&nbsp;</td></tr>

        <!-- Header / Logo -->
        <tr><td align="center" style="padding:36px 40px 24px 40px; background-color:#0f172a;">
          <img src="https://tjdeed.com/.../TjdeedLogoFullColors-01.png.webp" width="160" alt="Company Logo">
        </td></tr>

        <!-- EN Status Ribbon -->
        <tr><td align="center" style="padding:28px 40px 0 40px;">
          <span style="background-color:#ecfdf5; border:1px solid #a7f3d0; border-radius:20px;
              padding:6px 16px; color:#047857; font-weight:700; text-transform:uppercase;">
            ● New Ticket Created
          </span>
        </td></tr>
        <!-- ... details card, CTA button, Arabic mirror section, footer ... -->
      </table>
    </td></tr>
  </table>
</div>
```

And a snippet from the Service-Request-style layout —
[`Spectrum/Service Request/service-request-email-template-customer.html`](./Spectrum/Service%20Request/service-request-email-template-customer.html) —
showing its circular icon badge, which the Incident style doesn't use:

```html
<!-- Icon badge straddling header / body -->
<tr><td align="center" style="background-color:#0f172a;">
  <table role="presentation" style="margin-bottom:-34px;">
    <tr><td width="68" height="68" style="background-color:#ffffff; border-radius:50%;
        box-shadow:0 6px 16px rgba(15,23,42,0.25);">
      <table width="60" height="60" style="margin:4px auto; border-radius:50%;
          background-image:linear-gradient(135deg,#ede9fe 0%,#cffafe 100%);">
        <tr><td align="center" style="font-size:26px;">🧾</td></tr>
      </table>
    </td></tr>
  </table>
</td></tr>
```

To see the full visual result, open any `.html` file in this repo directly in a browser, or
paste its contents into Ivanti's notification template body field.

### Ivanti placeholder syntax

Priority and status badges use Ivanti's native conditional syntax so they render dynamically
inside the platform — this is real Ivanti template syntax, not a placeholder for illustration:

```
$(If Priority == 1
  Then '<span style="...">1 - High</span>'
  Else (If Priority == 2
    Then '<span style="...">2 - Medium</span>'
    Else '<span style="...">3 - Low</span>'))
```

## How to use these templates

1. Open the `.html` file for the notification you need.
2. Copy its full contents into the corresponding notification template's HTML body field in
   Ivanti Neurons for ITSM.
3. Replace the placeholder logo URL, company name, and `https://your-itsm-system.com/...` links
   with your own environment's values.
4. Map the example field values (ticket ID, requester name, priority, dates, etc.) to your
   actual Ivanti field tokens — the templates use realistic example data (see the "recurring
   cast" in `CLAUDE.md`) so the visual layout can be judged before wiring in real tokens.

## Roadmap

A second design — same modules, same statuses, a different visual language and HTML
structure — is planned as a future sibling folder to `Spectrum/` at the repository root. See
the "Known outstanding request" section of [`CLAUDE.md`](./CLAUDE.md) for the exact plan.

## License

Internal template library for TjDeeD Technology's Ivanti Neurons for ITSM deployment.
