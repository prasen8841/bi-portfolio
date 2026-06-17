history.scrollRestoration = "manual";
window.scrollTo(0, 0);

// Scroll reveal animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});

document.querySelectorAll(".hidden").forEach((el) => {
    observer.observe(el);
});

// Project Modal
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

    title.innerText = data[project].title;
    image.src = data[project].image;

    chipRows.innerText = data[project].rows;
    chipKpis.innerText = data[project].chipKpi;
    chipTool.innerText = data[project].tool;
    chipDomain.innerText = data[project].domain;

    overview.innerText = data[project].overview;
    problem.innerText = data[project].problem;
    dataset.innerText = data[project].dataset;
    kpis.innerText = data[project].kpis;
    architecture.innerText = data[project].architecture;
    impact.innerText = data[project].impact;

    modal.style.display = "block";
}

// Close modal
function closeModal() {
    document.getElementById("projectModal").style.display = "none";
}

// Resume Modal
function openResumeModal() {
    document.getElementById("resumeModal").style.display = "block";
}

function closeResumeModal() {
    document.getElementById("resumeModal").style.display = "none";
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById("projectModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

// Counter Animation
const counters = document.querySelectorAll('.counter');
let counterStarted = false;

function animateCounters() {
    if (counterStarted) return;
    counterStarted = true;

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
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

const statsSection = document.querySelector('.stats');

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
        }
    });
});

statsObserver.observe(statsSection);

// Loader Screen
window.addEventListener("load", function () {
    setTimeout(() => {
        const loader = document.getElementById("loader");

        loader.style.opacity = "0";

        setTimeout(() => {
            loader.style.display = "none";
        }, 800);

    }, 2200);
});

// =====================
// Chatbot Logic
// =====================
const chatToggle = document.getElementById("chatToggle");
const chatWindow = document.getElementById("chatWindow");
const closeChat = document.getElementById("closeChat");
const sendChat = document.getElementById("sendChat");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");

// Open chatbot
chatToggle.addEventListener("click", () => {
    chatWindow.style.display = "block";
});

// Close chatbot
closeChat.addEventListener("click", () => {
    chatWindow.style.display = "none";
});

// Send message on button click
sendChat.addEventListener("click", sendMessage);

// Send message on Enter key
chatInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

function sendMessage() {
    const message = chatInput.value.trim();

    if (message === "") return;

    // Show user message
    chatMessages.innerHTML += `
        <div class="user-message">${message}</div>
    `;

    chatInput.value = "";

    // Bot reply
    setTimeout(() => {
        const reply = getBotReply(message.toLowerCase());

        chatMessages.innerHTML += `
            <div class="bot-message">${reply}</div>
        `;

        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 500);
}

function getBotReply(message) {
    if (message.includes("skill")) {
        return "Prasenjit specializes in Power BI, DAX, SQL, Power Query, Excel/VBA, Python, ETL and Data Modeling.";
    }

    if (message.includes("experience")) {
        return "Prasenjit has 4+ years of specialized experience in Business Intelligence and Analytics.";
    }

    if (message.includes("project")) {
        return "Key projects include LPG Efficiency Dashboard, Pending Orders Analytics, Sales Revenue Dashboard, Cashflow Monitoring and Works Contract Dashboard.";
    }

    if (message.includes("contact")) {
        return "You can contact him via email: prasenjit8841@gmail.com or through LinkedIn.";
    }

    if (message.includes("available") || message.includes("hire")) {
        return "Yes, Prasenjit is open to BI/Data Analyst roles, consulting, and freelance opportunities.";
    }

    if (message.includes("relocation")) {
        return "Yes, he is open to relocation for the right opportunity.";
    }

    return "I can help with questions about skills, experience, projects, availability, and contact details.";
}

// Project Filter
function filterProjects(category) {
    const cards = document.querySelectorAll(".project-card");
    const buttons = document.querySelectorAll(".filter-btn");

    // Update active button
    buttons.forEach(btn => btn.classList.remove("active"));

    buttons.forEach(btn => {
        if (
            btn.textContent.toLowerCase().includes(category) ||
            (category === "all" && btn.textContent === "All")
        ) {
            btn.classList.add("active");
        }
    });

    // Filter cards
    cards.forEach(card => {
        if (category === "all") {
            card.style.display = "block";
        } else {
            if (card.classList.contains(category)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        }
    });
}

  // Active Navbar Highlight on Scroll
    const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar a");

function updateActiveNav() {
    const scrollMiddle = window.scrollY + window.innerHeight / 3;

    let currentSection = "";

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;

        if (
            scrollMiddle >= top &&
            scrollMiddle < top + height
        ) {
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

window.addEventListener("scroll", updateActiveNav);
window.addEventListener("load", updateActiveNav);

// Hamburger Menu Toggle
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show-menu");
});

document.querySelectorAll("#navMenu a").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("show-menu");
    });
});

