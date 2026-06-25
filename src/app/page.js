"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  Database,
  Github,
  GraduationCap,
  Layout,
  Linkedin,
  Mail,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const skills = [
  {
    icon: Layout,
    title: "Frontend",
    description: "React, Next.js, TypeScript, JavaScript, responsive UI",
  },
  {
    icon: Code2,
    title: "Backend",
    description: "PHP, ASP.NET Core, Node.js, C#, API development",
  },
  {
    icon: Database,
    title: "Data",
    description: "MySQL, PostgreSQL, Prisma, Entity Framework, analytics",
  },
];

const experience = [
  {
    company: "FastHealth Corporation",
    role: "Full Stack Web Developer",
    period: "Feb 2025 - Present",
    type: "Part time",
    desc: "Build ADA-compliant hospital websites with responsive interfaces, practical content structure, and production-ready implementation.",
  },
  {
    company: "Embrace Alabama Kids",
    role: "Data Analyst / Full Stack Web Developer",
    period: "Aug 2025 - Present",
    type: "Part time",
    desc: "Develop internal dashboards, data visualizations, and web tools that help leadership access and understand key analytics.",
  },
  {
    company: "The Nine",
    role: "Front-End Web Developer",
    period: "Aug 2024 - Dec 2024",
    type: "Internship",
    desc: "Translated design direction into responsive, polished web pages with close attention to UI details and client-facing quality.",
  },
];

const projects = [
  {
    name: "Incursion",
    desc: "Roblox game project focused on immersive gameplay systems, interactive world design, and polished player-facing UI.",
    tags: ["Roblox Studio", "Luau", "Game Systems", "UI Design"],
    featured: true,
  },
  {
    name: "FastHealth CMS Redesign",
    desc: "CMS redesign work for FastHealth Corporation focused on cleaner editing workflows, stronger usability, and a more maintainable admin experience.",
    tags: ["CMS", "UX Design", "Responsive UI", "Healthcare"],
  },
  {
    name: "Embrace Chore App",
    desc: "Weekly rotating chore platform for scholars at Embrace Alabama Kids.",
    tags: ["Next.js", "JavaScript", "CSS", "Prisma", "PostgreSQL"],
    href: "https://embracechoreapp.vercel.app/dashboard",
  },
  {
    name: "Neil J. Redfield Memorial Hospital",
    desc: "Hospital website created while working at FastHealth Corporation.",
    tags: ["PHP", "JavaScript", "CSS"],
    href: "https://www.oneidacountyhospital.com/",
  },
  {
    name: "Glam Salon",
    desc: "Hair salon website created while interning at The Nine.",
    tags: ["JavaScript", "jQuery", "CSS"],
    href: "https://www.glamsalonandblowdrybar.com/",
  },
  {
    name: "Horn Memorial Hospital",
    desc: "Hospital website created while working at FastHealth Corporation.",
    tags: ["PHP", "JavaScript", "CSS"],
    href: "https://www.hornmemorialhospital.org/",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.09,
    },
  },
};

