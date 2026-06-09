import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   REPLACE THIS with your actual photo import:
   import devPhoto from "./assets/your-photo.jpg";
   Then swap the placeholder <div> with <img src={devPhoto} ... />
────────────────────────────────────────────── */

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
    live: "#",
    repo: "#",
    stack: "MongoDB · Express · React · Node",
  },
  {
    emoji: "⚡",
    name: "DevLaunch",
    tags: ["SaaS", "API", "2025"],
    desc: "A developer productivity platform for bootstrapping and launching side projects fast — with project scaffolding, deployment hooks, and team collaboration built in.",
    live: "#",
    repo: "#",
    stack: "MERN · REST · JWT",
  },
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
      { threshold: 0.5 }
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

      {/* Desktop links */}
      <ul style={styles.navLinks}>
        {NAV_LINKS.map((l) => (
          <li key={l}>
            <a href={`#${l.toLowerCase()}`} style={styles.navLink}>
              {l}
            </a>
          </li>
        ))}
      </ul>

      {/* mobile menu removed */}
    </nav>
  );
}

/* ── Hero ── */
function Hero() {
  return (
    <section id="hero" style={styles.hero}>
      {/* Ghost watermark */}
      <div style={styles.watermarkTop} aria-hidden="true">
        FULL STACK DEV
      </div>
      <div style={styles.watermarkBottom} aria-hidden="true">
        UI / UX
      </div>

      {/* Left content */}
      <div style={styles.heroLeft}>
        <p style={styles.greeting}>
          Hello there, I'm <span style={styles.accentName}>Kavidu Purnamal</span>
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

        {/* CTAs */}
        <div style={styles.ctaRow}>
          <a href="#contact" style={styles.btnPrimary}>
            Book Free Discovery Call
          </a>
          <a href="#work" style={styles.btnGhost}>
            View My Projects
          </a>
        </div>
      </div>

      {/* Right — photo panel */}
      <div style={styles.heroRight}>
        {/*
          Replace this placeholder with your photo:
          <img src={devPhoto} alt="Your Name" style={styles.heroPhoto} />
        */}
        <img
  src="/images/photo9.png"
  alt="Your Name"
  style={styles.heroPhoto}
/>

        {/* availability badge removed per request */}
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
        <h2 style={styles.sectionTitle}>About Me</h2>
        <p style={styles.aboutText}>
          A software engineer with a deep focus on building cohesive, end-to-end web
          applications. From schema design in MongoDB to deploying polished React
          interfaces — I own the full picture, think in systems, and write code that
          other engineers respect.
        </p>
        <p style={styles.aboutText}>
          My approach is simple: understand the business goal first, then engineer the
          cleanest possible path to it. No over-engineering, no shortcuts.
        </p>
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
      <div style={styles.projectsGrid}>
        {PROJECTS.map((p) => (
          <div key={p.name} style={styles.projectCard}>
            <div style={styles.cardTop}>
              <span style={styles.cardEmoji}>{p.emoji}</span>
              <div style={styles.cardTags}>
                {p.tags.map((t) => (
                  <span key={t} style={styles.cardTag}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <h3 style={styles.cardTitle}>{p.name}</h3>
            <p style={styles.cardDesc}>{p.desc}</p>
            <div style={styles.cardFooter}>
              <a href={p.live} style={styles.cardLink}>
                Live Demo →
              </a>
              <a href={p.repo} style={styles.cardLink}>
                GitHub →
              </a>
              <span style={styles.cardStack}>{p.stack}</span>
            </div>
          </div>
        ))}
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

/* ── Contact ── */
function Contact() {
  return (
    <section id="contact" style={styles.contact}>
      <div style={styles.contactInner}>
        <div style={styles.sectionEyebrow}>Get In Touch</div>
        <h2 style={{ ...styles.sectionTitle, textAlign: "center" }}>
          Let's build something.
        </h2>
        <p style={styles.contactSub}>
          Open to freelance projects, contract roles, and interesting collaborations.
        </p>
        <div style={styles.contactPills}>
          {[
            { label: "Email Me", href: "mailto:you@email.com", icon: "✉️" },
            { label: "LinkedIn", href: "#", icon: "💼" },
            { label: "GitHub", href: "#", icon: "🐙" },
          ].map(({ label, href, icon }) => (
            <a key={label} href={href} style={styles.contactPill}>
              <span>{icon}</span> {label}
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
      <p style={styles.footerText}>© {new Date().getFullYear()} · Built with MERN Stack</p>
      <p style={styles.footerText}>Designed &amp; Developed by You</p>
    </footer>
  );
}

/* ══════════════════════════════════════════
   STYLES
══════════════════════════════════════════ */
const CREAM = "#ffffff"; // use full white for page background
const DARK = "#0f2b2b"; // deep teal/green for headings
const ACCENT = "#ff8a3d"; // warm orange accent
const ACCENT_LIGHT = "#fff2e6"; // pale orange for tags
const MUTED = "#6b6f66"; // muted green-gray for body text
const BORDER = "rgba(15,43,43,0.08)";

const styles = {
  /* Nav */
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
    marginTop: 8,
    display: "block",
    textAlign: "center",
    borderRadius: 8,
    margin: "16px 48px 0",
  },

  /* Hero */
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
    fontFamily: "'Playfair Display', serif",
    fontWeight: 900,
    fontFamily: "'Poppins', sans-serif",
    fontSize: "clamp(36px, 6.5vw, 92px)",
    color: "transparent",
    WebkitTextStroke: "1.2px rgba(15,43,43,0.12)",
    textStroke: "1.2px rgba(15,43,43,0.12)",
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
    textStroke: "1.2px rgba(15,43,43,0.12)",
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
  accentName: {
    color: ACCENT,
    fontWeight: 600,
  },
  heroHeadline: {
    fontFamily: "'Playfair Display', Georgia, serif",
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
    transition: "transform 0.15s, box-shadow 0.15s",
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
    transition: "background 0.2s, color 0.2s",
  },
  statsRow: {
    display: "flex",
    gap: 20,
    flexWrap: "wrap",
  },
  statCard: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  statNum: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 32,
    fontWeight: 800,
    color: DARK,
    letterSpacing: -1,
  },
  statLabel: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 12,
    color: MUTED,
  },

  /* Hero right / photo */
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
  photoPlaceholder: {
    flex: 1,
    background: "#e8e3d5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  photoInner: {
    textAlign: "center",
    padding: 24,
  },
  photoIcon: { fontSize: 48, display: "block", marginBottom: 12 },
  photoHint: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 14,
    color: MUTED,
    marginBottom: 8,
  },
  photoHintSub: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 12,
    color: "#aaa8a0",
    lineHeight: 1.6,
  },
  code: {
    fontFamily: "'Poppins', sans-serif",
    background: "rgba(0,0,0,0.05)",
    padding: "2px 5px",
    borderRadius: 4,
    fontSize: 11,
  },
  /* When using a real photo: */
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

  /* Section commons */
  sectionEyebrow: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 11,
    color: ACCENT,
    letterSpacing: "2px",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  sectionTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(26px, 3vw, 38px)",
    fontWeight: 800,
    color: DARK,
    letterSpacing: -1,
    marginBottom: 24,
  },

  /* About */
  about: {
    background: "#fff",
    padding: "80px 64px",
  },
  aboutInner: { maxWidth: 640 },
  aboutText: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 16,
    color: MUTED,
    lineHeight: 1.8,
    marginBottom: 16,
  },

  /* Projects */
  projects: {
    background: CREAM,
    padding: "80px 64px",
  },
  projectsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 20,
    marginTop: 8,
  },
  projectCard: {
    background: "#fff",
    border: `1px solid ${BORDER}`,
    borderRadius: 16,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.2s, box-shadow 0.2s",
    cursor: "pointer",
  },
  cardTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "24px 24px 0",
    marginBottom: 14,
  },
  cardEmoji: { fontSize: 28 },
  cardTags: { display: "flex", gap: 6 },
  cardTag: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 10,
    padding: "3px 8px",
    borderRadius: 5,
    background: ACCENT_LIGHT,
    border: `1px solid rgba(224,124,42,0.2)`,
    color: ACCENT,
  },
  cardTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 20,
    fontWeight: 800,
    color: DARK,
    padding: "0 24px",
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  cardDesc: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 13,
    color: MUTED,
    lineHeight: 1.65,
    padding: "0 24px 20px",
    flex: 1,
  },
  cardFooter: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "14px 24px",
    borderTop: `1px solid ${BORDER}`,
    background: "#fafaf8",
    flexWrap: "wrap",
  },
  cardLink: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 12,
    fontWeight: 600,
    color: ACCENT,
    textDecoration: "none",
  },
  cardStack: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 10,
    color: "#bbb8b0",
    marginLeft: "auto",
  },

  /* Services */
  services: {
    background: "#fff",
    padding: "80px 64px",
  },
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
    fontFamily: "'Playfair Display', serif",
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

  /* Contact */
  contact: {
    background: DARK,
    padding: "80px 64px",
  },
  contactInner: {
    maxWidth: 560,
    margin: "0 auto",
    textAlign: "center",
  },
  contactSub: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 15,
    color: "rgba(255,255,255,0.5)",
    marginBottom: 32,
  },
  contactPills: {
    display: "flex",
    gap: 12,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  contactPill: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "12px 22px",
    borderRadius: 8,
    fontFamily: "'Poppins', sans-serif",
    fontSize: 14,
    fontWeight: 500,
    textDecoration: "none",
    border: "1px solid rgba(255,255,255,0.12)",
    color: "rgba(255,255,255,0.7)",
    background: "rgba(255,255,255,0.04)",
    transition: "border-color 0.2s, color 0.2s, background 0.2s",
  },

  /* Footer */
  footer: {
    background: DARK,
    padding: "20px 64px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderTop: "1px solid rgba(255,255,255,0.06)",
  },
  footerText: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 11,
    color: "rgba(255,255,255,0.3)",
  },
};

/* ══════════════════════════════════════════
   GOOGLE FONTS INJECTOR
   (only needed if NOT using index.html link tag)
══════════════════════════════════════════ */
function FontLoader() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=Poppins:wght@300;400;500;600;700&display=swap";
    document.head.appendChild(link);

    /* Global reset + keyframes */
    const style = document.createElement("style");
    style.textContent = `
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body { background: ${CREAM}; -webkit-font-smoothing: antialiased; }
      @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.5; transform: scale(0.75); }
      }
      a:hover { opacity: 0.85; }
    `;
    document.head.appendChild(style);
  }, []);
  return null;
}

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
        <About />
        <Projects />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
