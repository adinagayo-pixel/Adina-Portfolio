import { useState, useEffect } from "react"
import { CaseStudyHeaderBadge } from "@/app/components/ui/CaseStudyHeaderBadge"
import { CaseStudyDisclosure, CaseStudyFacts } from "@/app/components/ui/CaseStudyStory"

import {
  ArrowLeft, ChevronRight, CheckCircle2, Globe, Home,
  FileCode2, LayoutGrid, Zap, Share2, Target, Clock, MessageSquare, ChevronDown, Sparkles
} from "lucide-react"

import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback"
import persona1 from "@/imports/image-11.jpg"
import persona2 from "@/imports/image-12.jpg"
import persona3 from "@/imports/image-13.jpg"
import persona4 from "@/imports/image-14.jpg"
import ci1 from "@/imports/CI1.jpg"
import ci2 from "@/imports/CI2.jpg"
import ci3 from "@/imports/CI3.jpg"
import ci4 from "@/imports/CI4.jpg"

const N = "#19244E"
const C = "#DB3E8C"
const W = "#ffffff"
const S = "#F9FAFB"
const HAIR = `rgba(25,36,78,0.10)`
const BODY = "#2E3A5C"

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

function Hairline() {
  return <div className="w-full h-px" style={{ backgroundColor: HAIR }} />
}

