/* ===== CAROUSEL ===== */
let currentSlideIndex = 0;

function changeSlide(n) {
    showSlide(currentSlideIndex += n);
}

function currentSlide(n) {
    showSlide(currentSlideIndex = n);
}

function showSlide(n) {
    const slides = document.querySelectorAll(".carousel-slide");
    const dots = document.querySelectorAll(".dot");
    
    if (n >= slides.length) {
        currentSlideIndex = 0;
    }
    if (n < 0) {
        currentSlideIndex = slides.length - 1;
    }
    
    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));
    
    slides[currentSlideIndex].classList.add("active");
    dots[currentSlideIndex].classList.add("active");
}

// Auto-advance carousel every 8 seconds
setInterval(() => {
    changeSlide(1);
}, 8000);

/* ===== TYPING ANIMATION ===== */
const words = ["Business Analyst","Data Analyst","Power BI Specialist","SQL Professional"];
let i = 0, j = 0, current = "", del = false;

function type() {
    const textElement = document.querySelector(".text");
    if (!textElement) return;
    
    current = words[i];
    textElement.textContent = current.slice(0, j);
    j = del ? j - 1 : j + 1;

    if (j > current.length) {
        del = true;
        setTimeout(type, 1000);
        return;
    }
    if (j < 0) {
        del = false;
        i = (i + 1) % words.length;
    }
    setTimeout(type, del ? 60 : 100);
}
type();

/* ===== SCROLL ANIMATION ===== */
const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("show");
    });
});
document.querySelectorAll(".fade-in").forEach(el => obs.observe(el));

/* ===== SMOOTH SCROLL ===== */
document.querySelectorAll("a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({behavior: "smooth"});
        }
    });
});
