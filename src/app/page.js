"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Database,
  Layers,
  Menu,
  X,
  Github,
  Check,
  Plus,
  Minus,
  CloudSun,
  Bell,
  MapPin,
} from "lucide-react";
import {
  Sculpture,
  ScrollProgress,
  Tilt,
  Reveal,
} from "@/components/MotionElements";
import PortfolioDialog from "@/components/PortfolioDialog";
import { projects, experience } from "@/data/portfolio";
import "./portfolio.css";

const links = [
  ["Work", "#projects"],
  ["About", "#about"],
  ["Experience", "#experience"],
];
const categories = ["All work", "Products", "Websites", "Games"];

function Brand() {
  return (
    <>
      <span className="brand-monogram">
        jc<span>.</span>
      </span>
      <span className="brand-name">
        Jared
        <br />
        Callantine
      </span>
    </>
  );
}
function Eyebrow({ number, children }) {
  return (
    <p className="eyebrow">
      <span>{number} /</span>
      {children}
    </p>
  );
}
function External({ href, children, className = "" }) {
  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <ArrowUpRight size={17} aria-hidden="true" />
    </a>
  );
}

function ProjectArt({ project }) {
  if (project.id === "tracker")
    return (
      <div className="tracker-art">
        <Image
          src="/projects/esports-hero.webp"
          alt="Esports competitor at their gaming setup"
          fill
          sizes="(max-width: 760px) 100vw, 60vw"
        />
        <div className="tracker-art-shade" />
        <div className="tracker-art-top">
          <span>
            COD TRACKER<sup>+</sup>
          </span>
          <span className="live-label">
            <i />
            LIVE PRODUCT
          </span>
        </div>
        <div className="tracker-art-copy">
          <span>FROM REVIEW TO READY</span>
          <strong>
            Every match.
            <br />
            <em>An advantage.</em>
          </strong>
          <div className="tracker-art-tags">
            <span>STATS</span>
            <span>VOD REVIEW</span>
            <span>AI COACHING</span>
          </div>
        </div>
        <div className="tracker-float">
          <span className="mini-chart">
            {[24, 40, 32, 54, 42, 65, 78].map((height, i) => (
              <i key={i} style={{ height }} />
            ))}
          </span>
          <span>
            REVIEW. REFINE. REPEAT.
            <strong>
              Your next move,
              <br />
              backed by evidence.
            </strong>
          </span>
        </div>
      </div>
    );
  if (project.id === "fast-weather")
    return (
      <div className="weather-art" aria-hidden="true">
        <span className="visual-label">FASTHEALTH / MOBILE DEVELOPMENT</span>
        <div className="weather-orbit orbit-one" />
        <div className="weather-orbit orbit-two" />
        <div className="weather-phone">
          <span className="phone-camera" />
          <div className="weather-wordmark">
            FastCommand<span>WEATHER</span>
          </div>
          <CloudSun className="weather-symbol" strokeWidth={1.3} />
          <strong>
            Your weather.
            <br />
            <em>Where you are.</em>
          </strong>
          <div className="weather-notice">
            <Bell size={17} />
            <span>
              Stay one step ahead<small>Location-aware weather alerts</small>
            </span>
          </div>
          <div className="weather-location">
            <MapPin size={12} /> Scheduled updates. On the go.
          </div>
        </div>
        <span className="visual-footer">
          iOS + ANDROID <span>INTERFACE CONCEPT</span>
        </span>
      </div>
    );
  if (project.id === "incursion")
    return (
      <div className="incursion-art" aria-hidden="true">
        <span className="visual-label">WORLDS / SYSTEMS / PLAY</span>
        <div className="world-grid" />
        <div className="world-block block-a" />
        <div className="world-block block-b" />
        <div className="world-block block-c" />
        <strong>INCURSION</strong>
        <span className="visual-footer">A WORLD IN THE MAKING</span>
      </div>
    );
  if (project.id === "embrace")
    return (
      <div className="embrace-art" aria-hidden="true">
        <span className="visual-label">A LITTLE STRUCTURE. A BETTER WEEK.</span>
        <div className="chore-paper">
          <div>
            <span>embrace</span>
            <i />
          </div>
          <strong>
            Room for
            <br />a better routine.
          </strong>
          {["Shared spaces", "Weekly rotation", "A clear next step"].map(
            (text, i) => (
              <p key={text}>
                <span>
                  {i === 0 ? (
                    <Check size={12} />
                  ) : (
                    <span className="empty-check" />
                  )}
                </span>
                {text}
              </p>
            ),
          )}
        </div>
        <span className="visual-footer">COMMUNITY, CONSIDERED.</span>
      </div>
    );
  return null;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState("All work");
  const [selectedProject, setSelectedProject] = useState(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [email, setEmail] = useState(""),
    [subject, setSubject] = useState(""),
    [body, setBody] = useState("");
  const [sending, setSending] = useState(false),
    [status, setStatus] = useState(null);
  const [expanded, setExpanded] = useState(0);
  const reduced = useReducedMotion();
  const menuRef = useRef(null);
  const visible = projects.filter(
    (project) => category === "All work" || project.category === category,
  );
  useEffect(() => {
    if (!menuOpen) return;
    const close = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuRef.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menuOpen]);
  function openContact() {
    setMenuOpen(false);
    setStatus(null);
    setContactOpen(true);
  }
  async function sendMessage(event) {
    event.preventDefault();
    setSending(true);
    setStatus(null);
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, subject, body }),
      });
      if (!response.ok) throw new Error("Send failed");
      setStatus("success");
      setEmail("");
      setSubject("");
      setBody("");
    } catch {
      setStatus("error");
    } finally {
      setSending(false);
    }
  }
  return (
    <MotionConfig reducedMotion="user">
      <div className="portfolio">
        <ScrollProgress />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <header className="site-header">
          <div className="shell nav-inner">
            <a href="#top" className="brand" aria-label="Jared Callantine home">
              <Brand />
            </a>
            <nav className="desktop-nav" aria-label="Main navigation">
              {links.map(([label, href]) => (
                <a href={href} key={href}>
                  {label}
                </a>
              ))}
            </nav>
            <button className="nav-contact" onClick={openContact}>
              Let’s talk <ArrowUpRight size={16} />
            </button>
            <button
              className="menu-button"
              ref={menuRef}
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
          <AnimatePresence>
            {menuOpen && (
              <motion.nav
                id="mobile-navigation"
                className="mobile-nav"
                aria-label="Mobile navigation"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {links.map(([label, href]) => (
                  <a key={href} href={href} onClick={() => setMenuOpen(false)}>
                    {label}
                    <ArrowUpRight />
                  </a>
                ))}
                <button onClick={openContact}>
                  Let’s talk
                  <ArrowUpRight />
                </button>
              </motion.nav>
            )}
          </AnimatePresence>
        </header>
        <main id="main">
          <section id="top" className="shell hero">
            <div className="hero-copy">
              <motion.p
                className="hero-intro"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <span className="status-dot" /> FULL-STACK DEVELOPER / ALABAMA
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: reduced ? 0 : 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                Thoughtful code.
                <br />
                <em>Tangible impact.</em>
              </motion.h1>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: reduced ? 0 : 0.25, duration: 0.7 }}
              >
                <p className="hero-description">
                  I’m Jared. I build useful digital experiences—from the first
                  interface to the systems behind it.
                </p>
                <div className="hero-actions">
                  <a className="button button-dark" href="#projects">
                    Explore my work
                    <ArrowDown size={17} />
                  </a>
                  <a
                    className="text-link"
                    href="/Jared_Callantine_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View résumé
                    <ArrowUpRight size={17} />
                  </a>
                </div>
              </motion.div>
            </div>
            <Sculpture />
            <div className="hero-bottom">
              <span>DESIGN-MINDED. DETAIL-DRIVEN.</span>
              <span>WEB APPLICATIONS / AI TOOLS / INTERACTIVE WORLDS</span>
              <a href="#projects" aria-label="Scroll to selected work">
                <ArrowDown size={17} />
              </a>
            </div>
          </section>
          <div className="discipline-strip" aria-hidden="true">
            <div className="shell">
              <span>Interface to infrastructure.</span>
              <i />
              <span>Ideas to something real.</span>
              <i />
              <span>Built with intention.</span>
              <i />
            </div>
          </div>
          <section id="projects" className="shell work-section">
            <Reveal className="section-heading">
              <div>
                <Eyebrow number="01">SELECTED WORK</Eyebrow>
                <h2>
                  A few things
                  <br />
                  <em>I’ve put into the world.</em>
                </h2>
              </div>
              <p>
                Real projects. Different challenges.
                <br />
                The same care for how it all comes together.
              </p>
            </Reveal>
            <div className="work-toolbar">
              <div
                className="project-filters"
                role="group"
                aria-label="Filter projects"
              >
                {categories.map((item) => (
                  <button
                    key={item}
                    aria-pressed={category === item}
                    onClick={() => setCategory(item)}
                  >
                    {item}
                    {category === item && (
                      <span>{visible.length.toString().padStart(2, "0")}</span>
                    )}
                  </button>
                ))}
              </div>
              <span className="project-count" aria-live="polite">
                {visible.length} {visible.length === 1 ? "PROJECT" : "PROJECTS"}
              </span>
            </div>
            <div className="project-grid">
              {visible.map((project) => {
                const visual = [
                  "tracker",
                  "fast-weather",
                  "incursion",
                  "embrace",
                ].includes(project.id);
                return (
                  <Reveal
                    key={project.id}
                    className={
                      ["tracker", "fast-weather"].includes(project.id)
                        ? "project-featured"
                        : visual
                          ? "project-visual"
                          : "project-row"
                    }
                  >
                    <article>
                      {visual && (
                        <Tilt className="project-image">
                          <ProjectArt project={project} />
                        </Tilt>
                      )}
                      <div className="project-info">
                        <div className="project-meta">
                          <span>
                            {project.number} / {project.type}
                          </span>
                          {project.id === "tracker" && (
                            <span className="featured-label">
                              FEATURED PROJECT
                            </span>
                          )}
                        </div>
                        <div className="project-title-row">
                          <h3>{project.name}</h3>
                          {project.href ? (
                            <External
                              href={project.href}
                              className="project-arrow"
                            >
                              <span className="sr-only">
                                Visit {project.name}
                              </span>
                            </External>
                          ) : (
                            <button
                              className="project-arrow"
                              onClick={() => setSelectedProject(project)}
                              aria-label={"About " + project.name}
                            >
                              <ArrowUpRight size={23} />
                            </button>
                          )}
                        </div>
                        <p>{project.description}</p>
                        <div className="project-tags">
                          {project.tags.map((tag) => (
                            <span key={tag}>{tag}</span>
                          ))}
                        </div>
                        {project.id === "tracker" && (
                          <div className="project-links">
                            <External
                              href={project.href}
                              className="button button-dark"
                            >
                              Explore the live app
                            </External>
                            {project.github && (
                              <External
                                href={project.github}
                                className="text-link"
                              >
                                <Github size={16} />
                                View source
                              </External>
                            )}
                          </div>
                        )}
                        {!project.href && (
                          <button
                            className="text-link project-overview"
                            onClick={() => setSelectedProject(project)}
                          >
                            Project overview
                            <Plus size={15} />
                          </button>
                        )}
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </section>
          <section id="about" className="about-section">
            <div className="shell about-grid">
              <Reveal>
                <Eyebrow number="02">THE PERSON BEHIND THE CODE</Eyebrow>
                <h2>
                  Curious by nature.
                  <br />
                  <em>Builder by choice.</em>
                </h2>
                <div className="about-signature">
                  Jared Callantine <ArrowUpRight size={28} />
                </div>
              </Reveal>
              <Reveal className="about-copy">
                <p className="large-copy">
                  I like the space where good design meets a problem worth
                  solving.
                </p>
                <p>
                  My work spans healthcare websites, mobile apps, internal
                  dashboards, AI tools, and interactive worlds. I care about
                  making complex things feel straightforward—and making the
                  systems underneath hold up.
                </p>
                <p>
                  I hold a bachelor’s degree in Management Information Systems
                  from the University of Alabama and am pursuing a second
                  bachelor’s in Computer Science, expected in December 2028.
                  That mix of business, data, and engineering shapes how I
                  build.
                </p>
                <a
                  className="text-link"
                  href="/Jared_Callantine_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  A little more about me
                  <ArrowUpRight size={17} />
                </a>
              </Reveal>
              <div className="capability-list">
                {[
                  [
                    Layers,
                    "Frontend",
                    "React / Next.js / TypeScript / JavaScript",
                    "Interfaces that feel right.",
                  ],
                  [
                    Code2,
                    "Backend",
                    "ASP.NET Core / Node.js / PHP / C#",
                    "The systems that make it work.",
                  ],
                  [
                    Database,
                    "Data",
                    "PostgreSQL / MySQL / Prisma / Analytics",
                    "Information with a purpose.",
                  ],
                ].map(([Icon, title, stack, copy], i) => (
                  <Reveal key={title}>
                    <div className="capability">
                      <span>0{i + 1}</span>
                      <Icon size={24} />
                      <h3>{title}</h3>
                      <p>{copy}</p>
                      <small>{stack}</small>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
          <section id="experience" className="shell experience-section">
            <Reveal className="section-heading">
              <div>
                <Eyebrow number="03">ALONG THE WAY</Eyebrow>
                <h2>
                  Good work.
                  <br />
                  <em>Good people.</em>
                </h2>
              </div>
              <p>
                Learning by doing, alongside teams
                <br />
                building things that matter.
              </p>
            </Reveal>
            <div className="experience-list">
              {experience.map((job, i) => (
                <Reveal key={job.company}>
                  <article className="experience-item">
                    <button
                      aria-expanded={expanded === i}
                      aria-controls={"experience-" + i}
                      onClick={() => setExpanded(expanded === i ? -1 : i)}
                    >
                      <span className="experience-number">0{i + 1}</span>
                      <span>
                        <strong>{job.company}</strong>
                        <span className="job-role">{job.role}</span>
                      </span>
                      <span className="job-period">{job.period}</span>
                      <span className="expand-icon">
                        {expanded === i ? (
                          <Minus size={18} />
                        ) : (
                          <Plus size={18} />
                        )}
                      </span>
                    </button>
                    <div
                      id={"experience-" + i}
                      hidden={expanded !== i}
                      className="experience-detail"
                    >
                      <span>{job.type}</span>
                      <p>{job.description}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </section>
          <section id="contact" className="contact-section">
            <div className="shell">
              <Reveal>
                <div className="contact-top">
                  <Eyebrow number="04">LET’S MAKE SOMETHING GOOD</Eyebrow>
                  <span>
                    <i className="status-dot" /> OPEN TO CONVERSATIONS
                  </span>
                </div>
                <button className="big-contact" onClick={openContact}>
                  Have something
                  <br />
                  <em>in mind?</em>
                  <ArrowUpRight aria-hidden="true" />
                </button>
                <div className="contact-bottom">
                  <p>
                    A project, a role, or an idea.
                    <br />
                    I’d love to hear about it.
                  </p>
                  <button className="button button-light" onClick={openContact}>
                    Start a conversation
                    <ArrowUpRight size={18} />
                  </button>
                </div>
              </Reveal>
            </div>
          </section>
        </main>
        <footer className="shell site-footer">
          <a href="#top" className="brand" aria-label="Back to top">
            <Brand />
          </a>
          <span>© {new Date().getFullYear()} JARED CALLANTINE</span>
          <div>
            <External href="https://github.com/Jacallantine">GitHub</External>
            <External href="https://www.linkedin.com/in/jared-callantine-06aa15269/">
              LinkedIn
            </External>
            <a href="mailto:jcallantine3@gmail.com">
              Email
              <ArrowUpRight size={15} />
            </a>
          </div>
        </footer>
        <PortfolioDialog
          open={contactOpen}
          title="Contact Jared"
          onClose={() => setContactOpen(false)}
        >
          <Eyebrow number="HELLO">LET’S CONNECT</Eyebrow>
          <h2>
            What are you
            <br />
            <em>thinking about?</em>
          </h2>
          <p className="dialog-intro">
            Send a note. I’ll get back to you as soon as I can.
          </p>
          <form onSubmit={sendMessage} className="contact-form">
            <label>
              Your email
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={sending}
                placeholder="you@example.com"
              />
            </label>
            <label>
              Subject
              <input
                required
                maxLength={200}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                disabled={sending}
                placeholder="A project, opportunity, or hello"
              />
            </label>
            <label>
              Message
              <textarea
                required
                maxLength={10000}
                rows={4}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                disabled={sending}
                placeholder="Tell me a little about it…"
              />
            </label>
            {status === "success" && (
              <p role="status" className="form-success">
                Message sent. Thanks for reaching out!
              </p>
            )}
            {status === "error" && (
              <p role="alert" className="form-error">
                Your message couldn’t be sent. Please try again, or{" "}
                <a href="mailto:jcallantine3@gmail.com">email me directly</a>.
              </p>
            )}
            <button className="button button-dark" disabled={sending}>
              {sending ? "Sending…" : "Send message"}
              <ArrowUpRight size={18} />
            </button>
          </form>
        </PortfolioDialog>
        <PortfolioDialog
          open={Boolean(selectedProject)}
          title={selectedProject?.name || "Project details"}
          onClose={() => setSelectedProject(null)}
        >
          {selectedProject && (
            <>
              <Eyebrow number={selectedProject.number}>
                {selectedProject.type}
              </Eyebrow>
              <h2>{selectedProject.name}</h2>
              <p className="dialog-intro">{selectedProject.description}</p>
              <ul className="project-details">
                {selectedProject.details?.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
              <div className="project-tags">
                {selectedProject.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </>
          )}
        </PortfolioDialog>
      </div>
    </MotionConfig>
  );
}
