/**
 * Yuanmei Printing — Animation Engine
 * Scroll reveal, counters, parallax, tilt, nav morph
 */
(function () {
  "use strict";

  // ============================================================
  // 1. INTERSECTION OBSERVER — Scroll Reveal
  // ============================================================
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.dataset.revealDelay || 0;

          setTimeout(() => {
            el.classList.add("revealed");
          }, delay);

          // Stagger children on parent elements
          if (el.dataset.revealStagger) {
            const children = el.querySelectorAll("[data-reveal]");
            children.forEach((child, i) => {
              const staggerDelay = (el.dataset.revealStagger || 100) * i;
              setTimeout(() => {
                child.classList.add("revealed");
              }, staggerDelay);
            });
          }

          revealObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll("[data-reveal]").forEach((el) => {
    revealObserver.observe(el);
  });

  // Also observe stagger parents
  document.querySelectorAll("[data-reveal-stagger]").forEach((el) => {
    revealObserver.observe(el);
  });

  // ============================================================
  // 2. STATS COUNTER — Animate numbers
  // ============================================================
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          animateCounter(el);
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  function animateCounter(el) {
    const targetText = el.dataset.count || el.textContent.trim();
    const isPlus = targetText.includes("+");
    const isSlash = targetText.includes("/");
    const numStr = targetText.replace(/[^0-9]/g, "");
    const target = parseInt(numStr, 10);

    if (isNaN(target)) return;

    const duration = 2000;
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);

      let display = String(current);
      if (isPlus) display += "+";
      if (isSlash) display = "24/7";

      el.textContent = display;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  document.querySelectorAll("[data-count]").forEach((el) => {
    counterObserver.observe(el);
  });

  // ============================================================
  // 3. NAVIGATION — Scroll morph
  // ============================================================
  const nav = document.querySelector(".nav");
  if (nav) {
    let ticking = false;

    function updateNav() {
      const scrollY = window.scrollY;
      if (scrollY > 80) {
        nav.classList.add("nav-scrolled");
      } else {
        nav.classList.remove("nav-scrolled");
      }
      ticking = false;
    }

    window.addEventListener("scroll", () => {
      lastScroll = window.scrollY;
      if (!ticking) {
        requestAnimationFrame(updateNav);
        ticking = true;
      }
    }, { passive: true });
  }

  // ============================================================
  // 4. 3D TILT — Product cards & machinery cards
  // ============================================================
  document.querySelectorAll("[data-tilt]").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      card.style.transition = "transform 0.1s ease-out";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
      card.style.transition = "transform 0.5s ease-out";
    });
  });

  // ============================================================
  // 5. HERO — Parallax floating shapes
  // ============================================================
  const heroShapes = document.querySelectorAll(".hero-floating-shape");
  if (heroShapes.length) {
    window.addEventListener(
      "mousemove",
      (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;

        heroShapes.forEach((shape, i) => {
          const factor = (i + 1) * 0.5;
          shape.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
        });
      },
      { passive: true }
    );
  }

  // ============================================================
  // 6. BUTTON RIPPLE
  // ============================================================
  document.querySelectorAll(".btn-ripple").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      ripple.className = "ripple-effect";
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // ============================================================
  // 7. IMAGE PARALLAX on scroll
  // ============================================================
  document.querySelectorAll("[data-parallax]").forEach((el) => {
    window.addEventListener(
      "scroll",
      () => {
        const speed = el.dataset.parallax || 0.3;
        const rect = el.getBoundingClientRect();
        const scrolled = rect.top / window.innerHeight;
        el.style.transform = `translateY(${scrolled * speed * 100}px)`;
      },
      { passive: true }
    );
  });
})();
