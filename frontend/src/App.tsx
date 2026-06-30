import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  BadgeCheck,
  BookOpen,
  BrainCircuit,
  Building2,
  ChevronRight,
  Database,
  DollarSign,
  FileCheck2,
  Map,
  Moon,
  Scale,
  ShieldAlert,
  Sun,
  Users,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type TabKey = 'overview' | 'regional' | 'providers' | 'vendors' | 'governance' | 'audit';

type Provenance = {
  source: string;
  owner: string;
  lastUpdated: string;
  confidence: string;
  notes?: string;
};

type Provider = {
  id: string;
  name: string;
  region: string;
  type: string;
  readinessScore: number;
  populationServed: number;
  connectivity: 'High' | 'Moderate' | 'Constrained';
  workforceGap: 'Low' | 'Moderate' | 'High';
  ehrMaturity: number;
  referralDigitization: number;
  aiPolicyStatus?: string;
  blockers?: string[];
  opportunities?: string[];
  provenance: Provenance;
};

type Vendor = {
  name: string;
  category: string;
  fitScore: number;
  totalCost: string;
  interoperability: number;
  ruralFit: number;
  implementationRisk: 'Low' | 'Moderate' | 'High';
  strengths?: string[];
  gaps?: string[];
  provenance: Provenance;
};

type GovernanceRisk = {
  id: string;
  domain: string;
  severity: 'Critical' | 'High' | 'Moderate';
  description: string;
  mitigation: string;
  owner: string;
  timeline: string;
  provenance: Provenance;
};

const tabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  { key: 'overview', label: 'Overview', icon: <BookOpen size={16} /> },
  { key: 'regional', label: 'ROOTS Hub Regional Disparities', icon: <Map size={16} /> },
  { key: 'providers', label: 'Provider Readiness Detail', icon: <Users size={16} /> },
  { key: 'vendors', label: 'Vendor Evaluations', icon: <Building2 size={16} /> },
  { key: 'governance', label: 'AI Governance Risks', icon: <ShieldAlert size={16} /> },
  { key: 'audit', label: 'Audit/Provenance', icon: <Database size={16} /> },
];

const palette = {
  teal: '#1CC9A8',
  cyan: '#06B6D4',
  navy: '#12344D',
  amber: '#F59E0B',
  coral: '#F97316',
  red: '#DC2626',
  slate: '#64748B',
};

