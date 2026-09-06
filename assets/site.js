// Shared site behavior: mobile nav toggle + scroll-reveal animation.
document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { links.classList.remove("open"); });
    });
  }

  // Copy Code / View Code only make sense when this page is being viewed
  // embedded in someone else's iframe (no easy right-click "view source"
  // there), so flag that case and let the CSS reveal those buttons only then.
  var inIframe = false;
  try {
    inIframe = window.self !== window.top;
  } catch (e) {
    inIframe = true;
  }
  if (inIframe) {
    document.body.classList.add("is-framed");
    var notice = document.createElement("div");
    notice.className = "framed-notice";
    notice.innerHTML =
      '<span>You’re viewing an embedded copy of this page.</span>' +
      '<a href="' + window.location.href + '" target="_blank" rel="noopener">Open in a new tab ↗</a>';
    document.body.insertBefore(notice, document.body.firstChild);
  }

  function flashButton(btn, label) {
    var original = btn.textContent;
    btn.textContent = label;
    btn.classList.add("is-done");
    setTimeout(function () {
      btn.textContent = original;
      btn.classList.remove("is-done");
    }, 1800);
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try {
        ok = document.execCommand("copy");
      } catch (e) {
        ok = false;
      }
      document.body.removeChild(ta);
      ok ? resolve() : reject(new Error("copy failed"));
    });
  }

  document.querySelectorAll(".btn-copy").forEach(function (btn) {
    btn.addEventListener("click", function (evt) {
      evt.preventDefault();
      var src = btn.getAttribute("data-src");
      fetch(src)
        .then(function (res) { return res.text(); })
        .then(function (code) { return copyText(code); })
        .then(function () { flashButton(btn, "Copied ✓"); })
        .catch(function () { flashButton(btn, "Couldn’t copy"); });
    });
  });

  var GITHUB_BLOB_BASE = "https://github.com/Asemzaidan2003/Ivanti-ITSM-Emial-Templates/blob/main/";

  function githubUrlFor(relSrc) {
    return GITHUB_BLOB_BASE + relSrc.replace(/^(\.\.\/)+/, "");
  }

  document.querySelectorAll(".btn-view").forEach(function (btn) {
    btn.addEventListener("click", function (evt) {
      evt.preventDefault();
      var src = btn.getAttribute("data-src");
      window.open(githubUrlFor(src), "_blank", "noopener");
    });
  });

  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }
});
