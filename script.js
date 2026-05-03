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

// AUTOPLAY
let autoPlay;

function startAutoPlay() {
    autoPlay = setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateCarousel();
    }, 6000); // smoother timing
}

function resetAutoPlay() {
    clearInterval(autoPlay);
    startAutoPlay();
}

// ARROWS
document.querySelector(".right").onclick = () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel();
    resetAutoPlay();
};

document.querySelector(".left").onclick = () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateCarousel();
    resetAutoPlay();
};

// DOTS
dots.forEach((dot, i) => {
    dot.onclick = () => {
        currentSlide = i;
        updateCarousel();
        resetAutoPlay();
    };
});

// START AUTOPLAY
startAutoPlay();

// MODALS
function openModal(id) {
    document.getElementById(id).style.display = "flex";
}

function closeModal(id) {
    document.getElementById(id).style.display = "none";
}

// CLICK OUTSIDE TO CLOSE
window.onclick = function(e) {
    document.querySelectorAll(".modal").forEach(modal => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
};

// ESC KEY CLOSE
document.onkeydown = function(e) {
    if (e.key === "Escape") {
        document.querySelectorAll(".modal").forEach(modal => {
            modal.style.display = "none";
        });
    }
};
