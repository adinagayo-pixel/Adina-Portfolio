import { useState, useEffect } from "react"
import { CaseStudyHeaderBadge } from "@/app/components/ui/CaseStudyHeaderBadge"
import { CaseStudyDisclosure, CaseStudyFacts } from "@/app/components/ui/CaseStudyStory"

import {
  ArrowLeft, ChevronRight, Trophy, Users, Home,
  Zap, Volume2, Radio, BarChart2,
  CheckCircle2, Globe, Target, MessageSquare, Clock, LayoutGrid, FileCode2, Share2, ChevronDown, Sparkles
} from "lucide-react"

import mykawan1 from "@/imports/mykawan1.jpg"
import mykawanThumb from "@/imports/mykawan thumb.jpg"
import mySalamThumb from "@/imports/my salam thumb.jpg"
import mykawan2 from "@/imports/mykawan2.jpg"
import mykawan3 from "@/imports/mykawan3.jpg"
import mykawan4 from "@/imports/mykawan4.jpg"
import mykawan5 from "@/imports/mykawan5.jpg"

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

export default function BijakWangCase({ onBack, onNext, onPrev }: Props) {
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

          <CaseStudyHeaderBadge caseNum="06" />
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
            <MonoTag accent>CASE STUDY 06</MonoTag>
            <span style={{ color: HAIR }}>/</span>
            <MonoTag>IN HOUSE GAMIFIED QUIZ PLATFORM</MonoTag>
            <span style={{ color: HAIR }}>/</span>
            <MonoTag>MYSALAM x MYKAWAN · 2025 to 2026</MonoTag>
          </div>
          <h1
            className="font-display font-bold leading-[1.08] tracking-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3.6rem)", color: N }}
          >
            From Kahoot to In House: A Live Quiz Platform for mySalam Roadshows
          </h1>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-start">
          <div className="space-y-6">


            <p
              className="font-display font-medium leading-relaxed"
              style={{ fontSize: "clamp(1rem, 1.8vw, 1.45rem)", color: N, letterSpacing: "-0.01em", lineHeight: 1.6 }}
            >
              A quiz platform built for mySalam's regional roadshows, with a daily practice mode and a live tournament mode, made in house instead of paying a third party tool for each event. It grew out of My Money Sense (2025), a daily financial practice game I built for mySalam.
            </p>

            <CaseStudyFacts
              facts={[
                { label: "My contribution", value: "Sole product designer: UI UX, data integrity, signup flows, and filtering PM revisions." },
                { label: "Team & scope", value: "One fullstack developer, one QA, and the mySalam and myKawan teams. Daily practice and live tournament modes." },
                { label: "Verified impact", value: "Tested in real roadshows, then refined from field feedback." },
                { label: "Not measured here", value: "Engagement and conversion figures." },
              ]}
            />
          </div>

          {/* Right Column: Hero Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#111836] group">

            <img
              src={mySalamThumb}
              alt="BijakWang Preview"
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
            <p className="text-sm leading-relaxed text-[#2E3A5C]">A quiz platform for mySalam's regional roadshows, to replace per event third party tools.</p>
          </div>
          <div className="p-4 border-l border-[#19244E]/15">
            <span className="block text-xs font-bold tracking-widest text-[#19244E]/60 uppercase mb-1.5">02 · Constraints</span>
            <p className="text-sm leading-relaxed text-[#2E3A5C]">2 week deadline, 3 person team, marketing compliance, and two modes.</p>
          </div>
          <div className="p-4 border-l border-[#19244E]/15">
            <span className="block text-xs font-bold tracking-widest text-[#19244E]/60 uppercase mb-1.5">03 · Key Decisions</span>
            <p className="text-sm leading-relaxed text-[#2E3A5C]">One scoring logic for teams and individuals, email only sign up, and filtered PM revisions.</p>
          </div>
          <div className="p-4 border-l border-[#19244E]/15">
            <span className="block text-xs font-bold tracking-widest text-[#19244E]/60 uppercase mb-1.5">04 · Solution & Evidence</span>
            <p className="text-sm leading-relaxed text-[#2E3A5C]">A gamified quiz platform, tested in real roadshows and refined from field feedback.</p>
          </div>
          <div className="p-4 border-l border-[#19244E]/15">
            <span className="block text-xs font-bold tracking-widest text-[#19244E]/60 uppercase mb-1.5">05 · Outcome</span>
            <p className="text-sm leading-relaxed text-[#2E3A5C]">Shipped in May 2026 and refined since, driven by real field feedback.</p>
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
          <SectionTag id="context" num="01" label="Context: A Quiz Platform for mySalam" />

          <div className="space-y-5 font-sans text-base leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.8 }}>
            <p>
              mySalam needed an in house quiz platform for regional roadshows, instead of paying third party tools for each event. The brief asked for a Kahoot-like experience.
            </p>
            <p>
              Before any design files, the developer and I played Kahoot together: he needed the host flow, and I needed the player side. Kahoot's geometric answer shapes made players glance between their phones and the big screen, a friction I had seen at other Kahoot events. We replaced the shapes with full A, B, C, and D text, consistent across host and player screens.
            </p>
          </div>
        </div>

        <Hairline />

        {/* 02 Constraints */}
        <div>
          <SectionTag id="constraints" num="02" label="Constraints: Two Weeks, Three People, Strict Compliance" />

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: "Deadline", desc: "A 2 week initial deadline for the first version." },
              { title: "Lean team", desc: "One designer, one fullstack developer, and one QA." },
              { title: "Marketing compliance", desc: "The activity could not work as marketing, so follow up emails could not link back to the game." },
              { title: "Two modes", desc: "Self paced daily practice, and host controlled live tournaments." },
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
          <SectionTag id="decisions" num="03" label="Key Decisions: Scoring, Sign Up, and Filtering Revisions" />

          <div className="space-y-6">
            <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-xs space-y-3">
              <span className="text-xs font-bold text-[#DB3E8C] uppercase tracking-wider block">Decision 01 · One scoring logic for individuals and teams</span>
              <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">
                <strong className="text-[#19244E]">The pressure:</strong> mySalam asked for individual and team modes, with up to 3 members per team and team average scores.
              </p>
              <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">
                <strong className="text-[#19244E]">What I did:</strong> I treated an individual as a team of 1, so one scoring logic covered both. I also built team registration with invite links, approvals, and team leaderboards, after studying similar mechanics in other games.
              </p>
              <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">
                <strong className="text-[#19244E]">Why it held:</strong> When mySalam later asked for individual mode only, scoring did not need to change, because individuals had been a team of 1 from the start.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-xs space-y-3">
              <span className="text-xs font-bold text-[#DB3E8C] uppercase tracking-wider block">Decision 02 · Email only sign up, with the reward after the game</span>
              <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">
                <strong className="text-[#19244E]">The pressure:</strong> A long registration slowed player onboarding, and mySalam briefly asked for a username only.
              </p>
              <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">
                <strong className="text-[#19244E]">What I did:</strong> We pushed back, because sign up records each user's game history, which a username cannot do. The email only decision came from our CEO, PM, and mySalam, and I executed it in the UI. Since follow up emails could not link back to the game, an end of game popup offered a 1 month free ReSkills voucher.
              </p>
              <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">
                <strong className="text-[#19244E]">Why it held:</strong> The voucher kept conversion without breaking the marketing rule.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-xs space-y-3">
              <span className="text-xs font-bold text-[#DB3E8C] uppercase tracking-wider block">Decision 03 · Filter PM revisions, do not just execute them</span>
              <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">
                <strong className="text-[#19244E]">The pressure:</strong> Many PM revisions were generated with AI tools, and not all of them made technical sense.
              </p>
              <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">
                <strong className="text-[#19244E]">What I did:</strong> On the result screen, the PM proposed personal score badges, answer distribution percentages, explanation boxes, and manual navigation buttons. I advised against all four: results were not personalized, distributions needed calculations not yet available, explanation boxes had been removed at client request, and manual navigation did not fit a host controlled flow.
              </p>
              <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">
                <strong className="text-[#19244E]">Why it held:</strong> Several of these fit the personalized daily practice mode, so the ideas were placed where they belong, not dismissed.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <CaseStudyDisclosure label="Trade-off I accepted" summary="Team registration that never ran live">
              <p>
                I built team registration, but mySalam later asked for individual mode only, so it was never deployed in live roadshows. The scoring still transitioned smoothly, because individuals had already been treated as a team of 1.
              </p>
            </CaseStudyDisclosure>
          </div>
        </div>

        <Hairline />

        {/* 04 Solution & Evidence */}
        <div>
          <SectionTag id="solution" num="04" label="Solution & Evidence: The Platform in the Field" />

          <p className="font-sans text-base leading-relaxed text-[#2E3A5C] mb-6" style={{ lineHeight: 1.8 }}>
            Five screens from the platform. Click any screen to zoom in.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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
                className="bg-white border border-gray-200 rounded-xl p-3 flex flex-col justify-between group hover:border-[#DB3E8C]/50 transition-all duration-300 cursor-pointer shadow-xs"
              >
                <div className="aspect-[4/3] rounded-lg overflow-hidden border border-gray-200 mb-3 relative">
                  <img src={img} alt={title} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div>
                  <h4 className="font-sans text-xs font-bold text-[#19244E] mb-1 tracking-wide">{title}</h4>
                  <p className="font-sans text-sm text-[#2E3A5C] leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-5 font-sans text-base leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.8 }}>
            <p>
              The first rollout in May 2026 ran the playtest insights, team mode, and full registration live in the field for the first time.
            </p>
            <p>
              Feedback from that rollout drove most of the later trade offs. The first scoring rule gave a flat +15 bonus for answers within 30 seconds, inspired by Kahoot. mySalam then raised concern about long onboarding, not scoring. We moved to 10 base points plus the remaining seconds at submission, and hid the timer while keeping the timing logic in the background.
            </p>
            <p>
              We also trimmed the top leaderboard from 10 names to 5, because 10 rows forced scrolling on mobile, and removed the manual Submit button, a leftover from self paced practice.
            </p>
            <p>
              The Jelajah BijakWang landing page came together under a rapid turnaround while my workload was heavy. I started from Figma Make, customized it with the BijakWang palette, and designed a brief transition screen for users entering from different entry points, since BijakWang runs on its own domain.
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
                <h5 className="font-bold text-base text-[#19244E]">First live roadshow</h5>
                <p className="text-sm text-[#2E3A5C] leading-relaxed">Deployed in May 2026, with playtest insights, team mode, and registration.</p>
              </div>
              <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs space-y-2">
                <span className="text-[11px] font-bold tracking-wider uppercase text-[#DB3E8C] font-sans block">Refined</span>
                <h5 className="font-bold text-base text-[#19244E]">Registration, scoring, and UI</h5>
                <p className="text-sm text-[#2E3A5C] leading-relaxed">Each change came from field feedback rather than design assumptions.</p>
              </div>
              <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs space-y-2">
                <span className="text-[11px] font-bold tracking-wider uppercase text-[#DB3E8C] font-sans block">Not measured here</span>
                <h5 className="font-bold text-base text-[#19244E]">Engagement and conversion</h5>
                <p className="text-sm text-[#2E3A5C] leading-relaxed">This case does not include usage numbers.</p>
              </div>
            </div>

            <p className="font-sans text-base leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.8 }}>
              We also ran an internal load test with up to 60 people playing at once, to check that the server could hold. It tested capacity, not design, and changed no flow. The game was planned for mySalam's final roadshow, but the client decided not to use it there. It is still available on the site.
            </p>

            <div className="p-6 bg-white rounded-xl border border-gray-200 space-y-2">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#19244E]">WHAT I LEARNED</span>
              <p className="text-sm font-sans leading-relaxed text-[#2E3A5C] italic" style={{ lineHeight: 1.8 }}>
                "This project taught me that a lean team means every revision request has to be filtered, not just executed. Playing the actual competitor product before designing anything, and pushing back on requests that did not hold up technically, mattered more here than producing more screens faster."
              </p>
            </div>
          </div>
        </div>

          </div>
        </div>
      </div>

      {/* Back CTA */}
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
