import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

/* ══════════════════════════════════════════
   CONSTANTS
══════════════════════════════════════════ */
const NAV_LINKS = ["Work", "Services", "About", "Contact"];

/* ══════════════════════════════════════════
   COLORS
══════════════════════════════════════════ */
const CREAM = "#ffffff";
const DARK = "#0f2b2b";
const ACCENT = "#f07400";
const MUTED = "#6b6f66";
const BORDER = "rgba(15,43,43,0.08)";

const PROJECT_DATA = {
  name: "Kitchen Chaos",
  tags: ["Unity", "C#", "Single-Player", "2026"],
  desc: "A fast-paced single-player cooking game built in Unity, featuring frantic kitchen challenges, recipe management, and immersive food preparation gameplay.",
  details:
    "Built in C#, I leveraged interfaces for modular kitchen interactions and event handlers for decoupled UI and audio updates, sharpening my core OOP and runtime game logic skills.",
  live: "#",
  repo: "https://github.com/K4V1DU/Kitchenchaos.git",
  stack: "Unity · C# · OOP · Event Handling · Game Systems",
  image: "/images/project5.png",
  video: "/images/project5/gameplay2.mp4",
};

const SCREENSHOTS = [
  {
    title: "Kitchen Overview",
    desc: "The main kitchen scene showing the player’s cooking station, ingredient pickups, and the order queue system.",
    image: "/images/project5/image1.png",
  },
  {
    title: "Visual Plate Prefab",
    desc: "This setup maps ingredient ScriptableObjects to their 3D models so the plate dynamically shows toppings as they're added.",
    image: "/images/project5/image2.png",
  },
  {
    title: "Stove Counter Prefab",
    desc: "This setup manages frying and burning recipe ScriptableObjects to handle cooking progress, sizzle visual effects, and cooking progress bar UI updates while frying meat.",
    image: "/images/project5/image3.png",
  },
  {
    title: "Moving Visuals Shader Graph",
    desc: "This node graph offsets UV coordinates over time using a Speed vector to animate scrolling textures like directional arrows for the delivery counter.",
    image: "/images/project5/image4.png",
  },
  {
    title: "Player Input Actions Asset",
    desc: "Defines key bindings for movement , Interact , and Alternate Interact  to control the player.",
    image: "/images/project5/image5.png",
  },
  {
    title: "Game Logic Scripts",
    desc: "Handles character movement, collision detection, and interactive counter behaviors like plate spawning, item handling, and event management.",
    image: "/images/project5/image6.png",
  },
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
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

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .nav-links {
            display: none !important;
          }
          .nav-back-btn {
            display: none !important;
          }
          .nav-bar {
            padding: 18px 24px !important;
          }
        }
      `}</style>
      <nav
        className="nav-bar"
        style={{
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
          background: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          boxShadow: scrolled ? "0 1px 0 rgba(0,0,0,0.06)" : "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: 26, color: DARK, letterSpacing: -1 }}>
              Portfolio<span style={{ color: ACCENT }}>.</span>
            </span>
          </Link>
        </div>
        <ul className="nav-links" style={{ listStyle: "none", display: "flex", gap: 32, margin: 0, padding: 0, position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
          {NAV_LINKS.map((l) => (
            <li key={l}>
              <Link
                to={`/#${l === "About" ? "about-me" : l.toLowerCase()}`}
                style={{ color: MUTED, textDecoration: "none", fontSize: 14, fontFamily: "'Poppins', sans-serif", fontWeight: 500, transition: "color 0.2s" }}
              >
                {l}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          className="nav-back-btn"
          to="/"
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: MUTED,
            background: "transparent",
            padding: "12px 24px",
            borderRadius: 12,
            fontFamily: "'Poppins', sans-serif",
            fontSize: 14,
            fontWeight: 600,
            textDecoration: "none",
            border: `2px solid ${MUTED}`,
            transition: "background 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => {
            e.target.style.color = "#fff";
            e.target.style.background = MUTED;
          }}
          onMouseLeave={(e) => {
            e.target.style.color = MUTED;
            e.target.style.background = "transparent";
          }}
        >
          ← Back
        </Link>
      </nav>
    </>
  );
}

