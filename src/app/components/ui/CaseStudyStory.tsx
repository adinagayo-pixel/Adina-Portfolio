import { ChevronDown } from "lucide-react"

interface CaseStudyFact {
  label: string
  value: string
  tone?: "default" | "verified" | "muted"
}

const FACT_TONE: Record<NonNullable<CaseStudyFact["tone"]>, { card: string; label: string }> = {
  default: { card: "border-gray-200 bg-white", label: "text-[#DB3E8C]" },
  verified: { card: "border-emerald-300/60 bg-emerald-50/40", label: "text-emerald-700" },
  muted: { card: "border-gray-200 bg-gray-50", label: "text-gray-500" },
}

// Separates who did what, what the project covered, and what is verified.
export function CaseStudyFacts({ facts }: { facts: CaseStudyFact[] }) {
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {facts.map(({ label, value, tone = "default" }) => (
        <div key={label} className={`p-4 rounded-xl border space-y-1.5 ${FACT_TONE[tone].card}`}>
          <span className={`block font-sans text-[10px] font-bold tracking-[0.15em] uppercase ${FACT_TONE[tone].label}`}>
            {label}
          </span>
          <p className="font-sans text-xs sm:text-sm leading-relaxed text-[#19244E]">{value}</p>
        </div>
      ))}
    </div>
  )
}

// Keeps technical depth available without making the main story longer.
export function CaseStudyDisclosure({ label, summary, children }: { label: string; summary: string; children: React.ReactNode }) {
  return (
    <details className="group rounded-xl border border-gray-200 bg-white shadow-xs">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 [&::-webkit-details-marker]:hidden">
        <span className="space-y-1">
          <span className="block font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-[#DB3E8C]">{label}</span>
          <span className="block font-sans text-sm font-semibold text-[#19244E]">{summary}</span>
        </span>
        <ChevronDown size={16} className="shrink-0 text-[#19244E]/60 transition-transform duration-200 group-open:rotate-180" />
      </summary>
      <div className="px-5 pb-5 space-y-4 font-sans text-sm leading-relaxed text-[#2E3A5C]">
        {children}
      </div>
    </details>
  )
}
