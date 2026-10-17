(function () {
  var root = document.documentElement;

  // Theme toggle
  var toggle = document.querySelector(".theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem("theme", next);
      } catch (e) {}
    });
  }

  // Footer year
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Project filters
  var filters = document.querySelectorAll(".filter");
  var projects = document.querySelectorAll(".project");
  var empty = document.getElementById("empty-state");
  var earlier = document.getElementById("earlier-projects");

  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var cat = btn.getAttribute("data-filter");
      filters.forEach(function (b) {
        b.setAttribute("aria-pressed", b === btn ? "true" : "false");
      });
      var shown = 0;
      projects.forEach(function (p) {
        var cats = (p.getAttribute("data-category") || "").split(" ");
        var match = cat === "all" || cats.indexOf(cat) !== -1;
        p.hidden = !match;
        if (match) shown++;
      });
      if (empty) empty.hidden = shown !== 0;
      if (earlier) earlier.hidden = cat !== "all";
    });
  });
})();

// Table of contents: highlight the section currently in view
(function () {
  var links = document.querySelectorAll(".toc a[href^='#']");
  if (!links.length || !("IntersectionObserver" in window)) return;

  var byId = {};
  var sections = [];
  links.forEach(function (a) {
    var id = a.getAttribute("href").slice(1);
    var el = document.getElementById(id);
    if (el) {
      byId[id] = a;
      sections.push(el);
    }
  });

  function setActive(id) {
    links.forEach(function (a) {
      a.classList.toggle("active", a === byId[id]);
    });
  }

  var visible = {};
  var last = sections[sections.length - 1].id;

  function atBottom() {
    return window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
  }

  function update() {
    // Short final sections never reach the top of the viewport; mark the last one at page bottom
    if (atBottom()) return setActive(last);
    for (var i = 0; i < sections.length; i++) {
      if (visible[sections[i].id]) return setActive(sections[i].id);
    }
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        visible[e.target.id] = e.isIntersecting;
      });
      update();
    },
    { rootMargin: "-80px 0px -55% 0px" }
  );
  sections.forEach(function (s) {
    observer.observe(s);
  });
  setActive(sections[0].id);
  window.addEventListener("scroll", update, { passive: true });
})();
