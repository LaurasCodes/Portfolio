// ===============================
// Smooth scrolling for nav links
// ===============================
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        window.scrollTo({
            top: targetSection.offsetTop - 70,
            behavior: 'smooth'
        });
    });
});


// ===============================
// Active nav link on scroll
// ===============================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');

        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});


// ===============================
// Fade-in animation on scroll (IIBA-style subtle reveal)
// ===============================
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.15
});

document.querySelectorAll('.project-card, .section-title, .about-content')
    .forEach(el => {
        el.classList.add('hidden');
        observer.observe(el);
    });


// ===============================
// Button hover micro-interaction
// ===============================
document.querySelectorAll('.cta-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-2px)';
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(0)';
    });
});


// ===============================
// Optional: Navbar shadow on scroll (premium feel)
// ===============================
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');

    if (window.scrollY > 50) {
        nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
    } else {
        nav.style.boxShadow = 'none';
    }
});
