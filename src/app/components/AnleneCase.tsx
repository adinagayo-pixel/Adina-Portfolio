import { useState, useEffect } from "react"
import { CaseStudyHeaderBadge } from "@/app/components/ui/CaseStudyHeaderBadge"
import { CaseStudyDisclosure, CaseStudyFacts } from "@/app/components/ui/CaseStudyStory"

import {
  ArrowLeft, ChevronRight, FileText, Smartphone, Home,
  Activity, Heart, MessageSquare, Clipboard,
  CheckCircle2, Users, Zap, AlertTriangle, GitBranch, Search, Sparkles, Layers, ChevronDown
} from "lucide-react"

import anleneThumb from "@/imports/Anlene thumb.jpg"
import anleneThumb2 from "@/imports/anlene thumb 2.jpg"
import anleneThumb3 from "@/imports/anlene thumb 3.jpg"
import anleneThumb4 from "@/imports/anlene thumb 4.jpg"
import anleneThumb5 from "@/imports/anlene thumb 5.jpg"
import anleneThumb6 from "@/imports/anlene thumb 6.jpg"

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
  { id: "context", num: "01", label: "Context" },
  { id: "constraints", num: "02", label: "Constraints" },
  { id: "decisions", num: "03", label: "Key Decisions" },
  { id: "solution", num: "04", label: "Solution & Evidence" },
  { id: "outcome", num: "05", label: "Outcome & Reflection" },
]

