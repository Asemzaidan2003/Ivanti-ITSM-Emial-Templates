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

  // If this page is itself being displayed inside someone else's iframe,
  // flag it: clipboard-write is commonly blocked cross-origin there, so the
  // CSS hides "Copy Code" and shows a banner offering "View Code" / "Open in
  // a new tab" instead, which always works since it's a top-level navigation.
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

  document.querySelectorAll(".btn-view").forEach(function (btn) {
    btn.addEventListener("click", function (evt) {
      evt.preventDefault();
      var src = btn.getAttribute("data-src");
      fetch(src)
        .then(function (res) { return res.text(); })
        .then(function (code) {
          var escaped = code
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
          var page =
            "<!doctype html><meta charset='utf-8'><title>Source</title>" +
            "<body style='margin:0;background:#0f1629'>" +
            "<pre style='color:#e5e9f5;font:12.5px/1.6 ui-monospace,Consolas,monospace;" +
            "padding:20px;white-space:pre-wrap;word-break:break-word'>" +
            escaped + "</pre></body>";
          var blob = new Blob([page], { type: "text/html" });
          var url = URL.createObjectURL(blob);
          window.open(url, "_blank", "noopener");
        })
        .catch(function () { flashButton(btn, "Couldn’t open"); });
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
