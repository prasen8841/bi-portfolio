/* =====================================================
   PRASENJIT SAHA PORTFOLIO — script.js
   ===================================================== */

history.scrollRestoration = "manual";
window.scrollTo(0, 0);

/* ===================== SCROLL REVEAL ===================== */
const revealTargets = document.querySelectorAll(
    ".section-head, .timeline-item, .project-card, .metric-card, .skill-category-card, .cert-card, .contact-card, .about-text, .skills-layout"
);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealTargets.forEach((el, i) => {
    el.style.transitionDelay = `${Math.min((i % 6) * 0.08, 0.4)}s`;
    revealObserver.observe(el);
});

/* ===================== HERO TYPING EFFECT ===================== */
const roles = [
    "BI Analyst",
    "Data Analyst",
    "Dashboard Specialist",
    "AI-Powered Reporting Expert"
];

const roleTypeEl = document.getElementById("roleType");
let roleIndex = 0;
let charIndex = 0;
let typingForward = true;

function typeRoles() {
    if (!roleTypeEl) return;
    const current = roles[roleIndex];

    if (typingForward) {
        charIndex++;
        roleTypeEl.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
            typingForward = false;
            setTimeout(typeRoles, 1600);
            return;
        }
    } else {
        charIndex--;
        roleTypeEl.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
            typingForward = true;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(typeRoles, 400);
            return;
        }
    }

    setTimeout(typeRoles, typingForward ? 70 : 35);
}

typeRoles();

/* ===================== COUNTER ANIMATION ===================== */
const counters = document.querySelectorAll(".counter");
let counterStarted = false;

function animateCounters() {
    if (counterStarted) return;
    counterStarted = true;

    counters.forEach(counter => {
        const target = +counter.getAttribute("data-target");
        let count = 0;
        const increment = target / 80;

        const updateCounter = () => {
            if (count < target) {
                count += increment;
                counter.innerText = Math.ceil(count);
                setTimeout(updateCounter, 20);
            } else {
                counter.innerText = target + "+";
            }
        };

        updateCounter();
    });
}

const statsSection = document.querySelector(".metrics");
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) animateCounters();
        });
    }, { threshold: 0.3 });
    statsObserver.observe(statsSection);
}

/* ===================== SKILLS METERS ===================== */
const meterRows = document.querySelectorAll(".meter-row");

const meterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fill = entry.target.querySelector(".meter-fill");
            const pct = entry.target.getAttribute("data-pct");
            requestAnimationFrame(() => {
                fill.style.width = pct + "%";
            });
            meterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.4 });

meterRows.forEach(row => meterObserver.observe(row));

