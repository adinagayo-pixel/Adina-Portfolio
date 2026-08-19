import { useState, useEffect } from "react"
import {
  ArrowLeft, CheckCircle2, Mail, Linkedin, MapPin, Phone,
  ExternalLink, GraduationCap, Briefcase, Award, Languages,
  ChevronRight, Calendar, Sparkles, Download
} from "lucide-react"

const N = "#19244E" // Oiler Navy
const C = "#DB3E8C" // Deep Cerise
const W = "#ffffff"
const S = "#F9FAFB" // Slate off-white
const HAIR = `rgba(25,36,78,0.10)` // hairline border

function MonoTag({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <span
      className="font-sans text-xs font-semibold tracking-wider uppercase"
      style={{ color: accent ? C : `${N}CC` }}
    >
      {children}
    </span>
  )
}

function SectionTag({ label }: { num?: string; label: string }) {
  return (
    <div className="mb-8">
      <div className="text-xs font-semibold uppercase tracking-[0.2em] mb-2" style={{ color: C }}>
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
          className="flex items-center gap-2 font-sans text-xs sm:text-sm font-semibold tracking-widest uppercase transition-opacity hover:opacity-60 cursor-pointer"
          style={{ color: N }}
        >
          <ArrowLeft size={13} /> Back to Home
        </button>
        <MonoTag>ADINA FAYZA GAYO · FULL PROFILE & RESUME</MonoTag>
      </div>

      {/* ── HERO BANNER ────────────────────────────────────────────────── */}
      <div className="py-20 lg:py-24 px-8 lg:px-20 text-white relative overflow-hidden" style={{ backgroundColor: N }}>
        {/* Subtle background gradient elements */}
        <div className="absolute right-0 top-0 w-96 h-96 rounded-full filter blur-[120px] opacity-15 pointer-events-none" style={{ background: `linear-gradient(135deg, ${C} 0%, #3B82F6 100%)` }} />
        
        <div className="max-w-[900px] relative z-10">
          <p className="font-sans text-xs sm:text-sm font-semibold tracking-[0.25em] mb-4 uppercase" style={{ color: C }}>
            Product Designer · System Logic Architect
          </p>
          <h1 className="font-display font-light text-4xl lg:text-6xl leading-[1.05] tracking-tight mb-8">
            Adina Fayza Gayo
          </h1>
          <p className="text-base lg:text-lg font-sans font-light leading-relaxed text-white/90 max-w-[780px] mb-8">
            Product Designer with 4+ years of hands-on experience designing complex B2B platforms, embedded insurance flows, and multi-brand design systems across Indonesia and Malaysia. Most of my day is spent untangling messy product logic, covering edge cases, and making sure engineering teams have crystal-clear specs to build from.
          </p>
          
          {/* Metadata Grid */}
          <div className="flex flex-wrap gap-y-3.5 gap-x-6 pt-6 border-t border-white/10 text-xs sm:text-sm font-sans text-white/85">
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-[#DB3E8C]" /> Jakarta, Indonesia
            </span>
            <a href="tel:+6289630441118" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone size={14} className="text-[#DB3E8C]" /> +62 896 3044 1118
            </a>
            <a href="mailto:adinagayo@gmail.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail size={14} className="text-[#DB3E8C]" /> adinagayo@gmail.com
            </a>
            <a href="https://www.linkedin.com/in/adinafayzagayo/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Linkedin size={14} className="text-[#DB3E8C]" /> LinkedIn
            </a>
            <a href="https://dinaworks.framer.website/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <ExternalLink size={14} className="text-[#DB3E8C]" /> Portfolio Website
            </a>
            <a
              href="/resume-adina-fayza-gayo.pdf"
              download="ADINA FAYZA GAYO Resume 2026.pdf"
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#DB3E8C] hover:bg-[#DB3E8C]/90 text-white rounded text-xs sm:text-sm font-bold transition-all shadow ml-auto"
            >
              <Download size={14} /> Download Resume PDF
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
                scope: "Enterprise Portals · Embedded InsurTech · Multi-Brand Ecosystems · Solo Designer Ownership",
                desc: "Led product design for insurance technology platforms (since June 2024) and cross-sector enterprise products as solo designer, shipping 26+ digital products across regional SEA markets (Indonesia & Malaysia).",
                points: [
                  {
                    lead: "Architected End-to-End B2B & Embedded Platforms:",
                    text: "Spearheaded user flows, complex logic, and edge cases across web and mobile platforms (17+ live white-label insurance portals, eWallet PWA for Touch 'n Go 20M+ users, and national election PWAs processing 820,000+ data points), translating complex business rules into seamless user interfaces."
                  },
                  {
                    lead: "Engineered Multi-Brand Design Systems:",
                    text: "Built and maintained comprehensive design systems with modular components and design tokens serving 16 active client implementations from scratch, accelerating team prototyping speed and UI consistency."
                  },
                  {
                    lead: "Pioneered Decision Traceability & Handoff Frameworks:",
                    text: "Structured clear logic rationale, state-management specs, and developer documentation across 5-18+ cross-functional team members, cutting handoff friction and implementation errors."
                  },
                  {
                    lead: "Rapid Prototyping & High-Velocity Validation:",
                    text: "Leveraged AI-assisted workflows and interactive high-fidelity prototypes to deliver landing pages in 2-3 hours and complex portals in 2-5 days, validating solutions rapidly with enterprise stakeholders and shortening time-to-market."
                  }
                ]
              },
              {
                role: "Freelance UI/UX Designer",
                company: "Remote anywhere",
                location: "Remote",
                duration: "May 2023 - Present",
                scope: "AI-First Prototyping · Healthcare & Legal Tech · B2C Marketplaces · SMB Digital Transformation",
                desc: "Partnered with startups and SMBs to design and ship digital products from concept to launch across healthcare, legal, and e-commerce sectors.",
                points: [
                  {
                    lead: "Architected End-to-End B2C & SaaS Marketplaces:",
                    text: "Designed user flows, order management, and chat workflows for legal consulting marketplaces, therapy center management consoles, and e-commerce checkout experiences."
                  },
                  {
                    lead: "Engineered Scalable Component Assets:",
                    text: "Standardized UI components and responsive design assets across multi-device surfaces, including custom interactive LED display systems with mobile synchronization."
                  },
                  {
                    lead: "Pioneered Frictionless Developer Handoff:",
                    text: "Structured user flows, interactive prototypes, and design rationale documentation for remote engineering teams to ensure precise code implementation."
                  },
                  {
                    lead: "Rapid Prototyping & AI-Assisted Workflows:",
                    text: "Leveraged AI-assisted workflows (Claude/Gemini and Figma Make/Antigravity) to reduce project delivery timelines by 70% (from 2 weeks to 2-3 days) for live interactive stakeholder validation."
                  }
                ]
              },
              {
                role: "UI/UX Designer",
                company: "Reka Cipta Digital",
                location: "Jakarta",
                duration: "Aug 2021 - May 2023",
                scope: "Software House Development · Conversion Optimization · Interactive Prototypes · Responsive Web & Mobile",
                desc: "Software house specializing in website and application development, crafting custom web and mobile solutions for client products.",
                points: [
                  {
                    lead: "Architected Cross-Industry Web & Mobile Apps:",
                    text: "Conducted user research, wireframing, and interactive prototyping for diverse client applications from initial user story through production launch."
                  },
                  {
                    lead: "Engineered Modular Responsive UI Kits:",
                    text: "Built responsive design systems in Figma using auto-layout, variants, and component libraries to maintain cross-platform visual consistency."
                  },
                  {
                    lead: "Structured Design Rationale & Dev Specs:",
                    text: "Documented UX logic, flow diagrams, and design rationale for front-end engineers, reducing handoff revisions and daily team alignment friction."
                  },
                  {
                    lead: "Rapid Prototyping & Conversion Optimization:",
                    text: "Designed and A/B tested landing page variations to optimize conversion funnels, user engagement, and client business growth."
                  }
                ]
              },
              {
                role: "Graphic Designer",
                company: "Badan Amil Zakat Nasional (BAZNAS)",
                location: "Jakarta",
                duration: "Apr 2020 - Dec 2021",
                scope: "National Brand Governance · Visual Communication Systems · Multi-Branch Coordination · Team Leadership",
                desc: "National philanthropic organization managing zakat, infaq, and alms (ZIS) at the national level.",
                points: [
                  {
                    lead: "Architected National Visual Campaign Systems:",
                    text: "Spearheaded visual identity and graphic design operations for national philanthropic campaigns and public sector communication channels."
                  },
                  {
                    lead: "Engineered Brand Standardization Guidelines:",
                    text: "Coordinated with nationwide regional branches to maintain strict brand consistency across multi-channel digital and print collateral."
                  },
                  {
                    lead: "Established Workflow Quality Standards:",
                    text: "Led a team of 3 designers managing 20+ weekly design deliverables, establishing efficient review workflows and onboarding standards."
                  },
                  {
                    lead: "Rapid Media Asset Delivery:",
                    text: "Streamlined multi-channel asset production to ensure rapid campaign rollout across national press and social channels."
                  }
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
                  <span className="font-sans text-xs sm:text-sm font-semibold tracking-wider uppercase" style={{ color: C }}>
                    {work.duration}
                  </span>
                  <span className="font-sans text-xs text-gray-400 font-medium">
                    {work.location}
                  </span>
                </div>
                
                <h4 className="font-display text-xl font-bold" style={{ color: N }}>
                  {work.role} <span className="font-sans text-sm font-normal text-gray-400">at {work.company}</span>
                </h4>

                <div className="font-sans text-xs font-bold tracking-wider uppercase mt-1 mb-3" style={{ color: C }}>
                  Scope: {work.scope}
                </div>
                
                <p className="font-sans text-sm sm:text-base leading-relaxed mb-4 text-[#19244E]/85">
                  {work.desc}
                </p>
                
                <ul className="space-y-3 pl-1">
                  {work.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2.5 font-sans text-sm leading-relaxed text-[#19244E]/85">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#DB3E8C] flex-shrink-0 mt-2" />
                      <span>
                        <strong className="font-bold text-[#19244E]">{pt.lead} </strong>
                        {pt.text}
                      </span>
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
                gpa: "3.88/4.00",
                duration: "Feb 2025 - Oct 2026",
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
                  <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-[#DB3E8C] mb-3">
                    <span>{edu.duration}</span>
                    <span>GPA: {edu.gpa}</span>
                  </div>
                  <h4 className="font-display text-lg sm:text-xl font-bold mb-1" style={{ color: N }}>
                    {edu.school}
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-gray-500 mb-4">{edu.location}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div>
                      <span className="block font-sans text-xs font-bold tracking-wider uppercase text-gray-400">Degree & Focus</span>
                      <span className="font-sans text-sm sm:text-base font-semibold text-[#19244E]">{edu.degree} — {edu.specialization}</span>
                    </div>
                    <div>
                      <span className="block font-sans text-xs font-bold tracking-wider uppercase text-gray-400">Final Thesis / Project Focus</span>
                      <p className="font-sans text-xs sm:text-sm leading-relaxed text-[#19244E]/85 mt-0.5">{edu.thesis}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200/50">
                  <span className="block font-sans text-xs font-bold tracking-wider uppercase text-gray-400 mb-2">Key Coursework</span>
                  <div className="flex flex-wrap gap-1.5">
                    {edu.coursework.map((course) => (
                      <span key={course} className="font-sans text-xs sm:text-sm px-2.5 py-1 rounded bg-white text-[#19244E]/85 border border-gray-200 shadow-xs">
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
            <p className="font-sans text-sm sm:text-base leading-relaxed mt-4" style={{ color: `${N}AA` }}>
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
                <h4 className="font-sans text-xs sm:text-sm font-bold tracking-wider uppercase mb-4" style={{ color: C }}>
                  {title}
                </h4>
                <ul className="space-y-2">
                  {skills.map((skill) => (
                    <li key={skill} className="flex items-center gap-2 font-sans text-xs sm:text-sm" style={{ color: `${N}CC` }}>
                      <CheckCircle2 size={13} style={{ color: C }} /> {skill}
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
        <div className="max-w-[800px] mx-auto">
          <div className="text-center">
            <SectionTag label="In Life" />
          </div>
          
          <div className="space-y-6 text-sm lg:text-base font-sans font-light leading-relaxed mt-8 text-left" style={{ color: `${N}DD`, lineHeight: 1.8 }}>
            <p>
              Off the clock, I trade Figma files for live gigs, plot twists, and systematic quirks. I find genuine joy in deconstructing complex narratives—whether that means predicting murderer motifs in thriller K-Dramas, logging my latest book reads with highlighted favorite quotes, or letting an eclectic playlist drift from classical compositions into smooth RnB. There is a special kind of rhythm in catching local indie concerts from the crowd, soaking in the collective energy of a live room.
            </p>
            <p>
              That said, my structural instincts rarely shut down completely. Outside of design sprints, I am the friend who builds color-coded travel itineraries three weeks early, complete with walking-distance calculations, backup cafe options, and dual-currency budgets. In the kitchen, I follow recipes down to the exact gram measurement like a lab experiment—until it comes to fried rice, where pure instinct takes over.
            </p>
            <p>
              Fueled by zero-sugar iced Americanos (and the occasional bowl of properly bitter ceremonial matcha), my downtime revolves around friendly competition: chasing personal bests on Sudoku and Blockblast, assembling oversized jigsaw puzzles, and surviving the chaos of late-night Uno showdowns with friends.
            </p>
          </div>
        </div>
      </div>

      {/* ── FOOTER CTA ────────────────────────────────────────────────── */}
      <div className="py-16 px-8 lg:px-20 text-center" style={{ backgroundColor: N, borderTop: `1px solid rgba(255,255,255,0.06)` }}>
        <p className="font-sans text-xs sm:text-sm font-semibold tracking-[0.2em] text-white/60 uppercase mb-4">
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
            className="flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold tracking-widest text-white/80 border border-white/10 hover:border-white/30 rounded uppercase transition-colors cursor-pointer"
          >
            <ArrowLeft size={13} /> Back to Home
          </button>
        </div>
      </div>

    </div>
  )
}
