"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink, Code, Database, Layout } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
export default function Home() {

  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [toggleEmail, setToggleEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null


  const handleEmailDiv = ()=>{
    setToggleEmail(!toggleEmail);
    // Reset form and status when closing
    if (toggleEmail) {
      setSubmitStatus(null);
    }
  }
  const handleEmail = (e) =>{
    setEmail(e.target.value);
  }
   const handleSubject = (e) =>{
    setSubject(e.target.value);
  }
   const handleBody = (e) =>{
    setBody(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, subject, body }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        // Clear form
        setEmail('');
        setSubject('');
        setBody('');
        // Close modal after 2 seconds
        setTimeout(() => {
          setToggleEmail(false);
          setSubmitStatus(null);
        }, 2000);
      } else {
        setSubmitStatus('error');
        console.error('Error:', data.error);
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Failed to send email:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-xl font-semibold">JC</span>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#about" className="hover:text-blue-600 transition">About</a>
            <a href="#experience" className="hover:text-blue-600 transition">Experience</a>
            <a href="#projects" className="hover:text-blue-600 transition">Projects</a>
            <a href="#contact" className="hover:text-blue-600 transition">Contact</a>
          
  
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Jared Callantine
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-4">
              Full-Stack Developer
            </p>
            <p className="text-lg text-gray-600 max-w-2xl mb-8 leading-relaxed">
              Building efficient, scalable web applications with modern technologies. 
              Specializing in Next.js, ASP.NET, and database architecture.
            </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-12 w-full max-w-xl">
  
  <button
    onClick={handleEmailDiv}
    className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium text-center"
  >
    Get In Touch
  </button>

  <a 
    href="#projects"
    className="flex-1 border border-gray-300 px-6 py-3 rounded-lg hover:border-gray-400 transition font-medium text-center"
  >
    View Work
  </a>

  <a 
    href="/Jared Callantine (7).pdf"
    target="_blank"
    rel="noopener noreferrer"
    className="md:whitespace-nowrap flex-1 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition font-medium text-center"
  >
    Download Resume
  </a>

</div>

            <div className="flex gap-5">
              <a href="https://github.com/Jacallantine" target="_blank" className="text-gray-600 hover:text-gray-900 transition">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/jared-callantine-06aa15269/" target="_blank" className="text-gray-600 hover:text-gray-900 transition">
                <Linkedin className="w-5 h-5" />
              </a>
              <button onClick={handleEmailDiv} className="text-gray-600 hover:text-gray-900 transition">
                <Mail className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-8">About</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <p className="text-gray-700 leading-relaxed mb-6">
                  I'm a Management Information Systems major at the University of Alabama (Continuing my education into Computer Science)
                  with a passion for creating impactful web applications. My focus lies in 
                  building seamless user experiences backed by robust server-side architecture.
      
                </p>
                <p className="text-gray-700 leading-relaxed">
                  I thrive on solving complex problems and continuously expanding my technical 
                  expertise across the full development stack.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide text-gray-500">Technical Skills</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Layout className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Frontend</p>
                      <p className="text-sm text-gray-600">React, Next.js, TypeScript, JavaScript</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Code className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Backend</p>
                      <p className="text-sm text-gray-600">PHP, ASP.NET Core, Node.js, C#</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Database className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Database</p>
                      <p className="text-sm text-gray-600">MySQL, Postgres, Prisma, Entity Framework</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">Experience</h2>
          <div className="space-y-12">
            {[
              {
                company: "FastHealth Corporation",
                role: "Full Stack Web Developer",
                period: "Feb 2025 – Present (Part time)",
                desc: "Create ADA-compliant websites alongside a UI/UX and responsive design.",
              },
              {
                company: "Embrace Alabama Kids",
                role: "Data Analyst / Full Stack Web Developer",
                period: "Aug 2025 – Present (Part time)",
                desc: "Develop internal dashboards and data visualizations for executives, and build a web platform enabling the vice president to easily access and interpret key analytics.",
              },
              {
                company: "The Nine",
                role: "Front-End Web Developer",
                period: "Aug 2024 – Dec 2024",
                desc: "Develop pixel perfect website alongside a UI/UX and responsive design ",
              },
            ].map((job, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="border-l-2 border-blue-600 pl-6"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                  <h3 className="text-xl font-semibold">{job.role}</h3>
                  <span className="text-sm text-gray-500">{job.period}</span>
                </div>
                <p className="text-gray-600 font-medium mb-3">{job.company}</p>
                <p className="text-gray-700 leading-relaxed">{job.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">Websites</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Embrace Chore App",
                desc: "Weekly rotating Chore app for scholars at Embrace Alabama Kids",
                tags: ["Next.js", "JS", "CSS", "Prisma", "PostgreSQL"],
                href : "https://embracechoreapp.vercel.app/dashboard"
              },
              {
                name: "Neil J RedField",
                desc: "Hospital website created while working at FastHealth Corporation",
                tags: ["PHP", "JS", "CSS"],
                href : "https://www.oneidacountyhospital.com/"

              },
              {
                name: "Glam Salon",
                desc: "Hair salon website created while interning at The Nine",
                tags: ["JS", "JQuery", "CSS"],
                href : "https://www.glamsalonandblowdrybar.com/"

              },
              {
                name: "Horn Memorial Hospital",
                desc: "Hospital website created while working at FastHealth Corporation",
                tags: ["PHP", "JS", "CSS"],
                href : "https://www.hornmemorialhospital.org/"
              },
            ].map((proj, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition"
              >
                <Link href={proj.href}>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold">{proj.name}</h3>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">{proj.desc}</p>
                <div className="flex flex-wrap gap-2 mt-auto absolute bottom-[10px]">
                  {proj.tags.map((tag, j) => (
                    <span key={j} className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div></Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6">Let's Work Together</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              I'm currently open to new opportunities and collaborations. 
              Whether you have a project in mind or just want to connect, feel free to reach out.
            </p>
            <button
              onClick={handleEmailDiv}
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Send Message
            </button>
          </motion.div>
        </div>
      </section>
      <AnimatePresence mode="wait">
        {toggleEmail && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={handleEmailDiv}
            />
            
            {/* Modal */}
            <motion.div
              key="modal"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0, scale: 0.95, y: 20 },
                visible: { opacity: 1, scale: 1, y: 0 },
                exit: { opacity: 0, scale: 0.95, y: 20 }
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="px-2 email-modal fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full md:max-w-md max-w-[400px] md:mx-4"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-8 relative">
                {/* Close Button */}
                <button 
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100" 
                  onClick={handleEmailDiv}
                  aria-label="Close modal"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Header */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Send a Message</h2>
                  <p className="text-sm text-gray-600">I'll get back to you as soon as possible!</p>
                </div>

                {/* Form */}
                <form className="space-y-5" onSubmit={handleSubmit}>
                  {/* Email Input */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Email
                    </label>
                    <input 
                      id="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-900" 
                      type="email" 
                      name="to" 
                      placeholder="you@example.com"
                      value={email} 
                      onChange={handleEmail}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Subject Input */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <input 
                      id="subject"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-900" 
                      type="text" 
                      name="subject" 
                      placeholder="What's this about?"
                      value={subject} 
                      onChange={handleSubject}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Message Input */}
                  <div>
                    <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea 
                      id="body"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-900 resize-none" 
                      name="body" 
                      placeholder="Tell me about your project..."
                      value={body} 
                      onChange={handleBody}
                      rows="4"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <div className="bg-green-50 text-green-800 px-4 py-3 rounded-lg text-sm">
                      ✓ Message sent successfully! I'll get back to you soon.
                    </div>
                  )}
                  {submitStatus === 'error' && (
                    <div className="bg-red-50 text-red-800 px-4 py-3 rounded-lg text-sm">
                      ✗ Failed to send message. Please try again or email me directly.
                    </div>
                  )}

                  {/* Submit Button */}
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <p>© 2025 Jared Callantine. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="https://github.com/Jacallantine" className="hover:text-gray-900 transition">GitHub</a>
            <a href="https://www.linkedin.com/in/jared-callantine-06aa15269/" className="hover:text-gray-900 transition">LinkedIn</a>
            <a href="mailto:jcallantine3@gmail.com" className="hover:text-gray-900 transition">Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
}