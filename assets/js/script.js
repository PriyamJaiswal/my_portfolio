'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebarBtn) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}

// contact variables



// Certificate modal variables & logic
const certCards = document.querySelectorAll("[data-certificate-card]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalTime = document.querySelector("[data-modal-time]");
const modalText = document.querySelector("[data-modal-text]");
const modalLink = document.querySelector("[data-modal-link]");

const toggleModal = function () {
  if (modalContainer && overlay) {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  }
};

certCards.forEach(card => {
  const openModal = function () {
    const img = card.querySelector("[data-cert-img]");
    const title = card.querySelector("[data-cert-title]");
    const date = card.querySelector("[data-cert-date]");
    const desc = card.querySelector("[data-cert-desc]");
    const issuer = card.querySelector("[data-cert-issuer]");

    if (modalImg && img) {
      modalImg.src = img.src;
      modalImg.alt = img.alt;
    }
    if (modalLink && img) {
      modalLink.href = img.src;
    }
    if (modalTitle && title) {
      modalTitle.innerText = title.innerText + (issuer ? " — " + issuer.innerText : "");
    }
    if (modalTime && date) {
      modalTime.innerText = date.innerText;
      modalTime.setAttribute("datetime", date.getAttribute("datetime") || "");
    }
    if (modalText && desc) {
      modalText.innerHTML = `<p>${desc.innerText}</p>`;
    }
    toggleModal();
  };

  const triggers = card.querySelectorAll("[data-cert-trigger], [data-cert-preview]");
  triggers.forEach(trigger => trigger.addEventListener("click", openModal));
});

if (modalCloseBtn) modalCloseBtn.addEventListener("click", toggleModal);
if (overlay) overlay.addEventListener("click", toggleModal);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    if (lastClickedBtn) lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables & direct email submission
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");
const formStatus = document.querySelector("[data-form-status]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form && form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else if (formBtn) {
      formBtn.setAttribute("disabled", "");
    }

  });
}

