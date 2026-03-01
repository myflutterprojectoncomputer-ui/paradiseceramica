(function () {
  const menuToggle = document.getElementById("menuToggle");
  const siteNav = document.getElementById("siteNav");
  const yearNode = document.getElementById("year");
  const siteHeader = document.querySelector(".site-header");

  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }

  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", function () {
      const isOpen = siteNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    siteNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        siteNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", function (event) {
      const clickedInsideNav = siteNav.contains(event.target);
      const clickedToggle = menuToggle.contains(event.target);
      if (!clickedInsideNav && !clickedToggle) {
        siteNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  const currentPage = document.body.getAttribute("data-page");
  if (currentPage && siteNav) {
    siteNav.querySelectorAll("a").forEach(function (link) {
      if (link.getAttribute("href") === currentPage + ".html" || (currentPage === "home" && link.getAttribute("href") === "index.html")) {
        link.classList.add("active");
      }
    });
  }

  const mobileTabbar = document.querySelector(".mobile-tabbar");
  if (currentPage && mobileTabbar) {
    mobileTabbar.querySelectorAll("a").forEach(function (link) {
      const href = link.getAttribute("href");
      if (href === currentPage + ".html" || (currentPage === "home" && href === "index.html")) {
        link.classList.add("active");
      }
    });
  }

  const revealNodes = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealNodes.length > 0) {
    const observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealNodes.forEach(function (node) {
      observer.observe(node);
    });
  } else {
    revealNodes.forEach(function (node) {
      node.classList.add("visible");
    });
  }

  const params = new URLSearchParams(window.location.search);
  const product = params.get("product");
  const messageEl = document.getElementById("message");
  if (product && messageEl && messageEl.value.trim() === "") {
    messageEl.value = "I am interested in: " + product;
  }

  const setHeaderState = function () {
    if (!siteHeader) {
      return;
    }
    if (window.scrollY > 12) {
      siteHeader.classList.add("is-scrolled");
    } else {
      siteHeader.classList.remove("is-scrolled");
    }
  };

  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });
})();
