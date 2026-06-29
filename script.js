/* =====================================================
   PRASENJIT SAHA PORTFOLIO — script.js
   ===================================================== */

history.scrollRestoration = "manual";
window.scrollTo(0, 0);

/* ===================== SCROLL REVEAL ===================== */
const revealTargets = document.querySelectorAll(
    ".section-head, .timeline-item, .project-card, .automation-card, .metric-card, .skill-category-card, .cert-card, .contact-card, .about-text, .skills-layout"
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

/* ===================== CODE TERMINAL TYPING EFFECT (SQL / DAX / Excel) ===================== */
const codeSnippets = [
    {
        file: "query.sql",
        code: "SELECT region, SUM(revenue) AS total_revenue\nFROM sales_data\nWHERE quarter = 'Q4'\nGROUP BY region\nORDER BY total_revenue DESC;"
    },
    {
        file: "query.sql",
        code: "SELECT product, AVG(efficiency) AS avg_efficiency\nFROM lpg_furnace_logs\nWHERE month = CURRENT_MONTH\nGROUP BY product\nORDER BY avg_efficiency DESC;"
    },
    {
        file: "measures.dax",
        code: "Total Revenue YTD =\nCALCULATE(\n    SUM(Sales[Revenue]),\n    DATESYTD('Date'[Date])\n)"
    },
    {
        file: "measures.dax",
        code: "Order Aging Risk % =\nDIVIDE(\n    CALCULATE(COUNTROWS(Orders), Orders[AgingDays] > 7),\n    COUNTROWS(Orders)\n)"
    },
    {
        file: "report.xlsx",
        code: "=SUMIFS(Sales[Revenue],\n  Sales[Region], \"East\",\n  Sales[Quarter], \"Q4\")\n' Power Query refresh: weekly\n' Linked to Power BI dataset"
    },
    {
        file: "report.xlsx",
        code: "=IFERROR(\n  VLOOKUP(A2, OrdersTable, 5, FALSE),\n  \"Not Found\")\n' VBA macro auto-splits by region\n' Runs on workbook open"
    }
];

const sqlTyperEl = document.getElementById("sqlTyper");
const sqlTerminalLabelEl = document.getElementById("sqlTerminalLabel");

if (sqlTyperEl) {
    let sqlQueryIndex = 0;
    let sqlCharIndex = 0;
    let sqlTypingForward = true;

    function typeSql() {
        const current = codeSnippets[sqlQueryIndex].code;

        if (sqlTypingForward) {
            sqlCharIndex++;
            sqlTyperEl.textContent = current.slice(0, sqlCharIndex);
            if (sqlCharIndex === current.length) {
                sqlTypingForward = false;
                setTimeout(typeSql, 2400);
                return;
            }
            setTimeout(typeSql, 28);
        } else {
            sqlCharIndex -= 3;
            if (sqlCharIndex <= 0) {
                sqlCharIndex = 0;
                sqlTyperEl.textContent = "";
                sqlTypingForward = true;
                sqlQueryIndex = (sqlQueryIndex + 1) % codeSnippets.length;
                if (sqlTerminalLabelEl) {
                    sqlTerminalLabelEl.textContent = codeSnippets[sqlQueryIndex].file;
                }
                setTimeout(typeSql, 500);
                return;
            }
            sqlTyperEl.textContent = current.slice(0, sqlCharIndex);
            setTimeout(typeSql, 8);
        }
    }

    typeSql();
}


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
    let targetParallax = { x: 0, y: 0 };
    let parallax = { x: 0, y: 0 };
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const COUNT = window.innerWidth < 700 ? 45 : 90;

    function createParticles() {
        particles = [];
        for (let i = 0; i < COUNT; i++) {
            // depth: 0 = far away (small, dim, slow), 1 = close (big, bright, fast)
            const depth = Math.random();
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                depth: depth,
                vx: (Math.random() - 0.5) * (0.08 + depth * 0.35),
                vy: (Math.random() - 0.5) * (0.08 + depth * 0.35),
                r: 0.5 + depth * 2.2,
                baseOpacity: 0.15 + depth * 0.55,
                hue: Math.random() > 0.5 ? "0,217,255" : "124,58,237"
            });
        }
        // closer particles drawn last so they render on top
        particles.sort((a, b) => a.depth - b.depth);
    }
    createParticles();

    window.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        // normalized -1 to 1 from center, drives parallax
        targetParallax.x = (e.clientX / window.innerWidth - 0.5) * 2;
        targetParallax.y = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // ease parallax toward target for smooth motion
        parallax.x += (targetParallax.x - parallax.x) * 0.04;
        parallax.y += (targetParallax.y - parallax.y) * 0.04;

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < -20) p.x = canvas.width + 20;
            if (p.x > canvas.width + 20) p.x = -20;
            if (p.y < -20) p.y = canvas.height + 20;
            if (p.y > canvas.height + 20) p.y = -20;

            // depth-based parallax: closer particles shift more with mouse movement
            const parallaxStrength = p.depth * 18;
            const drawX = p.x + parallax.x * parallaxStrength;
            const drawY = p.y + parallax.y * parallaxStrength;

            ctx.beginPath();
            ctx.arc(drawX, drawY, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${p.hue},${p.baseOpacity})`;
            ctx.fill();

            p._drawX = drawX;
            p._drawY = drawY;
        });

        // connecting lines only between similarly-close particles (foreground network)
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const a = particles[i], b = particles[j];
                if (a.depth < 0.5 || b.depth < 0.5) continue;
                const dx = a._drawX - b._drawX, dy = a._drawY - b._drawY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(a._drawX, a._drawY);
                    ctx.lineTo(b._drawX, b._drawY);
                    ctx.strokeStyle = `rgba(0,217,255,${0.08 * (1 - dist / 120) * Math.min(a.depth, b.depth)})`;
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

/* Automation Tool Modal */
const automationData = {
    splitColumn: {
        title: "Dynamic Table Splitter",
        lang: "VBA",
        tag: "Excel Macro",
        overview: "An Excel macro that splits any table into separate sheets or files based on values in a column the user selects — the column isn't fixed in the code, so the same macro works on completely different report layouts.",
        problem: "Manually filtering and copying rows for each category (region, department, vendor, etc.) into separate sheets was repetitive and error-prone, especially when the column to split by changed from report to report.",
        how: "The user selects any header cell in the table. The macro reads that column, identifies its unique values, and automatically creates one sheet per value, copying the matching rows across with formatting intact.",
        stack: "VBA, Excel Object Model",
        impact: "Removed a manual, repetitive sorting/copying step from recurring reports — now reused across multiple projects without modification."
    },
    splitWorkbook: {
        title: "Workbook Splitter",
        lang: "VBA",
        tag: "Excel Macro",
        overview: "A macro that takes a single multi-sheet workbook and breaks it into separate standalone workbook files, one per sheet.",
        problem: "Some recipients only need one sheet from a larger workbook, but manually copying each sheet into a new file and saving it was slow and easy to get wrong when there were many sheets.",
        how: "Loops through every sheet in the active workbook, copies each into a new workbook, and saves it as its own file using the sheet name — fully automated, no manual copy-paste.",
        stack: "VBA, Excel Object Model, FileSystem",
        impact: "Turned a multi-minute manual export task into a single click, regardless of how many sheets the source workbook has."
    },
    mergeWorkbooks: {
        title: "Workbook Merger",
        lang: "VBA",
        tag: "Excel Macro",
        overview: "A macro that scans a chosen folder and consolidates every workbook inside it into one combined workbook.",
        problem: "Reports submitted by multiple people or branches as separate Excel files needed to be combined for consolidated review — doing this by hand meant opening, copying, and pasting each file in turn.",
        how: "Points at a folder path, loops through every workbook file inside it, and copies each one's data into a single destination workbook — either as separate sheets or appended into one combined sheet.",
        stack: "VBA, Excel Object Model, FileSystem",
        impact: "Reduced a recurring multi-file consolidation task to a single run, regardless of how many files are in the folder."
    },
    nlSql: {
        title: "Natural Language → SQL Query Solver",
        lang: "Python",
        tag: "AI / OpenAI API",
        overview: "A Python tool that takes a plain-English question, uses the OpenAI API to translate it into a SQL query, executes that query against a live database, and returns the results — without the user needing to write SQL.",
        problem: "Stakeholders who need quick data answers often don't know SQL, which means every ad-hoc question becomes a request queued up for someone who does.",
        how: "The user's question and the relevant database schema are sent to the OpenAI API, which generates the SQL query. The tool then runs that query directly against the database and returns the live result set back to the user.",
        stack: "Python, OpenAI API, SQL (live execution)",
        impact: "Lets non-technical stakeholders get direct answers from the database in plain English, without waiting on a manual query request."
    }
};

function openAutoModal(toolKey) {
    const modal = document.getElementById("autoModal");
    const d = automationData[toolKey];
    if (!d || !modal) return;

    document.getElementById("autoModalTitle").innerText = d.title;
    document.getElementById("autoChipLang").innerText = d.lang;
    document.getElementById("autoChipTag").innerText = d.tag;
    document.getElementById("autoModalOverview").innerText = d.overview;
    document.getElementById("autoModalProblem").innerText = d.problem;
    document.getElementById("autoModalHow").innerText = d.how;
    document.getElementById("autoModalStack").innerText = d.stack;
    document.getElementById("autoModalImpact").innerText = d.impact;

    modal.style.display = "block";
}

function closeAutoModal() {
    document.getElementById("autoModal").style.display = "none";
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
    const autoModal = document.getElementById("autoModal");
    const resumeModal = document.getElementById("resumeModal");
    if (event.target === modal) modal.style.display = "none";
    if (event.target === autoModal) autoModal.style.display = "none";
    if (event.target === resumeModal) resumeModal.style.display = "none";
});

window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeModal();
        closeAutoModal();
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
