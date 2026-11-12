import { useState, useEffect } from "react"
import type { ReactNode } from "react"
import { ArrowLeft, ArrowUpRight, Eye } from "lucide-react"
import adinaPhotoAbout from "@/imports/Foto At Work.jpg"
import adinaPhotoLife from "@/imports/Foto In Life.jpg"

// Type and color roles match the case study pages:
// navy for headings, soft navy for body, grey for small notes, one pink accent.
const N = "#19244E"
const BODY = "#2E3A5C"
const C = "#DB3E8C"
const HAIR = "rgba(25,36,78,0.10)"

const CONTACTS = [
  { label: "Email", href: "mailto:adinagayo@gmail.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/adinafayzagayo/" },
]

const AT_A_GLANCE = [
  { value: "5 years", note: "in product design" },
  { value: "26+", note: "digital products" },
  { value: "17+", note: "white-label products" },
  { value: "3 markets", note: "ID · MY · SG" },
]

const EXPERIENCE = [
  {
    role: "Digital Product Designer, Enterprise Multi-Brand Platforms",
    company: "Deptech Digital Indonesia",
    location: "Jakarta",
    duration: "Jun 2024 to Present",
    scope: "Enterprise multi-brand platforms · Insurance and financial systems · White-label solutions",
    desc: "Delivered white-label products for enterprise clients including Grab, Touch 'n Go × Great Eastern, GEGM × Shopee, and mySalam × myKawan across Indonesia, Malaysia, and Singapore.",
    points: [
      { lead: "Four-portal systems.", text: "Designed four-portal systems (admin, customer, agent, microsite) with claims and underwriting approval workflows in 2–4 days." },
      { lead: "Touch 'n Go mini-program.", text: "Designed an insurance mini-program for Touch 'n Go's 20M+ user e-wallet through five client-reviewed versions, with subsidy eligibility checks and webview-constrained flows. Analyzed app flows and API documentation for eKYC prefill, with fewer redundant inputs and higher data accuracy. Migrated the component set to TNG's official UI kit after first-round approval." },
      { lead: "Modular UI across 17+ products.", text: "Adapted modular UI components across 17+ white-label products for visual consistency." },
      { lead: "Live quiz flow redesign.", text: "Redesigned post-launch flows for mySalam × myKawan's live quiz game, with a top-5 leaderboard and a no-submit answer flow for faster live play." },
      { lead: "Scoping and handoff.", text: "Proposed product logic and feature scope to PMs and engineers in Agile teams of 5–18+ members, within technical feasibility. Documented states, edge cases, and expected outcomes in developer handoffs, and presented high-fidelity prototypes to stakeholders for approval in 1–2 review cycles." },
    ],
  },
  {
    role: "UI/UX Designer",
    company: "Deptech Digital Indonesia",
    location: "Jakarta",
    duration: "Jun 2023 to Jun 2024",
    scope: "Consumer health platform (FMCG) · National election system · Usability testing",
    desc: "Owned end-to-end UI/UX as sole designer in 4–7 member teams for healthcare, monitoring, and POS products.",
    points: [
      { lead: "Healthcare and FMCG.", text: "Included Fonterra × Anlene's consumer health platform (FMCG)." },
      { lead: "National election quick count.", text: "Designed a national election quick count system for 820,000+ witness-registered polling stations, with field-driven iteration." },
      { lead: "Audits and testing.", text: "Conducted system audits and usability testing for validated UX improvements. Analyzed business models and user patterns against technical and business requirements." },
    ],
  },
  {
    role: "Product / UI/UX Designer (Part-time, Remote)",
    company: "Freelance",
    location: "Remote",
    duration: "May 2023 to Present",
    scope: "AI-powered prototyping · Healthcare · Legal tech · E-commerce",
    desc: "Selected projects across healthcare, legal, travel, and e-commerce, from MVP through UAT.",
    points: [
      { lead: "AI-powered prototyping.", text: "Developed AI-powered design and prototyping workflows with Claude, Gemini, Figma Make, VS Code, and Antigravity, for rapid iteration from requirements to HTML prototypes." },
      { lead: "Telkomsel Siaga greeting wall.", text: "Designed the UI for Telkomsel Siaga's nationwide greeting wall (mobile form, moderation dashboard, curved LED display) in a 1-week sprint." },
      { lead: "Pro Archery commerce.", text: "Designed Pro Archery's commerce ecosystem: landing page, B2C e-commerce, customer portal, and admin/POS." },
      { lead: "Consulting and enterprise platforms.", text: "Designed a legal consulting platform, therapy center ERP, checkout experiences, and directory platforms, along with websites, mobile applications, and dashboards." },
    ],
  },
  {
    role: "UI/UX Designer",
    company: "Reka Cipta Digital",
    location: "Jakarta",
    duration: "Aug 2021 to May 2023",
    scope: "Design thinking · Interactive prototypes · Conversion optimization · Front-end implementation",
    desc: "A software house delivering custom web and mobile solutions for client products.",
    points: [
      { lead: "Alignment and research.", text: "Aligned design and engineering teams on project goals and development timelines. Conducted user research using design thinking and qualitative methods to define user flows, personas, and UX strategy." },
      { lead: "Prototypes and visual design.", text: "Created wireframes, visual designs, flow diagrams, and interactive prototypes for front-end implementation." },
      { lead: "Conversion and bug fixing.", text: "Tested UI elements, page layouts, and user flow to optimize landing-page conversion. Supported developers through design handoff, implementation, and bug fixing." },
    ],
  },
  {
    role: "Graphic Designer",
    company: "Badan Amil Zakat Nasional (BAZNAS)",
    location: "Jakarta",
    duration: "Apr 2020 to Dec 2021",
    scope: "Team leadership · National campaigns · Multi-branch communication",
    desc: "A national philanthropic organization managing zakat, infaq, and alms.",
    points: [
      { lead: "Team leadership.", text: "Led a design team of 3 to deliver 20+ design requests weekly across digital campaigns and print materials." },
      { lead: "Nationwide communication.", text: "Coordinated design communication across BAZNAS branches nationwide, producing digital campaigns, advertisements, brochures, infographics, and event visuals." },
    ],
  },
]

