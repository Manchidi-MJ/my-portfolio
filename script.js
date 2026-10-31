/* =========================================================
   Magaseng John Manchidi — Portfolio logic
   Pure vanilla JS. No build step. Progressive enhancement:
   content remains usable if any single module fails.
   ========================================================= */
'use strict';

const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Enable reveal animations only when JS is running. Without this class,
// `.reveal` elements stay fully visible, so the page can never render blank
// if JavaScript is disabled or fails to execute.
document.documentElement.classList.add('js-reveal');

/* ---------------------------------------------------------
   DATA — only verified projects/skills, sourced from the
   repository, the honours thesis, and the owner's public
   GitHub profile (github.com/Manchidi-MJ).
--------------------------------------------------------- */

const INTERESTS = [
    'Computer Science', 'Data Engineering', 'Software Engineering',
    'Artificial Intelligence', 'Machine Learning', 'Data Science',
    'Data Analytics', 'Database Systems', 'Cloud Computing',
    'Cybersecurity', 'Networking', 'Technology Research'
];

const SKILLS = [
    { cat: 'Languages', icon: 'fa-code', items: ['Python', 'Java', 'C++', 'R', 'SQL', 'Bash'] },
    { cat: 'Data Engineering', icon: 'fa-diagram-project', items: ['PySpark', 'Big Data Processing', 'ETL / Pipelines', 'Data Cleaning', 'Feature Engineering'] },
    { cat: 'AI / Machine Learning', icon: 'fa-brain', items: ['Scikit-learn', 'TensorFlow', 'OpenCV', 'Classification', 'Model Evaluation', 'Agentic AI'] },
    { cat: 'Data Analytics', icon: 'fa-chart-line', items: ['Pandas', 'Plotly', 'RFM Segmentation', 'Statistical Modelling', 'Data Visualisation'] },
    { cat: 'Databases', icon: 'fa-database', items: ['MySQL', 'PostgreSQL', 'SQL Querying', 'Schema Design'] },
    { cat: 'Software & Web', icon: 'fa-laptop-code', items: ['Streamlit', 'FastAPI', 'Flask', 'HTML / CSS / JS', 'REST APIs'] },
    { cat: 'Cloud & DevOps', icon: 'fa-cloud', items: ['AWS', 'Docker', 'Git / GitHub'] },
    { cat: 'Cybersecurity & Networking', icon: 'fa-shield-halved', items: ['Snort (IDS/IPS)', 'pfSense', 'Wireshark', 'Nmap', 'Metasploit', 'Security Onion', 'Splunk'] },
    { cat: 'Tools & Platforms', icon: 'fa-screwdriver-wrench', items: ['VMware', 'VirtualBox', 'Active Directory', 'Windows Server', 'Linux', 'Jupyter'] }
];