export default function AnleneCase({ onBack, onNext, onPrev }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [activeQuickId, setActiveQuickId] = useState<string>("context")
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

      {/* Sticky top header & mobile quick jump stack */}
      <div className="sticky top-0 z-50 w-full">
        {/* White top nav */}
        <div
          className="flex items-center justify-between px-4 sm:px-8 lg:px-16 py-3 sm:py-3.5 transition-all duration-200"
          style={{
            backgroundColor: scrolled ? "rgba(255,255,255,0.95)" : W,
            backdropFilter: "blur(16px)",
            borderBottom: `1px solid ${HAIR}`,
          }}
        >
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault()
              onBack()
            }}
            className="flex items-center gap-1.5 font-sans text-xs font-bold tracking-widest uppercase transition-all duration-150 hover:opacity-75 cursor-pointer group"
            style={{ color: N }}
            title="Back to Home Portfolio"
          >
            <Home size={16} className="group-hover:scale-110 transition-transform" />
            <span>HOME</span>
          </a>

          <CaseStudyHeaderBadge caseNum="04" />
        </div>

        {/* Mobile Collapsible Quick Jump Bar - Flush underneath */}
        <div className="block lg:hidden bg-[#0e1635] text-white border-b border-white/10 shadow-lg">


        <button
          onClick={() => setMobileMenuOpen((v) => !v)}
          className="w-full px-6 py-3 flex items-center justify-between text-xs font-sans cursor-pointer focus:outline-none"
        >
          <div className="flex items-center gap-2.5 min-w-0">
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
      </div>


      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <div className="px-8 lg:px-16 pt-16 pb-14" style={{ backgroundColor: W, borderBottom: `1px solid ${HAIR}` }}>
        <div className="space-y-6 mb-10 lg:mb-12">
          <div className="flex flex-wrap items-center gap-3">
            <MonoTag accent>CASE STUDY 04</MonoTag>
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
        </div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-start">
          <div className="space-y-6">


            <p
              className="font-display font-medium leading-relaxed"
              style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.45rem)", color: N, letterSpacing: "-0.01em", lineHeight: 1.6 }}
            >
              Redesigning Anlene's field health check experience end to end, from decision logic to PDF report, after the client identified their existing tool as too generic and lacking real insight.
            </p>

            <CaseStudyFacts
              facts={[
                { label: "My contribution", value: "Sole product designer, working with a nutritionist on health content." },
                { label: "Team & scope", value: "Fonterra Indonesia for the Anlene brand. A field health check app for in-booth activations." },
                { label: "Verified impact", value: "The client returned for a second phase, over a year later." },
                { label: "Not measured here", value: "Activation, attendance, and sales numbers." },
              ]}
            />
          </div>

          {/* Right Column: Hero Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#111836] group">

            <img
              src={anleneThumb}
              alt="Anlene Health Passport Preview"
              className="w-full h-auto object-cover max-h-[380px] lg:max-h-[420px] rounded-2xl transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111836]/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      {/* 30 SECOND TAKEAWAYS: the five-stage story at a glance */}
      <div className="px-4 sm:px-8 lg:px-16 py-8 bg-[#F9FAFB] border-t border-b border-[#19244E]/10">
        <div className="flex items-center gap-2 mb-4">
          <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-[#19244E]/60">
            30 SECOND TAKEAWAYS
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 text-xs sm:text-sm font-sans">
          <div className="p-4 border-l border-[#19244E]/15">
            <span className="block text-xs font-bold tracking-widest text-[#19244E]/50 uppercase mb-1.5">01 · Context</span>
            <p className="text-xs sm:text-sm leading-relaxed text-[#2E3A5C]">Sales promoters run health check activations for Anlene, from a scan to a personalized result.</p>
          </div>
          <div className="p-4 border-l border-[#19244E]/15">
            <span className="block text-xs font-bold tracking-widest text-[#19244E]/50 uppercase mb-1.5">02 · Constraints</span>
            <p className="text-xs sm:text-sm leading-relaxed text-[#2E3A5C]">No field access, no hardware link, and no auto generated reports.</p>
          </div>
          <div className="p-4 border-l border-[#19244E]/15">
            <span className="block text-xs font-bold tracking-widest text-[#19244E]/50 uppercase mb-1.5">03 · Key Decisions</span>
            <p className="text-xs sm:text-sm leading-relaxed text-[#2E3A5C]">Two journey maps, a decision tree before any screen, and hand built reports.</p>
          </div>
          <div className="p-4 border-l border-[#19244E]/15">
            <span className="block text-xs font-bold tracking-widest text-[#19244E]/50 uppercase mb-1.5">04 · Solution & Evidence</span>
            <p className="text-xs sm:text-sm leading-relaxed text-[#2E3A5C]">A health check flow from manual scan entry to a personalized WhatsApp report.</p>
          </div>
          <div className="p-4 border-l border-[#19244E]/15">
            <span className="block text-xs font-bold tracking-widest text-[#19244E]/50 uppercase mb-1.5">05 · Outcome</span>
            <p className="text-xs sm:text-sm leading-relaxed text-[#2E3A5C]">Addressed all three client complaints, and the client returned for a second phase.</p>
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

        {/* 01 Context */}
        <div>
          <SectionTag id="context" num="01" label="Context: Health Checks Run by Sales Promoters" />
          <div className="space-y-5 font-sans text-sm sm:text-base leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.8 }}>
            <p>
              Anlene runs in-person health check activations. A sales promoter walks a customer through a bone density scan (Achilles) and a body composition scan (Omron), then delivers a personalized result.
            </p>
            <p>
              The client had already identified three gaps in the existing app: it showed only a handful of the Omron metrics, its results felt generic, and nothing connected each metric to a recommendation.
            </p>
          </div>
        </div>

        <Hairline />

        {/* 02 Constraints */}
        <div>
          <SectionTag id="constraints" num="02" label="Constraints: No Field Access, No Hardware Link, No Reports" />
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: "No direct field access", desc: "Research had to happen without being on site. I used Anlene's own Instagram coverage of past Health Checking Day events, and YouTube guides for the Achilles and Omron devices." },
              { title: "No hardware integration", desc: "Neither device connects to the app. Every result is typed in manually by an admin, so the interface had to be fast and error resistant under time pressure." },
              { title: "No auto generated reports", desc: "Nothing assembled a PDF from a customer's result combination. Each meaningful combination needed its own layout, following the green, yellow, and red logic." },
            ].map(({ title, desc }) => (
              <div key={title} className="p-6 bg-white rounded-xl border border-gray-200/80 shadow-xs space-y-3">
                <h4 className="font-bold text-[#19244E] text-base">{title}</h4>
                <p className="font-sans text-xs sm:text-sm text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <Hairline />

        {/* 03 Key Decisions */}
        <div>
          <SectionTag id="decisions" num="03" label="Key Decisions: Two Journeys, One Decision Tree, Hand Built Reports" />

          <div className="space-y-6">
            <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-xs space-y-3">
              <span className="text-xs font-bold text-[#DB3E8C] uppercase tracking-wider block">Decision 01 · Map two journeys, not one</span>
              <p className="font-sans text-sm text-gray-600 leading-relaxed">
                <strong className="text-[#19244E]">The pressure:</strong> Without field access, research had to rely on secondhand material.
              </p>
              <p className="font-sans text-sm text-gray-600 leading-relaxed">
                <strong className="text-[#19244E]">What I did:</strong> I built two FigJam journey maps, one for the customer and one for the SPG. Each covered actions, devices, questions, sentiment, and opportunities.
              </p>
              <p className="font-sans text-sm text-gray-600 leading-relaxed">
                <strong className="text-[#19244E]">Why it held:</strong> The maps surfaced friction such as being asked for a phone number again, and how long a result stays accessible.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-xs space-y-3">
              <span className="text-xs font-bold text-[#DB3E8C] uppercase tracking-wider block">Decision 02 · A decision tree before any screen</span>
              <p className="font-sans text-sm text-gray-600 leading-relaxed">
                <strong className="text-[#19244E]">The pressure:</strong> Every result needed a clear category, and the client's complaints were about generic results.
              </p>
              <p className="font-sans text-sm text-gray-600 leading-relaxed">
                <strong className="text-[#19244E]">What I did:</strong> I built a decision tree for five metrics (BMI, body fat, visceral fat, skeletal muscle, and T-score), split by gender, with Low, Normal, High, and Very High tiers.
              </p>
              <p className="font-sans text-sm text-gray-600 leading-relaxed">
                <strong className="text-[#19244E]">Why it held:</strong> It set the colors, the recommendations, and which combinations needed their own report. It also gave the client something concrete to approve.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-xs space-y-3">
              <span className="text-xs font-bold text-[#DB3E8C] uppercase tracking-wider block">Decision 03 · Hand build every report combination</span>
              <p className="font-sans text-sm text-gray-600 leading-relaxed">
                <strong className="text-[#19244E]">The pressure:</strong> No system could generate PDFs, so every meaningful combination needed its own layout.
              </p>
              <p className="font-sans text-sm text-gray-600 leading-relaxed">
                <strong className="text-[#19244E]">What I did:</strong> I designed each result combination report in Figma, all following the same grammar: score, ideal range, and recommendation.
              </p>
              <p className="font-sans text-sm text-gray-600 leading-relaxed">
                <strong className="text-[#19244E]">Why it held:</strong> Results stayed consistent, even though every page was built by hand.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <CaseStudyDisclosure label="Trade-off I accepted" summary="Slower than auto generation, but approvable">
              <p>
                Designing each report by hand took longer than auto generation would have. It also gave the client and developers a concrete, approvable reference for every scenario.
              </p>
            </CaseStudyDisclosure>
          </div>
        </div>

        <Hairline />

        {/* 04 Solution & Evidence */}
        <div>
          <SectionTag id="solution" num="04" label="Solution & Evidence: The Health Check Flow" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { title: "01 · Health Passport Main UI", img: anleneThumb, desc: "Personalized consumer health passport displaying body age, bone density T-score, and muscle metrics." },
              { title: "02 · Diagnostic Matrix View", img: anleneThumb2, desc: "4-tier color-coded health diagnostic ranges for fast consultation." },
              { title: "03 · Bone Scanner Output", img: anleneThumb3, desc: "Bone scanner integration and automated bone density status calculation." },
              { title: "04 · Field Intake System", img: anleneThumb4, desc: "Fast-entry offline form for event reps with zero data loss protection." },
              { title: "05 · Checkout & Redemption", img: anleneThumb5, desc: "In-booth product purchase completion and automated WhatsApp PDF dispatch." },
              { title: "06 · Reports & Analytics", img: anleneThumb6, desc: "Nationwide activation analytics tracking daily attendee intake per city." },
            ].map(({ title, img, desc }) => (
              <div key={title} className="bg-white border border-gray-200 rounded-xl p-3 flex flex-col justify-between">
                <div className="aspect-[16/10] rounded-lg overflow-hidden border border-gray-200 mb-3">
                  <img src={img} alt={title} className="w-full h-full object-cover object-top" />
                </div>
                <div>
                  <h4 className="font-sans text-xs font-bold text-[#19244E] mb-1 tracking-wide">{title}</h4>
                  <p className="font-sans text-xs text-gray-600 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {[
              { title: "01 · Manual entry, by design", desc: "An SPG scans the customer, then types both results into the app. No Bluetooth or API links the hardware to the software." },
              { title: "02 · OTP via WhatsApp", desc: "Customers verify their identity with an OTP sent to WhatsApp, a requirement set from the start of the project." },
              { title: "03 · One report, many combinations", desc: "Each combination from the decision tree got its own layout, with the same visual grammar." },
              { title: "04 · Result delivery", desc: "Verified customers receive their results, tailored tips by age and gender, and a product recommendation, through WhatsApp." },
            ].map(({ title, desc }) => (
              <div key={title} className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs space-y-2">
                <h5 className="font-bold text-sm text-[#19244E]">{title}</h5>
                <p className="font-sans text-xs text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="space-y-5 font-sans text-sm sm:text-base leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.8 }}>
            <p>
              The core work happened from August to October 2024. In November, Anlene's branding team provided a new visual direction, and I translated it into Figma while keeping the decision logic and report structure intact.
            </p>
          </div>
        </div>

        <Hairline />

        {/* 05 Outcome & Reflection */}
        <div>
          <SectionTag id="outcome" num="05" label="Outcome & Reflection" />

          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs space-y-2">
                <span className="text-[10px] font-bold tracking-wider uppercase text-[#10B981] font-sans block">Addressed</span>
                <h5 className="font-bold text-sm text-[#19244E]">All three complaints</h5>
                <p className="text-xs text-gray-600 leading-relaxed">Incomplete Omron data, generic results, and missing recommendations were each addressed.</p>
              </div>
              <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs space-y-2">
                <span className="text-[10px] font-bold tracking-wider uppercase text-[#DB3E8C] font-sans block">Returned</span>
                <h5 className="font-bold text-sm text-[#19244E]">A second phase</h5>
                <p className="text-xs text-gray-600 leading-relaxed">The client came back for a second phase, over a year later.</p>
              </div>
              <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs space-y-2">
                <span className="text-[10px] font-bold tracking-wider uppercase text-[#3B82F6] font-sans block">Not measured here</span>
                <h5 className="font-bold text-sm text-[#19244E]">Activation numbers</h5>
                <p className="text-xs text-gray-600 leading-relaxed">This case does not include attendance or sales figures.</p>
              </div>
            </div>

            <div className="p-6 bg-white rounded-xl border border-gray-200 space-y-2">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#19244E]">WHAT I LEARNED</span>
              <p className="text-xs sm:text-sm font-sans leading-relaxed text-[#2E3A5C] italic" style={{ lineHeight: 1.8 }}>
                "Designing without direct field access taught me that secondhand research, done thoroughly, can still produce a defensible design system. Building the decision tree before touching any screen meant every downstream choice had a clear basis I could explain to both the client and the dev team."
              </p>
            </div>
          </div>
        </div>

          </div>
        </div>
      </div>

    </div>
  )
}

