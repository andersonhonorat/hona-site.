document.addEventListener("DOMContentLoaded", () => {
  const revealSelectors = [
    ".category-intro", ".category-buttons a",
    ".section-heading", ".service-card", ".account-management-card",
    ".plans-heading", ".plan-card",
    ".method-intro", ".method-flow article",
    ".about-art", ".about-copy",
    ".faq-heading", ".faq-list details",
    ".contact-kicker", ".contact h2", ".contact p", ".contact-button"
  ];
  const revealEls = document.querySelectorAll(revealSelectors.join(","));

  if (!("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    revealEls.forEach((el, index) => {
      el.classList.add("reveal");
      el.style.transitionDelay = `${(index % 4) * 90}ms`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -4% 0px" }
    );

    revealEls.forEach((el) => observer.observe(el));
  }

  const faqItems = document.querySelectorAll(".faq-list details");

  faqItems.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) otherItem.open = false;
      });
    });
  });

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function smoothScrollTo(target, duration = 1100) {
    const style = getComputedStyle(target);
    const scrollMarginTop = parseFloat(style.scrollMarginTop) || 0;
    const startY = window.scrollY;
    const targetY = target.getBoundingClientRect().top + window.scrollY - scrollMarginTop;
    const distance = targetY - startY;
    let startTime = null;

    function step(currentTime) {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, startY + distance * easeInOutCubic(progress));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      const target = targetId && targetId !== "#" ? document.querySelector(targetId) : null;
      if (!target) return;
      event.preventDefault();
      smoothScrollTo(target, 1100);
    });
  });
});
