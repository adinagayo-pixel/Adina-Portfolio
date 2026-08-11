CASE STUDY: NATIONAL QUICK COUNT & ELECTION MONITORING SYSTEM
[REGION: INDONESIA] · [SCOPE: PUBLIC SECTOR ELECTION MONITORING] · [TIMELINE: JUNE 2023 - FEBRUARY 2024]

National-Scale Election Data Architecture & Real-Time Vote Tabulation for the 2024 Indonesian Presidential & Legislative Elections
An end-to-end multi-level election monitoring system engineered for a major Indonesian political party—combining a Progressive Web Application (PWA) for field witnesses, OCR-powered vote record scanning, WhatsApp verification integration, and an executive Web CMS dashboard tracking real-time vote allocation across 38 provinces and 127 international districts (PPLN).

01 // EXECUTIVE SUMMARY
Client & Sector: Indonesian Political Party × Public Sector / Election Services.

Role & Team: Solo UX/UI Designer & System Logic Architect (1-Person Design Team).

Scale & Reach: Implemented across 38 Indonesian Provinces, 127 Overseas Electoral Districts (PPLN), supporting 2,000+ core party administrators and 820,000+ polling station (TPS) data points.

System Suite: Field Witness Mobile PWA + Executive Monitoring Web CMS.

Core Stack: Figma, FigJam, Google Slides, OCR Engine Specs, WhatsApp API, Angular System Explorations.

02 // THE STRATEGIC CHALLENGE
Recapping paper-based C-Hasil election forms from over 820,000 polling stations nationwide within a high-stakes 48-hour critical window (February 14–15, 2024) to establish early vote trends, legislative seat projections, and strategic party maneuvers before the official March 20, 2024 tally.

Key System & Technical Constraints:
Critical Speed & Precision Thresholds ("Fast & Accurate"): Field witnesses required an input flow optimized for rapid completion under chaotic polling station conditions, including rural areas with poor internet connectivity.

Dual Data-Input Integrity (Image Upload vs. Manual Fallback): Designing a dual-role workflow (Image Uploaders at TPS vs. Verifiers at regional headquarters) with OCR automated parsing and manual entry fallbacks.

Complex Legislative Calculation Logic: The Web CMS needed to automatically process Saint-Laguë vote-to-seat allocation algorithms, Parliamentary Threshold filters, and multi-candidate ranking tables in real time.

03 // SYSTEM & DATA PIPELINE ARCHITECTURE
Plaintext
┌────────────────────────────────┐   ┌────────────────────────────────┐   ┌────────────────────────────────┐
│ 01. WITNESS MOBILE PWA         │ ─►│ 02. OCR & WA VERIFICATION      │ ─►│ 03. EXECUTIVE WEB CMS          │
│ Location-locked C-Hasil upload │   │ Auto-parsing vote tallies &    │   │ Real-time vote maps,           │
│ & manual fallback forms.       │   │ WhatsApp verification blasts.  │   │ Saint-Laguë seat allocation.   │
└────────────────────────────────┘   └────────────────────────────────┘   └────────────────────────────────┘
1. Location-Predefined Mobile Witness PWA
Designed a lightweight PWA interface where polling station (TPS) witnesses were pre-assigned location contexts by super-admins—reducing data entry steps. Witnesses simply captured photos of paper C-Hasil forms or completed manual fallbacks if connectivity dropped.

2. OCR Integration & WhatsApp Verification Engine
Integrated Optical Character Recognition (OCR) to automatically extract candidate numbers and party vote totals from uploaded form photos. The pipeline featured WhatsApp API integration to send real-time verification alerts, system announcements, and user credential blasts to regional leaders.

3. Real-Time Executive Monitoring Web CMS
Engineered a high-density Web CMS featuring an interactive national heat map, live presidential quick count gauges, legislative seat allocation tables (Saint-Laguë formula), and regional progress trackers (Total TPS, Verified vs. Pending).

04 // SYSTEM DELIVERABLES & MODULE BREAKDOWN
A. Field Witness & Verifier PWA Suite
Mobile C-Hasil Data Entry: Dual-state camera capture and input fields for Presidential (Pilpres) and Legislative (DPR RI / DPRD) vote tallies.

Photo Verification & Rejection Module: Admin verification interface allowing regional supervisors to cross-examine uploaded C-Hasil photos against extracted numerical data before final database committal.

Regional Input Progress Tracker: Live status lists allowing regional captains to monitor data entry percentages across sub-districts (Kecamatan / Kelurahan).

B. Executive Command & Analytics Web CMS
Interactive National Heat Map: Real-time visual representation of vote distributions across all 38 provinces.

Saint-Laguë Seat Projection Engine: Automated calculation dashboards displaying seat projections, party rank lists, and parliamentary threshold filters per electoral district (DAPIL).

Candidate & Representative Database: Comprehensive record management for candidates, vote totals, witness profiles, and WhatsApp blast templates.

05 // FIELD STUDY & USER TESTING VALIDATION
To validate system reliability in low-connectivity and high-stress environments, a field study and nationwide onboarding campaign was conducted across regional hubs in Semarang, Palembang, and Jakarta, training representatives from all 38 provinces.

90% Unassisted Task Completion: During live simulation sessions, 90% of regional representatives successfully operated the mobile PWA and data entry flows without technical intervention.

Proactive Identity Discrepancy Handling: The remaining 10% of operational friction points (unmatched NIK numbers or electoral district mismatches) were identified and addressed prior to election day through fallback admin override protocols.

06 // BUSINESS IMPACT & KEY DELIVERABLES
Successful Nationwide 2024 Election Rollout: Maintained continuous operational uptime throughout the critical February 14–15 quick count window, capturing real-time internal data across 38 provinces and 127 international districts.

High-Precision Early Seat Projections: Enabled executive party leadership to monitor legislative seat gains (DPR RI/DPRD) using automated Saint-Laguë calculation tables immediately as vote tallies entered the system.

Optimized Field Efficiency: The combination of OCR auto-fill, location pre-definition, and WhatsApp verification minimized input latency, providing a fast and accurate internal data baseline.

🎨 Tips Penataan Visual di Framer untuk Projek Ini:
National Map & CMS Dashboard Showcase (Gambar 628df8 / 628e71):

Tampilkan tangkapan layar Web CMS Dark Blue yang berisi Peta Indonesia dan Dashboard Rekap Saint-Laguë. Berikan label Monospace: [SYSTEM: REAL-TIME ELECTION MONITORING CMS] · [CALCULATION: SAINT-LAGUË ALGORITHM].

Mobile Witness PWA Flow Showcase (Gambar 628a92 / 628a73):

Tampilkan 3 layar iPhone berdampingan yang menunjukkan alur Entry Data C Hasil, Foto C-Hasil Upload, dan Pantau Progres. Berikan label Monospace: [MOBILE PWA: TPS WITNESS DATA ENTRY & OCR].

Monospace Metadata Tag:

Tambahkan tag di atas judul: [CLIENT: INDONESIAN POLITICAL PARTY] · [SCALE: 38 PROVINCES / 820K+ TPS] · [TIMELINE: 2024 ELECTION].