const PROJECTS = [
    {
        id: 'bigdata',
        title: 'E-Commerce Customer Churn & Big Data Analytics',
        date: '2026',
        category: 'data-eng',
        type: 'Academic · Individual',
        desc: 'A reproducible big-data project: PySpark data engineering, RFM customer segmentation and leakage-aware machine-learning churn prediction — with an honest data-leakage audit as its key finding.',
        tech: ['Python', 'PySpark', 'Scikit-learn', 'Pandas', 'Jupyter'],
        repo: 'https://github.com/Manchidi-MJ/Big_Data_Challenge_Project',
        icon: 'fa-fire',
        grad: 'linear-gradient(135deg,#e0652f,#b5301f)',
        study: {
            overview: 'An end-to-end big-data pipeline built around the Kaggle E-Commerce Customer Churn 2025 (10K) dataset, covering data engineering with PySpark, exploratory analysis, true RFM segmentation and leakage-aware churn classification.',
            problem: 'Predict customer churn from e-commerce behaviour — and, critically, determine whether the behavioural signals genuinely predict churn or merely restate the label.',
            objectives: ['Engineer a clean, reproducible PySpark pipeline', 'Perform genuine RFM (Recency, Frequency, Monetary) segmentation', 'Train and evaluate churn classifiers honestly', 'Audit the dataset for data leakage'],
            contribution: 'Sole author of the pipeline, modules, notebooks, tests and written reports.',
            methodology: 'Structured into understanding → PySpark cleaning → EDA + RFM → modelling, with reusable modules and a pytest suite using synthetic fixtures.',
            challenges: 'Discovering that the churn label was a deterministic rule (churned == days_since_last_purchase > 90), which a model can reproduce at ~100% without actually predicting.',
            results: 'With leakage fields removed, no behavioural feature meaningfully predicted churn (ROC-AUC ≈ 0.54). The most valuable deliverable is the documented leakage audit and the honest, leakage-aware pipeline built around it.',
            lessons: 'High headline accuracy can be an artefact of leakage. Rigorous auditing and honest reporting matter more than an impressive-looking score.'
        }
    },
    {
        id: 'inspectai',
        title: 'InspectAI — Agentic Visual Quality Inspector',
        date: '2026',
        category: 'ai',
        type: 'Personal · Competition entry',
        desc: 'Localises visual anomalies on manufactured surfaces with OpenCV 5, then runs an explicit agentic decision loop (re-inspect, pass, flag, or escalate to a human) with a full auditable decision trace.',
        tech: ['Python', 'OpenCV', 'FastAPI', 'Streamlit', 'AWS', 'Docker'],
        repo: 'https://github.com/Manchidi-MJ/inspectai-agentic-vision',
        icon: 'fa-robot',
        grad: 'linear-gradient(135deg,#4c8dff,#2f6fe0)',
        study: {
            overview: 'A decision-support visual inspection system built for the OpenCV AI Competition 2026 (powered by AWS). It combines an OpenCV 5 vision pipeline with an agentic controller that evaluates its own evidence before deciding what happens next.',
            problem: 'Surface-defect inspection needs both detection and accountable decisions — not just a classifier output, but a traceable choice about re-inspecting, passing, flagging or escalating.',
            objectives: ['Build an OpenCV 5 anomaly-detection pipeline', 'Implement an explicit agentic decision loop', 'Expose a FastAPI inspection API and a Streamlit UI', 'Make every decision auditable; keep a human in the loop'],
            contribution: 'Designed and implemented the vision pipeline, agent controller, API, UI, synthetic dataset generator, evaluation and tests.',
            methodology: 'Agent loop: perceive → evaluate → choose → act → observe → terminate, over an OpenCV pipeline (decode, normalise, quality, anomaly map, segmentation). Reproducible synthetic labelled data and a 27-test suite.',
            challenges: 'Designing an honest, auditable decision loop and clearly communicating that flagged regions are potential anomalies requiring human verification — this is decision-support, not a certified inspector.',
            results: 'A working, reproducible system with a FastAPI service, Streamlit UI, AWS deployment configuration, a passing test suite, and documentation covering evaluation and responsible use.',
            lessons: 'Agentic systems in safety-adjacent domains must be transparent and keep humans in control; responsible-use framing is part of the engineering, not an afterthought.'
        }
    },
    {
        id: 'fintrack',
        title: 'FinTrack SA — Personal Finance Tracker',
        date: '2026',
        category: 'software',
        type: 'Personal',
        desc: 'A South-African-focused personal finance app (all amounts in ZAR) with a dashboard, transaction and budget management, account balances, goals, and interactive Plotly visualisations — built with Streamlit.',
        tech: ['Python', 'Streamlit', 'Plotly'],
        repo: 'https://github.com/Manchidi-MJ/css2026-finance_tracker_zar',
        icon: 'fa-wallet',
        grad: 'linear-gradient(135deg,#2bb673,#15925a)',
        study: {
            overview: 'A personal finance management application optimised for South African users, with income/expense tracking, budgeting and goal setting, all denominated in ZAR.',
            problem: 'Give South African users a simple, localised tool to track spending, budgets and financial goals.',
            objectives: ['Interactive financial dashboard', 'Income & expense transaction management', 'Budget tracking and financial goals', 'ZAR-localised, responsive interface'],
            contribution: 'Author of the Streamlit application and its data-visualisation layer.',
            methodology: 'Built with Streamlit for the UI and Plotly for interactive charts, structured around transactions, accounts, budgets and goals.',
            challenges: 'Presenting financial data clearly and keeping the interface responsive and easy to use.',
            results: 'A runnable Streamlit app that visualises personal finances and supports budget and goal tracking in ZAR.',
            lessons: 'Localisation (currency, context) and clear data visualisation make a tool meaningfully more useful to its intended users.'
        }
    },
    {
        id: 'ransomware',
        title: 'ML for Adaptive Ransomware Detection (Honours)',
        date: '2025',
        category: 'ai',
        type: 'Academic · Honours research',
        desc: 'Honours thesis evaluating supervised and unsupervised ML models for ransomware detection on public datasets (Malimg, Microsoft BIG 2015), reporting a best Random Forest accuracy of 99.34% on the evaluated data.',
        tech: ['Python', 'Scikit-learn', 'TensorFlow', 'Pandas'],
        repo: null,
        paper: 'Research Paper.pdf',
        icon: 'fa-virus-covid',
        grad: 'linear-gradient(135deg,#7a5cff,#5a3fd6)',
        study: {
            overview: 'A comparative study of machine-learning techniques for detecting ransomware, conducted as my BSc Honours research at the University of Limpopo (supervisors: Dr S.S. Mapunya, Prof M. Velempini).',
            problem: 'Evaluate how well supervised and unsupervised ML models detect ransomware, including adaptability toward previously unseen variants.',
            objectives: ['Evaluate multiple ML models on public malware datasets', 'Analyse feature importance', 'Assess adaptability to new variants'],
            contribution: 'Author of the honours research, experiments and write-up.',
            methodology: 'Trained and compared models on the Malimg and Microsoft BIG 2015 datasets, analysing accuracy and feature importance.',
            challenges: 'Handling malware datasets responsibly and interpreting model behaviour toward unseen variants.',
            results: 'A best reported Random Forest accuracy of 99.34% on the evaluated data, with analysis of ensemble effectiveness and feature importance.',
            lessons: 'Ensemble methods performed strongly on these datasets; evaluating adaptability to zero-day variants remains an open, important challenge.'
        }
    },
    {
        id: 'ids',
        title: 'Intrusion Detection & Prevention System (IDS/IPS)',
        date: '2025',
        category: 'security',
        type: 'Academic · Lab project',
        desc: 'Configured Snort on Ubuntu to monitor traffic between a Kali attacker and a Metasploitable target, with custom rules detecting and blocking ICMP, Telnet, FTP, SSH and port scans across IDS and IPS modes.',
        tech: ['Snort', 'Ubuntu', 'Kali Linux', 'Metasploitable', 'VirtualBox'],
        repo: null,
        icon: 'fa-shield-halved',
        grad: 'linear-gradient(135deg,#ff6b6b,#d1374a)',
        study: {
            overview: 'A hands-on network-security lab deploying Snort as both an intrusion detection and prevention system in a controlled virtual environment.',
            problem: 'Detect and block common network attacks in a reproducible lab setting.',
            objectives: ['Deploy Snort on Ubuntu', 'Write custom detection rules', 'Validate detection (IDS) and blocking (IPS) behaviour'],
            contribution: 'Built the lab, authored the Snort rules and ran the attack/defence tests.',
            methodology: 'Virtual network with Kali (attacker), Metasploitable (target) and Snort (sensor) in VirtualBox; custom rules for ICMP, Telnet, FTP, SSH and port scans.',
            challenges: 'Tuning rules to reliably detect attacks while operating cleanly in inline IPS mode.',
            results: 'Reliable detection of the tested attacks in IDS mode and successful blocking of malicious traffic in IPS mode within the lab.',
            lessons: 'Signature design and placement are central to effective, low-noise intrusion detection and prevention.'
        }
    },
    {
        id: 'homelab',
        title: 'Cybersecurity HomeLab (Virtual Enterprise)',
        date: '2025',
        category: 'security',
        type: 'Personal · Lab project',
        desc: 'A virtualised small-business network in VMware with a pfSense firewall, segmented networks (DMZ / corporate / security), an Active Directory domain controller, mixed endpoints and monitoring via Security Onion and Splunk.',
        tech: ['VMware', 'pfSense', 'Windows Server', 'Active Directory', 'Security Onion', 'Splunk'],
        repo: null,
        icon: 'fa-network-wired',
        grad: 'linear-gradient(135deg,#1fa2b8,#157f9a)',
        study: {
            overview: 'A self-built lab simulating an enterprise IT environment for security testing and monitoring.',
            problem: 'Create a realistic, segmented enterprise network to practise defence, monitoring and incident analysis.',
            objectives: ['Deploy pfSense with DMZ/corporate/security segments', 'Stand up Active Directory and endpoints', 'Add monitoring with Security Onion and Splunk'],
            contribution: 'Designed and deployed the full virtual environment and monitoring stack.',
            methodology: 'VMware Workstation hosting segmented networks, a domain controller, Windows/Linux endpoints and SIEM/monitoring tools.',
            challenges: 'Configuring network segmentation and integrating monitoring tools into a coherent, observable environment.',
            results: 'A functioning virtual enterprise environment suitable for security testing and hands-on monitoring practice.',
            lessons: 'Hands-on labs build practical intuition for segmentation, directory services and security monitoring that theory alone cannot.'
        }
    },
    {
        id: 'db',
        title: 'Secure Backend Database System',
        date: '2025',
        category: 'database',
        type: 'Academic',
        desc: 'Designed and implemented secure database systems with Python, MySQL and PostgreSQL — focusing on secure storage, query optimisation and reliability, with testing and debugging throughout.',
        tech: ['Python', 'MySQL', 'PostgreSQL'],
        repo: null,
        icon: 'fa-database',
        grad: 'linear-gradient(135deg,#4c8dff,#1fa2b8)',
        study: {
            overview: 'A backend database project focused on secure, reliable data storage and efficient querying.',
            problem: 'Store data securely and serve queries efficiently and reliably.',
            objectives: ['Design secure schemas', 'Optimise queries', 'Ensure reliability through testing'],
            contribution: 'Designed the schema and implemented and tested the backend.',
            methodology: 'Implemented with Python against MySQL and PostgreSQL, with query optimisation and systematic debugging.',
            challenges: 'Balancing secure design with query performance.',
            results: 'A tested backend database system demonstrating secure storage and optimised queries.',
            lessons: 'Schema design decisions have a direct, lasting impact on both security and performance.'
        }
    },
    {
        id: 'dashboard',
        title: 'Data Analytics Dashboard',
        date: '2024',
        category: 'data-sci',
        type: 'Personal',
        desc: 'A web-based analytics dashboard concept for retail sales data, using interactive charts and filtering to surface insights into sales trends, customer behaviour and product performance.',
        tech: ['HTML', 'CSS', 'JavaScript', 'Data Visualisation'],
        repo: 'https://github.com/Manchidi-MJ/data-analysis-dashboard',
        icon: 'fa-chart-pie',
        grad: 'linear-gradient(135deg,#e8b64c,#c9922c)',
        study: {
            overview: 'A dashboard project for exploring retail sales data through interactive visualisations and filtering.',
            problem: 'Make retail sales data explorable and insightful for non-technical viewers.',
            objectives: ['Visualise sales with multiple chart types', 'Provide filtering and drill-down', 'Keep the interface user-friendly'],
            contribution: 'Author of the dashboard concept and front-end implementation.',
            methodology: 'Front-end built with HTML/CSS/JavaScript and charting libraries for interactive visualisation.',
            challenges: 'Designing clear, interactive visualisations that remain easy to interpret.',
            results: 'A dashboard for visualising sales trends, customer behaviour and product performance.',
            lessons: 'Good analytics UX is about guiding attention — clarity and interactivity beat raw chart count.'
        }
    },
    {
        id: 'stats',
        title: 'Statistical Modelling & Data Analysis',
        date: '2023',
        category: 'data-sci',
        type: 'Academic · Group',
        desc: 'Team analysis of datasets with R and Python, applying regression and statistical-modelling techniques to find patterns and produce predictive insights, communicated through structured reports and visualisations.',
        tech: ['R', 'Python', 'Statistical Modelling'],
        repo: null,
        icon: 'fa-square-root-variable',
        grad: 'linear-gradient(135deg,#7a5cff,#4c8dff)',
        study: {
            overview: 'A collaborative data-analysis project applying statistical modelling to real datasets.',
            problem: 'Identify patterns and build predictive insight from the given datasets.',
            objectives: ['Apply regression and statistical models', 'Communicate findings clearly'],
            contribution: 'Contributed as part of a team to the analysis, modelling and reporting (group project).',
            methodology: 'Used R and Python for regression and statistical modelling, with visualisation-driven reporting.',
            challenges: 'Coordinating a team analysis and presenting statistical results accessibly.',
            results: 'Structured reports and visualisations conveying the patterns and predictive insights found.',
            lessons: 'Clear communication of statistical findings is as important as the modelling itself.'
        }
    }
];

