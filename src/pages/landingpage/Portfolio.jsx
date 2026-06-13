import { useState, useEffect, useRef } from "react";

/* ══════════════════════════════════════════
   CONSTANTS
══════════════════════════════════════════ */
const NAV_LINKS = ["Work", "Services", "About", "Blog"];

const PROJECTS = [
  {
    emoji: "🏠",
    name: "Boodima.lk",
    tags: ["MERN", "Full-Stack", "2024"],
    desc: "A full-stack boarding rental platform connecting tenants with verified local listings — featuring real-time search, location filtering, listing management, and a fully responsive UI.",
    details:
      "This platform revolutionizes how students and professionals find accommodation. Built with cutting-edge technology, it provides seamless browsing, secure payments, and verified landlords.",
    live: "https://boodima.lk",
    repo: "#",
    stack: "MongoDB · Express · React · Node",
    image: "/images/project4.png",
  },
  {
    emoji: "🎮",
    name: "GameHub (UI/UX)",
    tags: ["UI/UX", "Kotlin", "2025"],
    desc: "A mobile application UI/UX design inspired by the Xbox app — featuring a sleek game library browser, friend activity feed, achievement tracking, and a dark-themed dashboard built natively in Android Studio.",
    details:
      "Designed and prototyped entirely in Android Studio using Kotlin. Focused on delivering a console-quality feel on mobile — with smooth navigation, custom components, and an immersive dark UI that mirrors the Xbox ecosystem's visual language.",
    live: "#",
    repo: "#",
    stack: "Kotlin · Android Studio · XML Layouts · Material Design",
    image: "/images/project3.png",
  },
  
];

const EDUCATION = [
  {
    year: "2021",
    title: "G.C.E. Advanced Level - Engineering Technology Stream",
    institution: "Matara Central College",
    desc: "Completed A/Ls in the Engineering Technology stream, building a strong foundation in technical and analytical thinking.",
    certificate: "#",
  },
  {
    year: "NOV 2023 – PRESENT",
    title: "BSc (Hons) in Information Technology",
    institution: "Sri Lanka Institute of Information Technology (SLIIT)",
    desc: "Currently pursuing a degree specializing in Information Technology, with a focus on Software Engineering, UI/UX Design, and Full-Stack Development.",
    certificate: "#",
  },
  {
    year: "2026",
    title: "MongoDB Atlas Administrator Path",
    institution: "MongoDB University",
    desc: "Completed the MongoDB Atlas Administrator learning path, covering cluster management, backups, replication, security, and cloud database operations.",
    certificate: "#",
  },
];

const CONTACT_INFO = [
  {
    icon: "/images/icon23.jpg",
    text: "kavidu-purnamal",
    href: "https://linkedin.com/in/kavidu-purnamal",
  },
  {
    icon: "/images/icon16.jpg",
    text: "K4V1DU",
    href: "https://github.com/K4V1DU",
  },
  {
    icon: "/images/icon24.jpg",
    text: "+94 715 294 616",
    href: "tel:+94715294616",
  },
];

/* ══════════════════════════════════════════
   COLORS
══════════════════════════════════════════ */
const CREAM = "#ffffff";
const DARK = "#0f2b2b";
const ACCENT = "#ff8a3d";
const ACCENT_LIGHT = "#fff2e6";
const MUTED = "#6b6f66";
const BORDER = "rgba(15,43,43,0.08)";

/* ── Animated counter hook ── */
function useCounter(target, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        let start = null;
        const step = (ts) => {
          if (!start) start = ts;
          const progress = Math.min((ts - start) / duration, 1);
          setCount(Math.floor(progress * target));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);
  return [count, ref];
}

/* ── Stat card ── */
function StatCard({ value, suffix = "", label }) {
  const [count, ref] = useCounter(value);
  return (
    <div ref={ref} style={styles.statCard}>
      <span style={styles.statNum}>
        {count}
        {suffix}
      </span>
      <span style={styles.statLabel}>{label}</span>
    </div>
  );
}

