#!/usr/bin/env node
// Regenerates every portal page (home, designs/, docs/, about/) from
// site-src/data.js + site-src/render.js + site-src/pages/*.html.
//
// Does NOT touch Spectrum/ or Ledger/ — those are hand-authored,
// Ivanti-pasteable email template files, a separate concern.
//
// Usage: node build.js   (or: npm run build)

const fs = require("fs");
const path = require("path");

const { DESIGNS, MODULES } = require("./site-src/data");
const {
  urlEncodeDir,
  headHTML,
  footerHTML,
  footHTML,
  pageHeadHTML,
  modulePillHTML,
  swatchesHTML,
  designCardHTML,
  tplCardHTML,
} = require("./site-src/render");

const ROOT = __dirname;

const demoCard = (b, href, rel) =>
  designCardHTML({ href, thumbSrc: `${rel}${b.folder}/01-Heritage/Incident/incident-new-ticket.html`, title: `${b.name} Demo`, desc: `${b.name}-branded templates in five designs.`, tags: [b.tag || "15 templates", "5 designs"], cta: `Browse ${b.name} Demo` });
const BRANDS = [{ folder: "BIHG", slug: "bihg", name: "BIHG", tag: "45 templates", full: true }, { folder: "KSIA", slug: "ksia", name: "KSIA" }];
const BIHGCARD_HOME = BRANDS.map((b) => demoCard(b, `designs/${b.slug}/index.html`, "")).join("");
const BIHGCARD_DESIGNS = BRANDS.map((b) => demoCard(b, `${b.slug}/index.html`, "../")).join("");

function write(relPath, contents) {
  const abs = path.join(ROOT, relPath);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, contents, "utf8");
  console.log("wrote", relPath);
}

const rel = (depth) => "../".repeat(depth);

// ---------------------------------------------------------------- home ----
function buildHome() {
  const rel0 = "";
  const head = headHTML({
    rel: rel0,
    title: "Ivanti ITSM Email Templates",
    description: "Internal tool for browsing and copying bilingual Ivanti Neurons for ITSM email notification templates.",
  });
  const pageHead = pageHeadHTML({
    h1: "Ivanti ITSM Email Templates",
    desc:
      "Internal template library for the Ivanti Neurons for ITSM notification system. Pick a\n" +
      "        design below to browse its modules, preview each template, and grab the HTML to paste\n" +
      "        into the notification editor.",
  });
  const cards = [DESIGNS.spectrum, DESIGNS.ledger]
    .map((d) =>
      designCardHTML({
        href: `designs/${d.slug}/index.html`,
        thumbSrc: `${d.folder}/Incident/incident-email-template.html`,
        thumbTitle: `${d.name} preview`,
        title: d.name,
        desc: d.homeDesc,
        tags: ["60 templates", "11 modules", "EN / AR bilingual"],
        cta: `Browse ${d.name}`,
      }).replace('class="design-card reveal"', 'class="design-card reveal" style="text-decoration:none;"')
    )
    .join("\n") + BIHGCARD_HOME;

  const html =
    head +
    pageHead +
    "\n" +
    `  <section class="section" id="designs">\n    <div class="container">\n\n      <div class="design-grid">\n\n${cards}\n      </div>\n    </div>\n  </section>\n\n` +
    footerHTML() +
    footHTML(rel0);

  write("index.html", html);
}

// ------------------------------------------------------------ designs/ ----
function buildDesignsIndex() {
  const rel0 = "../";
  const head = headHTML({
    rel: rel0,
    title: "Designs — Ivanti ITSM Email Templates — Asem Zaidan",
    description: "Every design in the Ivanti ITSM email template library, by Asem Zaidan.",
  });
  const pageHead = pageHeadHTML({
    breadcrumb: [{ label: "Home", href: `${rel0}index.html` }],
    currentLabel: "Designs",
    h1: "Designs",
    desc:
      "Each design below is a complete, self-contained reinterpretation of the same 60 ITSM\n" +
      "        notifications — same statuses, same content, different visual language and HTML\n" +
      "        structure. Pick one to explore every module and template.",
  });
  const cards = [DESIGNS.spectrum, DESIGNS.ledger]
    .map((d) =>
      designCardHTML({
        href: `${d.slug}/index.html`,
        thumbSrc: `${rel0}${d.folder}/Incident/incident-email-template.html`,
        thumbTitle: `${d.name} preview`,
        title: d.name,
        desc: d.homeDesc,
        tags: ["60 templates", "11 modules", "EN / AR bilingual"],
        cta: `Browse ${d.name}`,
      })
    )
    .join("\n") + BIHGCARD_DESIGNS;

  const html =
    head +
    pageHead +
    "\n" +
    `  <section class="section">\n    <div class="container">\n      <div class="design-grid">\n\n${cards}\n      </div>\n    </div>\n  </section>\n\n` +
    footerHTML() +
    footHTML(rel0);

  write("designs/index.html", html);
}

