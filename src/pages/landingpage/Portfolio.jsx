import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Work", "Services", "About", "Blog"];

const STACK = ["MongoDB", "Express.js", "React", "Node.js"];

const SERVICES = [
  {
    icon: "🧩",
    title: "Full-Stack Web Apps",
    desc: "End-to-end product development — from schema design to deployed React frontend.",
  },
  {
    icon: "🔌",
    title: "REST API Development",
    desc: "Clean, documented Node.js & Express APIs with proper auth and error handling.",
  },
  {
    icon: "🎨",
    title: "UI / UX Engineering",
    desc: "Modular React components and pixel-perfect, accessible interfaces.",
  },
  {
    icon: "🚀",
    title: "MVP & Rapid Prototyping",
    desc: "Fast, focused delivery for startups that need a working product in weeks.",
  },
];

const PROJECTS = [
  {
    emoji: "🏠",
    name: "Boodima",
    tags: ["MERN", "Full-Stack", "2024"],
    desc: "A full-stack boarding rental platform connecting tenants with verified local listings — featuring real-time search, location filtering, listing management, and a fully responsive UI.",
    details:
      "This platform revolutionizes how students and professionals find accommodation. Built with cutting-edge technology, it provides seamless browsing, secure payments, and verified landlords.",
    live: "#",
    repo: "#",
    stack: "MongoDB · Express · React · Node",
    image: "/images/project1.jpg",
  },
  {
    emoji: "⚡",
    name: "DevLaunch",
    tags: ["SaaS", "API", "2025"],
    desc: "A developer productivity platform for bootstrapping and launching side projects fast — with project scaffolding, deployment hooks, and team collaboration built in.",
    details:
      "Accelerate your development workflow with intelligent project templates, automated CI/CD pipelines, and real-time team collaboration features.",
    live: "#",
    repo: "#",
    stack: "MERN · REST · JWT",
    image: "/images/project2.jpg",
  },
  {
    emoji: "🎯",
    name: "TaskFlow",
    tags: ["React", "Full-Stack", "2025"],
    desc: "An intelligent task management and collaboration tool designed for remote teams — with real-time updates, AI-powered task suggestions, and seamless integrations.",
    details:
      "Streamline your team's productivity with smart task allocation, progress tracking, and automated workflows that adapt to your project needs.",
    live: "#",
    repo: "#",
    stack: "React · Node.js · PostgreSQL",
    image: "/images/project3.jpg",
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

/* ── Contact info items ── */
const CONTACT_INFO = [
  { icon: "🐙", text: "K4V1DU", href: "https://github.com/K4V1DU" },
  {
    icon: "💼",
    text: "kavidu-purnamal",
    href: "https://linkedin.com/in/kavidu-purnamal",
  },
  { icon: "📞", text: "+94 715 294 616", href: "tel:+94715294616" },
];

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

/* ── Nav ── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [cvHovered, setCvHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        ...styles.nav,
        background: scrolled ? "rgba(245,241,232,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 1px 0 rgba(0,0,0,0.06)" : "none",
      }}
    >
      <div style={styles.logo}>
        <span style={styles.logoText}>
          Portfolio<span style={styles.logoDot}>.</span>
        </span>
      </div>

      <ul style={styles.navLinks}>
        {NAV_LINKS.map((l) => (
          <li key={l}>
            <a href={`#${l.toLowerCase()}`} style={styles.navLink}>
              {l}
            </a>
          </li>
        ))}
      </ul>

      <a
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
    </nav>
  );
}

/* ── Hero ── */
function Hero() {
  return (
    <section id="hero" style={styles.hero}>
      <div style={styles.watermarkTop} aria-hidden="true">
        FULL STACK DEV
      </div>
      <div style={styles.watermarkBottom} aria-hidden="true">
        UI / UX
      </div>

      <div style={styles.heroLeft}>
        <p style={styles.greeting}>
          Hello there, I'm{" "}
          <span style={styles.accentName}>Kavidu Purnamal</span>
        </p>

        <h1 style={styles.heroHeadline}>
          Empowering brands with
          <br />
          custom, high-converting
          <br />
          websites
        </h1>

        <p style={styles.heroSub}>
          that are appealing, brand-accurate, &amp; user-friendly.
        </p>

        <div style={styles.ctaRow}>
          <a href="#contact" style={styles.btnPrimary}>
            Book Free Discovery Call
          </a>
          <a href="#work" style={styles.btnGhost}>
            View My Projects
          </a>
        </div>
      </div>

      <div style={styles.heroRight}>
        <img
          src="/images/photo9.png"
          alt="Kavidu Purnamal"
          style={styles.heroPhoto}
        />
      </div>
    </section>
  );
}

/* ── About ── */
function About() {
  return (
    <section id="about" style={styles.about}>
      <div style={styles.aboutInner}>
        <div style={styles.sectionEyebrow}>Who I Am</div>
        <div style={styles.headingPanel}>
          <h2 style={styles.sectionTitle}>About Me</h2>
          <h2 style={styles.sectionTitle}>My Skills</h2>
        </div>
        <div style={styles.aboutPanel}>
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
              applications with Node.js or diving into game development. I
              absorb new concepts quickly, write clean code, and adapt fast to
              ensure software is built for peak performance.
            </p>
          </div>

          <div style={styles.sectionDivider} aria-hidden="true" />

          <div style={styles.skillsColumn}>
            <div style={styles.skillsGrid}>
              <img
                src="/images/icon1.png"
                alt="Skill icon 1"
                style={styles.skillIcon}
              />
              <img
                src="/images/icon6.jpg"
                alt="Skill icon 2"
                style={styles.skillIcon}
              />
              <img
                src="/images/icon3.jpg"
                alt="Skill icon 3"
                style={styles.skillIcon}
              />
              <img
                src="/images/icon2.png"
                alt="Skill icon 4"
                style={styles.skillIcon}
              />
              <img
                src="/images/icon12.jpg"
                alt="Skill icon 5"
                style={styles.skillIcon}
              />
              <img
                src="/images/icon13.jpg"
                alt="Skill icon 6"
                style={styles.skillIcon}
              />
              <img
                src="/images/icon9.jpg"
                alt="Skill icon 7"
                style={styles.skillIcon}
              />
              <img
                src="/images/icon8.jpg"
                alt="Skill icon 8"
                style={styles.skillIcon}
              />
              <img
                src="/images/icon7.jpg"
                alt="Skill icon 9"
                style={styles.skillIcon}
              />
              <img
                src="/images/icon15.jpg"
                alt="Skill icon 10"
                style={styles.skillIcon}
              />
              <img
                src="/images/icon16.jpg"
                alt="Skill icon 11"
                style={styles.skillIcon}
              />
              <img
                src="/images/icon17.jpg"
                alt="Skill icon 12"
                style={styles.skillIcon}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Projects ── */
function Projects() {
  return (
    <section id="work" style={styles.projects}>
      <div style={styles.sectionEyebrow}>Selected Work</div>
      <h2 style={styles.sectionTitle}>Projects</h2>
      <div style={styles.projectsContainer} className="projects-container">
        {PROJECTS.map((p, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={p.name}
              style={{
                ...styles.projectShowcase,
                flexDirection: isEven ? "row" : "row-reverse",
              }}
              className="project-showcase"
            >
              <div
                style={styles.projectImageContainer}
                className="project-image-container"
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

/* ── Services ── */
function Services() {
  return (
    <section id="services" style={styles.services}>
      <div style={styles.sectionEyebrow}>What I Offer</div>
      <h2 style={styles.sectionTitle}>Freelance Services</h2>
      <div style={styles.servicesGrid}>
        {SERVICES.map((s) => (
          <div key={s.title} style={styles.serviceCard}>
            <div style={styles.serviceIcon}>{s.icon}</div>
            <h3 style={styles.serviceName}>{s.title}</h3>
            <p style={styles.serviceDesc}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Education ── */
function Education() {
  return (
    <section id="education" style={styles.education}>
      <div style={styles.sectionEyebrow}>My Journey</div>
      <h2 style={styles.sectionTitle}>Education</h2>
      <div style={styles.timelineContainer}>
        <div style={styles.timelineLine} aria-hidden="true" />
        {EDUCATION.map((edu, index) => {
          const isLeft = index % 2 === 0;
          return (
            <div key={edu.title} style={styles.timelineItem}>
              <div
                style={{
                  ...styles.timelineDot,
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              />
              <div
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
   CONTACT — redesigned to match screenshot
   (orange accent · white background)
══════════════════════════════════════════ */
function Contact() {
  const [emailHovered, setEmailHovered] = useState(false);
  const [linkedinHovered, setLinkedinHovered] = useState(false);

  return (
    <section id="contact" style={styles.contact}>
      <div style={styles.contactInner}>
        {/* ── Eyebrow: — CONTACT ── */}
        <div style={styles.contactEyebrowWrap}>
          <span style={styles.contactEyebrowDash} />
          <span style={styles.contactEyebrowText}>CONTACT</span>
        </div>

        {/* ── Massive display headline ── */}
        <h2 style={styles.contactHeadline}>
          Let's Build
          <br />
          Something
          <br />
          Amazing
          <br />
          Together
        </h2>

        {/* ── Subtitle ── */}
        <p style={styles.contactSubtitle}>
          Whether you have a project in mind, want to collaborate, or just want
          to say hello — my inbox is always open.
        </p>

        {/* ── CTA buttons ── */}
        <div style={styles.contactBtnsRow}>
          <a
            href="mailto:you@email.com"
            style={{
              ...styles.contactBtnFilled,
              ...(emailHovered ? styles.contactBtnFilledHover : {}),
            }}
            onMouseEnter={() => setEmailHovered(true)}
            onMouseLeave={() => setEmailHovered(false)}
          >
            <span style={styles.contactBtnIcon}>✉️</span>
            Send Email
          </a>
          <a
            href="#"
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

        {/* ── Info row: GitHub · LinkedIn · Phone ── */}
        <div style={styles.contactInfoRow}>
          {CONTACT_INFO.map(({ icon, text, href }) => (
            <a
              key={text}
              href={href}
              style={styles.contactInfoItem}
              className="contact-info-link"
            >
              <span style={styles.contactInfoIcon}>{icon}</span>
              <span>{text}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Footer ── */
function Footer() {
  return (
    <footer style={styles.footer}>
      <p style={styles.footerText}>
        © {new Date().getFullYear()} · Built with MERN Stack
      </p>
      <p style={styles.footerText}>Designed &amp; Developed by You</p>
    </footer>
  );
}

/* ── AboutMe (NEW — with photo) ── */
function AboutMe() {
  return (
    <section id="about-me" style={aboutMeStyles.section}>
      <div style={aboutMeStyles.inner}>

  {/* LEFT: photo — 35% */}
  <div style={aboutMeStyles.imageCol}>
    <div style={aboutMeStyles.imageWrap}>
      <img
        src="/images/photo9.png"
        alt="Kavidu Purnamal"
        style={aboutMeStyles.photo}
      />
    </div>
  </div>

  {/* RIGHT: text content — 65% */}
  <div style={aboutMeStyles.textCol}>
    <div style={styles.sectionEyebrow}>Who I Am</div>
    <h2 style={aboutMeStyles.heading}>
      Fast to learn.
      <br />
      <span style={aboutMeStyles.accentText}>Built to deliver.</span>
    </h2>
    <p style={aboutMeStyles.lead}>
      I'm <strong>Kavidu Purnamal</strong>, a full-stack developer and SLIIT student
      who bridges complex backend systems with clean, intuitive frontends.
    </p>
    <p style={aboutMeStyles.body}>
      With 3+ years deep in the MERN stack, I've built everything from boarding rental
      platforms to developer productivity tools. What drives me isn't just shipping
      code — it's building things people enjoy using.
    </p>
    <p style={aboutMeStyles.body}>
      I absorb new technologies fast, write clean maintainable code, and care deeply
      about performance and accessibility. Whether it's a startup MVP or a polished
      SaaS product, I bring the same level of focus to every project.
    </p>
    <div style={aboutMeStyles.pillsRow}>
      {["MongoDB", "Express.js", "React", "Node.js", "REST APIs", "UI/UX"].map((tag, index, arr) => (
        <span key={tag}>
          <span style={aboutMeStyles.pill}>{tag}</span>
          {index < arr.length - 1 && (
            <span style={{ ...aboutMeStyles.pill, padding: "0 6px" }}> · </span>
          )}
        </span>
      ))}
    </div>
  </div>

</div>
    </section>
  );
}

/* ══════════════════════════════════════════
   STYLES
══════════════════════════════════════════ */
const CREAM = "#ffffff";
const DARK = "#0f2b2b";
const ACCENT = "#ff8a3d";
const ACCENT_LIGHT = "#fff2e6";
const MUTED = "#6b6f66";
const BORDER = "rgba(15,43,43,0.08)";

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
  },
  hamburgerLine: (open, i) => ({
    display: "block",
    width: 18,
    height: 2,
    background: "#fff",
    borderRadius: 2,
    transition: "transform 0.2s, opacity 0.2s",
    transform:
      open && i === 0
        ? "rotate(45deg) translate(5px, 5px)"
        : open && i === 2
          ? "rotate(-45deg) translate(5px, -5px)"
          : "none",
    opacity: open && i === 1 ? 0 : 1,
  }),
  mobileMenu: {
    position: "fixed",
    top: 80,
    left: 0,
    right: 0,
    background: CREAM,
    display: "flex",
    flexDirection: "column",
    gap: 0,
    padding: "8px 0 24px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
    zIndex: 99,
  },
  mobileLink: {
    color: DARK,
    textDecoration: "none",
    padding: "14px 48px",
    fontSize: 15,
    fontFamily: "'Poppins', sans-serif",
    borderBottom: `1px solid ${BORDER}`,
  },
  mobileCta: {
    color: "#fff",
    background: ACCENT,
    textDecoration: "none",
    padding: "14px 48px",
    fontSize: 15,
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 600,
    display: "block",
    textAlign: "center",
    borderRadius: 8,
    margin: "16px 48px 0",
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
    top: "6%",
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
    left: "18%",
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
    padding: "100px 64px 80px 96px",
    position: "relative",
    zIndex: 2,
    maxWidth: 920,
  },
  greeting: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 34,
    fontWeight: 700,
    color: DARK,
    marginBottom: 20,
  },
  wave: { fontSize: 20 },
  accentName: { color: ACCENT, fontWeight: 600 },
  heroHeadline: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "clamp(28px, 3.6vw, 56px)",
    fontWeight: 800,
    lineHeight: 1.08,
    color: DARK,
    letterSpacing: "-2px",
    marginBottom: 18,
  },
  accentUnderline: {
    color: ACCENT,
    textDecoration: "underline",
    textDecorationColor: ACCENT,
    textDecorationThickness: 3,
    textUnderlineOffset: 5,
  },
  heroSub: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 12,
    color: MUTED,
    lineHeight: 1.6,
    marginBottom: 24,
    maxWidth: 560,
  },
  stackRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
    marginBottom: 32,
  },
  stackLabel: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 11,
    color: MUTED,
  },
  stackChip: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 11,
    padding: "4px 10px",
    borderRadius: 5,
    border: `1px solid ${BORDER}`,
    background: "#fff",
    color: DARK,
  },
  ctaRow: {
    display: "flex",
    gap: 20,
    flexWrap: "wrap",
    marginTop: 18,
    marginBottom: 40,
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
  btnGhost: {
    background: "transparent",
    color: ACCENT,
    padding: "14px 34px",
    borderRadius: 10,
    fontFamily: "'Poppins', sans-serif",
    fontSize: 15,
    fontWeight: 600,
    textDecoration: "none",
    border: `2px solid ${ACCENT}`,
    display: "inline-block",
  },

  heroRight: {
    flex: "0 0 40%",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    overflow: "hidden",
    zIndex: 1,
  },
  heroPhoto: {
    width: "100%",
    maxHeight: "100%",
    objectFit: "contain",
    objectPosition: "center",
    display: "block",
    position: "relative",
    boxShadow: "none",
  },
  availBadge: {
    position: "absolute",
    bottom: 32,
    left: -20,
    background: "#fff",
    borderRadius: 100,
    padding: "10px 20px",
    fontFamily: "'Poppins', sans-serif",
    fontSize: 13,
    fontWeight: 600,
    color: DARK,
    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
    display: "flex",
    alignItems: "center",
    gap: 8,
    whiteSpace: "nowrap",
    zIndex: 2,
  },
  availDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#22c55e",
    display: "inline-block",
    animation: "pulse 2s ease-in-out infinite",
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

  /* ── About ── */
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
    flex: "1 1 35%",
    minWidth: 0,
    position: "relative",
    height: 420,
    overflow: "hidden",
    borderRadius: 16,
  },
  projectImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
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
  projectTags: { display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" },
  projectTag: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 11,
    padding: "6px 14px",
    borderRadius: 6,
    background: ACCENT_LIGHT,
    border: `1px solid rgba(224,124,42,0.3)`,
    color: ACCENT,
    fontWeight: 600,
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
  services: { background: "#fff", padding: "80px 64px" },
  servicesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 16,
    marginTop: 8,
  },
  serviceCard: {
    background: CREAM,
    border: `1px solid ${BORDER}`,
    borderRadius: 14,
    padding: "24px 20px",
    transition: "border-color 0.2s, transform 0.2s",
    cursor: "default",
  },
  serviceIcon: { fontSize: 26, marginBottom: 14 },
  serviceName: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 16,
    fontWeight: 700,
    color: DARK,
    marginBottom: 8,
  },
  serviceDesc: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 13,
    color: MUTED,
    lineHeight: 1.65,
  },

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
  viewCertificate: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    color: ACCENT,
    textDecoration: "none",
    fontFamily: "'Poppins', sans-serif",
    fontSize: 13,
    fontWeight: 600,
  },
  certIcon: { fontSize: 14 },

  /* ══════════════════════════════════════════
     CONTACT — redesigned
     (matches screenshot layout · orange theme · white bg)
  ══════════════════════════════════════════ */
  contact: {
    background: "#ffffff",
    padding: "120px 64px 100px",
  },
  contactInner: {
    maxWidth: 860,
    margin: "0 auto",
    textAlign: "center",
  },

  /* eyebrow: — CONTACT */
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

  /* massive headline */
  contactHeadline: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "clamp(56px, 9vw, 108px)",
    fontWeight: 900,
    color: DARK,
    letterSpacing: "-4px",
    lineHeight: 0.96,
    marginBottom: 36,
  },

  /* subtitle */
  contactSubtitle: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 15,
    color: MUTED,
    lineHeight: 1.75,
    maxWidth: 520,
    margin: "0 auto 52px",
  },

  /* buttons row */
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
  contactBtnIcon: {
    fontSize: 16,
    lineHeight: 1,
  },

  /* info row: GitHub · LinkedIn · Phone */
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
    fontSize: 16,
    lineHeight: 1,
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
};

/* ══════════════════════════════════════════
   GOOGLE FONTS + GLOBAL STYLES
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

      /* Generic link hover */
      a:hover { opacity: 0.87; }

      /* Orange-filled button lift */
      a[style*="background: rgb(255, 138, 61)"]:hover,
      a[style*='background: rgb(255, 138, 61)']:hover {
        transform: translateY(-2px);
        box-shadow: 0 16px 48px rgba(255,138,61,0.32) !important;
      }

      /* Contact info link hover → orange */
      .contact-info-link:hover {
        color: ${ACCENT} !important;
        opacity: 1 !important;
      }

      /* Project image hover */
      .project-showcase:hover .project-image      { transform: scale(1.05); }
      .project-showcase:hover .project-image-overlay { opacity: 1; }

      /* Mobile */
      @media (max-width: 768px) {
        .project-showcase          { flex-direction: column !important; }
        .project-image-container   { flex: 0 0 100% !important; height: 300px !important; }
        .project-content-container { flex: 0 0 100% !important; padding: 30px 0 !important; }
        .projects-container        { gap: 60px !important; }
      }
    `;
    document.head.appendChild(style);
  }, []);
  return null;
}

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

  /* Left col */
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
  accentText: {
    color: ACCENT,
  },
  lead: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 17,
    color: DARK,
    lineHeight: 1.65,
    fontWeight: 500,
  },
  body: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 15,
    color: MUTED,
    lineHeight: 1.8,
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
  statsRow: {
    display: "flex",
    alignItems: "center",
    gap: 28,
    marginTop: 8,
    paddingTop: 24,
    borderTop: `1px solid ${BORDER}`,
  },
  stat: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
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
  statDivider: {
    width: 1,
    height: 40,
    background: BORDER,
    flexShrink: 0,
  },

  /* Right col */
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
        <Education />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