function ProjectHeader() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <style>{`
        @media (max-width: 1024px) {
          .project-header-container {
            flex-direction: column !important;
            gap: 40px !important;
          }
          .project-header-image {
            flex: none !important;
            width: 100% !important;
            position: static !important;
          }
          .project-header-details {
            flex: none !important;
            width: 100% !important;
          }
        }
        @media (max-width: 768px) {
          .project-header-section {
            padding: 100px 24px 40px !important;
          }
        }
      `}</style>
      <section className="project-header-section" style={{ background: "#fff", padding: "120px 96px 60px" }}>
        <div className="project-header-container" style={{ maxWidth: 1400, margin: "0 auto", display: "flex", gap: 64, alignItems: "flex-start" }}>
          <div className="project-header-image" style={{ flex: "0 0 45%", position: "sticky", top: 120, background: "#fff", borderRadius: 20, overflow: "hidden" }}>
            <div style={{ borderRadius: 20, overflow: "hidden", background: "#fff", minHeight: 340, display: "flex", alignItems: "stretch", justifyContent: "center" }}>
              {PROJECT_DATA.video ? (
                <video
                  src={PROJECT_DATA.video}
                  poster={PROJECT_DATA.image}
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{ width: "100%", height: "100%", minHeight: 340, display: "block", objectFit: "cover", background: "#fff" }}
                  onPlay={(e) => { e.currentTarget.muted = true; e.currentTarget.volume = 0; }}
                  onVolumeChange={(e) => { e.currentTarget.muted = true; e.currentTarget.volume = 0; }}
                />
              ) : (
                <img
                  src={PROJECT_DATA.image}
                  alt={PROJECT_DATA.name}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              )}
            </div>
          </div>

          <div className="project-header-details" style={{ flex: "1 1 55%" }}>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 15, color: ACCENT, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 8 }}>
              Project Details
            </div>
            <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 800, color: DARK, letterSpacing: -2, margin: 0, marginBottom: 32 }}>
              {PROJECT_DATA.name}
            </h1>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 18, color: MUTED, lineHeight: 1.7, maxWidth: 800, marginBottom: 16 }}>
              {PROJECT_DATA.desc}
            </p>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 15, color: MUTED, lineHeight: 1.7, maxWidth: 800, opacity: 0.85 }}>
              {PROJECT_DATA.details}
            </p>
            <div style={{ display: "flex", gap: 16, marginTop: 32, flexWrap: "wrap", alignItems: "center" }}>
              <a
                href={PROJECT_DATA.repo}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: ACCENT,
                  color: "#fff",
                  padding: "14px 32px",
                  borderRadius: 10,
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: 15,
                  fontWeight: 700,
                  textDecoration: "none",
                  boxShadow: "0 12px 36px rgba(240,116,0,0.22)",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                }}
              >
                GitHub
              </a>
              <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 13, color: MUTED, fontWeight: 500 }}>
                {PROJECT_DATA.stack}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Screenshots() {
  const [lightboxImage, setLightboxImage] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <>
      <style>{`
        @media (max-width: 1024px) {
          .screenshots-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 24px !important;
          }
        }
        @media (max-width: 768px) {
          .screenshots-section {
            padding: 60px 24px !important;
          }
          .screenshots-header {
            marginBottom: 48px !important;
          }
          .screenshots-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .screenshot-card-content {
            padding: 20px 24px !important;
          }
        }
      `}</style>
      <section className="screenshots-section" style={{ background: "linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)", padding: "100px 96px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div className="screenshots-header" style={{ textAlign: "center", marginBottom: 80 }}>
            <div style={{
              display: "inline-block",
              padding: "8px 24px",
              background: "rgba(240,116,0,0.12)",
              borderRadius: 30,
              marginBottom: 16,
              fontFamily: "'Poppins', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              color: ACCENT,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
            }}>
              Gallery
            </div>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 800, color: DARK, letterSpacing: -2, marginBottom: 16, lineHeight: 1.1 }}>
              Project Screenshots
            </h2>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 16, color: MUTED, maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>
              Explore the core interface and kitchen gameplay from the Unity cooking experience.
            </p>
          </div>

          <div className="screenshots-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
            {SCREENSHOTS.map((screenshot, index) => (
              <div
                key={index}
                style={{
                  position: "relative",
                  background: "#fff",
                  borderRadius: 24,
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  border: "1px solid rgba(15,43,43,0.06)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                }}
                onClick={() => setLightboxImage(screenshot.image)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div style={{ position: "relative", overflow: "hidden", aspectRatio: "16/10" }}>
                  <img
                    src={screenshot.image}
                    alt={screenshot.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                      transform: hoveredIndex === index ? "scale(1.05)" : "scale(1)",
                    }}
                  />
                  <div style={{
                    position: "absolute",
                    bottom: 24,
                    left: 24,
                    right: 24,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    opacity: hoveredIndex === index ? 1 : 0,
                    transform: hoveredIndex === index ? "translateY(0)" : "translateY(10px)",
                    transition: "all 0.3s ease",
                  }}>
                    <span style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#fff",
                    }}>
                      View Full Size
                    </span>
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                      <span style={{ fontSize: 18 }}>↗</span>
                    </div>
                  </div>
                </div>

                <div className="screenshot-card-content" style={{ padding: "28px 32px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                    <div style={{
                      width: 36,
                      height: 36,
                      borderRadius: "10px",
                      background: "#f07400",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 16,
                      fontWeight: 700,
                      boxShadow: "0 4px 12px rgba(240,116,0,0.3)",
                    }}>
                      {index + 1}
                    </div>
                    <h3 style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 20,
                      fontWeight: 700,
                      color: DARK,
                      margin: 0,
                      letterSpacing: -0.5,
                    }}>
                      {screenshot.title}
                    </h3>
                  </div>
                  <p style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: 14,
                    color: MUTED,
                    margin: 0,
                    lineHeight: 1.6,
                  }}>
                    {screenshot.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {lightboxImage && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(15, 43, 43, 0.95)",
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "40px",
              animation: "fadeIn 0.3s ease",
              backdropFilter: "blur(8px)",
            }}
            onClick={() => setLightboxImage(null)}
          >
            <button
              style={{
                position: "absolute",
                top: "32px",
                right: "32px",
                background: "#f07400",
                border: "1px solid #f07400",
                color: "#fff",
                fontSize: "24px",
                width: 56,
                height: 56,
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s ease",
                fontFamily: "sans-serif",
              }}
              onClick={(e) => {
                e.stopPropagation();
                setLightboxImage(null);
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#f07400";
                e.target.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "#f07400";
                e.target.style.transform = "scale(1)";
              }}
              aria-label="Close lightbox"
            >
              ✕
            </button>
            <img
              src={lightboxImage}
              alt="Screenshot preview"
              style={{
                maxWidth: "92vw",
                maxHeight: "92vh",
                objectFit: "contain",
                borderRadius: 12,
                boxShadow: "0 32px 80px rgba(0, 0, 0, 0.5)",
              }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </section>
    </>
  );
}

function Footer() {
  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .footer {
            flex-direction: column !important;
            gap: 8px !important;
            padding: 20px 24px !important;
            text-align: center !important;
          }
        }
      `}</style>
      <footer className="footer" style={{ background: "#fff", padding: "20px 64px", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: `1px solid ${BORDER}` }}>
        <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 11, color: MUTED, margin: 0 }}>
          © {new Date().getFullYear()} · Built with Unity
        </p>
        <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: 11, color: MUTED, margin: 0 }}>
          Designed & Developed by Kavidu Purnamal
        </p>
      </footer>
    </>
  );
}

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

      @keyframes fadeIn {
        from { opacity: 0; }
        to   { opacity: 1; }
      }

      a:hover { opacity: 0.87; }
    `;
    document.head.appendChild(style);
  }, []);
  return null;
}

export default function Project5() {
  return (
    <>
      <FontLoader />
      <Nav />
      <main>
        <ProjectHeader />
        <Screenshots />
      </main>
      <Footer />
    </>
  );
}