const RESEARCH = [
    { title: 'Mobile Edge Computing (MEC)', desc: 'Investigated the Mobile Edge Computing paradigm — its benefits, challenges and use cases for latency-sensitive applications such as autonomous vehicles and smart manufacturing — and considered security and resource-management angles.', tags: ['Edge Computing', '5G', 'IoT'] },
    { title: 'Inadequate Post-Attack Procedures in Cybersecurity', desc: 'Examined the importance of post-attack procedures, identified common gaps in incident response and discussed practices for more effective recovery and organisational resilience.', tags: ['Incident Response', 'Forensics', 'Recovery'] },
    { title: 'Cybersecurity HomeLab Implementation', desc: 'Documented building a cybersecurity homelab simulating a small-business network with pfSense, Active Directory and security-monitoring tooling.', tags: ['pfSense', 'Active Directory', 'SIEM'] },
    { title: 'IDS/IPS Configuration with Snort', desc: 'Developed and tested custom Snort rules for detecting and preventing network attacks in a controlled virtual lab.', tags: ['Snort', 'Kali Linux', 'Metasploitable'] }
];

const PROJECT_CATS = [
    { key: 'all', label: 'All' },
    { key: 'data-eng', label: 'Data Engineering' },
    { key: 'ai', label: 'AI / ML' },
    { key: 'data-sci', label: 'Data Science' },
    { key: 'software', label: 'Software' },
    { key: 'database', label: 'Databases' },
    { key: 'security', label: 'Cybersecurity' }
];