const EDUCATION = [
  {
    school: "Institut Teknologi Sepuluh Nopember",
    location: "Surabaya (Online)",
    degree: "Master of Technology Management, Design Innovation Management",
    gpa: "3.89 / 4.00",
    duration: "Feb 2025 to Jul 2026",
    details: [
      { label: "Thesis", text: "“Design Rationale Documentation and Traceability Framework for Solo Designers in Multi-Brand Products: A Case Study at PT Friendsure Teknologi Indonesia”" },
      { label: "Academic project", text: "RemindITS, a task-reminder app for working students. Ran a questionnaire survey and moderated usability testing (11 participants, 5 task scenarios, SUS 70.21)." },
      { label: "Coursework", text: "Design Thinking · Design Management · Strategic Brand Management · UX Design · Project Management · Business Statistics" },
    ],
  },
  {
    school: "Universitas Multimedia Nusantara",
    location: "Gading Serpong",
    degree: "Bachelor of Interactive Design, Interactive Design & UI/UX",
    gpa: "3.55 / 4.00",
    duration: "Aug 2017 to Jan 2021",
    details: [
      { label: "Final project", text: "Interactive card game for children with dyslexia: researched, designed, and prototyped." },
      { label: "Coursework", text: "HCI · Interactivity · Interface Design · Design Methods" },
    ],
  },
]

