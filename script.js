/* ----------------------------------------------------
   TYPING EFFECT
---------------------------------------------------- */
const roles = [
    "Business Analyst",
    "Data Analyst",
    "Process Improvement Specialist",
    "Digital Transformation Support"
];

let roleIndex = 0;
let charIndex = 0;
const typingElement = document.querySelector(".typing");

function type() {
    if (charIndex < roles[roleIndex].length) {
        typingElement.textContent += roles[roleIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 80);
    } else {
        setTimeout(erase, 1500);
    }
}

function erase() {
    if (charIndex > 0) {
        typingElement.textContent = roles[roleIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50);
    } else {
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(type, 300);
    }
}

type();


/* ----------------------------------------------------
   DARK MODE TOGGLE
---------------------------------------------------- */
const toggleDark = document.querySelector(".toggle-darkmode");
toggleDark.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});


/* ----------------------------------------------------
   SCROLL FADE-IN ANIMATION
---------------------------------------------------- */
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});

document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));


/* ----------------------------------------------------
   CASE STUDY MODAL
---------------------------------------------------- */
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modal-body");
const closeBtn = document.querySelector(".close-btn");

document.querySelectorAll(".case-card").forEach(card => {
    card.addEventListener("click", () => {
        modal.style.display = "flex";
        modalBody.innerHTML = card.innerHTML;
    });
});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
});


/* ----------------------------------------------------
   PARALLAX EFFECT (IIBA STYLE)
---------------------------------------------------- */
window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;

    // Move background layer
    const bg = document.querySelector(".parallax-bg");
    if (bg) {
        bg.style.transform = `translateY(${scrolled * 0.2}px)`;
    }

    // Move hero image slightly
    const heroImg = document.querySelector(".hero-image-wrapper img");
    if (heroImg) {
        heroImg.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});