/* ---------------------------------------------------------
   LOADER
   Hide reliably whether or not the window 'load' event has
   already fired, and always hide via a hard timeout so the
   overlay can never get stuck covering the page.
--------------------------------------------------------- */
(function loader() {
    const el = $('#loader');
    if (!el) return;
    let done = false;
    const hide = () => { if (done) return; done = true; el.classList.add('hidden'); };
    const delay = prefersReduced ? 150 : 700;

    if (document.readyState === 'complete') {
        // 'load' has already fired — hide after a short beat.
        setTimeout(hide, delay);
    } else {
        window.addEventListener('load', () => setTimeout(hide, delay), { once: true });
    }
    // Hard safety net: never let the loader stay longer than 3s.
    setTimeout(hide, 3000);
})();

/* ---------------------------------------------------------
   THEME
--------------------------------------------------------- */
(function theme() {
    const root = document.documentElement;
    const btn = $('#themeToggle');
    const stored = localStorage.getItem('theme');
    const sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = stored || (sysDark ? 'dark' : 'light');
    apply(initial);

    function apply(mode) {
        root.setAttribute('data-theme', mode);
        if (btn) {
            btn.setAttribute('aria-pressed', mode === 'light');
            btn.querySelector('i').className = mode === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }
    if (btn) btn.addEventListener('click', () => {
        const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', next);
        apply(next);
    });
})();

/* ---------------------------------------------------------
   HEADER + SCROLL PROGRESS + ACTIVE NAV + BACK TO TOP
--------------------------------------------------------- */
(function scrollUI() {
    const header = $('#header');
    const progress = $('#scrollProgress');
    const backTop = $('#backToTop');
    const sections = $$('main .section');
    const navItems = $$('.nav-link');

    function onScroll() {
        const y = window.scrollY;
        if (header) header.classList.toggle('scrolled', y > 20);
        if (backTop) backTop.classList.toggle('show', y > 500);
        if (progress) {
            const h = document.documentElement.scrollHeight - window.innerHeight;
            progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
        }
        let current = '';
        sections.forEach(s => { if (y >= s.offsetTop - 140) current = s.id; });
        navItems.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (backTop) backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' }));
})();

/* ---------------------------------------------------------
   MOBILE MENU
--------------------------------------------------------- */
(function mobileMenu() {
    const toggle = $('#menuToggle');
    const links = $('#navLinks');
    if (!toggle || !links) return;
    function close() { links.classList.remove('open'); toggle.classList.remove('active'); toggle.setAttribute('aria-expanded', 'false'); }
    toggle.addEventListener('click', () => {
        const open = links.classList.toggle('open');
        toggle.classList.toggle('active', open);
        toggle.setAttribute('aria-expanded', String(open));
    });
    links.addEventListener('click', e => { if (e.target.matches('a')) close(); });
})();

/* ---------------------------------------------------------
   HERO ROTATOR (typing effect, reduced-motion aware)
--------------------------------------------------------- */
(function rotator() {
    const el = $('#rotator');
    if (!el) return;
    const words = ['Data Engineering', 'Software Development', 'Machine Learning', 'Data Science', 'Cloud & Cybersecurity', 'Technology Research'];
    if (prefersReduced) { el.textContent = words[0]; return; }
    let w = 0, c = 0, deleting = false;
    (function tick() {
        const word = words[w];
        c += deleting ? -1 : 1;
        el.textContent = word.slice(0, c);
        let delay = deleting ? 55 : 110;
        if (!deleting && c === word.length) { deleting = true; delay = 1600; }
        else if (deleting && c === 0) { deleting = false; w = (w + 1) % words.length; delay = 350; }
        setTimeout(tick, delay);
    })();
})();

/* ---------------------------------------------------------
   INTERESTS + SKILLS
--------------------------------------------------------- */
(function interests() {
    const box = $('#interestTags');
    if (!box) return;
    box.innerHTML = INTERESTS.map(i => `<span class="interest-tag">${i}</span>`).join('');
})();

/* ---------------------------------------------------------
   SERVICES / "WHAT I BRING"
--------------------------------------------------------- */
(function services() {
    const grid = $('#servicesGrid');
    if (!grid) return;
    const SERVICES = [
        { icon: 'fa-diagram-project', title: 'Data Engineering', text: 'Building reproducible data pipelines with PySpark — cleaning, transforming and modelling data for analysis and ML.' },
        { icon: 'fa-brain', title: 'AI & Machine Learning', text: 'Applying and evaluating ML models rigorously — including auditing for pitfalls like data leakage — using scikit-learn, TensorFlow and OpenCV.' },
        { icon: 'fa-laptop-code', title: 'Software Development', text: 'Shipping practical applications and APIs with Python, Streamlit, FastAPI and modern web technologies.' },
        { icon: 'fa-chart-line', title: 'Data Science & Analytics', text: 'Turning raw data into insight with Pandas, statistical modelling, RFM segmentation and clear visualisation.' },
        { icon: 'fa-shield-halved', title: 'Cybersecurity & Networking', text: 'Hands-on security labs — IDS/IPS with Snort, segmented virtual enterprise networks and SIEM monitoring.' },
        { icon: 'fa-square-root-variable', title: 'Mathematical Foundations', text: 'A BSc in Mathematical Sciences underpinning my work with solid grounding in analysis, statistics and computation.' }
    ];
    grid.innerHTML = SERVICES.map(s => `
        <article class="service-card">
            <div class="service-ico"><i class="fas ${s.icon}" aria-hidden="true"></i></div>
            <h3>${s.title}</h3>
            <p>${s.text}</p>
        </article>`).join('');
})();

/* ---------------------------------------------------------
   ANIMATED STAT COUNTERS
--------------------------------------------------------- */
(function stats() {
    const nums = $$('.stat-num');
    if (!nums.length) return;
    function run(el) {
        const target = +el.dataset.count || 0;
        const suffix = el.dataset.suffix || '';
        if (prefersReduced) { el.textContent = target + suffix; return; }
        const dur = 1200; const start = performance.now();
        (function frame(now) {
            const p = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(target * eased) + suffix;
            if (p < 1) requestAnimationFrame(frame);
        })(start);
    }
    if (typeof IntersectionObserver === 'undefined') { nums.forEach(run); return; }
    const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(en => { if (en.isIntersecting) { run(en.target); obs.unobserve(en.target); } });
    }, { threshold: 0.5 });
    nums.forEach(n => io.observe(n));
})();

