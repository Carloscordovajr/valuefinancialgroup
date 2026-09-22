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

  /* ---------- Mortgage calculator ---------- */
  var calcForm = document.getElementById("calc-form");
  if (calcForm) {
    var els = {
      price: document.getElementById("calc-price"),
      down: document.getElementById("calc-down"),
      rate: document.getElementById("calc-rate"),
      term: document.getElementById("calc-term"),
      tax: document.getElementById("calc-tax"),
      insurance: document.getElementById("calc-insurance"),
      hoa: document.getElementById("calc-hoa"),
      closingPct: document.getElementById("calc-closing"),
    };
    var out = {
      pi: document.getElementById("result-pi"),
      tax: document.getElementById("result-tax"),
      insurance: document.getElementById("result-insurance"),
      hoa: document.getElementById("result-hoa"),
      total: document.getElementById("result-total"),
      cashToClose: document.getElementById("result-cashclose"),
      loanAmount: document.getElementById("result-loanamount"),
    };

    function toNumber(val) {
      var n = parseFloat(String(val).replace(/,/g, ""));
      return isNaN(n) || n < 0 ? 0 : n;
    }

    function formatCurrency(n) {
      return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
    }

    function calculate() {
      var price = toNumber(els.price.value);
      var downPct = toNumber(els.down.value);
      var rate = toNumber(els.rate.value) / 100 / 12;
      var termYears = toNumber(els.term.value) || 30;
      var termMonths = termYears * 12;
      var taxRate = toNumber(els.tax.value) / 100 / 12;
      var annualInsurance = toNumber(els.insurance.value);
      var hoa = toNumber(els.hoa.value);
      var closingPct = toNumber(els.closingPct.value);

      var downAmount = price * (downPct / 100);
      var loanAmount = Math.max(price - downAmount, 0);

      var monthlyPI = 0;
      if (rate > 0) {
        var factor = Math.pow(1 + rate, termMonths);
        monthlyPI = loanAmount * (rate * factor) / (factor - 1);
      } else if (termMonths > 0) {
        monthlyPI = loanAmount / termMonths;
      }

      var monthlyTax = price * taxRate;
      var monthlyInsurance = annualInsurance / 12;
      var totalMonthly = monthlyPI + monthlyTax + monthlyInsurance + hoa;

      var closingCosts = price * (closingPct / 100);
      var cashToClose = downAmount + closingCosts;

      out.pi.textContent = formatCurrency(monthlyPI);
      out.tax.textContent = formatCurrency(monthlyTax);
      out.insurance.textContent = formatCurrency(monthlyInsurance);
      out.hoa.textContent = formatCurrency(hoa);
      out.total.textContent = formatCurrency(totalMonthly);
      out.cashToClose.textContent = formatCurrency(cashToClose);
      if (out.loanAmount) out.loanAmount.textContent = formatCurrency(loanAmount);
    }

    Object.keys(els).forEach(function (key) {
      if (els[key]) {
        els[key].addEventListener("input", calculate);
      }
    });
    calculate();
  }

  /* ---------- Consultation form ---------- */
  var leadForm = document.getElementById("consultation-form");
  if (leadForm) {
    leadForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var formFields = leadForm.querySelector(".consult-fields");
      var success = document.getElementById("form-success");
      if (formFields) formFields.style.display = "none";
      if (success) success.classList.add("is-visible");
      success && success.setAttribute("tabindex", "-1");
      success && success.focus();
    });
  }

  /* ---------- Current year ---------- */
  var yearEl = document.getElementById("current-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
