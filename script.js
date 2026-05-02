/* ----------------------------------------------------
   TYPING EFFECT
---------------------------------------------------- */
const roles = [
    "Business Analyst",
    "Data Analyst",
    "Power BI Specialist",
    "Process Improvement Analyst"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    const typingSpan = document.querySelector(".typing");
    const currentRole = roles[roleIndex];

    if (!deleting) {
        typingSpan.textContent = currentRole.slice(0, charIndex++);
        if (charIndex > currentRole.length) {
            deleting = true;
            setTimeout(typeEffect, 1200);
            return;
        }
    } else {
        typingSpan.textContent = currentRole.slice(0, charIndex--);
        if (charIndex < 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
    }

    setTimeout(typeEffect, deleting ? 60 : 100);
}

typeEffect();


/* ----------------------------------------------------
   KPI COUNTERS
---------------------------------------------------- */
const counters = document.querySelectorAll(".kpi-number");
let countersStarted = false;

function startCounters() {
    if (countersStarted) return;
    countersStarted = true;

    counters.forEach(counter => {
        const target = +counter.dataset.target;
        let count = 0;

        const update = () => {
            if (count < target) {
                count++;
                counter.textContent = count;
                requestAnimationFrame(update);
            }
        };

        update();
    });
}


/* ----------------------------------------------------
   SCROLL ANIMATION
---------------------------------------------------- */
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");

            if (entry.target.classList.contains("kpi-section")) {
                startCounters();
            }
        }
    });
});

document.querySelectorAll(".fade-in, .kpi-section").forEach(el => observer.observe(el));


/* ----------------------------------------------------
   MODAL SYSTEM
---------------------------------------------------- */
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modal-body");
const closeBtn = document.querySelector(".close-btn");

const caseDetails = {
    case1: `
        <h2>Case Management System Analysis</h2>
        <p><strong>Problem:</strong> Support teams lacked a centralized system.</p>
        <p><strong>Root Cause:</strong> Fragmented workflows and inconsistent documentation.</p>
        <p><strong>Approach:</strong> Requirements gathering, workflow mapping, stakeholder interviews.</p>
        <p><strong>Tools:</strong> Dynamics 365, Excel, Visio</p>
        <p><strong>Impact:</strong> 30% faster case resolution and improved visibility.</p>
    `,
    case2: `
        <h2>Retail Performance Dashboard</h2>
        <p><strong>Problem:</strong> No visibility on discount impact.</p>
        <p><strong>Approach:</strong> Built Power BI dashboard with DAX measures.</p>
        <p><strong>Tools:</strong> Power BI, SQL</p>
        <p><strong>Impact:</strong> Enabled data-driven pricing decisions.</p>
    `,
    case3: `
        <h2>US Air Traffic Analysis</h2>
        <p><strong>Problem:</strong> No long-term trend visibility.</p>
        <p><strong>Approach:</strong> Time-series analysis and KPI dashboards.</p>
        <p><strong>Tools:</strong> Power BI, Excel</p>
        <p><strong>Impact:</strong> Supported planning and forecasting decisions.</p>
    `,
    case4: `
        <h2>Marketing Campaign Analysis</h2>
        <p><strong>Problem:</strong> Unclear ROI and targeting.</p>
        <p><strong>Approach:</strong> Customer segmentation and performance analysis.</p>
        <p><strong>Tools:</strong> Excel, Power BI</p>
        <p><strong>Impact:</strong> Improved targeting and campaign efficiency.</p>
    `
};

document.querySelectorAll(".case-card").forEach(card => {
    card.addEventListener("click", () => {
        const key = card.dataset.case;
        modalBody.innerHTML = caseDetails[key];
        modal.style.display = "flex";
    });
});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
});


/* ----------------------------------------------------
   DARK MODE TOGGLE
---------------------------------------------------- */
const toggleDark = document.querySelector(".toggle-darkmode");

toggleDark.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

