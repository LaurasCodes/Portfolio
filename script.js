/* HERO CAROUSEL */
let currentSlide = 0;
const track = document.querySelector(".carousel-track");
const dots = document.querySelectorAll(".dot");
const totalSlides = 2;

function updateCarousel() {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle("active", i === currentSlide));
}

document.querySelector(".carousel-arrow.right").addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
});

document.querySelector(".carousel-arrow.left").addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
});

dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        currentSlide = index;
        updateCarousel();
    });
});

// Auto-rotate every 6 seconds
setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}, 6000);
