document.addEventListener("DOMContentLoaded", () => {
  // Параллакс-эффект для хедера
  const hero = document.querySelector(".hero");
  window.addEventListener("scroll", () => {
    const scrollPos = window.pageYOffset;
    if (hero) {
      hero.style.backgroundPositionY = -(scrollPos * 0.5) + "px";
    }
  });

  // Анимации появления для элементов с классами .fade-in и .slide-up
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

    setInterval(() => {
      updateSlide(currentIndex + 1);
    }, 4000);

    carousel.addEventListener("keydown", event => {
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

    confirmationMessage.style.display = "block";

    setTimeout(() => {
      confirmationMessage.style.display = "none";
      const openSheet = document.querySelector(".bottom-sheet.show");
      if (openSheet) {
        closeBottomSheet(openSheet);
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
