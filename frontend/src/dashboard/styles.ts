import type React from 'react';
import { surfaces } from './theme';
import type { ThemeMode } from './types';

export const rootStyle: React.CSSProperties = {
  minHeight: '100vh',
  color: 'hsl(var(--foreground))',
  padding: '24px',
};

export const shellStyle: React.CSSProperties = {
  maxWidth: '1480px',
  margin: '0 auto',
  display: 'grid',
  gap: '20px',
};

export const createCardStyle = (theme: ThemeMode): React.CSSProperties => ({
  background: 'color-mix(in srgb, hsl(var(--card)) 88%, transparent)',
  border: '1px solid hsl(var(--border))',
  borderRadius: '20px',
  boxShadow: surfaces.cardShadow(theme),
  padding: '18px',
  backdropFilter: 'blur(12px)',
});
