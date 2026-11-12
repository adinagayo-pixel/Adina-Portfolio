import { useState, useEffect } from "react"
import { CaseStudyHeaderBadge } from "@/app/components/ui/CaseStudyHeaderBadge"
import { CaseStudyDisclosure, CaseStudyFacts } from "@/app/components/ui/CaseStudyStory"

import {
  ArrowLeft, ChevronRight, CheckCircle2, Globe, Home,
  Smartphone, BarChart2, Camera, MessageSquare,
  Shield, Database, MapPin, AlertCircle, Users, WifiOff, RefreshCw, Layers, CheckSquare, ChevronDown, Sparkles,
  X, Maximize2
} from "lucide-react"

import heroImg from "@/imports/image-9.jpg"
import eSaksiThumb from "@/imports/e-saksi thumb.jpg"
import electionVerificationCms from "@/imports/election-verification-cms.png"
import electionSainteLague from "@/imports/election-sainte-lague.png"
import electionKpuEntry from "@/imports/election-kpu-entry.png"

const N = "#19244E"
const C = "#DB3E8C"
const W = "#ffffff"
const S = "#F9FAFB"
const HAIR = `rgba(25,36,78,0.10)`
const BODY = "#2E3A5C"
const GOV = "#0F3460" // Deeper civic navy accent

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

