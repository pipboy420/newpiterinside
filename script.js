document.addEventListener("DOMContentLoaded", () => {
  // Анимации появления
  const fadeIns = document.querySelectorAll(".fade-in");
  const slideUps = document.querySelectorAll(".slide-up");

  function handleScroll() {
    fadeIns.forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
        el.classList.add("visible");
      }
    });
    slideUps.forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
        el.classList.add("visible");
      }
    });
  }
  window.addEventListener("scroll", handleScroll);
  handleScroll();

  // Открытие модального окна по data-атрибуту
  const modalButtons = document.querySelectorAll("[data-modal]");
  modalButtons.forEach(button => {
    button.addEventListener("click", function () {
      const modalId = this.getAttribute("data-modal");
      openModal(modalId);
    });
  });

  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add("show");
      document.body.style.overflow = "hidden";
      const modalContent = modal.querySelector(".modal-content");
      if (modalContent) {
        modalContent.focus();
      }
    }
  }

  // Функция закрытия модального окна
  function closeModal(modal) {
    if (modal) {
      modal.classList.remove("show");
      document.body.style.overflow = "auto";
    }
  }

  // Закрытие модального окна при клике вне содержимого или по кнопке "закрыть"
  document.querySelectorAll(".modal").forEach(modal => {
    modal.addEventListener("click", (event) => {
      if (event.target.classList.contains("modal") || event.target.classList.contains("close")) {
        closeModal(modal);
      }
    });
  });

  // Закрытие модального окна клавишей Escape
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      document.querySelectorAll(".modal.show").forEach(modal => {
        closeModal(modal);
      });
    }
  });

  // Карусель изображений
  document.querySelectorAll(".carousel").forEach(carousel => {
    let currentIndex = 0;
    const images = carousel.querySelectorAll(".carousel-images img");

    function updateSlide(newIndex) {
      images[currentIndex].classList.remove("active");
      currentIndex = (newIndex + images.length) % images.length;
      images[currentIndex].classList.add("active");
    }

    const prevButton = carousel.querySelector(".prev");
    const nextButton = carousel.querySelector(".next");

    if (prevButton && nextButton) {
      prevButton.addEventListener("click", () => updateSlide(currentIndex - 1));
      nextButton.addEventListener("click", () => updateSlide(currentIndex + 1));
    }

    // Автопрокрутка карусели
    setInterval(() => {
      updateSlide(currentIndex + 1);
    }, 4000);

    // Обработка клавиатурной навигации для карусели (при наличии фокуса)
    carousel.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        updateSlide(currentIndex - 1);
      } else if (event.key === "ArrowRight") {
        updateSlide(currentIndex + 1);
      }
    });
  });

  // Обработка формы бронирования
  const bookButton = document.getElementById("bookTourButton");
  if (bookButton) {
    bookButton.addEventListener("click", bookTour);
  }

  function bookTour() {
    const nameInput = document.getElementById("name");
    const phoneInput = document.getElementById("phone");
    const confirmationMessage = document.getElementById("confirmationMessage");

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();

    if (!name || !phone) {
      alert("Пожалуйста, заполните все поля.");
      return;
    }

    // Имитация успешного бронирования
    confirmationMessage.style.display = "block";

    // Скрываем сообщение через 3 секунды и закрываем модальное окно
    setTimeout(() => {
      confirmationMessage.style.display = "none";
      const openModalElement = document.querySelector(".modal.show");
      if (openModalElement) {
        closeModal(openModalElement);
      }
    }, 3000);
  }

  // Инициализация календаря с flatpickr
  if (typeof flatpickr !== "undefined") {
    flatpickr("#calendar", {
      minDate: "today",
      dateFormat: "Y-m-d"
    });
  }
});