export default function Home() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [toggleEmail, setToggleEmail] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleEmailDiv = () => {
    setToggleEmail((open) => {
      if (open) {
        setSubmitStatus(null);
      }
      return !open;
    });
    setMobileNavOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, subject, body }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setEmail("");
        setSubject("");
        setBody("");
        setTimeout(() => {
          setToggleEmail(false);
          setSubmitStatus(null);
        }, 2000);
      } else {
        setSubmitStatus("error");
        console.error("Error:", data.error);
      }
    } catch (error) {
      setSubmitStatus("error");
      console.error("Failed to send email:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeMobileNav = () => setMobileNavOpen(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f8fbff] text-slate-950">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.14),transparent_34%),radial-gradient(circle_at_80%_10%,rgba(14,165,233,0.12),transparent_30%),linear-gradient(180deg,#ffffff_0%,#f8fbff_46%,#eef6ff_100%)]" />

      <nav className="fixed top-0 z-50 w-full border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-6">
          <a
            href="#top"
            className="group flex items-center gap-3"
            onClick={closeMobileNav}
            aria-label="Jared Callantine home"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-950 text-sm font-bold text-white shadow-sm transition group-hover:-translate-y-0.5">
              JC
            </span>
            <span className="hidden text-sm font-semibold text-slate-700 sm:block">
              Jared Callantine
            </span>
          </a>

          <div className="hidden items-center gap-1 rounded-full border border-slate-200 bg-white/80 p-1 text-sm font-medium text-slate-600 shadow-sm md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 transition hover:bg-blue-50 hover:text-blue-700"
              >
                {item.label}
              </a>
            ))}
          </div>

          <button
            onClick={handleEmailDiv}
            className="hidden rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 md:inline-flex"
          >
            Let&apos;s Talk
          </button>

          <button
            type="button"
            onClick={() => setMobileNavOpen((open) => !open)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-800 shadow-sm md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileNavOpen}
          >
            {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileNavOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="border-t border-slate-200 bg-white px-5 py-4 shadow-xl md:hidden"
            >
              <div className="mx-auto flex max-w-6xl flex-col gap-2">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={closeMobileNav}
                    className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
                  >
                    {item.label}
                  </a>
                ))}
                <button
                  onClick={handleEmailDiv}
                  className="mt-2 rounded-xl bg-blue-600 px-4 py-3 text-left text-sm font-semibold text-white"
                >
                  Send Message
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main id="top">
        <section className="px-5 pb-16 pt-28 sm:pb-20 sm:pt-32 md:px-6 lg:pb-28">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="max-w-3xl"
            >
              <motion.div
                variants={fadeUp}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm"
              >
                Full-stack developer based in Alabama
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-balance text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl"
              >
                Building polished web apps that turn messy ideas into useful products.
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl"
              >
                I&apos;m Jared Callantine, a full-stack developer focused on Next.js,
                ASP.NET, accessible interfaces, and data-backed tools that people
                can actually use.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
              >
                <button
                  onClick={handleEmailDiv}
                  className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
                >
                  Get In Touch
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </button>
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700"
                >
                  View Work
                </a>
                <a
                  href="/Jared Callantine (7).pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-6 py-3.5 font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800"
                >
                  Resume
                </a>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-9 flex items-center gap-4">
                <a
                  href="https://github.com/Jacallantine"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:text-slate-950"
                  aria-label="GitHub profile"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/jared-callantine-06aa15269/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:text-slate-950"
                  aria-label="LinkedIn profile"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <button
                  onClick={handleEmailDiv}
                  className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:text-slate-950"
                  aria-label="Open contact form"
                >
                  <Mail className="h-5 w-5" />
                </button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.15 }}
              className="relative"
            >
              <div className="absolute -inset-4 rounded-[2rem] bg-blue-100/70 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-blue-950/10">
                <div className="rounded-3xl bg-slate-950 p-5 text-white">
                  <div className="mb-8 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-200">Current focus</p>
                      <p className="mt-1 text-xl font-semibold">Full-stack web development</p>
                    </div>
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-500/20 text-blue-100">
                      <Code2 className="h-6 w-6" />
                    </div>
                  </div>

                  <div className="grid gap-3">
                    {[
                      "Accessible hospital websites",
                      "Executive analytics dashboards",
                      "Next.js and ASP.NET applications",
                    ].map((item, index) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.45, delay: 0.45 + index * 0.1 }}
                        className="rounded-2xl border border-white/10 bg-white/[0.08] p-4"
                      >
                        <div className="flex items-center gap-3">
                          <span className="h-2.5 w-2.5 rounded-full bg-blue-300" />
                          <p className="text-sm font-medium text-slate-100">{item}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                  {[
                    ["4", "Featured projects"],
                    ["3", "Active roles"],
                    ["100%", "Responsive focus"],
                  ].map(([value, label]) => (
                    <div key={label} className="rounded-2xl bg-blue-50 p-4">
                      <p className="text-2xl font-bold text-blue-700">{value}</p>
                      <p className="mt-1 text-xs font-medium leading-4 text-slate-600">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="about" className="px-5 py-16 md:px-6 md:py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={stagger}
            className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr]"
          >
            <motion.div variants={fadeUp}>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-blue-700">
                About
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Practical engineering with a design-minded edge.
              </h2>
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-6">
              <p className="text-lg leading-8 text-slate-600">
                I&apos;m a Management Information Systems major at the University of
                Alabama continuing my education into Computer Science. I enjoy
                creating web applications that combine clear user experiences with
                reliable server-side architecture.
              </p>
              <p className="text-lg leading-8 text-slate-600">
                My work spans healthcare websites, internal dashboards, and tools
                that make operations easier for teams. I like solving the practical
                problems that sit between design, data, and implementation.
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                {skills.map((skill) => {
                  const Icon = skill.icon;
                  return (
                    <div
                      key={skill.title}
                      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-950/5"
                    >
                      <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-blue-50 text-blue-700">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-semibold text-slate-950">{skill.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {skill.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </section>

        <section id="experience" className="bg-white px-5 py-16 md:px-6 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-blue-700">
                  Experience
                </p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                  Recent roles and impact.
                </h2>
              </div>
              <p className="max-w-xl text-slate-600">
                A mix of full-stack implementation, front-end polish, analytics,
                and production websites for real organizations.
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-4 top-4 hidden h-[calc(100%-2rem)] w-px bg-slate-200 md:block" />
              <div className="space-y-5">
                {experience.map((job, index) => (
                  <motion.article
                    key={`${job.company}-${job.role}`}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.45, delay: index * 0.08 }}
                    className="relative rounded-3xl border border-slate-200 bg-[#f8fbff] p-6 shadow-sm md:ml-12"
                  >
                    <span className="absolute -left-[3.35rem] top-8 hidden h-8 w-8 rounded-full border-4 border-white bg-blue-600 shadow-sm md:block" />
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-700">
                          <BriefcaseBusiness className="h-3.5 w-3.5" />
                          {job.type}
                        </div>
                        <h3 className="text-xl font-bold text-slate-950">{job.role}</h3>
                        <p className="mt-1 font-semibold text-slate-600">{job.company}</p>
                      </div>
                      <p className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm">
                        {job.period}
                      </p>
                    </div>
                    <p className="mt-5 max-w-3xl leading-7 text-slate-600">{job.desc}</p>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="px-5 py-16 md:px-6 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-blue-700">
                  Projects
                </p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                  Websites and tools.
                </h2>
              </div>
              <a
                href="https://github.com/Jacallantine"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:text-blue-700"
              >
                GitHub Profile
                <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={stagger}
              className="grid gap-5 md:grid-cols-2"
            >
              {projects.map((proj) => (
                <ProjectCard key={proj.name} project={proj} />
              ))}
            </motion.div>
          </div>
        </section>

        <section id="contact" className="bg-slate-950 px-5 py-16 text-white md:px-6 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55 }}
            className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[1fr_auto]"
          >
            <div>
              <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100">
                <GraduationCap className="h-4 w-4" />
                Open to opportunities and collaborations
              </p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
                Have a project, role, or idea worth building?
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                Send a note and I&apos;ll get back to you as soon as possible.
              </p>
            </div>
            <button
              onClick={handleEmailDiv}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-7 py-4 font-bold text-slate-950 shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-50"
            >
              Send Message
              <Mail className="h-4 w-4" />
            </button>
          </motion.div>
        </section>
      </main>

      <AnimatePresence mode="wait">
        {toggleEmail && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] bg-slate-950/60 backdrop-blur-sm"
              onClick={handleEmailDiv}
            />

            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 24 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed left-1/2 top-1/2 z-[70] w-[calc(100%-1.5rem)] max-w-lg -translate-x-1/2 -translate-y-1/2"
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-modal-title"
            >
              <div className="max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl shadow-slate-950/25 sm:p-8">
                <button
                  className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  onClick={handleEmailDiv}
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="mb-7 pr-12">
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
                    Contact
                  </p>
                  <h2 id="contact-modal-title" className="mt-2 text-2xl font-bold text-slate-950">
                    Send a message
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Tell me what you&apos;re working on and I&apos;ll follow up soon.
                  </p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">
                      Your Email
                    </label>
                    <input
                      id="email"
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      type="email"
                      name="to"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="mb-2 block text-sm font-semibold text-slate-700">
                      Subject
                    </label>
                    <input
                      id="subject"
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      type="text"
                      name="subject"
                      placeholder="What's this about?"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label htmlFor="body" className="mb-2 block text-sm font-semibold text-slate-700">
                      Message
                    </label>
                    <textarea
                      id="body"
                      className="min-h-32 w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      name="body"
                      placeholder="Tell me about your project..."
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      rows="4"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  {submitStatus === "success" && (
                    <div className="rounded-2xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-800">
                      Message sent successfully. I&apos;ll get back to you soon.
                    </div>
                  )}
                  {submitStatus === "error" && (
                    <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
                      Failed to send message. Please try again or email me directly.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-2xl bg-blue-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <footer className="border-t border-slate-200 bg-white px-5 py-8 md:px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm font-medium text-slate-600 md:flex-row md:items-center md:justify-between">
          <p>Copyright 2026 Jared Callantine. All rights reserved.</p>
          <div className="flex flex-wrap gap-5">
            <a
              href="https://github.com/Jacallantine"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-slate-950"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/jared-callantine-06aa15269/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-slate-950"
            >
              LinkedIn
            </a>
            <a href="mailto:jcallantine3@gmail.com" className="transition hover:text-slate-950">
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ExternalLinkIcon() {
  return (
    <div className="grid h-10 w-10 place-items-center rounded-full bg-blue-50 text-blue-700 transition group-hover:bg-blue-100">
      <ArrowUpRight className="h-4 w-4" />
    </div>
  );
}

function ProjectCard({ project }) {
  const className = `group flex min-h-[250px] flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-950/[0.08] ${
    project.featured ? "md:col-span-2" : ""
  }`;

  const content = (
    <>
      <div>
        <div className="mb-8 flex items-start justify-between gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-slate-950 text-white transition group-hover:bg-blue-600">
            {project.href ? (
              <ArrowUpRight className="h-5 w-5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            ) : (
              <Code2 className="h-5 w-5" />
            )}
          </div>
          {project.featured && (
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-700">
              Top Project
            </span>
          )}
          {project.href && <ExternalLinkIcon />}
        </div>
        <h3 className="text-2xl font-bold text-slate-950">{project.name}</h3>
        <p className="mt-3 max-w-3xl leading-7 text-slate-600">{project.desc}</p>
      </div>
      <div className="mt-8 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"
          >
            {tag}
          </span>
        ))}
      </div>
    </>
  );

  if (project.href) {
    return (
      <motion.a
        variants={fadeUp}
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.article variants={fadeUp} className={className}>
      {content}
    </motion.article>
  );
}