// --------------------------------------------------- design overview page --
function buildDesignOverview(designSlug) {
  const design = DESIGNS[designSlug];
  const rel0 = "../../";
  const head = headHTML({
    rel: rel0,
    title: `${design.name} — Ivanti ITSM Email Templates — Asem Zaidan`,
    description: `${design.name}: 60 bilingual Ivanti ITSM email templates across 11 modules, by Asem Zaidan.`,
  });
  const pageHead = pageHeadHTML({
    breadcrumb: [
      { label: "Home", href: `${rel0}index.html` },
      { label: "Designs", href: `${rel0}designs/index.html` },
    ],
    currentLabel: design.name,
    h1: design.name,
    desc: design.pageDesc,
    extraAfterDesc: swatchesHTML(designSlug),
  });

  const moduleCards = MODULES.map((m) =>
    designCardHTML({
      href: `${m.slug}/index.html`,
      thumbSrc: `${rel0}${design.folder}/${urlEncodeDir(m.dir)}/${m.templates[0].file}`,
      title: m.name,
      desc: m.overviewDesc,
      tags: [m.tag],
      cta: `Browse ${m.name}`,
    })
  ).join("\n");

  const html =
    head +
    pageHead +
    "\n" +
    `  <section class="section">\n    <div class="container">\n      <div class="section-head reveal">\n        <span class="badge">11 Modules</span>\n        <h2>Pick a module to browse its templates</h2>\n        <p>Every card below opens a dedicated page listing that module's templates, each with a live preview.</p>\n      </div>\n\n      <div class="design-grid">\n\n${moduleCards}\n      </div>\n    </div>\n  </section>\n\n` +
    footerHTML() +
    footHTML(rel0);

  write(`designs/${designSlug}/index.html`, html);
}

// ---------------------------------------------------------- module page ---
function buildModulePage(designSlug, module) {
  const design = DESIGNS[designSlug];
  const rel0 = "../../../";
  const metaNoun = module.metaDescNoun || module.name;
  const head = headHTML({
    rel: rel0,
    title: `${module.name} — ${design.name} — Ivanti ITSM Email Templates`,
    description: `${metaNoun} email templates in the ${design.name} design, by Asem Zaidan.`,
  });
  const pageHead = pageHeadHTML({
    breadcrumb: [
      { label: "Home", href: `${rel0}index.html` },
      { label: "Designs", href: `${rel0}designs/index.html` },
      { label: design.name, href: `${rel0}designs/${design.slug}/index.html` },
    ],
    currentLabel: module.name,
    h1: module.name,
    desc: module.pageDesc,
    extraBeforeH1: modulePillHTML(module.colors[designSlug], module.tag),
  });

  const cards = module.templates
    .map((t) => tplCardHTML({ src: `${rel0}${design.folder}/${urlEncodeDir(module.dir)}/${t.file}`, title: t.title, desc: t.desc }))
    .join("\n");

  const html =
    head +
    pageHead +
    "\n" +
    `  <section class="section">\n    <div class="container">\n      <div class="design-grid tpl-grid">\n\n${cards}\n      </div>\n    </div>\n  </section>\n\n` +
    footerHTML() +
    footHTML(rel0);

  write(`designs/${designSlug}/${module.slug}/index.html`, html);
}