function SectionTag({ id, num, label }: { id?: string; num: string; label: string }) {
  return (
    <div id={id} className="mb-10 scroll-mt-24">
      <span aria-hidden="true" className="block font-display font-medium leading-none text-[#DB3E8C]/30 text-6xl lg:text-7xl mb-4">
        {num}
      </span>
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

export default function GegiCase({ onBack, onNext, onPrev }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [activeZoomImg, setActiveZoomImg] = useState<{ title: string; img: string; desc: string } | null>(null)
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

  const PERSONAS = [
    { img: persona1, name: "Steady Pom Pi Pi", desc: "High CI readiness, fully covered & confident.", bg: "#E8F5EC" },
    { img: persona2, name: "Agak-Agak Planner", desc: "Partially covered, planning but not quite there.", bg: "#FDF3E3" },
    { img: persona3, name: "Hopeful Thinker", desc: "Low coverage, optimistic yet underinsured.", bg: "#EEF2FB" },
    { img: persona4, name: "YOLO Warrior", desc: "Critical gap, living in the moment, unprotected.", bg: "#FDE8EF" },
  ]

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

          <CaseStudyHeaderBadge caseNum="07" />
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
                  <span className={`font-mono text-[11px] ${isActive ? "text-white" : "text-[#DB3E8C]"}`}>
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
      <div className="px-4 sm:px-8 lg:px-16 pt-12 sm:pt-16 pb-10 sm:pb-14" style={{ backgroundColor: W, borderBottom: `1px solid ${HAIR}` }}>
        <div className="space-y-6 mb-10 lg:mb-12">
          <div className="flex flex-wrap items-center gap-3">
            <MonoTag accent>CASE STUDY 07</MonoTag>
            <span style={{ color: HAIR }}>/</span>
            <MonoTag>FINTECH & GAMIFIED CAMPAIGN</MonoTag>
            <span style={{ color: HAIR }}>/</span>
            <MonoTag>GREAT EASTERN SINGAPORE · 2026</MonoTag>
          </div>
          <h1
            className="font-display font-bold leading-[1.08] tracking-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3.6rem)", color: N }}
          >
            A Two Week Quiz Campaign That Shows People Their Critical Illness Protection Gap
          </h1>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-start">
          <div className="space-y-6">


            <p
              className="font-display font-medium leading-relaxed"
              style={{ fontSize: "clamp(1rem, 1.8vw, 1.45rem)", color: N, letterSpacing: "-0.01em", lineHeight: 1.6 }}
            >
              A web quiz for Great Eastern Singapore that turns a short set of questions into one of four persona results, each with a shareable card. I took it from an early visual concept to a complete, responsive product in two weeks.
            </p>

            <CaseStudyFacts
              facts={[
                { label: "My contribution", value: "Lead product designer and UX architect: UX flow, responsive layouts, and interaction logic." },
                { label: "Team & scope", value: "Great Eastern Singapore (GEGI), with an internal graphic designer and a freelance illustrator. Interactive web app and share cards." },
                { label: "Verified impact", value: "An interactive web app with 4 localized persona outcomes, with illustrations delivered in under 24 hours." },
                { label: "Not measured here", value: "Campaign reach and lead figures." },
              ]}
            />
          </div>

          {/* Right Column: Hero Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#111836] group">

            <img
              src={ci1}
              alt="GEGI Campaign Preview"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 text-sm font-sans">
          <div className="p-4 border-l border-[#19244E]/15">
            <span className="block text-xs font-bold tracking-widest text-[#19244E]/60 uppercase mb-1.5">01 · Context</span>
            <p className="text-sm leading-relaxed text-[#2E3A5C]">An engaging campaign to show users their critical illness protection gaps.</p>
          </div>
          <div className="p-4 border-l border-[#19244E]/15">
            <span className="block text-xs font-bold tracking-widest text-[#19244E]/60 uppercase mb-1.5">02 · Constraints</span>
            <p className="text-sm leading-relaxed text-[#2E3A5C]">A 2 week sprint, a palette pivot from red to cream, and a 24h illustration turnaround.</p>
          </div>
          <div className="p-4 border-l border-[#19244E]/15">
            <span className="block text-xs font-bold tracking-widest text-[#19244E]/60 uppercase mb-1.5">03 · Key Decisions</span>
            <p className="text-sm leading-relaxed text-[#2E3A5C]">The brand palette pivot, auto advance questions, and a second illustrator to support the team.</p>
          </div>
          <div className="p-4 border-l border-[#19244E]/15">
            <span className="block text-xs font-bold tracking-widest text-[#19244E]/60 uppercase mb-1.5">04 · Solution & Evidence</span>
            <p className="text-sm leading-relaxed text-[#2E3A5C]">An interactive web app with 4 localized personas and Instagram-ready share cards.</p>
          </div>
          <div className="p-4 border-l border-[#19244E]/15">
            <span className="block text-xs font-bold tracking-widest text-[#19244E]/60 uppercase mb-1.5">05 · Outcome</span>
            <p className="text-sm leading-relaxed text-[#2E3A5C]">The first Singapore project delivered by our company, praised by GEGI leadership in 2026.</p>
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
                <span className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase text-[#DB3E8C]">
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
                      <span className={`font-mono text-[11px] shrink-0 pt-0.5 ${isActive ? "text-white" : "text-[#DB3E8C]"}`}>
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
          <div className="space-y-20 lg:space-y-28 min-w-0">

        {/* 01 Context */}
        <div>
          <SectionTag id="context" num="01" label="Context: A Campaign to Show Protection Gaps" />
          <div className="space-y-5 font-sans text-base leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.8 }}>
            <p>
              Great Eastern Singapore needed an engaging digital campaign to show users their critical illness protection gaps.
            </p>
            <p>
              The project started from an initial UI concept by our internal graphic designer, with a dominant red palette, already presented to leadership. When I joined, I turned that concept into a complete product: UX flow, responsive desktop and mobile layouts, and interaction logic based on GEGI's calculation spreadsheet for their 4 persona outcomes.
            </p>
          </div>
        </div>

        <Hairline />

        {/* 02 Constraints */}
        <div>
          <SectionTag id="constraints" num="02" label="Constraints: A Two Week Sprint, a Palette Pivot, a Tight Illustration Turnaround" />
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: "A 2 week sprint", desc: "The campaign had to be built and client approved within two weeks." },
              { title: "A palette pivot", desc: "After the first presentation, GEGI moved the project from red to its signature light cream tones." },
              { title: "A 24h illustration turnaround", desc: "Midway through, the internal illustration drafts had not captured the right tone, and the designer was overloaded." },
            ].map(({ title, desc }) => (
              <div key={title} className="p-6 bg-white rounded-xl border border-gray-200/80 shadow-xs space-y-3">
                <h4 className="font-bold text-[#19244E] text-base">{title}</h4>
                <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <Hairline />

        {/* 03 Key Decisions */}
        <div>
          <SectionTag id="decisions" num="03" label="Key Decisions: The Palette, the Flow, and the Illustrator" />

          <div className="space-y-6">
            <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-xs space-y-3">
              <span className="text-xs font-bold text-[#DB3E8C] uppercase tracking-wider block">Decision 01 · Pivot to the brand palette</span>
              <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">
                <strong className="text-[#19244E]">The pressure:</strong> GEGI asked to move from the dominant red palette to their light cream tones.
              </p>
              <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">
                <strong className="text-[#19244E]">What I did:</strong> I requested their complete brand guidelines, and realigned typography and color tokens to match.
              </p>
              <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">
                <strong className="text-[#19244E]">Why it held:</strong> The product felt consistent with GEGI's digital identity, not like a throwaway campaign view.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-xs space-y-3">
              <span className="text-xs font-bold text-[#DB3E8C] uppercase tracking-wider block">Decision 02 · Auto advance instead of a Next tap</span>
              <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">
                <strong className="text-[#19244E]">The pressure:</strong> A Next tap at every question added an unnecessary step.
              </p>
              <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">
                <strong className="text-[#19244E]">What I did:</strong> Selecting an answer moves the user to the next question. The final question keeps an explicit "View My Result" button.
              </p>
              <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">
                <strong className="text-[#19244E]">Why it held:</strong> Users get one clear moment of pause before they submit.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-xs space-y-3">
              <span className="text-xs font-bold text-[#DB3E8C] uppercase tracking-wider block">Decision 03 · Bring in a second illustrator, not replace anyone</span>
              <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">
                <strong className="text-[#19244E]">The pressure:</strong> The internal designer was overloaded, and the drafts did not capture the tone.
              </p>
              <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">
                <strong className="text-[#19244E]">What I did:</strong> I proposed a freelance illustrator I had worked with before. Revi delivered about 25 game assets in under 24 hours, which became the 4 personas.
              </p>
              <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">
                <strong className="text-[#19244E]">Why it held:</strong> The internal designer was supported, not replaced, and the timeline held.
              </p>
            </div>
          </div>
        </div>

        <Hairline />

        {/* 04 Solution & Evidence */}
        <div>
          <SectionTag id="solution" num="04" label="Solution & Evidence: Personas, Screens, and Share Cards" />

          <div className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <MonoTag accent>[GEGI SINGAPORE · 4 LOCALIZED PERSONAS]</MonoTag>
                <h3 className="font-display text-xl font-bold text-[#19244E] mt-1">
                  Custom Illustration Outcome Cards
                </h3>
              </div>
              <span className="font-sans text-xs text-gray-500 tracking-widest uppercase hidden sm:inline">
                Delivered in under 24 hours
              </span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {PERSONAS.map((p) => (
                <div
                  key={p.name}
                  onClick={() => setActiveZoomImg({ title: p.name, img: p.img, desc: p.desc })}
                  className="bg-white border border-gray-200 rounded-xl p-3 flex flex-col justify-between group hover:border-[#DB3E8C]/50 transition-all duration-300 cursor-pointer shadow-xs"
                >
                  <div className="aspect-square rounded-lg overflow-hidden border border-gray-200 mb-3 p-2 relative flex items-center justify-center" style={{ backgroundColor: p.bg }}>
                    <img src={p.img} alt={p.name} className="max-h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div>
                    <h4 className="font-sans text-xs font-bold text-[#19244E] mb-1 tracking-wide">{p.name}</h4>
                    <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-10 grid sm:grid-cols-2 gap-4">
            {[
              { title: "01 · Critical Illness Question Engine", img: ci1, desc: "Auto advance question flow with localized SG insurance terminology." },
              { title: "02 · Interactive Persona Outcome Card", img: ci2, desc: "Personalized protection gap result with custom character illustration." },
              { title: "03 · Lucky Draw Lead Capture", img: ci3, desc: "Form collection for NRIC and WhatsApp details paired with Agent IAC." },
              { title: "04 · Instagram Story Share Card", img: ci4, desc: "16:9 formatted outcome card designed for organic social sharing." },
            ].map(({ title, img, desc }) => (
              <div
                key={title}
                onClick={() => setActiveZoomImg({ title, img, desc })}
                className="bg-white border border-gray-100 rounded-xl p-3 shadow-xs hover:border-[#DB3E8C]/40 transition-colors cursor-pointer"
              >
                <div className="aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 mb-2 border border-gray-100">
                  <img src={img} alt={title} className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300" />
                </div>
                <h4 className="font-sans text-xs font-bold text-[#19244E]">{title}</h4>
                <p className="font-sans text-sm text-[#2E3A5C] mt-0.5">{desc}</p>
              </div>
            ))}
          </div>

          <div className="space-y-5 font-sans text-base leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.8 }}>
            <p>
              Anticipating that result sharing might not be prioritized before launch, I designed Instagram-ready result cards for each persona, and confirmed the dimensions with the PM. The cards became part of the campaign's organic growth loop.
            </p>
            <p>
              For development, I prepared an SVG asset library with default, selected, and hover states, and defined the lucky draw fields: full name, email, WhatsApp number, NRIC, and Agent IAC. AEM integration and backend data handling were done by developers.
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
                <span className="text-[11px] font-bold tracking-wider uppercase text-[#DB3E8C] font-sans block">Shipped</span>
                <h5 className="font-bold text-base text-[#19244E]">An interactive web app</h5>
                <p className="text-sm text-[#2E3A5C] leading-relaxed">With 4 localized persona outcomes and an AEM developer spec.</p>
              </div>
              <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs space-y-2">
                <span className="text-[11px] font-bold tracking-wider uppercase text-[#DB3E8C] font-sans block">Shared</span>
                <h5 className="font-bold text-base text-[#19244E]">Instagram share cards</h5>
                <p className="text-sm text-[#2E3A5C] leading-relaxed">Designed for organic sharing beyond the quiz itself.</p>
              </div>
              <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs space-y-2">
                <span className="text-[11px] font-bold tracking-wider uppercase text-[#DB3E8C] font-sans block">Not measured here</span>
                <h5 className="font-bold text-base text-[#19244E]">Campaign results</h5>
                <p className="text-sm text-[#2E3A5C] leading-relaxed">This case does not include reach or lead figures.</p>
              </div>
            </div>

            <div className="font-sans text-base leading-relaxed text-[#2E3A5C] space-y-5" style={{ lineHeight: 1.8 }}>
              <p>
                The first Singapore project delivered by our company, praised by GEGI leadership in 2026.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-gray-200 space-y-2">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#19244E]">WHAT I LEARNED</span>
              <p className="text-sm font-sans leading-relaxed text-[#2E3A5C] italic" style={{ lineHeight: 1.8 }}>
                "Taking over a concept someone else already started taught me that ownership is not about starting from zero: it is about being willing to fully commit to a direction I did not choose myself, while still pushing back when the brief genuinely needed to change, like the color pivot and bringing in extra illustration support."
              </p>
            </div>
          </div>
        </div>

          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Zoom Modal */}


      {activeZoomImg && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl p-6 lg:p-12 flex flex-col items-center justify-center animate-fade-in"
          onClick={() => setActiveZoomImg(null)}
        >
          <div className="absolute top-6 right-6 flex items-center gap-4">
            <span className="text-white/60 text-xs font-sans">Click anywhere or press ESC to close</span>
            <button
              onClick={() => setActiveZoomImg(null)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Close ✕
            </button>
          </div>
          <div
            className="max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeZoomImg.img}
              alt={activeZoomImg.title}
              className="max-w-full max-h-[72vh] object-contain rounded-xl shadow-2xl border border-white/10 mb-4"
            />
            <h3 className="text-white font-display text-xl font-bold text-center mb-1">{activeZoomImg.title}</h3>
            <p className="text-white/70 text-sm font-sans text-center max-w-xl">{activeZoomImg.desc}</p>
          </div>
        </div>
      )}
    </div>
  )
}

