import { useState, useEffect } from "react"
import { CaseStudyHeaderBadge } from "@/app/components/ui/CaseStudyHeaderBadge"
import telkomSiagaVideo from "@/imports/telkom-siaga.mp4"
import {
  ArrowLeft, ChevronRight, CheckCircle2, Globe, Home,
  FileCode2, Shield, Zap, RefreshCw, GitBranch, Users, MessageSquare, Sparkles, AlertTriangle, ChevronDown, Monitor, Layout, Filter, Eye, Cpu
} from "lucide-react"

const N = "#19244E"
const C = "#DB3E8C"
const W = "#ffffff"
const S = "#F9FAFB"
const HAIR = `rgba(25,36,78,0.10)`
const BODY = "#2E3A5C"

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
  { id: "summary", num: "01", label: "Executive Summary" },
  { id: "scale", num: "02", label: "Scale: Nationwide to Single Touchpoint" },
  { id: "dashboard", num: "03", label: "Two Tier Moderation System" },
  { id: "bubbles", num: "04", label: "Non Overlapping Message Bubbles" },
  { id: "screen", num: "05", label: "Custom Shaped Screen Architecture" },
  { id: "handoff", num: "06", label: "Workflow and Handoff" },
  { id: "impact", num: "07", label: "Closing & Key Impact" },
]

