import React, { useState, useEffect } from "react"
import { Heart } from "lucide-react"

interface CaseStudyHeaderBadgeProps {
  caseNum: string // e.g. "01", "02", "03"
}

export function useReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      if (typeof window === "undefined") return
      const scrollY = window.scrollY || window.pageYOffset || 0
      const windowHeight = window.innerHeight || 0
      const docHeight = Math.max(
        document.body?.scrollHeight || 0,
        document.documentElement?.scrollHeight || 0
      )
      const totalScrollable = docHeight - windowHeight
      if (!totalScrollable || totalScrollable <= 0 || isNaN(totalScrollable)) {
        setProgress(0)
        return
      }
      const raw = Math.round((scrollY / totalScrollable) * 100)
      const valid = isNaN(raw) ? 0 : Math.min(100, Math.max(0, raw))
      setProgress(valid)
    }

    window.addEventListener("scroll", updateProgress, { passive: true })
    updateProgress()
    return () => window.removeEventListener("scroll", updateProgress)
  }, [])

  return progress
}

export function CaseStudyHeaderBadge({ caseNum }: CaseStudyHeaderBadgeProps) {
  const rawProgress = useReadingProgress()
  const progress = isNaN(rawProgress) ? 0 : rawProgress
  const isComplete = progress >= 98

  // Progressive heart opacity (0.18 at 0% scroll -> 1.0 at 100% scroll)
  const heartOpacity = Math.max(0.18, Math.min(1, 0.18 + (progress / 100) * 0.82))
  // Progressive heart scale (0.75 at 0% scroll -> 1.0 at 100% scroll)
  const heartScale = Math.max(0.75, Math.min(1, 0.75 + (progress / 100) * 0.25))

  // 16px diameter circular ring SVG (radius 6.5px in 16x16 viewBox)
  const ringRadius = 6.5
  const ringCircumference = 2 * Math.PI * ringRadius
  const rawOffset = ringCircumference - (progress / 100) * ringCircumference
  const strokeOffset = isNaN(rawOffset) ? ringCircumference : rawOffset

  return (
    <div className="flex items-center gap-2 sm:gap-2.5 font-mono text-[10px] sm:text-[11px] select-none">
      {/* Teks: Dark navy/slate static text with bold pink active number only */}
      <span className="flex items-center gap-1 tracking-wider">
        <span className="text-[#64748B] font-semibold">CASE</span>
        <span className="text-[#E62E85] font-bold">{caseNum}</span>
        <span className="text-[#64748B] font-semibold">/ 08</span>
      </span>

      <div className="w-[1px] h-3 bg-[#19244E]/15" />

      {/* Pacing Meter: 16px circular ring SVG + Progressive Heart Icon + Muted percentage */}
      <div className="flex items-center gap-1 sm:gap-1.5">
        <div className="relative w-4 h-4 flex items-center justify-center shrink-0">
          <svg className="w-4 h-4 -rotate-90 shrink-0" viewBox="0 0 16 16">
            {/* Base track: abu-abu tipis #E2E8F0 */}
            <circle cx="8" cy="8" r={ringRadius} stroke="#E2E8F0" strokeWidth="2" fill="none" />
            {/* Active arc curve: pink #E62E85 */}
            <circle
              cx="8"
              cy="8"
              r={ringRadius}
              stroke="#E62E85"
              strokeWidth="2"
              fill="none"
              strokeDasharray={ringCircumference}
              strokeDashoffset={strokeOffset}
              strokeLinecap="round"
              className="transition-all duration-150"
            />
          </svg>

          {/* Progressive Heart icon inside ring (faint at start, solid & pulsing at 100%) */}
          <Heart
            size={7.5}
            style={{
              opacity: heartOpacity,
              transform: `scale(${heartScale})`,
            }}
            className={`absolute text-[#E62E85] fill-[#E62E85] transition-all duration-200 ${
              isComplete ? "animate-pulse" : ""
            }`}
          />
        </div>

        <span className="text-[10px] text-[#64748B] font-sans font-semibold">{progress}%</span>
      </div>
    </div>
  )
}





