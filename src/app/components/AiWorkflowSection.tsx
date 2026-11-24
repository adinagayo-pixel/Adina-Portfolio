import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { ArrowRight, X } from "lucide-react"

// ─── How I Work with AI ───────────────────────────────────────────────────────
// The landing page shows one navy banner in the Process area: title, subtitle and the
// tangled-to-straight line (the site's "problem synthesis" motif) through the four steps.
// Clicking it opens the full section in a pop-up, with every block and all text visible.

const NAVY = "#19244E"
const CERISE = "#DB3E8C"
const HAIR = "rgba(25,36,78,0.10)"

// ─── Tool logos ───────────────────────────────────────────────────────────────
// The Claude, Gemini and OpenAI shapes come from Simple Icons (CC0, simpleicons.org). The Figma mark is
// drawn from its five standard shapes. Stitch has no small icon mark, so its tag is text only.
type LogoId = "claude" | "gemini" | "openai" | "figma"

function ToolLogo({ id }: { id: LogoId }) {
  const common = { width: 14, height: 14, "aria-hidden": true, focusable: false, className: "shrink-0" } as const
  switch (id) {
    case "claude":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path fill="#D97757" d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z" />
        </svg>
      )
    case "gemini":
      // Current multicolor Gemini mark: blue base, with red, yellow and green blooming from the top,
      // left and bottom points.
      return (
        <svg {...common} viewBox="0 0 24 24">
          <defs>
            <radialGradient id="ai-gem-red" cx="12" cy="1" r="10" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#F94543" />
              <stop offset="1" stopColor="#F94543" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="ai-gem-yellow" cx="0.5" cy="12" r="9.5" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#FBBC04" />
              <stop offset="1" stopColor="#FBBC04" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="ai-gem-green" cx="12" cy="23.5" r="10" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#0EBC5F" />
              <stop offset="1" stopColor="#0EBC5F" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path fill="#3186FF" d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81" />
          <path fill="url(#ai-gem-green)" d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81" />
          <path fill="url(#ai-gem-yellow)" d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81" />
          <path fill="url(#ai-gem-red)" d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81" />
        </svg>
      )
    case "openai":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path fill="#0D0D0D" d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
        </svg>
      )
    case "figma":
      return (
        <svg {...common} viewBox="0 0 38 57">
          <path fill="#F24E1E" d="M19 0H9.5a9.5 9.5 0 0 0 0 19H19z" />
          <path fill="#FF7262" d="M19 0h9.5a9.5 9.5 0 0 1 0 19H19z" />
          <path fill="#A259FF" d="M9.5 19a9.5 9.5 0 0 0 0 19H19V19z" />
          <circle fill="#1ABCFE" cx="28.5" cy="28.5" r="9.5" />
          <path fill="#0ACF83" d="M9.5 38a9.5 9.5 0 1 0 9.5 9.5V38z" />
        </svg>
      )
  }
}

const STEPS: { num: string; name: string; tools: { label: string; logo?: LogoId }[]; text: string }[] = [
  {
    num: "01", name: "Research",
    tools: [{ label: "Claude", logo: "claude" }, { label: "Gemini", logo: "gemini" }, { label: "ChatGPT", logo: "openai" }],
    text: "Break down the brief, explore patterns, and pressure-test my logic.",
  },
  { num: "02", name: "Explore", tools: [{ label: "Stitch" }], text: "Generate rough layouts to see options quickly." },
  { num: "03", name: "Build", tools: [{ label: "Figma", logo: "figma" }], text: "Rebuild the chosen direction with my own base frames, auto-layout, and component library." },
  {
    num: "04", name: "Document",
    tools: [{ label: "Claude Code", logo: "claude" }, { label: "Figma MCP", logo: "figma" }],
    text: "Turn designs into screen-by-screen frames for review, QA, and handoff.",
  },
]

const APPROACHES = [
  {
    when: "When the project needs a working prototype fast, close to the real code",
    approach: "Designing in code",
    why: "It uses the developers' own tokens and shows real behavior early.",
  },
  {
    when: "When the project needs exploring several directions and stakeholder feedback",
    approach: "Figma first",
    why: "It's easier to compare options and comment screen by screen.",
  },
  {
    when: "When the project needs both speed and reviewable documentation",
    approach: "Code, then back to Figma via MCP",
    why: "Developers get code, while QA and stakeholders still get screens.",
  },
]

