/*
 * Contents rail. Shared across all lessons.
 *
 * Builds a sticky left-hand rail from the page's own <h2>s and marks the
 * section you are reading. Lessons do not author it: drop this script in and
 * the rail appears on screens wide enough for it, which is what stops a wide
 * window from being half empty.
 *
 * Nothing here runs below 64rem; the stylesheet hides .rail there.
 */
(function () {
  "use strict";

  function slug(text, taken) {
    var base = text.toLowerCase().trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .slice(0, 48) || "section";
    var id = base, n = 2;
    while (taken[id]) { id = base + "-" + n++; }
    taken[id] = true;
    return id;
  }

  function build() {
    var main = document.querySelector(".wrap");
    if (!main) return;

    var heads = Array.prototype.slice.call(main.querySelectorAll(":scope > h2"));
    if (heads.length < 2) return;

    var taken = {};
    Array.prototype.forEach.call(document.querySelectorAll("[id]"), function (el) {
      taken[el.id] = true;
    });

    var rail = document.createElement("aside");
    rail.className = "rail";
    var heading = document.createElement("h2");
    heading.textContent = "In this lesson";
    var nav = document.createElement("nav");
    nav.setAttribute("aria-label", "Contents");
    var list = document.createElement("ol");

    var links = heads.map(function (h) {
      if (!h.id) h.id = slug(h.textContent, taken);
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = "#" + h.id;
      a.textContent = h.textContent;
      li.appendChild(a);
      list.appendChild(li);
      return a;
    });

    nav.appendChild(list);
    rail.appendChild(heading);
    rail.appendChild(nav);

    // The rail is the second grid child, so the stylesheet can place it in
    // column one and span it down the page.
    var masthead = main.querySelector(".masthead");
    if (masthead && masthead.nextSibling) {
      main.insertBefore(rail, masthead.nextSibling);
    } else {
      main.insertBefore(rail, main.firstChild);
    }

    track(heads, links);
  }

  function track(heads, links) {
    if (!("IntersectionObserver" in window)) return;

    var seen = {};
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        seen[entry.target.id] = entry.isIntersecting;
      });
      var current = null;
      for (var i = 0; i < heads.length; i++) {
        if (seen[heads[i].id]) { current = heads[i].id; break; }
      }
      // Past the last heading nothing intersects, so keep the last one lit.
      if (!current) {
        for (var j = heads.length - 1; j >= 0; j--) {
          if (heads[j].getBoundingClientRect().top < 0) { current = heads[j].id; break; }
        }
      }
      links.forEach(function (a) {
        if (a.hash === "#" + current) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
    }, { rootMargin: "0px 0px -70% 0px" });

    heads.forEach(function (h) { observer.observe(h); });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();
