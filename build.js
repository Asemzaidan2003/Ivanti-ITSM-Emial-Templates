#!/usr/bin/env node
// Regenerates every portal page from site-src/data.js + site-src/render.js + site-src/pages/*.html.
//
// Site hierarchy:  Home (customers) -> customers/<customer>/ (its templates)
//                  -> customers/<customer>/<template>/ (its modules)
//                  -> customers/<customer>/<template>/<module>/ (the template cards)
//
// The Ivanti-pasteable template files (Spectrum/, Ledger/, BIHG/, KSIA/) are hand-authored
// and never touched by this build.
//
// Usage: node build.js   (or: npm run build)

const fs = require("fs");
const path = require("path");

const { DESIGNS, MODULES } = require("./site-src/data");
const { urlEncodeDir, headHTML, footerHTML, footHTML, pageHeadHTML, modulePillHTML, swatchesHTML, designCardHTML, tplCardHTML } = require("./site-src/render");

const ROOT = __dirname;
const write = (relPath, contents) => {
  const abs = path.join(ROOT, relPath);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, contents, "utf8");
  console.log("wrote", relPath);
};
const up = (n) => "../".repeat(n);
const page = (rel, title, description, pageHead, body) =>
  headHTML({ rel, title: title.includes("Ivanti ITSM") ? title : `${title} — Ivanti ITSM Email Templates`, description }) + pageHead + "\n" +
  `  <section class="section">\n    <div class="container">\n${body}\n    </div>\n  </section>\n\n` + footerHTML() + footHTML(rel);
const grid = (cards, cls = "design-grid") => `      <div class="${cls}">\n\n${cards}\n      </div>`;

// ------------------------------------------------------------ catalogue ---
// customer -> templates (designs) -> modules -> template cards
const BIHG_FULL = [
  ["team-assignment", "team-assignment", "Team Assignment", "Tells a team a new ticket was assigned to its queue."],
  ["logged", "logged", "Logged", "Confirms the ticket was logged."],
  ["active", "active", "Active", "Tells the requester work has started."],
  ["active-with-bihg", "active-with-bihg", "Active — With BIHG", "Tells the requester the BIHG support team is handling the ticket."],
  ["waiting-for-customer", "waiting-for-customer", "Waiting for Customer", "Asks the requester for more information, with the waiting reason."],
  ["waiting-for-third-party", "waiting-for-third-party", "Waiting for Third Party", "Tells the requester the ticket is paused for an external party."],
  ["waiting-for-resolution", "waiting-for-fulfilment", "Waiting for Resolution / Fulfilment", "Tells the requester the ticket is in the waiting stage."],
  ["resolved", "fulfilled", "Resolved / Fulfilled", "Confirms the outcome and explains the 3-day reopen window."],
  ["closed", "closed", "Closed", "Final closure notice."],
  ["cancelled", "cancelled", "Cancelled", "Confirms the cancellation, with the reason."],
  ["escalation-1", "escalation-1", "Escalation — Level 1", "Escalates the ticket to the first level."],
  ["escalation-2", "escalation-2", "Escalation — Level 2", "Escalates the ticket to the second level."],
  ["escalation-3", "escalation-3", "Escalation — Level 3", "Escalates the ticket to the third level."],
  ["response-sla-breach", "response-sla-breach", "Response SLA Breached", "Alerts the team the response target was breached."],
  ["resolution-sla-breach", "fulfilment-sla-breach", "Resolution / Fulfilment SLA Breached", "Alerts the team the resolution or fulfilment target was breached."],
];

const bihgModule = (slug, name, dir, pre, i, desc) => ({
  slug, name, tag: "15 templates", desc, color: "#007A4C",
  cards: BIHG_FULL.map((t, n) => {
    const file = `${String(n + 1).padStart(2, "0")}-${pre}-${t[i]}.html`;
    return { src: `BIHG/Spectrum-Compact/${urlEncodeDir(dir)}/${file}`, previewSrc: `BIHG/Spectrum-Compact-Preview/${urlEncodeDir(dir)}/${file}`, title: t[2], desc: t[3] };
  }),
});


