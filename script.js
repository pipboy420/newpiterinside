document.addEventListener("DOMContentLoaded", () => {
  // Параллакс-эффект для хедера
  const hero = document.querySelector(".hero");
  window.addEventListener("scroll", () => {
    const scrollPos = window.pageYOffset;
    if (hero) {
      hero.style.backgroundPositionY = -(scrollPos * 0.5) + "px";
    }
  });

  // Анимации появления для элементов .fade-in и .slide-up
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

  // Открытие bottom sheet по data-атрибуту
  const modalButtons = document.querySelectorAll("[data-modal]");
  modalButtons.forEach(button => {
    button.addEventListener("click", function () {
      const sheetId = this.getAttribute("data-modal");
      openBottomSheet(sheetId);
    });
  });

  function openBottomSheet(sheetId) {
    const sheet = document.getElementById(sheetId);
    if (sheet) {
      sheet.classList.add("show");
      document.body.style.overflow = "hidden";
      const sheetContent = sheet.querySelector(".bottom-sheet-content");
      if (sheetContent) {
        sheetContent.focus();
      }
    }
  }

  function closeBottomSheet(sheet) {
    if (sheet) {
      sheet.classList.remove("show");
      document.body.style.overflow = "auto";
    }
  }

  // Закрытие bottom sheet при клике вне содержимого или по кнопке "close"
  document.querySelectorAll(".bottom-sheet").forEach(sheet => {
    sheet.addEventListener("click", event => {
      if (event.target.classList.contains("bottom-sheet") || event.target.classList.contains("close")) {
        closeBottomSheet(sheet);
      }
    });
  });

  // Закрытие bottom sheet клавишей Escape
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      document.querySelectorAll(".bottom-sheet.show").forEach(sheet => {
        closeBottomSheet(sheet);
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

    // Автопрокрутка слайдов каждые 4 секунды
    setInterval(() => {
      updateSlide(currentIndex + 1);
    }, 4000);

    // Управление клавиатурой
    carousel.addEventListener("keydown", event => {
      if (event.key === "ArrowLeft") {
        updateSlide(currentIndex - 1);
      } else if (event.key === "ArrowRight") {
        updateSlide(currentIndex + 1);
      }
    });
  });

  // Обработка кнопок бронирования (у каждой кнопки атрибут data-booking-id)
  const bookingButtons = document.querySelectorAll(".booking-button");
  bookingButtons.forEach(btn => {
    btn.addEventListener("click", bookTour);
  });

  // Функция валидации телефона (примерная)
  function isValidPhoneNumber(phone) {
    // Очень простой вариант: +7XXXXXXXXXX или 8XXXXXXXXXX, 10-15 символов
    const phonePattern = /^(\+?\d{10,15})$/;
    return phonePattern.test(phone);
  }

  function bookTour(event) {
    const bookingId = event.target.getAttribute("data-booking-id");
    // Найдём соответствующие инпуты в нужном bottom sheet
    const nameInput = document.getElementById(`name${bookingId}`);
    const phoneInput = document.getElementById(`phone${bookingId}`);
    const emailInput = document.getElementById(`email${bookingId}`);
    const confirmationMessage = document.getElementById(`confirmationMessage${bookingId}`);

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const email = emailInput.value.trim();

    if (!name || !phone || !email) {
      alert("Пожалуйста, заполните все поля (имя, телефон, email).");
      return;
    }
    // Проверим корректность телефона
    if (!isValidPhoneNumber(phone)) {
      alert("Пожалуйста, введите корректный номер телефона (от 10 до 15 цифр, можно с +).");
      return;
    }

    // Сюда можно добавить реальную отправку данных на сервер (fetch / AJAX).
    // Пока показываем сообщение о подтверждении
    confirmationMessage.style.display = "block";

    // Через 3 секунды прячем сообщение и закрываем bottom sheet
    setTimeout(() => {
      confirmationMessage.style.display = "none";
      const openSheet = document.querySelector(".bottom-sheet.show");
      if (openSheet) {
        closeBottomSheet(openSheet);
      }
    }, 3000);
  }

  // Инициализация календаря с flatpickr (для нескольких туров)
  if (typeof flatpickr !== "undefined") {
    flatpickr("#calendar1", {
      minDate: "today",
      dateFormat: "Y-m-d"
    });
    flatpickr("#calendar2", {
      minDate: "today",
      dateFormat: "Y-m-d"
    });
  }
});