const TOOLKIT = [
  {
    label: "UX/UI",
    items: "User flows · Wireframing · Prototyping · Usability testing · Journey mapping · UX strategy · Interaction design · Visual design",
  },
  {
    label: "Product & systems",
    items: "Product thinking · System analysis · Modular and atomic component systems · Multi-brand and white-label products · Business model analysis",
  },
  {
    label: "Collaboration",
    items: "Stakeholder management · Cross-functional collaboration · Design rationale documentation and handoff",
  },
  {
    label: "Tools",
    items: "Figma · Figma Make · Framer · Claude · Gemini · Antigravity · VS Code · HTML/CSS prototyping · Adobe Illustrator · Adobe Photoshop · Microsoft Excel",
  },
  {
    label: "Certifications",
    items: "Adobe Certified Associate (Illustrator) · UI/UX Bootcamp (Purwadhika, 2021) · IDF User Experience Foundation (2023) · Full Stack Integration (Skill Academy, 2024)",
  },
  {
    label: "Languages",
    items: "Indonesian (native) · English (TOEFL 550, British Council 570) · Korean (beginner)",
  },
]

const IN_LIFE = [
  {
    title: "Stories and live rooms",
    text: "Off the clock, I trade Figma files for live gigs, plot twists, and systematic quirks. I enjoy taking complex stories apart, whether that means predicting the culprit in a thriller K-Drama, logging my latest reads with favorite quotes, or letting a playlist drift from classical into smooth RnB. Local indie concerts, seen from the crowd, have a rhythm of their own.",
  },
  {
    title: "Planned to the gram",
    text: "My structural instincts rarely shut down. I am the friend who builds color-coded travel itineraries three weeks early, with walking distances, backup cafes, and dual-currency budgets. In the kitchen I follow recipes to the exact gram, until it comes to fried rice, where instinct takes over.",
  },
  {
    title: "Friendly competition",
    text: "Fueled by zero-sugar iced Americanos and the occasional bowl of properly bitter matcha, my downtime is friendly competition: personal bests on Sudoku and Blockblast, oversized jigsaw puzzles, and late-night Uno with friends.",
  },
]

function Label({ children }: { children: ReactNode }) {
  return (
    <span className="block font-sans text-[11px] font-bold tracking-[0.2em] uppercase" style={{ color: C }}>
      {children}
    </span>
  )
}

