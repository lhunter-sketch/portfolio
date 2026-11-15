const gallery = document.querySelector(".project-gallery");
const slides = Array.from(document.querySelectorAll(".gallery-slide"));
const dots = Array.from(document.querySelectorAll(".gallery-dot"));

const previousButton = document.querySelector(".gallery-arrow--previous");
const nextButton = document.querySelector(".gallery-arrow--next");
const currentSlideLabel = document.querySelector("#current-slide");
const totalSlidesLabel = document.querySelector("#total-slides");

let activeIndex = 0;

totalSlidesLabel.textContent = String(slides.length).padStart(2, "0");

function displaySlide(index) {
  activeIndex = (index + slides.length) % slides.length;

  slides.forEach((slide, slideIndex) => {
    const isActive = slideIndex === activeIndex;

    slide.classList.toggle("is-active", isActive);
    slide.setAttribute("aria-hidden", String(!isActive));
  });

  dots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === activeIndex;

    dot.classList.toggle("is-active", isActive);
    dot.setAttribute("aria-selected", String(isActive));
  });

  currentSlideLabel.textContent = String(activeIndex + 1).padStart(2, "0");
}

function showPreviousSlide() {
  displaySlide(activeIndex - 1);
}

function showNextSlide() {
  displaySlide(activeIndex + 1);
}

previousButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    displaySlide(Number(dot.dataset.slide));
  });
});

gallery.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    showPreviousSlide();
  }

  if (event.key === "ArrowRight") {
    event.preventDefault();
    showNextSlide();
  }
});

displaySlide(0);
