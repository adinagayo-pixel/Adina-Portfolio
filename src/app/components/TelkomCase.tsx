import { useState, useEffect } from "react"
import { CaseStudyHeaderBadge } from "@/app/components/ui/CaseStudyHeaderBadge"
import { CaseStudyDisclosure, CaseStudyFacts } from "@/app/components/ui/CaseStudyStory"
import telkomSiagaVideo from "@/imports/telkom-siaga.mp4"
import telkomCurvedLedDisplay from "@/imports/telkom-curved-led-display.png"
import telkomCurationDashboard from "@/imports/telkom-curation-dashboard.png"
import { Home, ChevronDown, X } from "lucide-react"

const N = "#19244E"
const C = "#DB3E8C"
const W = "#ffffff"
const S = "#F9FAFB"
const HAIR = `rgba(25,36,78,0.10)`

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

export default function TelkomCase({ onBack, onNext, onPrev }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [activeQuickId, setActiveQuickId] = useState<string>("context")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<{
    src: string
    title: string
    badge: string
    desc: string
  } | null>(null)

  useEffect(() => {
    window.scrollTo({ top: 0 })
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("keydown", handleKeyDown)
    }
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

          <CaseStudyHeaderBadge caseNum="09" />
        </div>

        {/* Mobile Collapsible Quick Jump Bar */}
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
      <div className="px-4 sm:px-8 lg:px-16 pt-12 sm:pt-16 pb-10 sm:pb-14" style={{ backgroundColor: W, borderBottom: `1px solid ${HAIR}` }}>
        <div className="space-y-6 mb-10 lg:mb-12">
          <div className="flex flex-wrap items-center gap-3">
            <MonoTag accent>CASE STUDY 09</MonoTag>
            <span style={{ color: HAIR }}>/</span>
            <MonoTag>INTERACTIVE PUBLIC DISPLAY</MonoTag>
            <span style={{ color: HAIR }}>/</span>
            <MonoTag>TELKOM SIAGA x SUBCONTRACT · 2025</MonoTag>
          </div>
          <h1
            className="font-display font-bold leading-[1.08] tracking-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3.6rem)", color: N }}
          >
            Refining a Nationwide Greeting Wall: From Mobile Input to Curated LED Display
          </h1>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-start">
          <div className="space-y-6">

            <p
              className="font-display font-medium leading-relaxed"
              style={{ fontSize: "clamp(1rem, 1.8vw, 1.45rem)", color: N, letterSpacing: "-0.01em", lineHeight: 1.6 }}
            >
              Visual design and interactive prototypes for a three touchpoint holiday campaign: mobile input, a curation dashboard, and a custom curved LED wall at Telkomsel HQ.
            </p>

            <CaseStudyFacts
              facts={[
                { label: "My contribution", value: "UI designer: visual refinement, interactive prototypes, screen mockups, and developer handoff." },
                { label: "Team & scope", value: "Freelance subcontract with one point of contact, the fullstack developer. One week sprint." },
                { label: "Verified impact", value: "Live on the curved LED wall in the Telkomsel HQ lobby." },
                { label: "Not measured here", value: "Submission volume and display engagement. This case has no usage numbers." },
              ]}
            />
          </div>

          {/* Right Column: Hero Video Showcase Card */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#111836] group">
            <video
              src={telkomSiagaVideo}
              autoPlay
              loop
              muted
              playsInline
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
            <p className="text-sm leading-relaxed text-[#2E3A5C]">Greetings from every Telkomsel branch, curated for one curved LED wall in the HQ lobby.</p>
          </div>
          <div className="p-4 border-l border-[#19244E]/15">
            <span className="block text-xs font-bold tracking-widest text-[#19244E]/60 uppercase mb-1.5">02 · Constraints</span>
            <p className="text-sm leading-relaxed text-[#2E3A5C]">A 1 week sprint, one point of contact, a custom curved screen, and non overlapping bubbles.</p>
          </div>
          <div className="p-4 border-l border-[#19244E]/15">
            <span className="block text-xs font-bold tracking-widest text-[#19244E]/60 uppercase mb-1.5">03 · Key Decisions</span>
            <p className="text-sm leading-relaxed text-[#2E3A5C]">Separate approval and live toggles, two bubble layouts, and the logo moved into flat safe zones.</p>
          </div>
          <div className="p-4 border-l border-[#19244E]/15">
            <span className="block text-xs font-bold tracking-widest text-[#19244E]/60 uppercase mb-1.5">04 · Solution & Evidence</span>
            <p className="text-sm leading-relaxed text-[#2E3A5C]">A mobile input form, a curation dashboard, and the live LED wall, with a handoff package.</p>
          </div>
          <div className="p-4 border-l border-[#19244E]/15">
            <span className="block text-xs font-bold tracking-widest text-[#19244E]/60 uppercase mb-1.5">05 · Outcome</span>
            <p className="text-sm leading-relaxed text-[#2E3A5C]">Shipped on time for the late December 2025 campaign.</p>
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
              <SectionTag id="context" num="01" label="Context: Greetings From Every Branch, One Lobby Screen" />

              <div className="space-y-5 font-sans text-base leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.8 }}>
                <p>
                  Telkomsel employees across Indonesia, from Bandung and Surabaya to Jakarta and other branches, submitted holiday greetings through a mobile form, choosing their branch from a dropdown. Every submission then converged on one physical LED wall in the lobby of Telkomsel headquarters.
                </p>
                <p>
                  The system had to handle nationwide submission volume and still keep the lobby screen neat and curated.
                </p>
              </div>
            </div>

            <Hairline />

            {/* 02 Constraints */}
            <div>
              <SectionTag id="constraints" num="02" label="Constraints: One Week, One Contact, One Curved Screen" />

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: "1 week sprint", desc: "A tight timeline for visual refinement, prototypes, and the handoff." },
                  { title: "One point of contact", desc: "All briefs and approvals ran through the fullstack developer. No direct client access." },
                  { title: "A custom curved screen", desc: "The LED wall follows the architectural ceiling cutouts, not a rectangle." },
                  { title: "Bubbles must not overlap", desc: "Three words from each submission stay readable, on screen and on the LED wall." },
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
              <SectionTag id="decisions" num="03" label="Key Decisions: Approval, Layout, and the Curve" />

              <div className="space-y-6">
                <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-xs space-y-3">
                  <span className="text-xs font-bold text-[#DB3E8C] uppercase tracking-wider block">Decision 01 · Approval and live display are two separate decisions</span>
                  <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">
                    <strong className="text-[#19244E]">The pressure:</strong> Nationwide submissions had to be screened, yet the lobby screen had to stay neat and curated.
                  </p>
                  <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">
                    <strong className="text-[#19244E]">What I did:</strong> The dashboard has two tiers. Tier 1 is content approval for appropriateness, language, and policy. Tier 2 is a live toggle that picks which approved messages appear on the LED wall.
                  </p>
                  <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">
                    <strong className="text-[#19244E]">Why it held:</strong> Admins control what the public sees in real time and can pace the queue.
                  </p>
                </div>

                <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-xs space-y-3">
                  <span className="text-xs font-bold text-[#DB3E8C] uppercase tracking-wider block">Decision 02 · Two layout modes for message bubbles</span>
                  <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">
                    <strong className="text-[#19244E]">The pressure:</strong> Bubbles must never overlap, but the number of messages varies.
                  </p>
                  <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">
                    <strong className="text-[#19244E]">What I did:</strong> I designed two layouts. Low volume uses larger bubble radii and more breathing space. High volume uses tighter grid spacing, so density never causes collisions.
                  </p>
                  <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">
                    <strong className="text-[#19244E]">Why it held:</strong> Each bubble stays readable at both volumes, on screen and on the LED wall.
                  </p>
                </div>

                <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-xs space-y-3">
                  <span className="text-xs font-bold text-[#DB3E8C] uppercase tracking-wider block">Decision 03 · Logo and key nodes move into the flat part of the screen</span>
                  <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">
                    <strong className="text-[#19244E]">The pressure:</strong> The first layout put the Telkomsel logo in the curved section, where it would clip on the live screen.
                  </p>
                  <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">
                    <strong className="text-[#19244E]">What I did:</strong> Working alongside the developer, I moved branding badges and interactive message nodes into flat safe zones, and documented them in a safe zone spec.
                  </p>
                  <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">
                    <strong className="text-[#19244E]">Why it held:</strong> The safe zone spec went into the handoff package for the developer to build against.
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <CaseStudyDisclosure label="Trade-off I accepted" summary="No involvement after the handoff">
                  <p>
                    I handed off the Figma prototype, the scaled LED assets, and the safe zone spec, then had no ongoing involvement. The live display depends on the developer applying that spec and those assets correctly.
                  </p>
                </CaseStudyDisclosure>
              </div>
            </div>

            <Hairline />

            {/* 04 Solution & Evidence */}
            <div>
              <SectionTag id="solution" num="04" label="Solution & Evidence: Three Touchpoints and a Handoff" />

              <p className="font-sans text-base leading-relaxed text-[#2E3A5C] mb-6" style={{ lineHeight: 1.8 }}>
                Three touchpoints work as one system. Click any image to zoom in.
              </p>

              <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-xs mb-6">
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#19244E] block mb-4">Three touchpoint system</span>
                <div className="grid md:grid-cols-3 gap-4 text-sm font-sans">
                  <div className="p-4 rounded-lg bg-[#F9FAFB] border border-gray-200">
                    <span className="font-bold text-[#19244E] block mb-1">1 · Branch mobile submission</span>
                    <span className="text-[#2E3A5C]">Employees pick their branch and enter a three word holiday greeting.</span>
                  </div>
                  <div className="p-4 rounded-lg bg-[#F9FAFB] border border-gray-200">
                    <span className="font-bold text-[#19244E] block mb-1">2 · Central curation portal</span>
                    <span className="text-[#2E3A5C]">Admins filter submissions by status, branch, and date range.</span>
                  </div>
                  <div className="p-4 rounded-lg bg-[#F9FAFB] border border-gray-200">
                    <span className="font-bold text-[#19244E] block mb-1">3 · HQ lobby LED display</span>
                    <span className="text-[#2E3A5C]">Curated, non overlapping message bubbles, broadcast live.</span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {[
                  { title: "01 · Curation dashboard", img: telkomCurationDashboard, badge: "Web Curation Console", desc: "Status filters, branch routing, and a live LED toggle for each approved message." },
                  { title: "02 · Curved LED wall at HQ", img: telkomCurvedLedDisplay, badge: "Physical Installation", desc: "Live installation in the Telkomsel HQ lobby, with branding placed in the flat safe zones." },
                ].map((item) => (
                  <div
                    key={item.title}
                    onClick={() => setSelectedImage({ src: item.img, title: item.title, badge: item.badge, desc: item.desc })}
                    className="bg-white border border-gray-200 rounded-xl p-3 flex flex-col justify-between group hover:border-[#DB3E8C]/50 transition-all duration-300 cursor-pointer shadow-xs"
                  >
                    <div className="aspect-[16/10] rounded-lg overflow-hidden border border-gray-200 mb-3 relative">
                      <img src={item.img} alt={item.title} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div>
                      <h4 className="font-sans text-xs font-bold text-[#19244E] mb-1 tracking-wide">{item.title}</h4>
                      <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-xs space-y-3">
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#19244E] block">Handoff package</span>
                <ul className="list-disc pl-5 space-y-2 font-sans text-sm leading-relaxed text-[#2E3A5C]">
                  <li>Figma interactive prototype for the mobile input and moderation dashboard</li>
                  <li>Scaled Photoshop assets for the LED display resolution</li>
                  <li>Screen safe zone specification for the curved ceiling</li>
                </ul>
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
                    <h5 className="font-bold text-base text-[#19244E]">Live LED wall at HQ</h5>
                    <p className="text-sm text-[#2E3A5C] leading-relaxed">Live in the Telkomsel HQ lobby for the late December 2025 campaign.</p>
                  </div>
                  <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs space-y-2">
                    <span className="text-[11px] font-bold tracking-wider uppercase text-[#DB3E8C] font-sans block">Delivered</span>
                    <h5 className="font-bold text-base text-[#19244E]">Moderation and layout specs</h5>
                    <p className="text-sm text-[#2E3A5C] leading-relaxed">A two tier dashboard and curved safe zone specs, handed off to the developer.</p>
                  </div>
                  <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs space-y-2">
                    <span className="text-[11px] font-bold tracking-wider uppercase text-[#DB3E8C] font-sans block">Not measured here</span>
                    <h5 className="font-bold text-base text-[#19244E]">Volume and engagement</h5>
                    <p className="text-sm text-[#2E3A5C] leading-relaxed">This case does not include submission counts or display engagement.</p>
                  </div>
                </div>

                <div className="p-6 bg-white rounded-xl border border-gray-200 space-y-2">
                  <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#19244E]">WHAT I LEARNED</span>
                  <p className="text-sm font-sans leading-relaxed text-[#2E3A5C] italic" style={{ lineHeight: 1.8 }}>
                    "Public content curation needs more than approve or reject. Separating eligible for display from currently displaying gives admins real time control over what a physical public space shows."
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full bg-[#0d142d] border border-white/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:px-6 border-b border-white/10 bg-[#141b36]">
              <div className="flex items-center gap-3">
                <span className="bg-[#DB3E8C]/20 border border-[#DB3E8C]/40 text-[#DB3E8C] text-[11px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">
                  {selectedImage.badge}
                </span>
                <h3 className="font-display font-bold text-white text-base">
                  {selectedImage.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                aria-label="Close preview"
                className="text-white/60 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Image Stage */}
            <div className="flex-1 overflow-auto p-3 sm:p-6 flex items-center justify-center bg-[#070b1a]">
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-auto h-auto max-h-[70vh] max-w-full object-contain rounded-lg shadow-2xl"
              />
            </div>

            {/* Footer with Description */}
            <div className="p-4 sm:px-6 border-t border-white/10 bg-[#141b36] text-sm text-white/80 font-sans leading-relaxed">
              {selectedImage.desc}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
