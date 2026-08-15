import { useState, useEffect } from "react"
import {
  ArrowLeft, CheckCircle2, Mail, Linkedin, MapPin, Phone,
  ExternalLink, GraduationCap, Briefcase, Award, Languages,
  ChevronRight, Calendar, Sparkles
} from "lucide-react"

const N = "#19244E" // Oiler Navy
const C = "#DB3E8C" // Deep Cerise
const W = "#ffffff"
const S = "#F9FAFB" // Slate off-white
const HAIR = `rgba(25,36,78,0.10)` // hairline border

function MonoTag({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <span
      className="font-sans text-[10px] font-semibold tracking-wider uppercase"
      style={{ color: accent ? C : `${N}CC` }}
    >
      {children}
    </span>
  )
}

function SectionTag({ label }: { num?: string; label: string }) {
  return (
    <div className="mb-8">
      <div className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-2" style={{ color: C }}>
        {label.toUpperCase()}
      </div>
      <h3 className="font-display text-2xl lg:text-3xl font-bold" style={{ color: N }}>
        {label}
      </h3>
      <div className="w-12 h-[2px] mt-3" style={{ backgroundColor: C }} />
    </div>
  )
}

interface Props {
  onBack: () => void
}

export default function AboutMe({ onBack }: Props) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0 })
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="min-h-screen" style={{ backgroundColor: S, fontFamily: "var(--font-sans)", color: N }}>
      
      {/* Sticky header */}
      <div
        className="sticky top-0 z-50 flex items-center justify-between px-8 lg:px-16 py-4 transition-all duration-200"
        style={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.96)" : W,
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: `1px solid ${HAIR}`,
        }}
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 font-sans text-[10px] font-semibold tracking-widest uppercase transition-opacity hover:opacity-60 cursor-pointer"
          style={{ color: N }}
        >
          <ArrowLeft size={12} /> Back to Home
        </button>
        <MonoTag>ADINA FAYZA GAYO · FULL PROFILE & RESUME</MonoTag>
      </div>

      {/* ── HERO BANNER ────────────────────────────────────────────────── */}
      <div className="py-20 lg:py-24 px-8 lg:px-20 text-white relative overflow-hidden" style={{ backgroundColor: N }}>
        {/* Subtle background gradient elements */}
        <div className="absolute right-0 top-0 w-96 h-96 rounded-full filter blur-[120px] opacity-15 pointer-events-none" style={{ background: `linear-gradient(135deg, ${C} 0%, #3B82F6 100%)` }} />
        
        <div className="max-w-[900px] relative z-10">
          <p className="font-sans text-[10px] font-semibold tracking-[0.25em] mb-4 uppercase" style={{ color: C }}>
            Senior Product Designer · System Logic Architect
          </p>
          <h1 className="font-display font-light text-4xl lg:text-6xl leading-[1.05] tracking-tight mb-8">
            Adina Fayza Gayo
          </h1>
          <p className="text-base lg:text-lg font-sans font-light leading-relaxed text-white/80 max-w-[780px] mb-8">
            Product Designer with 4+ years of experience building user-centered digital products across fintech, insurance, e-commerce, and healthcare. Proven track record shipping 20+ features through user research, design systems, and cross-functional collaboration. Specialized in multi-brand architecture and AI-assisted rapid prototyping.
          </p>
          
          {/* Metadata Grid */}
          <div className="flex flex-wrap gap-y-3 gap-x-6 pt-6 border-t border-white/10 text-xs font-sans text-white/70">
            <span className="flex items-center gap-1.5">
              <MapPin size={13} className="text-[#DB3E8C]" /> Jakarta, Indonesia
            </span>
            <a href="tel:+6289630441118" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone size={13} className="text-[#DB3E8C]" /> +62 896 3044 1118
            </a>
            <a href="mailto:adinagayo@gmail.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail size={13} className="text-[#DB3E8C]" /> adinagayo@gmail.com
            </a>
            <a href="https://www.linkedin.com/in/adinafayzagayo/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Linkedin size={13} className="text-[#DB3E8C]" /> LinkedIn
            </a>
            <a href="https://dinaworks.framer.website/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <ExternalLink size={13} className="text-[#DB3E8C]" /> Portfolio Website
            </a>
          </div>
        </div>
      </div>

      {/* ── WORK EXPERIENCE ────────────────────────────────────────────── */}
      <div className="py-20 px-8 lg:px-20 bg-white" style={{ borderBottom: `1px solid ${HAIR}` }}>
        <div className="max-w-[900px] mx-auto">
          <SectionTag label="Work Experience" />
          
          <div className="mt-12 space-y-16 relative border-l border-gray-100 pl-6 lg:pl-10 ml-2">
            {[
              {
                role: "Product Designer",
                company: "Deptech Digital Indonesia",
                location: "Jakarta",
                duration: "Jun 2023 - Present",
                desc: "Led product design for insurance technology platform (since June 2024) and cross-sector digital products as solo designer, balancing user impact with technical feasibility across 3-4 concurrent projects. Product Portfolio: Progressive Web Apps (PWA), mobile apps (iOS/Android), responsive platforms, admin dashboards, POS systems. Technical Integration: Payment APIs (Xendit, Midtrans, OY!, JomPay), insurance systems, and health devices.",
                points: [
                  "Delivered 26+ digital products (~10 projects annually), including 17+ live white-label insurance portals for enterprise B2B partnerships and 6 cross-sector projects spanning FMCG, finance, government, healthcare, and crypto.",
                  "Built multi-brand design system from scratch serving 16 active implementations, reducing brand adaptation through systematic component architecture while working within Figma Free constraints, enabling consistent user experience and rapid partner onboarding.",
                  "Designed national-scale election monitoring PWA for 2,000+ users across 38 provinces processing 820,000+ polling stations during critical 48-hour window, optimizing data-entry workflows for non-technical field operators and achieving 90% immediate adoption.",
                  "Led insurance purchase flow design integrated with leading Malaysian eWallet (20M+ users), partnering with cross-border engineering teams (daily sync) on API integration to ensure seamless user experience and technical feasibility across merged platforms.",
                  "Redesigned FMCG loyalty platform for global nutrition brand serving 30+ field representatives, identifying critical password reset flow gap and designing digital UI integrated with physical health-measurement hardware for streamlined nationwide event data collection.",
                  "Enabled rapid partner acquisition through design-first approach, delivering landing pages in 2-3 hours and complex portals in 2-5 days with high-fidelity prototypes using real user data, serving as key competitive differentiator.",
                  "Collaborated in user research and usability testing to validate design solutions, maintaining 1-3 developer discussion rounds through detailed technical documentation and close engineering partnerships.",
                  "Collaborated with cross-functional teams of 5-18+ members (13+ developers, 3 QAs, PMs, business analysts, data analysts) serving Indonesian and Malaysian markets, managing concurrent project timelines and stakeholder expectations."
                ]
              },
              {
                role: "Freelance UI/UX Designer",
                company: "Remote anywhere",
                location: "Remote",
                duration: "May 2023 - Present",
                desc: "Partnered with startups and SMBs to design and ship digital products from concept to launch across healthcare, legal, and e-commerce sectors.",
                points: [
                  "Reduced project delivery by 70% (from 1-2 weeks to 2-3 days) through AI-assisted workflow integrating Claude/Gemini for research synthesis and Figma Make/Antigravity for rapid prototyping, creating 3 fully functional portals as live interactive prototypes for faster validation.",
                  "Designed legal consulting marketplace with lawyer discovery, order management, and real-time chat, optimizing user journey through user interviews while collaborating with engineers on technical implementation.",
                  "Built therapy center management system with staff/student tracking and scheduling, reducing administrative overhead through workflow optimization and user-centered design.",
                  "Created interactive multi-screen system for LED displays and mobile sync in 2 days, demonstrating rapid adaptation to non-traditional interface design challenges.",
                  "Optimized e-commerce checkout experiences through iterative testing and conversion funnel analysis, streamlining purchase completion flows."
                ]
              },
              {
                role: "UI/UX Designer",
                company: "Reka Cipta Digital",
                location: "Jakarta",
                duration: "Aug 2021 - May 2023",
                desc: "Software house specializing in website and application development. Tools: Figma, No-Code Software, Infinity, Taskade, Adobe Suites, WordPress, Google Suites.",
                points: [
                  "Led daily standups with product and engineering teams, conducting user research to inform strategy and creating wireframes, user flows, and interactive prototypes through iterative process.",
                  "Designed and A/B tested landing page variations to optimize conversion rates and user engagement, collaborating with engineers on technical implementation.",
                  "Produced UX design solutions and mockups through wireframes, visual designs, flow diagrams, and interactive prototypes, with design rationale documentation for front-end implementation.",
                  "Built responsive design systems in Figma using auto-layout, variants, and components, improving design consistency and development handoff efficiency."
                ]
              },
              {
                role: "Graphic Designer",
                company: "Badan Amil Zakat Nasional (BAZNAS)",
                location: "Jakarta",
                duration: "Apr 2020 - Dec 2021",
                desc: "National philanthropic organization managing zakat, infaq, and alms (ZIS) at the national level.",
                points: [
                  "Led team of 3 designers delivering 20+ design requests weekly for national organization.",
                  "Coordinated with nationwide branches to maintain brand consistency across channels.",
                  "Trained and onboarded new team members, establishing workflows and quality standards."
                ]
              }
            ].map((work) => (
              <div key={work.company + work.duration} className="relative group">
                {/* Timeline Dot */}
                <div
                  className="absolute -left-[31px] lg:-left-[45px] top-1.5 w-3 h-3 rounded-full border-2 border-white transition-colors duration-200 group-hover:bg-[#DB3E8C]"
                  style={{ backgroundColor: N }}
                />
                
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                  <span className="font-sans text-[10px] font-semibold tracking-wider uppercase" style={{ color: C }}>
                    {work.duration}
                  </span>
                  <span className="font-sans text-[10px] text-gray-400 font-medium">
                    {work.location}
                  </span>
                </div>
                
                <h4 className="font-display text-xl font-bold" style={{ color: N }}>
                  {work.role} <span className="font-sans text-sm font-normal text-gray-400">at {work.company}</span>
                </h4>
                
                <p className="font-sans text-xs leading-relaxed my-4 text-[#19244E]/80">
                  {work.desc}
                </p>
                
                <ul className="space-y-3 pl-1">
                  {work.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2.5 font-sans text-xs leading-relaxed text-[#19244E]/75">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#DB3E8C] flex-shrink-0 mt-1.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── EDUCATION ──────────────────────────────────────────────────── */}
      <div className="py-20 px-8 lg:px-20 bg-white" style={{ borderBottom: `1px solid ${HAIR}` }}>
        <div className="max-w-[900px] mx-auto">
          <SectionTag label="Education Level" />
          
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            {[
              {
                school: "Institut Teknologi Sepuluh Nopember",
                location: "Surabaya (Online learning)",
                degree: "Master of Technology Management",
                specialization: "Design Innovation Management",
                gpa: "3.85/4.00",
                duration: "Feb 2025 - Jul 2026 (Expected)",
                thesis: "Developing design documentation framework for solo designers managing multi-brand products, focusing on design decision tracking and knowledge transfer.",
                coursework: ["Design Thinking", "Design Management", "Strategic Brand Management", "UX Design", "Project Management", "Business Statistics"]
              },
              {
                school: "Universitas Multimedia Nusantara",
                location: "Gading Serpong",
                degree: "Bachelor of Interactive Design",
                specialization: "Human-Computer Interaction & UI/UX",
                gpa: "3.55/4.00",
                duration: "Aug 2017 - Jan 2021",
                thesis: "Interactive card game for children with dyslexia (researched, designed, and prototyped). Learned HCI, interactivity, interface design, and design methods.",
                coursework: ["HCI", "Interactivity", "Interface Design", "Design Methods"]
              }
            ].map((edu) => (
              <div key={edu.school} className="p-6 rounded-xl border border-gray-100 flex flex-col justify-between" style={{ backgroundColor: S }}>
                <div>
                  <div className="flex items-center justify-between text-[10px] font-semibold text-[#DB3E8C] mb-3">
                    <span>{edu.duration}</span>
                    <span>GPA: {edu.gpa}</span>
                  </div>
                  <h4 className="font-display text-lg font-bold mb-1" style={{ color: N }}>
                    {edu.school}
                  </h4>
                  <p className="font-sans text-[11px] text-gray-500 mb-4">{edu.location}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div>
                      <span className="block font-sans text-[8px] font-bold tracking-wider uppercase text-gray-400">Degree & Focus</span>
                      <span className="font-sans text-xs font-semibold text-[#19244E]">{edu.degree} — {edu.specialization}</span>
                    </div>
                    <div>
                      <span className="block font-sans text-[8px] font-bold tracking-wider uppercase text-gray-400">Final Thesis / Project Focus</span>
                      <p className="font-sans text-[11px] leading-relaxed text-[#19244E]/80 mt-0.5">{edu.thesis}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200/50">
                  <span className="block font-sans text-[8px] font-bold tracking-wider uppercase text-gray-400 mb-2">Key Coursework</span>
                  <div className="flex flex-wrap gap-1.5">
                    {edu.coursework.map((course) => (
                      <span key={course} className="font-sans text-[9px] px-2 py-0.5 rounded bg-white text-[#19244E]/80 border border-gray-100">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SKILLS, ACHIEVEMENTS & OTHER EXPERIENCE ────────────────────── */}
      <div className="py-20 px-8 lg:px-20" style={{ borderBottom: `1px solid ${HAIR}` }}>
        <div className="max-w-[900px] mx-auto grid lg:grid-cols-[280px_1fr] gap-12">
          <div>
            <SectionTag label="Skills & Toolkit" />
            <p className="font-sans text-xs leading-relaxed mt-4" style={{ color: `${N}99` }}>
              Synthesizing UX design frameworks, technical engineering constraints, and rapid prototyping workflows to build scalable digital ecosystems.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Design Tools & Prototyping",
                skills: [
                  "Figma, Framer",
                  "Adobe Illustrator, Photoshop",
                  "Adobe Premiere, After Effects",
                  "Canva, Capcut",
                  "Wireframing & Mockups",
                  "User Flows & Journey Mapping",
                  "Interactive Prototyping",
                  "MVP & UAT",
                  "Design Rationale Documentation"
                ]
              },
              {
                title: "Approach & Research Methods",
                skills: [
                  "Design Thinking",
                  "User Testing & Usability Testing",
                  "Data-driven Design",
                  "User Experience Optimization",
                  "Business Model Analysis",
                  "Front-end Collaboration",
                  "Design Systems Architecture",
                  "User Research & System Analysis",
                  "Excel, Tableau, LINGO"
                ]
              },
              {
                title: "Certifications & Education Focus",
                skills: [
                  "Adobe Certified Associate (Illustrator)",
                  "UI/UX Bootcamp (Purwadhika, 2021)",
                  "IDF User Experience Foundation (2023)",
                  "Full Stack Integration (Skill Academy, 2024)"
                ]
              },
              {
                title: "Languages & Communication",
                skills: [
                  "Indonesian (Native)",
                  "English (TOEFL 550, British Council 570)",
                  "Korean (Beginner)"
                ]
              }
            ].map(({ title, skills }) => (
              <div key={title} className="p-6 rounded-lg bg-white border border-gray-100">
                <h4 className="font-sans text-xs font-bold tracking-wider uppercase mb-4" style={{ color: C }}>
                  {title}
                </h4>
                <ul className="space-y-2">
                  {skills.map((skill) => (
                    <li key={skill} className="flex items-center gap-2 font-sans text-xs" style={{ color: `${N}CC` }}>
                      <CheckCircle2 size={12} style={{ color: C }} /> {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PERSONAL: IN LIFE ───────────────────────────────────────────── */}
      <div className="py-20 px-8 lg:px-20 bg-white" style={{ borderBottom: `1px solid ${HAIR}` }}>
        <div className="max-w-[800px] mx-auto text-center">
          <SectionTag label="In Life" />
          
          <p className="text-base font-sans font-light leading-relaxed max-w-[620px] mx-auto mt-6" style={{ color: `${N}CC` }}>
            Off the clock, I am the definition of "chaotic good with a color-coded spreadsheet." I use my design and engineering mindset to organize daily human experiences, eliminating friction wherever possible.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 mt-10">
            {[
              { title: "Matcha Lover", desc: "Searching for the absolute best matcha lattes in every city, logged and rated." },
              { title: "Spreadsheet Geek", desc: "Crafting color-coded itineraries 3 weeks in advance with cafe backups." },
              { title: "Ramen Enthusiast", desc: "Obsessed with finding the ultimate hot bowl of ramen at 11 PM." }
            ].map(({ title, desc }) => (
              <div key={title} className="p-6 rounded-lg bg-[#F9FAFB] border border-gray-100 text-left">
                <h4 className="font-sans text-xs font-bold tracking-wider uppercase mb-2" style={{ color: C }}>
                  {title}
                </h4>
                <p className="font-sans text-xs leading-relaxed" style={{ color: `${N}99` }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FOOTER CTA ────────────────────────────────────────────────── */}
      <div className="py-16 px-8 lg:px-20 text-center" style={{ backgroundColor: N, borderTop: `1px solid rgba(255,255,255,0.06)` }}>
        <p className="font-sans text-[10px] font-semibold tracking-[0.2em] text-white/50 uppercase mb-4">
          Want to design something together?
        </p>
        <a
          href="mailto:adinagayo@gmail.com"
          className="font-display font-light text-2xl lg:text-3xl text-white hover:text-[#DB3E8C] transition-colors"
        >
          adinagayo@gmail.com
        </a>
        
        <div className="mt-8 flex justify-center">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-widest text-white/80 border border-white/10 hover:border-white/30 rounded uppercase transition-colors cursor-pointer"
          >
            <ArrowLeft size={12} /> Back to Home
          </button>
        </div>
      </div>

    </div>
  )
}