/* ===================== RADAR CHART (Skills) ===================== */
function drawRadarChart() {
    const svg = document.getElementById("radarChart");
    if (!svg) return;

    const data = [
        { label: "Power BI", value: 95 },
        { label: "DAX", value: 90 },
        { label: "SQL", value: 88 },
        { label: "ETL", value: 85 },
        { label: "Excel/VBA", value: 80 },
        { label: "Python", value: 70 }
    ];

    const size = 360;
    const center = size / 2;
    const radius = 120;
    const levels = 4;
    const angleStep = (Math.PI * 2) / data.length;

    const ns = "http://www.w3.org/2000/svg";
    svg.setAttribute("viewBox", `0 0 ${size} ${size}`);

    function point(i, frac) {
        const angle = angleStep * i - Math.PI / 2;
        const r = radius * frac;
        return [center + r * Math.cos(angle), center + r * Math.sin(angle)];
    }

    // Grid rings
    for (let lvl = 1; lvl <= levels; lvl++) {
        const frac = lvl / levels;
        const pts = data.map((_, i) => point(i, frac).join(",")).join(" ");
        const poly = document.createElementNS(ns, "polygon");
        poly.setAttribute("points", pts);
        poly.setAttribute("fill", "none");
        poly.setAttribute("stroke", "rgba(0,217,255,0.12)");
        poly.setAttribute("stroke-width", "1");
        svg.appendChild(poly);
    }

    // Axis lines + labels
    data.forEach((d, i) => {
        const [x, y] = point(i, 1);
        const line = document.createElementNS(ns, "line");
        line.setAttribute("x1", center);
        line.setAttribute("y1", center);
        line.setAttribute("x2", x);
        line.setAttribute("y2", y);
        line.setAttribute("stroke", "rgba(0,217,255,0.12)");
        line.setAttribute("stroke-width", "1");
        svg.appendChild(line);

        const [lx, ly] = point(i, 1.22);
        const text = document.createElementNS(ns, "text");
        text.setAttribute("x", lx);
        text.setAttribute("y", ly);
        text.setAttribute("fill", "#94A3B8");
        text.setAttribute("font-size", "11");
        text.setAttribute("font-family", "Inter, sans-serif");
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("dominant-baseline", "middle");
        text.textContent = d.label;
        svg.appendChild(text);
    });

    // Data polygon (animated from center)
    const dataPoly = document.createElementNS(ns, "polygon");
    const finalPts = data.map((d, i) => point(i, d.value / 100));
    const startPts = data.map((_, i) => point(i, 0));

    dataPoly.setAttribute("points", startPts.map(p => p.join(",")).join(" "));
    dataPoly.setAttribute("fill", "rgba(0,217,255,0.18)");
    dataPoly.setAttribute("stroke", "#00D9FF");
    dataPoly.setAttribute("stroke-width", "2");
    dataPoly.style.filter = "drop-shadow(0 0 8px rgba(0,217,255,0.5))";
    svg.appendChild(dataPoly);

    // Vertex dots
    const dots = finalPts.map((p, i) => {
        const dot = document.createElementNS(ns, "circle");
        dot.setAttribute("cx", startPts[i][0]);
        dot.setAttribute("cy", startPts[i][1]);
        dot.setAttribute("r", "4");
        dot.setAttribute("fill", "#00D9FF");
        svg.appendChild(dot);
        return dot;
    });

    // Animate on scroll into view
    const radarObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let frame = 0;
                const totalFrames = 40;
                const animate = () => {
                    frame++;
                    const t = Math.min(frame / totalFrames, 1);
                    const eased = 1 - Math.pow(1 - t, 3);

                    const currentPts = data.map((d, i) => {
                        const x = startPts[i][0] + (finalPts[i][0] - startPts[i][0]) * eased;
                        const y = startPts[i][1] + (finalPts[i][1] - startPts[i][1]) * eased;
                        return [x, y];
                    });

                    dataPoly.setAttribute("points", currentPts.map(p => p.join(",")).join(" "));
                    dots.forEach((dot, i) => {
                        dot.setAttribute("cx", currentPts[i][0]);
                        dot.setAttribute("cy", currentPts[i][1]);
                    });

                    if (t < 1) requestAnimationFrame(animate);
                };
                requestAnimationFrame(animate);
                radarObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    radarObserver.observe(svg);
}

drawRadarChart();

/* ===================== AMBIENT PARTICLE CANVAS ===================== */
(function initParticles() {
    const canvas = document.getElementById("bgCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let particles = [];
    let mouse = { x: null, y: null };
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const COUNT = window.innerWidth < 700 ? 35 : 70;

    function createParticles() {
        particles = [];
        for (let i = 0; i < COUNT; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.25,
                vy: (Math.random() - 0.5) * 0.25,
                r: Math.random() * 1.6 + 0.6,
                hue: Math.random() > 0.5 ? "0,217,255" : "124,58,237"
            });
        }
    }
    createParticles();

    window.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;

            // mouse-reactive subtle attraction
            if (mouse.x !== null) {
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 160) {
                    p.x += dx * 0.0025;
                    p.y += dy * 0.0025;
                }
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${p.hue},0.5)`;
            ctx.fill();
        });

        // connecting lines for nearby particles (subtle "neural network" feel)
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const a = particles[i], b = particles[j];
                const dx = a.x - b.x, dy = a.y - b.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 110) {
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.strokeStyle = `rgba(0,217,255,${0.06 * (1 - dist / 110)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }

        if (!prefersReducedMotion) requestAnimationFrame(draw);
    }

    if (!prefersReducedMotion) {
        draw();
    } else {
        draw(); // single static frame
    }
})();

