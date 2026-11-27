
/* =====================================================
   KNIGHT RIDERS SAFETY SOLUTIONS
   COMPLETE SCRIPT.JS
   MOBILE MENU AUTO CLOSE + GOOGLE SHEETS
===================================================== */

/* 01. STICKY HEADER */
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  header?.classList.toggle("scrolled", window.scrollY > 15);
}, { passive: true });


/* =====================================================
   02. MOBILE NAVIGATION - AUTO CLOSE ON SCROLL
===================================================== */

const toggle = document.querySelector(".menu-toggle");
const links = document.querySelector(".navlinks");

function closeMobileMenu() {
  if (!toggle || !links) return;

  links.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Open navigation");
  toggle.textContent = "☰";
}

toggle?.addEventListener("click", () => {
  if (!links) return;

  const opened = links.classList.toggle("open");

  toggle.setAttribute("aria-expanded", String(opened));
  toggle.setAttribute(
    "aria-label",
    opened ? "Close navigation" : "Open navigation"
  );
  toggle.textContent = opened ? "✕" : "☰";
});

document.querySelectorAll(".navlinks a").forEach(link => {
  link.addEventListener("click", closeMobileMenu);
});

/* Close menu when scrolling */
let lastMenuScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  if (
    links?.classList.contains("open") &&
    Math.abs(window.scrollY - lastMenuScrollY) > 2
  ) {
    closeMobileMenu();
  }

  lastMenuScrollY = window.scrollY;
}, { passive: true });

/* Close menu on mobile swipe */
let menuTouchY = null;

links?.addEventListener("touchstart", event => {
  menuTouchY = event.touches[0]?.clientY ?? null;
}, { passive: true });

links?.addEventListener("touchmove", event => {
  if (menuTouchY === null) return;

  const currentY = event.touches[0]?.clientY;
  if (currentY === undefined) return;

  if (Math.abs(currentY - menuTouchY) > 12) {
    closeMobileMenu();
    menuTouchY = null;
  }
}, { passive: true });

/* Close when clicking outside */
document.addEventListener("click", event => {
  if (
    links &&
    toggle &&
    !links.contains(event.target) &&
    !toggle.contains(event.target)
  ) {
    closeMobileMenu();
  }
});

/* Close on Escape */
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeMobileMenu();
});

/* Close when switching to desktop */
window.addEventListener("resize", () => {
  if (window.innerWidth > 800) closeMobileMenu();
});


/* =====================================================
   03. SCROLL REVEAL ANIMATIONS
===================================================== */

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.07 });

  document.querySelectorAll(".reveal").forEach(el => {
    observer.observe(el);
  });
} else {
  document.querySelectorAll(".reveal").forEach(el => {
    el.classList.add("visible");
  });
}


/* =====================================================
   04. OFFLINE SVG ICONS
===================================================== */

const iconPaths = {
  "shield-check":
    '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',

  "users":
    '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',

  "siren":
    '<path d="M7 18v-6a5 5 0 0 1 10 0v6M5 18h14v3H5zM12 2v2M4.93 5.93 6.34 7.34M19.07 5.93l-1.41 1.41M2 12h2M20 12h2"/>',

  "building-2":
    '<rect x="4" y="2" width="16" height="20" rx="1"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/>',

  "user-round-check":
    '<circle cx="10" cy="8" r="4"/><path d="M16 21v-2a6 6 0 0 0-12 0v2m12-8 2 2 4-4"/>',

  "clipboard-check":
    '<rect x="5" y="4" width="14" height="18" rx="2"/><path d="M9 4.5h6M9 13l2 2 4-4"/>',

  "shield-alert":
    '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="M12 8v5M12 17h.01"/>',

  "layers-3":
    '<path d="m12 2 9 5-9 5-9-5 9-5Zm-9 10 9 5 9-5m-18 5 9 5 9-5"/>',

  "badge-check":
    '<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/>',

  "flag":
    '<path d="M4 22V4M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1"/>',

  "moon":
    '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',

  "target":
    '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',

  "flame":
    '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5Z"/>',

  "factory":
    '<path d="M2 20V8l6 4V8l6 4V4h8v16Z"/><path d="M17 16h1M12 16h1M7 16h1"/>',

  "extinguisher":
    '<path d="M15 6.5V3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3.5M9 18h8M18 3h-3M11 3a6 6 0 0 0-6 6v11M5 13h4"/><path d="M17 10a4 4 0 0 0-8 0v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2Z"/>',

  "droplets":
    '<path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4.05 4.05Z"/><path d="M12.56 6.6A11 11 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/>',

  "cog":
    '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"/>',

  "bug":
    '<path d="m8 2 1.88 1.88M14.12 3.88 16 2M9 7.13v-1a3 3 0 1 1 6 0v1"/><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6ZM12 20v-9M6.53 9C4.6 8.8 3 7.1 3 5M6 13H2M3 21c0-2.1 1.7-3.9 3.8-4M20.97 5c0 2.1-1.6 3.8-3.5 4M22 13h-4M17.2 17c2.1.1 3.8 1.9 3.8 4"/>'
};