export default function TelkomCase({ onBack, onNext, onPrev }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [activeQuickId, setActiveQuickId] = useState<string>("summary")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0 })
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

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
      <div className="px-8 lg:px-16 pt-16 pb-14" style={{ backgroundColor: W, borderBottom: `1px solid ${HAIR}` }}>
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-center">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <MonoTag accent>CASE STUDY 09</MonoTag>
              <span style={{ color: HAIR }}>/</span>
              <MonoTag>INTERACTIVE PUBLIC DISPLAY</MonoTag>
              <span style={{ color: HAIR }}>/</span>
              <MonoTag>TELKOM SIAGA x SUBCONTRACT · 2025</MonoTag>
            </div>

            <h1
              className="font-display font-bold leading-[1.08] tracking-tight"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.6rem)", color: N }}
            >
              Refining a Nationwide Greeting Wall: From Mobile Input to Curated LED Display
            </h1>

            <p
              className="font-display font-light leading-relaxed"
              style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.45rem)", color: N, letterSpacing: "-0.01em", lineHeight: 1.6 }}
            >
              Refined visual design and built working prototypes for a three touchpoint holiday campaign: nationwide mobile input, message curation dashboard, and a custom shaped LED wall at Telkomsel HQ, racing toward a December 2025 launch.
            </p>

            <p className="text-sm sm:text-base leading-relaxed" style={{ color: BODY, lineHeight: 1.8 }}>
              I served as the UI Designer on this pure visual subcontract under a tight 1 week deadline. This project focused on translating non standard physical constraints and nationwide submission volume into a seamlessly curated interactive lobby experience.
            </p>
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

      {/* EXECUTIVE SUMMARY & 30 SECOND TAKEAWAYS */}
      <div className="px-8 lg:px-16 py-8 bg-[#111836] border-t border-b border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-[#DB3E8C]">
            EXECUTIVE SUMMARY & 30 SECOND TAKEAWAYS
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs sm:text-sm font-sans">
          <div className="bg-white/5 p-4 rounded-lg border border-white/5">
            <span className="block text-xs font-bold tracking-widest text-white/50 uppercase mb-1.5">01 · Problem</span>
            <p className="text-xs sm:text-sm leading-relaxed text-white/85">Managing nationwide submission volume across all Telkomsel branches while displaying curated greetings on a physical LED wall in HQ lobby.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/5">
            <span className="block text-xs font-bold tracking-widest text-white/50 uppercase mb-1.5">02 · Core Constraints</span>
            <p className="text-xs sm:text-sm leading-relaxed text-white/85">1 week sprint deadline, custom curved ceiling screen architecture, strict requirement for non overlapping message bubbles.</p>
          </div>
          <div className="bg-[#DB3E8C]/10 p-4 rounded-lg border border-[#DB3E8C]/30">
            <span className="block text-xs font-bold tracking-widest text-[#DB3E8C] uppercase mb-1.5">03 · Exact Ownership</span>
            <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">UI Designer (Visual Refinement, Interactive Prototypes in Figma Make, Photoshop Screen Mockups & Developer Handoff).</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/5">
            <span className="block text-xs font-bold tracking-widest text-white/50 uppercase mb-1.5">04 · Key Impact</span>
            <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">Delivered a two tier moderation system and custom curved layout specs that shipped on time for late December 2025 campaign.</p>
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

            {/* 01 Executive Summary */}
            <div>
              <SectionTag id="summary" num="01" label="Executive Summary" />
              <div className="grid lg:grid-cols-2 gap-4">
                {[
                  { label: "Client & Initiative", val: "Telkomsel Siaga · Freelance Subcontract · 2025" },
                  { label: "Role & Scope", val: "UI Designer (Visual Refinement & Interactive Prototyping)" },
                  { label: "Core Product Suite", val: "Nationwide Mobile Input Form · Curation Dashboard · Custom Lobby LED Display Asset" },
                  { label: "Core Stack", val: "Figma Make · Photoshop · Screen Safe Zone Layout Engine" },
                ].map(({ label, val }) => (
                  <div key={label} className="px-6 py-5" style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px" }}>
                    <MonoTag>[{label}]</MonoTag>
                    <p className="text-sm font-medium mt-2" style={{ color: N, lineHeight: 1.6 }}>{val}</p>
                  </div>
                ))}
              </div>
            </div>

            <Hairline />

            {/* 02 Scale: Nationwide to a Single Physical Touchpoint */}
            <div>
              <SectionTag id="scale" num="02" label="Scale: Nationwide to a Single Physical Touchpoint" />

              <div className="space-y-5 font-sans text-sm sm:text-base leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.8 }}>
                <p>
                  Messages were collected from Telkomsel employees across all branches in Indonesia (Bandung, Surabaya, Jakarta, and others, selected via a location dropdown upon submission), yet everything converged onto a single physical LED wall in the lobby of Telkomsel headquarters.
                </p>
                <p>
                  This created a unique design challenge: the system needed to handle nationwide submission volume while keeping the final LED presentation neat and curated.
                </p>

                <div className="mt-6 p-6 rounded-2xl bg-white border border-[#19244E]/10 shadow-xs">
                  <span className="font-mono text-xs font-bold text-[#DB3E8C] uppercase tracking-wider block mb-3">
                    THREE TOUCHPOINT SYSTEM ARCHITECTURE
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div className="p-4 rounded-xl bg-[#F9FAFB] border border-[#19244E]/10">
                      <span className="font-bold text-[#19244E] block mb-1">1. Branch Mobile Submission</span>
                      <span className="text-[#19244E]/75">Employees select branch location and enter 3 word holiday greeting.</span>
                    </div>
                    <div className="p-4 rounded-xl bg-[#F9FAFB] border border-[#19244E]/10">
                      <span className="font-bold text-[#19244E] block mb-1">2. Central Curation Portal</span>
                      <span className="text-[#19244E]/75">Admin filters submissions by status, branch, and date range.</span>
                    </div>
                    <div className="p-4 rounded-xl bg-[#F9FAFB] border border-[#19244E]/10">
                      <span className="font-bold text-[#19244E] block mb-1">3. HQ Lobby LED Display</span>
                      <span className="text-[#19244E]/75">Live broadcast of curated non overlapping message bubbles.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Hairline />

            {/* 03 Two Tier Moderation System */}
            <div>
              <SectionTag id="dashboard" num="03" label="Curation Dashboard: Two Tier Moderation System" />

              <div className="space-y-5 font-sans text-sm sm:text-base leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.8 }}>
                <p>
                  The dashboard I designed serves as a full moderation tool where admins can filter messages by status (Pending Review, Approved, Rejected), branch location, and date range.
                </p>
                <p>
                  Once a message is approved, there is a separate toggle to select which messages are actively displayed on the LED. This means approval and live display are two distinct decisions, giving admins granular real time control over what the public sees in the lobby.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  <div className="p-5 rounded-2xl bg-white border border-[#19244E]/15 shadow-xs">
                    <div className="text-xs font-mono font-bold text-[#E01E26] uppercase mb-2">TIER 1: CONTENT APPROVAL</div>
                    <p className="text-xs text-[#2E3A5C] leading-relaxed">
                      Verifies submitted content for appropriateness, language compliance, and organizational policy guidelines.
                    </p>
                  </div>
                  <div className="p-5 rounded-2xl bg-white border border-[#19244E]/15 shadow-xs">
                    <div className="text-xs font-mono font-bold text-[#3B82F6] uppercase mb-2">TIER 2: LIVE BROADCAST TOGGLE</div>
                    <p className="text-xs text-[#2E3A5C] leading-relaxed">
                      Controls real time visibility on the lobby LED wall, enabling instant queue management and screen pacing.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Hairline />

            {/* 04 Design Constraint: Message Bubbles Must Not Overlap */}
            <div>
              <SectionTag id="bubbles" num="04" label="Design Constraint: Message Bubbles Must Not Overlap" />

              <div className="space-y-5 font-sans text-sm sm:text-base leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.8 }}>
                <p>
                  A key requirement was that the visual message bubble elements displaying three words from each submission must not overlap on screen, both in the digital version and when rendered onto the physical LED wall.
                </p>
                <p>
                  This required a flexible layout approach capable of accommodating varying message volumes (leading to two layout variations: Low Message Volume and High Message Volume) without compromising the readability of each bubble.
                </p>

                <div className="p-6 rounded-2xl bg-white border border-[#19244E]/10 shadow-xs mt-6">
                  <span className="font-mono text-xs font-bold text-[#19244E] uppercase tracking-wider block mb-4">
                    DYNAMIC VOLUME LAYOUT MODES
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-xl bg-[#F9FAFB] border border-[#19244E]/10">
                      <span className="font-bold text-[#DB3E8C] block mb-1">Low Message Volume Variation</span>
                      <p className="text-[#2E3A5C]">Larger bubble radiuses with expanded breathing space for maximum legibility during off peak hours.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-[#F9FAFB] border border-[#19244E]/10">
                      <span className="font-bold text-[#3B82F6] block mb-1">High Message Volume Variation</span>
                      <p className="text-[#2E3A5C]">Optimized grid spacing allowing high density greetings without visual collision or overlap.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Hairline />

            {/* 05 Physical Constraint: Custom Shaped Screen Architecture */}
            <div>
              <SectionTag id="screen" num="05" label="Physical Constraint: Custom Shaped Screen Architecture" />

              <div className="space-y-5 font-sans text-sm sm:text-base leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.8 }}>
                <p>
                  The LED wall in the lobby featured a custom curved shape conforming to the architectural ceiling cutouts, rather than a standard rectangular display.
                </p>
                <p>
                  The initial design placed the Telkomsel logo directly in the curved section, which would appear clipped when displayed live. Working alongside the developer, I revised the layout so crucial elements always fell within the flat section of the screen.
                </p>

                <div className="p-5 rounded-2xl bg-[#E01E26]/5 border border-[#E01E26]/20 flex items-start gap-4 mt-6">
                  <AlertTriangle className="text-[#E01E26] shrink-0 mt-0.5" size={20} />
                  <div className="text-xs text-[#19244E] leading-relaxed">
                    <span className="font-bold block mb-1">Architectural Adjustment</span>
                    Repositioned key branding badges and interactive message nodes away from curved display perimeters into safe flat surface zones to prevent physical clipping at HQ lobby.
                  </div>
                </div>
              </div>
            </div>

            <Hairline />

            {/* 06 Workflow and Developer Handoff */}
            <div>
              <SectionTag id="handoff" num="06" label="Workflow and Developer Handoff" />

              <div className="space-y-5 font-sans text-sm sm:text-base leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.8 }}>
                <p>
                  As this was a pure visual subcontract without an ideation stage (initial briefs and baseline mockups were provided by the developer), all communication and approvals ran through a single point of contact: the fullstack developer, rather than direct client contact with Telkomsel.
                </p>
                <p>
                  I prepared a comprehensive asset breakdown across multiple dimensions for implementation needs, followed by a complete handoff without ongoing involvement.
                </p>

                <div className="p-5 rounded-2xl bg-white border border-[#19244E]/10 shadow-xs font-mono text-xs text-[#19244E]/85 space-y-2 mt-6">
                  <div className="font-bold text-[#DB3E8C]">HANDOFF DELIVERABLE PACKAGE:</div>
                  <div>· Figma interactive prototype (mobile input & moderation dashboard)</div>
                  <div>· Scaled Photoshop assets for physical LED display resolution</div>
                  <div>· Screen safe zone specification for custom curved ceiling architecture</div>
                </div>
              </div>
            </div>

            <Hairline />

            {/* 07 Closing & Key Impact */}
            <div>
              <SectionTag id="impact" num="07" label="Closing & Key Impact" />

              <div className="p-8 bg-[#111836] rounded-2xl border border-white/10 text-white space-y-6 shadow-2xl">
                <div className="flex items-center gap-2">
                  <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-[#22c55e]">
                    SYSTEM OUTCOME & PRODUCT VALIDATION (2025)
                  </span>
                </div>

                <p className="font-sans text-sm sm:text-base text-white/90 leading-relaxed max-w-3xl">
                  Despite the tight 1 week timeline and restricted collaboration structure, translating physical screen constraints into precise layout safe zones ensured a flawless live launch matching the designed prototype.
                </p>

                {/* What I Learned */}
                <div className="mt-6 p-6 rounded-xl bg-white/5 border border-white/10 text-white space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#DB3E8C]">
                      WHAT I LEARNED
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-sans leading-relaxed text-white/95 italic" style={{ lineHeight: 1.8 }}>
                    "Public content curation systems require more than simple approval or rejection. Separating eligible for display from currently displaying provides admins with vital real time control for content showcased in physical public spaces."
                  </p>
                </div>

                {/* Why This Matters to a Hiring Manager */}
                <div className="mt-6 p-6 rounded-xl bg-[#DB3E8C]/15 border border-[#DB3E8C]/40 text-white space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#DB3E8C]">
                      WHY THIS MATTERS TO A HIRING MANAGER
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-sans leading-relaxed text-white/95 italic" style={{ lineHeight: 1.8 }}>
                    "This project demonstrates my ability to work effectively within restricted collaboration structures (single point of contact, no direct client access), translate non standard physical constraints into design decisions, and deliver clear handoffs executed accurately, resulting in an on time launch matching the designed prototype."
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
