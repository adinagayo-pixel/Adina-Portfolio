CASE STUDY: SUNWAY x GEGM
[REGION: MALAYSIA] · [SCOPE: EMBEDDED INSURANCE & B2B PORTAL] · [STATUS: LIVE / PRODUCTION]

Integrating Multi-Product Insurance Ecosystem into Malaysia’s Leading Conglomerate App
An end-to-end integration architecture bridging third-party insurance microsites and back-office management consoles through API data mapping, reverse-engineered design systems, and zero-defect developer handoffs.

01 // EXECUTIVE SUMMARY
Client & Ecosystem: Great Eastern General Malaysia (GEGM) × Sunway Group (Malaysia).

Role & Responsibility: Solo Product Designer & System Logic Architect.

Timeline & Rollout: 6-Month Multi-Phase Rollout (5 Products: GH360, Great Shield Active, Easi Care PA, Travel, & Motorcycle).

Core Stack & Methods: Figma, Gemini AI (Logic Synthesis & Copywriting Alignment), API Schema Docs, PDS Guidelines, Reverse Engineering.

02 // THE STRATEGIC CHALLENGE
Integrating third-party financial products into an established ecosystem requires balancing strict legal compliance with frictionless user experience. The core objective was to build an embedded insurance purchasing microsite within the native Sunway App alongside a B2B Partner Portal for operational control.

Key System Constraints:
Zero UI Kit Access: Sunway did not provide an accessible Figma Component Library. The UI had to be reverse-engineered from production builds to ensure 100% brand alignment.

Legal & Regulatory Rigor: The purchasing flow had to strictly adhere to Product Disclosure Sheets (PDS), health declarations, age constraints, and dynamic underwriting rules.

Payment & Loyalty Binding: Seamless integration with Sunway Pay, ensuring dynamic calculation of transaction rewards and Sunway Points.

03 // SYSTEM & LOGIC ARCHITECTURE
Plaintext
┌────────────────────────────────┐   ┌────────────────────────────────┐   ┌────────────────────────────────┐
│ 01. REVERSE ENGINEERING        │ ─►│ 02. API & LEGAL MAPPING        │ ─►│ 03. FULL-SPECTRUM BLUEPRINT    │
│ Reconstructing Sunway native   │   │ Parsing API docs, PDS          │   │ Positive/negative edge-cases,  │
│ UI components & design tokens. │   │ constraints, & add-ons logic.  │   │ error validation & dev specs.  │
└────────────────────────────────┘   └────────────────────────────────┘   └────────────────────────────────┘
1. Design System Reverse Engineering
Conducted independent component extraction from the Sunway App build to establish a mirrored UI Kit. This eliminated visual friction when users transitioned from the main app into the embedded GEGM microsite.

2. API-Driven Form & Logic Mapping
Parsed complex API specifications and PDS policy documents to create dynamic form fields. Form inputs adapt in real-time based on user age, property parameters, coverage selections, and policy add-ons.

3. Cross-Border & Multi-Stakeholder Alignment
Synchronized technical constraints between regional Project Managers in Malaysia and engineering teams, managing critical flow shifts such as relocating consent terms from the host app to the microsite.

04 // DUAL-SIDED PRODUCT DELIVERABLES
A. B2C Customer-Facing Embedded Microsite
Seamless Embedded Transition: Native navigation bars and persistent headers enabling policy tracking, purchase confirmations, and automated e-mail dispatch.

Product Comparison & Filtering: Transparent comparison flows allowing users to evaluate coverage tiers (e.g., GH360 vs. Travel) before committing to checkout.

Multi-Step Form Optimization: Complex medical and property declarations broken down into digestible wizard steps to mitigate cognitive load and form drop-off.

B. B2B Partner Portal (Back-Office Management Console)
Dynamic Banner CMS Engine: Empowered internal business teams to configure, schedule, and launch promotional banners directly on the microsite without developer deployment cycles.

Sales Performance Analytics Dashboard: Real-time data visualization tracking revenue charts, transaction volumes, and top-performing insurance products.

Funnel Drop-Off Tracking: Analytics module identifying precise user drop-off points within the declaration flow, establishing actionable data for future UX optimization.

Customer & Transaction Control: Centralized transaction logs enabling support teams to verify active policy statuses instantly.

05 // BUSINESS IMPACT & DEVELOPER HANDOFF
First-Round Executive Approval: High-fidelity UI architecture and interaction flows were approved on the first review cycle by key stakeholders.

Zero-Defect Developer Handoff: Delivered full-spectrum blueprints containing annotated specs, positive/negative test cases, validation states, and edge-case behaviors—eliminating clarification cycles during engineering.

Multi-Phase Production Rollout: Successfully deployed across 3 distinct phases (Phase 1: GH360 & Great Shield Active; Phase 2: Easi Care PA & Travel; Phase 3: Motorcycle).

Enterprise Scalability: Established the foundational design framework for GEGM’s subsequent third-party ecosystem integrations across regional partners.

06 // RETROSPECTIVE & NEXT STEPS
[LEARNINGS & SYSTEM EVOLUTION]

"While third-party app boundaries restricted direct A/B testing at launch, the deployment of the Partner Portal’s drop-off tracking provides the structural foundation needed to run granular usability iterations on complex form fields and CTA placements post-release."