const dashboardData = {
  overview: {
    title: 'NC DHHS Phase Assessment Dashboard',
    subtitle:
      'Executive prototype for Initiative 6 rural provider readiness assessment, RHIF decision support, and Phase 0 governance framing.',
    summary: [
      {
        label: 'Providers Assessed',
        value: '42',
        detail: 'Across ROOTS-aligned rural service areas and referral ecosystems.',
        provenance: {
          source: 'Phase 0 interview and survey synthesis',
          owner: 'BrightWorks assessment team',
          lastUpdated: '2026-06-18',
          confidence: 'Moderate',
        },
      },
      {
        label: 'Average Readiness Score',
        value: '61 / 100',
        detail: 'Weighted composite of workforce, data, infrastructure, and governance readiness.',
        provenance: {
          source: 'Static scoring model v0.3',
          owner: 'Program strategy office',
          lastUpdated: '2026-06-17',
          confidence: 'Moderate',
        },
      },
      {
        label: 'Initiative 6 Budget Lens',
        value: '$18.4M',
        detail: 'Illustrative budget envelope for readiness acceleration and targeted enablement.',
        provenance: {
          source: 'Initiative 6 planning assumptions',
          owner: 'NC DHHS transformation finance',
          lastUpdated: '2026-06-14',
          confidence: 'Scenario-based',
        },
      },
      {
        label: 'RHIF Prioritization Cohort',
        value: '11 regions',
        detail: 'Decision-support framing for staged allocation, not an automated funding decision.',
        provenance: {
          source: 'RHIF scenario framing workbook',
          owner: 'Rural investment steering group',
          lastUpdated: '2026-06-16',
          confidence: 'Moderate',
        },
      },
    ],
    callouts: [
      'Readiness disparities are driven less by clinical appetite and more by broadband reliability, staff change capacity, and fragmented referral workflows.',
      'The highest-value Initiative 6 investments are shared enablement assets: integration support, policy templates, workforce upskilling, and regional implementation coaching.',
      'RHIF allocation decisions should pair need-based disparities with execution feasibility to avoid over-funding sites that cannot absorb implementation in Phase 1.',
    ],
    budgetAllocation: [
      { name: 'Shared interoperability services', amount: 5.8 },
      { name: 'Regional implementation coaching', amount: 4.1 },
      { name: 'Provider workforce training', amount: 3.3 },
      { name: 'Connectivity and device uplift', amount: 2.7 },
      { name: 'Governance and audit controls', amount: 1.6 },
      { name: 'Contingency / evaluation', amount: 0.9 },
    ],
    provenance: {
      source: 'Phase 0 executive synthesis memo',
      owner: 'BrightWorks / NC DHHS joint working session',
      lastUpdated: '2026-06-19',
      confidence: 'Moderate',
      notes: 'Budget values are prototype planning figures only and intended for scenario comparison.',
    },
  },
  regionalDisparities: {
    chartTitle: 'ROOTS Hub readiness disparities by region',
    chartSubtitle:
      'Composite score combines infrastructure, workforce, data exchange, and governance readiness dimensions.',
    regions: [
      { region: 'Mountains West', readiness: 54, workforce: 49, infrastructure: 46, referralLag: 71 },
      { region: 'Foothills', readiness: 58, workforce: 55, infrastructure: 53, referralLag: 64 },
      { region: 'Piedmont Rural Belt', readiness: 66, workforce: 62, infrastructure: 60, referralLag: 49 },
      { region: 'Sandhills', readiness: 61, workforce: 57, infrastructure: 56, referralLag: 58 },
      { region: 'Inner Coastal Plain', readiness: 59, workforce: 52, infrastructure: 51, referralLag: 67 },
      { region: 'Northeast Corridor', readiness: 63, workforce: 58, infrastructure: 59, referralLag: 55 },
      { region: 'Southeast Coastal', readiness: 57, workforce: 50, infrastructure: 48, referralLag: 69 },
    ],
    rhifPriority: [
      { region: 'Mountains West', disparityIndex: 82, absorbency: 51 },
      { region: 'Inner Coastal Plain', disparityIndex: 77, absorbency: 57 },
      { region: 'Southeast Coastal', disparityIndex: 79, absorbency: 49 },
      { region: 'Foothills', disparityIndex: 68, absorbency: 60 },
      { region: 'Sandhills', disparityIndex: 64, absorbency: 59 },
    ],
    provenance: {
      source: 'ROOTS regional scorecard prototype dataset',
      owner: 'Regional assessment PMO',
      lastUpdated: '2026-06-18',
      confidence: 'Moderate',
      notes: 'Referral lag reflects median referral completion days normalized to 100-point inverse scale.',
    },
  },
  providers: [
    {
      id: 'prov-001',
      name: 'Ashe Rural Health Collaborative',
      region: 'Mountains West',
      type: 'Critical Access Hospital Network',
      readinessScore: 52,
      populationServed: 28000,
      connectivity: 'Constrained',
      workforceGap: 'High',
      ehrMaturity: 58,
      referralDigitization: 42,
      aiPolicyStatus: 'Draft only',
      blockers: ['Limited IT bench depth', 'Inconsistent referral data capture', 'Rural broadband outages'],
      opportunities: ['Shared regional integration support', 'Tele-triage workflow pilots'],
      provenance: {
        source: 'Provider interview set A-12',
        owner: 'Field assessment lead',
        lastUpdated: '2026-06-12',
        confidence: 'Moderate',
      },
    },
    {
      id: 'prov-002',
      name: 'Piedmont Community Care Alliance',
      region: 'Piedmont Rural Belt',
      type: 'FQHC Consortium',
      readinessScore: 72,
      populationServed: 74000,
      connectivity: 'High',
      workforceGap: 'Moderate',
      ehrMaturity: 79,
      referralDigitization: 71,
      aiPolicyStatus: 'Defined intake controls',
      blockers: ['Need standardized consent language'],
      opportunities: ['Can serve as early adopter cohort', 'Regional playbook contribution'],
      provenance: {
        source: 'Readiness survey wave 2',
        owner: 'Assessment analytics team',
        lastUpdated: '2026-06-15',
        confidence: 'High',
      },
    },
    {
      id: 'prov-003',
      name: 'Robeson Integrated Family Services',
      region: 'Southeast Coastal',
      type: 'Behavioral Health Provider',
      readinessScore: 56,
      populationServed: 36000,
      connectivity: 'Moderate',
      workforceGap: 'High',
      ehrMaturity: 54,
      referralDigitization: 49,
      aiPolicyStatus: 'No formal policy',
      blockers: ['Case management duplication', 'Manual prior authorization handoffs'],
      opportunities: ['Shared navigator support', 'Targeted workforce training'],
      provenance: {
        source: 'Behavioral health subgroup review',
        owner: 'Domain advisor',
        lastUpdated: '2026-06-11',
        confidence: 'Moderate',
      },
    },
    {
      id: 'prov-004',
      name: 'Halifax Regional Access Partnership',
      region: 'Northeast Corridor',
      type: 'Multi-county Public Health Partnership',
      readinessScore: 65,
      populationServed: 44000,
      connectivity: 'Moderate',
      workforceGap: 'Moderate',
      ehrMaturity: 68,
      referralDigitization: 63,
      aiPolicyStatus: 'Policy committee established',
      blockers: ['Cross-county reporting inconsistency'],
      opportunities: ['Data standardization sprint', 'Shared compliance templates'],
      provenance: {
        source: 'Regional workshop transcript',
        owner: 'Public sector engagement lead',
        lastUpdated: '2026-06-13',
        confidence: 'Moderate',
      },
    },
  ] as Provider[],
  vendors: [
    {
      name: 'CareMesh Exchange Suite',
      category: 'Interoperability / referral orchestration',
      fitScore: 81,
      totalCost: '$$$',
      interoperability: 88,
      ruralFit: 75,
      implementationRisk: 'Moderate',
      strengths: ['FHIR-ready exchange patterns', 'Strong referral visibility dashboards'],
      gaps: ['Higher onboarding effort for smaller providers'],
      provenance: {
        source: 'Vendor demo scorecard 01',
        owner: 'Technical evaluation workgroup',
        lastUpdated: '2026-06-10',
        confidence: 'Moderate',
      },
    },
    {
      name: 'BridgePath Rural Connect',
      category: 'Implementation support / lightweight integration',
      fitScore: 84,
      totalCost: '$$',
      interoperability: 72,
      ruralFit: 91,
      implementationRisk: 'Low',
      strengths: ['Best fit for constrained provider IT teams', 'Regional coaching services bundled'],
      gaps: ['Analytics depth below enterprise platforms'],
      provenance: {
        source: 'Vendor demo scorecard 02',
        owner: 'Technical evaluation workgroup',
        lastUpdated: '2026-06-10',
        confidence: 'Moderate',
      },
    },
    {
      name: 'CivicAI Governance Layer',
      category: 'Policy controls / monitoring',
      fitScore: 69,
      totalCost: '$$',
      interoperability: 66,
      ruralFit: 70,
      implementationRisk: 'Moderate',
      strengths: ['Prebuilt governance workflows', 'Audit log exports'],
      gaps: ['Needs paired clinical workflow tooling'],
      provenance: {
        source: 'Governance tool comparison matrix',
        owner: 'Responsible AI council',
        lastUpdated: '2026-06-09',
        confidence: 'Moderate',
      },
    },
    {
      name: 'MedAtlas Enterprise Platform',
      category: 'Full-stack population health platform',
      fitScore: 63,
      totalCost: '$$$$',
      interoperability: 82,
      ruralFit: 52,
      implementationRisk: 'High',
      strengths: ['Broad enterprise feature set'],
      gaps: ['High change-management burden', 'Budget misalignment for smallest sites'],
      provenance: {
        source: 'Vendor shortlist workshop',
        owner: 'Procurement strategy lead',
        lastUpdated: '2026-06-08',
        confidence: 'Scenario-based',
      },
    },
  ] as Vendor[],
  governanceRisks: [
    {
      id: 'gov-1',
      domain: 'Data provenance and explainability',
      severity: 'Critical',
      description: 'Regional decision support could be challenged if source lineage and scoring assumptions are not visible to program officers and auditors.',
      mitigation: 'Attach provenance panels to every summary metric and require scorecard versioning before RHIF review cycles.',
      owner: 'Responsible AI council',
      timeline: 'Pre-Phase 1 funding gate',
      provenance: {
        source: 'AI governance workshop outputs',
        owner: 'Policy and compliance team',
        lastUpdated: '2026-06-16',
        confidence: 'High',
      },
    },
    {
      id: 'gov-2',
      domain: 'Bias in prioritization logic',
      severity: 'High',
      description: 'Need-based funding heuristics may overweight digitally mature providers or undercount behavioral health referral complexity.',
      mitigation: 'Run equity review with alternate weighting scenarios and publish decision rationale alongside allocation recommendations.',
      owner: 'Health equity office',
      timeline: 'During RHIF scenario review',
      provenance: {
        source: 'Equity impact assessment draft',
        owner: 'Health equity office',
        lastUpdated: '2026-06-15',
        confidence: 'Moderate',
      },
    },
    {
      id: 'gov-3',
      domain: 'Operational misuse of prototype outputs',
      severity: 'Moderate',
      description: 'Phase 0 static findings could be interpreted as production-grade rankings if caveats are not surfaced clearly.',
      mitigation: 'Label all outputs as prototype decision support and require human review for any funding recommendation packet.',
      owner: 'Program management office',
      timeline: 'Immediate',
      provenance: {
        source: 'Prototype controls register',
        owner: 'PMO',
        lastUpdated: '2026-06-14',
        confidence: 'High',
      },
    },
  ] as GovernanceRisk[],
  auditTrail: {
    entries: [
      {
        artifact: 'Regional disparities chart',
        dataset: 'roots_regional_scores_v0_3.json',
        method: 'Composite scoring normalized to 100',
        steward: 'Regional assessment PMO',
        traceId: 'TRACE-ROOTS-118',
      },
      {
        artifact: 'Provider readiness drill-down',
        dataset: 'provider_profiles_phase0.json',
        method: 'Interview-coded and survey-weighted profile aggregation',
        steward: 'Field assessment lead',
        traceId: 'TRACE-PROV-204',
      },
      {
        artifact: 'Vendor evaluation matrix',
        dataset: 'vendor_scorecards_static.json',
        method: 'Weighted fit model with rural operations modifier',
        steward: 'Technical evaluation workgroup',
        traceId: 'TRACE-VEND-077',
      },
    ],
    disclaimers: [
      'All data in this prototype is static and local to the frontend for demonstration only.',
      'No live provider, claims, or beneficiary data is loaded in Phase 0 preview mode.',
      'Outputs support RHIF and Initiative 6 discussion; they do not determine funding automatically.',
    ],
    provenance: {
      source: 'Prototype audit manifest',
      owner: 'BrightWorks engineering',
      lastUpdated: '2026-06-19',
      confidence: 'High',
    },
  },
};