document.querySelectorAll("[data-icon]").forEach(el => {
  const path = iconPaths[el.dataset.icon];

  if (path) {
    el.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true">' +
      path +
      "</svg>";
  }
});


/* =====================================================
   05. TRAINING CAROUSEL
===================================================== */

const carousel = document.querySelector(".training-carousel");

if (carousel) {
  const track = carousel.querySelector(".training-track");
  const slides = [...carousel.querySelectorAll(".training-slide")];
  const max = slides.length;

  let index = 0;
  let timer;
  let touchStart = null;

  if (track && max > 0) {
    const update = () => {
      track.style.transform = `translateX(-${index * 100}%)`;

      const current = carousel.querySelector(".training-current");
      const progress = carousel.querySelector(".progress-fill");

      if (current) {
        current.textContent = String(index + 1).padStart(2, "0");
      }

      if (progress) {
        progress.style.width = (100 * (index + 1) / max) + "%";
      }

      slides.forEach((slide, i) => {
        slide.setAttribute("aria-hidden", String(i !== index));
      });
    };

    const go = n => {
      index = (n + max) % max;
      update();
    };

    const restart = () => {
      clearInterval(timer);

      if (
        !document.hidden &&
        carousel.dataset.inview === "true" &&
        !matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        timer = setInterval(() => go(index + 1), 5500);
      }
    };

    carousel.querySelector(".training-prev")
      ?.addEventListener("click", () => {
        go(index - 1);
        restart();
      });

    carousel.querySelector(".training-next")
      ?.addEventListener("click", () => {
        go(index + 1);
        restart();
      });

    carousel.addEventListener("keydown", e => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        go(index + (e.key === "ArrowRight" ? 1 : -1));
        restart();
      }
    });

    carousel.addEventListener("touchstart", e => {
      touchStart = e.changedTouches[0].clientX;
    }, { passive: true });

    carousel.addEventListener("touchend", e => {
      if (touchStart === null) return;

      const dx = e.changedTouches[0].clientX - touchStart;

      if (Math.abs(dx) > 45) {
        go(index + (dx < 0 ? 1 : -1));
        restart();
      }

      touchStart = null;
    }, { passive: true });

    carousel.addEventListener("mouseenter", () => clearInterval(timer));
    carousel.addEventListener("mouseleave", restart);
    carousel.addEventListener("focusin", () => clearInterval(timer));
    carousel.addEventListener("focusout", restart);

    document.addEventListener("visibilitychange", restart);

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(entries => {
        carousel.dataset.inview = String(entries[0].isIntersecting);
        restart();
      }, { threshold: 0.15 }).observe(carousel);
    } else {
      carousel.dataset.inview = "true";
      restart();
    }

    update();
  }
}


/* =====================================================
   06. GALLERY FILTER + LIGHTBOX
===================================================== */

const tiles = [...document.querySelectorAll(".gallery-tile")];
const filterBtns = [...document.querySelectorAll(".filter-pill")];
const modal = document.querySelector(".lightbox");

let activeTiles = tiles;
let modalIndex = 0;
let previousFocus = null;

