export type ThemeMode = 'dark' | 'light';

export type TabKey = 'overview' | 'providers' | 'vendors' | 'governance' | 'audit';

export type Provenance = {
  source: string;
  owner: string;
  lastUpdated: string;
  confidence: string;
  notes?: string;
};

export type Provider = {
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

export type Vendor = {
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

export type GovernanceRisk = {
  id: string;
  domain: string;
  severity: 'Critical' | 'High' | 'Moderate';
  description: string;
  mitigation: string;
  owner: string;
  timeline: string;
  provenance: Provenance;
};
