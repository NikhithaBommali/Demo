import type { ThemeMode } from './types';

export const palette = {
  teal: '#1CC9A8',
  cyan: '#06B6D4',
  navy: '#12344D',
  amber: '#F59E0B',
  coral: '#F97316',
  red: '#DC2626',
  slate: '#64748B',
};

export const chartColors = [
  palette.teal,
  palette.cyan,
  palette.amber,
  palette.coral,
  palette.navy,
  palette.slate,
];

export const chartGridStroke = 'rgba(148,163,184,0.24)';

const pick = (theme: ThemeMode, dark: string, light: string) => (theme === 'dark' ? dark : light);

/** Theme-aware surface backgrounds reused across dashboard cards and chips. */
export const surfaces = {
  cardShadow: (theme: ThemeMode) =>
    pick(theme, '0 16px 38px rgba(2, 6, 23, 0.34)', '0 16px 40px rgba(15, 23, 42, 0.08)'),
  provenance: (theme: ThemeMode) => pick(theme, 'rgba(15, 23, 42, 0.45)', 'rgba(248, 250, 252, 0.9)'),
  callout: (theme: ThemeMode) => pick(theme, 'rgba(30, 41, 59, 0.55)', 'rgba(241, 245, 249, 0.92)'),
  pill: (theme: ThemeMode) => pick(theme, 'rgba(30, 41, 59, 0.7)', 'rgba(241, 245, 249, 0.95)'),
  auditEntry: (theme: ThemeMode) => pick(theme, 'rgba(15, 23, 42, 0.48)', 'rgba(248, 250, 252, 0.92)'),
  disclaimer: (theme: ThemeMode) => pick(theme, 'rgba(30, 41, 59, 0.62)', 'rgba(255, 255, 255, 0.82)'),
  toggle: (theme: ThemeMode) => pick(theme, 'rgba(30, 41, 59, 0.86)', 'rgba(255, 255, 255, 0.88)'),
  providerActive: (theme: ThemeMode) =>
    pick(theme, 'rgba(28, 201, 168, 0.18)', 'rgba(28, 201, 168, 0.12)'),
  providerIdle: (theme: ThemeMode) => pick(theme, 'rgba(15, 23, 42, 0.55)', 'rgba(255, 255, 255, 0.78)'),
  heroGradient: (theme: ThemeMode) =>
    pick(
      theme,
      'linear-gradient(135deg, rgba(28, 201, 168, 0.22), rgba(6, 182, 212, 0.14) 42%, rgba(15, 23, 42, 0.72) 100%)',
      'linear-gradient(135deg, rgba(28, 201, 168, 0.18), rgba(6, 182, 212, 0.10) 42%, rgba(255, 255, 255, 0.95) 100%)',
    ),
  navActive: (theme: ThemeMode) =>
    pick(
      theme,
      'linear-gradient(135deg, rgba(28, 201, 168, 0.18), rgba(6, 182, 212, 0.16))',
      'linear-gradient(135deg, rgba(28, 201, 168, 0.14), rgba(6, 182, 212, 0.10))',
    ),
};