/* ===================== MOUSE-REACTIVE GLOW (Hero) ===================== */
(function heroGlow() {
    const heroPhoto = document.querySelector(".hero-photo-wrap");
    if (!heroPhoto) return;

    document.addEventListener("mousemove", (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        heroPhoto.style.transform = `translate(${x * 6}px, ${y * 6}px)`;
    });
})();

/* ===================== PARALLAX ON GLOW LAYERS ===================== */
(function parallaxGlows() {
    const blueGlow = document.querySelector(".bg-glow-blue");
    const purpleGlow = document.querySelector(".bg-glow-purple");
    if (!blueGlow || !purpleGlow) return;

    window.addEventListener("scroll", () => {
        const y = window.scrollY;
        blueGlow.style.transform = `translateY(${y * 0.08}px)`;
        purpleGlow.style.transform = `translateY(${-y * 0.06}px)`;
    });
})();

/* ===================== PROJECT MODAL ===================== */
function openModal(project) {
    const modal = document.getElementById("projectModal");
    const title = document.getElementById("modalTitle");
    const overview = document.getElementById("modalOverview");
    const problem = document.getElementById("modalProblem");
    const dataset = document.getElementById("modalDataset");
    const kpis = document.getElementById("modalKpis");
    const architecture = document.getElementById("modalArchitecture");
    const impact = document.getElementById("modalImpact");
    const image = document.getElementById("modalImage");

    const chipRows = document.getElementById("chipRows");
    const chipKpis = document.getElementById("chipKpis");
    const chipTool = document.getElementById("chipTool");
    const chipDomain = document.getElementById("chipDomain");

    const data = {
        lpg: {
            title: "LPG Efficiency Dashboard",
            image: "assets/dashboards/lpg.png",
            overview: "A manufacturing analytics dashboard built to monitor furnace performance, LPG usage, and fuel efficiency in real time.",
            problem: "Furnace gas usage was tracked manually, making efficiency monitoring and wastage detection difficult.",
            dataset: "120,000+ rows from production logs, furnace readings, and fuel consumption records.",
            kpis: "LPG Consumption, Furnace Efficiency, Production Output, Cost per Ton",
            architecture: "Excel → Power Query → Data Model → DAX → Power BI",
            impact: "Improved efficiency visibility and enabled faster operational decision-making.",
            rows: "120K+ Rows",
            chipKpi: "4 KPIs",
            tool: "Power BI",
            domain: "Manufacturing"
        },
        pending: {
            title: "Pending Orders Dashboard",
            image: "assets/dashboards/pending-orders.png",
            overview: "Supply chain dashboard for tracking delayed orders and backlog risk.",
            problem: "Order delays and backlog lacked centralized visibility across teams.",
            dataset: "85,000+ order records from ERP and Excel trackers.",
            kpis: "Pending Orders, Aging Days, Escalation Risk, Delivery Status",
            architecture: "ERP Export → Excel → Power Query → Power BI",
            impact: "Reduced delays and improved escalation response speed.",
            rows: "85K+ Rows",
            chipKpi: "4 KPIs",
            tool: "Power BI",
            domain: "Supply Chain"
        },
        sales: {
            title: "Sales Revenue Dashboard",
            image: "assets/dashboards/sales-executive.png",
            overview: "Executive dashboard for revenue tracking across products, regions, and targets.",
            problem: "Sales data was fragmented across multiple Excel reports.",
            dataset: "150,000+ transaction rows across regions and product lines.",
            kpis: "Revenue, Target vs Actual, Growth %, Product Performance",
            architecture: "Excel → Data Cleaning → DAX → Power BI",
            impact: "Improved sales visibility and faster reporting.",
            rows: "150K+ Rows",
            chipKpi: "4 KPIs",
            tool: "Power BI",
            domain: "Finance"
        },
        water: {
            title: "Water Supply Dashboard",
            image: "assets/dashboards/water.png",
            overview: "Utility dashboard for monitoring water supply and consumption trends.",
            problem: "Consumption patterns and supply-demand imbalance were difficult to track manually.",
            dataset: "60,000+ utility records and meter readings.",
            kpis: "Supply Volume, Consumption Trend, Wastage %, Demand Gap",
            architecture: "Excel → Power Query → Data Model → Power BI",
            impact: "Improved resource monitoring and wastage detection.",
            rows: "60K+ Rows",
            chipKpi: "4 KPIs",
            tool: "Power BI",
            domain: "Manufacturing"
        },
        cashflow: {
            title: "Cashflow Dashboard",
            image: "assets/dashboards/cashflow.png",
            overview: "Finance dashboard for liquidity and cash movement analysis.",
            problem: "Management lacked consolidated visibility of inflow and outflow.",
            dataset: "50,000+ banking and transaction records.",
            kpis: "Cash Inflow, Cash Outflow, Net Position, Bank Balance",
            architecture: "Excel → Data Model → DAX → Power BI",
            impact: "Enabled better liquidity planning and financial visibility.",
            rows: "50K+ Rows",
            chipKpi: "4 KPIs",
            tool: "Power BI",
            domain: "Finance"
        },
        contracts: {
            title: "Works Contract Dashboard",
            image: "assets/dashboards/contracts.png",
            overview: "Project monitoring dashboard for contract lifecycle and budget tracking.",
            problem: "Contract progress and budget utilization were fragmented across systems.",
            dataset: "40,000+ contract and milestone records.",
            kpis: "Budget Utilization, Progress %, Delay Risk, Cost Variance",
            architecture: "SharePoint + Excel → Power Query → Power BI",
            impact: "Improved contract visibility and stronger budget control.",
            rows: "40K+ Rows",
            chipKpi: "4 KPIs",
            tool: "Power BI",
            domain: "Manufacturing"
        }
    };

    const d = data[project];
    if (!d) return;

    title.innerText = d.title;
    image.src = d.image;

    chipRows.innerText = d.rows;
    chipKpis.innerText = d.chipKpi;
    chipTool.innerText = d.tool;
    chipDomain.innerText = d.domain;

    overview.innerText = d.overview;
    problem.innerText = d.problem;
    dataset.innerText = d.dataset;
    kpis.innerText = d.kpis;
    architecture.innerText = d.architecture;
    impact.innerText = d.impact;

    modal.style.display = "block";
}

