import { palette } from './theme';
import type { GovernanceRisk } from './types';

export const safeArray = <T,>(value: T[] | undefined): T[] => (Array.isArray(value) ? value : []);

export const safeText = (value: string | undefined, fallback = 'Unavailable in static dataset') =>
  value?.trim() || fallback;

export const formatPopulation = (value: number | undefined) =>
  `${Number(value ?? 0).toLocaleString()} served`;

export const severityColor = (severity: GovernanceRisk['severity']) => {
  if (severity === 'Critical') return palette.red;
  if (severity === 'High') return palette.coral;
  return palette.amber;
};
