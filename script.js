<script>
/* HERO CAROUSEL */
let currentSlide = 0;
const track = document.querySelector(".carousel-track");
const dots = document.querySelectorAll(".dot");
const totalSlides = document.querySelectorAll(".carousel-slide").length;

function updateCarousel() {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentSlide);
    });
}

/* ARROWS */
document.querySelector(".carousel-arrow.right").addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
});

document.querySelector(".carousel-arrow.left").addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
});

/* DOT NAVIGATION */
dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        currentSlide = index;
        updateCarousel();
    });
});

/* AUTO SLIDE */
setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}, 6000);


/* SCROLL REVEAL (SMOOTHER + MORE PROFESSIONAL) */
const revealElements = document.querySelectorAll('.reveal');

function revealOnScroll() {
    const triggerPoint = window.innerHeight * 0.85;

    revealElements.forEach(el => {
        const top = el.getBoundingClientRect().top;

        if (top < triggerPoint) {
            el.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);
</script>
