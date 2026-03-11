// ===== LOADER =====
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 2000);
});

// ===== CUSTOM CURSOR =====
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    follower.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
});

document.addEventListener('mousedown', () => {
    cursor.style.transform = 'scale(0.8)';
    follower.style.transform = 'scale(1.5)';
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'scale(1)';
    follower.style.transform = 'scale(1)';
});

// ===== HEADER SCROLL EFFECT =====
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ===== MOBILE MENU TOGGLE =====
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('.section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// ===== TYPING EFFECT =====
const typedText = document.querySelector('.typed-text');
const words = ['Full‑Stack Developer', 'Data Science Enthusiast', 'Network & Security Specialist', 'Cloud Practitioner'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
        typedText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeEffect, 500);
    } else {
        setTimeout(typeEffect, isDeleting ? 100 : 200);
    }
}
typeEffect();

// ===== PROJECTS DATA (all years 2020–2025) =====
const projectsData = [
    // 2020: C++ Project
    {
        title: "C++ Programming Project (First Year)",
        description: "Developed a console-based application in C++ as part of first-year coursework. Implemented core programming concepts including loops, arrays, functions, and file I/O. Demonstrated problem-solving skills and foundational programming knowledge.",
        date: "2020",
        category: "software",
        tech: ["C++"]
    },
    // 2021: Java Project
    {
        title: "Java Application Project (Second Year)",
        description: "Built a desktop application using Java and Swing. Focused on object-oriented design, GUI development, and event handling. Collaborated with peers to deliver a functional application within academic deadlines.",
        date: "2021",
        category: "software",
        tech: ["Java", "Swing", "OOP"]
    },
    // 2022: Powerful Cyber Threat Intelligence Dashboard
    {
        title: "Cyber Threat Intelligence Dashboard",
        description: "Developed a web-based dashboard to visualize and analyze real-time network threats using Python, Flask, and Elasticsearch. Integrated threat intelligence feeds (AlienVault OTX, MISP) to provide actionable insights on potential security incidents. Implemented interactive charts and real-time alerts for security analysts, reducing mean time to detection.",
        date: "2022",
        category: "security",
        tech: ["Python", "Flask", "Elasticsearch", "Kibana", "D3.js", "Threat Intelligence"]
    },
    // 2023: Statistical Modelling & Data Analysis
    {
        title: "Statistical Modelling & Data Analysis Project",
        description: "Collaborated in a team to analyze datasets using R and Python. Applied regression and statistical modeling techniques to identify patterns and generate predictive insights. Presented findings through structured reports and visualizations.",
        date: "Jun 2023 – Oct 2023",
        category: "ml",
        tech: ["R", "Python", "Statistical Modeling"]
    },
    // 2023: Application Development Project
    {
        title: "Application Development Project",
        description: "Participated in full-cycle software development including design, development, debugging, and deployment. Maintained documentation and ensured project requirements were met.",
        date: "Jan 2023 – Oct 2023",
        category: "web",
        tech: ["Software Development", "Debugging", "Documentation"]
    },
    // 2023: Database Management System Project
    {
        title: "Database Management System Project",
        description: "Designed SQL queries for data retrieval and reporting. Performed performance diagnostics and query optimization. Documented database structures and workflows.",
        date: "Jan 2023 – Jun 2023",
        category: "web",
        tech: ["SQL", "Database Design", "Query Optimization"]
    },
    // 2025: IDS/IPS
    {
        title: "Intrusion Detection & Prevention System (IDS/IPS)",
        description: "Configured Snort on Ubuntu to monitor network traffic between Kali (attacker) and Metasploitable (target). Developed custom rules to detect and block various attacks including ICMP, Telnet, FTP, SSH, and port scans. Achieved 100% detection rate in IDS mode and successfully blocked malicious traffic in IPS mode.",
        date: "Jan 2025 – Oct 2025",
        category: "security",
        tech: ["Snort", "Ubuntu", "Kali Linux", "Metasploitable", "VirtualBox"]
    },
    {
        title: "Cybersecurity HomeLab (Virtual Enterprise Environment)",
        description: "Designed and deployed a virtualized small business network using VMware Workstation. Implemented pfSense firewall with segmented networks (DMZ, corporate, security), Active Directory domain controller, Windows/Linux endpoints, and security tools (Security Onion, Splunk). Simulated enterprise IT environment for security testing.",
        date: "Jan 2025 – Jun 2025",
        category: "security",
        tech: ["VMware", "pfSense", "Windows Server", "Active Directory", "Security Onion", "Splunk"]
    },
    {
        title: "Secure Backend Database System",
        description: "Designed and implemented secure database systems using Python, MySQL, and PostgreSQL. Focused on secure data storage, query optimization, and system reliability. Performed testing and debugging to ensure robust performance.",
        date: "Jan 2025 – Jun 2025",
        category: "web",
        tech: ["Python", "MySQL", "PostgreSQL"]
    },
    {
        title: "Mobile Edge Computing (MEC) Research",
        description: "Investigated the paradigm of Mobile Edge Computing, its benefits, challenges, and use cases. Analyzed how MEC reduces latency and improves efficiency for applications like autonomous vehicles and smart manufacturing. Proposed solutions for security and resource management.",
        date: "2025",
        category: "research",
        tech: ["Edge Computing", "5G", "IoT"]
    },
    {
        title: "Inadequate Post-Attack Procedures in Cybersecurity",
        description: "Researched the importance of post‑attack procedures, identified common gaps in incident response, and proposed best practices for effective recovery. Presented findings on improving organizational resilience after cyber incidents.",
        date: "2025",
        category: "research",
        tech: ["Incident Response", "Cybersecurity", "Recovery"]
    }
];

