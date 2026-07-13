import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { ResponsiveContainer } from 'recharts';
import { palette, surfaces } from './theme';
import { safeArray, safeText } from './utils';
import type { Provenance, ThemeMode } from './types';

export function ProvenanceBadge({ provenance, theme }: { provenance: Provenance; theme: ThemeMode }) {
  return (
    <div
      style={{
        marginTop: '12px',
        padding: '10px 12px',
        borderRadius: '14px',
        border: '1px dashed hsl(var(--border))',
        background: surfaces.provenance(theme),
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
}

export function EmptyState({
  title,
  detail,
  cardStyle,
}: {
  title: string;
  detail: string;
  cardStyle: React.CSSProperties;
}) {
  return (
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
}

export function SectionHeading({
  icon,
  title,
  headingLevel = 'div',
  fontSize = 18,
  gap = 10,
  marginBottom = 12,
}: {
  icon?: React.ReactNode;
  title: string;
  headingLevel?: 'h2' | 'div';
  fontSize?: number;
  gap?: number;
  marginBottom?: number;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: `${gap}px`, marginBottom: `${marginBottom}px` }}>
      {icon}
      {headingLevel === 'h2' ? (
        <h2 style={{ margin: 0, fontSize: `${fontSize}px` }}>{title}</h2>
      ) : (
        <div style={{ fontWeight: 700 }}>{title}</div>
      )}
    </div>
  );
}

export function PillGroup({ pills, theme }: { pills: string[]; theme: ThemeMode }) {
  return (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      {pills.map((pill) => (
        <div
          key={pill}
          style={{
            padding: '8px 12px',
            borderRadius: '999px',
            border: '1px solid hsl(var(--border))',
            background: surfaces.pill(theme),
            fontSize: '13px',
          }}
        >
          {pill}
        </div>
      ))}
    </div>
  );
}

export function BulletList({ items, fallback }: { items: string[] | undefined; fallback: string }) {
  const list = safeArray(items);
  if (!list.length) {
    return <div style={{ color: 'hsl(var(--muted-foreground))' }}>{fallback}</div>;
  }
  return (
    <ul style={{ margin: 0, paddingLeft: '18px', lineHeight: 1.8 }}>
      {list.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function ChartFrame({ height, children }: { height: number; children: React.ReactElement }) {
  return (
    <div style={{ width: '100%', height: `${height}px` }}>
      <ResponsiveContainer>{children}</ResponsiveContainer>
    </div>
  );
}
