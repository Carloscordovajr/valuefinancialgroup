(function () {
  "use strict";

  /* ---------- Sticky header state ---------- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (window.scrollY > 12) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }
  if (header) {
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Mobile menu ---------- */
  var menuToggle = document.querySelector("[data-menu-open]");
  var menuClose = document.querySelector("[data-menu-close]");
  var mobileMenu = document.querySelector(".mobile-menu");

  function openMenu() {
    mobileMenu.classList.add("is-open");
    document.body.style.overflow = "hidden";
    menuToggle.setAttribute("aria-expanded", "true");
  }
  function closeMenu() {
    mobileMenu.classList.remove("is-open");
    document.body.style.overflow = "";
    menuToggle.setAttribute("aria-expanded", "false");
  }
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", openMenu);
    menuClose.addEventListener("click", closeMenu);
    mobileMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in-view"); });
  }

  /* ---------- FAQ accordion ---------- */
  var faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(function (item) {
    var q = item.querySelector(".faq-q");
    var a = item.querySelector(".faq-a");
    q.addEventListener("click", function () {
      var isOpen = item.classList.contains("is-open");
      faqItems.forEach(function (other) {
        other.classList.remove("is-open");
        other.querySelector(".faq-a").style.maxHeight = null;
        other.querySelector(".faq-q").setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("is-open");
        a.style.maxHeight = a.scrollHeight + "px";
        q.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ---------- Lead forms (Formspree) ---------- */
  function wireLeadForm(config) {
    var form = document.getElementById(config.formId);
    if (!form) return;

    var submitBtn = document.getElementById(config.submitId);
    var submitLabel = submitBtn ? submitBtn.querySelector(".btn-label") : null;
    var defaultLabel = submitLabel ? submitLabel.textContent : "";
    var errorBox = document.getElementById(config.errorId);
    var success = document.getElementById(config.successId);
    var fieldsWrap = form.querySelector(config.fieldsSelector);

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (errorBox) {
        errorBox.textContent = "";
        errorBox.classList.remove("is-visible");
      }

      if (!form.reportValidity()) {
        return;
      }

      if (submitBtn) submitBtn.disabled = true;
      if (submitLabel) submitLabel.textContent = "Sending…";

      var formData = new FormData(form);

      fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      })
        .then(function (response) {
          if (response.ok) {
            if (fieldsWrap) fieldsWrap.style.display = "none";
            if (success) {
              success.classList.add("is-visible");
              success.setAttribute("tabindex", "-1");
              success.focus();
            }
          } else {
            return response.json().then(function (data) {
              var message =
                data && data.errors && data.errors.length
                  ? data.errors.map(function (err) { return err.message; }).join(" ")
                  : "Something went wrong sending your request. Please try again, or call us directly.";
              throw new Error(message);
            });
          }
        })
        .catch(function (err) {
          if (errorBox) {
            errorBox.textContent = err.message || "Something went wrong sending your request. Please try again, or call us directly.";
            errorBox.classList.add("is-visible");
          }
        })
        .finally(function () {
          if (submitBtn) submitBtn.disabled = false;
          if (submitLabel) submitLabel.textContent = defaultLabel;
        });
    });
  }

  wireLeadForm({
    formId: "consultation-form",
    submitId: "form-submit",
    errorId: "form-error",
    successId: "form-success",
    fieldsSelector: ".consult-fields",
  });

  wireLeadForm({
    formId: "careers-form",
    submitId: "careers-submit",
    errorId: "careers-error",
    successId: "careers-success",
    fieldsSelector: ".careers-fields",
  });

  /* ---------- Current year ---------- */
  var yearEl = document.getElementById("current-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