// ===== RENDER PROJECTS =====
const projectsContainer = document.getElementById('projects-container');

function renderProjects(filter = 'all') {
    let html = '';
    const filtered = filter === 'all' ? projectsData : projectsData.filter(p => p.category === filter);
    filtered.forEach(proj => {
        const techTags = proj.tech.map(t => `<span class="tech-tag">${t}</span>`).join('');
        html += `
            <div class="project-card">
                <div class="project-content">
                    <h3 class="project-title">${proj.title}</h3>
                    <span class="project-date">${proj.date}</span>
                    <p class="project-description">${proj.description}</p>
                    <div class="project-tech">${techTags}</div>
                </div>
            </div>
        `;
    });
    projectsContainer.innerHTML = html;
}

renderProjects();

// ===== FILTER BUTTONS =====
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        renderProjects(filter);
    });
});

// ===== CHATBOT =====
const chatToggle = document.getElementById('chatToggle');
const chatWindow = document.getElementById('chatWindow');
const chatClose = document.getElementById('chatClose');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');

chatToggle.addEventListener('click', () => {
    chatWindow.classList.toggle('open');
});

chatClose.addEventListener('click', () => {
    chatWindow.classList.remove('open');
});

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.innerHTML = `<div class="message-content">${text}</div>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotResponse(input) {
    const msg = input.toLowerCase();
    if (msg.includes('project') || msg.includes('projects')) {
        return "I've worked on a wide range of projects – from early C++ and Java applications to advanced security systems, a threat intelligence dashboard, and machine learning research. Check the Projects section!";
    } else if (msg.includes('research') || msg.includes('thesis')) {
        return "My honours thesis focused on evaluating machine learning techniques for ransomware detection, achieving 99.34% accuracy with Random Forest. It's in the Research section.";
    } else if (msg.includes('skill') || msg.includes('technologies')) {
        return "I'm proficient in software development (Python, Java, C++, SQL), network security (pfSense, Snort), data science (TensorFlow, Scikit-learn), and threat intelligence platforms. See the About section.";
    } else if (msg.includes('contact') || msg.includes('email')) {
        return "You can reach me at johnmanchidi@gmail.com or through the Contact section.";
    } else if (msg.includes('hello') || msg.includes('hi')) {
        return "Hello! How can I help you today? Ask me about my projects, research, or skills.";
    } else {
        return "I'm not sure about that. Feel free to ask about my projects, research, or contact info!";
    }
}

chatSend.addEventListener('click', () => {
    const text = chatInput.value.trim();
    if (text === '') return;
    addMessage(text, 'user');
    chatInput.value = '';
    setTimeout(() => {
        const reply = getBotResponse(text);
        addMessage(reply, 'bot');
    }, 500);
});

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        chatSend.click();
    }
});

// ===== BACK TO TOP =====
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== GSAP ANIMATIONS =====
gsap.registerPlugin(ScrollTrigger);

gsap.from('.hero-text', {
    opacity: 0,
    y: 100,
    duration: 1,
    delay: 2.2
});

gsap.from('.hero-image', {
    opacity: 0,
    scale: 0.5,
    duration: 1,
    delay: 2.5
});

gsap.utils.toArray('.about-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 0.6,
        delay: i * 0.1
    });
});

gsap.utils.toArray('.project-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 30,
        duration: 0.5,
        delay: i * 0.1
    });
});