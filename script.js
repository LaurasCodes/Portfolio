// ===============================
// HERO CAROUSEL
// ===============================
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

setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}, 4500);


// ===============================
// SMOOTH SCROLL NAV
// ===============================
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();

        const target = document.getElementById(link.getAttribute("href").substring(1));

        window.scrollTo({
            top: target.offsetTop - 70,
            behavior: "smooth"
        });
    });
});


// ===============================
// NAV ACTIVE STATE
// ===============================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const top = section.offsetTop - 120;

        if (pageYOffset >= top) {
            current = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle(
            "active",
            link.getAttribute("href").substring(1) === current
        );
    });
});


// ===============================
// REVEAL ON SCROLL (FIXED)
// ===============================
const revealEls = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.15 });

revealEls.forEach(el => observer.observe(el));


// ===============================
// MODAL FUNCTIONS
// ===============================
function openModal(id) {
    document.getElementById(id).style.display = "flex";
}

function closeModal(id) {
    document.getElementById(id).style.display = "none";
}


// ===============================
// NAV SHADOW ON SCROLL
// ===============================
window.addEventListener("scroll", () => {
    const nav = document.querySelector("nav");

    nav.style.boxShadow =
        window.scrollY > 50
            ? "0 4px 20px rgba(0,0,0,0.08)"
            : "none";
});
