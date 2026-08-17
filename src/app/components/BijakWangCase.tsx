import { useState, useEffect } from "react"
import {
  ArrowLeft, ChevronRight, Trophy, Users,
  Zap, Volume2, Radio, BarChart2,
  Star, CheckCircle2, Globe, Target
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

function SectionTag({ num, label }: { num: string; label: string }) {
  return (
    <div className="mb-10">
      <div className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-2" style={{ color: C }}>
        {num} // {label.toUpperCase()}
      </div>
      <h2 className="font-display text-2xl lg:text-3xl font-bold" style={{ color: N }}>
        {label}
      </h2>
      <div className="w-12 h-[2px] mt-4" style={{ backgroundColor: C }} />
    </div>
  )
}

interface Props {
  onBack: () => void
  onNext?: () => void
  onPrev?: () => void
}

export default function BijakWangCase({ onBack, onNext, onPrev }: Props) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0 })
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="min-h-screen" style={{ backgroundColor: S, fontFamily: "var(--font-sans)" }}>

      {/* Sticky nav */}
      <div
        className="sticky top-0 z-50 flex items-center justify-between px-8 lg:px-16 py-4 transition-all duration-200"
        style={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.95)" : W,
          backdropFilter: "blur(16px)",
          borderBottom: `1px solid ${HAIR}`,
        }}
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 font-sans text-[10px] font-semibold tracking-widest uppercase transition-opacity hover:opacity-60"
          style={{ color: N }}
        >
          <ArrowLeft size={12} /> Back
        </button>
        <MonoTag>[MYSALAM MALAYSIA · MYKAWAN · MULTIPLAYER & GEMINI AI AUDIO]</MonoTag>
      </div>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <div style={{ backgroundColor: GAME }}>

        {/* Meta strip */}
        <div
          className="px-8 lg:px-16 py-5 flex flex-wrap items-center gap-6"
          style={{ borderBottom: `1px solid rgba(255,255,255,0.08)` }}
        >
          {[
            { label: "Client", val: "mySalam Malaysia × myKawan" },
            { label: "Initiative", val: "Kementerian Digital & ASEAN 2025" },
            { label: "Region", val: "Malaysia · University Roadshows" },
            { label: "Scale", val: "100,000 Concurrent Live Players" },
            { label: "Role", val: "Lead UI/UX Designer & Gamification Architect" },
          ].map(({ label, val }) => (
            <div key={label}>
              <span className="font-sans text-[9px] tracking-widest uppercase block mb-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
                {label}
              </span>
              <span className="font-sans text-[10px] font-semibold" style={{ color: "rgba(255,255,255,0.8)" }}>
                {val}
              </span>
            </div>
          ))}
        </div>

        {/* Title block */}
        <div className="px-8 lg:px-16 py-16 lg:py-24">
          <p className="font-sans text-[10px] font-semibold tracking-widest uppercase mb-6" style={{ color: C }}>
            Case Study · 07
          </p>
          <h1
            className="font-display font-light text-white leading-[0.92] mb-8"
            style={{ fontSize: "clamp(2rem, 4.8vw, 4.2rem)", letterSpacing: "-0.025em", maxWidth: "860px" }}
          >
            100,000-Player Live Tournament.<br />
            AI-Synthesized Audio. Financial Literacy<br />
            <em className="font-normal" style={{ color: C }}>at National Scale.</em>
          </h1>
          <p className="text-sm leading-relaxed max-w-[640px]" style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}>
            A Kahoot-inspired live multiplayer gamification platform built for mySalam Malaysia's #BijakWang Challenge, supporting 100,000 concurrent tournament players, 3-player team formation, synchronized question mechanics, and Gemini AI-generated contextual audio across TikTok Live broadcast events.
          </p>
        </div>

        {/* Stat row */}
        <div className="grid grid-cols-2 lg:grid-cols-4" style={{ borderTop: `1px solid rgba(255,255,255,0.08)` }}>
          {[
            { val: "100K", label: "Live Players", sub: "Target concurrent tournament capacity" },
            { val: "3", label: "Player Teams", sub: "Squad formation with unique KOD invite codes" },
            { val: "+115", label: "Max Score/Q", sub: "Base 100 pts + speed bonus 15 pts" },
            { val: "AI", label: "Audio Engine", sub: "Gemini AI contextual game soundscapes" },
          ].map((s, i) => (
            <div
              key={s.label}
              className="px-8 lg:px-10 py-10"
              style={{
                borderRight: i < 3 ? `1px solid rgba(255,255,255,0.08)` : "none",
                borderBottom: i < 2 ? `1px solid rgba(255,255,255,0.08)` : "none",
              }}
            >
              <p
                className="font-display font-light mb-2"
                style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.8rem)", color: W, lineHeight: 1, letterSpacing: "-0.03em" }}
              >
                {s.val}
              </p>
              <p className="font-sans text-[9px] font-semibold tracking-widest uppercase mb-1" style={{ color: C }}>
                {s.label}
              </p>
              <p className="text-[10px] leading-snug" style={{ color: "rgba(255,255,255,0.4)" }}>{s.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── BODY ──────────────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-8 lg:px-16 py-16 lg:py-24 space-y-20">

        {/* 01 Executive Summary */}
        <div>
          <SectionTag num="01" label="Executive Summary" />
          <div className="grid lg:grid-cols-2 gap-4">
            {[
              { label: "Client & Initiative", val: "mySalam Malaysia × myKawan: Kementerian Digital & ASEAN 2025 Financial Literacy Initiative" },
              { label: "Role & Scope", val: "Lead UI/UX Designer & Gamification Architect" },
              { label: "Core Product Suite", val: "Daily Self-Practice Portal · Live Multiplayer Tournament Engine · Team Management System" },
              { label: "Core Stack", val: "Figma · Kahoot Interaction Benchmarking · Gemini AI Audio Generation · TikTok Live Stream Integration" },
            ].map(({ label, val }) => (
              <div key={label} className="px-6 py-5" style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px" }}>
                <MonoTag>[{label}]</MonoTag>
                <p className="text-sm font-medium mt-2" style={{ color: N, lineHeight: 1.6 }}>{val}</p>
              </div>
            ))}
          </div>

          {/* National record callout */}
          <div
            className="mt-4 px-6 py-5 flex gap-5"
            style={{ backgroundColor: GAME, border: `1px solid ${GAME}`, borderRadius: "4px" }}
          >
            <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: `${C}25`, border: `1px solid ${C}40`, borderRadius: "4px" }}>
              <Trophy size={13} style={{ color: C }} />
            </div>
            <div>
              <p className="font-sans text-[9px] font-semibold tracking-widest uppercase mb-2" style={{ color: C }}>
                [NATIONAL CAMPAIGN: MYSALAM x KEMENTERIAN DIGITAL MALAYSIA]
              </p>
              <p className="text-sm font-semibold text-white mb-1">World & Malaysia Book of Records Attempt</p>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.75 }}>
                The platform was engineered to support official record-breaking attempts for the most concurrent live financial literacy tournament players, targeting 100,000 simultaneous participants across Malaysia's universities and general public.
              </p>
            </div>
          </div>
          {/* UI Screen Showcase Gallery */}
          <div className="mt-10 p-6 bg-[#0a0f24] rounded-2xl border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <MonoTag accent>[MYSALAM × MYKAWAN UI GALLERY]</MonoTag>
                <h3 className="font-display text-xl font-bold text-white mt-1">
                  100K Live Tournament Platform Flow
                </h3>
              </div>
              <span className="font-sans text-[10px] text-white/50 tracking-widest uppercase hidden sm:inline">
                5 High-Fidelity Views
              </span>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "01 · Player Lobby", img: mykawan1, desc: "Interactive welcome screen with Singlish persona mascot and game rule instructions." },
                { title: "02 · Email Login & Registration", img: mykawan4, desc: "Instant entry verification for student participants before entering live queue." },
                { title: "03 · Live Quiz Screen", img: mykawan2, desc: "Real-time multiple choice question engine with instant squad leaderboard tracking." },
                { title: "04 · Voucher & Reward Claim", img: mykawan3, desc: "Sponsor integration popup providing 1 Month Free Learning via ReSkills." },
                { title: "05 · Live Tournament Leaderboard", img: mykawan5, desc: "Global and state-level real-time leaderboard processing 100,000 active scores." },
              ].map(({ title, img, desc }) => (
                <div key={title} className="bg-[#141b36] border border-white/10 rounded-xl p-3 flex flex-col justify-between group hover:border-[#DB3E8C]/50 transition-all duration-300">
                  <div className="aspect-[4/3] rounded-lg overflow-hidden border border-white/10 mb-3 bg-[#0d142d]">
                    <img src={img} alt={title} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
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

        {/* 02 Strategic Challenge */}
        <div>
          <SectionTag num="02" label="The Strategic Challenge" />
          <p className="font-display font-light leading-relaxed mb-10" style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.35rem)", color: N, letterSpacing: "-0.005em", lineHeight: 1.65, maxWidth: "700px" }}>
            Transforming dry financial education into a viral, high-stakes competition across Malaysian universities, requiring a dual-phase architecture supporting both self-paced learning and ultra-low-latency live broadcast tournament events.
          </p>
          <p className="font-sans text-[9px] font-semibold tracking-widest uppercase mb-5" style={{ color: `${N}99` }}>
            [Key System & Interaction Constraints]
          </p>
          <div className="space-y-3">
            {[
              {
                Icon: Radio,
                title: "High-Concurrency Live Multiplayer Execution",
                desc: "Managing real-time synchronized question distribution and answer locking across thousands of simultaneous live stream players, streamed via TikTok Live and hosted on-site at university events without desync or race conditions.",
              },
              {
                Icon: Users,
                title: "Flexible Team Matchmaking: Individual vs. 3-Player Squads",
                desc: "Designing seamless invitation loops (unique 8-character team codes, email invites, shareable links) so users could compete solo or assemble 3-person university squads before tournament lock-in.",
              },
              {
                Icon: Volume2,
                title: "Audience Retention & Audio Immersion",
                desc: "Enhancing game feedback through contextual soundscapes (lobby waiting rooms, countdown timers, speed bonuses, leaderboard reveals) without heavy media assets, solved via Gemini AI audio generation.",
              },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="flex gap-5 px-6 py-5" style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px" }}>
                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5" style={{ border: `1px solid ${HAIR}`, borderRadius: "4px" }}>
                  <Icon size={13} style={{ color: C }} />
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

        {/* 03 Gamification Architecture */}
        <div>
          <SectionTag num="03" label="System & Gamification Architecture" />

          {/* Flow diagram */}
          <div className="mb-8 p-6 overflow-x-auto" style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px" }}>
            <MonoTag>[Three-Stage Tournament Game Loop]</MonoTag>
            <div className="flex items-center mt-5 min-w-max">
              {[
                { label: "Team Formation & Invite", sub: "KOD-1234 · email search · squad lock", icon: Users },
                { label: "Real-Time Answer Locking", sub: "Speed bonus · Kahoot-style mechanics", icon: Zap },
                { label: "Gemini AI Audio & Scores", sub: "Contextual soundscapes · live leaderboard", icon: Volume2 },
              ].map((step, i) => {
                const Icon = step.icon
                return (
                  <div key={step.label} className="flex items-center">
                    <div className="flex flex-col items-start gap-3 min-w-[210px]">
                      <div
                        className="w-10 h-10 flex items-center justify-center"
                        style={{
                          backgroundColor: i === 1 ? `${C}10` : `${GAME}08`,
                          border: `1px solid ${i === 1 ? `${C}30` : `${GAME}20`}`,
                          borderRadius: "4px",
                        }}
                      >
                        <Icon size={14} style={{ color: i === 1 ? C : GAME }} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold" style={{ color: N }}>{step.label}</p>
                        <p className="font-sans text-[9px] mt-0.5" style={{ color: `${N}AA` }}>{step.sub}</p>
                      </div>
                    </div>
                    {i < 2 && (
                      <div className="flex items-center mx-4 pb-5">
                        <div className="h-px w-10" style={{ backgroundColor: HAIR }} />
                        <ChevronRight size={11} style={{ color: `${N}DD`, marginLeft: "-4px" }} />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Scoring mechanic callout */}
          <div className="mb-6 grid lg:grid-cols-3 gap-4">
            {[
              { val: "+100", label: "Base Points", desc: "Correct answer", color: `${GAME}` },
              { val: "+15", label: "Speed Bonus", desc: "For rapid response", color: C },
              { val: "+115", label: "Perfect Round", desc: "Max points per question", color: N },
            ].map(({ val, label, desc, color }) => (
              <div key={label} className="px-6 py-5 text-center" style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px" }}>
                <p className="font-display font-light mb-1" style={{ fontSize: "2.2rem", color, lineHeight: 1, letterSpacing: "-0.04em" }}>{val}</p>
                <p className="font-sans text-[9px] font-semibold tracking-widest uppercase mb-1" style={{ color: `${N}BB` }}>{label}</p>
                <p className="text-xs" style={{ color: BODY }}>{desc}</p>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            {[
              { num: "1.", title: "Squad Formation & Team Invitation Engine", desc: "Engineered an intuitive modal workflow allowing team captains to set squad names, generate 8-character join codes (KOD-1234), search player emails, and track pending invitation statuses before locking squad rosters ahead of tournament start." },
              { num: "2.", title: "Kahoot-Style Speed & Accuracy Scoring Engine", desc: "Synchronized answer-locking interface awarding base points for correct choices (+100 pts) with dynamic speed bonuses (+15 pts). The UI displays real-time answer distribution charts immediately after each question phase, sustaining competitive tension through transparency." },
              { num: "3.", title: "Contextual Gemini AI Audio Integration", desc: "Used Gemini AI music generation tools to compose lightweight, custom instrumental soundscapes for each game state: relaxed ambient in the waiting lobby, high-tension countdown during answer submission, and triumphant celebratory audio for podium reveals, zero external licensing costs." },
            ].map(({ num, title, desc }) => (
              <div key={title} className="flex gap-5 px-6 py-5" style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px" }}>
                <span className="font-sans text-[10px] font-semibold flex-shrink-0 mt-0.5" style={{ color: C }}>{num}</span>
                <div>
                  <p className="text-sm font-semibold mb-1.5" style={{ color: N }}>{title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: BODY, lineHeight: 1.75 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Hairline />

        {/* 04 System Deliverables */}
        <div>
          <SectionTag num="04" label="System Deliverables & Module Breakdown" />
          <div className="grid lg:grid-cols-2 gap-6">

            {/* Daily practice */}
            <div style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px", overflow: "hidden" }}>
              <div className="px-6 py-4" style={{ borderBottom: `1px solid ${HAIR}`, backgroundColor: `${GAME}05` }}>
                <div className="flex items-center gap-2">
                  <Target size={12} style={{ color: C }} />
                  <MonoTag accent>[A] Daily Self-Practice & Training Hub</MonoTag>
                </div>
              </div>
              <div className="px-6 py-5 space-y-5">
                {[
                  { title: "Daily Financial Quizzes", desc: "Self-paced modules covering budgeting rules (50/30/20 rule), savings strategies, and insurance literacy, with streak trackers encouraging consistent pre-tournament engagement." },
                  { title: "Solo Practice Leaderboards", desc: "Localized rankings allowing participants to benchmark their financial knowledge against other university students prior to live tournament dates." },
                ].map(({ title, desc }) => (
                  <div key={title}>
                    <div className="flex items-start gap-2 mb-1.5">
                      <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: C }} />
                      <p className="text-sm font-semibold" style={{ color: N }}>{title}</p>
                    </div>
                    <p className="text-sm leading-relaxed pl-3" style={{ color: BODY, lineHeight: 1.75 }}>{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Live tournament */}
            <div style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px", overflow: "hidden" }}>
              <div className="px-6 py-4" style={{ borderBottom: `1px solid ${HAIR}`, backgroundColor: `${GAME}05` }}>
                <div className="flex items-center gap-2">
                  <Radio size={12} style={{ color: C }} />
                  <MonoTag accent>[B] Live Multiplayer Tournament Engine</MonoTag>
                </div>
              </div>
              <div className="px-6 py-5 space-y-5">
                {[
                  { title: "Lobby & Matchmaking Console", desc: "Interactive waiting rooms displaying live participant counts (e.g., 100 of 100,000 players ready) and host broadcast status, sustaining anticipation before tournament launch." },
                  { title: "Synchronized Question & Option Display", desc: "High-contrast option cards with timer indicators and an instant [Lock My Answer] confirmation trigger, designed for both mobile and large-screen TikTok Live viewing." },
                  { title: "Live Leaderboard & Podium Visualizer", desc: "Real-time ranking displays showing top team scores, point breakdowns, and overall tournament progression, updated after every question round." },
                ].map(({ title, desc }) => (
                  <div key={title}>
                    <div className="flex items-start gap-2 mb-1.5">
                      <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: C }} />
                      <p className="text-sm font-semibold" style={{ color: N }}>{title}</p>
                    </div>
                    <p className="text-sm leading-relaxed pl-3" style={{ color: BODY, lineHeight: 1.75 }}>{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Gameplay callout */}
          <div
            className="mt-5 px-6 py-5 flex gap-5"
            style={{ backgroundColor: GAME, borderRadius: "4px" }}
          >
            <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: `${C}25`, border: `1px solid ${C}40`, borderRadius: "4px" }}>
              <BarChart2 size={13} style={{ color: C }} />
            </div>
            <div>
              <p className="font-sans text-[9px] font-semibold tracking-widest uppercase mb-2" style={{ color: C }}>
                [GAMEPLAY: KAHOOT-INSPIRED LIVE MULTIPLAYER ENGINE]
              </p>
              <p className="text-sm font-semibold text-white mb-1.5">Answer Distribution Charts After Every Question</p>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.75 }}>
                After each question lock, the platform revealed live answer distribution, showing the percentage split across all choices. This real-time transparency created a social competitive tension that kept thousands of players emotionally invested across the full tournament runtime.
              </p>
            </div>
          </div>
        </div>

        <Hairline />

        {/* 05 Business Impact */}
        <div>
          <SectionTag num="05" label="Business Impact & Key Deliverables" />
          <div className="grid lg:grid-cols-3 gap-4">
            {[
              {
                Icon: Globe,
                title: "National Record-Breaking Scale",
                desc: "Delivered the gamified platform infrastructure powering official national financial literacy roadshows, including Varsiti Terengganu and Karnival Celik Kewangan Penang, as part of Malaysia's ASEAN 2025 financial literacy initiative.",
              },
              {
                Icon: Star,
                title: "Multi-Format Engagement",
                desc: "Supported both individual competitors and 3-player university squads across daily self-practice modules and high-stakes live broadcast events, sustaining engagement across the full pre-tournament and tournament lifecycle.",
              },
              {
                Icon: CheckCircle2,
                title: "AI-First Audio Production",
                desc: "Leveraged Gemini AI to produce a complete contextual sound system independently, eliminating external audio licensing costs while delivering lobby, countdown, and podium soundscapes that elevated player immersion across all game states.",
              },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="flex flex-col gap-4 px-6 py-5" style={{ backgroundColor: W, border: `1px solid ${HAIR}`, borderRadius: "4px" }}>
                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${C}08`, border: `1px solid ${C}20`, borderRadius: "4px" }}>
                  <Icon size={13} style={{ color: C }} />
                </div>
                <div>
                  <p className="text-sm font-semibold mb-1.5" style={{ color: N }}>{title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: BODY, lineHeight: 1.75 }}>{desc}</p>
                </div>
              </div>
            ))}
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