// contact form submission directly via WhatsApp and backup delivery
if (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const originalBtnHtml = formBtn.innerHTML;
    formBtn.setAttribute("disabled", "");
    formBtn.innerHTML = '<ion-icon name="logo-whatsapp"></ion-icon><span>Opening WhatsApp...</span>';

    if (formStatus) {
      formStatus.style.display = "none";
      formStatus.className = "form-status";
    }

    const nameVal = form.querySelector('[name="name"]')?.value || "";
    const emailVal = form.querySelector('[name="email"]')?.value || "";
    const phoneVal = form.querySelector('[name="phone"]')?.value || "";
    const messageVal = form.querySelector('[name="message"]')?.value || "";

    // Construct formatted WhatsApp text
    const waText = `Hi Priyam!\n\n👤 *Name:* ${nameVal}\n📧 *Email:* ${emailVal}\n📱 *Mobile:* ${phoneVal}\n\n💬 *Message:*\n${messageVal}`;
    const waUrl = `https://wa.me/918953451053?text=${encodeURIComponent(waText)}`;

    const formData = new FormData(form);

    // Send backup copy in background via FormSubmit
    fetch("https://formsubmit.co/ajax/priyamj608@gmail.com", {
      method: "POST",
      headers: { 'Accept': 'application/json' },
      body: formData
    }).catch(() => {});

    // Show instant success feedback
    if (formStatus) {
      formStatus.className = "form-status success";
      formStatus.style.display = "flex";
      formStatus.innerHTML = '<ion-icon name="checkmark-circle-outline"></ion-icon><span>Redirecting to WhatsApp! Your message has also been saved.</span>';
    }

    // Open WhatsApp directly
    setTimeout(() => {
      window.open(waUrl, "_blank");
      form.reset();
      formBtn.innerHTML = originalBtnHtml;
      formBtn.setAttribute("disabled", "");
    }, 400);
  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");
const pageOrder = ["about", "resume", "project", "certificates", "contact"];

function getCurrentPageIndex() {
  for (let i = 0; i < pages.length; i++) {
    if (pages[i].classList.contains("active")) {
      const pName = pages[i].dataset.page.toLowerCase();
      const idx = pageOrder.indexOf(pName);
      if (idx !== -1) return idx;
    }
  }
  return 0;
}

function navigateToIndex(newIndex, direction) {
  if (newIndex < 0 || newIndex >= pageOrder.length) return;
  const targetPage = pageOrder[newIndex];

  // update nav links
  navigationLinks.forEach(link => {
    const text = link.innerText.trim().toLowerCase();
    if (text === targetPage ||
        (targetPage === "project" && text.startsWith("project")) ||
        (targetPage === "certificates" && text.startsWith("certif"))) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // update pages with smooth slide animations
  pages.forEach(page => {
    const pageName = page.dataset.page.toLowerCase();
    page.classList.remove("slide-in-right", "slide-in-left");
    if (pageName === targetPage) {
      page.classList.add("active");
      if (direction === "next") {
        page.classList.add("slide-in-right");
      } else if (direction === "prev") {
        page.classList.add("slide-in-left");
      }
      window.scrollTo(0, 0);
    } else {
      page.classList.remove("active");
    }
  });

  // Mobile sidebar auto-expand on About section, auto-collapse on other sections
  if (sidebar && window.innerWidth < 1024) {
    if (newIndex === 0) {
      sidebar.classList.add("active");
    } else {
      sidebar.classList.remove("active");
    }
  }
}

// Click navigation
navigationLinks.forEach((link) => {
  link.addEventListener("click", function () {
    const currentIdx = getCurrentPageIndex();
    const text = this.innerText.trim().toLowerCase();
    let targetIdx = 0;
    if (text.startsWith("about")) targetIdx = 0;
    else if (text.startsWith("resume")) targetIdx = 1;
    else if (text.startsWith("project")) targetIdx = 2;
    else if (text.startsWith("certif")) targetIdx = 3;
    else if (text.startsWith("contact")) targetIdx = 4;

    const direction = targetIdx > currentIdx ? "next" : (targetIdx < currentIdx ? "prev" : "none");
    navigateToIndex(targetIdx, direction);
  });
});

// Touch / Swipe Navigation (Mobile & Tablet Slide Gesture)
let touchStartX = 0;
let touchStartY = 0;
let touchStartTime = 0;

document.addEventListener("touchstart", function (e) {
  if (e.touches.length === 1) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    touchStartTime = Date.now();
  }
}, { passive: true });

document.addEventListener("touchend", function (e) {
  if (e.changedTouches.length === 1) {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    const deltaTime = Date.now() - touchStartTime;

    const target = e.target;
    if (target.closest(".modal-container.active") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest("iframe") ||
        target.closest(".mapbox")) {
      return;
    }

    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2 && deltaTime < 650) {
      const currentIdx = getCurrentPageIndex();
      if (deltaX < 0) {
        if (currentIdx < pageOrder.length - 1) {
          navigateToIndex(currentIdx + 1, "next");
        }
      } else {
        if (currentIdx > 0) {
          navigateToIndex(currentIdx - 1, "prev");
        }
      }
    }
  }
}, { passive: true });


// Laptop & Desktop Mouse Drag Navigation
let mouseStartX = 0;
let mouseStartY = 0;
let mouseStartTime = 0;
let isMouseDragging = false;

document.addEventListener("mousedown", function (e) {
  // Only primary mouse button
  if (e.button !== 0) return;
  
  // Don't drag if clicking buttons, links, inputs, or inside modals
  if (e.target.closest("a, button, input, textarea, select, .modal-container, iframe, .mapbox, .filter-item")) {
    return;
  }

  mouseStartX = e.clientX;
  mouseStartY = e.clientY;
  mouseStartTime = Date.now();
  isMouseDragging = true;
});

document.addEventListener("mouseup", function (e) {
  if (!isMouseDragging) return;
  isMouseDragging = false;

  const deltaX = e.clientX - mouseStartX;
  const deltaY = e.clientY - mouseStartY;
  const deltaTime = Date.now() - mouseStartTime;

  if (Math.abs(deltaX) > 55 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2 && deltaTime < 700) {
    const currentIdx = getCurrentPageIndex();
    if (deltaX < 0) {
      // Dragged Left -> Next Section
      if (currentIdx < pageOrder.length - 1) {
        navigateToIndex(currentIdx + 1, "next");
      }
    } else {
      // Dragged Right -> Previous Section
      if (currentIdx > 0) {
        navigateToIndex(currentIdx - 1, "prev");
      }
    }
  }
});


// Laptop Trackpad Horizontal Swipe Navigation (Two-finger swipe)
let lastTrackpadTime = 0;

document.addEventListener("wheel", function (e) {
  // Check if horizontal scroll on trackpad
  const absX = Math.abs(e.deltaX);
  const absY = Math.abs(e.deltaY);

  if (absX > 35 && absX > absY * 1.4) {
    const now = Date.now();
    if (now - lastTrackpadTime > 650) {
      // Check if inside modal
      if (e.target.closest(".modal-container.active") || e.target.closest(".mapbox")) {
        return;
      }

      lastTrackpadTime = now;
      const currentIdx = getCurrentPageIndex();

      if (e.deltaX > 35) {
        // Trackpad Swipe Left -> Next Section
        if (currentIdx < pageOrder.length - 1) {
          navigateToIndex(currentIdx + 1, "next");
        }
      } else if (e.deltaX < -35) {
        // Trackpad Swipe Right -> Prev Section
        if (currentIdx > 0) {
          navigateToIndex(currentIdx - 1, "prev");
        }
      }
    }
  }
}, { passive: true });


// Keyboard Arrow Navigation (Left/Right)
document.addEventListener("keydown", function (e) {
  const activeEl = document.activeElement;
  if (activeEl && (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA")) {
    return;
  }
  const modal = document.querySelector(".modal-container.active");
  if (modal) return;

  const currentIdx = getCurrentPageIndex();
  if (e.key === "ArrowRight") {
    if (currentIdx < pageOrder.length - 1) {
      navigateToIndex(currentIdx + 1, "next");
    }
  } else if (e.key === "ArrowLeft") {
    if (currentIdx > 0) {
      navigateToIndex(currentIdx - 1, "prev");
    }
  }
});