(function skills() {
    const grid = $('#skillsGrid');
    const filter = $('#skillsFilter');
    if (!grid || !filter) return;
    const cats = ['All', ...SKILLS.map(s => s.cat)];
    filter.innerHTML = cats.map((c, i) =>
        `<button class="chip-btn ${i === 0 ? 'active' : ''}" role="tab" data-cat="${c}">${c}</button>`).join('');

    function render(cat) {
        const list = cat === 'All' ? SKILLS : SKILLS.filter(s => s.cat === cat);
        grid.innerHTML = list.map(s => `
            <div class="skill-card">
                <h4><i class="fas ${s.icon}" aria-hidden="true"></i> ${s.cat}</h4>
                <div class="skill-tags">${s.items.map(t => `<span>${t}</span>`).join('')}</div>
            </div>`).join('');
        observeReveals();
    }
    filter.addEventListener('click', e => {
        const b = e.target.closest('.chip-btn');
        if (!b) return;
        $$('.chip-btn', filter).forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        render(b.dataset.cat);
    });
    render('All');
})();

/* ---------------------------------------------------------
   PROJECTS — render, search, filter, case studies
--------------------------------------------------------- */
const projectUI = (function projects() {
    const grid = $('#projectsContainer');
    const filterBox = $('#projectsFilter');
    const search = $('#projectSearch');
    const empty = $('#projectsEmpty');
    if (!grid) return {};

    filterBox.innerHTML = PROJECT_CATS.map((c, i) =>
        `<button class="chip-btn ${i === 0 ? 'active' : ''}" role="tab" data-cat="${c.key}">${c.label}</button>`).join('');

    let activeCat = 'all';
    let query = '';

    function esc(s) { return String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m])); }

    function matches(p) {
        const catOk = activeCat === 'all' || p.category === activeCat;
        if (!catOk) return false;
        if (!query) return true;
        const hay = (p.title + ' ' + p.desc + ' ' + p.tech.join(' ') + ' ' + p.type).toLowerCase();
        return hay.includes(query);
    }

    function card(p) {
        const links = [];
        if (p.repo) links.push(`<a href="${p.repo}" target="_blank" rel="noopener noreferrer"><i class="fab fa-github" aria-hidden="true"></i> Code</a>`);
        if (p.paper) links.push(`<a href="${esc(p.paper)}" target="_blank" rel="noopener"><i class="fas fa-file-pdf" aria-hidden="true"></i> Paper</a>`);
        return `
        <article class="project-card" data-id="${p.id}" tabindex="0" role="button" aria-label="Open case study: ${esc(p.title)}">
            <div class="project-thumb" style="background:${p.grad}">
                <i class="fas ${p.icon}" aria-hidden="true"></i>
                <span class="cat-label">${esc(p.type)}</span>
            </div>
            <div class="project-body">
                <h3>${esc(p.title)}</h3>
                <span class="project-date">${esc(p.date)}</span>
                <p class="project-desc">${esc(p.desc)}</p>
                <div class="project-tags">${p.tech.map(t => `<span>${esc(t)}</span>`).join('')}</div>
                <div class="project-foot">
                    <div class="project-links">${links.join('')}</div>
                    <span class="case-link">Case study <i class="fas fa-arrow-right" aria-hidden="true"></i></span>
                </div>
            </div>
        </article>`;
    }

    function render() {
        const list = PROJECTS.filter(matches);
        grid.innerHTML = list.map(card).join('');
        if (empty) empty.hidden = list.length !== 0;
        observeReveals();
    }

    filterBox.addEventListener('click', e => {
        const b = e.target.closest('.chip-btn');
        if (!b) return;
        $$('.chip-btn', filterBox).forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        activeCat = b.dataset.cat;
        render();
    });

    if (search) {
        let deb;
        search.addEventListener('input', () => {
            clearTimeout(deb);
            deb = setTimeout(() => { query = search.value.trim().toLowerCase(); render(); }, 120);
        });
    }

    grid.addEventListener('click', e => {
        const linkEl = e.target.closest('a');
        if (linkEl) return; // let real links work
        const c = e.target.closest('.project-card');
        if (c) openCaseStudy(c.dataset.id);
    });
    grid.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            const c = e.target.closest('.project-card');
            if (c) { e.preventDefault(); openCaseStudy(c.dataset.id); }
        }
    });

    render();
    return { render };
})();

