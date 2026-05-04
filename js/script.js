/* ===== LOADING SCREEN ===== */
window.addEventListener('load', function() {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.style.display = 'none';
    }, 3000);
});

/* ===== PARTICLES ===== */
function createParticles() {
    const container = document.getElementById('particles-container');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random size between 2-6px
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';

        container.appendChild(particle);
    }
}

createParticles();

/* ===== SCROLL PROGRESS ===== */
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    document.querySelector('.progress-bar').style.width = scrollPercent + '%';
});

/* ===== NAVBAR SCROLL EFFECT ===== */
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

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

/* ===== SKILL BARS ANIMATION ===== */
function animateSkillBars() {
    // Removed - no longer using progress bars
}

/* ===== COUNTER ANIMATION ===== */
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 30);
    });
}

/* ===== SCROLL ANIMATIONS ===== */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');

            // Trigger specific animations based on section
            if (entry.target.id === 'newsletter') {
                setTimeout(animateCounters, 500);
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

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

/* ===== NEWSLETTER FORM ===== */
document.querySelector('.newsletter-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input').value;

    // Simple validation
    if (email) {
        alert('Thank you for subscribing! You will receive updates about new projects and insights.');
        this.reset();
    }
});

/* ===== CONTACT FORM ===== */
document.querySelector('.contact-form-element')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    // Simple form validation
    if (data.name && data.email && data.subject && data.message) {
        alert('Thank you for your message! I will get back to you within 24 hours.');
        this.reset();
    } else {
        alert('Please fill in all fields.');
    }
});

/* ===== 3D CARD EFFECTS ===== */
document.querySelectorAll('.project-card, .testimonial-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        this.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

/* ===== MAGNETIC BUTTONS ===== */
document.querySelectorAll('.btn-primary, .btn-secondary, .newsletter-btn, .contact-submit-btn').forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });

    btn.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});