/* ══════════════════════════════════════════
   NAV — with hamburger menu
══════════════════════════════════════════ */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [cvHovered, setCvHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav
        className="nav-bar"
        style={{
          ...styles.nav,
          background: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          boxShadow: scrolled ? "0 1px 0 rgba(0,0,0,0.06)" : "none",
        }}
      >
        <div style={styles.logo}>
          <span style={styles.logoText}>
            Portfolio<span style={styles.logoDot}>.</span>
          </span>
        </div>

        {/* Desktop nav links */}
        <ul className="nav-desktop-links" style={styles.navLinks}>
          {NAV_LINKS.map((l) => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`} style={styles.navLink}>
                {l}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop download CV button */}
        <a
          className="nav-download-btn"
          href="/cv.pdf"
          download
          style={{
            ...styles.downloadBtn,
            ...(cvHovered ? styles.downloadBtnHover : {}),
          }}
          onMouseEnter={() => setCvHovered(true)}
          onMouseLeave={() => setCvHovered(false)}
        >
          <span style={styles.downloadIcon}>⬇</span>
          Download CV
        </a>

        {/* Mobile hamburger button */}
        <button
          className="hamburger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={styles.hamburger}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span style={styles.hamburgerLine(menuOpen, 0)} />
          <span style={styles.hamburgerLine(menuOpen, 1)} />
          <span style={styles.hamburgerLine(menuOpen, 2)} />
        </button>
      </nav>

      {/* Mobile slide-down menu */}
      {menuOpen && (
        <div style={styles.mobileMenu}>
          {NAV_LINKS.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              style={styles.mobileLink}
              onClick={() => setMenuOpen(false)}
            >
              {l}
            </a>
          ))}
          <div style={{ padding: "16px 24px 8px" }}>
            <a
              href="/cv.pdf"
              download
              style={styles.mobileCta}
              onClick={() => setMenuOpen(false)}
            >
              ⬇ Download CV
            </a>
          </div>
        </div>
      )}
    </>
  );
}

/* ══════════════════════════════════════════
   HERO
══════════════════════════════════════════ */
function Hero() {
  return (
    <section id="hero" className="hero-section" style={styles.hero}>
      <div className="watermark-top" style={styles.watermarkTop} aria-hidden="true">
        FULL STACK DEV
      </div>
      <div className="watermark-bottom" style={styles.watermarkBottom} aria-hidden="true" />

      <div className="hero-left" style={styles.heroLeft}>
        <p style={styles.greeting}>
          Hi, I'm <span style={styles.accentName}>Kavidu Purnamal</span>
        </p>

        <h1 className="hero-headline" style={styles.heroHeadline}>
          Great software starts
          <br />
          with a developer
          <br />
          who cares.
        </h1>

        <p style={styles.heroSub}>
          Clean code, thoughtful design, and a passion for building things right.
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            flexWrap: "wrap",
            marginTop: 18,
            marginBottom: 40,
          }}
        >
          <a href="#contact" style={styles.btnPrimary}>
            Let's Talk
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
            {["Passionate", "Creative", "Reliable", "Adaptable"].map(
              (s, index, arr) => (
                <span key={s}>
                  <span
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: 14,
                      fontWeight: 400,
                      color: MUTED,
                    }}
                  >
                    {s}
                  </span>
                  {index < arr.length - 1 && (
                    <span style={{ margin: "0 6px", color: MUTED, opacity: 0.5 }}>
                      ·
                    </span>
                  )}
                </span>
              ),
            )}
          </div>
        </div>
      </div>

      <div className="hero-right" style={styles.heroRight}>
        <img
          src="/images/photo9.png"
          alt="Kavidu Purnamal"
          style={styles.heroPhoto}
        />
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   ABOUT (original — not rendered but kept)
══════════════════════════════════════════ */
function About() {
  return (
    <section id="about" className="about-section" style={styles.about}>
      <div style={styles.aboutInner}>
        <div style={styles.sectionEyebrow}>Who I Am</div>
        <div className="heading-panel" style={styles.headingPanel}>
          <h2 style={styles.sectionTitle}>About Me</h2>
          <h2 style={styles.sectionTitle}>My Skills</h2>
        </div>
        <div className="about-panel" style={styles.aboutPanel}>
          <div style={styles.aboutColumn}>
            <h3 style={styles.aboutSubheading}>
              Versatile full-stack software engineer delivering enterprise-grade
              web applications and polished digital experiences.
            </h3>
            <p style={styles.aboutText}>
              I'm Kavidu Purnamal, a full-stack developer and student at SLIIT
              who bridges the gap between complex backend systems and clear
              frontend interfaces.
            </p>
            <p style={styles.aboutText}>
              What sets me apart is my speed in picking up new technologies and
              my love for coding, whether I am architecting scalable web
              applications with Node.js or diving into game development.
            </p>
          </div>

          <div className="section-divider" style={styles.sectionDivider} aria-hidden="true" />

          <div style={styles.skillsColumn}>
            <div className="skills-grid" style={styles.skillsGrid}>
              {[1,6,3,2,12,13,9,8,7,15,16,17].map((n, i) => (
                <img
                  key={i}
                  src={`/images/icon${n}.${[1,2].includes(n) ? "png" : "jpg"}`}
                  alt={`Skill icon ${i + 1}`}
                  style={styles.skillIcon}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   ABOUT ME (rendered version with photo)
══════════════════════════════════════════ */
function AboutMe() {
  return (
    <section id="about-me" className="about-me-section" style={aboutMeStyles.section}>
      <div className="about-me-inner" style={aboutMeStyles.inner}>

        {/* LEFT: photo */}
        <div className="about-me-image-col" style={aboutMeStyles.imageCol}>
          <div style={aboutMeStyles.imageWrap}>
            <img
              src="/images/photo9.png"
              alt="Kavidu Purnamal"
              style={aboutMeStyles.photo}
            />
          </div>
        </div>

        {/* RIGHT: text */}
        <div className="about-me-text-col" style={aboutMeStyles.textCol}>
          <div style={styles.sectionEyebrow}>Who I Am</div>
          <h2 style={aboutMeStyles.heading}>
            Fast to learn.
            <br />
            <span style={aboutMeStyles.accentText}>Built to deliver.</span>
          </h2>
          <p style={aboutMeStyles.lead}>
            Hey, I'm Kavidu Purnamal, a passionate full-stack developer and
            SLIIT student who loves turning ideas into clean, intuitive web
            experiences.
          </p>
          <p style={aboutMeStyles.body}>
            With 3+ years deep in the MERN stack, I've built everything from
            dynamic web applications to developer productivity tools. What
            drives me isn't just shipping code — it's building things people
            enjoy using.
          </p>
          <p style={aboutMeStyles.body}>
            I absorb new technologies fast, write clean maintainable code, and
            care deeply about performance and accessibility. Whether it's a
            startup MVP or a polished SaaS product, I bring the same level of
            focus to every project.
          </p>
          <div style={aboutMeStyles.pillsRow}>
            {["MongoDB","Express.js","React","Node.js","REST APIs","UI/UX"].map(
              (tag, index, arr) => (
                <span key={tag}>
                  <span style={aboutMeStyles.pill}>{tag}</span>
                  {index < arr.length - 1 && (
                    <span style={{ ...aboutMeStyles.pill, padding: "0 6px" }}> · </span>
                  )}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   PROJECTS
══════════════════════════════════════════ */
function Projects() {
  return (
    <section id="work" className="projects-section" style={styles.projects}>
      <div style={styles.sectionEyebrow}>Selected Work</div>
      <h2 style={styles.sectionTitle}>Projects</h2>

      <div style={styles.projectsContainer} className="projects-container">
        {PROJECTS.map((p, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={p.name + index}
              style={{
                ...styles.projectShowcase,
                flexDirection: isEven ? "row" : "row-reverse",
              }}
              className="project-showcase"
            >
              <div
                className="project-image-container"
                style={styles.projectImageContainer}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  style={styles.projectImage}
                  className="project-image"
                />
                <div
                  style={styles.projectImageOverlay}
                  className="project-image-overlay"
                >
                  <span style={styles.projectEmoji}>{p.emoji}</span>
                </div>
              </div>

              <div
                style={styles.projectContentContainer}
                className="project-content-container"
              >
                <h3 style={styles.projectName}>{p.name}</h3>
                <p style={styles.projectDesc}>{p.desc}</p>
                <p style={styles.projectDetails}>{p.details}</p>
                <div style={styles.projectFooter}>
                  <a href={p.live} style={styles.btnMoreDetails}>
                    More Details →
                  </a>
                  <span style={styles.projectStack}>{p.stack}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   SERVICES
══════════════════════════════════════════ */
function Services() {
  const serviceCards = [
    {
      title: "Full-Stack Web Apps",
      short: "End-to-end product development",
      desc: "I handle everything from database schema design and REST API architecture to a fully deployed React frontend. You get a production-ready application built on the MERN stack, optimized for performance, scalability, and maintainability.",
      tags: ["MongoDB", "Express", "React", "Node.js"],
    },
    {
      title: "REST API Development",
      short: "Clean, documented backend APIs",
      desc: "Well-structured Node.js and Express APIs with proper authentication (JWT/OAuth), role-based access control, input validation, and error handling. Built to be consumed by any frontend or mobile app, with clear documentation included.",
      tags: ["Node.js", "Express", "JWT", "REST"],
    },
    {
      title: "UI / UX Engineering",
      short: "Pixel-perfect, accessible interfaces",
      desc: "Modular, reusable React components built from Figma designs or your own vision. I focus on responsive layouts, smooth interactions, and accessibility — so your product looks great and works for everyone, on every device.",
      tags: ["React", "CSS", "Figma", "Responsive"],
    },
    {
      title: "MVP & Rapid Prototyping",
      short: "From idea to working product, fast",
      desc: "Got a startup idea or side project? I help you validate it quickly with a focused, functional MVP. No bloat, no over-engineering — just the core features shipped fast so you can get real feedback from real users.",
      tags: ["MERN", "Rapid Build", "Startup", "MVP"],
    },
  ];

  const iconNums = [1, 6, 3, 2, 12, 13, 9, 8, 7, 15, 16, 17];

  return (
    <section id="services" className="services-section" style={styles.services}>
      <div className="services-wrapper" style={servicesLayoutStyles.wrapper}>

        {/* LEFT — sticky on desktop, static on mobile */}
        <div className="services-left-col" style={servicesLayoutStyles.leftCol}>
          <div style={styles.sectionEyebrow}>What I Offer</div>
          <h2 style={servicesLayoutStyles.title}>
            Services built
            <br />
            for <span style={servicesLayoutStyles.accent}>real results.</span>
          </h2>
          <p style={servicesLayoutStyles.desc}>
            From a single landing page to a full-scale SaaS platform — I cover
            every layer of the stack. Each service is delivered with clean code,
            clear communication, and a focus on what actually matters: shipping
            something that works.
          </p>

          <div className="services-icons-grid" style={servicesLayoutStyles.iconsGrid}>
            {iconNums.map((n, i) => (
              <img
                key={i}
                src={`/images/icon${n}.${[1, 2].includes(n) ? "png" : "jpg"}`}
                alt="skill"
                className="services-icon"
                style={servicesLayoutStyles.icon}
              />
            ))}
          </div>
        </div>

        {/* RIGHT — scrollable cards */}
        <div className="services-right-col" style={servicesLayoutStyles.rightCol}>
          {serviceCards.map((s) => (
            <div key={s.title} style={servicesLayoutStyles.card}>
              <h3 style={servicesLayoutStyles.cardTitle}>{s.title}</h3>
              <p style={servicesLayoutStyles.cardShort}>{s.short}</p>
              <div style={servicesLayoutStyles.cardDivider} />
              <p style={servicesLayoutStyles.cardDesc}>{s.desc}</p>
              <div style={servicesLayoutStyles.cardTags}>
                {s.tags.map((t, i) => (
                  <span key={t} style={servicesLayoutStyles.cardTag}>
                    {t}
                    {i < s.tags.length - 1 && (
                      <span style={{ margin: "0 6px", opacity: 0.5 }}>·</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   EDUCATION (kept for optional use)
══════════════════════════════════════════ */
function Education() {
  return (
    <section id="education" className="education-section" style={styles.education}>
      <div style={styles.sectionEyebrow}>My Journey</div>
      <h2 style={styles.sectionTitle}>Education</h2>
      <div className="timeline-container-el" style={styles.timelineContainer}>
        <div className="timeline-line-el" style={styles.timelineLine} aria-hidden="true" />
        {EDUCATION.map((edu, index) => {
          const isLeft = index % 2 === 0;
          return (
            <div key={edu.title} className="timeline-item-el" style={styles.timelineItem}>
              <div
                className="timeline-dot-el"
                style={{
                  ...styles.timelineDot,
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              />
              <div
                className="edu-content-el"
                style={{
                  ...styles.educationContent,
                  marginLeft: isLeft ? 0 : "52%",
                  marginRight: isLeft ? "52%" : 0,
                  textAlign: isLeft ? "right" : "left",
                }}
              >
                <div style={styles.eduYear}>{edu.year}</div>
                <h3 style={styles.eduTitle}>{edu.title}</h3>
                <div style={styles.eduInstitution}>{edu.institution}</div>
                <p style={styles.eduDesc}>{edu.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   CONTACT
══════════════════════════════════════════ */
function Contact() {
  const [emailHovered, setEmailHovered] = useState(false);
  const [linkedinHovered, setLinkedinHovered] = useState(false);

  return (
    <section id="contact" className="contact-section" style={styles.contact}>
      <div style={styles.contactInner}>
        <div style={styles.contactEyebrowWrap}>
          <span style={styles.contactEyebrowDash} />
          <span style={styles.contactEyebrowText}>CONTACT</span>
        </div>

        <h2 className="contact-headline" style={styles.contactHeadline}>
          Let's Build Something
          <br />
          Amazing Together
        </h2>

        <p style={styles.contactSubtitle}>
          Whether you have a project in mind, want to collaborate, or just want
          to say hello — my inbox is always open.
        </p>

        <div className="contact-btns-row" style={styles.contactBtnsRow}>
          <a
            href="mailto:kavidupurnamal2001@gmail.com"
            style={{
              ...styles.contactBtnFilled,
              ...(emailHovered ? styles.contactBtnFilledHover : {}),
            }}
            onMouseEnter={() => setEmailHovered(true)}
            onMouseLeave={() => setEmailHovered(false)}
          >
            <img
              src="/images/icon24.png"
              alt=""
              style={{ width: 20, height: 20, objectFit: "contain", verticalAlign: "middle" }}
            />
            Send Email
          </a>
          <a
            href="https://linkedin.com/in/kavidu-purnamal"
            style={{
              ...styles.contactBtnOutline,
              ...(linkedinHovered ? styles.contactBtnOutlineHover : {}),
            }}
            onMouseEnter={() => setLinkedinHovered(true)}
            onMouseLeave={() => setLinkedinHovered(false)}
          >
            LinkedIn Profile
          </a>
        </div>

        <div className="contact-info-row" style={styles.contactInfoRow}>
          {CONTACT_INFO.map(({ icon, text, href }) => (
            <a
              key={text}
              href={href}
              style={styles.contactInfoItem}
              className="contact-info-link"
            >
              <img src={icon} alt="" style={styles.contactInfoIcon} />
              <span>{text}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   FOOTER
══════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="footer-bar" style={styles.footer}>
      <p style={styles.footerText}>
        © {new Date().getFullYear()} · Built with MERN Stack
      </p>
      <p style={styles.footerText}>Designed &amp; Developed by Kavidu Purnamal</p>
    </footer>
  );
}

/* ══════════════════════════════════════════
   FONT LOADER + GLOBAL STYLES + MEDIA QUERIES
══════════════════════════════════════════ */
function FontLoader() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@600;700;800;900&family=Playfair+Display:wght@700;800;900&family=Poppins:wght@300;400;500;600;700&display=swap";
    document.head.appendChild(link);

    const style = document.createElement("style");
    style.textContent = `
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body { background: ${CREAM}; -webkit-font-smoothing: antialiased; }

      @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50%       { opacity: 0.5; transform: scale(0.75); }
      }

      a:hover { opacity: 0.87; }

      a[style*="background: rgb(255, 138, 61)"]:hover {
        transform: translateY(-2px);
        box-shadow: 0 16px 48px rgba(255,138,61,0.32) !important;
      }

      .contact-info-link:hover {
        color: ${ACCENT} !important;
        opacity: 1 !important;
      }

      .project-showcase:hover .project-image-overlay { opacity: 1; }

      /* ── Hamburger hidden on desktop ── */
      .hamburger-btn { display: none !important; }

      /* ════════════════════════════════════
         TABLET  ≤ 1024px
      ════════════════════════════════════ */
      @media (max-width: 1024px) {
        .hero-left {
          padding: 100px 40px 60px 60px !important;
        }
        .services-wrapper {
          gap: 32px !important;
        }
        .services-left-col {
          flex: 0 0 44% !important;
        }
      }

      /* ════════════════════════════════════
         MOBILE  ≤ 768px
      ════════════════════════════════════ */
      @media (max-width: 768px) {

        /* ── NAV ── */
        .nav-bar {
          padding: 14px 20px !important;
        }
        .nav-desktop-links {
          display: none !important;
        }
        .nav-download-btn {
          display: none !important;
        }
        .hamburger-btn {
          display: flex !important;
          margin-left: auto !important;
        }

        /* ── HERO ── */
        .hero-section {
          flex-direction: column !important;
          height: auto !important;
          max-height: none !important;
          padding-top: 70px !important;
          overflow: visible !important;
          align-items: stretch !important;
        }
        .hero-left {
          flex: none !important;
          width: 100% !important;
          max-width: 100% !important;
          padding: 28px 24px 16px !important;
        }
        .hero-right {
          flex: none !important;
          width: 100% !important;
          height: 280px !important;
          justify-content: center !important;
          overflow: hidden !important;
        }
        .hero-headline {
          font-size: 34px !important;
          letter-spacing: -1px !important;
        }
        .watermark-top,
        .watermark-bottom {
          display: none !important;
        }

        /* ── ABOUT ME ── */
        .about-me-section {
          padding: 60px 24px !important;
        }
        .about-me-inner {
          flex-direction: column !important;
          gap: 32px !important;
        }
        .about-me-image-col {
          flex: none !important;
          width: 100% !important;
          max-width: 260px !important;
          margin: 0 auto !important;
        }
        .about-me-text-col {
          flex: none !important;
          width: 100% !important;
        }

        /* ── PROJECTS ── */
        .projects-section {
          padding: 60px 24px !important;
        }
        .projects-container {
          gap: 48px !important;
        }
        .project-showcase {
          flex-direction: column !important;
          gap: 0 !important;
          border-radius: 16px !important;
          overflow: hidden !important;
          box-shadow: 0 4px 24px rgba(0,0,0,0.08) !important;
        }
        .project-image-container {
          flex: none !important;
          width: 100% !important;
          height: 220px !important;
          border-radius: 0 !important;
        }
        .project-content-container {
          flex: none !important;
          width: 100% !important;
          padding: 24px 20px !important;
        }

        /* ── SERVICES ── */
        .services-section {
          padding: 60px 24px 60px !important;
        }
        .services-wrapper {
          flex-direction: column !important;
          gap: 40px !important;
        }
        .services-left-col {
          position: static !important;
          flex: none !important;
          width: 100% !important;
        }
        .services-right-col {
          flex: none !important;
          width: 100% !important;
        }
        .services-icons-grid {
          grid-template-columns: repeat(6, 1fr) !important;
          gap: 10px !important;
        }
        .services-icon {
          width: 36px !important;
          height: 36px !important;
        }

        /* ── EDUCATION ── */
        .education-section {
          padding: 60px 24px !important;
        }
        .timeline-container-el {
          max-width: 100% !important;
        }
        .timeline-line-el {
          left: 10px !important;
          transform: none !important;
        }
        .timeline-item-el {
          display: block !important;
          position: relative !important;
          margin-bottom: 36px !important;
        }
        .timeline-dot-el {
          left: 10px !important;
          transform: none !important;
        }
        .edu-content-el {
          margin-left: 32px !important;
          margin-right: 0 !important;
          text-align: left !important;
        }

        /* ── CONTACT ── */
        .contact-section {
          padding: 60px 24px 40px !important;
        }
        .contact-headline {
          font-size: 36px !important;
          letter-spacing: -2px !important;
        }
        .contact-btns-row {
          flex-direction: column !important;
          align-items: stretch !important;
          gap: 12px !important;
        }
        .contact-btns-row a {
          justify-content: center !important;
        }
        .contact-info-row {
          flex-direction: column !important;
          gap: 16px !important;
          align-items: center !important;
        }

        /* ── FOOTER ── */
        .footer-bar {
          flex-direction: column !important;
          gap: 6px !important;
          padding: 16px 24px !important;
          align-items: center !important;
          text-align: center !important;
        }

        /* ── ABOUT (original section) ── */
        .about-section {
          padding: 60px 24px !important;
        }
        .heading-panel {
          grid-template-columns: 1fr !important;
          gap: 0 !important;
        }
        .heading-panel h2:last-child {
          display: none !important;
        }
        .about-panel {
          grid-template-columns: 1fr !important;
        }
        .section-divider {
          display: none !important;
        }
        .skills-grid {
          grid-template-columns: repeat(4, 1fr) !important;
          gap: 16px !important;
        }
        .skills-grid img {
          width: 52px !important;
          height: 52px !important;
        }
      }

      /* ════════════════════════════════════
         SMALL MOBILE  ≤ 480px
      ════════════════════════════════════ */
      @media (max-width: 480px) {
        .hero-headline {
          font-size: 28px !important;
        }
        .hero-right {
          height: 230px !important;
        }
        .contact-headline {
          font-size: 30px !important;
          letter-spacing: -1.5px !important;
        }
        .skills-grid {
          grid-template-columns: repeat(3, 1fr) !important;
        }
        .services-icons-grid {
          grid-template-columns: repeat(4, 1fr) !important;
        }
        .project-image-container {
          height: 180px !important;
        }
      }
    `;
    document.head.appendChild(style);
  }, []);
  return null;
}

/* ══════════════════════════════════════════
   STYLES
══════════════════════════════════════════ */
const styles = {
  /* ── Nav ── */
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "18px 48px",
    transition: "background 0.3s, box-shadow 0.3s",
  },
  logo: { display: "flex", alignItems: "center" },
  logoText: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontWeight: 700,
    fontSize: 26,
    color: DARK,
    letterSpacing: -1,
  },
  logoDot: { color: ACCENT },
  navLinks: {
    listStyle: "none",
    display: "flex",
    gap: 32,
    margin: 0,
    padding: 0,
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
  navLink: {
    color: MUTED,
    textDecoration: "none",
    fontSize: 14,
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 500,
    transition: "color 0.2s",
  },
  downloadBtn: {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    gap: 8,
    color: ACCENT,
    background: "transparent",
    padding: "12px 24px",
    borderRadius: 12,
    fontFamily: "'Poppins', sans-serif",
    fontSize: 14,
    fontWeight: 600,
    textDecoration: "none",
    border: `2px solid ${ACCENT}`,
    transition: "background 0.2s, color 0.2s",
    cursor: "pointer",
  },
  downloadBtnHover: { color: "#fff", background: ACCENT },
  downloadIcon: { fontSize: 18, display: "flex", alignItems: "center" },

  /* ── Hamburger ── */
  hamburger: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    background: DARK,
    border: "none",
    borderRadius: "50%",
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    padding: 0,
    marginLeft: "auto",
    flexShrink: 0,
  },
  hamburgerLine: (open, i) => ({
    display: "block",
    width: 18,
    height: 2,
    background: "#fff",
    borderRadius: 2,
    transition: "transform 0.25s, opacity 0.25s",
    transform:
      open && i === 0
        ? "rotate(45deg) translate(5px, 5px)"
        : open && i === 2
        ? "rotate(-45deg) translate(5px, -5px)"
        : "none",
    opacity: open && i === 1 ? 0 : 1,
  }),

  /* ── Mobile menu ── */
  mobileMenu: {
    position: "fixed",
    top: 72,
    left: 0,
    right: 0,
    background: "#fff",
    display: "flex",
    flexDirection: "column",
    gap: 0,
    paddingBottom: 16,
    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
    zIndex: 99,
    borderTop: `1px solid ${BORDER}`,
  },
  mobileLink: {
    color: DARK,
    textDecoration: "none",
    padding: "16px 24px",
    fontSize: 16,
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 500,
    borderBottom: `1px solid ${BORDER}`,
    display: "block",
  },
  mobileCta: {
    color: "#fff",
    background: ACCENT,
    textDecoration: "none",
    padding: "14px 24px",
    fontSize: 15,
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 600,
    display: "block",
    textAlign: "center",
    borderRadius: 10,
  },

  /* ── Hero ── */
  hero: {
    height: "760px",
    maxHeight: "760px",
    background: "#ffffff",
    display: "flex",
    alignItems: "flex-start",
    position: "relative",
    overflow: "hidden",
    paddingTop: 80,
  },
  watermarkTop: {
    position: "absolute",
    top: "10%",
    left: "6%",
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 900,
    fontSize: "clamp(36px, 6.5vw, 92px)",
    color: "transparent",
    WebkitTextStroke: "1.2px rgba(15,43,43,0.12)",
    letterSpacing: "-2px",
    whiteSpace: "nowrap",
    userSelect: "none",
    pointerEvents: "none",
    zIndex: 0,
  },
  watermarkBottom: {
    position: "absolute",
    bottom: "8%",
    left: "40%",
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 900,
    fontSize: "clamp(36px, 6.5vw, 92px)",
    color: "transparent",
    WebkitTextStroke: "1.2px rgba(15,43,43,0.12)",
    letterSpacing: "-2px",
    whiteSpace: "nowrap",
    userSelect: "none",
    pointerEvents: "none",
    zIndex: 0,
  },
  heroLeft: {
    flex: "0 0 60%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: "140px 64px 80px 96px",
    position: "relative",
    zIndex: 2,
    maxWidth: 920,
  },
  greeting: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 24,
    fontWeight: 700,
    color: DARK,
    marginBottom: 20,
  },
  accentName: { color: ACCENT, fontWeight: 600 },
  heroHeadline: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "clamp(26px, 3.5vw, 56px)",
    fontWeight: 800,
    lineHeight: 1.08,
    color: DARK,
    letterSpacing: "-2px",
    marginBottom: 18,
  },
  heroSub: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 16,
    color: MUTED,
    lineHeight: 1.6,
    marginBottom: 24,
    maxWidth: 560,
  },
  btnPrimary: {
    background: ACCENT,
    color: "#fff",
    padding: "16px 36px",
    borderRadius: 10,
    fontFamily: "'Poppins', sans-serif",
    fontSize: 15,
    fontWeight: 700,
    textDecoration: "none",
    boxShadow: "0 12px 36px rgba(255,138,61,0.18)",
    display: "inline-block",
  },
  heroRight: {
    flex: "0 0 40%",
    position: "relative",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    height: "100%",
    overflow: "hidden",
    zIndex: 1,
  },
  heroPhoto: {
    width: "auto",
    height: "100%",
    maxHeight: "600px",
    objectFit: "cover",
    objectPosition: "top center",
    display: "block",
    position: "relative",
    boxShadow: "none",
  },

  /* ── Section commons ── */
  sectionEyebrow: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 15,
    color: ACCENT,
    letterSpacing: "2px",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  sectionTitle: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "clamp(32px, 4vw, 48px)",
    fontWeight: 800,
    color: DARK,
    letterSpacing: -1,
    marginBottom: 24,
  },

  /* ── About (original) ── */
  about: { background: "#fff", padding: "80px 64px", width: "100%" },
  aboutInner: { width: "100%", maxWidth: "none" },
  aboutPanel: {
    display: "grid",
    gridTemplateColumns: "1fr 1px 1fr",
    gap: 32,
    alignItems: "stretch",
  },
  headingPanel: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 32,
    alignItems: "baseline",
    marginBottom: 24,
  },
  skillsColumn: { display: "flex", flexDirection: "column", gap: 24 },
  skillsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "28px 32px",
  },
  aboutSubheading: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 22,
    fontWeight: 700,
    color: DARK,
    lineHeight: 1.2,
    marginBottom: 24,
  },
  sectionDivider: {
    width: 1,
    background: "rgba(15,23,42,0.12)",
    borderRadius: 1,
    alignSelf: "stretch",
  },
  aboutColumn: { display: "flex", flexDirection: "column", gap: 16 },
  aboutText: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 16,
    color: MUTED,
    lineHeight: 1.8,
    marginBottom: 0,
  },
  skillIcon: { width: 72, height: 72, display: "block", objectFit: "contain" },

  /* ── Projects ── */
  projects: { background: CREAM, padding: "80px 64px" },
  projectsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 80,
    marginTop: 24,
  },
  projectShowcase: {
    display: "flex",
    alignItems: "stretch",
    gap: 48,
    borderRadius: 20,
    overflow: "hidden",
    transition: "transform 0.3s ease",
  },
  projectImageContainer: {
    flex: "0 0 35%",
    width: "35%",
    height: 340,
    borderRadius: 16,
    overflow: "hidden",
    flexShrink: 0,
    position: "relative",
  },
  projectImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    objectPosition: "center",
    display: "block",
    transition: "transform 0.3s ease",
  },
  projectImageOverlay: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(15,43,43,0.3)",
    backdropFilter: "blur(2px)",
    opacity: 0,
    transition: "opacity 0.3s ease",
  },
  projectEmoji: { fontSize: 64 },
  projectContentContainer: {
    flex: "1 1 65%",
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "40px 48px",
  },
  projectName: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "clamp(28px, 4vw, 42px)",
    fontWeight: 800,
    color: DARK,
    marginBottom: 16,
    letterSpacing: -1,
  },
  projectDesc: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 16,
    color: MUTED,
    lineHeight: 1.7,
    marginBottom: 12,
    overflowWrap: "break-word",
  },
  projectDetails: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 14,
    color: MUTED,
    lineHeight: 1.7,
    marginBottom: 32,
    opacity: 0.85,
    overflowWrap: "break-word",
  },
  projectFooter: {
    display: "flex",
    alignItems: "center",
    gap: 24,
    flexWrap: "wrap",
  },
  btnMoreDetails: {
    background: ACCENT,
    color: "#fff",
    padding: "14px 32px",
    borderRadius: 10,
    fontFamily: "'Poppins', sans-serif",
    fontSize: 15,
    fontWeight: 700,
    textDecoration: "none",
    boxShadow: "0 12px 36px rgba(255,138,61,0.22)",
    display: "inline-block",
    border: "none",
    cursor: "pointer",
  },
  projectStack: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 12,
    color: MUTED,
    fontWeight: 500,
  },

  /* ── Services ── */
  services: { background: "#fff", padding: "80px 64px 80px" },

  /* ── Education ── */
  education: { background: "#fff", padding: "80px 64px", color: DARK },
  timelineContainer: { position: "relative", maxWidth: 900, margin: "0 auto" },
  timelineLine: {
    position: "absolute",
    left: "50%",
    top: 24,
    bottom: 0,
    width: 2,
    background: BORDER,
    transform: "translateX(-50%)",
    zIndex: 1,
  },
  timelineItem: {
    position: "relative",
    marginBottom: 48,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  timelineDot: {
    position: "absolute",
    width: 12,
    height: 12,
    borderRadius: "50%",
    background: ACCENT,
    top: 6,
    zIndex: 2,
  },
  educationContent: { flex: 1, paddingTop: 0 },
  eduYear: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 12,
    fontWeight: 700,
    color: ACCENT,
    letterSpacing: 0.5,
    marginBottom: 6,
    textTransform: "uppercase",
  },
  eduTitle: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 18,
    fontWeight: 700,
    color: DARK,
    marginBottom: 4,
  },
  eduInstitution: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 14,
    color: MUTED,
    marginBottom: 12,
  },
  eduDesc: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 14,
    color: "rgba(0,0,0,0.7)",
    lineHeight: 1.65,
    marginBottom: 12,
  },

  /* ── Contact ── */
  contact: {
    background: "#ffffff",
    padding: "80px 64px 60px",
  },
  contactInner: {
    maxWidth: 860,
    margin: "0 auto",
    textAlign: "center",
  },
  contactEyebrowWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
    marginBottom: 40,
  },
  contactEyebrowDash: {
    display: "inline-block",
    width: 36,
    height: 2,
    background: ACCENT,
    borderRadius: 2,
    flexShrink: 0,
  },
  contactEyebrowText: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 13,
    fontWeight: 700,
    color: ACCENT,
    letterSpacing: "5px",
    textTransform: "uppercase",
  },
  contactHeadline: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "clamp(36px, 5vw, 64px)",
    fontWeight: 900,
    color: DARK,
    letterSpacing: "-4px",
    lineHeight: 0.96,
    marginBottom: 36,
  },
  contactSubtitle: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 15,
    color: MUTED,
    lineHeight: 1.75,
    maxWidth: 520,
    margin: "0 auto 52px",
  },
  contactBtnsRow: {
    display: "flex",
    gap: 16,
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: 52,
  },
  contactBtnFilled: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    background: ACCENT,
    color: "#fff",
    padding: "16px 38px",
    borderRadius: 10,
    fontFamily: "'Poppins', sans-serif",
    fontSize: 15,
    fontWeight: 700,
    textDecoration: "none",
    boxShadow: "0 12px 36px rgba(255,138,61,0.28)",
    transition: "transform 0.2s, box-shadow 0.2s",
    cursor: "pointer",
  },
  contactBtnFilledHover: {
    transform: "translateY(-2px)",
    boxShadow: "0 18px 48px rgba(255,138,61,0.38)",
  },
  contactBtnOutline: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    background: "transparent",
    color: DARK,
    padding: "14px 38px",
    borderRadius: 10,
    fontFamily: "'Poppins', sans-serif",
    fontSize: 15,
    fontWeight: 600,
    textDecoration: "none",
    border: `2px solid ${DARK}`,
    transition: "background 0.2s, color 0.2s",
    cursor: "pointer",
  },
  contactBtnOutlineHover: {
    background: DARK,
    color: "#fff",
  },
  contactInfoRow: {
    display: "flex",
    gap: 40,
    justifyContent: "center",
    flexWrap: "wrap",
    alignItems: "center",
  },
  contactInfoItem: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontFamily: "'Poppins', sans-serif",
    fontSize: 14,
    color: MUTED,
    textDecoration: "none",
    transition: "color 0.2s",
  },
  contactInfoIcon: {
    width: 20,
    height: 20,
    objectFit: "contain",
    display: "inline-block",
    verticalAlign: "middle",
  },

  /* ── Footer ── */
  footer: {
    background: "#fff",
    padding: "20px 64px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderTop: `1px solid ${BORDER}`,
  },
  footerText: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 11,
    color: MUTED,
  },

  /* ── Stat card (for potential use) ── */
  statCard: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    alignItems: "center",
  },
  statNum: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 28,
    fontWeight: 900,
    color: DARK,
    letterSpacing: -1,
  },
  statLabel: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 11,
    color: MUTED,
    fontWeight: 500,
  },
};

/* ── AboutMe styles ── */
const aboutMeStyles = {
  section: {
    background: "#fff",
    padding: "100px 96px",
    overflow: "hidden",
  },
  inner: {
    display: "flex",
    alignItems: "center",
    gap: 72,
    maxWidth: 1200,
    margin: "0 auto",
  },
  textCol: {
    flex: "0 0 65%",
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  heading: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "clamp(34px, 4vw, 52px)",
    fontWeight: 900,
    color: DARK,
    letterSpacing: "-2px",
    lineHeight: 1.05,
    marginBottom: 8,
  },
  accentText: { color: ACCENT },
  lead: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 18,
    color: MUTED,
    lineHeight: 1.65,
    fontWeight: 550,
    letterSpacing: "-0.3px",
  },
  body: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 15,
    color: MUTED,
    lineHeight: 1.8,
    textAlign: "justify",
  },
  pillsRow: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 0,
    marginTop: 4,
  },
  pill: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 14,
    fontWeight: 400,
    color: ACCENT,
    whiteSpace: "nowrap",
  },
  imageCol: {
    flex: "0 0 35%",
    position: "relative",
  },
  imageWrap: {
    position: "relative",
    borderRadius: 24,
    overflow: "visible",
  },
  photo: {
    width: "100%",
    borderRadius: 24,
    display: "block",
    position: "relative",
    zIndex: 1,
  },
};

/* ── Services layout styles ── */
const servicesLayoutStyles = {
  wrapper: {
    display: "flex",
    alignItems: "flex-start",
    gap: 16,
    maxWidth: 1200,
    margin: "0 auto",
  },
  leftCol: {
    flex: "0 0 52%",
    position: "sticky",
    top: "calc(50vh - 250px)",
    display: "flex",
    flexDirection: "column",
    gap: 24,
    alignSelf: "flex-start",
  },
  title: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "clamp(32px, 3.5vw, 46px)",
    fontWeight: 900,
    color: DARK,
    letterSpacing: "-2px",
    lineHeight: 1.08,
  },
  accent: { color: ACCENT },
  desc: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 15,
    color: MUTED,
    lineHeight: 1.8,
    maxWidth: "95%",
    textAlign: "justify",
  },
  rightCol: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  card: {
    background: "#fff",
    padding: "36px 40px",
    display: "flex",
    flexDirection: "column",
    gap: 12,
    border: `1px solid ${BORDER}`,
    borderRadius: 12,
  },
  cardTitle: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 22,
    fontWeight: 800,
    color: DARK,
    letterSpacing: "-0.5px",
  },
  cardShort: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 12,
    fontWeight: 600,
    color: ACCENT,
    textTransform: "uppercase",
    letterSpacing: "1.5px",
  },
  cardDivider: {
    width: "100%",
    height: 1,
    background: BORDER,
    margin: "4px 0",
  },
  cardDesc: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 14,
    color: MUTED,
    lineHeight: 1.8,
    textAlign: "justify",
  },
  cardTags: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 0,
    marginTop: 8,
  },
  cardTag: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 13,
    fontWeight: 400,
    color: MUTED,
  },
  iconsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: 16,
    marginTop: 8,
  },
  icon: {
    width: 48,
    height: 48,
    objectFit: "contain",
    display: "block",
  },
};

/* ══════════════════════════════════════════
   ROOT EXPORT
══════════════════════════════════════════ */
export default function Portfolio() {
  return (
    <>
      <FontLoader />
      <Nav />
      <main>
        <Hero />
        <Projects />
        <AboutMe />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}