/* ---------------------------------------------------------
   CASE STUDY MODAL
--------------------------------------------------------- */
let lastFocused = null;
function openCaseStudy(id) {
    const p = PROJECTS.find(x => x.id === id);
    const overlay = $('#projectModal');
    const body = $('#modalBody');
    if (!p || !overlay || !body) return;
    const s = p.study;
    const esc = t => String(t).replace(/[&<>]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[m]));
    const block = (icon, title, content) => `<div class="cs-block"><h4><i class="fas ${icon}" aria-hidden="true"></i> ${title}</h4>${content}</div>`;
    const list = arr => `<ul>${arr.map(i => `<li>${esc(i)}</li>`).join('')}</ul>`;

    const links = [];
    if (p.repo) links.push(`<a class="btn ghost" href="${p.repo}" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i> View source</a>`);
    if (p.paper) links.push(`<a class="btn ghost" href="${esc(p.paper)}" target="_blank" rel="noopener"><i class="fas fa-file-pdf"></i> Read paper</a>`);

    body.innerHTML = `
        <div class="modal-head">
            <h3 id="modalTitle">${esc(p.title)}</h3>
            <p class="m-meta">${esc(p.type)} · ${esc(p.date)}</p>
        </div>
        <div style="padding:32px">
            ${block('fa-circle-info', 'Overview', `<p>${esc(s.overview)}</p>`)}
            ${block('fa-bullseye', 'Problem statement', `<p>${esc(s.problem)}</p>`)}
            ${block('fa-list-check', 'Objectives', list(s.objectives))}
            ${block('fa-user', 'My contribution', `<p>${esc(s.contribution)}</p>`)}
            ${block('fa-gears', 'Methodology', `<p>${esc(s.methodology)}</p>`)}
            ${block('fa-triangle-exclamation', 'Challenges', `<p>${esc(s.challenges)}</p>`)}
            ${block('fa-chart-simple', 'Results & outcomes', `<p>${esc(s.results)}</p>`)}
            ${block('fa-lightbulb', 'Lessons learned', `<p>${esc(s.lessons)}</p>`)}
            ${block('fa-microchip', 'Technologies', `<div class="tag-row">${p.tech.map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div>`)}
            ${links.length ? `<div class="modal-links">${links.join('')}</div>` : ''}
        </div>`;
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    lastFocused = document.activeElement;
    $('#modalClose').focus();
}
function closeModal() {
    const overlay = $('#projectModal');
    if (!overlay || overlay.hidden) return;
    overlay.hidden = true;
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
}
(function modalEvents() {
    const overlay = $('#projectModal');
    if (!overlay) return;
    $('#modalClose').addEventListener('click', closeModal);
    overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
})();

/* ---------------------------------------------------------
   RESEARCH GRID
--------------------------------------------------------- */
(function research() {
    const grid = $('#researchGrid');
    if (!grid) return;
    grid.innerHTML = RESEARCH.map(r => `
        <div class="research-card">
            <h4>${r.title}</h4>
            <p>${r.desc}</p>
            <div class="tag-row">${r.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
        </div>`).join('');
})();

