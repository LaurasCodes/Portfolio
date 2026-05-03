let currentSlide = 0;

const track = document.querySelector(".carousel-track");
const slides = document.querySelectorAll(".carousel-slide");
const dots = document.querySelectorAll(".dot");

function updateCarousel() {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentSlide);
    });
}

// arrows
document.querySelector(".right").onclick = () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel();
};

document.querySelector(".left").onclick = () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateCarousel();
};

// dots
dots.forEach((dot, i) => {
    dot.onclick = () => {
        currentSlide = i;
        updateCarousel();
    };
});

// faster autoplay
setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel();
}, 3000);

// MODAL
function openModal(id) {
    document.getElementById(id).style.display = "flex";
}

function closeModal(id) {
    document.getElementById(id).style.display = "none";
}