function filterGallery(category) {
  activeTiles = tiles.filter(tile =>
    category === "all" || tile.dataset.category === category
  );

  tiles.forEach(tile => {
    tile.hidden = !activeTiles.includes(tile);
  });

  filterBtns.forEach(button => {
    const active = button.dataset.filter === category;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  const count = document.querySelector(".gallery-count");

  if (count) count.textContent = activeTiles.length + " photographs";
}

filterBtns.forEach(button => {
  button.addEventListener("click", () => {
    filterGallery(button.dataset.filter);
  });
});

function setModalPhoto() {
  if (!modal) return;

  const item = activeTiles[modalIndex];
  if (!item) return;

  const image = item.querySelector("img");
  const modalImage = modal.querySelector(".modal-image-wrap img");

  if (image && modalImage) {
    modalImage.src = image.src;
    modalImage.alt = image.alt;
  }

  const caption = modal.querySelector(".modal-caption");
  const count = modal.querySelector(".modal-count");

  if (caption) {
    caption.textContent =
      item.querySelector("strong")?.textContent || "";
  }

  if (count) {
    count.textContent =
      String(modalIndex + 1).padStart(2, "0") +
      " / " +
      String(activeTiles.length).padStart(2, "0");
  }
}

function openModal(item) {
  if (!modal) return;

  previousFocus = document.activeElement;
  modalIndex = activeTiles.indexOf(item);

  if (modalIndex < 0) return;

  setModalPhoto();
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
  modal.querySelector(".modal-close")?.focus();
}

function closeModal() {
  if (!modal) return;

  modal.classList.remove("open");
  document.body.style.overflow = "";
  previousFocus?.focus();
}

function moveModal(n) {
  if (!activeTiles.length) return;

  modalIndex =
    (modalIndex + n + activeTiles.length) % activeTiles.length;

  setModalPhoto();
}

tiles.forEach(item => {
  item.addEventListener("click", () => openModal(item));
});

modal?.querySelector(".modal-close")
  ?.addEventListener("click", closeModal);

modal?.querySelector(".modal-prev")
  ?.addEventListener("click", () => moveModal(-1));

modal?.querySelector(".modal-next")
  ?.addEventListener("click", () => moveModal(1));

modal?.addEventListener("click", e => {
  if (e.target === modal) closeModal();
});

document.addEventListener("keydown", e => {
  if (!modal?.classList.contains("open")) return;

  if (e.key === "Escape") closeModal();
  if (e.key === "ArrowLeft") moveModal(-1);
  if (e.key === "ArrowRight") moveModal(1);

  if (e.key === "Tab") {
    const buttons = [...modal.querySelectorAll("button")];

    if (!buttons.length) return;

    const first = buttons[0];
    const last = buttons[buttons.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});

if (tiles.length) filterGallery("all");


/* =====================================================
   07. GOOGLE SHEETS CONTACT FORM
   NO REDIRECT + 3 SECOND POPUP
===================================================== */

(() => {
  const form = document.getElementById("enquiry-form");
  if (!form) return;

  const submitButton = form.querySelector('button[type="submit"]');
  const originalText =
    submitButton?.textContent?.trim() || "Send Enquiry ↗";

  let submitting = false;
  let popupTimer = null;

  /* Create notification */
  const popup = document.createElement("div");

  popup.className = "krss-form-toast";
  popup.setAttribute("role", "status");
  popup.setAttribute("aria-live", "polite");

  popup.innerHTML = `
    <span class="krss-toast-icon" aria-hidden="true">✓</span>

    <div class="krss-toast-copy">
      <strong class="krss-toast-title">Thank You!</strong>
      <p class="krss-toast-description">
        Your enquiry has been sent for processing.
      </p>
    </div>

    <button
      type="button"
      class="krss-toast-close"
      aria-label="Close notification"
    >×</button>
  `;

  document.body.appendChild(popup);

  function closePopup() {
    popup.classList.remove("show");
  }

  popup.querySelector(".krss-toast-close")
    .addEventListener("click", () => {
      clearTimeout(popupTimer);
      closePopup();
    });

  function showPopup(title, message, isError = false) {
    clearTimeout(popupTimer);

    popup.classList.toggle("error", isError);

    popup.querySelector(".krss-toast-icon").textContent =
      isError ? "!" : "✓";

    popup.querySelector(".krss-toast-title").textContent = title;
    popup.querySelector(".krss-toast-description").textContent = message;

    popup.classList.add("show");

    popupTimer = setTimeout(closePopup, 3000);
  }

  form.addEventListener("submit", async event => {
    event.preventDefault();

    if (submitting || !form.reportValidity()) return;

    const scriptURL = form.action;

    if (
      !scriptURL.startsWith(
        "https://script.google.com/macros/s/"
      )
    ) {
      showPopup(
        "Setup Required",
        "Google Apps Script URL is missing.",
        true
      );
      return;
    }

    submitting = true;

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Submitting Enquiry...";
      submitButton.setAttribute("aria-busy", "true");
    }

    try {
      const formData = new FormData(form);

      await fetch(scriptURL, {
        method: "POST",
        mode: "no-cors",
        body: formData,
        redirect: "follow"
      });

      /*
        no-cors returns an opaque response.
        Browser cannot verify whether the Google Sheet
        row was saved or the customer email was sent.
      */

      showPopup(
        "Thank You!",
        "Your enquiry has been sent for processing."
      );

      form.reset();

    } catch (error) {
      console.error("KRSS Form Submission Error:", error);

      showPopup(
        "Unable to Send",
        "Please try again or contact us by phone.",
        true
      );

    } finally {
      submitting = false;

      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
        submitButton.removeAttribute("aria-busy");
      }
    }
  });
})();

/* END OF KRSS SCRIPT.JS */
