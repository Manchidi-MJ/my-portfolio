/* =========================================================
   Portfolio DATA — single source of truth for content.
   Pure data, no DOM. Loaded as a classic script before
   script.js (browser) and read by scripts/prerender.mjs
   (build time) so the site renders without JavaScript.
   Exposes window.PORTFOLIO in the browser; module.exports in Node.
   ========================================================= */
(function (root) {
    'use strict';

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
            featured: true,
            title: 'E-Commerce Customer Churn & Big Data Analytics',
            date: '2026',
            category: 'data-eng',
            type: 'Academic · Individual',
            desc: 'A reproducible big-data project: PySpark data engineering, RFM customer segmentation and leakage-aware machine-learning churn prediction — with an honest data-leakage audit as its key finding.',
            tech: ['Python', 'PySpark', 'Scikit-learn', 'Pandas', 'Jupyter'],
            track: 'data',
            status: 'verified',
            statusDetail: 'Built and verified: reproducible pipeline, notebooks and a passing pytest suite (public repo).',
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
            track: 'data',
            status: 'verified',
            statusDetail: 'Built and verified: working pipeline, API/UI, AWS deploy config and a 27-test suite (public repo).',
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
            track: 'data',
            status: 'verified',
            statusDetail: 'Built: runnable Streamlit application (public repo).',
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
            track: 'security',
            type: 'Academic · Honours research',
            desc: 'Honours thesis evaluating supervised and unsupervised ML models for ransomware detection on public datasets (Malimg, Microsoft BIG 2015). In my honours thesis, a Random Forest model achieved 99.34% accuracy on the evaluated dataset.',
            tech: ['Python', 'Scikit-learn', 'TensorFlow', 'Pandas'],
            status: 'verified',
            statusDetail: 'Honours research completed and written up (2025). Full thesis available on request.',
            repo: null,
            paper: null,
            icon: 'fa-virus-covid',
            grad: 'linear-gradient(135deg,#7a5cff,#5a3fd6)',
            study: {
                overview: 'A comparative study of machine-learning techniques for detecting ransomware, conducted as my BSc Honours research at the University of Limpopo (supervisors: Dr S.S. Mapunya, Prof M. Velempini).',
                problem: 'Evaluate how well supervised and unsupervised ML models detect ransomware, including adaptability toward previously unseen variants.',
                objectives: ['Evaluate multiple ML models on public malware datasets', 'Analyse feature importance', 'Assess adaptability to new variants'],
                contribution: 'Author of the honours research, experiments and write-up.',
                methodology: 'Trained and compared models on the Malimg and Microsoft BIG 2015 datasets, analysing accuracy and feature importance.',
                challenges: 'Handling malware datasets responsibly and interpreting model behaviour toward unseen variants.',
                results: 'In my honours thesis, a Random Forest model achieved 99.34% accuracy on the evaluated dataset, alongside analysis of ensemble effectiveness and feature importance. (Figures are as stated in the thesis; the full report is available on request.)',
                lessons: 'Ensemble methods performed strongly on these datasets; evaluating adaptability to zero-day variants remains an open, important challenge.'
            }
        },
        {
            id: 'ids',
            featured: true,
            title: 'Intrusion Detection & Prevention with Snort',
            date: 'Oct 2025',
            category: 'security',
            track: 'security',
            type: 'Academic · Lab project (SCSE082)',
            desc: 'Built a Snort IDS/IPS lab in VirtualBox (host-only 192.168.56.0/24): Kali attacker (192.168.56.5), Ubuntu Snort sensor (192.168.56.103) and Metasploitable 2 target, with custom rules for scans and well-known exploit signatures.',
            tech: ['Snort', 'Ubuntu', 'Kali Linux', 'Metasploitable 2', 'VirtualBox'],
            status: 'verified',
            statusDetail: 'Built and verified in a controlled lab (SCSE082, Oct 2025).',
            doc: 'docs/ids-ips-snort-report.pdf',
            repo: null,
            icon: 'fa-shield-halved',
            grad: 'linear-gradient(135deg,#ff6b6b,#d1374a)',
            study: {
                overview: 'A hands-on network-security lab deploying Snort as both an intrusion detection and prevention system in a controlled virtual environment (course SCSE082, October 2025).',
                problem: 'Detect and, where possible, block common network attacks and known exploits in a reproducible, isolated lab.',
                objectives: ['Stand up a host-only lab (192.168.56.0/24) in VirtualBox', 'Deploy a Snort sensor on Ubuntu', 'Write custom rules for scans and known exploit signatures', 'Compare IDS (alert) vs inline IPS (block) behaviour and tune false positives'],
                contribution: 'Designed and built the lab, authored the Snort rules, ran the attack/defence tests and documented the findings.',
                methodology: 'Topology: Kali attacker 192.168.56.5, Ubuntu Snort sensor 192.168.56.103, Metasploitable 2 target, on a VirtualBox host-only 192.168.56.0/24 network. Custom rules covered ICMP, Telnet, FTP, HTTP admin, SSH, r-services, the UnrealIRCd backdoor, an FTP backdoor exploit, and port scans.',
                challenges: 'Controlling false positives: rule tuning and suppressions were required so that benign traffic did not trigger alerts, while still catching the intended attacks.',
                results: 'Snort reliably recognised scripted scans and well-known exploit signatures; inline/IPS mode stopped some exploitation attempts. Rule tuning and suppressions were needed to keep false positives manageable. (Findings are limited to what was observed in the lab.)',
                lessons: 'Signature design, sensor placement and tuning are central to effective, low-noise intrusion detection and prevention — a clean ruleset matters as much as the detections themselves.'
            }
        },
        {
            id: 'homelab',
            featured: true,
            title: 'Cybersecurity HomeLab (SME-style network)',
            date: 'Jan–Jun 2025',
            category: 'security',
            track: 'security',
            type: 'Personal · Lab project',
            desc: 'A segmented, SME-style virtual network. Built & verified: pfSense firewall, a Windows Server domain controller (AD DS, DNS, DHCP), a Kali workstation and Nessus vulnerability scanning. Further monitoring/DMZ components are designed / planned (see status).',
            tech: ['pfSense', 'Windows Server', 'Active Directory', 'DNS', 'DHCP', 'Kali Linux', 'Nessus'],
            status: 'partial',
            statusDetail: 'Built & verified: pfSense (dashboard + admin), static IP/gateway config and ping tests, Windows Server roles (AD DS, DNS, DHCP, file services), AD user creation, and Nessus on Kali (incl. nessusd service troubleshooting). Designed / planned (not yet deployed): Security Onion, Splunk, Wazuh, DMZ web/mail servers, and an internal CA.',
            doc: 'docs/cybersecurity-homelab-report.pdf',
            repo: null,
            icon: 'fa-network-wired',
            grad: 'linear-gradient(135deg,#1fa2b8,#157f9a)',
            study: {
                overview: 'A self-built lab simulating a small-business (SME) IT environment, used to practise network defence and administration. Core services are built and verified; a monitoring/DMZ layer is designed but not yet deployed.',
                problem: 'Create a realistic, segmented SME network to practise firewalling, directory services and vulnerability assessment.',
                objectives: ['Deploy a pfSense firewall with segmented networking', 'Stand up a Windows Server domain controller (AD DS, DNS, DHCP)', 'Add a Kali workstation and run Nessus vulnerability scans', 'Design a monitoring/DMZ layer for a future phase'],
                contribution: 'Designed the network and deployed the verified components: pfSense, the Windows Server domain controller and its roles, the Kali workstation and Nessus.',
                methodology: 'Virtualised SME network: pfSense firewall (static IP/gateway, verified by dashboard access and ping tests), Windows Server with AD DS/DNS/DHCP/file services and created AD users, and a Kali workstation running Nessus (including nessusd service troubleshooting).',
                challenges: 'Getting the Nessus service (nessusd) running reliably on Kali, and configuring addressing/gateway so segments routed correctly.',
                results: 'A verified core: a working pfSense firewall, a functioning AD domain controller with DNS/DHCP and users, and Nessus scanning from Kali. The SIEM/monitoring and DMZ layer (Security Onion, Splunk, Wazuh, DMZ servers, internal CA) is designed but NOT yet deployed, and no detection/remediation results are claimed for it.',
                lessons: 'Standing up directory services, firewalling and vulnerability scanning end-to-end builds practical intuition that theory alone cannot — and being explicit about what is built vs planned keeps the work honest.'
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
            track: 'data',
            status: 'verified',
            statusDetail: 'Academic coursework; source code not public.',
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
            track: 'data',
            status: 'designed',
            statusDetail: 'Designed / planned: a concept and README; implementation not yet built out (public repo).',
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
            track: 'data',
            status: 'verified',
            statusDetail: 'Academic group project; source code not public.',
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
        { title: 'Inadequate Post-Attack Procedures in Cybersecurity', desc: 'A research report (with presentation) examining the importance of post-attack procedures, common gaps in incident response, and practices for more effective recovery and organisational resilience. The “XYZ Corp” breach used throughout is an illustrative scenario, not a real incident; figures are those stated in the report.', tags: ['Illustrative scenario', 'Incident Response', 'Recovery'] },
        { title: 'Cybersecurity HomeLab Implementation', desc: 'Documented building a cybersecurity homelab simulating a small-business network with pfSense, Active Directory and security-monitoring tooling.', tags: ['pfSense', 'Active Directory', 'SIEM'] },
        { title: 'IDS/IPS Configuration with Snort', desc: 'Developed and tested custom Snort rules for detecting and preventing network attacks in a controlled virtual lab.', tags: ['Snort', 'Kali Linux', 'Metasploitable'] }
    ];

    // Runtime source of truth is manifest.json; this is the offline fallback.
    const DOCUMENTS = [
        { id: 'ids-ips', title: 'IDS/IPS with Snort — Project Report', track: 'security', course: 'Computer Security (SCSE082)', date: 'Oct 2025', pages: 66, size: '', status: 'available', file: 'docs/ids-ips-snort-report.pdf', thumb: 'thumbs/ids-ips-snort-report.webp' },
        { id: 'homelab', title: 'Cybersecurity HomeLab — Design, Implementation & Analysis', track: 'security', course: 'Computer Networking', date: '2025', pages: 18, size: '', status: 'available', file: 'docs/cybersecurity-homelab-report.pdf', thumb: 'thumbs/cybersecurity-homelab-report.webp' },
        { id: 'post-attack', title: 'Inadequate Post-Attack Procedures — Report & Slides', track: 'security', course: 'Computer Security (SCSE082)', date: 'Oct 2025', pages: '', size: '', status: 'available', file: 'docs/post-attack-procedures-report.pdf', thumb: 'thumbs/post-attack-procedures-report.webp' },
        { id: 'mec', title: 'Mobile Edge Computing (MEC) — Research Assignment', track: 'data', course: 'Research Assignment', date: '2025', pages: 8, size: '', status: 'available', file: 'docs/mobile-edge-computing-assignment.pdf', thumb: 'thumbs/mobile-edge-computing-assignment.webp' },
        { id: 'thesis', title: 'Evaluating ML for Adaptive Ransomware Detection — Honours Thesis', track: 'security', course: 'BSc Honours, Computer Science', date: '2025', pages: '', size: '', status: 'gated', file: 'docs/honours-thesis-ransomware.pdf', thumb: 'thumbs/honours-thesis-ransomware.webp' }
    ];

    const PROJECT_CATS = [
        { key: 'all', label: 'All' },
        { key: 'security', label: 'Security' },
        { key: 'data', label: 'Data' }
    ];

    const STATUS_META = {
        verified: { label: 'Built & verified', icon: 'fa-circle-check', cls: 'st-verified' },
        partial:  { label: 'Partially built',  icon: 'fa-circle-half-stroke', cls: 'st-partial' },
        designed: { label: 'Designed only',    icon: 'fa-pen-ruler', cls: 'st-designed' }
    };

    const SERVICES = [
        { icon: 'fa-shield-halved', title: 'Cybersecurity & Networking', text: 'Hands-on security labs — IDS/IPS with Snort, a segmented pfSense/Active Directory network and vulnerability scanning with Nessus.' },
        { icon: 'fa-chart-line', title: 'Data Analysis & Reporting', text: 'Turning raw data into insight with SQL, Excel (pivot tables), Pandas and clear dashboards and reports to support decisions.' },
        { icon: 'fa-laptop-code', title: 'Software Development', text: 'Shipping practical applications and APIs with Python, Streamlit and FastAPI, backed by MySQL/PostgreSQL databases.' },
        { icon: 'fa-brain', title: 'AI & Machine Learning', text: 'Applying and evaluating ML models rigorously — including auditing for pitfalls like data leakage — with scikit-learn and OpenCV.' },
        { icon: 'fa-database', title: 'Databases', text: 'Designing relational schemas and optimising SQL queries for secure, reliable storage and reporting.' },
        { icon: 'fa-square-root-variable', title: 'Mathematical Foundations', text: 'A BSc in Mathematical Sciences underpinning the data work with solid grounding in statistics and computation.' }
    ];

    const DATA = { INTERESTS, SKILLS, PROJECTS, RESEARCH, DOCUMENTS, PROJECT_CATS, STATUS_META, SERVICES };

    if (typeof module !== 'undefined' && module.exports) module.exports = DATA;
    else root.PORTFOLIO = DATA;
})(typeof window !== 'undefined' ? window : globalThis);