const safeArray = <T,>(value: T[] | undefined): T[] => (Array.isArray(value) ? value : []);
const safeText = (value: string | undefined, fallback = 'Unavailable in static dataset') => value?.trim() || fallback;
const formatPopulation = (value: number | undefined) => `${Number(value ?? 0).toLocaleString()} served`;

const severityColor = (severity: GovernanceRisk['severity']) => {
  if (severity === 'Critical') return palette.red;
  if (severity === 'High') return palette.coral;
  return palette.amber;
};

function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [selectedProviderId, setSelectedProviderId] = useState<string>(dashboardData.providers[0]?.id ?? '');
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem('nc-dhhs-theme') === 'light' ? 'light' : 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    window.localStorage.setItem('nc-dhhs-theme', theme);
  }, [theme]);

  const selectedProvider = useMemo(
    () => dashboardData.providers.find((provider) => provider.id === selectedProviderId) ?? dashboardData.providers[0],
    [selectedProviderId],
  );

  const providerComparison = useMemo(
    () =>
      dashboardData.providers.map((provider) => ({
        name: provider.name.split(' ')[0],
        readiness: provider.readinessScore,
        ehr: provider.ehrMaturity,
        referral: provider.referralDigitization,
      })),
    [],
  );

  const rootStyle: React.CSSProperties = {
    minHeight: '100vh',
    color: 'hsl(var(--foreground))',
    padding: '24px',
  };

  const shellStyle: React.CSSProperties = {
    maxWidth: '1480px',
    margin: '0 auto',
    display: 'grid',
    gap: '20px',
  };

  const cardStyle: React.CSSProperties = {
    background: 'color-mix(in srgb, hsl(var(--card)) 88%, transparent)',
    border: '1px solid hsl(var(--border))',
    borderRadius: '20px',
    boxShadow: theme === 'dark' ? '0 16px 38px rgba(2, 6, 23, 0.34)' : '0 16px 40px rgba(15, 23, 42, 0.08)',
    padding: '18px',
    backdropFilter: 'blur(12px)',
  };

  const provenanceBadge = (provenance: Provenance) => (
    <div
      style={{
        marginTop: '12px',
        padding: '10px 12px',
        borderRadius: '14px',
        border: '1px dashed hsl(var(--border))',
        background: theme === 'dark' ? 'rgba(15, 23, 42, 0.45)' : 'rgba(248, 250, 252, 0.9)',
        fontSize: '12px',
        lineHeight: 1.5,
      }}
    >
      <strong style={{ display: 'block', marginBottom: '4px' }}>Provenance</strong>
      <span>{safeText(provenance.source)}</span>
      <span style={{ display: 'block' }}>Owner: {safeText(provenance.owner)}</span>
      <span style={{ display: 'block' }}>Last updated: {safeText(provenance.lastUpdated)}</span>
      <span style={{ display: 'block' }}>Confidence: {safeText(provenance.confidence)}</span>
      {provenance.notes ? <span style={{ display: 'block' }}>Notes: {provenance.notes}</span> : null}
    </div>
  );

  const EmptyState = ({ title, detail }: { title: string; detail: string }) => (
    <div
      style={{
        ...cardStyle,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '160px',
        textAlign: 'center',
        color: 'hsl(var(--muted-foreground))',
      }}
    >
      <div>
        <AlertTriangle size={22} style={{ margin: '0 auto 10px', color: palette.amber }} />
        <div style={{ fontWeight: 700, color: 'hsl(var(--foreground))' }}>{title}</div>
        <div style={{ marginTop: '4px', maxWidth: '480px' }}>{detail}</div>
      </div>
    </div>
  );

  const renderOverview = () => {
    const overview = dashboardData.overview;
    const budgetData = safeArray(overview.budgetAllocation);

    return (
      <div style={{ display: 'grid', gap: '18px' }}>
        <div
          style={{
            ...cardStyle,
            padding: '24px',
            background:
              theme === 'dark'
                ? 'linear-gradient(135deg, rgba(28, 201, 168, 0.22), rgba(6, 182, 212, 0.14) 42%, rgba(15, 23, 42, 0.72) 100%)'
                : 'linear-gradient(135deg, rgba(28, 201, 168, 0.18), rgba(6, 182, 212, 0.10) 42%, rgba(255, 255, 255, 0.95) 100%)',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'space-between' }}>
            <div style={{ maxWidth: '880px' }}>
              <div style={{ display: 'inline-flex', gap: '8px', alignItems: 'center', padding: '6px 10px', borderRadius: '999px', border: '1px solid rgba(28, 201, 168, 0.35)', marginBottom: '14px', fontSize: '12px', fontWeight: 700 }}>
                <BrainCircuit size={14} /> Phase 0 prototype · static local JSON · executive decision support
              </div>
              <h1 style={{ margin: 0, fontSize: 'clamp(28px, 4vw, 42px)', lineHeight: 1.05 }}>{overview.title}</h1>
              <p style={{ margin: '12px 0 0', fontSize: '16px', lineHeight: 1.7, color: 'hsl(var(--muted-foreground))' }}>{overview.subtitle}</p>
            </div>
            <div style={{ minWidth: '260px', ...cardStyle, padding: '16px', alignSelf: 'stretch' }}>
              <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'hsl(var(--muted-foreground))' }}>
                Executive framing
              </div>
              <div style={{ marginTop: '8px', fontSize: '15px', lineHeight: 1.6 }}>
                Initiative 6 funding should be sequenced toward regions with the largest disparity burden and enough operational absorbency to convert RHIF dollars into measurable readiness gains.
              </div>
              {provenanceBadge(overview.provenance)}
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {safeArray(overview.summary).map((item) => (
            <div key={item.label} style={{ ...cardStyle, minHeight: '180px' }}>
              <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'hsl(var(--muted-foreground))' }}>{item.label}</div>
              <div style={{ marginTop: '10px', fontSize: '34px', fontWeight: 800 }}>{item.value}</div>
              <div style={{ marginTop: '10px', lineHeight: 1.6, color: 'hsl(var(--muted-foreground))' }}>{item.detail}</div>
              {provenanceBadge(item.provenance)}
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.3fr) minmax(320px, 0.9fr)', gap: '16px' }}>
          <div style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <Scale size={18} color={palette.teal} />
              <h2 style={{ margin: 0, fontSize: '18px' }}>Executive assessment summary</h2>
            </div>
            <div style={{ display: 'grid', gap: '12px' }}>
              {safeArray(overview.callouts).map((callout, index) => (
                <div key={index} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '12px', borderRadius: '14px', background: theme === 'dark' ? 'rgba(30, 41, 59, 0.55)' : 'rgba(241, 245, 249, 0.92)' }}>
                  <ChevronRight size={18} color={palette.cyan} style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div style={{ lineHeight: 1.7 }}>{callout}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <DollarSign size={18} color={palette.amber} />
              <h2 style={{ margin: 0, fontSize: '18px' }}>Initiative 6 budget posture</h2>
            </div>
            {budgetData.length ? (
              <div style={{ width: '100%', height: '320px' }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={budgetData} dataKey="amount" nameKey="name" outerRadius={96} innerRadius={50} paddingAngle={3}>
                      {budgetData.map((entry, index) => (
                        <Cell key={entry.name} fill={[palette.teal, palette.cyan, palette.amber, palette.coral, palette.navy, palette.slate][index % 6]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => [`$${Number(value).toFixed(1)}M`, 'Budget']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <EmptyState title="Budget allocation unavailable" detail="The static Phase 0 prototype does not currently include Initiative 6 allocation slices." />
            )}
            {provenanceBadge(overview.provenance)}
          </div>
        </div>
      </div>
    );
  };

  const renderRegional = () => {
    const regional = dashboardData.regionalDisparities;
    const regions = safeArray(regional.regions);
    const rhifPriority = safeArray(regional.rhifPriority);

    return (
      <div style={{ display: 'grid', gap: '16px' }}>
        <div style={{ ...cardStyle, display: 'grid', gap: '8px' }}>
          <h2 style={{ margin: 0, fontSize: '22px' }}>{regional.chartTitle}</h2>
          <div style={{ color: 'hsl(var(--muted-foreground))', lineHeight: 1.6 }}>{regional.chartSubtitle}</div>
          {provenanceBadge(regional.provenance)}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.3fr) minmax(320px, 0.9fr)', gap: '16px' }}>
          <div style={cardStyle}>
            <div style={{ fontWeight: 700, marginBottom: '12px' }}>Regional readiness comparison</div>
            {regions.length ? (
              <div style={{ width: '100%', height: '380px' }}>
                <ResponsiveContainer>
                  <BarChart data={regions} margin={{ top: 10, right: 12, left: 0, bottom: 44 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.24)" />
                    <XAxis dataKey="region" angle={-18} textAnchor="end" interval={0} height={70} stroke={palette.slate} />
                    <YAxis stroke={palette.slate} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="readiness" fill={palette.teal} radius={[6, 6, 0, 0]} />
                    <Bar dataKey="workforce" fill={palette.cyan} radius={[6, 6, 0, 0]} />
                    <Bar dataKey="infrastructure" fill={palette.navy} radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <EmptyState title="Regional disparity data missing" detail="Add static regional readiness records to display the ROOTS Hub comparison chart." />
            )}
          </div>

          <div style={cardStyle}>
            <div style={{ fontWeight: 700, marginBottom: '12px' }}>RHIF decision-support lens</div>
            {rhifPriority.length ? (
              <div style={{ width: '100%', height: '380px' }}>
                <ResponsiveContainer>
                  <RadarChart data={rhifPriority} outerRadius={110}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="region" tick={{ fill: palette.slate, fontSize: 11 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: palette.slate, fontSize: 10 }} />
                    <Radar name="Disparity Index" dataKey="disparityIndex" stroke={palette.coral} fill={palette.coral} fillOpacity={0.25} />
                    <Radar name="Absorbency" dataKey="absorbency" stroke={palette.teal} fill={palette.teal} fillOpacity={0.18} />
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <EmptyState title="RHIF prioritization view unavailable" detail="No static disparity-versus-absorbency records were found for this prototype." />
            )}
            <div style={{ marginTop: '8px', color: 'hsl(var(--muted-foreground))', lineHeight: 1.6 }}>
              Regions with both high disparity and moderate absorbency are strongest candidates for near-term RHIF support because they pair need with plausible execution capacity.
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderProviders = () => {
    const providers = safeArray(dashboardData.providers);

    if (!providers.length) {
      return <EmptyState title="No provider detail loaded" detail="Provider readiness drill-down requires static provider profiles in the local JSON block." />;
    }

    const detailMetrics = selectedProvider
      ? [
          { label: 'Readiness', value: selectedProvider.readinessScore },
          { label: 'EHR Maturity', value: selectedProvider.ehrMaturity },
          { label: 'Referral Digitization', value: selectedProvider.referralDigitization },
        ]
      : [];

    return (
      <div style={{ display: 'grid', gridTemplateColumns: '340px minmax(0, 1fr)', gap: '16px' }}>
        <aside style={{ ...cardStyle, padding: '14px', alignSelf: 'start' }}>
          <div style={{ fontWeight: 700, marginBottom: '12px' }}>Provider cohort</div>
          <div style={{ display: 'grid', gap: '10px' }}>
            {providers.map((provider) => {
              const selected = provider.id === selectedProvider?.id;
              return (
                <button
                  key={provider.id}
                  type="button"
                  onClick={() => setSelectedProviderId(provider.id)}
                  aria-pressed={selected}
                  style={{
                    textAlign: 'left',
                    borderRadius: '16px',
                    border: selected ? `1px solid ${palette.teal}` : '1px solid hsl(var(--border))',
                    background: selected
                      ? theme === 'dark'
                        ? 'rgba(28, 201, 168, 0.18)'
                        : 'rgba(28, 201, 168, 0.12)'
                      : theme === 'dark'
                        ? 'rgba(15, 23, 42, 0.55)'
                        : 'rgba(255, 255, 255, 0.78)',
                    color: 'inherit',
                    padding: '14px',
                    cursor: 'pointer',
                    transition: 'all 180ms ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                    <div>
                      <div style={{ fontWeight: 700 }}>{provider.name}</div>
                      <div style={{ marginTop: '4px', fontSize: '13px', color: 'hsl(var(--muted-foreground))' }}>{provider.region}</div>
                    </div>
                    <div style={{ fontWeight: 800, color: selected ? palette.teal : 'inherit' }}>{provider.readinessScore}</div>
                  </div>
                  <div style={{ marginTop: '8px', fontSize: '13px', color: 'hsl(var(--muted-foreground))' }}>{provider.type}</div>
                </button>
              );
            })}
          </div>
        </aside>

        <div style={{ display: 'grid', gap: '16px' }}>
          {selectedProvider ? (
            <>
              <div style={{ ...cardStyle, padding: '20px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '16px' }}>
                  <div>
                    <h2 style={{ margin: 0, fontSize: '24px' }}>{selectedProvider.name}</h2>
                    <div style={{ marginTop: '8px', color: 'hsl(var(--muted-foreground))' }}>
                      {selectedProvider.type} · {selectedProvider.region} · {formatPopulation(selectedProvider.populationServed)}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {[
                      `Connectivity: ${selectedProvider.connectivity}`,
                      `Workforce gap: ${selectedProvider.workforceGap}`,
                      `AI policy: ${safeText(selectedProvider.aiPolicyStatus)}`,
                    ].map((pill) => (
                      <div key={pill} style={{ padding: '8px 12px', borderRadius: '999px', background: theme === 'dark' ? 'rgba(30,41,59,0.7)' : 'rgba(241,245,249,0.95)', border: '1px solid hsl(var(--border))', fontSize: '13px' }}>
                        {pill}
                      </div>
                    ))}
                  </div>
                </div>
                {provenanceBadge(selectedProvider.provenance)}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(320px, 0.8fr)', gap: '16px' }}>
                <div style={cardStyle}>
                  <div style={{ fontWeight: 700, marginBottom: '10px' }}>Selected provider detail</div>
                  <div style={{ width: '100%', height: '300px' }}>
                    <ResponsiveContainer>
                      <BarChart data={detailMetrics} layout="vertical" margin={{ left: 20, right: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.24)" />
                        <XAxis type="number" domain={[0, 100]} stroke={palette.slate} />
                        <YAxis type="category" dataKey="label" stroke={palette.slate} width={110} />
                        <Tooltip />
                        <Bar dataKey="value" fill={palette.teal} radius={[0, 6, 6, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div style={cardStyle}>
                  <div style={{ fontWeight: 700, marginBottom: '10px' }}>Peer comparison snapshot</div>
                  <div style={{ width: '100%', height: '300px' }}>
                    <ResponsiveContainer>
                      <LineChart data={providerComparison}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.24)" />
                        <XAxis dataKey="name" stroke={palette.slate} />
                        <YAxis stroke={palette.slate} domain={[0, 100]} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="readiness" stroke={palette.teal} strokeWidth={2.5} />
                        <Line type="monotone" dataKey="ehr" stroke={palette.cyan} strokeWidth={2.5} />
                        <Line type="monotone" dataKey="referral" stroke={palette.coral} strokeWidth={2.5} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={cardStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <AlertTriangle size={18} color={palette.coral} />
                    <div style={{ fontWeight: 700 }}>Primary blockers</div>
                  </div>
                  {safeArray(selectedProvider.blockers).length ? (
                    <ul style={{ margin: 0, paddingLeft: '18px', lineHeight: 1.8 }}>
                      {safeArray(selectedProvider.blockers).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <div style={{ color: 'hsl(var(--muted-foreground))' }}>No blockers were documented in the current static profile.</div>
                  )}
                </div>
                <div style={cardStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <BadgeCheck size={18} color={palette.teal} />
                    <div style={{ fontWeight: 700 }}>Phase 1 opportunities</div>
                  </div>
                  {safeArray(selectedProvider.opportunities).length ? (
                    <ul style={{ margin: 0, paddingLeft: '18px', lineHeight: 1.8 }}>
                      {safeArray(selectedProvider.opportunities).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <div style={{ color: 'hsl(var(--muted-foreground))' }}>Opportunity recommendations are not available for this provider.</div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <EmptyState title="Provider selection unavailable" detail="Select a provider from the cohort list to see readiness drill-down details." />
          )}
        </div>
      </div>
    );
  };

  const renderVendors = () => {
    const vendors = safeArray(dashboardData.vendors);

    return (
      <div style={{ display: 'grid', gap: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.1fr) minmax(320px, 0.9fr)', gap: '16px' }}>
          <div style={cardStyle}>
            <div style={{ fontWeight: 700, marginBottom: '12px' }}>Comparative vendor fit</div>
            {vendors.length ? (
              <div style={{ width: '100%', height: '360px' }}>
                <ResponsiveContainer>
                  <BarChart data={vendors} margin={{ top: 10, right: 20, left: 0, bottom: 56 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.24)" />
                    <XAxis dataKey="name" angle={-18} textAnchor="end" interval={0} height={76} stroke={palette.slate} />
                    <YAxis domain={[0, 100]} stroke={palette.slate} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="fitScore" fill={palette.teal} radius={[6, 6, 0, 0]} />
                    <Bar dataKey="ruralFit" fill={palette.cyan} radius={[6, 6, 0, 0]} />
                    <Bar dataKey="interoperability" fill={palette.navy} radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <EmptyState title="Vendor scorecards missing" detail="Add static vendor comparison records to render the evaluation chart." />
            )}
          </div>
          <div style={cardStyle}>
            <div style={{ fontWeight: 700, marginBottom: '10px' }}>Procurement posture</div>
            <div style={{ lineHeight: 1.7, color: 'hsl(var(--muted-foreground))' }}>
              Phase 0 findings suggest NC DHHS should avoid selecting the most feature-complete platform solely on enterprise breadth. For Initiative 6, the stronger fit is the option that reduces implementation friction for rural providers while still enabling auditable exchange and governance controls.
            </div>
            {vendors[0] ? provenanceBadge(vendors[0].provenance) : null}
          </div>
        </div>

        <div style={{ display: 'grid', gap: '14px' }}>
          {vendors.map((vendor) => (
            <div key={vendor.name} style={{ ...cardStyle, padding: '18px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '14px' }}>
                <div>
                  <div style={{ fontSize: '20px', fontWeight: 700 }}>{vendor.name}</div>
                  <div style={{ marginTop: '4px', color: 'hsl(var(--muted-foreground))' }}>{vendor.category}</div>
                </div>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {[
                    `Fit ${vendor.fitScore}`,
                    `Cost ${vendor.totalCost}`,
                    `Risk ${vendor.implementationRisk}`,
                  ].map((pill) => (
                    <div key={pill} style={{ padding: '8px 12px', borderRadius: '999px', border: '1px solid hsl(var(--border))', background: theme === 'dark' ? 'rgba(30,41,59,0.64)' : 'rgba(248,250,252,0.96)', fontSize: '13px' }}>
                      {pill}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '14px' }}>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: '8px' }}>Strengths</div>
                  {safeArray(vendor.strengths).length ? (
                    <ul style={{ margin: 0, paddingLeft: '18px', lineHeight: 1.8 }}>
                      {safeArray(vendor.strengths).map((strength) => (
                        <li key={strength}>{strength}</li>
                      ))}
                    </ul>
                  ) : (
                    <div style={{ color: 'hsl(var(--muted-foreground))' }}>Strength detail unavailable.</div>
                  )}
                </div>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: '8px' }}>Gaps / cautions</div>
                  {safeArray(vendor.gaps).length ? (
                    <ul style={{ margin: 0, paddingLeft: '18px', lineHeight: 1.8 }}>
                      {safeArray(vendor.gaps).map((gap) => (
                        <li key={gap}>{gap}</li>
                      ))}
                    </ul>
                  ) : (
                    <div style={{ color: 'hsl(var(--muted-foreground))' }}>Gap detail unavailable.</div>
                  )}
                </div>
              </div>
              {provenanceBadge(vendor.provenance)}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderGovernance = () => {
    const risks = safeArray(dashboardData.governanceRisks);

    return (
      <div style={{ display: 'grid', gap: '16px' }}>
        <div style={{ ...cardStyle, display: 'grid', gap: '8px' }}>
          <h2 style={{ margin: 0, fontSize: '22px' }}>AI governance and operational risk register</h2>
          <div style={{ color: 'hsl(var(--muted-foreground))', lineHeight: 1.7 }}>
            Governance findings focus on traceability, equitable prioritization, and preventing prototype outputs from being treated as unsupervised production recommendations.
          </div>
        </div>

        {risks.length ? (
          <div style={{ display: 'grid', gap: '14px' }}>
            {risks.map((risk) => (
              <div key={risk.id} style={{ ...cardStyle, borderLeft: `5px solid ${severityColor(risk.severity)}` }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '12px' }}>
                  <div>
                    <div style={{ fontSize: '18px', fontWeight: 700 }}>{risk.domain}</div>
                    <div style={{ marginTop: '6px', color: 'hsl(var(--muted-foreground))' }}>{risk.description}</div>
                  </div>
                  <div style={{ padding: '8px 12px', borderRadius: '999px', background: 'rgba(248,113,113,0.12)', color: severityColor(risk.severity), fontWeight: 700, alignSelf: 'flex-start' }}>
                    {risk.severity}
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '16px', marginTop: '14px' }}>
                  <div>
                    <div style={{ fontWeight: 700, marginBottom: '6px' }}>Mitigation</div>
                    <div style={{ lineHeight: 1.7 }}>{risk.mitigation}</div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, marginBottom: '6px' }}>Accountability</div>
                    <div style={{ lineHeight: 1.7 }}>
                      <div>Owner: {risk.owner}</div>
                      <div>Timeline: {risk.timeline}</div>
                    </div>
                  </div>
                </div>
                {provenanceBadge(risk.provenance)}
              </div>
            ))}
          </div>
        ) : (
          <EmptyState title="Risk register unavailable" detail="No governance records were found in the static JSON payload." />
        )}
      </div>
    );
  };

  const renderAudit = () => {
    const audit = dashboardData.auditTrail;
    const entries = safeArray(audit.entries);

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.1fr) minmax(320px, 0.9fr)', gap: '16px' }}>
        <div style={cardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <FileCheck2 size={18} color={palette.teal} />
            <div style={{ fontWeight: 700 }}>Traceability manifest</div>
          </div>
          {entries.length ? (
            <div style={{ display: 'grid', gap: '12px' }}>
              {entries.map((entry) => (
                <div key={entry.traceId} style={{ border: '1px solid hsl(var(--border))', borderRadius: '16px', padding: '14px', background: theme === 'dark' ? 'rgba(15,23,42,0.48)' : 'rgba(248,250,252,0.92)' }}>
                  <div style={{ fontWeight: 700 }}>{entry.artifact}</div>
                  <div style={{ marginTop: '8px', lineHeight: 1.7, color: 'hsl(var(--muted-foreground))' }}>
                    <div>Dataset: {entry.dataset}</div>
                    <div>Method: {entry.method}</div>
                    <div>Steward: {entry.steward}</div>
                    <div>Trace ID: {entry.traceId}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState title="Audit manifest empty" detail="Populate static provenance entries to support traceability review." />
          )}
          {provenanceBadge(audit.provenance)}
        </div>

        <div style={{ display: 'grid', gap: '16px' }}>
          <div style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <Database size={18} color={palette.cyan} />
              <div style={{ fontWeight: 700 }}>Prototype guardrails</div>
            </div>
            <div style={{ display: 'grid', gap: '10px' }}>
              {safeArray(audit.disclaimers).map((item) => (
                <div key={item} style={{ padding: '12px', borderRadius: '14px', border: '1px solid hsl(var(--border))', background: theme === 'dark' ? 'rgba(30,41,59,0.62)' : 'rgba(255,255,255,0.82)' }}>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div style={cardStyle}>
            <div style={{ fontWeight: 700, marginBottom: '8px' }}>Phase 0 implementation note</div>
            <div style={{ color: 'hsl(var(--muted-foreground))', lineHeight: 1.7 }}>
              This prototype intentionally keeps all inputs static and local to a single React dashboard artifact. Future production architecture can externalize scoring logic, add governed data pipelines, and implement role-based review workflows without changing the narrative structure validated here.
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'regional':
        return renderRegional();
      case 'providers':
        return renderProviders();
      case 'vendors':
        return renderVendors();
      case 'governance':
        return renderGovernance();
      case 'audit':
        return renderAudit();
      default:
        return <EmptyState title="Tab unavailable" detail="This tab could not be rendered from the static prototype state." />;
    }
  };

  return (
    <main style={rootStyle}>
      <div style={shellStyle}>
        <header style={{ ...cardStyle, padding: '18px 20px' }}>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'hsl(var(--muted-foreground))', marginBottom: '8px' }}>
                <BadgeCheck size={15} color={palette.teal} /> NC DHHS · Initiative 6 · RHIF scenario support
              </div>
              <div style={{ fontSize: '28px', fontWeight: 800, lineHeight: 1.1 }}>Rural Provider Readiness Executive Dashboard</div>
            </div>
            <button
              type="button"
              onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
              aria-label="Toggle dark and light mode"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                border: '1px solid hsl(var(--border))',
                borderRadius: '999px',
                padding: '10px 14px',
                cursor: 'pointer',
                background: theme === 'dark' ? 'rgba(30, 41, 59, 0.86)' : 'rgba(255,255,255,0.88)',
                color: 'inherit',
              }}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              {theme === 'dark' ? 'Light mode' : 'Dark mode'}
            </button>
          </div>
        </header>

        <nav style={{ ...cardStyle, padding: '12px' }} aria-label="Dashboard sections">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {tabs.map((tab) => {
              const selected = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  aria-pressed={selected}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    borderRadius: '999px',
                    border: selected ? `1px solid ${palette.teal}` : '1px solid hsl(var(--border))',
                    background: selected
                      ? theme === 'dark'
                        ? 'linear-gradient(135deg, rgba(28, 201, 168, 0.18), rgba(6, 182, 212, 0.16))'
                        : 'linear-gradient(135deg, rgba(28, 201, 168, 0.14), rgba(6, 182, 212, 0.10))'
                      : 'transparent',
                    color: selected ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))',
                    padding: '10px 14px',
                    fontWeight: selected ? 700 : 600,
                    cursor: 'pointer',
                    transition: 'all 180ms ease',
                  }}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        <section aria-live="polite">{renderTabContent()}</section>
      </div>
    </main>
  );
}

export default App;
