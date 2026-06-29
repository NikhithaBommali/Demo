BRIGHTCONE  |  NC DHHS Phase 0 — Development Specification


BRIGHTCONE
Development Specification — Confidential
NC DHHS Phase 0 Assessment
Prototype Enhancement Specification
Technical guide for the development team — data pipelines, UI architecture, enhancements roadmap, and integration specifications for the NC DHHS Rural Health Transformation Assessment Dashboard.


	

	Version
	1.0
	Date
	April 2026
	Author
	Naresh Vemparala — Co-Founder & COO
	Audience
	Brightcone Development Team
	Classification
	Internal — Confidential
	Related
	NC DHHS Phase 0 Proposal, RHT-OS PRD v2.0
	________________


1. Overview & Objectives
This document specifies the technical requirements for building and enhancing the NC DHHS Phase 0 Assessment Dashboard — a working prototype that will be demonstrated to Pyreddy Reddy (CISO, NC DHHS) and his executive team. The dashboard is the primary deliverable of our $75-100K Phase 0 services engagement with NC DHHS.


1.1 What the Dashboard Must Demonstrate
* We already assessed NC's rural providers — real facility names, real counties, real NPI numbers, real EHR data
* We can evaluate healthcare technology vendors using standardized 5-dimension framework with public federal data
* We discovered AI tools operating without governance across DHHS — quantified the risk with specific tools, users, and interaction counts
* Every score traces to verified public data sources with documented methodology
* All findings map to Initiative 6 sub-budgets — connecting assessment outputs to the money DHHS is responsible for


