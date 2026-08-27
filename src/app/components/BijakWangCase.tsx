import { useState, useEffect } from "react"
import {
  ArrowLeft, ChevronRight, Trophy, Users,
  Zap, Volume2, Radio, BarChart2,
  CheckCircle2, Globe, Target, MessageSquare, Clock, LayoutGrid, FileCode2, Share2, ChevronDown, Sparkles
} from "lucide-react"
import mykawan1 from "@/imports/mykawan1.png"
import mykawan2 from "@/imports/mykawan2.png"
import mykawan3 from "@/imports/mykawan3.png"
import mykawan4 from "@/imports/mykawan4.png"
import mykawan5 from "@/imports/mykawan5.png"

const N = "#19244E"
const C = "#DB3E8C"
const W = "#ffffff"
const S = "#F9FAFB"
const HAIR = `rgba(25,36,78,0.10)`
const BODY = "#2E3A5C"
const GAME = "#0047AB"   // myKawan blue

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
    <div id={id} className="mb-10 pt-4 scroll-mt-24">
      <div className="text-xs font-bold uppercase tracking-[0.2em] mb-2 text-[#DB3E8C]">
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
  { id: "playtest", num: "02", label: "Before the Build: Playtest, Then Pixels" },
  { id: "foundation", num: "03", label: "Building the Foundation" },
  { id: "rollout", num: "04", label: "First Rollout: May 2026" },
  { id: "roadshow", num: "05", label: "After the First Roadshow: Field Feedback" },
  { id: "feedback", num: "06", label: "Filtering Feedback, Trimming Friction" },
  { id: "pressure", num: "07", label: "Shipping Under Pressure" },
  { id: "impact", num: "08", label: "Closing & Key Impact" },
]

