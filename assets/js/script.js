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