// Pure HTML-string renderers shared by every generated page. build.js calls
// these with page-specific data; nothing here reads or writes files.

const { SITE_TITLE, AUTHOR } = require("./data");

const urlEncodeDir = (dir) => dir.replace(/ /g, "%20");

function headHTML({ rel, title, description }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
<link rel="icon" type="image/png" href="${rel}assets/favicon.png">
<link rel="stylesheet" href="${rel}assets/site.css">
</head>
<body>

`;
}

function footerHTML() {
  return `  <footer class="site-footer">
    <div class="container">
      <div class="left">A <strong>TjDeeD Technology</strong> product · designed &amp; built by <strong>${AUTHOR}</strong> · Ivanti Neurons for ITSM email template library</div>
      <div class="links">
        <a href="https://tjdeed.com/" target="_blank" rel="noopener">TjDeeD</a>
        <a href="https://github.com/Asemzaidan2003/Ivanti-ITSM-Emial-Templates">GitHub</a>
      </div>
    </div>
  </footer>
`;
}

function footHTML(rel) {
  return `
<script src="${rel}assets/site.js"></script>
</body>
</html>
`;
}

// breadcrumb: array of {label, href} for links, plus a trailing plain-text
// current-page label.
// extraBeforeH1: raw HTML injected between the breadcrumb and <h1> (used for
// the module-color-pill on module pages).
// extraAfterDesc: raw HTML injected after the <p> (used for the
// design-overview swatches row).
function pageHeadHTML({ breadcrumb, currentLabel, h1, desc, extraBeforeH1, extraAfterDesc }) {
  const crumbHTML = breadcrumb
    ? `      <div class="breadcrumb">${breadcrumb.map((c) => `<a href="${c.href}">${c.label}</a>`).join(" / ")} / ${currentLabel}</div>\n`
    : "";
  return `  <section class="page-head">
    <div class="container">
${crumbHTML}${extraBeforeH1 ? `${extraBeforeH1}\n` : ""}      <h1>${h1}</h1>
      <p>
        ${desc}
      </p>${extraAfterDesc ? `\n${extraAfterDesc}` : ""}
    </div>
  </section>
`;
}

function modulePillHTML(color, tag) {
  return `      <div class="module-color-pill"><span class="dot" style="background:${color}"></span>${tag}</div>`;
}

function swatchesHTML(designSlug) {
  const { MODULES } = require("./data");
  const rows = MODULES.map((m) => `        <span class="swatch" style="background:${m.colors[designSlug]}">${m.name}</span>`).join("\n");
  return `      <div class="swatches">\n${rows}\n      </div>`;
}

// Whole-card anchor style, used on the homepage / designs index (design
// picker) and on a design's overview page (module picker).
function designCardHTML({ href, thumbSrc, thumbTitle, title, desc, tags, cta }) {
  const tagsHTML = tags.map((t) => `<span class="badge">${t}</span>`).join("\n              ");
  return `        <a class="design-card reveal" href="${href}"${thumbTitle ? "" : ""}>
          <div class="thumb"><iframe src="${thumbSrc}" tabindex="-1" scrolling="no" loading="lazy"${thumbTitle ? ` title="${thumbTitle}"` : ""}></iframe></div>
          <div class="body">
            <h3>${title}</h3>
            <p class="desc">${desc}</p>
            <div class="tags">
              ${tagsHTML}
            </div>
            <span class="go">${cta} →</span>
          </div>
        </a>
`;
}

// Template card: thumb links out to the real file, actions row has
// Open/Copy Code/View Code (Copy/View revealed only when embedded, via
// site.js + site.css body.is-framed rule).
function tplCardHTML({ src, title, desc }) {
  return `        <div class="design-card reveal tpl-card">
          <a class="thumb-link" href="${src}" target="_blank" rel="noopener">
            <div class="thumb"><iframe src="${src}" tabindex="-1" scrolling="no" loading="lazy"></iframe></div>
          </a>
          <div class="body">
            <h3>${title}</h3>
            <p class="desc">${desc}</p>
            <div class="card-actions">
              <a class="go" href="${src}" target="_blank" rel="noopener">Open ↗</a>
              <button type="button" class="icon-btn btn-copy" data-src="${src}">Copy Code</button>
              <button type="button" class="icon-btn btn-view" data-src="${src}">View Code</button>
            </div>
          </div>
        </div>
`;
}

module.exports = {
  SITE_TITLE,
  AUTHOR,
  urlEncodeDir,
  headHTML,
  footerHTML,
  footHTML,
  pageHeadHTML,
  modulePillHTML,
  swatchesHTML,
  designCardHTML,
  tplCardHTML,
};