1.2 Design Principles for DHHS Leadership
* Government enterprise aesthetic — light background, professional typography (Segoe UI/Arial), data-dense but clean. NOT a SaaS startup dark-mode dashboard.
* NC state government branding colors: Deep Ocean Blue (#0B3C61), Sky Blue (#288DC2), Earthy Green (#789B4A) from official OSHR branding guidelines
* Data provenance on every page — every chart, table, and finding includes source URLs and refresh cadences
* No AI-generated feel — no gradient backgrounds, no floating elements, no animated counters. Think IBM/Deloitte government tools, not YC demo day.
* Conversational demo flow — each tab tells a story and supports 'click here to answer Pyreddy's question' in the meeting
________________


2. Prototype Architecture
2.1 Technology Stack
Component
	Technology
	Notes
	Frontend
	React (JSX) — single-file artifact
	Deployed as Claude artifact for demo; production version will be Next.js
	Charts
	Recharts library
	Bar, Radar, Pie charts — imported from recharts package
	Styling
	Inline CSS with NC Gov color palette
	CSS variables defined as constants at top of file
	Data
	Static JSON arrays within component
	Phase 0 uses hardcoded realistic data; Phase 1 connects to live pipelines
	PHI Detection (demo)
	Client-side regex patterns
	Production: Microsoft Presidio + custom NER models
	Hosting (demo)
	Claude.ai artifact rendering
	Production: Vercel or AWS Amplify
	

2.2 The Dashboard Narrative — What It Communicates
This dashboard is not a collection of charts. It tells a specific story to NC DHHS leadership: 'You have $213 million in federal funds to transform rural healthcare. Here is exactly what we found when we assessed your providers, evaluated available vendors, and inventoried AI tools across your agency — and here is what you need to do about it, mapped to the specific Initiative 6 sub-budgets you are responsible for.' Every element on every tab serves this narrative. Nothing is decorative.


The story arc across 6 tabs
Tab 1 (Executive Summary) answers: 'What did you find, and why should I care?' Tab 2 (Regional Map) answers: 'Where are the problems?' Tab 3 (Provider Readiness) answers: 'Show me the details — which providers, which gaps?' Tab 4 (Vendor Evaluation) answers: 'Which vendors should we trust with RHIF dollars?' Tab 5 (AI Governance) answers: 'What is happening with AI in our agency right now?' Tab 6 (Audit & Provenance) answers: 'Can I defend these findings to CMS and the Governor?' Each tab builds on the previous one. The demo should flow through them in order.
	

2.3 Tab-by-Tab Specification
Tab 1: Executive Summary
This is the tab that stays on screen when the Secretary or Deputy Secretary walks in. It must communicate the full picture in 30 seconds without clicking anything, and support a 3-minute walkthrough with discussion.


What it shows:
* Provider Readiness Summary (left hero panel): The single most important output of the entire assessment. The large '302 rural providers assessed' headline establishes scope. The color-coded readiness bar (green/gold/red) gives the instant visual story — roughly one-quarter ready, half conditional, one-quarter not ready. The three tier breakdowns below explain what each tier means in plain language ('Eligible for advanced RHIF modernization grants' vs 'Need foundational support first' vs 'Technical assistance only'). This is what Carnegie's team needs to start allocating RHIF funds.
* RHIF Allocation Recommendation (right panel, top): Translates the readiness tiers directly into dollar amounts — $12.8M for advanced modernization, $5.9M for foundational support, $1.6M for technical assistance. This is the deliverable that makes the assessment worth $75-100K. Without this data, DHHS cannot defensibly allocate the $20.3M RHIF budget. With it, they have an audit-ready allocation framework backed by scored data.
* Key Metrics (right panel, bottom two cards): Vendors Evaluated (10, with recommended/flagged breakdown) and AI Tools Ungoverned (6 of 8, with employee count and unmonitored interaction count). The AI card has a red left border — it is the only card with red styling, designed to draw the eye to the most urgent finding. This is Pyreddy's problem, not Carnegie's, and the visual treatment reflects that.
* Critical Findings (three cards below hero): Each finding is a specific, actionable problem tied to a specific Initiative 6 sub-budget. The 'See AI Governance tab →' links are clickable — they navigate directly to the relevant tab. This lets the presenter respond to questions in real-time during the demo ('How bad is the AI problem?' → click → full detail). Each card has a colored top border (red for critical, amber for important) that creates visual urgency without overwhelming.
* Initiative 6 Budget Waterfall (6-card grid): Maps every sub-initiative (6a through 6f) with its budget and assessment finding. Cards with critical findings are highlighted in red; assessed areas in green; pending items in gray. This is the accountability view — it shows DHHS leadership exactly which budget lines have been assessed and what was found. It also shows gaps ('Pending — consumer assessment not in scope') which frames future engagement opportunities.
* Key Deadlines (bottom left): A horizontal timeline showing GovRAMP effective date, vendor SOC 2 expirations, RHIF fund obligation target, CMS reporting deadline, and CMS Rural Health Summit. This creates urgency without Brightcone having to say 'you need to move fast' — the dates speak for themselves. Pyreddy will notice the GovRAMP date immediately because his office manages that requirement.
* Assessment Efficiency (bottom right): A simple table showing manual process time vs. platform time for each assessment deliverable. The manual column shows realistic timeframes that DHHS staff will recognize as accurate ('8-12 weeks for provider assessment with 2 FTEs'). The platform column shows what was actually achieved. This is the ROI justification — it answers 'why should we pay for this instead of doing it ourselves?'


What it intentionally does NOT show:
* No Brightcone product features — this tab is about NC's data, not our software
* No technical architecture — leadership doesn't care about APIs and data pipelines
* No pricing or commercial terms — this is an assessment presentation, not a sales pitch
* No jargon — every label uses plain language that a non-technical Deputy Secretary can understand


Tab 2: Regional Map
NC DHHS thinks geographically. The state has 100 counties, 85 rural, organized into 6 ROOTS Hub regions for RHTP. Every program decision — grant allocation, vendor deployment, workforce investment — is made at the regional level. This tab translates the assessment data into the geographic frame that DHHS leadership already uses.


What it shows:
* Interactive regional map (left): Six ROOTS Hub regions displayed as clickable areas with color intensity reflecting readiness — darker regions have more providers who are not ready. Each region shows its name, county count, provider count, and a green/gold/red breakdown. Clicking a region selects it, highlights it in blue, and filters the detail panel on the right. The map is simplified (positioned rectangles, not precise county boundaries) — geographic precision matters less than the visual pattern of 'which regions are struggling.'
* Hub detail panel (right): Shows detailed statistics for the selected region (or all regions if none selected). For each Hub: county count, provider count, anchor health system name, readiness tier breakdown with badges, and a proportional progress bar. The anchor health system name matters because Pyreddy's team knows these organizations — seeing 'ECU Health / Vidant' next to Northeast Hub grounds the data in institutional relationships they already have.
* Click-to-filter interaction: When a region is selected on the map, the Provider Readiness tab (Tab 3) also filters to that region. This creates a drill-down flow — click Northeast on the map, then switch to Provider Readiness and immediately see only Northeast providers. During the demo, this lets you answer 'Why is Northeast the worst?' in two clicks.


Why this tab matters:
Without the geographic view, the assessment data is abstract — '77 providers not ready' doesn't land until you can see that 14 of them are concentrated in the 18-county Northeast region, which has the fewest ready providers (8 out of 41) and the largest geographic footprint. The map makes the rural health equity story visible. It also maps directly to how ROOTS Hub Leads will consume this data — each Hub Lead cares about their region, not the statewide aggregate.


Tab 3: Provider Readiness
This is the analytical core of the assessment — the detailed, provider-level scoring that backs up everything shown in the Executive Summary. It must satisfy two audiences: program directors who need to make grant allocation decisions, and auditors who need to verify that those decisions were data-driven.


What it shows:
* ROOTS Hub filter buttons (top right): One button per Hub region. Clicking a button filters the table to only that region's providers. Active filter is highlighted in blue. This supports the regional drill-down flow from Tab 2 and lets the presenter quickly answer region-specific questions during the demo.
* Provider table: Each row represents one assessed rural provider with the following columns — Provider name (actual NC facility name), NPI (real format, verifiable), County, ROOTS Hub assignment, Facility type (Hospital, FQHC, RHC, CAH, BH/LME-MCO), EHR system name, ONC certification edition, HIE connectivity (Yes/No badge), Broadband availability with speed (e.g., '250/100' or '<25/3'), IT staff count, Readiness score (0-100 with visual bar), and Readiness tier (READY/CONDITIONAL/NOT READY badge).
* Visual indicators: Green badges for positive indicators (HIE connected, broadband available), red badges for gaps (no HIE, no broadband). Providers with no EHR show 'None' in red bold. Providers with zero IT staff show '0' in red. The score bar fills proportionally and changes color by tier (green/amber/red). These visual cues let the viewer scan 12 rows and immediately spot the problem providers.
* Data source citation (bottom): Every data source used in the scoring is listed with its URL — NPPES, HRSA UDS, ONC CHPL, FCC BDC, CMS PECOS, CMS PI Attestation. This is not decorative — it tells auditors exactly where to verify each data point.


The contrast that makes the point:
The table is designed so that high-readiness and low-readiness providers appear in the same view. When Pyreddy sees Appalachian Regional Healthcare (score 87, Epic EHR, HIE connected, 250/100 broadband, 12 IT staff) next to Kinston Community Health Center (score 18, no EHR, no HIE, no broadband, zero IT staff), the grant allocation question answers itself. You cannot give both of these providers the same type of modernization grant. The scoring framework makes that obvious in a way that a spreadsheet never could.


Tab 4: Vendor Evaluation
This tab answers the question: 'When our RHIF grant recipients go to buy technology — EHR systems, telehealth platforms, AI tools, RPM devices — which vendors should we recommend, and which should we flag?' This is the vendor intelligence layer that no state currently has.


What it shows:
* Vendor table (left/full width): 10 vendors evaluated across healthcare technology categories (EHR, Telehealth, AI/ML, RPM, Cybersecurity, Care Coordination). Each row shows vendor name, category, overall score (color-coded by threshold), evaluation status (Recommended/Conditional/Under Review/Flagged as badges), SOC 2 Type II expiration date (with 'Expired' flagged in red), and active risk alert count. The table is sorted by category grouping so buyers can compare within categories.
* Vendor detail panel (right, appears on click): When a vendor row is clicked, a detail panel expands showing the 5-dimension evaluation breakdown as horizontal bars (Compliance 35%, Functional 25%, Implementation 15%, Stability 15%, Interoperability 10%), verified certifications as green badges, HHS OCR breach count (24 months), and active risk alert count. The dimension bars let the viewer immediately see where a vendor is strong and where it's weak — a vendor might score well overall but have a specific compliance gap that matters for their use case.
* SOC 2 expiration dates: This is a detail most vendor evaluations miss. A vendor may have had SOC 2 Type II certification, but if it expired 3 months ago and wasn't renewed, that's a red flag. Abridge shows 'Expired' in red — a finding that would take weeks to discover through traditional due diligence but is immediately visible here.


The Abridge finding:
Abridge (AI/ML — Ambient Scribe) is deliberately included as the one flagged vendor. Score 6.4/10, SOC 2 expired, 3 active risk alerts, only 'HIPAA BAA' as a certification (no SOC 2, no HITRUST, no GovRAMP). This is the vendor that some NC rural providers might already be considering for AI-powered clinical documentation. The assessment catches it before state funds flow to it. This single finding — visible in seconds — demonstrates why standardized vendor evaluation matters and why manual PDF questionnaires are insufficient.


Tab 5: AI Governance
This is the tab that Pyreddy will spend the most time on, because it speaks directly to his mandate as CISO. It answers: 'What AI tools are deployed across my agency, who is using them, what data are they touching, and are they governed?' The answer — for most tools — is no.


What it shows:
* Critical alert banner (top): Red background, warning icon, bold statement: '6 of 8 AI tools operating without PHI governance.' Followed by the specific numbers — unmonitored interactions count, employee count, and a reference to the NC Executive Order on AI Use (2024) which requires agencies to maintain an AI inventory. This is not hypothetical risk — it is a current, measurable compliance gap that Pyreddy is responsible for.
* AI tool table: Each row represents one discovered AI tool with — Tool name, User count, Division/Department, Data Exposure (what types of data flow through the tool, in plain language), PHI Risk level (Critical/High/Medium/Low as color-coded badges), Governance status (Governed with green checkmark or Ungoverned with red X), 30-day interaction count, NIST AI RMF alignment indicators (4 dots for Govern/Map/Measure/Manage), and Recommended action.
* NIST AI RMF indicators: Four small colored dots per tool representing the four NIST AI RMF functions — Govern, Map, Measure, Manage. Green = aligned, Yellow = partial, Red = no alignment. ChatGPT shows four red dots. Nuance DAX (the one properly governed tool) shows mostly green. This visual pattern — a wall of red dots with two green exceptions — is immediately comprehensible to Pyreddy's team who already uses NIST frameworks. It translates 'ungoverned' from an abstract label into a specific, framework-aligned gap.
* Data Exposure column: The most important column for Pyreddy. Each tool shows exactly what data types flow through it — 'Email, Word docs, Medicaid correspondence' for Copilot, 'Unknown — no monitoring or BAA' for ChatGPT, 'Budget projections, contract analysis' for the Finance custom GPT. The word 'Unknown' for ChatGPT is the scariest entry in the table. It means 89 employees are sending data somewhere and nobody knows what data.
* Recommended actions: Specific, graduated actions per tool — 'Block access; implement PHI safeguards' for Critical risk, 'Implement PHI safeguards' for High, 'Register; assess risk' for Medium, 'Monitored — continue' for tools already governed. These are actionable recommendations, not vague advice.


Why this tab creates urgency:
Every state CISO knows that employees are using AI tools. None of them have quantified it. This tab puts specific numbers on a problem that has been abstract until now — 8 tools, 334 users, 10,770 interactions in 30 days, 6 tools with zero governance. When Pyreddy sees this data, he has something he can take to the Secretary and say: 'This is our current exposure. Here is the data. We need to act.' That conversation could not happen before this assessment.


Tab 6: Audit & Provenance
This tab exists for one reason: trust. Everything in the previous five tabs is only valuable if DHHS leadership believes it. This tab provides the evidence chain — what was delivered, what data it was based on, and how to verify it independently.


What it shows:
* Deliverable completion status (left panel): A list of every assessment deliverable with its completion status — Complete (green), Pending (amber). Each deliverable shows a brief detail line (e.g., '302 providers scored', '10 vendors evaluated'). This serves as a project status report and a table of contents for the full assessment document that accompanies the dashboard.
* Federal data sources with URLs (right panel): Every public data source used in the assessment, listed with its source name, website URL, and what it was used for. Ten sources total — NPPES, ONC CHPL, HRSA UDS, CMS PI Attestation, NIST NVD, SAM.gov, HHS OIG LEIE, HHS OCR Breach Portal, FCC Broadband Map, FDA AI/ML Devices. The green callout at the bottom states: 'Zero proprietary data required — all independently verifiable.' This is the single most important trust-building element in the entire dashboard. It tells Pyreddy: you don't have to take our word for it. Open any of these URLs and check.


Why this tab matters for the engagement:
Government buyers have been burned by vendors who present impressive dashboards backed by opaque proprietary data. By showing that every score in this assessment traces to a public federal database that DHHS staff can verify themselves, Brightcone establishes a fundamentally different credibility position. The subtext is: 'We are not hiding behind proprietary algorithms. Our value is in the integration, scoring, and analysis — not in controlling your access to the underlying data.' This is the tab that converts skepticism into trust.
________________


3. Data Sources & Pipeline Specifications
The following data sources power the assessment. Each must be integrated into a data pipeline that ingests, transforms, and loads data into the provider/vendor/AI tool data models.


3.1 Provider Data Pipeline
Source 1: NPPES NPI Registry
* API endpoint: https://npiregistry.cms.hhs.gov/api/?version=2.1&state=NC&limit=200
* Bulk download: https://download.cms.gov/nppes/NPI_Files.html
* Filter: state=NC, Entity Type 2 (organizations only), enumerate through all healthcare taxonomy codes
* Returns: NPI, provider name, address, taxonomy, phone, enumeration date
* Free, no key required. Updates daily/weekly.
* Expected volume: ~80,000+ NC NPIs → filter to ~300-400 rural organizational providers


Source 2: HRSA Health Center Data
* Download: https://data.hrsa.gov/data/datadownload (Health Center Service Delivery Sites)
* Filter: state=NC
* Returns: health center name, address, grant number, FQHC vs Look-Alike, UDS data
* Identifies all ~41 NC FQHCs — primary RHIF target population


Source 3: CMS Provider of Services (POS)
* Download: https://data.cms.gov/provider-characteristics/hospitals-and-other-facilities/provider-of-services-file
* Filter: state=NC, then by rural counties using USDA RUCA codes
* Returns: facility name, type (hospital, SNF, HHA, RHC), bed count, ownership, Medicare certification


Source 4: CMS EHR Incentive / Promoting Interoperability Attestation
* Download: https://data.cms.gov/provider-data (EHR Incentive datasets)
* Cross-reference provider NPI with EHR attestation data
* Returns: which EHR product, edition, last attestation date
* Coverage: ~60-70% of NC rural providers. Remainder marked 'No attestation on file'


Source 5: ONC CHPL (EHR Certification Verification)
* API: https://chpl.healthit.gov/rest/search/v3
* Cross-reference EHR product name from attestation data with current certification status
* Returns: certification status, criteria met, edition, surveillance results


Source 6: FCC Broadband Data Collection
* Download: https://broadbandmap.fcc.gov/data-download/nationwide-data
* For each provider address, geocode and look up broadband availability
* Threshold scoring: ≥100/20 Mbps = High, ≥25/3 = Medium, <25/3 = Low
* Geocoding: use Census Geocoder (free) or Google Geocoding API
* Note: FCC data is large (GBs). Pre-filter to NC before processing.


Source 7: USDA Rural-Urban Continuum Codes
* Download: https://www.ers.usda.gov/data-products/rural-urban-continuum-codes/
* Map each NC county FIPS to RUCA code (1-9 scale)
* NC DHHS may have specific rural county list from RHTP application — use theirs if available


Source 8: US Census ACS (Demographic Context)
* API: https://www.census.gov/data/developers/data-sets/acs-5year.html
* Pull tract-level demographics for each provider's county: population, insurance coverage, poverty rate, language
* Free API key required
________________


3.2 Vendor Data Pipeline
Source 9: SAM.gov Entity & Exclusions
* Entity API: https://api.sam.gov/entity-information/v4/
* Exclusions API: https://api.sam.gov/entity-information/v4/exclusions
* Check each vendor: registered as federal contractor? any exclusions? DUNS/UEI verification
* Registration required (1-4 weeks approval). Public tier: 10 requests/day.


Source 10: NIST National Vulnerability Database
* API: https://services.nvd.nist.gov/rest/json/cves/2.0
* Search by vendor product name (CPE matching) for known CVEs
* API key recommended (https://nvd.nist.gov/developers/request-an-api-key) — without key, aggressive rate limits


Source 11: HHS OCR Breach Portal
* URL: https://ocrportal.hhs.gov/ocr/breach/breach_report.jsf
* CRITICAL: No official API — web scraping required
* Build robust JSF scraper with monitoring for portal changes
* Search by vendor/entity name, filter to past 24 months
* Backup: BitSight integrates OCR data via commercial API ($15-75K/yr)


Source 12: HHS OIG LEIE (Exclusions)
* Download: https://oig.hhs.gov/exclusions/exclusions_list.asp
* Monthly CSV. Check vendor and key personnel against exclusion list.


Source 13: FedRAMP / GovRAMP Marketplace
* FedRAMP: https://marketplace.fedramp.gov/
* GovRAMP: https://govramp.org/product-list/ (scrape — no API)
* Check vendor cloud authorization status


Source 14: FDA AI/ML Devices & 510(k)
* AI/ML list: https://www.fda.gov/medical-devices/software-medical-device-samd/artificial-intelligence-enabled-medical-devices
* 510(k) API: https://api.fda.gov/device/510k.json
* Check AI/ML vendors for FDA clearance status
________________


3.3 AI Tool Discovery (Requires NC DHHS Cooperation)
These data sources are NOT public — they require authorization from Pyreddy's team:


* IT procurement records — contracts, licenses, subscriptions for AI tools (catches enterprise-licensed AI)
* Network traffic analysis — DNS/proxy logs for traffic to known AI domains (api.openai.com, copilot.microsoft.com, claude.ai, gemini.google.com)
* Staff survey — brief anonymous survey to all DHHS staff: 'which AI tools do you use for work?'
* Items 1 and 3 are most practical for Phase 0. Item 2 requires deeper ITD cooperation.
________________


4. Scoring Logic
4.1 Provider Readiness Score
Each provider is scored 0-100 based on 6 weighted criteria:


Criterion
	Weight
	Data Source
	Scoring Logic
	EHR Status
	25%
	CMS PI Attestation + ONC CHPL
	Certified current EHR = 10, certified older edition = 7, no attestation = 3, explicitly no EHR = 0
	HIE Connectivity
	20%
	NC HealthConnex list (from DHHS) or proxy
	Confirmed connected = 10, proxy signals suggest connected = 6, no evidence = 2
	Broadband
	15%
	FCC BDC + geocoding
	≥100/20 Mbps = 10, ≥25/3 = 6, <25/3 = 2, no service = 0
	IT Staff Capacity
	15%
	Proxy: bed count (hospitals) or FTE (FQHCs)
	≥5 staff = 10, 2-4 = 7, 1 = 4, 0 = 0. All estimates labeled as proxy.
	Cybersecurity
	15%
	OCR breach portal + proxy signals
	No breaches + current EHR + HIE = 8-10, mixed signals = 4-6, breaches or no EHR = 0-3
	Prior Grant Performance
	10%
	HRSA grants + USAspending.gov
	Successful tech grants = 10, prior grants non-tech = 5, no history = 5, compliance issues = 2
	

Composite formula: Score = (EHR × 0.25) + (HIE × 0.20) + (Broadband × 0.15) + (IT Staff × 0.15) + (Cyber × 0.15) + (Grants × 0.10), normalized to 0-100.


Tier Assignment
* Score ≥ 70: READY — eligible for advanced modernization grants
* Score 40-69: CONDITIONAL — needs foundational support before advanced grants
* Score < 40: NOT READY — technical assistance and planning only


Confidence Rating
* All 6 criteria from verified data: HIGH confidence
* 4-5 verified, 1-2 proxy: MEDIUM confidence
* 3+ proxy: LOW confidence — provider self-assessment recommended


4.2 Vendor Evaluation Score
Each vendor scored across 5 dimensions, each rated 1-10:


Dimension
	Weight
	Key Checks
	Compliance & Security
	35%
	HIPAA BAA, SOC 2 Type II current, no OIG/SAM exclusion, no OCR breach (24mo), NIST CSF maturity
	Functional Fit
	25%
	ONC certification, feature coverage, rural suitability, mobile/offline, accessibility
	Implementation Readiness
	15%
	Rural deployments, training burden, support model, TCO, documentation quality
	Vendor Stability
	15%
	Years in business, financial health (SEC/990), ownership changes, employee signals, customer retention
	Interoperability
	10%
	FHIR R4, HL7 v2, USCDI, HIE integration, API quality, data portability
	

Overall score = weighted average of 5 dimensions. Status: Recommended (≥7.5), Conditional (6.5-7.4), Under Review (new/incomplete), Flagged (<6.5 or critical finding).


4.3 AI Tool PHI Risk Classification
Risk Level
	Criteria
	Critical
	Processes health data AND no BAA AND external cloud (e.g., ChatGPT consumer, unmanaged Gemini)
	High
	Accesses sensitive state data (budget, Medicaid) AND no BAA (e.g., Copilot without HIPAA config)
	Medium
	Has BAA but data handling not fully verified (e.g., Nuance DAX with active BAA)
	Low
	Processes no sensitive data (e.g., Adobe Firefly for images, GitHub Copilot for code only)
	________________


5. Enhancement Specifications
The following enhancements transform the prototype from a mockup into a demo that shows real NC data and live capabilities.


5.1 Real NC Provider Data (MUST DO)
Replace mock provider data with actual NC rural providers pulled from NPPES + HRSA.
* Pipeline: Node.js or Python script that queries NPPES API for NC organizational NPIs, cross-references HRSA for FQHCs, applies USDA rural classification, assigns ROOTS Hub by county mapping.
* Output: JSON array of 300+ providers with name, NPI, county, Hub, type, address. Loaded into prototype as static data.
* Engineering effort: 2-3 days


5.2 Interactive Regional Map (MUST DO)
NC map showing 6 ROOTS Hub regions as clickable areas. Color intensity based on readiness distribution. Click to filter provider table.
* Implementation: Positioned div elements representing regions (simplified geographic layout, not full county SVG). Click handler sets hubFilter state, which filters provider table.
* Detail panel: Right side shows selected Hub stats — county count, provider count, anchor health system, readiness distribution bar.
* Engineering effort: 1-2 days


5.3 Initiative 6 Budget Waterfall (SHOULD DO)
Visual on Executive Summary tab showing $35.3M broken into 6 sub-initiatives with findings pinned to each.
* Implementation: 6-column grid. Each card shows sub-initiative ID, budget, name, and key finding. Color-coded: red background if critical finding, green if assessed, gray if pending.
* Engineering effort: Half day


5.4 ROOTS Hub Click-to-Filter (SHOULD DO)
Hub names in the bar chart and regional map are clickable. Clicking filters the provider table to only that Hub's providers.
* Implementation: useState for hubFilter. Hub buttons on provider tab. useMemo for filtered provider array.
* Engineering effort: Half day


5.5 Risk Timeline (SHOULD DO)
Horizontal timeline on Executive Summary showing key compliance and program deadlines.
* Events: GovRAMP effective date (Apr 1), SOC 2 expirations for flagged vendors, RHIF fund obligation target, CMS Year 1 report deadline, CMS Rural Health Summit.
* Engineering effort: Half day


5.6 NIST AI RMF Alignment Indicators (NICE TO HAVE)
For each AI tool in the registry, show 4 small indicators (Govern, Map, Measure, Manage) with red/yellow/green status.
* Implementation: 4-element dot array per tool. Values: 0 (red/no alignment), 1 (yellow/partial), 2 (green/aligned). Stored in AI_TOOLS data array.
* Engineering effort: 2 hours
________________


6. Data Requirements from NC DHHS
The following items require cooperation from NC DHHS and should be requested during the kickoff meeting or engagement negotiation:


Data Item
	Source at NC DHHS
	Why We Need It
	When
	NC HealthConnex participant list
	NC HIEA / Pyreddy's team
	Determine which providers are HIE-connected (vs proxy)
	Kickoff meeting
	ROOTS Hub county assignments
	RHTP program office / Carnegie
	Map providers to correct Hub regions
	Kickoff meeting
	NC rural county definition
	RHTP application
	Which counties NC considers 'rural' for RHTP purposes
	Kickoff meeting
	IT procurement records (AI tools)
	ITD / Pyreddy authorization
	Discover enterprise-licensed AI tools
	Week 1-2
	Staff AI usage survey distribution
	HR / Pyreddy authorization
	Discover shadow AI usage on personal devices
	Week 2-3
	Initiative 6 sub-budget allocations
	Carnegie / Program Office
	Confirm exact dollar amounts per sub-initiative
	Kickoff meeting
	Existing vendor evaluation materials
	Procurement office
	Understand current manual process (for comparison)
	Week 1
	NC Executive Order on AI specifics
	Pyreddy's PSO team
	Map findings to NC-specific requirements
	Week 1
	

Items 1-3 and 6 are critical for a credible assessment
Without the ROOTS Hub county mapping and NC's rural county definition, we cannot assign providers to regions correctly. Without the Initiative 6 sub-budgets, we cannot map findings to dollars. Request these in the engagement negotiation — they should be straightforward for DHHS to provide.
	________________


7. Engineering Effort Summary


Task
	Effort
	Dependencies
	Priority
	NPPES + HRSA + CMS POS provider pipeline
	2-3 days
	None — all public data
	Must Do
	Rural classification + ROOTS Hub mapping
	1 day
	USDA data + NC Hub assignments
	Must Do
	EHR status lookup (CMS PI + ONC CHPL)
	1-2 days
	None
	Must Do
	Broadband availability (FCC BDC + geocoding)
	2-3 days
	Geocoding API access
	Must Do
	IT staffing proxy model
	1 day
	Provider size data
	Must Do
	Cybersecurity proxy + OCR breach scraping
	1-2 days
	OCR scraper needs maintenance
	Must Do
	Prior grant history (HRSA + USAspending)
	1 day
	None
	Should Do
	Scoring engine + confidence ratings
	1-2 days
	All above complete
	Must Do
	Vendor evaluation (10 vendors)
	25-30 hrs analyst
	SAM.gov registration
	Must Do
	AI tool discovery (procurement + survey)
	3-5 days
	NC ITD cooperation
	Must Do
	Dashboard UI enhancements (5.1-5.6)
	3-5 days
	Data pipelines complete
	Must Do
	TOTAL
	~25-35 working days
	2-person team
	5-7 weeks
	

Core team: 1 data engineer (pipeline build) + 1 analyst (vendor evaluation + AI discovery). Founders provide domain expertise, NC relationship management, and demo preparation.
________________


8. Demo Meeting Preparation
8.1 Demo Script (Recommended Flow)
* Open on Executive Summary tab — set context with readiness summary, show Initiative 6 budget waterfall, highlight critical findings (3 min)
* Click the AI Governance finding link — navigates directly to AI Governance tab. Show ChatGPT at Critical risk, 89 users, no BAA. Show NIST AI RMF all-red indicators. (3 min)
* Return to Executive Summary, click Provider Readiness finding — show Northeast region filtered, Kinston (score 18, no EHR) vs Appalachian Regional (score 87, Epic). The contrast makes the point. (3 min)
* Move to Regional Map — click Northeast region to show why it has the worst readiness scores. Click other regions for comparison. (2 min)
* Navigate to Vendor Evaluation — click Abridge to show the flagged vendor with expired SOC 2, risk alerts. Then click CrowdStrike to show a clean evaluation. (3 min)
* End on Audit & Provenance — show data source list with URLs, deliverable status. Message: 'everything you just saw is verifiable.' (2 min)
* Transition to discussion: 'This is what the assessment delivers. Let's talk about next steps and the Brightcone platform capabilities that support this.' (remaining time)
* Note: Brightcone platform demo (Prompt Guard, AI governance capabilities) will be presented as a separate session




— END OF SPECIFICATION —
Confidential — Brightcone Internal  |  Page  of