function closeModal() {
    document.getElementById("projectModal").style.display = "none";
}

/* Resume Modal */
function openResumeModal() {
    document.getElementById("resumeModal").style.display = "block";
}

function closeResumeModal() {
    document.getElementById("resumeModal").style.display = "none";
}

window.addEventListener("click", (event) => {
    const modal = document.getElementById("projectModal");
    const resumeModal = document.getElementById("resumeModal");
    if (event.target === modal) modal.style.display = "none";
    if (event.target === resumeModal) resumeModal.style.display = "none";
});

window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeModal();
        closeResumeModal();
    }
});

/* ===================== LOADER ===================== */
window.addEventListener("load", function () {
    setTimeout(() => {
        const loader = document.getElementById("loader");
        if (!loader) return;
        loader.style.opacity = "0";
        setTimeout(() => { loader.style.display = "none"; }, 600);
    }, 1800);
});

/* ===================== CHATBOT ===================== */
const chatToggle = document.getElementById("chatToggle");
const chatWindow = document.getElementById("chatWindow");
const closeChat = document.getElementById("closeChat");
const sendChat = document.getElementById("sendChat");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");

if (chatToggle && chatWindow) {
    chatToggle.addEventListener("click", () => {
        chatWindow.classList.add("open");
        chatInput.focus();
    });

    closeChat.addEventListener("click", () => {
        chatWindow.classList.remove("open");
    });

    sendChat.addEventListener("click", sendMessage);
    chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendMessage();
    });
}

