import { ChevronDown } from "lucide-react"

interface CaseStudyFact {
  label: string
  value: string
  tone?: "default" | "verified" | "muted"
}

// The facts read as a short list under the description, not as boxes.
export function CaseStudyFacts({ facts }: { facts: CaseStudyFact[] }) {
  return (
    <ul className="list-disc pl-5 space-y-2 font-sans text-sm leading-relaxed text-[#2E3A5C]">
      {facts.map(({ label, value }) => (
        <li key={label}>
          <span className="font-semibold text-[#19244E]">{label}:</span> {value}
        </li>
      ))}
    </ul>
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