export default function ElectionCase({ onBack, onNext, onPrev }: Props) {
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

          <CaseStudyHeaderBadge caseNum="03" />
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
      <div className="px-4 sm:px-8 lg:px-16 pt-12 sm:pt-16 pb-10 sm:pb-14" style={{ backgroundColor: W, borderBottom: `1px solid ${HAIR}` }}>
        <div className="space-y-6 mb-10 lg:mb-12">
          <div className="flex flex-wrap items-center gap-3">
            <MonoTag accent>CASE STUDY 03</MonoTag>
            <span style={{ color: HAIR }}>/</span>
            <MonoTag>CIVIC TECH & ELECTION SYSTEMS</MonoTag>
            <span style={{ color: HAIR }}>/</span>
            <MonoTag>NATIONAL POLITICAL PARTY · 2024</MonoTag>
          </div>
          <h1
            className="font-display font-bold leading-[1.08] tracking-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3.6rem)", color: N }}
          >
            Designing for the Unpredictable: Election Monitoring System for 38 Provinces
          </h1>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-start">
          <div className="space-y-6">


            <p
              className="font-display font-medium leading-relaxed"
              style={{ fontSize: "clamp(1rem, 1.8vw, 1.45rem)", color: N, letterSpacing: "-0.01em", lineHeight: 1.6 }}
            >
              A system for a national political party to enter, verify, and tabulate polling station results in Indonesia's 2024 elections, inside a 48 hour window. It had to work with no signal, with handwritten forms, and with an AI that sometimes needs a human to step in.
            </p>

            <CaseStudyFacts
              facts={[
                { label: "My contribution", value: "Sole product designer across four connected platforms." },
                { label: "Team & scope", value: "An Indonesian national political party, covering 38 provinces and 820,000+ polling stations." },
                { label: "Verified impact", value: "The system ran live across 38 provinces with zero downtime through the 48 hour tabulation window." },
                { label: "Not measured here", value: "TPS level accuracy and submission data, which I did not have direct access to." },
              ]}
            />
          </div>

          {/* Right Column: Hero Dummy Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#111836] group">

            <img
              src={eSaksiThumb}
              alt="Election System Preview"
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
            <p className="text-sm leading-relaxed text-[#2E3A5C]">Real time vote monitoring for 820,000+ polling stations across 38 provinces.</p>
          </div>
          <div className="p-4 border-l border-[#19244E]/15">
            <span className="block text-xs font-bold tracking-widest text-[#19244E]/60 uppercase mb-1.5">02 · Constraints</span>
            <p className="text-sm leading-relaxed text-[#2E3A5C]">A fixed 48 hour window, offline field conditions, and handwritten tallies.</p>
          </div>
          <div className="p-4 border-l border-[#19244E]/15">
            <span className="block text-xs font-bold tracking-widest text-[#19244E]/60 uppercase mb-1.5">03 · Key Decisions</span>
            <p className="text-sm leading-relaxed text-[#2E3A5C]">AI with a human fallback, offline as an expected state, and plain language seat allocation.</p>
          </div>
          <div className="p-4 border-l border-[#19244E]/15">
            <span className="block text-xs font-bold tracking-widest text-[#19244E]/60 uppercase mb-1.5">04 · Solution & Evidence</span>
            <p className="text-sm leading-relaxed text-[#2E3A5C]">Four connected platforms, with a dual path flow for every failure point.</p>
          </div>
          <div className="p-4 border-l border-[#19244E]/15">
            <span className="block text-xs font-bold tracking-widest text-[#19244E]/60 uppercase mb-1.5">05 · Outcome</span>
            <p className="text-sm leading-relaxed text-[#2E3A5C]">Ran live across 38 provinces with zero downtime through the tabulation window.</p>
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
          <SectionTag id="context" num="01" label="Context: An Election That Does Not Wait" />
          <div className="space-y-5 font-sans text-base leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.8 }}>
            <p>
              An election does not wait for good conditions. The system had to work in a city with full signal and in a village with none, with a neatly filled form and with one scrawled in a rush during vote counting, and with an AI that reads handwriting well or needs a human to step in.
            </p>
            <p>
              Four election types, President, DPR RI, DPRD Provinsi, and DPRD Kabupaten or Kota, each needed its own vote entry, verification, and seat allocation logic, all against the same 48 hour clock.
            </p>
          </div>
        </div>

        <Hairline />

        {/* 02 Constraints */}
        <div>
          <SectionTag id="constraints" num="02" label="Constraints: A Fixed Clock, Unreliable Infrastructure, Handwritten Tallies" />
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: "A fixed 48 hour window", desc: "Four election types shared one clock. The election date did not move, whatever the state of the system." },
              { title: "Unreliable infrastructure", desc: "Signal dead zones, and WhatsApp numbers that could go down without warning." },
              { title: "Handwritten tallies", desc: "Vote tallies are handwritten on physical forms, so the AI reading needed a real fallback, not a best guess." },
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
          <SectionTag id="decisions" num="03" label="Key Decisions: Human Fallback, Offline by Default, Plain Seat Allocation" />

          <div className="space-y-6">
            <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-xs space-y-3">
              <span className="text-xs font-bold text-[#DB3E8C] uppercase tracking-wider block">Decision 01 · AI with a human fallback, not AI alone</span>
              <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">
                <strong className="text-[#19244E]">The pressure:</strong> Handwriting is not always legible, and the AI needed a real fallback.
              </p>
              <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">
                <strong className="text-[#19244E]">What I did:</strong> I built two parallel experiences: a fast automated flow for witnesses on mobile, and a manual web tool for a dedicated entry team. Party order follows the KPU ballot, with numbered tabs that match the physical paper.
              </p>
              <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">
                <strong className="text-[#19244E]">Why it held:</strong> A human could always step in without the system falling apart.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-xs space-y-3">
              <span className="text-xs font-bold text-[#DB3E8C] uppercase tracking-wider block">Decision 02 · Offline as an expected state, not an error</span>
              <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">
                <strong className="text-[#19244E]">The pressure:</strong> The client found regions with limited or no signal, and asked for an offline mode close to launch.
              </p>
              <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">
                <strong className="text-[#19244E]">What I did:</strong> A persistent offline label, two tabs ("Belum diinput" and "Sudah diinput"), and one "Sinkron Semua Data" button for all pending entries when the connection returns.
              </p>
              <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">
                <strong className="text-[#19244E]">Why it held:</strong> A witness cannot sync nine out of ten records and forget the tenth, because the sync happens in one action.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-xs space-y-3">
              <span className="text-xs font-bold text-[#DB3E8C] uppercase tracking-wider block">Decision 03 · Plain language for seat allocation</span>
              <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">
                <strong className="text-[#19244E]">The pressure:</strong> Sainte-Laguë is mathematically sound, and unreadable to almost anyone outside election administration.
              </p>
              <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">
                <strong className="text-[#19244E]">What I did:</strong> A table that puts each party's vote count against its divisors, and five alert categories, from "Menang Telak" to "Kalah Telak", based on vote margins.
              </p>
              <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">
                <strong className="text-[#19244E]">Why it held:</strong> Anyone from a party could see how seat allocation was playing out, not only someone fluent in the math.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <CaseStudyDisclosure label="Trade-off I accepted" summary="Two experiences to build and keep in sync">
              <p>
                Building two parallel experiences, one fast and automated and one manual and deliberate, meant more work on both sides. It was the price of making sure a human could always step in.
              </p>
            </CaseStudyDisclosure>
          </div>
        </div>

        <Hairline />

        {/* 04 Solution & Evidence */}
        <div>
          <SectionTag id="solution" num="04" label="Solution & Evidence: Four Platforms, Three Screens" />

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div
              onClick={() => setSelectedImage({
                src: electionVerificationCms,
                title: "01 · Dual-Pane Verification Portal (PPLN Abuja)",
                badge: "AI + Human Verification",
                desc: "Side-by-side verification CMS allowing dedicated data entry clerks to audit physical C-Hasil tallies against candidate vote inputs across all registered national parties."
              })}
              className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs hover:border-[#DB3E8C]/50 transition-all duration-300 cursor-pointer group"
            >
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-[#070b1a] border border-gray-200">
                <img
                  src={electionVerificationCms}
                  alt="Form C-Hasil verification CMS"
                  className="w-full h-full object-cover object-top rounded-xl group-hover:scale-102 transition-transform duration-500"
                />
              </div>
              <p className="mt-3 font-sans text-sm text-[#2E3A5C] leading-relaxed">
                <strong className="text-[#19244E]">Verification.</strong> Dedicated entry clerks audit handwritten tallies directly against candidate figures.
              </p>
            </div>
            <div
              onClick={() => setSelectedImage({
                src: electionSainteLague,
                title: "02 · Sainte-Laguë Seat Matrix (DAPIL Banten II)",
                badge: "Electoral Math Engine",
                desc: "Real-time calculation table applying odd divisors, legislative threshold filtering, and plain-language alert tags."
              })}
              className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs hover:border-[#DB3E8C]/50 transition-all duration-300 cursor-pointer group"
            >
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-[#070b1a] border border-gray-200">
                <img
                  src={electionSainteLague}
                  alt="Sainte-Laguë seat allocation matrix"
                  className="w-full h-full object-cover object-top rounded-xl group-hover:scale-102 transition-transform duration-500"
                />
              </div>
              <p className="mt-3 font-sans text-sm text-[#2E3A5C] leading-relaxed">
                <strong className="text-[#19244E]">Seat allocation.</strong> A quotient matrix with a threshold toggle and automated seat attribution.
              </p>
            </div>
            <div
              onClick={() => setSelectedImage({
                src: electionKpuEntry,
                title: "03 · Dual-Entry District Tabulation (DPR RI Jawa Barat I)",
                badge: "Territorial CMS",
                desc: "Hierarchical territorial filtering with a party selector and real-time subdistrict audit grid."
              })}
              className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs hover:border-[#DB3E8C]/50 transition-all duration-300 cursor-pointer group"
            >
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-[#070b1a] border border-gray-200">
                <img
                  src={electionKpuEntry}
                  alt="KPU tabulation entry tool"
                  className="w-full h-full object-cover object-top rounded-xl group-hover:scale-102 transition-transform duration-500"
                />
              </div>
              <p className="mt-3 font-sans text-sm text-[#2E3A5C] leading-relaxed">
                <strong className="text-[#19244E]">Tabulation.</strong> Compares internal witness data with official KPU figures, by territory.
              </p>
            </div>
          </div>

          <div className="space-y-5 font-sans text-base leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.8 }}>
            <p>
              Offline mode and the Emergency App were added in response to what the client met in the field: low signal regions, and a WhatsApp outage close to the election. Several planned modules, including Admin, Profile, and TPS Prioritas, were deliberately shelved to protect the flows that mattered most.
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
                <h5 className="font-bold text-base text-[#19244E]">Four connected platforms</h5>
                <p className="text-sm text-[#2E3A5C] leading-relaxed">Witness submission, AI verification, offline capture, and seat allocation reporting.</p>
              </div>
              <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs space-y-2">
                <span className="text-[11px] font-bold tracking-wider uppercase text-[#DB3E8C] font-sans block">Ran live</span>
                <h5 className="font-bold text-base text-[#19244E]">Across 38 provinces</h5>
                <p className="text-sm text-[#2E3A5C] leading-relaxed">Through the 48 hour tabulation window, with the team on standby.</p>
              </div>
              <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs space-y-2">
                <span className="text-[11px] font-bold tracking-wider uppercase text-[#DB3E8C] font-sans block">Not measured here</span>
                <h5 className="font-bold text-base text-[#19244E]">Accuracy data</h5>
                <p className="text-sm text-[#2E3A5C] leading-relaxed">TPS level submission and accuracy data existed, but I had no direct access to it.</p>
              </div>
            </div>

            <div className="font-sans text-base leading-relaxed text-[#2E3A5C] space-y-5" style={{ lineHeight: 1.8 }}>
              <p>
                Much of the client relationship was built live, with design work done directly in Figma during meetings. I also learned to be precise about what I could confidently claim and what I could not.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-gray-200 space-y-2">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#19244E]">WHAT I LEARNED</span>
              <p className="text-sm font-sans leading-relaxed text-[#2E3A5C] italic" style={{ lineHeight: 1.8 }}>
                "This project taught me that designing for conditions I don't control: bad signal, tight deadlines, a domain I didn't start out understanding: means building in fallbacks from the start, not patching them in after something breaks."
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
                aria-label="Tutup preview"
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