/* ---------------------------------------------------------
   GITHUB INTEGRATION (graceful fallback)
--------------------------------------------------------- */
(function github() {
    const box = $('#ghRepos');
    if (!box) return;
    const LANG = { Python: '#3572A5', 'Jupyter Notebook': '#DA5B0B', HTML: '#e34c26', CSS: '#563d7c', JavaScript: '#f1e05a' };
    const fallback = [
        { name: 'Big_Data_Challenge_Project', description: 'E-commerce churn prediction, RFM segmentation and PySpark big-data processing.', language: 'Jupyter Notebook', html_url: 'https://github.com/Manchidi-MJ/Big_Data_Challenge_Project', stargazers_count: 0, forks_count: 0 },
        { name: 'inspectai-agentic-vision', description: 'Agentic AI visual inspection with OpenCV 5 and AWS; auditable decision loop with human review.', language: 'Python', html_url: 'https://github.com/Manchidi-MJ/inspectai-agentic-vision', stargazers_count: 0, forks_count: 0 },
        { name: 'css2026-finance_tracker_zar', description: 'FinTrack SA — South African personal finance tracker built with Streamlit (ZAR).', language: 'Python', html_url: 'https://github.com/Manchidi-MJ/css2026-finance_tracker_zar', stargazers_count: 0, forks_count: 0 },
        { name: 'data-analysis-dashboard', description: 'Web-based data analytics dashboard for retail sales insights.', language: 'HTML', html_url: 'https://github.com/Manchidi-MJ/data-analysis-dashboard', stargazers_count: 0, forks_count: 0 }
    ];

    function esc(s) { return String(s || '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m])); }
    function fmtDate(d) { try { return new Date(d).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }); } catch { return ''; } }

    function render(repos, note) {
        box.innerHTML = repos.map(r => {
            const dot = LANG[r.language] || '#8a98b5';
            return `
            <a class="gh-card" href="${esc(r.html_url)}" target="_blank" rel="noopener noreferrer">
                <h4><i class="fas fa-book-bookmark" aria-hidden="true"></i> ${esc(r.name)}</h4>
                <p>${esc(r.description) || 'No description provided.'}</p>
                <div class="gh-meta">
                    ${r.language ? `<span><i class="lang-dot" style="background:${dot}"></i>${esc(r.language)}</span>` : ''}
                    <span><i class="fas fa-star" aria-hidden="true"></i> ${r.stargazers_count || 0}</span>
                    <span><i class="fas fa-code-fork" aria-hidden="true"></i> ${r.forks_count || 0}</span>
                    ${r.updated_at ? `<span><i class="fas fa-rotate" aria-hidden="true"></i> ${fmtDate(r.updated_at)}</span>` : ''}
                </div>
            </a>`;
        }).join('') + (note ? `<p class="gh-error" style="grid-column:1/-1">${note}</p>` : '');
    }

    const ctrl = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timer = setTimeout(() => ctrl && ctrl.abort(), 6000);

    fetch('https://api.github.com/users/Manchidi-MJ/repos?sort=updated&per_page=100', ctrl ? { signal: ctrl.signal } : {})
        .then(r => { if (!r.ok) throw new Error('rate'); return r.json(); })
        .then(data => {
            clearTimeout(timer);
            const repos = data
                .filter(r => !r.fork && r.name !== 'my-portfolio')
                .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
                .slice(0, 6);
            render(repos.length ? repos : fallback);
        })
        .catch(() => { clearTimeout(timer); render(fallback, 'Showing a curated selection (live GitHub data unavailable right now).'); });
})();

/* ---------------------------------------------------------
   CV DETECTION — only enable download if CV.pdf exists
--------------------------------------------------------- */
(function cv() {
    const actions = $('#cvActions');
    const text = $('#cvText');
    const hint = $('#cvHint');
    if (!actions) return;
    fetch('CV.pdf', { method: 'HEAD' })
        .then(r => {
            const type = r.headers.get('content-type') || '';
            if (r.ok && !type.includes('text/html')) {
                actions.innerHTML = `<a class="btn primary" href="CV.pdf" download><i class="fas fa-file-arrow-down"></i> Download CV (PDF)</a>
                    <a class="btn ghost" href="CV.pdf" target="_blank" rel="noopener"><i class="fas fa-eye"></i> View</a>`;
                if (text) text.textContent = 'My latest curriculum vitae is available to download below.';
                if (hint) hint.hidden = true;
            }
        })
        .catch(() => { /* keep placeholder */ });
})();

/* ---------------------------------------------------------
   CONTACT FORM — validation + Web3Forms + states
--------------------------------------------------------- */
(function contact() {
    const form = $('#contactForm');
    if (!form) return;
    const status = $('#formStatus');
    const submit = $('#cfSubmit');
    const fields = {
        'cf-name': v => v.trim() ? '' : 'Please enter your name.',
        'cf-email': v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Please enter a valid email address.',
        'cf-subject': v => v.trim() ? '' : 'Please enter a subject.',
        'cf-message': v => v.trim().length >= 10 ? '' : 'Message should be at least 10 characters.'
    };

    function setError(id, msg) {
        const input = document.getElementById(id);
        const err = $(`.field-error[data-for="${id}"]`);
        if (input) input.classList.toggle('invalid', !!msg);
        if (err) err.textContent = msg;
        return !msg;
    }
    Object.keys(fields).forEach(id => {
        const input = document.getElementById(id);
        if (input) input.addEventListener('blur', () => setError(id, fields[id](input.value)));
    });

    form.addEventListener('submit', async e => {
        e.preventDefault();
        if (form.botcheck && form.botcheck.checked) return; // honeypot
        let valid = true;
        Object.keys(fields).forEach(id => {
            const input = document.getElementById(id);
            if (!setError(id, fields[id](input.value))) valid = false;
        });
        if (!valid) { status.textContent = 'Please fix the highlighted fields.'; status.className = 'form-status err'; return; }

        submit.classList.add('loading'); submit.disabled = true;
        status.textContent = 'Sending…'; status.className = 'form-status';

        try {
            const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
            const data = await res.json().catch(() => ({}));
            if (res.ok && data.success !== false) {
                status.textContent = '✓ Thank you! Your message has been sent.';
                status.className = 'form-status ok';
                form.reset();
            } else {
                throw new Error(data.message || 'send failed');
            }
        } catch {
            status.textContent = 'Something went wrong. Please email johnmanchidi@gmail.com directly.';
            status.className = 'form-status err';
        } finally {
            submit.classList.remove('loading'); submit.disabled = false;
        }
    });
})();