// Remaining BIHG modules: read each file's English status + intro for its card.
const bihgFolderModule = (dir, slug, name, desc) => {
  const base = path.join(ROOT, "BIHG", "Spectrum-Compact", dir);
  const files = fs.readdirSync(base).filter((f) => f.endsWith(".html")).sort();
  return {
    slug, name, tag: `${files.length} template${files.length > 1 ? "s" : ""}`, desc, color: "#007A4C",
    cards: files.map((file) => {
      const h = fs.readFileSync(path.join(base, file), "utf8");
      const title = (h.match(/● ([^<]+)<\/span>/) || [, file])[1].trim();
      const sub = (h.match(/color:#5E6366;">([^<]+)<\/p>/) || [, ""])[1].trim();
      return { src: `BIHG/Spectrum-Compact/${urlEncodeDir(dir)}/${file}`, previewSrc: `BIHG/Spectrum-Compact-Preview/${urlEncodeDir(dir)}/${file}`, title, desc: sub };
    }),
  };
};

const tjdeedTemplate = (d) => ({
  slug: d.slug, name: d.name, desc: d.homeDesc, pageDesc: d.pageDesc, tags: ["60 templates", "11 modules", "EN / AR bilingual"],
  thumb: `${d.folder}/Incident/incident-email-template.html`,
  swatches: d.slug,
  modules: MODULES.map((m) => ({
    slug: m.slug, name: m.name, tag: m.tag, desc: m.overviewDesc, pageDesc: m.pageDesc, color: m.colors[d.slug],
    cards: m.templates.map((t) => ({ src: `${d.folder}/${urlEncodeDir(m.dir)}/${t.file}`, title: t.title, desc: t.desc })),
  })),
});

const KSIA_DESIGNS = [["01-Heritage", "Heritage"], ["02-Spectrum", "Spectrum"], ["03-Ledger", "Ledger"], ["04-Executive", "Executive"], ["05-Pulse", "Pulse"]];
const KSIA_MODULES = [
  ["incident", "Incident", "Incident", "incident-new-ticket.html", "New Ticket", "Notifies the analyst a new incident ticket was created."],
  ["approval", "Approval", "Approval", "approval-request-approver.html", "Request", "Asks the approver to approve or reject a request."],
  ["escalation", "Escalation", "Escalation", "escalation-level-2.html", "Level 2", "Escalates an overdue ticket to the next level."],
];
const ksiaTemplate = ([folder, name]) => ({
  slug: name.toLowerCase(), name, desc: `${name} design — KSIA-branded demo notifications.`, pageDesc: `KSIA-branded ${name} design, bilingual (English / Arabic).`, tags: ["3 templates", "3 modules"],
  thumb: `KSIA/${folder}/Incident/incident-new-ticket.html`,
  modules: KSIA_MODULES.map(([slug, mname, dir, file, title, desc]) => ({
    slug, name: mname, tag: "1 template", desc, pageDesc: desc, color: "#5E6366",
    cards: [{ src: `KSIA/${folder}/${dir}/${file}`, title: `${mname} — ${title}`, desc }],
  })),
});

const CUSTOMERS = [
  {
    slug: "tjdeed", name: "TjDeeD", desc: "The library's own reference designs — the full notification set across every ITSM module.",
    templates: [tjdeedTemplate(DESIGNS.spectrum), tjdeedTemplate(DESIGNS.ledger)],
  },
  {
    slug: "bihg", name: "BIHG", desc: "Binladin International Holding Group — branded Spectrum Compact notifications across 10 modules.",
    templates: [{
      slug: "spectrum-compact", name: "Spectrum Compact",
      desc: "English and Arabic side by side, one details box, one button, and the BIHG pattern bar at the bottom. Uses live Ivanti fields.",
      pageDesc: "English on the left, Arabic on the right, one details box and one button. Every value is a live Ivanti field; the greeting uses the customer's name.",
      tags: ["63 templates", "10 modules", "EN / AR side by side"],
      thumb: "BIHG/Spectrum-Compact-Preview/Incident/03-incident-active.html",
      modules: [
        bihgModule("incident", "Incident", "Incident", "incident", 0, "Team assignment, lifecycle statuses, escalations and SLA breaches for incidents."),
        bihgModule("service-request", "Service Request", "Service Request", "service-request", 1, "Team assignment, lifecycle statuses, escalations and SLA breaches for service requests."),
        bihgFolderModule("Approval", "approval", "Approval", "Approval requests and outcomes for service requests."),
        bihgFolderModule("Task Management", "task-management", "Task Management", "Task assignment, completion, overdue and reassignment notices."),
        bihgFolderModule("Asset Management", "asset-management", "Asset Management", "Asset assignment, audit, warranty, retirement and return notices."),
        bihgFolderModule("Knowledge Management", "knowledge-management", "Knowledge Management", "Knowledge article approval, publication, review and retirement."),
        bihgFolderModule("Problem Management", "problem-management", "Problem Management", "Problem records, known errors and resolution."),
        bihgFolderModule("Maintenance Operations", "maintenance-operations", "Maintenance Operations", "Scheduled maintenance notices, reminders, progress and completion."),
        bihgFolderModule("Feedback", "feedback", "Feedback", "Satisfaction survey reminders, thank-you and low-score alerts."),
        bihgFolderModule("Employee", "employee", "Employee", "Welcome email for a newly created user account."),
      ],
    }],
  },
  {
    slug: "ksia", name: "KSIA", desc: "King Salman International Airport — branded demo notifications in five designs.",
    templates: KSIA_DESIGNS.map(ksiaTemplate),
  },
];
const countCards = (t) => t.modules.reduce((n, m) => n + m.cards.length, 0);

// ---------------------------------------------------------------- pages ---
function buildHome() {
  const cards = CUSTOMERS.map((c) => designCardHTML({
    href: `customers/${c.slug}/index.html`, thumbSrc: c.templates[0].thumb, title: c.name, desc: c.desc,
    tags: [`${c.templates.length} template${c.templates.length > 1 ? "s" : ""}`, `${c.templates.reduce((n, t) => n + countCards(t), 0)} notifications`], cta: `Open ${c.name}`,
  })).join("\n");
  write("index.html", page("", "Ivanti ITSM Email Templates", "Bilingual Ivanti Neurons for ITSM email notification templates, organised by customer.",
    pageHeadHTML({ h1: "Ivanti ITSM Email Templates", desc: "Pick a customer to browse the templates created for them, preview every notification, and copy the HTML into the Ivanti notification editor." }),
    `      <div class="section-head reveal"><h2>Customers</h2></div>\n` + grid(cards)));
}

function buildCustomer(c) {
  const rel0 = up(2);
  const cards = c.templates.map((t) => designCardHTML({
    href: `${t.slug}/index.html`, thumbSrc: rel0 + t.thumb, title: t.name, desc: t.desc, tags: t.tags, cta: `Browse ${t.name}`,
  })).join("\n");
  write(`customers/${c.slug}/index.html`, page(rel0, c.name, `${c.name} email templates.`,
    pageHeadHTML({ breadcrumb: [{ label: "Home", href: `${rel0}index.html` }], currentLabel: c.name, h1: c.name, desc: c.desc }),
    `      <div class="section-head reveal"><h2>Templates</h2></div>\n` + grid(cards)));
}

function buildTemplate(c, t) {
  const rel0 = up(3);
  const cards = t.modules.map((m) => designCardHTML({
    href: `${m.slug}/index.html`, thumbSrc: rel0 + (m.cards[0].previewSrc || m.cards[0].src), title: m.name, desc: m.desc, tags: [m.tag], cta: `Browse ${m.name}`,
  })).join("\n");
  write(`customers/${c.slug}/${t.slug}/index.html`, page(rel0, `${c.name} — ${t.name}`, `${c.name} ${t.name} email templates by module.`,
    pageHeadHTML({
      breadcrumb: [{ label: "Home", href: `${rel0}index.html` }, { label: c.name, href: `../index.html` }],
      currentLabel: t.name, h1: `${c.name} — ${t.name}`, desc: t.pageDesc, extraAfterDesc: t.swatches ? swatchesHTML(t.swatches) : undefined,
    }),
    `      <div class="section-head reveal"><h2>Modules</h2></div>\n` + grid(cards)));
}

function buildModule(c, t, m) {
  const rel0 = up(4);
  const cards = m.cards.map((k) => tplCardHTML(Object.assign({}, k, { src: rel0 + k.src, previewSrc: k.previewSrc && rel0 + k.previewSrc }))).join("\n");
  write(`customers/${c.slug}/${t.slug}/${m.slug}/index.html`, page(rel0, `${m.name} — ${c.name} ${t.name}`, `${m.name} email templates, ${c.name} ${t.name}.`,
    pageHeadHTML({
      breadcrumb: [{ label: "Home", href: `${rel0}index.html` }, { label: c.name, href: `../../index.html` }, { label: t.name, href: `../index.html` }],
      currentLabel: m.name, h1: m.name, desc: m.pageDesc || m.desc, extraBeforeH1: modulePillHTML(m.color, m.tag),
    }),
    grid(cards, "design-grid tpl-grid")));
}

function buildStaticPage(name, title, description) {
  const body = fs.readFileSync(path.join(ROOT, `site-src/pages/${name}-body.html`), "utf8");
  write(`${name}/index.html`, headHTML({ rel: "../", title, description }) + body + "\n\n" + footerHTML() + footHTML("../"));
}

buildHome();
for (const c of CUSTOMERS) {
  buildCustomer(c);
  for (const t of c.templates) {
    buildTemplate(c, t);
    for (const m of t.modules) buildModule(c, t, m);
  }
}
buildStaticPage("docs", "Docs — Ivanti ITSM Email Templates — Asem Zaidan", "How to use the Ivanti ITSM email templates in your own environment.");
buildStaticPage("about", "About — Ivanti ITSM Email Templates — Asem Zaidan", "About the Ivanti ITSM email template library and its author, Asem Zaidan.");
console.log("\nBuild complete.");
