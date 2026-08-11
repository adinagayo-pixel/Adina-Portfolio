CASE STUDY: TOUCH 'N GO (TNG) x GEGM
[REGION: MALAYSIA] · [SCOPE: EMBEDDED FINTECH & E-WALLETS] · [STATUS: RELEASED V5 / PRODUCTION]

Seamless Micro-Insurance Integration & Government Subsidy (PTV) Flow for Touch 'n Go E-Wallet
An embedded Progressive Web Application (PWA) architecture built inside Malaysia’s leading e-wallet ecosystem—leveraging TNG native SSO + eKYC data pipelines, automated Government Voucher (PTV) eligibility checks, and 5-version iterative design system alignments.

01 // EXECUTIVE SUMMARY
Client & Ecosystem: Great Eastern General Malaysia (GEGM) × Touch 'n Go (TNG Digital / Malaysia).

Role & Responsibility: Lead UI/UX Designer & Systems Integrator.

Timeline & Governance: 3 Months (Iterated and released across 5 major production UI versions).

Core Stack & Integration: Figma, TNG Mini Program API Docs, SSO Auth, eKYC Data Mapping, TNG Native UI Kit.

02 // THE STRATEGIC CHALLENGE
Integrating the Great Tenang Madani micro-insurance policy directly into Touch 'n Go’s high-concurrency e-wallet required a zero-friction checkout for millions of active users while enforcing strict fraud-prevention controls.

Key System & Business Constraints:
Dual-Purchase Logic (Normal vs. PTV Voucher): The checkout flow had to dynamically fork between standard e-wallet payments and Government Program Discount (Perlindungan Tenang Voucher / PTV) validation based on real-time NRIC eligibility.

Third-Party Fraud Mitigation: Enforcing strict identity cross-referencing to prevent users from buying subsidized policies on behalf of unauthorized third parties.

Design System Adaptation: Constructing a mirrored TNG UI Kit for first-round approvals prior to receiving official TNG design assets, followed by seamless system adaptation.

03 // SYSTEM & DATA PIPELINE ARCHITECTURE
Plaintext
┌────────────────────────────────┐   ┌────────────────────────────────┐   ┌────────────────────────────────┐
│ 01. SSO & eKYC AUTO-POPULATE  │ ─►│ 02. REAL-TIME PTV CHECKING     │ ─►│ 03. TNG E-WALLET CHECKOUT      │
│ Pre-filling NRIC, age & user   │   │ Automated government discount  │   │ Direct TNG e-wallet PIN        │
│ identity via TNG base data.    │   │ eligibility & anti-fraud rules.│   │ debit & policy confirmation.   │
└────────────────────────────────┘   └────────────────────────────────┘   └────────────────────────────────┘
1. Zero-Friction Identity Auto-Fill (SSO + eKYC)
Mapped TNG’s native Single Sign-On (SSO) and eKYC data schema (base user profile, NRIC, full name, age parameters) directly into the embedded PWA forms—eliminating manual typing friction and preventing identity spoofing.

2. Automated PTV Voucher Eligibility Verification
Engineered an inline identity validation screen where users input/confirm their NRIC to instantly check government subsidy eligibility. The system automatically adjusts premium totals to RM 0 (for eligible PTV recipients) or routes to standard TNG e-wallet debit.

3. Multi-Version Design Iteration (V1 to V5 Evolution)
Managed continuous iterations across 5 design versions—refining copy nuances, adapting pricing updates, and synchronizing layout structures directly with Touch 'n Go’s design and technical teams.

04 // DESIGN PROCESS & SYSTEMIC PIPELINE
[METHODOLOGY: E-WALLET PWA INTEGRATION] · [GOVERNANCE: 5-STAGE VERSION CONTROL]

Phase 1: API Discovery & Flow Reconstruction
TNG Mini Program Parsing: Deconstructed TNG’s mini program API documentation to identify accessible data fields (base data vs. eKYC data) and payment modal behaviors.

Prototyping Without Official UI Kit: Built an initial custom UI Kit based on TNG's live app build to secure first-round executive alignment prior to receiving official design assets.

Phase 2: Fraud Prevention & Edge-Case Mapping
Anti-Fraud Identity Mapping: Designed validation gates ensuring that the policyholder's NRIC matched the authenticated TNG account eKYC, preventing unauthorized third-party claims.

Eligibility Error States: Mapped comprehensive error and fallback screens for non-eligible PTV users, seamlessly transitioning them to standard purchase options without breaking the user journey.

Phase 3: Iterative Governance (V1 → V5)
Cross-Team Collaboration: Conducted daily technical alignment sessions with engineering teams and TNG’s design leads to refine information architecture, modal heights, and CTA wording.

Pricing & Copy Refinements: Managed 5 version cycles addressing minor UX adjustments, dynamic price calculation updates, and localized Malay/English copy compliance.

05 // BUSINESS IMPACT & KEY DELIVERABLES
Successful V5 Production Launch: Successfully deployed Great Tenang Madani to Touch 'n Go's live app ecosystem, maintaining zero-defect UX flows through version 5.

Frictionless Government Subsidy Access: Enabled thousands of eligible Malaysian citizens to verify PTV status and claim subsidized micro-insurance in under 3 clicks via eKYC auto-population.

Adaptable PWA Framework: Created a reusable embedded PWA insurance checkout architecture that GEGM now utilizes for third-party fintech partners.

🎨 Tips Penataan Visual di Framer untuk Projek Ini:
Version Evolution Showcase (Horizontal Scroll):

Tampilkan 5 versi gambar/canvas Figma milikmu (V1 to V5) secara berurutan. Berikan label Monospace kecil di atasnya: [VERSION EVOLUTION: V1 ──► V5 PRODUCTION RELEASE]. Ini membuktikan proses kerja iteratif dan disiplin versioning yang luar biasa.

PTV Discount vs Normal Purchase Split Flow:

Tampilkan potongan UI bagian Eligibility Check (RM 0 Voucher vs Standard Checkout) dalam format Bento Grid 2 kolom.

Monospace Metadata Tag:

Tambahkan tag di atas judul: [CLIENT: TOUCH 'N GO x GEGM] · [TECH: PWA / SSO / eKYC] · [GOVERNMENT PROGRAM: PTV VOUCHER].