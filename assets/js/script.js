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


    } finally {
      formBtn.innerHTML = originalBtnHtml;
    }
  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    const target = this.innerText.trim().toLowerCase();

    navigationLinks.forEach(link => link.classList.remove("active"));
    this.classList.add("active");

    pages.forEach(page => {
      const pageName = page.dataset.page.toLowerCase();
      if (target === pageName ||
          (target.startsWith("project") && pageName.startsWith("project")) ||
          (target.startsWith("certif") && pageName.startsWith("certif"))) {
        page.classList.add("active");
        window.scrollTo(0, 0);
      } else {
        page.classList.remove("active");
      }
    });

  });
}