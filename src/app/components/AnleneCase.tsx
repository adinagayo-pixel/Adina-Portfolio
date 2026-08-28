import { useState, useEffect } from "react"
import {
  ArrowLeft, ChevronRight, FileText, Smartphone,
  Activity, Heart, MessageSquare, Clipboard,
  CheckCircle2, Users, Zap, AlertTriangle, GitBranch, Search, Sparkles, Layers, ChevronDown
} from "lucide-react"
import anleneThumb from "@/imports/Anlene thumb.jpg"
import anleneThumb2 from "@/imports/anlene thumb 2.png"
import anleneThumb3 from "@/imports/anlene thumb 3.png"
import anleneThumb4 from "@/imports/anlene thumb 4.png"
import anleneThumb5 from "@/imports/anlene thumb 5.png"
import anleneThumb6 from "@/imports/anlene thumb 6.png"

const N = "#19244E"
const C = "#DB3E8C"
const W = "#ffffff"
const S = "#F9FAFB"
const HAIR = `rgba(25,36,78,0.10)`
const BODY = "#2E3A5C"

// Anlene health tier colors
const TIER_BLUE   = { bg: "#EEF4FB", border: "#93C4E8", text: "#1A5276", dot: "#2E86C1" }
const TIER_GREEN  = { bg: "#EAF7EE", border: "#82CDA0", text: "#1E6B3A", dot: "#27AE60" }
const TIER_YELLOW = { bg: "#FEF9EC", border: "#F5CB5C", text: "#7D6008", dot: "#D4AC0D" }
const TIER_RED    = { bg: "#FDF0EE", border: "#F0A899", text: "#78281F", dot: "#C0392B" }

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

function Hairline() {
  return <div className="w-full h-px" style={{ backgroundColor: HAIR }} />
}