export default function BijakWangCase({ onBack, onNext, onPrev }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [activeZoomImg, setActiveZoomImg] = useState<{ title: string; img: string; desc: string } | null>(null)
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
        className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-8 lg:px-16 py-4 transition-all duration-200"
        style={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.95)" : W,
          backdropFilter: "blur(16px)",
          borderBottom: `1px solid ${HAIR}`,
        }}
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 font-sans text-xs sm:text-sm font-semibold tracking-widest uppercase transition-opacity hover:opacity-60 cursor-pointer"
          style={{ color: N }}
        >
          <ArrowLeft size={13} /> Back
        </button>
        <MonoTag>mySalam x myKawan · 2025 to 2026</MonoTag>
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
      <div className="px-4 sm:px-8 lg:px-16 pt-12 sm:pt-16 pb-10 sm:pb-14" style={{ backgroundColor: W, borderBottom: `1px solid ${HAIR}` }}>
        <div className="max-w-4xl space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <MonoTag accent>CASE STUDY 03</MonoTag>
            <span style={{ color: HAIR }}>/</span>
            <MonoTag>IN HOUSE GAMIFIED QUIZ PLATFORM</MonoTag>
            <span style={{ color: HAIR }}>/</span>
            <MonoTag>MYSALAM x MYKAWAN · 2025 to 2026</MonoTag>
          </div>

          <h1
            className="font-display font-bold leading-[1.08] tracking-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3.6rem)", color: N }}
          >
            From Kahoot to In House: Designing Under Constraints I Didn't Choose
          </h1>

          <p
            className="font-display font-light leading-relaxed"
            style={{ fontSize: "clamp(1rem, 1.8vw, 1.45rem)", color: N, letterSpacing: "-0.01em", lineHeight: 1.6 }}
          >
            This project originated from My Money Sense (2025), a daily financial practice game I built for mySalam.
          </p>

          <p className="text-sm sm:text-base leading-relaxed max-w-3xl" style={{ color: BODY, lineHeight: 1.8 }}>
            When they wanted to evolve it into a live Kahoot style tournament for regional roadshows, I became the sole designer in a lean 3 person team: myself, one fullstack developer, and one QA engineer: working against a 2 week deadline for the first release.
          </p>
        </div>

        {/* Hero Metadata Grid Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 mt-12 border-t border-gray-100 text-sm">
          <div className="col-span-2 md:col-span-1">
            <span className="block font-sans text-xs font-bold tracking-widest uppercase text-gray-400 mb-1">
              Role & Ownership
            </span>
            <span className="font-semibold text-[#19244E] block leading-snug">
              Sole Product Designer
            </span>
            <span className="block text-xs text-gray-500 font-normal mt-0.5">
              (1 Designer, 1 Fullstack Dev, 1 QA)
            </span>
          </div>
          <div>
            <span className="block font-sans text-xs font-bold tracking-widest uppercase text-gray-400 mb-1">
              Client & Initiative
            </span>
            <span className="font-semibold text-[#19244E]">
              mySalam Malaysia x myKawan
            </span>
          </div>
          <div>
            <span className="block font-sans text-xs font-bold tracking-widest uppercase text-gray-400 mb-1">
              Timeline
            </span>
            <span className="font-semibold text-[#19244E]">
              2 Week First Sprint (2025 to 2026)
            </span>
          </div>
          <div>
            <span className="block font-sans text-xs font-bold tracking-widest uppercase text-gray-400 mb-1">
              Platform Status
            </span>
            <span className="font-semibold text-[#19244E]">
              Live Roadshow Circuit Deployments
            </span>
          </div>
        </div>
      </div>

      {/* EXECUTIVE SUMMARY & 30 SECOND TAKEAWAYS */}
      <div className="px-4 sm:px-8 lg:px-16 py-8 bg-[#111836] border-t border-b border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-[#DB3E8C] animate-pulse" />
          <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-[#DB3E8C]">
            EXECUTIVE SUMMARY & 30 SECOND TAKEAWAYS
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs sm:text-sm font-sans">
          <div className="bg-white/5 p-4 rounded-lg border border-white/5">
            <span className="block text-xs font-bold tracking-widest text-white/50 uppercase mb-1.5">01 · Problem</span>
            <p className="text-xs sm:text-sm leading-relaxed text-white/85">mySalam needed a reusable in house quiz platform for regional roadshows rather than paying third party tools for each event.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/5">
            <span className="block text-xs font-bold tracking-widest text-white/50 uppercase mb-1.5">02 · Core Constraints</span>
            <p className="text-xs sm:text-sm leading-relaxed text-white/85">2 week initial deadline, lean 3-person team, strict third party marketing compliance, dual self paced and live tournament modes.</p>
          </div>
          <div className="bg-[#DB3E8C]/10 p-4 rounded-lg border border-[#DB3E8C]/30">
            <span className="block text-xs font-bold tracking-widest text-[#DB3E8C] uppercase mb-1.5">03 · Exact Ownership</span>
            <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">Sole Designer: executed UI UX, defended data integrity, negotiated signup flows, and filtered PM AI revisions.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/5">
            <span className="block text-xs font-bold tracking-widest text-white/50 uppercase mb-1.5">04 · Key Impact</span>
            <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">Shipped an extensible platform tested in real roadshows, evolving signup, scoring, and UI through direct field feedback.</p>
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

        {/* 01 Executive Summary */}
        <div>
          <SectionTag id="summary" num="01" label="Executive Summary" />
          <div className="grid lg:grid-cols-2 gap-4">
            {[
              { label: "Client & Initiative", val: "mySalam Malaysia, under myKawan (Friendsure Technology)" },
              { label: "Role & Team", val: "Sole Product Designer (1 Designer, 1 Fullstack Dev, 1 QA)" },
              { label: "Core Product Suite", val: "Self Paced Daily Practice · Host Controlled Live Tournament Engine · Email Lead Capture" },
              { label: "Core Stack", val: "Figma · Figma Make · Gemini AI Audio · ReSkills Partner Voucher API" },
            ].map(({ label, val }) => (
              <div key={label} className="px-6 py-5" style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px" }}>
                <MonoTag>[{label}]</MonoTag>
                <p className="text-sm font-medium mt-2" style={{ color: N, lineHeight: 1.6 }}>{val}</p>
              </div>
            ))}
          </div>

          {/* UI Screen Showcase Gallery */}
          <div className="mt-10 p-6 bg-[#0a0f24] rounded-2xl border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <MonoTag accent>[MYSALAM × MYKAWAN UI GALLERY]</MonoTag>
                <h3 className="font-display text-xl font-bold text-white mt-1">
                  In House Roadshow Tournament Platform Flow
                </h3>
              </div>
              <span className="font-sans text-xs text-white/50 tracking-widest uppercase hidden sm:inline">
                5 High Fidelity Views
              </span>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "01 · Player Lobby", img: mykawan1, desc: "Interactive welcome screen with Singlish persona mascot and game rule instructions." },
                { title: "02 · Email Login & Registration", img: mykawan4, desc: "Instant entry verification for student participants before entering live queue." },
                { title: "03 · Live Quiz Screen", img: mykawan2, desc: "Real time multiple choice question engine with instant squad leaderboard tracking." },
                { title: "04 · Voucher & Reward Claim", img: mykawan3, desc: "Sponsor integration popup providing 1 Month Free Learning via ReSkills." },
                { title: "05 · Live Tournament Leaderboard", img: mykawan5, desc: "Global and state level real time leaderboard processing live participant scores." },
              ].map(({ title, img, desc }) => (
                <div
                  key={title}
                  onClick={() => setActiveZoomImg({ title, img, desc })}
                  className="bg-[#141b36] border border-white/10 rounded-xl p-3 flex flex-col justify-between group hover:border-[#DB3E8C]/50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl"
                >
                  <div className="aspect-[4/3] rounded-lg overflow-hidden border border-white/10 mb-3 bg-[#0d142d] p-1 relative">
                    <img src={img} alt={title} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 rounded" />
                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[9px] font-bold text-white uppercase tracking-wider flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Click to Zoom 🔍
                    </div>
                  </div>
                  <div>
                    <h4 className="font-sans text-xs font-bold text-white mb-1 tracking-wide">{title}</h4>
                    <p className="font-sans text-xs text-white/60 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Hairline />

        {/* 02 Before the Build: Playtest, Then Pixels */}
        <div>
          <SectionTag id="playtest" num="02" label="Before the Build: Playtest, Then Pixels" />
          
          <p className="font-sans text-sm sm:text-base leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.8 }}>
            The moment the brief asking for a Kahoot-like experience arrived, the developer and I sat down to play actual Kahoot games together before touching any design files. The developer needed to grasp the host side flow he would build directly, while I needed to understand the player side experience I would design. This session sparked one foundational decision that held through completion: Kahoot used geometric shapes for answer choices, forcing players to constantly glance back and forth between their phones and the big screen: a friction point I had experienced firsthand at other Kahoot events. We replaced shapes with full A, B, C, D text, keeping them consistent across both host and player screens.
          </p>
        </div>

        <Hairline />

        {/* 03 Building the Foundation */}
        <div>
          <SectionTag id="foundation" num="03" label="Building the Foundation" />

          <div className="space-y-5 font-sans text-sm sm:text-base leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.8 }}>
            <p>
              During the initial build phase, I designed a join flow using codes or QR scans along with a pre game lobby: retained directly from Kahoot observations. The requirement from mySalam was ambitious: support both individual and team modes (up to 3 members per team), with scores calculated as a team average. I proposed defining an individual as a team of 1 player rather than creating two separate categories: establishing a unified scoring logic for all cases. To support team mode, I built a complete registration system featuring invite links or codes, member request and approval flows, and dedicated team leaderboards after researching similar mechanics in other games.
            </p>
            <p>
              Initial registration was comprehensive: collecting email, phone number, gender (to generate gender matched avatars), and password.
            </p>
          </div>
        </div>

        <Hairline />

        {/* 04 First Rollout — May 2026 */}
        <div>
          <SectionTag id="rollout" num="04" label="First Rollout — May 2026" />

          <div className="space-y-5 font-sans text-sm sm:text-base leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.8 }}>
            <p>
              This version deployed at the first live roadshow. All foundational elements: playtest insights, team mode, and comprehensive registration: ran live in the field for the first time.
            </p>
          </div>
        </div>

        <Hairline />

        {/* 05 After the First Roadshow: What the Field Taught Us */}
        <div>
          <SectionTag id="roadshow" num="05" label="After the First Roadshow: What the Field Taught Us" />

          <div className="space-y-5 font-sans text-sm sm:text-base leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.8 }}>
            <p>
              Feedback from the initial rollout triggered nearly all subsequent major trade offs.
            </p>
            <p>
              mySalam requested simplifying team mode to individual mode only, without providing detailed context to the design team. Although the team registration feature was built, it was never deployed in live roadshows: yet the transition was smooth from a scoring perspective because individuals were treated as a team of 1 player from day one.
            </p>
            <p>
              Registration was simplified incrementally: from email plus phone plus gender plus password, mySalam briefly requested username only to reduce friction. The developer and I pushed back: the primary sign up purpose was recording historical game performance per user, something nearly impossible to track with just a username. The final email only decision emerged from discussions among our CEO, PM, and mySalam, which I executed in the UI. An additional constraint: the activity could not serve as a marketing effort, so follow up emails for profile completion could not contain direct links back to the game. Our solution: an end of game popup offering a 1 month free ReSkills class voucher to maintain real user conversion.
            </p>
            <p>
              The scoring system evolved as well. The initial rule: a flat +15 bonus for answering within 30 seconds: was established by the developer and myself, inspired by Kahoot. After the first rollout, mySalam expressed concern over long player onboarding times caused by the initial lengthy registration form rather than scoring itself. They updated the scoring logic to a proportional model: 10 base points plus a bonus equal to remaining seconds upon submission: and requested hiding the timer from the UI while keeping the timing logic running in the background.
            </p>
            <p>
              Further UI adjustments followed: trimming the top leaderboard from 10 names to 5 (my proposal, as 10 rows forced mobile scrolling), and removing the manual Submit button: a legacy from self paced practice that created unnecessary friction during live tournaments.
            </p>
          </div>
        </div>

        <Hairline />

        {/* 06 Filtering the Feedback, Trimming the Friction */}
        <div>
          <SectionTag id="feedback" num="06" label="Filtering the Feedback, Trimming the Friction" />

          <div className="space-y-5 font-sans text-sm sm:text-base leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.8 }}>
            <p>
              A major part of my role during this iteration phase was filtering revision requests from the PM: often generated via AI tools: ensuring we executed only what made technical sense. A prime example occurred with result screen revisions: the PM proposed adding personal score badges, answer distribution percentages, explanation boxes, and manual navigation buttons. I advised against all four for distinct reasons: tournament result screens were not personalized, distribution percentages required extra calculation configs not yet available, explanation boxes had been previously removed per client request, and manual navigation buttons were irrelevant since tournament flow was host controlled. Interestingly, I noted these features were well suited for the personalized Daily Practice mode.
            </p>
            <p>
              For visual assets, I coordinated directly with our graphic designer based on PM briefs. For AI tools, I used Gemini as a validator at two touchpoints: validating my drafted scoring calculations, and drafting platform copy in Bahasa Malaysia. Because our team was unfamiliar with local linguistic nuances, nearly every line received revisions from the Malaysian team: simple words like "team" became "pasukan", and "success" became "berjaya".
            </p>
          </div>
        </div>

        <Hairline />

        {/* 07 Shipping Under Pressure */}
        <div>
          <SectionTag id="pressure" num="07" label="Shipping Under Pressure" />

          <div className="space-y-5 font-sans text-sm sm:text-base leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.8 }}>
            <p>
              The Jelajah BijakWang landing page emerged under far from ideal conditions: the client requested a rapid turnaround while my workload was heavy. I used Figma Make as a starting point, then customized it with the BijakWang color palette. Because BijakWang operates on a standalone domain separate from the main myKawan website, I also designed a brief transition loading screen for users entering via different entry points.
            </p>
          </div>
        </div>

        <Hairline />

        {/* 08 Closing & Key Impact */}
        <div>
          <SectionTag id="impact" num="08" label="Closing & Key Impact" />
          <div className="p-8 bg-[#111836] rounded-2xl border border-white/10 text-white space-y-6 shadow-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] animate-pulse" />
              <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-[#22c55e]">
                SYSTEM OUTCOME & PRODUCT VALIDATION
              </span>
            </div>
            
            <p className="font-sans text-sm sm:text-base text-white/90 leading-relaxed max-w-3xl">
              This platform has evolved continuously since its initial rollout, with every iteration across registration, scoring, and UI driven by real field feedback rather than design assumptions.
            </p>

            {/* WHAT I LEARNED Box */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-white space-y-2 mt-6">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-[#DB3E8C]" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#DB3E8C]">
                  WHAT I LEARNED
                </span>
              </div>
              <p className="text-xs sm:text-sm font-sans leading-relaxed text-white/90 italic" style={{ lineHeight: 1.8 }}>
                "This project taught me that a lean team means every revision request has to be filtered, not just executed. Playing the actual competitor product before designing anything, and pushing back on requests that did not hold up technically, mattered more here than producing more screens faster."
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
                className="flex items-center gap-2 font-sans text-xs sm:text-sm font-semibold tracking-widest uppercase transition-opacity hover:opacity-60 cursor-pointer"
                style={{ color: N }}
              >
                <ArrowLeft size={13} /> Previous Case
              </button>
            )}
            <button
              onClick={onBack}
              className="flex items-center gap-2 font-sans text-xs sm:text-sm font-semibold tracking-widest uppercase transition-opacity hover:opacity-60 cursor-pointer"
              style={{ color: N }}
            >
              Back to Portfolio
            </button>
          </div>
          {onNext && (
            <button
              onClick={onNext}
              className="flex items-center gap-2 font-sans text-xs sm:text-sm font-semibold tracking-widest uppercase transition-opacity hover:opacity-60 cursor-pointer"
              style={{ color: N }}
            >
              Next Case <ChevronRight size={13} />
            </button>
          )}
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
            <p className="text-white/70 text-xs sm:text-sm font-sans text-center max-w-xl">{activeZoomImg.desc}</p>
          </div>
        </div>
      )}

    </div>
  )
}