// One page section: the title sits in a narrow left column and stays in view while its content scrolls.
function Section({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  return (
    <section className="py-16 lg:py-24" style={{ borderTop: `1px solid ${HAIR}` }}>
      <div className="max-w-[1120px] mx-auto px-6 lg:px-12 grid lg:grid-cols-[240px_1fr] gap-8 lg:gap-16 items-start">
        <div className="lg:sticky lg:top-24">
          <h2 className="font-display text-2xl lg:text-3xl font-bold" style={{ color: N }}>
            {title}
          </h2>
          <div className="w-12 h-[2px] mt-4" style={{ backgroundColor: C }} />
          {note && (
            <p className="font-sans text-sm leading-relaxed mt-5" style={{ color: BODY }}>
              {note}
            </p>
          )}
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  )
}

interface Props {
  onBack: () => void
  onOpenPdfPreview: () => void
}

export default function AboutMe({ onBack, onOpenPdfPreview }: Props) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0 })
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "var(--font-sans)", color: N }}>

      {/* Sticky header */}
      <div
        className="sticky top-0 z-50 flex items-center justify-between gap-4 px-6 lg:px-12 py-4 transition-all duration-200"
        style={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.96)" : "#ffffff",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: `1px solid ${HAIR}`,
        }}
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 font-sans text-xs font-semibold tracking-widest uppercase transition-opacity hover:opacity-60 cursor-pointer"
          style={{ color: N }}
        >
          <ArrowLeft size={13} /> Back to Home
        </button>
        <button
          type="button"
          onClick={onOpenPdfPreview}
          className="flex items-center gap-2 font-sans text-xs font-semibold tracking-widest uppercase transition-opacity hover:opacity-60 cursor-pointer"
          style={{ color: C }}
        >
          <Eye size={13} /> View Resume
        </button>
      </div>

      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <div className="max-w-[1120px] mx-auto px-6 lg:px-12 pt-14 lg:pt-20 pb-16 lg:pb-20">
        <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-end">
          <div>
            <Label>UI/UX Designer · Jakarta, Indonesia</Label>
            <h1
              className="font-display font-medium leading-[1.02] tracking-tight mt-4"
              style={{ fontSize: "clamp(2.6rem, 6.4vw, 5.5rem)", color: N }}
            >
              Adina Fayza Gayo
            </h1>
            <p
              className="font-display font-medium mt-8 max-w-[680px]"
              style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.45rem)", color: N, letterSpacing: "-0.01em", lineHeight: 1.6 }}
            >
              UI/UX Designer with 5 years of experience in end-to-end design, from user flows and wireframing to prototyping, design systems, AI-assisted design workflows, and developer handoff, including B2B multi-portal operations systems and white-label platforms.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={onOpenPdfPreview}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-sans text-xs font-bold tracking-wider uppercase text-white transition-opacity hover:opacity-90 cursor-pointer"
                style={{ backgroundColor: C }}
              >
                <Eye size={14} /> View Resume
              </button>
              {CONTACTS.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-white font-sans text-xs font-bold tracking-wider uppercase hover:border-[#DB3E8C] transition-colors"
                  style={{ color: N, border: `1px solid ${N}33` }}
                >
                  {c.label} <ArrowUpRight size={14} style={{ color: C }} />
                </a>
              ))}
            </div>
          </div>

          <img
            src={adinaPhotoAbout}
            alt="Adina Fayza Gayo"
            className="w-40 sm:w-48 lg:w-56 h-auto rounded-2xl"
          />
        </div>

        {/* At a glance */}
        <div className="mt-14 lg:mt-20 grid grid-cols-2 lg:grid-cols-4" style={{ borderTop: `1px solid ${HAIR}`, borderBottom: `1px solid ${HAIR}` }}>
          {AT_A_GLANCE.map((item, i) => (
            <div
              key={item.value}
              className={`py-6 pr-6 ${i > 0 ? "lg:pl-6 lg:border-l" : ""} ${i % 2 === 1 ? "pl-6 border-l lg:border-l" : ""} ${i > 1 ? "border-t lg:border-t-0" : ""}`}
              style={{ borderColor: HAIR }}
            >
              <span className="block font-display font-medium text-3xl lg:text-4xl leading-none" style={{ color: N }}>
                {item.value}
              </span>
              <span className="block font-sans text-sm leading-snug mt-3" style={{ color: BODY }}>
                {item.note}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── EXPERIENCE ─────────────────────────────────────────────────── */}
      <Section title="Experience" note="Five roles since 2020, most recently on white-label platforms for enterprise clients.">
        <div>
          {EXPERIENCE.map((work, i) => (
            <article
              key={work.company + work.duration}
              className={`grid sm:grid-cols-[150px_1fr] gap-3 sm:gap-8 ${i > 0 ? "pt-10 mt-10" : ""}`}
              style={i > 0 ? { borderTop: `1px solid ${HAIR}` } : undefined}
            >
              <div>
                <span className="block font-sans text-[11px] font-bold tracking-wider uppercase" style={{ color: C }}>
                  {work.duration}
                </span>
                <span className="block font-sans text-xs text-gray-500 mt-1.5">{work.location}</span>
              </div>

              <div className="min-w-0">
                <h3 className="font-display text-xl font-bold leading-snug" style={{ color: N }}>
                  {work.role}
                </h3>
                <span className="block font-sans text-sm mt-1" style={{ color: BODY }}>{work.company}</span>
                <span className="block font-sans text-xs text-gray-500 mt-2 leading-relaxed">{work.scope}</span>

                <p className="font-sans text-base leading-relaxed mt-5" style={{ color: BODY, lineHeight: 1.8 }}>
                  {work.desc}
                </p>

                <ul className="mt-5 space-y-3">
                  {work.points.map((pt) => (
                    <li key={pt.lead} className="font-sans text-sm leading-relaxed pl-4" style={{ color: BODY, borderLeft: `2px solid ${HAIR}` }}>
                      <strong className="font-semibold" style={{ color: N }}>{pt.lead}</strong> {pt.text}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* ── EDUCATION ──────────────────────────────────────────────────── */}
      <Section title="Education">
        <div>
          {EDUCATION.map((edu, i) => (
            <article
              key={edu.school}
              className={`grid sm:grid-cols-[150px_1fr] gap-3 sm:gap-8 ${i > 0 ? "pt-10 mt-10" : ""}`}
              style={i > 0 ? { borderTop: `1px solid ${HAIR}` } : undefined}
            >
              <div>
                <span className="block font-sans text-[11px] font-bold tracking-wider uppercase" style={{ color: C }}>
                  {edu.duration}
                </span>
                <span className="block font-sans text-xs text-gray-500 mt-1.5">{edu.location}</span>
                <span className="block font-sans text-xs text-gray-500 mt-1.5">GPA {edu.gpa}</span>
              </div>

              <div className="min-w-0">
                <h3 className="font-display text-xl font-bold leading-snug" style={{ color: N }}>
                  {edu.school}
                </h3>
                <span className="block font-sans text-sm mt-1" style={{ color: BODY }}>{edu.degree}</span>

                <dl className="mt-5 space-y-4">
                  {edu.details.map((d) => (
                    <div key={d.label}>
                      <dt className="font-sans text-[11px] font-bold tracking-wider uppercase text-gray-500">{d.label}</dt>
                      <dd className="font-sans text-sm leading-relaxed mt-1" style={{ color: BODY }}>{d.text}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* ── SKILLS & TOOLKIT ───────────────────────────────────────────── */}
      <Section title="Skills & Toolkit">
        <dl style={{ borderBottom: `1px solid ${HAIR}` }}>
          {TOOLKIT.map((row) => (
            <div
              key={row.label}
              className="py-5 flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-8"
              style={{ borderTop: `1px solid ${HAIR}` }}
            >
              <dt className="sm:w-40 shrink-0 font-sans text-[11px] font-bold tracking-wider uppercase" style={{ color: C }}>
                {row.label}
              </dt>
              <dd className="font-sans text-base leading-relaxed" style={{ color: BODY }}>{row.items}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* ── IN LIFE ────────────────────────────────────────────────────── */}
      <Section title="In Life">
        <div className="flex flex-col sm:flex-row items-start gap-6 mb-10">
          <img
            src={adinaPhotoLife}
            alt="Adina Fayza Gayo, off the clock"
            className="w-24 h-24 rounded-2xl object-cover shrink-0"
          />
          <p
            className="font-display font-medium leading-relaxed"
            style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.45rem)", color: N, letterSpacing: "-0.01em", lineHeight: 1.6 }}
          >
            Equal parts concert-goer and spreadsheet enthusiast.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {IN_LIFE.map((item) => (
            <div key={item.title} className="pt-5" style={{ borderTop: `2px solid ${C}` }}>
              <h3 className="font-sans text-base font-bold" style={{ color: N }}>{item.title}</h3>
              <p className="font-sans text-sm leading-relaxed mt-3" style={{ color: BODY }}>{item.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── FOOTER CTA ─────────────────────────────────────────────────── */}
      <section style={{ borderTop: `1px solid ${HAIR}`, backgroundColor: "#F9FAFB" }}>
        <div className="max-w-[1120px] mx-auto px-6 lg:px-12 py-16 lg:py-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <Label>Want to design something together?</Label>
            <a
              href="mailto:adinagayo@gmail.com"
              className="group inline-flex items-center gap-3 font-display font-medium mt-4 hover:text-[#DB3E8C] transition-colors break-all"
              style={{ fontSize: "clamp(1.6rem, 4vw, 3rem)", color: N }}
            >
              adinagayo@gmail.com
              <ArrowUpRight className="shrink-0 w-6 h-6 lg:w-8 lg:h-8" style={{ color: C }} />
            </a>
          </div>
          <button
            onClick={onBack}
            className="self-start lg:self-auto flex items-center gap-2 px-5 py-3 rounded-xl font-sans text-xs font-bold tracking-wider uppercase transition-colors hover:border-[#DB3E8C] cursor-pointer"
            style={{ color: N, border: `1px solid ${N}33` }}
          >
            <ArrowLeft size={13} /> Back to Home
          </button>
        </div>
      </section>

    </div>
  )
}
