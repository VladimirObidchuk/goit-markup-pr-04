/* #region modal */
(() => {
  const refs = {
    // Додати атрибут data-modal-open на кнопку відкриття
    openModalBtn: document.querySelector("[data-modal-open]"),
    // Додати атрибут data-modal-close на кнопку закриття
    closeModalBtn: document.querySelector("[data-modal-close]"),
    // Додати атрибут data-modal на бекдроп модалки
    modal: document.querySelector("[data-modal]"),
  };

  refs.openModalBtn.addEventListener("click", toggleModal);
  refs.closeModalBtn.addEventListener("click", toggleModal);

  function toggleModal() {
    // is-open це клас який буде додаватися/забиратися на бекдроп при натисканні на кнопки
    refs.modal.classList.toggle("is-open");
  }

  const order = {
    //Додати атрибут data-modal-order-open на кнопку відкриття order window
    openOrderBtnHeader: document.querySelector("[data-modal-order-open]"),
    openOrderBtnHero: document.querySelector("[data-order-open]"),
    openOrderBtnAbout: document.querySelector("[data-about-order-open]"),
    // Додати атрибут data-modal-order-close на кнопку закриття order window
    closeOrderlBtn: document.querySelector("[data-modal-order-close]"),
    // Додати атрибут data-modal-order на бекдроп модалки order window
    modalOrder: document.querySelector("[data-modal-order]"),
  };

  order.openOrderBtnHeader.addEventListener("click", toggleOrderOpen);
  order.openOrderBtnHero.addEventListener("click", toggleOrderOpen);
  order.openOrderBtnAbout.addEventListener("click", toggleOrderOpen);
  order.closeOrderlBtn.addEventListener("click", toggleOrderOpen);
  function toggleOrderOpen() {
    // is-open це клас який буде додаватися/забиратися на бекдроп при натисканні на кнопки
    order.modalOrder.classList.toggle("is-open");
  }
})();
/* #endregion */
/* #region swiper */
new Swiper(".swiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  loop: true,
  breakpoints: {
    768: {
      slidesPerView: 1,
    },
  },
});
/* #endregion */
/* #region badInput */
(() => {
  const dataFormOrder = document.querySelector("[data-form-order]");
  const fields = dataFormOrder.querySelectorAll("input");
  const formOrder = {
    dataErrorName: dataFormOrder.querySelector("[data-error-name]"),
    dataErrorTel: dataFormOrder.querySelector("[data-error-tel]"),
    dataErrorEmail: dataFormOrder.querySelector("[data-error-email]"),
    dataErrorMessage: dataFormOrder.querySelector("[data-error-message]"),
    dataFormSubmit: dataFormOrder.querySelector("[data-form-submit]"),
  };
  const tooltip = document.getElementById("tooltip");

  dataFormOrder.addEventListener("submit", formSubmit);

  fields.forEach((field) => {
    field.addEventListener("input", validateField);
  });

  function formSubmit(e) {
    e.preventDefault();
    console.log("submit");

    let allFieldsEmpty = true;

    fields.forEach((field) => {
      const errorMessage = field.nextElementSibling;

      if (errorMessage && errorMessage.classList.contains("error-message")) {
        const errorText = errorMessage.querySelector(".error-text");

        if (!field.value) {
          errorMessage.classList.add("error-open");
          errorText.textContent = "This field is required.";
          allFieldsEmpty = false;
        } else {
          validateField({ target: field });
          allFieldsEmpty = true;
        }
      }
    });

    if (!allFieldsEmpty) {
      tooltip.classList.add("tooltip-visible");
    } else {
      tooltip.classList.remove("tooltip-visible");
    }
  }

  function validateField(e) {
    const field = e.target;
    const errorMessage = field.nextElementSibling;

    if (errorMessage && errorMessage.classList.contains("error-message")) {
      const errorText = errorMessage.querySelector(".error-text");

      if (!field.value) {
        errorMessage.classList.add("error-open");
        errorText.textContent = "This field is required.";
      } else {
        errorMessage.classList.remove("error-open");
        errorText.textContent = "";

        if (
          field === formOrder.dataErrorName &&
          (field.value.length < 3 || field.value.length > 25)
        ) {
          errorMessage.classList.add("error-open");
          errorText.textContent =
            "The name must be between 3 and 25 characters.";
        }

        if (field === formOrder.dataErrorEmail && !validateEmail(field.value)) {
          errorMessage.classList.add("error-open");
          errorText.textContent = "Please enter a valid email address.";
        }

        if (field === formOrder.dataErrorTel && !validateTel(field.value)) {
          errorMessage.classList.add("error-open");
          errorText.textContent =
            "Please enter a valid phone number in format +38(0__) ___ __ __.";
        }
      }
    }
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function validateTel(tel) {
    const re = /^\+38\(0\d{2}\) \d{3} \d{2} \d{2}$/;
    return re.test(tel);
  }
})();

/* #endregion */
