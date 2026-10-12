import { useState, useEffect, useRef } from "react"
import { CaseStudyHeaderBadge } from "@/app/components/ui/CaseStudyHeaderBadge"

import {
  ArrowLeft, ChevronRight, CheckCircle2, Globe, Home,
  FileCode2, Shield, Zap, RefreshCw, Users, MessageSquare,
  Lock, Sliders, Database, Layers, ArrowRight, Activity, Filter, BarChart3, ChevronDown, Sparkles,
  ClipboardCheck, Split, CheckSquare, Clock, AlertCircle, FileText, ArrowUpRight,
  Menu, Eye, Check, X, CreditCard, Calendar, UserCheck, ShieldCheck, HelpCircle, FileCheck
} from "lucide-react"

import backofficePortalThumb from "@/imports/backoffice portal thumb.jpg"
import backofficeSalesOverview from "@/imports/backoffice-sales-overview.png"
import backofficeCustomerDetail from "@/imports/backoffice-customer-detail.png"

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

// ── Interactive Multi-Tenant Token Swapper Sandbox (Section 03) ──────────────
function MultiTenantTokenSandbox() {
  const [tenant, setTenant] = useState<"mobility" | "insurance" | "commerce">("mobility")

  const tenants = {
    mobility: {
      name: "Ride-Hailing & Mobility Partner",
      accent: "#10B981", // Emerald
      badge: "Mobility & Delivery",
      termUser: "Active Drivers & Riders",
      termMenu: "Internal Benefits & Driver Claims",
      termMetric: "Avg. Claim Resolution Time",
      metricVal: "4.2 Hours",
      claimFocus: "Instant driver medical incident tracking",
    },
    insurance: {
      name: "Regional InsurTech Partner",
      accent: "#EF4444", // Crimson
      badge: "Regional InsurTech",
      termUser: "Policyholders & Agents",
      termMenu: "Policy Funnels & Underwriting Portal",
      termMetric: "Policy Conversion Rate",
      metricVal: "38.6% Conversion",
      claimFocus: "Multi-party eligibility & underwriting review",
    },
    commerce: {
      name: "Commerce Affiliate Network",
      accent: "#3B82F6", // Cobalt
      badge: "Affiliate & Commerce",
      termUser: "Partnership & Affiliate Leads",
      termMenu: "Referral Trees & Tier Commissions",
      termMetric: "Monthly Commission Reconciliation",
      metricVal: "$142,800 Approved",
      claimFocus: "Partner tier commission & payout audits",
    },
  }

  const active = tenants[tenant]

  return (
    <div className="my-8 p-6 rounded-2xl bg-[#0f1738] border border-white/10 text-white shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Sliders size={14} className="text-[#DB3E8C]" />
            <span className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-[#DB3E8C]">
              INTERACTIVE DEMO // TRACK A: REUSABLE WHITE LABEL THEME
            </span>
          </div>
          <h3 className="font-display text-lg lg:text-xl font-bold mt-1 text-white">
            How The Base Re-skins For Different Partners Without Code Rewrites
          </h3>
          <p className="text-xs text-white/70 mt-1 max-w-xl">
            Switch partners to see how tokens update brand colors, customer terminology, and active menus across the shared codebase.
          </p>
        </div>

        {/* Tenant Selector */}
        <div className="flex items-center gap-2 bg-white/5 p-1 rounded-lg border border-white/10">
          {(["mobility", "insurance", "commerce"] as const).map((tKey) => (
            <button
              key={tKey}
              onClick={() => setTenant(tKey)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                tenant === tKey ? "bg-[#DB3E8C] text-white shadow-lg" : "text-white/60 hover:text-white"
              }`}
            >
              {tKey}
            </button>
          ))}
        </div>
      </div>

      {/* Simulator Display */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
          <span className="text-[10px] text-gray-400 uppercase tracking-widest block font-mono">1. Brand & Channel Token</span>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: active.accent }} />
            <span className="text-sm font-bold text-white">{active.name}</span>
          </div>
          <span
            className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full uppercase mt-1"
            style={{ backgroundColor: `${active.accent}20`, color: active.accent }}
          >
            {active.badge}
          </span>
        </div>

        <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
          <span className="text-[10px] text-gray-400 uppercase tracking-widest block font-mono">2. Customized Menus & Roles</span>
          <span className="text-xs font-bold text-[#DB3E8C] block">{active.termMenu}</span>
          <p className="text-[11px] text-gray-400">
            Target Entity: <strong className="text-white">{active.termUser}</strong>
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
          <span className="text-[10px] text-gray-400 uppercase tracking-widest block font-mono">3. Operational KPI Focus</span>
          <span className="text-xs font-bold text-[#22c55e] block">{active.metricVal}</span>
          <p className="text-[11px] text-gray-400">{active.claimFocus}</p>
        </div>
      </div>
    </div>
  )
}

// ── Dummy Sanitized ID Card Component ────────────────────────────────────────
function DummyMyKadCard({ name, icNumber, dob, photoLabel }: { name: string; icNumber: string; dob: string; photoLabel: string }) {
  return (
    <div className="w-full max-w-[320px] sm:max-w-[360px] rounded-lg p-2.5 bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 border border-slate-300 text-slate-700 shadow-xs relative overflow-hidden select-none font-sans text-[10px]">
      {/* Top flag watermark / header */}
      <div className="flex items-center justify-between pb-1.5 border-b border-slate-300 mb-2">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-2.5 bg-slate-400 rounded-xs flex items-center justify-center text-[7px] text-white font-bold">
            ID
          </div>
          <span className="font-bold tracking-wider text-[8.5px] text-slate-600 uppercase">
            KAD PENGENALAN (DUMMY WIREFRAME)
          </span>
        </div>
        <span className="font-mono text-[8.5px] font-bold text-slate-500">{icNumber}</span>
      </div>

      {/* Card body */}
      <div className="grid grid-cols-[1fr_55px] gap-2 items-center">
        <div className="space-y-1 min-w-0">
          {/* Smart Chip graphic */}
          <div className="w-6 h-4.5 rounded-xs bg-amber-200/90 border border-amber-400/80 grid grid-cols-2 gap-0.5 p-0.5">
            <div className="border-r border-amber-500/40" />
            <div className="border-l border-amber-500/40" />
          </div>
          <div className="min-w-0">
            <span className="text-[7px] uppercase text-slate-500 block font-semibold">NAME / NAMA</span>
            <span className="font-bold text-[9px] text-slate-800 leading-tight block break-words">{name}</span>
          </div>
          <div>
            <span className="text-[7px] uppercase text-slate-500 block font-semibold">DOB / TANGGAL LAHIR</span>
            <span className="font-mono text-[8px] text-slate-700">{dob}</span>
          </div>
        </div>

        {/* Dummy silhouette portrait */}
        <div className="w-13 h-15 rounded-md bg-slate-300 border border-slate-400 flex flex-col items-center justify-center text-slate-500 p-1 shrink-0">
          <Users size={18} className="text-slate-500" />
          <span className="text-[6.5px] font-bold uppercase mt-1 tracking-tighter text-slate-600 text-center leading-tight">
            {photoLabel}
          </span>
        </div>
      </div>
    </div>
  )
}

// ── Track A: Baseline Production Portal Preview (Standard Flow) ─────────────
function TrackAStandardClaimView({
  currentTab,
  onTabChange,
}: {
  currentTab: "summary" | "documents"
  onTabChange: (tab: "summary" | "documents") => void
}) {
  const [viewMode, setViewMode] = useState<"list" | "detail">("detail")

  return (
    <div className="bg-[#f4f6f8] text-slate-800 text-xs font-sans min-h-[580px]">
      {/* ── Teal Brand Top Bar (From Production Screenshot) ── */}
      <div className="bg-[#007b8b] text-white px-5 py-2.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <Menu size={16} className="text-white/80 cursor-pointer hover:text-white" />
          <span className="font-bold text-xs tracking-tight">Enterprise Claims Portal</span>
          <span className="text-[10px] bg-white/15 px-2 py-0.5 rounded text-white/90 font-mono hidden sm:inline">
            Partner A (Standard Base)
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs">
          {/* Quick toggle between Claim List table and Claim Detail */}
          <div className="hidden sm:flex items-center gap-1 bg-black/20 p-0.5 rounded text-[10px]">
            <button
              onClick={() => setViewMode("list")}
              className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                viewMode === "list" ? "bg-white text-[#007b8b] font-bold" : "text-white/80 hover:text-white"
              }`}
            >
              Table View
            </button>
            <button
              onClick={() => setViewMode("detail")}
              className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                viewMode === "detail" ? "bg-white text-[#007b8b] font-bold" : "text-white/80 hover:text-white"
              }`}
            >
              Detail View
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white/90 text-[11px] hidden md:inline">Hi, Super Admin</span>
            <div className="w-5 h-5 rounded-full bg-white text-[#007b8b] font-bold flex items-center justify-center text-[10px] shadow-xs">
              S
            </div>
          </div>
        </div>
      </div>

      {viewMode === "list" ? (
        /* ── TABLE VIEW (SCREENSHOT 1) ── */
        <div className="p-4 sm:p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-bold text-base text-slate-900 tracking-tight">Claim List</h3>
            <div className="flex flex-wrap items-center gap-2 text-[11px]">
              <div className="px-2.5 py-1 rounded border border-slate-300 bg-white text-slate-600 flex items-center gap-1.5">
                <Calendar size={12} className="text-slate-400" />
                <span>Pick a date</span>
              </div>
              <div className="px-2.5 py-1 rounded border border-slate-300 bg-white text-slate-600 flex items-center gap-1.5">
                <span>Teman (All Partners)</span>
                <ChevronDown size={12} className="text-slate-400" />
              </div>
              <div className="px-2.5 py-1 rounded border border-slate-300 bg-white text-slate-600 flex items-center gap-1.5">
                <span>SLA Status</span>
                <ChevronDown size={12} className="text-slate-400" />
              </div>
              <button className="px-3 py-1 rounded bg-teal-600 text-white font-semibold flex items-center gap-1">
                <span>Export Report</span>
              </button>
            </div>
          </div>

          {/* Status Tabs */}
          <div className="flex border-b border-slate-200 gap-1 overflow-x-auto text-[11px]">
            <button className="py-2 px-3 border-b-2 border-teal-600 text-teal-800 font-bold flex items-center gap-1.5 whitespace-nowrap">
              <span>All Claim</span>
              <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[9px]">400</span>
            </button>
            <button className="py-2 px-3 text-slate-500 hover:text-slate-800 whitespace-nowrap">
              Submitted
            </button>
            <button className="py-2 px-3 text-slate-500 hover:text-slate-800 whitespace-nowrap">
              Acknowledged
            </button>
            <button className="py-2 px-3 text-slate-500 hover:text-slate-800 whitespace-nowrap">
              Document Review Operator
            </button>
            <button className="py-2 px-3 text-slate-500 hover:text-slate-800 whitespace-nowrap">
              Reupload Document Review
            </button>
          </div>

          {/* Search box */}
          <div className="relative">
            <input
              type="text"
              defaultValue="CLM-20260930-00006"
              placeholder="Search by Claim ID..."
              className="w-full py-2 pl-3 pr-8 rounded-lg border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none"
            />
            <span className="absolute right-2.5 top-2.5 text-slate-400">🔍</span>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
            <table className="w-full text-left text-[11px]">
              <thead className="bg-slate-50 text-[10px] text-slate-400 font-mono uppercase border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">No.</th>
                  <th className="py-2.5 px-3">Claim ID</th>
                  <th className="py-2.5 px-3">Policy ID</th>
                  <th className="py-2.5 px-3">Customer Name</th>
                  <th className="py-2.5 px-3">Plan Name</th>
                  <th className="py-2.5 px-3">Benefit</th>
                  <th className="py-2.5 px-3">Amount</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  {
                    no: 1,
                    id: "CLM-20260930-00006",
                    policy: "PLC-20260915-0002",
                    name: "teman19agustus (Dummy)",
                    plan: "SIMAS Travel Overseas - Plan A",
                    benefit: "Kecelakaan Diri",
                    amt: "Rp 15,000,000",
                  },
                  {
                    no: 2,
                    id: "CLM-20260928-00012",
                    policy: "PLC-20260916-0010",
                    name: "teman19agustus (Dummy)",
                    plan: "GEGI Travel Worldwide - Family",
                    benefit: "Pembajakan (> 4 jam)",
                    amt: "Rp 25,000,000",
                  },
                  {
                    no: 3,
                    id: "CLM-20260928-00010",
                    policy: "PLC-20260923-0004",
                    name: "teman19agustus (Dummy)",
                    plan: "MTWI Motor TLO",
                    benefit: "Tanggung Jawab Hukum Pihak 3",
                    amt: "Rp 10,000,000",
                  },
                ].map((row) => (
                  <tr key={row.no} className="hover:bg-slate-50/70">
                    <td className="py-2.5 px-3 text-slate-400 font-mono">{row.no}</td>
                    <td className="py-2.5 px-3 font-mono font-semibold text-slate-900">{row.id}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-600">{row.policy}</td>
                    <td className="py-2.5 px-3 text-slate-700">{row.name}</td>
                    <td className="py-2.5 px-3 text-slate-700 max-w-[160px] truncate">{row.plan}</td>
                    <td className="py-2.5 px-3 font-medium text-slate-800">{row.benefit}</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-900">{row.amt}</td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        onClick={() => setViewMode("detail")}
                        className="px-2.5 py-1 rounded bg-[#007b8b] text-white text-[10px] font-bold hover:bg-[#005b67] transition-colors cursor-pointer"
                      >
                        Inspect &rarr;
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
              <span>Showing: 1 to 3 of 400 items</span>
              <button
                onClick={() => setViewMode("detail")}
                className="text-teal-700 font-semibold hover:underline cursor-pointer"
              >
                Click row to view Claim Detail page &rarr;
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ── DETAIL VIEW (SCREENSHOT 2) ── */
        <div>
          {/* Subheader Bar */}
          <div className="bg-white border-b border-slate-200 px-5 py-3 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                <span
                  onClick={() => setViewMode("list")}
                  className="hover:underline cursor-pointer text-slate-500"
                >
                  Claim
                </span>
                <span>&gt;</span>
                <span
                  onClick={() => setViewMode("list")}
                  className="hover:underline cursor-pointer text-slate-500"
                >
                  List
                </span>
                <span>&gt;</span>
                <span className="text-slate-700 font-semibold">Detail</span>
              </div>
              <h3 className="font-bold text-base text-slate-900 tracking-tight mt-0.5">Detail Claim</h3>
            </div>
            <button
              onClick={() => setViewMode("list")}
              className="text-rose-600 font-semibold text-xs hover:underline cursor-pointer flex items-center gap-1"
            >
              &lt; Back to Claim List
            </button>
          </div>

          {/* Two-Tab Navigation Bar (Summary vs Documents) */}
          <div className="bg-white border-b border-slate-200 px-5 flex items-center gap-8">
            <button
              onClick={() => onTabChange("summary")}
              className={`py-3 text-xs font-bold border-b-2 transition-all cursor-pointer ${
                currentTab === "summary"
                  ? "border-sky-600 text-sky-700"
                  : "border-transparent text-slate-400 hover:text-slate-700"
              }`}
            >
              Summary
            </button>
            <button
              onClick={() => onTabChange("documents")}
              className={`py-3 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                currentTab === "documents"
                  ? "border-sky-600 text-sky-700"
                  : "border-transparent text-slate-400 hover:text-slate-700"
              }`}
            >
              <span>Documents</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-600 font-mono">
                5
              </span>
            </button>
          </div>

          {/* Tab Content */}
          {currentTab === "summary" ? (
            <div className="p-4 sm:p-5 grid md:grid-cols-[240px_1fr] gap-4 items-start">
              {/* Left Column: Status Claim Timeline */}
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-4">
                  <span className="font-bold text-slate-900 text-xs block">Status Claim</span>

                  {/* Vertical Timeline from Screenshot */}
                  <div className="space-y-4 relative pl-2">
                    <div className="flex items-start gap-3 relative">
                      <div className="w-2.5 h-2.5 rounded-full bg-sky-600 mt-1 shrink-0 ring-4 ring-sky-100" />
                      <div>
                        <span className="font-bold text-slate-900 text-xs block">Submitted</span>
                        <span className="text-[10px] text-slate-500 block">October 2, 2026 3:48 PM</span>
                      </div>
                    </div>

                    <div className="w-0.5 h-5 bg-slate-200 absolute left-3 top-2.5 -z-0" />

                    <div className="flex items-start gap-3 relative">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-300 mt-1 shrink-0" />
                      <div>
                        <span className="font-semibold text-slate-500 text-xs block">Draft</span>
                        <span className="text-[10px] text-slate-400 block">September 30, 2026 10:27 AM</span>
                      </div>
                    </div>
                  </div>

                  {/* Review Document CTA */}
                  <div className="pt-2 border-t border-slate-100">
                    <button
                      onClick={() => onTabChange("documents")}
                      className="w-full py-2 px-3 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <FileText size={13} />
                      <span>Review Documents &rarr;</span>
                    </button>
                  </div>
                </div>

                {/* Architecture Annotation Callout */}
                <div className="p-3 bg-teal-50 border border-teal-200/80 rounded-xl text-teal-900 text-[11px] leading-relaxed space-y-1">
                  <strong className="block font-bold text-teal-950">Track A UI Pattern:</strong>
                  <p className="text-teal-800">
                    Data is laid out in a single vertical stack. Reviewers must flip to the <strong>Documents tab</strong> to cross-check files against claimant details.
                  </p>
                </div>
              </div>

              {/* Right Column: Stacked Data Cards */}
              <div className="space-y-3.5">
                {/* Card 1: Detail Claim */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
                  <h4 className="font-bold text-slate-900 text-xs">Detail Claim</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-4 text-[11px]">
                    <div className="flex items-start gap-2">
                      <span className="w-32 text-slate-400 shrink-0">Claim Number</span>
                      <span className="font-mono font-semibold text-slate-800">: CLM-20260930-00006</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-32 text-slate-400 shrink-0">Customer Name</span>
                      <span className="font-semibold text-slate-800">: teman19agustus (Dummy)</span>
                    </div>
                    <div className="flex items-start gap-2 sm:col-span-2">
                      <span className="w-32 text-slate-400 shrink-0">Plan Name</span>
                      <span className="text-slate-800 font-medium">
                        : SIMAS Travel Overseas - Individual - Sekali Jalan - Plan A (Dummy)
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-32 text-slate-400 shrink-0">Benefit</span>
                      <span className="text-slate-800 font-semibold">: Kecelakaan Diri (Personal Accident)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-32 text-slate-400 shrink-0">Requested Amount</span>
                      <span className="font-mono text-slate-800 font-semibold">: Rp 15,000,000</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-32 text-slate-400 shrink-0">Approved Amount</span>
                      <span className="font-mono text-emerald-700 font-bold">: Rp 15,000,000</span>
                    </div>
                  </div>
                </div>

                {/* Card 2: Informasi Pemegang Polis */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
                  <h4 className="font-bold text-slate-900 text-xs">Informasi Pemegang Polis</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-[11px]">
                    <div className="flex items-center gap-2">
                      <span className="w-32 text-slate-400 shrink-0">Customer Name</span>
                      <span className="font-medium text-slate-800">: teman19agustus (Dummy)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-32 text-slate-400 shrink-0">Phone Number</span>
                      <span className="font-mono text-slate-800">: +6282219082025</span>
                    </div>
                    <div className="flex items-center gap-2 sm:col-span-2">
                      <span className="w-32 text-slate-400 shrink-0">Email</span>
                      <span className="font-mono text-slate-800">: teman19agustus@yopmail.com</span>
                    </div>
                  </div>
                </div>

                {/* Card 3: Informasi Tertanggung (with ID card) */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
                  <h4 className="font-bold text-slate-900 text-xs">Informasi Tertanggung</h4>
                  <div className="grid sm:grid-cols-[140px_1fr] gap-4 items-center">
                    <div className="rounded-lg border border-slate-300 bg-slate-100 p-2 text-center text-slate-600 space-y-1">
                      <div className="w-10 h-10 mx-auto rounded-full bg-slate-300 flex items-center justify-center text-slate-500">
                        <Users size={18} />
                      </div>
                      <span className="text-[9px] font-mono font-bold block text-slate-700">IDN PASPOR (DUMMY)</span>
                      <span className="text-[8px] font-mono block text-slate-400">NO: C8965210</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-[11px]">
                      <div className="flex items-center gap-2">
                        <span className="w-28 text-slate-400 shrink-0">No. Polis</span>
                        <span className="font-mono text-slate-800">: PLC-20260915-0002</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-28 text-slate-400 shrink-0">No. Peserta</span>
                        <span className="font-mono text-slate-800">: INS-20260915-0006</span>
                      </div>
                      <div className="flex items-center gap-2 sm:col-span-2">
                        <span className="w-28 text-slate-400 shrink-0">Nama Lengkap</span>
                        <span className="font-semibold text-slate-800">: HAPKRI ANTHONY ADAM (DUMMY)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-28 text-slate-400 shrink-0">Gender</span>
                        <span className="text-slate-800">: L / M</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-28 text-slate-400 shrink-0">Kode Negara</span>
                        <span className="text-slate-800">: IDN</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-28 text-slate-400 shrink-0">No. Passport</span>
                        <span className="font-mono text-slate-800">: C8965210</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-28 text-slate-400 shrink-0">Kewarganegaraan</span>
                        <span className="text-slate-800">: INDONESIA</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-28 text-slate-400 shrink-0">Tgl. Lahir</span>
                        <span className="text-slate-800">: 1974-08-17</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-28 text-slate-400 shrink-0">Tempat Lahir</span>
                        <span className="text-slate-800">: BASAAN</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 4: Informasi Pribadi & Rekening */}
                <div className="grid sm:grid-cols-2 gap-3.5">
                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
                    <h4 className="font-bold text-slate-900 text-xs">Informasi Pribadi</h4>
                    <div className="space-y-1 text-[11px]">
                      <div className="flex items-start gap-2">
                        <span className="w-24 text-slate-400 shrink-0">Handphone</span>
                        <span className="font-mono text-slate-800">: +6282219082025</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="w-24 text-slate-400 shrink-0">Alamat</span>
                        <span className="text-slate-800 leading-snug">: Jl. Gambir Sentral No. 12, Jakarta Pusat</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
                    <h4 className="font-bold text-slate-900 text-xs">Informasi Rekening</h4>
                    <div className="space-y-1 text-[11px]">
                      <div className="flex items-start gap-2">
                        <span className="w-24 text-slate-400 shrink-0">Nama</span>
                        <span className="font-semibold text-slate-800">: Rina Maharani (Dummy)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="w-24 text-slate-400 shrink-0">Nama Bank</span>
                        <span className="text-slate-800">: Bank Sinarmas</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="w-24 text-slate-400 shrink-0">No. Rekening</span>
                        <span className="font-mono text-slate-800">: 1234567890</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Documents Tab View */
            <div className="p-4 sm:p-5 space-y-4">
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">Lampiran Dokumen Klaim (Document Review)</h4>
                    <p className="text-[11px] text-slate-500">
                      Periksa kelengkapan berkas fisik / digital untuk validasi klaim.
                    </p>
                  </div>
                  <button
                    onClick={() => onTabChange("summary")}
                    className="text-xs text-sky-700 font-bold hover:underline cursor-pointer"
                  >
                    &larr; Switch back to Summary
                  </button>
                </div>

                <div className="border border-slate-200 rounded-lg overflow-hidden text-[11px]">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 text-[10px] text-slate-400 uppercase font-mono border-b border-slate-200">
                      <tr>
                        <th className="py-2.5 px-3">No.</th>
                        <th className="py-2.5 px-3">Nama Berkas</th>
                        <th className="py-2.5 px-3">Tanggal Unggah</th>
                        <th className="py-2.5 px-3">Status Verifikasi</th>
                        <th className="py-2.5 px-3 text-right">Aksi Operator</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        { name: "Asli Boarding Pass, Tiket atau Itinerary", date: "02 Okt 2026", status: "Verified ✓", valid: true },
                        { name: "Paspor / KTP Identitas Tertanggung", date: "02 Okt 2026", status: "Verified ✓", valid: true },
                        { name: "Resume Medis Rumah Sakit & Kwitansi", date: "02 Okt 2026", status: "Verified ✓", valid: true },
                        { name: "Surat Laporan Kepolisian Asli", date: "02 Okt 2026", status: "Need Review", valid: false },
                        { name: "Formulir Pengajuan Klaim Resmi", date: "02 Okt 2026", status: "Verified ✓", valid: true },
                      ].map((doc, idx) => (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="py-2.5 px-3 font-mono text-slate-400">{idx + 1}.</td>
                          <td className="py-2.5 px-3 font-medium text-slate-800">{doc.name}</td>
                          <td className="py-2.5 px-3 text-slate-500">{doc.date}</td>
                          <td className="py-2.5 px-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                doc.valid ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {doc.status}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-right space-x-1.5">
                            <button className="px-2 py-1 rounded bg-slate-200 text-slate-700 text-[10px] font-bold hover:bg-slate-300 transition-colors cursor-pointer">
                              Preview
                            </button>
                            <button className="px-2 py-1 rounded bg-[#007b8b] text-white text-[10px] font-bold hover:bg-[#005b67] transition-colors cursor-pointer">
                              Approve
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                  <span className="text-[11px] text-slate-500">
                    5 Dokumen Diunggah · 4 Terverifikasi · 1 Menunggu Verifikasi
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onTabChange("summary")}
                      className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                    >
                      &larr; Review Summary Data
                    </button>
                    <button
                      onClick={() => onTabChange("summary")}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 shadow-xs cursor-pointer"
                    >
                      Approve Claim Completeness ✓
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── Interactive Claim Review Split-Panel Preview (Section 04) ────────────────
function PartnerBClaimReviewPreview() {
  const [activeTrack, setActiveTrack] = useState<"trackA" | "trackB">("trackB")
  const [trackATab, setTrackATab] = useState<"summary" | "documents">("summary")
  const [activeStage, setActiveStage] = useState<"investigation" | "approval" | "disbursement">("investigation")
  const [deductDue, setDeductDue] = useState(true)
  const [paymentStatus, setPaymentStatus] = useState("Payment Unsuccessful")
  // By default, hide sidebar to maximize workspace and ensure full responsiveness
  const [showSidebar, setShowSidebar] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [rightHeight, setRightHeight] = useState<number | undefined>(620)
  const rightPanelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResize = () => {
      const desktop = typeof window !== "undefined" && window.innerWidth >= 1024
      setIsDesktop(desktop)
      if (rightPanelRef.current && desktop) {
        setRightHeight(rightPanelRef.current.offsetHeight)
      } else if (!desktop) {
        setRightHeight(undefined)
      }
    }

    handleResize()
    const rafId = requestAnimationFrame(handleResize)

    const el = rightPanelRef.current
    let ro: ResizeObserver | null = null
    if (el && typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => {
        handleResize()
      })
      ro.observe(el)
    }

    window.addEventListener("resize", handleResize)
    return () => {
      cancelAnimationFrame(rafId)
      ro?.disconnect()
      window.removeEventListener("resize", handleResize)
    }
  }, [activeStage, deductDue, paymentStatus])

  return (
    <div className="my-8 rounded-2xl bg-slate-900 border border-slate-800 text-slate-100 overflow-hidden shadow-2xl">
      {/* ── Mock Desktop Browser Window Title Bar ────────────────────────── */}
      <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-[11px] font-mono text-slate-400 ml-2 hidden sm:inline">
            {activeTrack === "trackA"
              ? "portal.baseline-backoffice.internal/claims/CLM-20260930-00006/detail"
              : "portal.enterprise-backoffice.internal/claims/CLM-1234394/detail"}
          </span>
        </div>

        {/* Track Architecture Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          <span className="text-[10px] font-mono text-slate-400 uppercase px-2 hidden md:inline">
            Compare Architecture:
          </span>
          <button
            onClick={() => setActiveTrack("trackA")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTrack === "trackA"
                ? "bg-[#007b8b] text-white shadow-md ring-1 ring-teal-400/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <FileText size={13} />
            <span>Track A: Baseline (Linear)</span>
          </button>
          <button
            onClick={() => setActiveTrack("trackB")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTrack === "trackB"
                ? "bg-[#DB3E8C] text-white shadow-md ring-1 ring-pink-400/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Split size={13} />
            <span>Track B: Bespoke (Split-Panel)</span>
          </button>
        </div>
      </div>

      {/* ── Workflow Subheader Strip ── */}
      {activeTrack === "trackB" ? (
        <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-slate-300 text-[11px]">
            <span className="w-2 h-2 rounded-full bg-[#DB3E8C] animate-pulse" />
            <span className="font-semibold text-slate-200">Track B Multi-Stage Governance:</span>
          </div>
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setActiveStage("investigation")}
              className={`px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeStage === "investigation"
                  ? "bg-slate-700 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Stage 1: Investigation
            </button>
            <button
              onClick={() => setActiveStage("approval")}
              className={`px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeStage === "approval"
                  ? "bg-slate-700 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Stage 2: Approval & Payee
            </button>
            <button
              onClick={() => setActiveStage("disbursement")}
              className={`px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeStage === "disbursement"
                  ? "bg-slate-700 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Stage 3: Disbursement
            </button>
          </div>
        </div>
      ) : (
        <div className="px-4 py-2 bg-teal-950/80 border-b border-teal-800/40 flex flex-wrap items-center justify-between gap-2 text-xs text-teal-200">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span className="font-medium text-[11px]">
              Production Baseline: Standard 1-column layout with tab switching between Summary & Documents.
            </span>
          </div>
          <span className="text-[10px] font-mono text-teal-300/80 bg-teal-900/60 px-2 py-0.5 rounded border border-teal-700/50">
            Original White Label Template
          </span>
        </div>
      )}

      {/* ── Content View Switcher ── */}
      {activeTrack === "trackA" ? (
        <TrackAStandardClaimView currentTab={trackATab} onTabChange={setTrackATab} />
      ) : (
        /* ── Portal UI Container (Grey Dummy Wireframe Aesthetic for Track B) ── */
        <div className="bg-[#f4f6f8] text-slate-800 text-xs font-sans flex">
        {/* Left Backoffice Sidebar - Hidden by default, toggleable */}
        {showSidebar && (
          <div className="w-52 shrink-0 bg-white border-r border-slate-200 hidden md:flex flex-col justify-between transition-all duration-200 animate-in fade-in">
            <div>
              {/* Logo */}
              <div className="p-3.5 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-md bg-slate-700 flex items-center justify-center text-white font-bold text-[10px]">
                    L
                  </div>
                  <span className="font-bold text-xs tracking-tight text-slate-800">Logoipsum</span>
                </div>
                <button
                  onClick={() => setShowSidebar(false)}
                  className="text-slate-400 hover:text-slate-600 cursor-pointer p-0.5"
                  title="Close sidebar"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Menu Sections */}
              <div className="py-2.5 px-2 space-y-4 text-[11px]">
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider px-2 block mb-1">
                    Dashboard
                  </span>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2 px-2 py-1.5 rounded-md text-slate-600 hover:bg-slate-100">
                      <BarChart3 size={13} className="text-slate-400 shrink-0" />
                      <span>Reporting Dashboard</span>
                    </div>
                    <div className="flex items-center gap-2 px-2 py-1.5 rounded-md text-slate-600 hover:bg-slate-100">
                      <FileText size={13} className="text-slate-400 shrink-0" />
                      <span>Drop-Off List</span>
                    </div>
                  </div>
                </div>

                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider px-2 block mb-1">
                    Transactions
                  </span>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2 px-2 py-1.5 rounded-md text-slate-600 hover:bg-slate-100">
                      <CreditCard size={13} className="text-slate-400 shrink-0" />
                      <span>Transactions List</span>
                    </div>
                  </div>
                </div>

                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider px-2 block mb-1">
                    Claim
                  </span>
                  <div className="space-y-0.5">
                    {/* Highlighted active menu */}
                    <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-slate-200/90 text-slate-900 font-bold border border-slate-300/80 shadow-2xs">
                      <ClipboardCheck size={13} className="text-slate-700 shrink-0" />
                      <span>Claim List</span>
                    </div>
                    <div className="flex items-center gap-2 px-2 py-1.5 rounded-md text-slate-600 hover:bg-slate-100">
                      <Clock size={13} className="text-slate-400 shrink-0" />
                      <span>Claim History</span>
                    </div>
                  </div>
                </div>

                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider px-2 block mb-1">
                    Masterdata
                  </span>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2 px-2 py-1.5 rounded-md text-slate-600 hover:bg-slate-100">
                      <Database size={13} className="text-slate-400 shrink-0" />
                      <span>Product & Settings</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 border-t border-slate-100 text-[10px] text-slate-400">
              <span>Partner B Internal</span>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Bar Header */}
          <div className="bg-white border-b border-slate-200 px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              {/* Sidebar toggle button */}
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className={`p-1 rounded-md border text-slate-600 transition-colors cursor-pointer flex items-center gap-1.5 mr-1 ${
                  showSidebar ? "bg-slate-100 border-slate-300 text-slate-900" : "bg-white border-slate-200 hover:bg-slate-50"
                }`}
                title={showSidebar ? "Hide sidebar" : "Show sidebar"}
              >
                <Menu size={14} />
                <span className="text-[10px] text-slate-500 font-medium hidden sm:inline">
                  {showSidebar ? "Hide Menu" : "Menu"}
                </span>
              </button>
              <span className="text-slate-400">Product Category</span>
              <span>&gt;</span>
              <span className="text-slate-400">Travel</span>
              <span>&gt;</span>
              <span className="text-slate-700 font-medium">Claim Detail</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="text-[11px] text-rose-600 font-semibold hover:underline cursor-pointer">
                &lt; Kembali
              </button>
              <div className="h-4 w-px bg-slate-200" />
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-600">Hi, Super Admin</span>
                <div className="w-5 h-5 rounded-full bg-slate-600 text-white font-bold flex items-center justify-center text-[9px]">
                  S
                </div>
              </div>
            </div>
          </div>

          {/* Subheader Title */}
          <div className="px-5 py-3 border-b border-slate-200/80 bg-white/70 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-900 tracking-tight">Claim Detail</h3>
              <span className="text-[10px] text-slate-400 font-mono">
                Claim Reference: #CLM-1234394 · ShieldProtect Plus Plan A
              </span>
            </div>
            <div className="text-[10px] bg-slate-100 border border-slate-300/80 px-2.5 py-1 rounded text-slate-600 font-mono">
              Role View: {activeStage === "investigation" ? "Investigator" : activeStage === "approval" ? "Underwriter" : "Finance Disbursal"}
            </div>
          </div>

          {/* Two-Column Split: Matched Equal Height Container */}
          <div className="p-4 flex-1 flex flex-col lg:flex-row items-start gap-4">
            
            {/* ── LEFT SCROLLABLE CONTAINER (HEIGHT MATCHES RIGHT PANEL) ──── */}
            <div
              style={{
                height: rightHeight && isDesktop ? `${rightHeight}px` : undefined,
                maxHeight: rightHeight && isDesktop ? `${rightHeight}px` : undefined,
              }}
              className="flex-1 min-w-0 w-full overflow-y-auto space-y-3.5 pr-2.5 scroll-smooth"
            >
              
              {/* Card 1: Claim Status */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs">Claim Status</span>
                  <a href="#timeline" onClick={(e) => e.preventDefault()} className="text-[11px] text-slate-500 hover:text-slate-800 underline">
                    View Timeline
                  </a>
                </div>

                <div className="space-y-1">
                  <div className="w-full sm:w-64 p-2 rounded-lg border border-slate-300 bg-white font-medium text-slate-800 flex items-center justify-between">
                    <span>{activeStage === "approval" ? "Approved" : "Investigation"}</span>
                    <ChevronDown size={14} className="text-slate-400" />
                  </div>
                  <span className="text-[10px] text-slate-400 block">Last Updated: 12 / 12 / 2025</span>
                </div>

                {/* Info Banners mimicking screenshot */}
                {activeStage === "investigation" && (
                  <div className="p-3 rounded-lg bg-sky-50 border border-sky-200 text-sky-900 flex items-start justify-between gap-3 text-[11px]">
                    <div className="flex items-start gap-2">
                      <AlertCircle size={14} className="text-sky-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-semibold block text-sky-950">Initiate Assessment</strong>
                        Verify coverage eligibility based on event date, policy validity, and applicable waiting periods.
                      </div>
                    </div>
                    <button className="text-[10px] text-sky-700 font-bold underline shrink-0">View Detail</button>
                  </div>
                )}

                {activeStage === "approval" && (
                  <div className="p-3 rounded-lg bg-sky-50 border border-sky-200 text-sky-900 flex items-start justify-between gap-3 text-[11px]">
                    <div className="flex items-start gap-2">
                      <AlertCircle size={14} className="text-sky-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-semibold block text-sky-950">Payee Configuration</strong>
                        Verify coverage eligibility based on event date, policy validity, and applicable waiting periods.
                      </div>
                    </div>
                    <button className="text-[10px] text-sky-700 font-bold underline shrink-0">View Detail</button>
                  </div>
                )}

                {activeStage === "disbursement" && (
                  <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-2 text-[11px]">
                    <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold text-emerald-950">Recommend Accept</strong>
                      Event date within policy period, waiting period fulfilled. Approved for disbursement tracking.
                    </div>
                  </div>
                )}
              </div>

              {/* Card 2: Plan Detail */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                <span className="font-bold text-slate-900 text-xs block">Plan Detail</span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4 text-[11px]">
                  <div>
                    <span className="text-[9px] uppercase text-slate-400 font-mono block">PLAN NAME</span>
                    <span className="font-semibold text-slate-800">ShieldProtect Plus Plan A (Dummy)</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase text-slate-400 font-mono block">CERTIFICATE NUMBER</span>
                    <span className="font-mono text-slate-700 font-semibold">POL-2025-08921</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase text-slate-400 font-mono block">EFFECTIVE DATE</span>
                    <span className="text-slate-700">1 June 2025</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase text-slate-400 font-mono block">MONTHLY CONTRIBUTION</span>
                    <span className="font-mono text-slate-800 font-bold">RM 6.25</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase text-slate-400 font-mono block">CERTIFICATE STATUS</span>
                    <span className="font-bold text-amber-600">Grace Period</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase text-slate-400 font-mono block">SUM COVERED FOR PLAN</span>
                    <span className="font-mono text-slate-800 font-bold">RM 5,000.00</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase text-slate-400 font-mono block">POLICY PERIOD</span>
                    <span className="text-slate-700">1 June 2025 – 1 June 2026</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase text-slate-400 font-mono block">NEXT CONTRIBUTION DUE</span>
                    <span className="text-slate-700">1 June 2025</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase text-slate-400 font-mono block">NEXT GRACE PERIOD</span>
                    <span className="text-slate-700">30 Days</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase text-slate-400 font-mono block">ANB WHEN PURCHASE</span>
                    <span className="text-slate-700">25</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase text-slate-400 font-mono block">LOOK OUT PERIOD</span>
                    <span className="text-slate-700 font-bold">90 Days</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase text-slate-400 font-mono block">WAITING PERIOD</span>
                    <span className="text-slate-700 font-bold">14 Days</span>
                  </div>
                </div>
              </div>

              {/* Card 3: Participant's Info */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                <span className="font-bold text-slate-900 text-xs block">Participant's info</span>
                <div className="space-y-3">
                  <DummyMyKadCard
                    name="SARAH AMIRA (DUMMY PARTICIPANT)"
                    icNumber="920815-14-XXXX"
                    dob="15 AUG 1992"
                    photoLabel="PARTICIPANT"
                  />
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2.5 gap-x-4 text-[11px] pt-1">
                    <div>
                      <span className="text-[9px] uppercase text-slate-400 font-mono block">NAMA LENGKAP</span>
                      <span className="font-semibold text-slate-800">SARAH AMIRA BINTI Y.</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase text-slate-400 font-mono block">NOMOR MYKAD</span>
                      <span className="font-mono text-slate-700">920815-14-XXXX</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase text-slate-400 font-mono block">TANGGAL LAHIR</span>
                      <span className="text-slate-700">15 AUG 1992</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase text-slate-400 font-mono block">GENDER</span>
                      <span className="text-slate-700">Perempuan</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[9px] uppercase text-slate-400 font-mono block">ALAMAT MYKAD</span>
                      <span className="text-slate-700">No. 42, Jalan Angkasa Raya, Wilayah Sentral, 50480</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 4: Person Covered Info */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                <span className="font-bold text-slate-900 text-xs block">Person Covered info</span>
                <div className="space-y-3">
                  <DummyMyKadCard
                    name="SARAH AMIRA (DUMMY PARTICIPANT)"
                    icNumber="920815-14-XXXX"
                    dob="15 AUG 1992"
                    photoLabel="COVERED"
                  />
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-4 text-[11px] pt-1">
                    <div>
                      <span className="text-[9px] uppercase text-slate-400 font-mono block">NAMA LENGKAP</span>
                      <span className="font-semibold text-slate-800">SARAH AMIRA BINTI Y.</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase text-slate-400 font-mono block">NOMOR MYKAD</span>
                      <span className="font-mono text-slate-700">920815-14-XXXX</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase text-slate-400 font-mono block">GENDER</span>
                      <span className="text-slate-700">Perempuan</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 5: Claimant Info */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                <span className="font-bold text-slate-900 text-xs block">Claimant info</span>
                <div className="space-y-3">
                  <DummyMyKadCard
                    name="FARHAN RASHID (DUMMY CLAIMANT)"
                    icNumber="890412-10-XXXX"
                    dob="12 APR 1989"
                    photoLabel="CLAIMANT"
                  />
                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                    <div>
                      <span className="text-[9px] uppercase text-slate-400 font-mono block">NAMA LENGKAP</span>
                      <span className="font-semibold text-slate-800">FARHAN BIN RASHID</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase text-slate-400 font-mono block">NOMOR MYKAD</span>
                      <span className="font-mono text-slate-700">890412-10-XXXX</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 6: Nominee Info */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                <span className="font-bold text-slate-900 text-xs block">Nominee info</span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2.5 gap-x-4 text-[11px]">
                  <div>
                    <span className="text-[9px] uppercase text-slate-400 font-mono block">NAMA LENGKAP</span>
                    <span className="font-semibold text-slate-800">FARHAN BIN RASHID</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase text-slate-400 font-mono block">NOMOR MYKAD / PASPORT</span>
                    <span className="font-mono text-slate-700">890412-10-XXXX</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase text-slate-400 font-mono block">TARIKH LAHIR</span>
                    <span className="text-slate-700">12 APR 1989</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase text-slate-400 font-mono block">NEXT ANB</span>
                    <span className="text-slate-700">36</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase text-slate-400 font-mono block">NATIONALITY</span>
                    <span className="text-slate-700">Malaysian</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase text-slate-400 font-mono block">RELATIONSHIP</span>
                    <span className="text-slate-700 font-bold">Spouse</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[9px] uppercase text-slate-400 font-mono block">ALAMAT MYKAD</span>
                    <span className="text-slate-700">No. 42, Jalan Angkasa Raya, Wilayah Sentral, 50480</span>
                  </div>
                </div>
              </div>

              {/* Card 7: Claim Details */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                <span className="font-bold text-slate-900 text-xs block">Claim Details</span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2.5 gap-x-4 text-[11px]">
                  <div>
                    <span className="text-[9px] uppercase text-slate-400 font-mono block">CLAIM NUMBER</span>
                    <span className="font-mono text-slate-800 font-semibold">CLM-1234394</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase text-slate-400 font-mono block">SUBMISSION DATE</span>
                    <span className="text-slate-700">1 June 2025</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase text-slate-400 font-mono block">BENEFIT</span>
                    <span className="text-slate-800 font-semibold">Tuntutan Kematian (Death Benefit)</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase text-slate-400 font-mono block">EVENT DATE</span>
                    <span className="text-slate-700">8 Oct 2025</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase text-slate-400 font-mono block">ACCIDENT</span>
                    <span className="text-slate-800 font-semibold">Yes</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase text-slate-400 font-mono block">AMOUNT REQUESTED</span>
                    <span className="font-mono text-slate-800 font-bold">RM 50,000.00</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase text-slate-400 font-mono block">CLAIM STATUS</span>
                    <span className="font-bold text-amber-600">In Progress</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase text-slate-400 font-mono block">DOCUMENT COMPLETE DATE</span>
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      09 Jan 2026 <Check size={12} />
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 8: Supporting Documents Table */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3 shadow-2xs">
                <span className="font-bold text-slate-900 text-xs block">Supporting Documents</span>
                <div className="border border-slate-200 rounded-lg overflow-hidden text-[11px]">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 text-[10px] text-slate-400 uppercase font-mono border-b border-slate-200">
                      <tr>
                        <th className="py-2 px-3">No.</th>
                        <th className="py-2 px-3">File Name</th>
                        <th className="py-2 px-3">Date</th>
                        <th className="py-2 px-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        "Asli Boarding Pass, Tiket atau Itinerary",
                        "Paspor/ KTP/Identitas tertanggung lainnya",
                        "Tempat Kejadian",
                        "Kronologi Kejadian",
                        "Nilai Klaim",
                        "Perusahaan Asuransi Lain",
                        "Surat Polisi",
                      ].map((doc, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/70">
                          <td className="py-2 px-3 text-slate-400 font-mono">{idx + 1}.</td>
                          <td className="py-2 px-3 font-medium text-slate-700">{doc}</td>
                          <td className="py-2 px-3 text-slate-500">3 June 2025</td>
                          <td className="py-2 px-3 text-right">
                            <button className="px-2.5 py-1 rounded bg-[#0284c7] text-white text-[10px] font-bold hover:bg-[#0369a1] transition-colors cursor-pointer">
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-3 bg-slate-200/70 rounded-lg text-slate-600 text-[11px] italic text-center">
                ↓ Reviewers scroll downward through complete records and files while the right assessment panel remains locked in view.
              </div>
            </div>

            {/* ── RIGHT FIXED SIDE PANEL (FIXED COMPACT CONTENT) ────────── */}
            <div
              ref={rightPanelRef}
              className="w-full lg:w-[340px] shrink-0 bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3 self-start"
            >
              
              {/* Header */}
              <div className="flex items-start justify-between pb-2 border-b border-slate-100">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Claim Assessment</h4>
                  <p className="text-[11px] text-slate-500">Verify information to finalize the claim status</p>
                </div>
                <button className="text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer">
                  <X size={15} />
                </button>
              </div>

              {/* ── STAGE 1: Investigation Checklist Form (from Screenshot 1) ── */}
              {activeStage === "investigation" && (
                <div className="space-y-2.5 text-[11px]">
                  <div>
                    <label className="text-[10px] text-slate-500 block mb-1">Participant ID</label>
                    <select className="w-full p-1.5 rounded border border-slate-200 bg-white font-medium text-slate-800 text-[11px] focus:outline-none">
                      <option>Pass</option>
                      <option>Fail</option>
                      <option>Not Applicable</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-500 block mb-1">Claimant ID</label>
                    <select className="w-full p-1.5 rounded border border-slate-200 bg-white font-medium text-slate-800 text-[11px] focus:outline-none">
                      <option>Pass</option>
                      <option>Select Status</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-500 block mb-1">Nominee ID</label>
                    <select className="w-full p-1.5 rounded border border-slate-200 bg-white font-medium text-slate-800 text-[11px] focus:outline-none">
                      <option>Pass</option>
                      <option>Select Status</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-500 block mb-1">Benefit Type</label>
                    <select className="w-full p-1.5 rounded border border-slate-200 bg-white font-medium text-slate-800 text-[11px] focus:outline-none">
                      <option>Accidental Death Benefit</option>
                      <option>Select Status</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-slate-500 block mb-1">Accident</label>
                      <select className="w-full p-1.5 rounded border border-slate-200 bg-white font-medium text-slate-800 text-[11px] focus:outline-none">
                        <option>Yes</option>
                        <option>No</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 block mb-1">Waiting period fulfilled?</label>
                      <select className="w-full p-1.5 rounded border border-slate-200 bg-white font-medium text-slate-800 text-[11px] focus:outline-none">
                        <option>Yes</option>
                        <option>No</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-500 block mb-1">Event date within policy period?</label>
                    <select className="w-full p-1.5 rounded border border-slate-200 bg-white font-medium text-slate-800 text-[11px] focus:outline-none">
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-500 block mb-1">Supporting documents check</label>
                    <select className="w-full p-1.5 rounded border border-slate-200 bg-white font-medium text-slate-800 text-[11px] focus:outline-none">
                      <option>Complete & Verified</option>
                      <option>Select Status</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-500 block mb-1">Fraud check</label>
                    <select className="w-full p-1.5 rounded border border-slate-200 bg-white font-medium text-emerald-700 text-[11px] font-bold focus:outline-none">
                      <option>PASS</option>
                      <option>FLAGGED</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-500 block mb-1">Remarks</label>
                    <textarea
                      rows={2}
                      defaultValue="Documents verified against police chronology. Proceeding with approval."
                      className="w-full p-2 rounded border border-slate-200 bg-white text-slate-700 text-[11px] focus:outline-none"
                      placeholder="Insert remarks"
                    />
                  </div>

                  <button
                    onClick={() => setActiveStage("approval")}
                    className="w-full py-2 px-3 rounded-lg bg-[#0284c7] text-white font-bold text-xs shadow hover:bg-[#0369a1] transition-colors cursor-pointer"
                  >
                    Submit Assessment &rarr;
                  </button>
                </div>
              )}

              {/* ── STAGE 2: Approval & Payee Configuration (from Screenshot 2) ─ */}
              {activeStage === "approval" && (
                <div className="space-y-3 text-[11px]">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-mono uppercase">Claim Amount</span>
                    <span className="text-base font-bold text-slate-900 font-mono">RM 5,000.00</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={deductDue}
                        onChange={(e) => setDeductDue(e.target.checked)}
                        className="rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                      />
                      <span className="text-slate-700 font-medium text-[11px]">Deduct due contribution?</span>
                    </label>
                    <div className="flex justify-between items-center pl-5">
                      <span className="text-rose-600 font-bold text-[11px] font-mono">
                        {deductDue ? "-RM 20.50" : "RM 0.00"}
                      </span>
                      <span className="text-[10px] text-slate-400">1 Mo Overdue</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-sky-50 border border-sky-200">
                    <span className="text-[10px] text-sky-700 font-semibold uppercase block font-mono">Calculated Net Payable</span>
                    <span className="text-sm font-bold text-sky-950 font-mono">
                      {deductDue ? "RM 4,979.00" : "RM 5,000.00"}
                    </span>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-500 block mb-1">Payee Configuration</label>
                    <select className="w-full p-1.5 rounded border border-slate-200 bg-white font-medium text-slate-800 text-[11px] focus:outline-none">
                      <option>Nominee</option>
                      <option>Participant</option>
                      <option>Claimant</option>
                    </select>
                  </div>

                  {/* Beneficiary Split Cards */}
                  <div className="space-y-2">
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800">Hana Farhana (Beneficiary 1)</span>
                        <span className="font-mono text-[#0284c7] font-bold">
                          {deductDue ? "RM 2,489.50" : "RM 2,500.00"}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500 flex justify-between">
                        <span>Wasi</span>
                        <span className="font-bold">50% Share</span>
                      </div>
                      <span className="text-[9.5px] text-slate-400 block font-mono truncate">
                        Maybank • •••• •••• 4566 • Hana Farhana
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800">Sarah Farhana (Beneficiary 2)</span>
                        <span className="font-mono text-[#0284c7] font-bold">
                          {deductDue ? "RM 2,489.50" : "RM 2,500.00"}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500 flex justify-between">
                        <span>Hibah</span>
                        <span className="font-bold">50% Share</span>
                      </div>
                      <span className="text-[9.5px] text-slate-400 block font-mono truncate">
                        Maybank • •••• •••• 7821 • Sarah Farhana
                      </span>
                    </div>
                  </div>

                  <button className="w-full py-1.5 px-3 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-colors text-xs cursor-pointer">
                    Sanction Check (Cleared ✓)
                  </button>

                  <button
                    onClick={() => setActiveStage("disbursement")}
                    className="w-full py-2 px-3 rounded-lg bg-[#0284c7] text-white font-bold text-xs shadow hover:bg-[#0369a1] transition-colors cursor-pointer"
                  >
                    Submit For Payment &rarr;
                  </button>
                </div>
              )}

              {/* ── STAGE 3: Disbursement Tracking (from Screenshot 3) ───────── */}
              {activeStage === "disbursement" && (
                <div className="space-y-3 text-[11px]">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                    <span className="font-bold text-sky-900 text-xs block">Net Payable: RM 4,979.00</span>
                    <div className="flex justify-between text-[10px] text-slate-500">
                      <span>Gross: RM 5,000.00</span>
                      <span className="text-rose-600 font-semibold">Deductions: -RM 20.50</span>
                    </div>
                    <span className="text-[9px] text-slate-400 block pt-0.5">
                      Submitted on 12 / 12 / 2025 by Super Admin
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block font-mono mb-1.5">
                      Disbursement Tracking
                    </span>
                    <div className="space-y-2">
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-800">Hana Farhana (Beneficiary 1)</span>
                          <span className="font-mono text-[#0284c7] font-bold">RM 2,489.00</span>
                        </div>
                        <div className="text-[10px] text-slate-500 flex justify-between">
                          <span>Hibah</span>
                          <span className="font-bold">50% Share</span>
                        </div>
                        <span className="text-[9.5px] text-slate-400 block font-mono">
                          Maybank • •••• •••• 4566 • Hana Farhana
                        </span>
                        <div className="pt-0.5">
                          <button className="text-[10px] text-sky-600 font-bold hover:underline cursor-pointer flex items-center gap-1">
                            Edit Bank Details &rarr;
                          </button>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-800">Sarah Farhana (Beneficiary 2)</span>
                          <span className="font-mono text-[#0284c7] font-bold">RM 2,489.00</span>
                        </div>
                        <div className="text-[10px] text-slate-500 flex justify-between">
                          <span>Hibah</span>
                          <span className="font-bold">50% Share</span>
                        </div>
                        <span className="text-[9.5px] text-slate-400 block font-mono">
                          Maybank • •••• •••• 7821 • Sarah Farhana
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Update Form */}
                  <div className="space-y-2 pt-1 border-t border-slate-100">
                    <div>
                      <label className="text-[10px] text-slate-500 block mb-1">Payment Status</label>
                      <select
                        value={paymentStatus}
                        onChange={(e) => setPaymentStatus(e.target.value)}
                        className="w-full p-1.5 rounded border border-slate-200 bg-white font-medium text-slate-800 text-[11px] focus:outline-none"
                      >
                        <option>Payment Unsuccessful</option>
                        <option>Payment Successful</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-500 block mb-1">Payment date</label>
                      <input
                        type="text"
                        defaultValue="14/10/2025"
                        className="w-full p-1.5 rounded border border-slate-200 bg-white text-slate-800 text-[11px] font-mono focus:outline-none"
                        placeholder="DD/MM/YYYY"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-500 block mb-1">Remarks*</label>
                      <textarea
                        rows={2}
                        defaultValue="Bank rejection: Invalid account branch code. Awaiting inline IBAN update."
                        className="w-full p-2 rounded border border-slate-200 bg-white text-slate-700 text-[11px] focus:outline-none"
                        placeholder="Insert remarks"
                      />
                    </div>

                    <button
                      onClick={() => setActiveStage("investigation")}
                      className="w-full py-2 px-3 rounded-lg bg-[#0284c7] text-white font-bold text-xs shadow hover:bg-[#0369a1] transition-colors cursor-pointer"
                    >
                      Update Payment Status
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
      )}

      {/* Rationale Footer Strip */}
      <div className="px-5 py-3 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
        <span className="flex items-center gap-2">
          {activeTrack === "trackA" ? (
            <>
              <FileText size={14} className="text-teal-400" />
              <span>
                <strong>Track A (Baseline Rationale):</strong> Suitable for high-volume, single-operator paperwork verification where documents only need completeness checks. Operators switch between tabs to verify files.
              </span>
            </>
          ) : (
            <>
              <Split size={14} className="text-[#DB3E8C]" />
              <span>
                <strong>Track B (Bespoke Rationale):</strong> The fixed side panel on the right eliminates tab switching, letting assessors audit complex multi-party claims against scrolling documents without losing their place.
              </span>
            </>
          )}
        </span>
        <span className="font-mono text-[10px] text-slate-500">
          {activeTrack === "trackA" ? "Sanitized Baseline Dummy Reproduction" : "Sanitized NDA Dummy Reproduction"}
        </span>
      </div>
    </div>
  )
}

// ── Interactive Grouped Bar Chart With Decoupled Filter (Section 05) ─────────
function DecoupledChartPreview() {
  const [period, setPeriod] = useState<"monthly" | "yearly">("monthly")
  const [selectedProduct, setSelectedProduct] = useState<"all" | "term" | "critical" | "accident">("all")

  const monthlyData = [
    { label: "Jan", term: 45, critical: 28, accident: 62 },
    { label: "Feb", term: 52, critical: 34, accident: 58 },
    { label: "Mar", term: 68, critical: 42, accident: 70 },
    { label: "Apr", term: 60, critical: 39, accident: 65 },
    { label: "May", term: 74, critical: 48, accident: 81 },
    { label: "Jun", term: 88, critical: 55, accident: 94 },
  ]

  const yearlyData = [
    { label: "2022", term: 380, critical: 240, accident: 490 },
    { label: "2023", term: 520, critical: 360, accident: 640 },
    { label: "2024", term: 710, critical: 490, accident: 860 },
  ]

  const data = period === "monthly" ? monthlyData : yearlyData
  const maxVal = period === "monthly" ? 100 : 1000

  return (
    <div className="my-8 p-6 rounded-2xl bg-[#0f1738] border border-white/10 text-white shadow-2xl space-y-6">
      {/* Dashboard Filter Bar Context Banner */}
      <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-[#DB3E8C]" />
          <span className="font-mono text-gray-400 uppercase text-[11px]">Dashboard Global Filter State:</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Shared Product Filter Pill */}
          <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-md">
            <span className="text-gray-400 text-[10px]">Product Filter (Shared):</span>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value as any)}
              className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-[#0f1738]">All Active Products</option>
              <option value="term" className="bg-[#0f1738]">Term Life Only</option>
              <option value="critical" className="bg-[#0f1738]">Critical Illness Only</option>
              <option value="accident" className="bg-[#0f1738]">Personal Accident Only</option>
            </select>
          </div>

          {/* Excluded Global Date Filter Badge */}
          <div className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/30 px-2.5 py-1 rounded-md text-[10px] text-red-300">
            <span>Date Range: "Past 7 Days"</span>
            <span className="font-bold underline uppercase">(Excluded from chart)</span>
          </div>
        </div>
      </div>

      {/* Chart Header with Chart-Level Time Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <span className="font-mono text-[10px] font-bold text-[#DB3E8C] uppercase tracking-widest block">
            REPORTING DASHBOARD // PRODUCT PERFORMANCE INDICATOR
          </span>
          <h4 className="font-display text-lg font-bold text-white mt-0.5">
            Grouped Bar Chart: Side-by-Side Product Comparison
          </h4>
        </div>

        {/* Chart-level Monthly/Yearly toggle */}
        <div className="flex items-center gap-1 bg-black/50 p-1 rounded-lg border border-white/10 text-xs font-mono">
          <button
            onClick={() => setPeriod("monthly")}
            className={`px-3 py-1 rounded-md cursor-pointer transition-colors ${
              period === "monthly" ? "bg-[#DB3E8C] text-white font-bold shadow" : "text-gray-400 hover:text-white"
            }`}
          >
            Monthly View
          </button>
          <button
            onClick={() => setPeriod("yearly")}
            className={`px-3 py-1 rounded-md cursor-pointer transition-colors ${
              period === "yearly" ? "bg-[#DB3E8C] text-white font-bold shadow" : "text-gray-400 hover:text-white"
            }`}
          >
            Yearly View
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
        <span className="text-gray-400 text-[11px]">Legend:</span>
        {(selectedProduct === "all" || selectedProduct === "term") && (
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-[#3B82F6]" />
            <span className="text-white">Term Life</span>
          </div>
        )}
        {(selectedProduct === "all" || selectedProduct === "critical") && (
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-[#DB3E8C]" />
            <span className="text-white">Critical Illness</span>
          </div>
        )}
        {(selectedProduct === "all" || selectedProduct === "accident") && (
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-[#10B981]" />
            <span className="text-white">Personal Accident</span>
          </div>
        )}
      </div>

      {/* Bars Visualization */}
      <div className="pt-4 pb-2">
        <div className="grid grid-flow-col auto-cols-fr gap-3 sm:gap-6 items-end h-48 border-b border-white/20 pb-2 px-2">
          {data.map((col, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end">
              <div className="w-full flex items-end justify-center gap-1 sm:gap-2 h-full">
                {(selectedProduct === "all" || selectedProduct === "term") && (
                  <div
                    className="w-3 sm:w-5 bg-[#3B82F6] rounded-t transition-all duration-300 hover:opacity-80"
                    style={{ height: `${(col.term / maxVal) * 100}%` }}
                    title={`Term Life: ${col.term}`}
                  />
                )}
                {(selectedProduct === "all" || selectedProduct === "critical") && (
                  <div
                    className="w-3 sm:w-5 bg-[#DB3E8C] rounded-t transition-all duration-300 hover:opacity-80"
                    style={{ height: `${(col.critical / maxVal) * 100}%` }}
                    title={`Critical Illness: ${col.critical}`}
                  />
                )}
                {(selectedProduct === "all" || selectedProduct === "accident") && (
                  <div
                    className="w-3 sm:w-5 bg-[#10B981] rounded-t transition-all duration-300 hover:opacity-80"
                    style={{ height: `${(col.accident / maxVal) * 100}%` }}
                    title={`Personal Accident: ${col.accident}`}
                  />
                )}
              </div>
              <span className="font-mono text-[10px] text-gray-400">{col.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="text-[11px] text-gray-400 bg-white/5 p-3 rounded-lg border border-white/5 flex items-center justify-between">
        <span>✓ Query Response: <strong>&lt;140ms</strong> (Bypasses heavy table logs via monthly aggregate indexing).</span>
        <span className="text-[#DB3E8C] font-semibold">Zero Dashboard Loading Friction</span>
      </div>
    </div>
  )
}

interface Props {
  onBack: () => void
  onNext?: () => void
  onPrev?: () => void
}

const QUICK_SECTIONS = [
  { id: "pattern", num: "01", label: "The Pattern I Noticed" },
  { id: "partners", num: "02", label: "One Base, Different Partners" },
  { id: "twotracks", num: "03", label: "Two Tracks: Reuse vs. Real Design Work" },
  { id: "case1", num: "04", label: "Case 1: Same Menu, Different Logic" },
  { id: "case2", num: "05", label: "Case 2: Designing a Chart From an Open Brief" },
  { id: "learned", num: "06", label: "What Changed & What I Learned" },
]

export default function BackofficeCase({ onBack, onNext, onPrev }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [activeQuickId, setActiveQuickId] = useState<string>("pattern")
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

          <CaseStudyHeaderBadge caseNum="05" />
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
      <div className="px-8 lg:px-16 pt-16 pb-14" style={{ backgroundColor: W, borderBottom: `1px solid ${HAIR}` }}>
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-center">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <MonoTag accent>CASE STUDY 05</MonoTag>
              <span style={{ color: HAIR }}>/</span>
              <MonoTag>WHITE LABEL BACKOFFICE</MonoTag>
              <span style={{ color: HAIR }}>/</span>
              <MonoTag>MULTIPLE ENTERPRISE PARTNERSHIPS · 2024 to 2025</MonoTag>
            </div>

            <h1
              className="font-display font-bold leading-[1.08] tracking-tight"
              style={{ fontSize: "clamp(2rem, 3.8vw, 3.4rem)", color: N }}
            >
              One Base, Many Partners: Designing a Reusable White Label Backoffice
            </h1>

            <p
              className="font-display font-light leading-relaxed"
              style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.45rem)", color: N, letterSpacing: "-0.01em", lineHeight: 1.6 }}
            >
              How I recognized a shared foundation across partner portals, and focused my design time on the parts where partners genuinely differed.
            </p>

            {/* Confidentiality Notice */}
            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-900 flex items-start gap-3 text-xs leading-relaxed">
              <Lock size={15} className="shrink-0 mt-0.5 text-amber-700" />
              <div>
                <strong className="font-bold text-amber-950 block">Confidentiality Note:</strong>
                Client names, logos, and data have been sanitized to respect NDAs. Screens reflect the real design process, not real production data.
              </div>
            </div>
          </div>

          {/* Right Column: Hero Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#111836] group">
            <img
              src={backofficePortalThumb}
              alt="White Label Backoffice Architecture Preview"
              className="w-full h-auto object-cover max-h-[380px] lg:max-h-[420px] rounded-2xl transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111836]/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      {/* ── 30 SECOND TAKEAWAYS ────────────────────────────────────────────── */}
      <div className="px-8 lg:px-16 py-8 bg-[#111836] border-t border-b border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-[#DB3E8C]">
            30 SECOND TAKEAWAYS
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs sm:text-sm font-sans">
          <div className="bg-white/5 p-4 rounded-lg border border-white/5">
            <span className="block text-xs font-bold tracking-widest text-white/50 uppercase mb-1.5">01 · The Problem</span>
            <p className="text-xs sm:text-sm leading-relaxed text-white/85">
              My company kept onboarding new insurance, mobility, and affiliate partners, and each one needed its own admin, partner, and insurance portals, without a formal design system in place.
            </p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/5">
            <span className="block text-xs font-bold tracking-widest text-white/50 uppercase mb-1.5">02 · The Challenge</span>
            <p className="text-xs sm:text-sm leading-relaxed text-white/85">
              As the sole product designer supporting several partners in parallel, I faced two kinds of requests: ones the existing system could already handle, and ones where a partner’s workflow worked fundamentally differently, often from briefs that left key decisions open.
            </p>
          </div>
          <div className="bg-[#DB3E8C]/10 p-4 rounded-lg border border-[#DB3E8C]/30">
            <span className="block text-xs font-bold tracking-widest text-[#DB3E8C] uppercase mb-1.5">03 · My Ownership</span>
            <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">
              Sole Product Designer. I identified the shared base across partners, designed new modules end to end from client requirements, and proposed data and filter logic together with backend engineers.
            </p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/5">
            <span className="block text-xs font-bold tracking-widest text-white/50 uppercase mb-1.5">04 · Key Results</span>
            <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">
              Standard partner portals could be configured by developers from the existing codebase, which let me focus my design time on new modules. The same base now serves partners across insurance, mobility, and affiliate networks, each added as a new channel in the same system.
            </p>
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

            {/* SECTION 01: The Pattern I Noticed */}
            <div>
              <SectionTag id="pattern" num="01" label="The Pattern I Noticed" />
              
              <div className="space-y-5 font-sans text-sm sm:text-base leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.8 }}>
                <p>
                  My company kept getting requests to design pitch proposals for new partners, and each one seemed to need its own set of portals. After designing several of these pitches, I realized the foundation was the same every time. The terminology and data changed from client to client, but the core needs did not: monitoring performance, managing customers, and handling transactions and claims.
                </p>
                <p>
                  The system was already built for this. The admin portal handled users and roles, and every new partner was added as a new channel in the same system, with its own partner and insurance portals. So instead of designing every pitch from scratch, I started from the same base and focused my effort on what was truly different for each partner.
                </p>
                <p>
                  The two-track approach described below wasn’t a framework I planned upfront. It became clear only after several projects had shipped: some needs could be met by reusing what already existed, while others called for real design work.
                </p>

                {/* System Architecture Diagram */}
                <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-xs space-y-4 my-6">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[#DB3E8C] block font-mono">
                    UNIFIED CHANNEL ARCHITECTURE
                  </span>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-[#0e1635] text-white space-y-1.5">
                      <div className="flex items-center gap-2">
                        <Shield size={16} className="text-[#DB3E8C]" />
                        <h4 className="font-bold text-sm">1. Central Admin Portal</h4>
                      </div>
                      <p className="text-xs text-white/75 leading-relaxed">
                        Manages roles, permissions, system audit logs, and controls multi-tenant channel deployments.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#0e1635] text-white space-y-1.5">
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-[#10B981]" />
                        <h4 className="font-bold text-sm">2. Partner Portal</h4>
                      </div>
                      <p className="text-xs text-white/75 leading-relaxed">
                        Channel-level operations: customer list, transaction monitoring, and standard claims management.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#0e1635] text-white space-y-1.5">
                      <div className="flex items-center gap-2">
                        <Activity size={16} className="text-[#3B82F6]" />
                        <h4 className="font-bold text-sm">3. Insurance & Custom Portals</h4>
                      </div>
                      <p className="text-xs text-white/75 leading-relaxed">
                        Specialized modules tailored for underwriting, eligibility assessment, or end-customer driver filing.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Hairline />

            {/* SECTION 02: One Base, Different Partners */}
            <div>
              <SectionTag id="partners" num="02" label="One Base, Different Partners" />
              
              <p className="font-sans text-sm sm:text-base leading-relaxed text-[#2E3A5C] mb-6" style={{ lineHeight: 1.8 }}>
                Each partner operated in a different industry, with different users and priorities:
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-4">
                <div className="p-6 bg-white rounded-xl border border-gray-200/80 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-[#19244E] text-base">Mobility & Delivery</h4>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    For a ride-hailing partner, the live products cover two sides: an internal employee benefits portal, and a customer portal where drivers submit and track their own insurance claims.
                  </p>
                </div>

                <div className="p-6 bg-white rounded-xl border border-gray-200/80 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-[#19244E] text-base">Regional InsurTech</h4>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    Underwriters and business managers track policy conversion funnels, product performance across channels, and agent contributions.
                  </p>
                </div>

                <div className="p-6 bg-white rounded-xl border border-gray-200/80 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-[#19244E] text-base">Affiliate & Commerce</h4>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    Partnership managers monitor partner tiers, referral trees, monthly commission reconciliation, and payout verification.
                  </p>
                </div>
              </div>
            </div>

            <Hairline />

            {/* SECTION 03: Two Tracks: Reuse vs. Real Design Work */}
            <div>
              <SectionTag id="twotracks" num="03" label="Two Tracks: Reuse vs. Real Design Work" />

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="p-6 bg-white border border-[#10B981]/40 rounded-xl space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#10B981] uppercase tracking-wider block font-mono">TRACK A</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#10B981]/15 text-[#10B981] uppercase">Reuse</span>
                  </div>
                  <h4 className="font-bold text-lg text-[#19244E]">Standard Portals & Theming</h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    When a new partner needed standard portals, I duplicated the Figma file from a previous project and swapped the colors, logo, and terminology. On the development side, engineers reused the existing codebase, enabling the menus each partner needed and applying their brand colors. Because the components and page structures stayed consistent, standard portals didn’t need new designs to move forward.
                  </p>
                </div>

                <div className="p-6 bg-white border border-[#3B82F6]/40 rounded-xl space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#3B82F6] uppercase tracking-wider block font-mono">TRACK B</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#3B82F6]/15 text-[#3B82F6] uppercase">Real Design Work</span>
                  </div>
                  <h4 className="font-bold text-lg text-[#19244E]">Deep Custom Modules</h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    New modules were where my design process began. Even within the same menu, partners often differed in ways that went beyond visuals: the data shown in customer tables, and most significantly, how claims were reviewed. The two cases below show what this looked like in practice.
                  </p>
                </div>
              </div>

              {/* Interactive Demo for Track A token theming */}
              <MultiTenantTokenSandbox />
            </div>

            <Hairline />

            {/* SECTION 04: Case 1: Same Menu, Different Logic */}
            <div>
              <SectionTag id="case1" num="04" label="Case 1: Same Menu, Different Logic" />

              <div className="space-y-5 font-sans text-sm sm:text-base leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.8 }}>
                <p>
                  On paper, every partner needed the same thing: a Claim menu in their backoffice. In practice, two partners could mean completely different things by “reviewing a claim.”
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-4">
                  {/* Partner A */}
                  <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-xs space-y-3">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block font-mono">
                      PARTNER A · DOCUMENT COMPLETENESS
                    </span>
                    <h4 className="font-bold text-[#19244E] text-base">Standard Verification Flow</h4>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      Partner A followed our existing flow, which is built around document completeness. A claim moves forward when its documents are complete and valid:
                    </p>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-xs font-mono text-[#19244E] space-y-1">
                      <div className="font-semibold text-[#DB3E8C]">Submitted → Acknowledged → Document Review → Reupload or Lack of Documents → Accepted, Rejected, or Paid</div>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Operations staff handle every state. This partner fit the existing codebase, so developers could configure it without new designs.
                    </p>
                  </div>

                  {/* Partner B */}
                  <div className="p-6 bg-white rounded-xl border border-[#DB3E8C]/30 shadow-xs space-y-3">
                    <span className="text-xs font-bold text-[#DB3E8C] uppercase tracking-wider block font-mono">
                      PARTNER B · 4-PARTY ELIGIBILITY
                    </span>
                    <h4 className="font-bold text-[#19244E] text-base">Complex Multi-User Logic</h4>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      Partner B worked differently. Their claims were judged on eligibility, not paperwork, and a single claim could involve four parties: the participant, the person covered, the claimant, and the nominee. Each stage was handled by a different user.
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      The client gave me a BRS defining the rules and requirements. The question of how to turn those rules into a usable interface was mine to answer.
                    </p>
                  </div>
                </div>

                <p>
                  Because this flow touched data structures that differed significantly from the existing system, I worked through it with the client’s team and our backend engineers before designing. The result was a claim detail page with a side panel that changes with each stage:
                </p>

                {/* 3 Stages Cards */}
                <div className="grid md:grid-cols-3 gap-4 my-4">
                  <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs space-y-2">
                    <div className="flex items-center gap-2">
                      <ClipboardCheck size={16} className="text-[#DB3E8C]" />
                      <h5 className="font-bold text-sm text-[#19244E]">1. Investigation</h5>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      An assessment checklist where each item (identity of each party, event date within the policy or grace period, waiting period, exclusions, fraud check) is marked Pass, Fail, or Not Applicable, with remarks.
                    </p>
                  </div>

                  <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs space-y-2">
                    <div className="flex items-center gap-2">
                      <Split size={16} className="text-[#3B82F6]" />
                      <h5 className="font-bold text-sm text-[#19244E]">2. Approval & Payee Split</h5>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      The net payable is calculated by deducting any overdue contribution from the gross amount, then split across multiple beneficiaries by share and role, with a sanction check before submitting for payment.
                    </p>
                  </div>

                  <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-[#10B981]" />
                      <h5 className="font-bold text-sm text-[#19244E]">3. Disbursement</h5>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Tracking per beneficiary, including handling failed payments with mandatory remarks and editable bank details.
                    </p>
                  </div>
                </div>

                {/* Architectural Comparison Matrix */}
                <div className="my-6 rounded-xl border border-gray-200 overflow-hidden bg-white shadow-xs">
                  <div className="p-4 bg-[#19244E] text-white flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Sliders size={16} className="text-[#DB3E8C]" />
                      <span className="font-bold text-xs uppercase tracking-wider">
                        Architectural Contrast: Track A (Baseline) vs Track B (Bespoke)
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-300 bg-white/10 px-2 py-0.5 rounded">
                      Standard Reuse vs New Architecture
                    </span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-sans">
                      <thead className="bg-slate-50 text-[10px] text-slate-400 uppercase font-mono border-b border-slate-200">
                        <tr>
                          <th className="py-2.5 px-4 w-1/4">Dimension</th>
                          <th className="py-2.5 px-4 w-[37.5%] text-teal-800 bg-teal-50/50">Track A: Baseline Portal (Standard)</th>
                          <th className="py-2.5 px-4 w-[37.5%] text-[#DB3E8C] bg-pink-50/40">Track B: Bespoke Module (Redesign)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        <tr className="hover:bg-slate-50/50">
                          <td className="py-2.5 px-4 font-semibold text-slate-900">Review Objective</td>
                          <td className="py-2.5 px-4 text-slate-600">Document completeness &amp; file validity</td>
                          <td className="py-2.5 px-4 font-medium text-slate-900">4-Party legal eligibility &amp; policy condition checks</td>
                        </tr>
                        <tr className="hover:bg-slate-50/50">
                          <td className="py-2.5 px-4 font-semibold text-slate-900">Screen Layout</td>
                          <td className="py-2.5 px-4 text-slate-600">Linear 1-Column with Tab Swapping (Summary ↔ Documents)</td>
                          <td className="py-2.5 px-4 font-medium text-slate-900">2-Column Split: Scrolling Data (Left) + Fixed Stage Panel (Right)</td>
                        </tr>
                        <tr className="hover:bg-slate-50/50">
                          <td className="py-2.5 px-4 font-semibold text-slate-900">Operator Review Flow</td>
                          <td className="py-2.5 px-4 text-slate-600">Switch tabs back-and-forth to verify data against documents</td>
                          <td className="py-2.5 px-4 font-medium text-emerald-700 font-semibold">Zero tab-switching; persistent side-by-side audit</td>
                        </tr>
                        <tr className="hover:bg-slate-50/50">
                          <td className="py-2.5 px-4 font-semibold text-slate-900">Governance &amp; Roles</td>
                          <td className="py-2.5 px-4 text-slate-600">Single operations officer handles all pipeline states</td>
                          <td className="py-2.5 px-4 font-medium text-slate-900">3 Distinct Roles: Investigator → Underwriter → Finance Disbursal</td>
                        </tr>
                        <tr className="hover:bg-slate-50/50">
                          <td className="py-2.5 px-4 font-semibold text-slate-900">Design &amp; Dev Effort</td>
                          <td className="py-2.5 px-4 text-slate-600"><strong>Smart Reuse</strong>: Color tokens &amp; logo swap only (0 new design sprints)</td>
                          <td className="py-2.5 px-4 font-medium text-slate-900"><strong>Deep Design Work</strong>: End-to-end BRS workflow co-designed with backend</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="p-5 bg-[#19244E] text-white rounded-xl space-y-2 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-white">Interactive Sandbox: Toggle &amp; Compare Both Interfaces Live</h4>
                    <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded text-white/80">
                      Use top toggle in browser bar
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                    Toggle between <strong>Track A (Baseline Portal)</strong> and <strong>Track B (Bespoke Workflow)</strong> below to experience the exact operational difference between linear tab-switching and the persistent side-by-side audit panel.
                  </p>
                </div>

                {/* Interactive Demo for Partner Claim Review (Track A vs Track B) */}
                <PartnerBClaimReviewPreview />
              </div>
            </div>

            <Hairline />

            {/* SECTION 05: Case 2: Designing a Chart From an Open Brief */}
            <div>
              <SectionTag id="case2" num="05" label="Case 2: Designing a Chart From an Open Brief" />

              <div className="space-y-5 font-sans text-sm sm:text-base leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.8 }}>
                <p>
                  The client asked for a new “Product Performance” indicator on their reporting dashboard, but the brief left most of it open: whether it should show transactions or policies sold, and over what time period. There were no requirements for the chart type either, so I explored and chose a grouped bar chart with one color per product, letting managers compare products side by side within each period.
                </p>
                <p>
                  Deciding how the chart should respond to the dashboard’s filters took more thought. While discussing data needs with our backend engineer, I learned that tying this chart to the dashboard’s date range filter could make data retrieval very slow. So I proposed a filter system that separates the two:
                </p>

                <div className="grid md:grid-cols-3 gap-4 my-4">
                  <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs space-y-2">
                    <span className="text-[10px] font-bold text-[#3B82F6] uppercase tracking-wider block font-mono">
                      FILTER 1 (SHARED)
                    </span>
                    <h5 className="font-bold text-sm text-[#19244E]">Product Filter</h5>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      The dashboard’s product selection also applies to this chart, so the legend and bars update to match.
                    </p>
                  </div>

                  <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs space-y-2">
                    <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider block font-mono">
                      FILTER 2 (EXCLUDED)
                    </span>
                    <h5 className="font-bold text-sm text-[#19244E]">Date Range Filter</h5>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      This chart ignores it, so changing the dashboard’s date range doesn’t trigger heavy queries.
                    </p>
                  </div>

                  <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs space-y-2">
                    <span className="text-[10px] font-bold text-[#10B981] uppercase tracking-wider block font-mono">
                      FILTER 3 (LOCAL)
                    </span>
                    <h5 className="font-bold text-sm text-[#19244E]">Monthly / Yearly Toggle</h5>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      The chart gets its own time control, defaulting to Monthly.
                    </p>
                  </div>
                </div>

                <p>
                  The result keeps the chart readable as a trend view and avoids slow loading, without adding complexity to the rest of the dashboard.
                </p>

                {/* Interactive Decoupled Chart Preview */}
                <DecoupledChartPreview />
              </div>
            </div>

            <Hairline />

            {/* SECTION 06: What Changed & What I Learned */}
            <div>
              <SectionTag id="learned" num="06" label="What Changed & What I Learned" />

              <div className="space-y-6">
                <p className="font-sans text-sm sm:text-base leading-relaxed text-[#2E3A5C]" style={{ lineHeight: 1.8 }}>
                  Separating reuse from real design work changed where my time went. Standard portals moved forward through the existing codebase, while my design time went to the modules that actually needed it, like Partner B’s claim assessment. From my experience, this base also made pitching faster: I could usually deliver a complete set of portals for a new partner within a few days.
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs space-y-2">
                    <span className="font-bold text-[#10B981] text-sm block">Reused Codebase</span>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Standard portals deployed directly by developers without design bottlenecks or redundant redrawing.
                    </p>
                  </div>

                  <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs space-y-2">
                    <span className="font-bold text-[#DB3E8C] text-sm block">Focused Design Time</span>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      High-complexity modules like multi-stage eligibility claim flows received thorough UX exploration.
                    </p>
                  </div>

                  <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs space-y-2">
                    <span className="font-bold text-[#3B82F6] text-sm block">Faster Pitch Delivery</span>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      A complete set of pitch portals for newly incoming enterprise partners delivered within a few days.
                    </p>
                  </div>
                </div>

                {/* WHAT I LEARNED Box */}
                <div className="p-6 bg-white rounded-xl border border-gray-200 space-y-2">
                  <div className="flex items-center gap-2 text-[#19244E]">
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#19244E]">
                      WHAT I LEARNED
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-sans leading-relaxed text-[#2E3A5C] italic" style={{ lineHeight: 1.8 }}>
                    “Designing across many partners taught me that reusability isn’t about forcing every client into the same mold. The real skill is knowing which parts to keep consistent, like navigation, page structures, and common components, and which problems need to be designed from scratch together with the client and engineers.”
                  </p>
                </div>

                {/* WHY THIS MATTERS TO A HIRING MANAGER */}
                <div className="p-8 bg-[#111836] rounded-2xl border border-white/10 text-white space-y-4 shadow-2xl mt-6">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#DB3E8C]">
                      WHY THIS MATTERS TO A HIRING MANAGER
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-sans leading-relaxed text-white/95 italic" style={{ lineHeight: 1.8 }}>
                    “This project shows how I think in systems rather than isolated screens. As a sole designer, I recognized a shared foundation across partners, and I could tell when a request fit that foundation and when it needed a new solution. It also shows how I work when requirements are incomplete: turning a client’s BRS or an open brief into concrete design decisions, and working closely with backend engineers so those decisions hold up technically.”
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
