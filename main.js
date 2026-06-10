

/* ===========================
   CUSTOM CURSOR
=========================== */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .project-card, .skill-tag, .testimonial-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width  = '24px';
    cursor.style.height = '24px';
    ring.style.width    = '60px';
    ring.style.height   = '60px';
    ring.style.opacity  = '0.8';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width  = '12px';
    cursor.style.height = '12px';
    ring.style.width    = '40px';
    ring.style.height   = '40px';
    ring.style.opacity  = '0.5';
  });
});

/* ===========================
   SCROLL BAR + NAVBAR
=========================== */
window.addEventListener('scroll', () => {
  const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  document.getElementById('scroll-bar').style.width = pct + '%';

  const nav = document.getElementById('navbar');
  nav.classList.toggle('scrolled', window.scrollY > 40);
  updateNavTheme();

  // Reveal animations
  document.querySelectorAll('.reveal').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add('visible');
    }
  });
});

// Trigger reveal on load too
document.querySelectorAll('.reveal').forEach(el => {
  const rect = el.getBoundingClientRect();
  if (rect.top < window.innerHeight - 80) el.classList.add('visible');
});

/* ===========================
   MOBILE NAV
=========================== */
function openMobileNav()  { document.getElementById('mobileNav').classList.add('open'); }
function closeMobileNav() { document.getElementById('mobileNav').classList.remove('open'); }

/* ===========================
   CONTACT FORM
=========================== */
function handleSubmit(e) {
  e.preventDefault();
  const msg = document.getElementById('form-msg');
  msg.style.display = 'block';
  e.target.reset();
  setTimeout(() => { msg.style.display = 'none'; }, 5000);
}

/* ===========================
   SMOOTH NAV ACTIVE STATE
=========================== */
const sections = document.querySelectorAll('section[id]');
const navAs    = document.querySelectorAll('.nav-links a');

function updateNavTheme() {
  const nav = document.getElementById('navbar');
  const themeClasses = ['nav-theme-light', 'nav-theme-dark', 'nav-theme-primary'];
  let currentSection = null;

  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) currentSection = s;
  });

  nav.classList.remove(...themeClasses);
  if (currentSection && currentSection.dataset.navTheme) {
    nav.classList.add(`nav-theme-${currentSection.dataset.navTheme}`);
  }
}

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navAs.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) a.classList.add('active');
  });
});

// Set the navbar theme on load
updateNavTheme();

/* ===========================
   HERO SLIDER
=========================== */
(function () {
  const slider    = document.getElementById('heroSlider');
  const dots      = document.querySelectorAll('.hero-dot');
  const totalSlides = 2;
  let current = 0;
  let autoTimer;

  function goTo(index) {
    current = (index + totalSlides) % totalSlides;
    slider.style.transform = `translateX(-${current * 50}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function startAuto() {
    autoTimer = setInterval(next, 6000);
  }
  function resetAuto() {
    clearInterval(autoTimer);
    startAuto();
  }

  document.getElementById('heroPrev').addEventListener('click', () => { prev(); resetAuto(); });
  document.getElementById('heroNext').addEventListener('click', () => { next(); resetAuto(); });
  dots.forEach((d, i) => {
    d.addEventListener('click', () => { goTo(i); resetAuto(); });
  });

  // Touch/swipe support
  let touchStartX = 0;
  const heroEl = document.getElementById('hero');
  heroEl.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  heroEl.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
      resetAuto();
    }
  });

  // Init
  goTo(0);
  startAuto();
})();