const ICON_PROPS = {
  viewBox: "0 0 32 32",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "w-9 h-9 row-span-2 text-[#DB3E8C]",
  "aria-hidden": true,
}

const PRINCIPLES = [
  {
    title: "AI for speed, not for decisions.",
    text: "I use it to explore options, but the final call is always mine.",
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M6 16 C14 16 16 7 26 7" strokeDasharray="2.5 3.5" opacity="0.55" />
        <path d="M6 16 C14 16 16 25 26 25" strokeDasharray="2.5 3.5" opacity="0.55" />
        <path d="M6 16 H25" />
        <path d="M21 12 L25 16 L21 20" />
        <circle cx="6" cy="16" r="2.6" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    title: "Traceable by default.",
    text: "Faster work still needs a clear record of what changed and why.",
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M9 7 V25" />
        <circle cx="9" cy="7" r="2.8" fill="#FFFFFF" />
        <circle cx="9" cy="16" r="2.8" fill="#FFFFFF" />
        <circle cx="9" cy="25" r="2.8" fill="#FFFFFF" />
        <path d="M16 7 H26" />
        <path d="M16 16 H23" />
        <path d="M16 25 H27" />
      </svg>
    ),
  },
  {
    title: "Client data stays out.",
    text: "I use placeholder data and describe problems by pattern, not by pasting real client information.",
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M16 4 L26 8 V15 C26 21.5 21.8 26 16 28 C10.2 26 6 21.5 6 15 V8 Z" />
        <path d="M11 14 H21" strokeDasharray="2 2.6" />
        <path d="M11 19 H18" strokeDasharray="2 2.6" />
      </svg>
    ),
  },
]

// Tangled-to-straight line along x: loops (a prolate trochoid) whose radius decays to zero at
// `span`, then a straight line to `W`. Returns SVG path data.
function tangledPath(W: number, span: number, y0: number, A: number, wavelength: number) {
  const w = (2 * Math.PI) / wavelength
  const pts: string[] = []
  for (let t = 0; t <= W; t += 1.5) {
    const a = A * Math.pow(Math.max(0, 1 - t / span), 1.3)
    const ph = w * t
    pts.push(`${(t + a * Math.sin(ph)).toFixed(1)} ${(y0 + a * Math.cos(ph) + 0.45 * a * Math.sin(1.63 * ph + 0.7)).toFixed(1)}`)
  }
  return `M${pts.join(" L")}`
}

// Same line along y, for the stacked mobile diagram in the pop-up.
function tangledPathVertical(H: number, span: number, x0: number, A: number, wavelength: number) {
  const w = (2 * Math.PI) / wavelength
  const pts: string[] = []
  for (let t = 0; t <= H; t += 1.5) {
    const a = A * Math.pow(Math.max(0, 1 - t / span), 1.3)
    const ph = w * t
    pts.push(`${(x0 + a * Math.cos(ph) + 0.4 * a * Math.sin(1.63 * ph + 0.7)).toFixed(1)} ${(t + a * Math.sin(ph)).toFixed(1)}`)
  }
  return `M${pts.join(" L")}`
}

const DESKTOP_QUERY = "(min-width: 1024px)"

// ─── Banner line: draws itself in once when the banner scrolls into view ──────
function BannerLine() {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const [geo, setGeo] = useState<{ w: number; d: string; nodes: number[] } | null>(null)
  const Y = 16

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const measure = () => {
      const w = el.offsetWidth
      const wide = window.matchMedia(DESKTOP_QUERY).matches
      const nodes = [0.125, 0.375, 0.625, 0.875].map((f) => f * w)
      setGeo({ w, nodes, d: tangledPath(w, nodes[2], Y, wide ? 13 : 8, wide ? 28 : 20) })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <span className="block w-full">
      <span ref={ref} className="relative block h-8 w-full">
        {geo && (
          <svg width={geo.w} height={32} viewBox={`0 0 ${geo.w} 32`} className="absolute inset-0 overflow-visible" aria-hidden="true" focusable="false">
            <defs>
              <linearGradient id="ai-banner-grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={geo.w} y2="0">
                <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.28" />
                <stop offset="0.55" stopColor="#FFFFFF" stopOpacity="0.6" />
                <stop offset="1" stopColor={CERISE} />
              </linearGradient>
            </defs>
            <motion.path
              d={geo.d}
              fill="none"
              stroke="url(#ai-banner-grad)"
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={reduceMotion ? false : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 1.6, ease: [0.45, 0, 0.2, 1] }}
            />
            {geo.nodes.map((x, i) => {
              const last = i === geo.nodes.length - 1
              return (
                <g key={i}>
                  <circle cx={x} cy={Y} r={9} fill="#0F1735" />
                  <circle cx={x} cy={Y} r={5} fill={last ? CERISE : "#0F1735"} stroke={last ? CERISE : "rgba(255,255,255,0.75)"} strokeWidth={1.6} />
                </g>
              )
            })}
          </svg>
        )}
      </span>
      <span className="mt-2 grid grid-cols-4 text-center">
        {STEPS.map((s) => (
          <span key={s.num} className="min-w-0">
            <span className="block font-sans text-[10px] sm:text-[11px] font-bold tracking-[0.14em] text-white/55 tabular-nums">{s.num}</span>
            <span className="block truncate font-display text-[13px] sm:text-base font-semibold text-white/90">{s.name}</span>
          </span>
        ))}
      </span>
    </span>
  )
}

