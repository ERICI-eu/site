/* ERICI: theme toggle, mobile menu and the installation picture */
(function () {
  var root = document.documentElement;
  var themeBtn = document.getElementById("theme-toggle");
  themeBtn.addEventListener("click", function () {
    var cur = root.getAttribute("data-theme") ||
              (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    var next = cur === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("erici-theme", next); } catch (e) {}
    syncFactory();
  });

  /* installation picture: an <img> cannot see the page's theme, so pass it as #light / #dark */
  var factory = document.getElementById("factory");
  function syncFactory() {
    if (!factory) return;
    var img = factory.querySelector("img");
    var t = root.getAttribute("data-theme");
    var src = "factory.svg" + (t ? "#" + t : "");
    if (img.getAttribute("src") !== src) img.setAttribute("src", src);
  }
  syncFactory();

  /* one click anywhere on it toggles between small and full width */
  if (factory) {
    factory.addEventListener("click", function () {
      var grid = factory.parentNode;
      function toggle() {
        var open = grid.classList.toggle("expanded");
        factory.setAttribute("aria-expanded", open ? "true" : "false");
        factory.title = open ? "Click to shrink" : "Click to enlarge";
      }
      if (document.startViewTransition) document.startViewTransition(toggle);
      else toggle();
    });
  }

  var nav = document.getElementById("nav");
  var menuBtn = document.getElementById("menu-toggle");
  menuBtn.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  });
  nav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      nav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    }
  });
})();