function sendMessage() {
    const message = chatInput.value.trim();
    if (message === "") return;

    const userBubble = document.createElement("div");
    userBubble.className = "user-message";
    userBubble.textContent = message;
    chatMessages.appendChild(userBubble);

    chatInput.value = "";
    chatMessages.scrollTop = chatMessages.scrollHeight;

    const typing = document.createElement("div");
    typing.className = "typing-indicator";
    typing.innerHTML = "<span></span><span></span><span></span>";
    chatMessages.appendChild(typing);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    setTimeout(() => {
        typing.remove();
        const reply = getBotReply(message.toLowerCase());
        const botBubble = document.createElement("div");
        botBubble.className = "bot-message";
        botBubble.innerHTML = reply;
        chatMessages.appendChild(botBubble);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 700);
}

function getBotReply(message) {
    if (message.includes("skill")) {
        return "Prasenjit specializes in Power BI, DAX, SQL, Power Query, Excel/VBA, Python, ETL and Data Modeling.";
    }
    if (message.includes("experience")) {
        return "Prasenjit has 5+ years of specialized experience in Business Intelligence and Analytics.";
    }
    if (message.includes("project")) {
        return "Key projects include the LPG Efficiency Dashboard, Pending Orders Analytics, Sales Revenue Dashboard, Cashflow Monitoring, and Works Contract Dashboard.";
    }
    if (message.includes("contact")) {
        return "You can reach him at prasenjit8841@gmail.com or via LinkedIn.";
    }
    if (message.includes("available") || message.includes("hire")) {
        return "Yes — Prasenjit is open to BI/Data Analyst roles, consulting, and freelance opportunities.";
    }
    if (message.includes("relocation")) {
        return "Yes, he is open to relocation for the right opportunity.";
    }
    return "I can help with questions about skills, experience, projects, availability, and contact details.";
}

/* ===================== PROJECT FILTER ===================== */
function filterProjects(category) {
    const cards = document.querySelectorAll(".project-card");
    const buttons = document.querySelectorAll(".filter-btn");

    buttons.forEach(btn => btn.classList.remove("active"));
    buttons.forEach(btn => {
        if (
            btn.textContent.toLowerCase().includes(category) ||
            (category === "all" && btn.textContent === "All")
        ) {
            btn.classList.add("active");
        }
    });

    cards.forEach(card => {
        if (category === "all") {
            card.style.display = "block";
        } else {
            card.style.display = card.classList.contains(category) ? "block" : "none";
        }
    });
}

/* ===================== ACTIVE NAVBAR HIGHLIGHT ===================== */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar a[href^='#']");

function updateActiveNav() {
    const scrollMiddle = window.scrollY + window.innerHeight / 3;
    let currentSection = "";

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollMiddle >= top && scrollMiddle < top + height) {
            currentSection = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", updateActiveNav);
window.addEventListener("load", updateActiveNav);

/* ===================== NAVBAR SCROLL STYLE ===================== */
const navbarEl = document.getElementById("navbar");
window.addEventListener("scroll", () => {
    if (!navbarEl) return;
    if (window.scrollY > 40) {
        navbarEl.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";
    } else {
        navbarEl.style.boxShadow = "none";
    }
});

/* ===================== HAMBURGER MENU ===================== */
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinksMobile = document.querySelectorAll("#navMenu a");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function () {
        navMenu.classList.toggle("show-menu");
    });

    navLinksMobile.forEach(link => {
        link.addEventListener("click", function () {
            navMenu.classList.remove("show-menu");
        });
    });
}

/* ===================== BACK TO TOP ===================== */
const backToTop = document.getElementById("backToTop");
if (backToTop) {
    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}