/* ---------------------------------------------------------
   COMMAND PALETTE (Ctrl/Cmd + K)
--------------------------------------------------------- */
(function palette() {
    const overlay = $('#paletteOverlay');
    const input = $('#paletteInput');
    const list = $('#paletteList');
    const emptyEl = $('#paletteEmpty');
    const trigger = $('#paletteTrigger');
    if (!overlay) return;

    const COMMANDS = [
        { label: 'Home', sub: 'Section', icon: 'fa-house', action: () => go('#home') },
        { label: 'About', sub: 'Section', icon: 'fa-user', action: () => go('#about') },
        { label: 'What I bring', sub: 'Section', icon: 'fa-star', action: () => go('#services') },
        { label: 'Education', sub: 'Section', icon: 'fa-graduation-cap', action: () => go('#education') },
        { label: 'Skills', sub: 'Section', icon: 'fa-screwdriver-wrench', action: () => go('#skills') },
        { label: 'Projects', sub: 'Section', icon: 'fa-layer-group', action: () => go('#projects') },
        { label: 'Research', sub: 'Section', icon: 'fa-flask', action: () => go('#research') },
        { label: 'GitHub section', sub: 'Section', icon: 'fa-code-branch', action: () => go('#github') },
        { label: 'CV', sub: 'Section', icon: 'fa-file-lines', action: () => go('#cv') },
        { label: 'Contact', sub: 'Section', icon: 'fa-envelope', action: () => go('#contact') },
        { label: 'Open GitHub profile', sub: 'External', icon: 'fa-github', ext: true, action: () => window.open('https://github.com/Manchidi-MJ', '_blank', 'noopener') },
        { label: 'Open LinkedIn', sub: 'External', icon: 'fa-linkedin', ext: true, action: () => window.open('https://www.linkedin.com/in/magaseng-john-manchidi-920442255/', '_blank', 'noopener') },
        { label: 'Send an email', sub: 'External', icon: 'fa-paper-plane', action: () => (window.location.href = 'mailto:johnmanchidi@gmail.com') },
        { label: 'Toggle light / dark theme', sub: 'Action', icon: 'fa-circle-half-stroke', action: () => $('#themeToggle').click() }
    ];

    let filtered = COMMANDS.slice();
    let idx = 0;
    let lastFocusP = null;

    function go(hash) { close(); const el = $(hash); if (el) el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' }); }
    function iconClass(c) { return c.ext ? `fab ${c.icon}` : `fas ${c.icon}`; }

    function renderList() {
        list.innerHTML = filtered.map((c, i) => `
            <li class="palette-item ${i === idx ? 'active' : ''}" role="option" data-i="${i}" aria-selected="${i === idx}">
                <span class="pi-icon"><i class="${iconClass(c)}" aria-hidden="true"></i></span>
                <span>${c.label}</span>
                <span class="pi-sub">${c.sub}</span>
            </li>`).join('');
        if (emptyEl) emptyEl.hidden = filtered.length !== 0;
    }
    function filter() {
        const q = input.value.trim().toLowerCase();
        filtered = q ? COMMANDS.filter(c => c.label.toLowerCase().includes(q) || c.sub.toLowerCase().includes(q)) : COMMANDS.slice();
        idx = 0; renderList();
    }
    function open() {
        lastFocusP = document.activeElement;
        overlay.hidden = false; document.body.style.overflow = 'hidden';
        input.value = ''; filter(); setTimeout(() => input.focus(), 20);
    }
    function close() {
        overlay.hidden = true; document.body.style.overflow = '';
        if (lastFocusP) lastFocusP.focus();
    }
    function run() { const c = filtered[idx]; if (c) c.action(); }

    if (trigger) trigger.addEventListener('click', open);
    input.addEventListener('input', filter);
    list.addEventListener('click', e => { const li = e.target.closest('.palette-item'); if (li) { idx = +li.dataset.i; run(); } });
    list.addEventListener('mousemove', e => { const li = e.target.closest('.palette-item'); if (li && +li.dataset.i !== idx) { idx = +li.dataset.i; renderList(); } });
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });

    input.addEventListener('keydown', e => {
        if (e.key === 'ArrowDown') { e.preventDefault(); idx = Math.min(idx + 1, filtered.length - 1); renderList(); scrollActive(); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); idx = Math.max(idx - 1, 0); renderList(); scrollActive(); }
        else if (e.key === 'Enter') { e.preventDefault(); run(); }
    });
    function scrollActive() { const a = $('.palette-item.active', list); if (a) a.scrollIntoView({ block: 'nearest' }); }

    document.addEventListener('keydown', e => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); overlay.hidden ? open() : close(); }
        else if (e.key === 'Escape') { if (!overlay.hidden) close(); closeModal(); }
    });
})();

/* ---------------------------------------------------------
   SCROLL REVEAL (IntersectionObserver)
--------------------------------------------------------- */
let revealObserver;
function revealAll() { $$('.reveal').forEach(el => el.classList.add('visible')); }
function observeReveals() {
    // If reduced motion is requested or IntersectionObserver is unavailable,
    // just show everything immediately.
    if (prefersReduced || typeof IntersectionObserver === 'undefined') { revealAll(); return; }
    if (!revealObserver) {
        revealObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('visible'); obs.unobserve(en.target); } });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    }
    $$('.reveal:not(.visible)').forEach(el => revealObserver.observe(el));
}
observeReveals();
// Fail-safe: whatever happens, reveal everything after 2.5s so content is
// never left permanently hidden.
setTimeout(revealAll, 2500);

/* ---------------------------------------------------------
   FOOTER YEAR
--------------------------------------------------------- */
(function year() { const y = $('#year'); if (y) y.textContent = new Date().getFullYear(); })();