// ─── Full content (inside the pop-up) ─────────────────────────────────────────
function drawDiagram(diagram: HTMLDivElement, svg: SVGSVGElement) {
  const steps = Array.from(diagram.querySelectorAll<HTMLElement>("[data-step]"))
  if (steps.length < 3) return
  const horizontal = window.matchMedia(DESKTOP_QUERY).matches
  const W = diagram.offsetWidth
  const H = diagram.offsetHeight
  let d: string
  let nodes: { x: number; y: number }[]
  if (horizontal) {
    const y0 = 36
    nodes = steps.map((s) => ({ x: s.offsetLeft + 14, y: y0 }))
    d = tangledPath(W, nodes[2].x, y0, 20, 34)
  } else {
    const x0 = 18
    nodes = steps.map((s) => ({ x: x0, y: s.offsetTop + 13 }))
    d = tangledPathVertical(H, nodes[2].y, x0, 11, 26)
  }
  const grad = horizontal ? `x1="0" y1="0" x2="${W}" y2="0"` : `x1="0" y1="0" x2="0" y2="${H}"`
  const dots = nodes
    .map((n, i) => {
      const last = i === nodes.length - 1
      return (
        `<circle cx="${n.x}" cy="${n.y}" r="10" fill="#FFFFFF"/>` +
        `<circle cx="${n.x}" cy="${n.y}" r="5.5" fill="${last ? CERISE : "#FFFFFF"}" stroke="${last ? CERISE : NAVY}" stroke-width="1.8"/>`
      )
    })
    .join("")
  svg.setAttribute("width", String(W))
  svg.setAttribute("height", String(H))
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`)
  svg.innerHTML =
    `<defs><linearGradient id="ai-line-grad" gradientUnits="userSpaceOnUse" ${grad}>` +
    `<stop offset="0" stop-color="${NAVY}" stop-opacity="0.32"/>` +
    `<stop offset="0.55" stop-color="${NAVY}" stop-opacity="0.6"/>` +
    `<stop offset="1" stop-color="${CERISE}" stop-opacity="0.95"/>` +
    `</linearGradient></defs>` +
    `<path d="${d}" fill="none" stroke="url(#ai-line-grad)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>` +
    dots
}