// ------------------------------------------------------- docs / about -----
function buildStaticPage(name, title, description) {
  const rel0 = "../";
  const head = headHTML({ rel: rel0, title, description });
  const body = fs.readFileSync(path.join(ROOT, `site-src/pages/${name}-body.html`), "utf8");
  const html = head + body + "\n\n" + footerHTML() + footHTML(rel0);
  write(`${name}/index.html`, html);
}

// ------------------------------------------------------------ BIHG demo ---
const BIHG_DESIGNS = ["01-Heritage", "02-Spectrum", "03-Ledger", "04-Executive", "05-Pulse"];
const BIHG_TEMPLATES = [
  { dir: "Incident", file: "incident-new-ticket.html", title: "Incident — New Ticket", desc: "Notifies the analyst a new incident ticket was created." },
  { dir: "Approval", file: "approval-request-approver.html", title: "Approval — Request", desc: "Asks the approver to approve or reject a request." },
  { dir: "Escalation", file: "escalation-level-2.html", title: "Escalation — Level 2", desc: "Escalates an overdue ticket to the next level." },
];


// BIHG full Spectrum set: Incident + Service Request, 15 notifications each.
// [key incident, key SR, title, description]
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

function bihgFullSections(b, rel0) {
  const mods = [
    { dir: "Incident", pre: "incident", i: 0, label: "Incident" },
    { dir: "Service Request", pre: "service-request", i: 1, label: "Service Request" },
  ];
  return mods.map((m) => {
    const cards = BIHG_FULL.map((t, n) => {
      const file = `${String(n + 1).padStart(2, "0")}-${m.pre}-${t[m.i]}.html`;
      return tplCardHTML({ src: `${rel0}${b.folder}/Spectrum-Full/${urlEncodeDir(m.dir)}/${file}`, previewSrc: `${rel0}${b.folder}/Spectrum-Full-Preview/${urlEncodeDir(m.dir)}/${file}`, title: `${m.label} — ${t[2]}`, desc: t[3] });
    }).join("\n");
    return `      <div class="section-head reveal"><h2>Spectrum — Full Set: ${m.label}</h2></div>
      <div class="design-grid tpl-grid">

${cards}
      </div>
`;
  }).join("\n");
}

function buildBihg(b) {
  const rel0 = "../../";
  const head = headHTML({ rel: rel0, title: `${b.name} Demo — Ivanti ITSM Email Templates`, description: `${b.name}-branded email template demo.` });
  const pageHead = pageHeadHTML({
    breadcrumb: [{ label: "Home", href: `${rel0}index.html` }, { label: "Designs", href: `${rel0}designs/index.html` }],
    currentLabel: `${b.name} Demo`,
    h1: `${b.name} Demo`,
    desc: `${b.name}-branded templates in five designs: Heritage, Spectrum, Ledger, Executive and Pulse.`,
  });
  const sections = BIHG_DESIGNS.map((d) => {
    const cards = BIHG_TEMPLATES.map((t) => tplCardHTML({ src: `${rel0}${b.folder}/${d}/${t.dir}/${t.file}`, title: t.title, desc: t.desc })).join("\n");
    return `      <div class="section-head reveal"><h2>${d.slice(3)}</h2></div>
      <div class="design-grid tpl-grid">

${cards}
      </div>
`;
  }).join("\n");
  write(`designs/${b.slug}/index.html`, head + pageHead + `
  <section class="section">
    <div class="container">
${sections}${b.full ? "\n" + bihgFullSections(b, rel0) : ""}    </div>
  </section>

` + footerHTML() + footHTML(rel0));
}

function main() {
  buildHome();
  buildDesignsIndex();
  BRANDS.forEach(buildBihg);
  buildDesignOverview("spectrum");
  buildDesignOverview("ledger");
  for (const designSlug of ["spectrum", "ledger"]) {
    for (const module of MODULES) {
      buildModulePage(designSlug, module);
    }
  }
  buildStaticPage("docs", "Docs — Ivanti ITSM Email Templates — Asem Zaidan", "How to use the Ivanti ITSM email templates in your own environment.");
  buildStaticPage("about", "About — Ivanti ITSM Email Templates — Asem Zaidan", "About the Ivanti ITSM email template library and its author, Asem Zaidan.");
  console.log("\nBuild complete: 28 pages written.");
}

main();