function SectionTag({ id, num, label }: { id?: string; num: string; label: string }) {
  return (
    <div id={id} className="mb-10 pt-4 scroll-mt-24">
      <div className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2 text-[#DB3E8C]">
        SECTION {num}
      </div>
      <h2 className="font-display text-2xl lg:text-3xl font-bold text-[#19244E]">
        {label}
      </h2>
      <div className="w-12 h-[2px] mt-4 bg-[#DB3E8C]" />
    </div>
  )
}

interface Props {
  onBack: () => void
  onNext?: () => void
  onPrev?: () => void
}

const QUICK_SECTIONS = [
  { id: "summary", num: "01", label: "Executive Overview" },
  { id: "challenge", num: "02", label: "The Strategic Challenge" },
  { id: "research", num: "03", label: "Research Under Constraint" },
  { id: "logic", num: "04", label: "Decision Logic" },
  { id: "flow", num: "05", label: "Full Flow" },
  { id: "evolution", num: "06", label: "Design Evolution" },
  { id: "process", num: "07", label: "Design Process" },
  { id: "deliverables", num: "08", label: "Deliverables" },
  { id: "impact", num: "09", label: 'Key Impact & "So What"' },
]

export default function AnleneCase({ onBack, onNext, onPrev }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [activeQuickId, setActiveQuickId] = useState<string>("summary")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0 })
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // ScrollSpy for Quick Jump active state
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveQuickId(entry.target.id)
          }
        })
      },
      { rootMargin: "-25% 0px -55% 0px" }
    )

    QUICK_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" })
      setMobileMenuOpen(false)
    }
  }

  const activeSectionObj = QUICK_SECTIONS.find((s) => s.id === activeQuickId) || QUICK_SECTIONS[0]

  return (
    <div className="min-h-screen scroll-smooth" style={{ backgroundColor: S, fontFamily: "var(--font-sans)" }}>

      {/* Sticky top nav */}
      <div
        className="sticky top-0 z-50 flex items-center justify-between px-6 lg:px-16 py-4 transition-all duration-200"
        style={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.95)" : W,
          backdropFilter: "blur(16px)",
          borderBottom: `1px solid ${HAIR}`,
        }}
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 font-sans text-[10px] font-semibold tracking-widest uppercase transition-opacity hover:opacity-60 cursor-pointer"
          style={{ color: N }}
        >
          <ArrowLeft size={12} /> Back
        </button>
        <MonoTag>Fonterra Anlene · Digital Health Check Platform</MonoTag>
      </div>

      {/* Mobile Collapsible Quick Jump Bar */}
      <div className="block lg:hidden sticky top-[53px] z-40 bg-[#0e1635] text-white border-b border-white/10 shadow-lg">
        <button
          onClick={() => setMobileMenuOpen((v) => !v)}
          className="w-full px-6 py-3 flex items-center justify-between text-xs font-sans cursor-pointer focus:outline-none"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-2 h-2 rounded-full bg-[#DB3E8C] animate-pulse shrink-0" />
            <span className="font-bold text-[#DB3E8C] uppercase tracking-wider shrink-0">QUICK JUMP:</span>
            <span className="font-semibold text-white/90 truncate">
              {activeSectionObj.num}. {activeSectionObj.label}
            </span>
          </div>
          <ChevronDown
            size={14}
            className={`text-white/70 transition-transform duration-200 shrink-0 ml-2 ${mobileMenuOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* Expanded Vertical Menu for Mobile */}
        {mobileMenuOpen && (
          <div className="px-6 py-3 bg-[#080d21] border-t border-white/10 space-y-1 max-h-[60vh] overflow-y-auto">
            {QUICK_SECTIONS.map((sec) => {
              const isActive = activeQuickId === sec.id
              return (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  onClick={(e) => scrollToSection(e, sec.id)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs transition-colors cursor-pointer ${
                    isActive
                      ? "bg-[#DB3E8C] text-white font-bold"
                      : "text-white/75 hover:bg-white/10 hover:text-white font-medium"
                  }`}
                >
                  <span className={`font-mono text-[10px] ${isActive ? "text-white" : "text-[#DB3E8C]"}`}>
                    {sec.num}
                  </span>
                  <span>{sec.label}</span>
                </a>
              )
            })}
          </div>
        )}
      </div>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <div className="px-8 lg:px-16 pt-16 pb-14" style={{ backgroundColor: W, borderBottom: `1px solid ${HAIR}` }}>
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-center">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <MonoTag accent>CASE STUDY 05</MonoTag>
              <span style={{ color: HAIR }}>/</span>
              <MonoTag>DIGITAL HEALTH CHECK PLATFORM</MonoTag>
              <span style={{ color: HAIR }}>/</span>
              <MonoTag>FONTERRA × ANLENE INDONESIA · 2023–2024</MonoTag>
            </div>

            <h1
              className="font-display font-bold leading-[1.08] tracking-tight"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.6rem)", color: N }}
            >
              Turning a Bone Density Scanner Into a Personalized Health Report
            </h1>

            <p
              className="font-display font-light leading-relaxed"
              style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.45rem)", color: N, letterSpacing: "-0.01em", lineHeight: 1.6 }}
            >
              Redesigning Anlene's field health check experience end to end, from decision logic to PDF report, after the client identified their existing tool as too generic and lacking real insight.
            </p>
          </div>

          {/* Right Column: Hero Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200/80 bg-[#111836] group">
            <img
              src={anleneThumb}
              alt="Anlene Health Passport Preview"
              className="w-full h-auto object-cover max-h-[380px] lg:max-h-[420px] rounded-2xl transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111836]/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      {/* EXECUTIVE SUMMARY & 30 SECOND TAKEAWAYS */}
      <div className="px-8 lg:px-16 py-8 bg-[#111836] border-t border-b border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-[#DB3E8C] animate-pulse" />
          <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-[#DB3E8C]">
            EXECUTIVE SUMMARY & 30 SECOND TAKEAWAYS
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs sm:text-sm font-sans">
          <div className="bg-white/5 p-4 rounded-lg border border-white/5">
            <span className="block text-xs font-bold tracking-widest text-white/50 uppercase mb-1.5">01 · Problem</span>
            <p className="text-xs sm:text-sm leading-relaxed text-white/85">Anlene's field health check app only surfaced a few data points, gave generic results, and lacked any real breakdown connecting metrics to recommendations.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/5">
            <span className="block text-xs font-bold tracking-widest text-white/50 uppercase mb-1.5">02 · Core Constraints</span>
            <p className="text-xs sm:text-sm leading-relaxed text-white/85">No direct field access for research, no hardware to app integration for the two scanners, no system to auto generate result reports.</p>
          </div>
          <div className="bg-[#DB3E8C]/10 p-4 rounded-lg border border-[#DB3E8C]/30">
            <span className="block text-xs font-bold tracking-widest text-[#DB3E8C] uppercase mb-1.5">03 · Exact Ownership</span>
            <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">Sole Designer: built the full decision tree logic across five health metrics, designed every result combination report manually, and translated a later brand refresh into Figma.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/5">
            <span className="block text-xs font-bold tracking-widest text-white/50 uppercase mb-1.5">04 · Key Impact</span>
            <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">Directly resolved all three complaints the client raised about the prior tool, and the engagement returned for a second phase over a year later.</p>
          </div>
        </div>
      </div>

      {/* ── MAIN BODY WITH STICKY LEFT SIDEBAR TOC (DESKTOP) ──────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-20">
        <div className="grid lg:grid-cols-[260px_1fr] gap-12 lg:gap-16 items-start">

          {/* Left Column: Sticky Desktop Table of Contents (TOC) Sidebar */}
          <aside className="hidden lg:block sticky top-24 space-y-6 self-start pr-4">
            <div className="p-5 rounded-2xl bg-[#0e1635] text-white shadow-xl border border-white/10">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                <span className="w-2 h-2 rounded-full bg-[#DB3E8C] animate-pulse" />
                <span className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-[#DB3E8C]">
                  QUICK JUMP
                </span>
              </div>
              <nav className="space-y-1.5" aria-label="Table of Contents">
                {QUICK_SECTIONS.map((sec) => {
                  const isActive = activeQuickId === sec.id
                  return (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      onClick={(e) => scrollToSection(e, sec.id)}
                      className={`group flex items-start gap-2.5 p-2 rounded-lg text-xs transition-all duration-150 cursor-pointer ${
                        isActive
                          ? "bg-[#DB3E8C] text-white font-bold shadow-md"
                          : "text-white/65 hover:bg-white/10 hover:text-white font-medium"
                      }`}
                    >
                      <span className={`font-mono text-[10px] shrink-0 pt-0.5 ${isActive ? "text-white" : "text-[#DB3E8C]"}`}>
                        {sec.num}
                      </span>
                      <span className="leading-snug">{sec.label}</span>
                    </a>
                  )
                })}
              </nav>
            </div>
          </aside>

          {/* Right Column: Case Study Main Content Sections */}
          <div className="space-y-16 lg:space-y-20 min-w-0">

        {/* SECTION 01 · Executive Summary */}
        <div>
          <SectionTag id="summary" num="01" label="Executive Summary" />
          <div className="grid lg:grid-cols-2 gap-4">
            {[
              { label: "Client & Market", val: "Fonterra Indonesia, for the Anlene brand" },
              { label: "Role & Ownership", val: "Sole Product Designer, working closely with a nutritionist on health content" },
              { label: "Core Problem", val: "Anlene's existing health check app only surfaced a few data points from the Omron scan, gave overly general results, and lacked any real breakdown of what those results meant for the person standing in front of it" },
              { label: "Core Stack", val: "Figma, manual PDF report design (no auto-generation), field documentation research via Instagram and YouTube" },
            ].map(({ label, val }) => (
              <div key={label} className="px-6 py-5" style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px" }}>
                <MonoTag>[{label}]</MonoTag>
                <p className="text-sm font-medium mt-2" style={{ color: N, lineHeight: 1.6 }}>{val}</p>
              </div>
            ))}
          </div>

          {/* UI Screen Showcase Gallery */}
          <div className="mt-8 p-6 bg-[#0a0f24] rounded-2xl border border-white/10 shadow-2xl col-span-1 lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div>
                <MonoTag accent>[FONTERRA × ANLENE UI GALLERY]</MonoTag>
                <h3 className="font-display text-xl font-bold text-white mt-1">
                  Medical Diagnostics & Field Sales Flow
                </h3>
              </div>
              <span className="font-sans text-[10px] text-white/50 tracking-widest uppercase hidden sm:inline">
                6 High-Fidelity Views
              </span>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "01 · Health Passport Main UI", img: anleneThumb, desc: "Personalized consumer health passport displaying body age, bone density T-score, and muscle metrics." },
                { title: "02 · Diagnostic Matrix View", img: anleneThumb2, desc: "4-tier color-coded health diagnostic ranges for fast SPG consultation." },
                { title: "03 · Bone Scanner Output", img: anleneThumb3, desc: "GE Achilles ultrasound device integration and automated bone density status calculation." },
                { title: "04 · Field Intake System", img: anleneThumb4, desc: "Fast-entry offline form for SPG event reps with zero data loss protection." },
                { title: "05 · Checkout & Redemption", img: anleneThumb5, desc: "In-booth product purchase completion and automated WhatsApp PDF dispatch." },
                { title: "06 · Reports & Analytics", img: anleneThumb6, desc: "Nationwide activation analytics tracking daily attendee intake per city." },
              ].map(({ title, img, desc }) => (
                <div key={title} className="bg-[#141b36] border border-white/10 rounded-xl p-3 flex flex-col justify-between group hover:border-[#DB3E8C]/50 transition-all duration-300">
                  <div className="aspect-[16/10] rounded-lg overflow-hidden border border-white/10 mb-3 bg-[#0d142d]">
                    <img src={img} alt={title} className="w-full h-full object-cover object-top rounded group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div>
                    <h4 className="font-sans text-xs font-bold text-white mb-1 tracking-wide">{title}</h4>
                    <p className="font-sans text-[10px] text-white/60 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Hairline />

        {/* SECTION 02 · The Strategic Challenge */}
        <div>
          <SectionTag id="challenge" num="02" label="The Strategic Challenge" />
          <p className="font-display font-light leading-relaxed mb-8" style={{ fontSize: "clamp(1.05rem, 1.6vw, 1.3rem)", color: N, letterSpacing: "-0.005em", lineHeight: 1.65 }}>
            Anlene runs in-person health check activations where an SPG (Sales Promotion Girl) walks a customer through a bone density scan (Achilles) and a body composition scan (Omron), then delivers a personalized result. The existing app fell short in three specific ways the client had already identified: it only displayed a handful of the available Omron metrics, the results felt generic rather than personal, and there was no clear breakdown connecting each metric to an actual recommendation.
          </p>

          <p className="font-sans text-[9px] font-semibold tracking-widest uppercase mb-5" style={{ color: `${N}99` }}>
            [Key Constraints]
          </p>

          <div className="space-y-4">
            {[
              {
                Icon: Search,
                title: "No Direct Field Access",
                desc: "Research had to happen without being on-site with an SPG. That gap was filled by combing through Anlene's own Instagram documentation of past \"Health Checking Day\" events and YouTube tutorials on how to operate the Achilles and Omron devices, to understand the real physical flow before designing around it.",
              },
              {
                Icon: Smartphone,
                title: "No Hardware Integration",
                desc: "Neither the Achilles scanner nor the Omron device connects to the app directly. Every result gets typed in manually by an admin, meaning the interface had to be fast and error-resistant for manual data entry under time pressure, not just visually polished.",
              },
              {
                Icon: FileText,
                title: "No Auto-Generated Reports",
                desc: "There was no system to automatically assemble a PDF based on a customer's result combination. Every meaningful combination of BMI, Body Fat, Visceral Fat, Skeletal Muscle, and T-Score categories needed its own manually designed report, closely following the color logic (green/yellow/red) of the underlying decision tree.",
              },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="flex gap-5 px-6 py-5" style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px" }}>
                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5" style={{ border: `1px solid ${HAIR}`, borderRadius: "4px" }}>
                  <Icon size={14} style={{ color: C }} />
                </div>
                <div>
                  <p className="text-sm font-semibold mb-1" style={{ color: N }}>{title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: BODY, lineHeight: 1.75 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Hairline />

        {/* SECTION 03 · Research Under Constraint */}
        <div>
          <SectionTag id="research" num="03" label="Research Under Constraint" />
          <div className="grid md:grid-cols-2 gap-6">
            <div className="px-6 py-6" style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px" }}>
              <div className="flex items-center gap-2 mb-3">
                <GitBranch size={16} style={{ color: C }} />
                <h3 className="font-sans text-base font-bold" style={{ color: N }}>Mapping Two Journeys, Not One</h3>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: BODY, lineHeight: 1.75 }}>
                Rather than a single generic user flow, two separate customer journey maps were built in FigJam: one for the customer going through the health check, and one for the SPG administering it. Each mapped Actions, Devices used, Questions the person likely had, Sentiment, and Opportunities, surfacing friction points like "why do I need to give my phone number again" or "how long will this result stay accessible."
              </p>
            </div>

            <div className="px-6 py-6" style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px" }}>
              <div className="flex items-center gap-2 mb-3">
                <Search size={16} style={{ color: C }} />
                <h3 className="font-sans text-base font-bold" style={{ color: N }}>Learning the Devices Secondhand</h3>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: BODY, lineHeight: 1.75 }}>
                With no access to an actual activation event, the physical process of using the Achilles scanner and Omron device was pieced together from GE's own product documentation, YouTube walkthroughs, and screenshots of Anlene's real event coverage on Instagram, close enough to see the tablet-and-scanner setup SPGs were actually working with in the field.
              </p>
            </div>
          </div>
        </div>

        <Hairline />

        {/* SECTION 04 · Building the Decision Logic */}
        <div>
          <SectionTag id="logic" num="04" label="Building the Decision Logic" />
          <div className="space-y-6">
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: BODY, lineHeight: 1.8 }}>
              Before any report screen could be designed, every possible result needed a clear category. A decision tree was built covering five metrics, BMI, Body Fat, Visceral Fat, Skeletal Muscle, and T-Score, each split by gender, with defined numeric ranges mapped to Low, Normal, High, and Very High classifications (color-coded blue, green, yellow, red).
            </p>
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: BODY, lineHeight: 1.8 }}>
              This tree became the backbone for every downstream design decision: which color a result card should be, which recommendation block it should trigger, and which combination needed its own manually designed PDF page. It also gave the development team and the client something concrete to review and approve against, rather than an abstract description of "how results should look."
            </p>

            {/* 4-Tier Color Matrix Visual */}
            <div style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px", overflow: "hidden" }} className="mt-6">
              <div className="px-6 py-4" style={{ borderBottom: `1px solid ${HAIR}` }}>
                <MonoTag>[DECISION SYSTEM: 4-TIER COLOR MATRIX THRESHOLDS]</MonoTag>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4">
                {[
                  { tier: TIER_BLUE,   label: "Low / Below Average", examples: "T-Score < −2.5 (Osteoporosis)\nBMI < 18.5 (Underweight)", code: "BLUE" },
                  { tier: TIER_GREEN,  label: "Normal / Ideal State", examples: "T-Score −1.0 to 0\nBMI 18.5–24.9 (Normal)", code: "GREEN" },
                  { tier: TIER_YELLOW, label: "High / Moderate Risk", examples: "Visceral Fat 10–14\nBody Fat % Above Normal", code: "YELLOW" },
                  { tier: TIER_RED,    label: "Very High / High Risk", examples: "T-Score < −2.5 + fracture\nVisceral Fat 15+ (Obese)", code: "RED" },
                ].map(({ tier, label, examples, code }, i) => (
                  <div
                    key={code}
                    className="px-5 py-5"
                    style={{
                      backgroundColor: tier.bg,
                      borderRight: i < 3 ? `1px solid ${HAIR}` : "none",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: tier.dot }} />
                      <span className="font-sans text-[9px] font-semibold tracking-widest" style={{ color: tier.text }}>
                        [{code}]
                      </span>
                    </div>
                    <p className="text-xs font-semibold mb-2" style={{ color: tier.text }}>{label}</p>
                    <p className="font-sans text-xs leading-relaxed whitespace-pre-line" style={{ color: tier.text, opacity: 0.75 }}>
                      {examples}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Hairline />

        {/* SECTION 05 · From Scan to Report — The Full Flow */}
        <div>
          <SectionTag id="flow" num="05" label="From Scan to Report — The Full Flow" />
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                num: "01",
                title: "Manual, Not Automated, by Design Necessity",
                desc: "An SPG scans the customer on the Achilles and Omron devices, then manually enters both results into the app. There's no Bluetooth or API bridge between the hardware and the software, so every screen from data entry to final result had to be designed around the reality of a person typing numbers off a scanner display under event-floor time pressure.",
              },
              {
                num: "02",
                title: "OTP Verification via WhatsApp",
                desc: "Customers verify their identity through an OTP sent to WhatsApp, a requirement set from the beginning of the project rather than a decision made during design.",
              },
              {
                num: "03",
                title: "One Report, Many Combinations",
                desc: "Because there was no system to auto-generate PDFs, every meaningful combination coming out of the decision tree, normal across the board, overweight with low muscle, underweight with very high visceral fat, and others, was designed as its own report layout, each following the same visual grammar (score, ideal range, recommendation) so results stayed consistent even though every page was built by hand.",
              },
              {
                num: "04",
                title: "Result Delivery",
                desc: "Once verified, the customer's personalized results, along with tailored nutrition and lifestyle tips based on their age and gender, and a relevant Anlene product recommendation, are shared back through WhatsApp.",
              },
            ].map(({ num, title, desc }) => (
              <div key={num} className="px-6 py-6" style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px" }}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-xs font-bold text-[#DB3E8C] px-2 py-0.5 rounded bg-[#DB3E8C]/10">{num}</span>
                  <h3 className="font-sans text-base font-bold" style={{ color: N }}>{title}</h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: BODY, lineHeight: 1.75 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <Hairline />

        {/* SECTION 06 · Design Evolution — Aug 2023 to Nov 2024 */}
        <div>
          <SectionTag id="evolution" num="06" label="Design Evolution — Aug 2023 to Nov 2024" />
          <div className="p-8" style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px" }}>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={16} style={{ color: C }} />
              <MonoTag accent>[REBRANDING & BRAND-ALIGNED HANDOFF]</MonoTag>
            </div>
            <h3 className="font-display text-xl font-bold mb-4" style={{ color: N }}>
              Implementing a Brand-Aligned Handoff
            </h3>
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: BODY, lineHeight: 1.8 }}>
              The core work, solving the client's three original complaints, building the decision tree, and designing every result-combination report, happened across Aug–Oct 2024. In November, still within the same engagement, Anlene's branding team provided a new visual direction to align with their internal branding standards, rebranded from "Anlene HealthPassport" to "Anlene Bone Health Check," including a more clinical-feeling layout referencing a bone density curve (mass vs. age, by gender, with a menopause marker). My role in this phase was translating that branding-provided design into Figma, keeping the underlying decision logic and report structure intact while the presentation layer was updated.
            </p>
          </div>
        </div>

        <Hairline />

        {/* SECTION 07 · Design Process & Workflow */}
        <div>
          <SectionTag id="process" num="07" label="Design Process & Workflow" />
          <div className="space-y-4">
            {[
              {
                step: "01",
                phase: "Phase 01",
                title: "Discovery Under Constraint",
                desc: "Built two FigJam customer journey maps from secondhand research (Instagram, YouTube) in the absence of direct field access.",
              },
              {
                step: "02",
                phase: "Phase 02",
                title: "Decision Logic First",
                desc: "Mapped every metric's classification thresholds by gender before touching any visual design, so every downstream report screen had a clear, defensible basis.",
              },
              {
                step: "03",
                phase: "Phase 03",
                title: "Cross-Functional Collaboration",
                desc: "Worked directly with a nutritionist to validate health recommendations tied to each result category, ensuring content wasn't just visually clear but medically sound.",
              },
              {
                step: "04",
                phase: "Phase 04",
                title: "Manual-at-Scale Execution",
                desc: "Designed each result-combination report individually in Figma, since no auto-generation system existed, giving both developers and the client a concrete, approvable reference for every scenario.",
              },
              {
                step: "05",
                phase: "Phase 05",
                title: "Brand Handoff Implementation",
                desc: "Translated a new visual direction from Anlene's branding team into Figma in November, preserving the decision logic and report structure from the original phase.",
              },
            ].map(({ step, phase, title, desc }) => (
              <div key={step} className="flex flex-col sm:flex-row gap-4 sm:gap-6 px-6 py-5" style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px" }}>
                <div className="flex items-center gap-3 sm:flex-col sm:items-start sm:gap-1 flex-shrink-0 min-w-[120px]">
                  <span className="font-mono text-xs font-bold text-[#DB3E8C]">{step} · {phase}</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-1" style={{ color: N }}>{title}</h4>
                  <p className="text-sm leading-relaxed" style={{ color: BODY, lineHeight: 1.75 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Hairline />

        {/* SECTION 08 · Business Impact & Key Deliverables */}
        <div>
          <SectionTag id="deliverables" num="08" label="Business Impact & Key Deliverables" />
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                Icon: CheckCircle2,
                title: "Solved the Original Complaint, Directly",
                desc: "Addressed all three issues the client raised about the prior tool: incomplete Omron data display, generic results, and lack of actionable recommendation detail.",
              },
              {
                Icon: GitBranch,
                title: "A Defensible Decision System",
                desc: "Every color, category, and recommendation traced back to an explicit decision tree, not a subjective visual choice, giving the client and dev team a clear basis for approval.",
              },
              {
                Icon: Users,
                title: "Cross-Functional Health Content",
                desc: "Nutrition and lifestyle recommendations were developed with a nutritionist, not written independently, keeping the health guidance credible.",
              },
              {
                Icon: Layers,
                title: "Brand-Aligned Implementation",
                desc: "Translated a new visual direction provided by Anlene's branding team into Figma, preserving the underlying decision logic and report structure while updating the presentation layer to meet internal branding standards.",
              },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="flex gap-5 px-6 py-5" style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px" }}>
                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: `${C}08`, border: `1px solid ${C}20`, borderRadius: "4px" }}>
                  <Icon size={14} style={{ color: C }} />
                </div>
                <div>
                  <p className="text-sm font-semibold mb-1.5" style={{ color: N }}>{title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: BODY, lineHeight: 1.75 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Hairline />

        {/* SECTION 09 · Key Impact & "So What" */}
        <div>
          <SectionTag id="impact" num="09" label={"Key Impact & \"So What\""} />
          
          <div className="p-8 bg-[#111836] rounded-2xl border border-white/10 text-white space-y-6 shadow-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] animate-pulse" />
              <span className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-[#22c55e]">
                SYSTEM OUTCOME & DESIGN VALIDATION
              </span>
            </div>

            <p className="font-display text-lg lg:text-xl font-light leading-relaxed text-white/90">
              A field health check tool rebuilt from an explicit decision tree, two constrained-research journey maps, and close collaboration with a nutritionist, resolving specific complaints about a prior version and holding up well enough to return for a second phase over a year later.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 text-xs text-white/80">
                <span className="font-bold text-[#DB3E8C]">•</span>
                <span><strong className="text-white">Explicit Decision Logic</strong> — Five metrics, split by gender, mapped to clear categories before any screen was designed.</span>
              </div>
              <div className="flex items-start gap-3 text-xs text-white/80">
                <span className="font-bold text-[#DB3E8C]">•</span>
                <span><strong className="text-white">Constrained-Research Methodology</strong> — Built accurate journey maps without direct field access, using existing documentation.</span>
              </div>
              <div className="flex items-start gap-3 text-xs text-white/80">
                <span className="font-bold text-[#DB3E8C]">•</span>
                <span><strong className="text-white">Cross-Functional Content</strong> — Health recommendations developed with a nutritionist, not assumed.</span>
              </div>
            </div>

            {/* WHAT I LEARNED Box */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-white space-y-2 mt-6">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-[#DB3E8C]" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#DB3E8C]">
                  WHAT I LEARNED
                </span>
              </div>
              <p className="text-xs sm:text-sm font-sans leading-relaxed text-white/90 italic" style={{ lineHeight: 1.8 }}>
                "Designing without direct field access taught me that secondhand research, done thoroughly, can still produce a defensible design system. Building the decision tree before touching any screen meant every downstream choice had a clear basis I could explain to both the client and the dev team."
              </p>
            </div>

            {/* Why This Matters to a Hiring Manager */}
            <div className="mt-8 p-6 rounded-xl bg-[#DB3E8C]/15 border border-[#DB3E8C]/40 text-white space-y-3">
              <div className="flex items-center gap-2">
                <MessageSquare size={16} className="text-[#DB3E8C]" />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#DB3E8C]">
                  WHY THIS MATTERS TO A HIRING MANAGER
                </span>
              </div>
              <p className="text-xs sm:text-sm font-sans leading-relaxed text-white/95 italic">
                "This project shows I can work backward from a client's specific complaints to a concrete decision system, then execute against it manually at scale when no automation exists to do it for me. It also shows I can do credible research even without direct field access, and that I can implement a brand's visual direction into a working design system without losing the logic underneath it."
              </p>
            </div>
          </div>
        </div>

          </div>
        </div>
      </div>

      {/* Back CTA */}
      <div style={{ borderTop: `1px solid ${HAIR}`, backgroundColor: W }}>
        <div className="px-8 lg:px-16 py-8 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-6">
            {onPrev && (
              <button
                onClick={onPrev}
                className="flex items-center gap-2 font-sans text-[10px] font-semibold tracking-widest uppercase transition-opacity hover:opacity-60"
                style={{ color: N }}
              >
                <ArrowLeft size={12} /> Previous Case
              </button>
            )}
            <button
              onClick={onBack}
              className="flex items-center gap-2 font-sans text-[10px] font-semibold tracking-widest uppercase transition-opacity hover:opacity-60"
              style={{ color: N }}
            >
              Back to Portfolio
            </button>
          </div>
          {onNext && (
            <button
              onClick={onNext}
              className="flex items-center gap-2 font-sans text-[10px] font-semibold tracking-widest uppercase transition-opacity hover:opacity-60"
              style={{ color: N }}
            >
              Next Case <ChevronRight size={12} />
            </button>
          )}
        </div>
      </div>

    </div>
  )
}