function AiWorkflowContent() {
  const diagramRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  useLayoutEffect(() => {
    const diagram = diagramRef.current
    const svg = svgRef.current
    if (!diagram || !svg) return
    const redraw = () => drawDiagram(diagram, svg)
    redraw()
    const ro = new ResizeObserver(redraw)
    ro.observe(diagram)
    document.fonts?.ready.then(redraw)
    return () => ro.disconnect()
  }, [])

  return (
    <div className="max-w-7xl mx-auto">
      <header className="pr-12">
        <h2
          id="ai-dialog-title"
          className="font-display font-medium text-[#19244E] tracking-tight"
          style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", lineHeight: 1.08, letterSpacing: "-0.02em", textWrap: "balance" }}
        >
          How I Work <span className="text-[#DB3E8C]">with AI</span>
        </h2>
        <p className="mt-4 max-w-[36em] font-sans text-[17px] lg:text-[19px] leading-relaxed text-[#2E3A5C]">
          AI helps me move faster. I still own the thinking, the decisions, and the details.
        </p>
      </header>

      {/* Workflow diagram */}
      <div ref={diagramRef} className="relative mt-10 lg:mt-12">
        <svg ref={svgRef} className="absolute left-0 top-0 pointer-events-none overflow-visible" aria-hidden="true" focusable="false" />
        <ol className="relative grid gap-10 pl-14 lg:pl-0 lg:pt-[84px] lg:grid-cols-4 lg:gap-12 list-none m-0">
          {STEPS.map((step) => (
            <li key={step.num} data-step className="min-w-0">
              {/* On desktop the number pill sits on the line, just right of its dot */}
              <span className="inline-block whitespace-nowrap rounded-full border border-[#DB3E8C]/30 bg-[#FDF0F6] px-2.5 py-[3px] font-sans text-xs font-bold tracking-[0.14em] text-[#DB3E8C] tabular-nums lg:absolute lg:top-6 lg:ml-8">
                {step.num}
              </span>
              <h3 className="mt-3.5 lg:mt-0 font-display font-bold text-2xl leading-tight text-[#19244E]">{step.name}</h3>
              <ul className="mt-3 flex flex-wrap gap-1.5 list-none p-0" aria-label="Tools">
                {step.tools.map((tool) => (
                  <li
                    key={tool.label}
                    className="inline-flex items-center gap-1.5 rounded-md border bg-white px-2 py-[3px] font-sans text-[13px] font-semibold leading-snug text-[#19244E]"
                    style={{ borderColor: HAIR }}
                  >
                    {tool.logo && <ToolLogo id={tool.logo} />}
                    {tool.label}
                  </li>
                ))}
              </ul>
              <p className="mt-3 font-sans text-base leading-relaxed text-[#2E3A5C]">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>

      <p
        className="mt-10 lg:mt-12 pt-5 font-display text-[17px] lg:text-[19px] leading-normal text-[#2E3A5C]"
        style={{ borderTop: `1px solid ${HAIR}`, textWrap: "pretty" }}
      >
        The tools change from project to project. What doesn't change: every design decision is mine, and every change can be traced.
      </p>

      {/* Choosing the right approach */}
      <div className="mt-12 lg:mt-16">
        <h3 className="mb-3.5 font-sans text-xs font-bold uppercase tracking-[0.12em] text-[#5A6380]">Choosing the right approach</h3>
        {/* On desktop, subgrid lines up situation, approach, and reason across the three cards */}
        <ul className="grid gap-3 lg:grid-cols-3 lg:grid-rows-[auto_auto_auto] lg:gap-x-6 lg:gap-y-0 list-none m-0 p-0">
          {APPROACHES.map((a) => (
            <li
              key={a.approach}
              className="grid min-w-0 content-start gap-2.5 rounded-xl border bg-white px-5 pt-[18px] pb-5 lg:row-span-3 lg:grid-rows-subgrid lg:px-6 lg:pt-5 lg:pb-6"
              style={{ borderColor: HAIR }}
            >
              <p className="font-sans text-base leading-normal text-[#5A6380]">{a.when}</p>
              <p
                className="flex items-baseline gap-2 pt-2.5 font-display font-semibold text-xl leading-snug text-[#19244E]"
                style={{ borderTop: `1px solid ${HAIR}` }}
              >
                <ArrowRight size={15} strokeWidth={2.2} className="shrink-0 translate-y-[1px] text-[#DB3E8C]" aria-hidden="true" />
                {a.approach}
              </p>
              <p className="font-sans text-base leading-relaxed text-[#2E3A5C]">{a.why}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Principles */}
      <ul className="mt-12 lg:mt-16 grid gap-7 lg:grid-cols-3 lg:gap-10 list-none p-0">
        {PRINCIPLES.map((p) => (
          <li key={p.title} className="grid min-w-0 grid-cols-[40px_1fr] items-start gap-x-4 gap-y-1 pt-[22px]" style={{ borderTop: `1px solid ${HAIR}` }}>
            {p.icon}
            <h3 className="font-display font-semibold text-xl leading-snug text-[#19244E]">{p.title}</h3>
            <p className="col-start-2 mt-1 font-sans text-base leading-relaxed text-[#2E3A5C]">{p.text}</p>
          </li>
        ))}
      </ul>

      {/* Currently exploring */}
      <aside
        aria-label="Currently exploring"
        className="mt-10 lg:mt-12 grid gap-2 rounded-xl border border-dashed border-[#19244E]/20 px-5 py-[18px] lg:grid-cols-[200px_1fr] lg:items-baseline lg:gap-6 lg:px-6 lg:py-5"
      >
        <span className="inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-[0.12em] text-[#5A6380]">
          <span className="h-[7px] w-[7px] rounded-full bg-[#5A6380]/60" aria-hidden="true" />
          Currently exploring
        </span>
        <p className="max-w-[62ch] font-sans text-base leading-relaxed text-[#5A6380]">
          Structured AI setups: reusable skills, instructions, and MCP connections that work together as a personal 'second brain' for design work. I'm still experimenting with this outside of client projects.
        </p>
      </aside>
    </div>
  )
}

// ─── Banner + pop-up ──────────────────────────────────────────────────────────
export default function AiWorkflowSection() {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  // While open: lock page scroll, move focus into the dialog, keep Tab inside it, close on Esc,
  // and hand focus back to the banner afterwards.
  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); return }
      if (e.key !== "Tab" || !panelRef.current) return
      const focusables = panelRef.current.querySelectorAll<HTMLElement>('button, [href], [tabindex]:not([tabindex="-1"])')
      if (!focusables.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener("keydown", onKey)
      triggerRef.current?.focus()
    }
  }, [open])

  return (
    <section id="ai" aria-label="How I Work with AI" className="relative z-20 bg-white px-6 sm:px-12 lg:px-20 pb-16 sm:pb-20 lg:pb-24">
      <div className="max-w-7xl mx-auto">
        <button
          ref={triggerRef}
          type="button"
          aria-haspopup="dialog"
          onClick={() => setOpen(true)}
          className="group relative block w-full overflow-hidden rounded-2xl bg-[#0F1735] px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12 text-left cursor-pointer transition-shadow duration-300 hover:shadow-[0_24px_60px_-20px_rgba(15,23,53,0.55)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DB3E8C] focus-visible:ring-offset-4"
        >
          {/* Soft cerise glow on the "resolved" end, where the line comes out straight */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -bottom-32 h-80 w-80 rounded-full opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
            style={{ background: "radial-gradient(circle, rgba(219,62,140,0.55), transparent 70%)" }}
          />
          <span className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center lg:gap-14">
            <span className="block min-w-0">
              <span
                className="block font-display font-medium text-white tracking-tight"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.6rem)", lineHeight: 1.08, letterSpacing: "-0.02em" }}
              >
                How I Work <span className="text-[#F472B6]">with AI</span>
              </span>
              <span className="mt-3 block max-w-[30em] font-sans text-base lg:text-[17px] leading-relaxed text-white/75">
                AI helps me move faster. I still own the thinking, the decisions, and the details.
              </span>
              <span className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#DB3E8C] px-4 py-2.5 font-sans text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-[#DB3E8C]/25 transition-colors group-hover:bg-[#c2337b]">
                See how I use it
                <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </span>
            <BannerLine />
          </span>
        </button>
      </div>

      {createPortal(
        <AnimatePresence>
          {open && (
            <>
              <motion.div
                key="ai-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
                className="fixed inset-0 z-[200] bg-[#19244E]/60 backdrop-blur-sm cursor-pointer"
                aria-hidden="true"
              />
              <motion.div
                key="ai-panel"
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="ai-dialog-title"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed inset-x-0 bottom-0 top-[4vh] z-[201] mx-auto w-full max-w-[1280px] overflow-y-auto overscroll-contain rounded-t-2xl bg-white shadow-[0_-12px_40px_rgba(25,36,78,0.2)] lg:top-[5vh] lg:bottom-[5vh] lg:w-[calc(100%-80px)] lg:rounded-2xl"
              >
                <div className="sticky top-0 z-10 flex justify-end px-4 pt-4 sm:px-6 sm:pt-5">
                  <button
                    ref={closeRef}
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#19244E]/15 bg-white/90 text-[#19244E] shadow-sm backdrop-blur transition-colors hover:border-[#DB3E8C] hover:text-[#DB3E8C] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DB3E8C]"
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="-mt-10 px-6 pt-8 pb-14 sm:px-10 sm:pt-10 lg:px-16 lg:pt-12 lg:pb-16">
                  <AiWorkflowContent />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  )
}
