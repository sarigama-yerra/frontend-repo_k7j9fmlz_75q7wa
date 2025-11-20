import { useMemo } from 'react';

export function DonutChart({ data = {}, colors = {} }) {
  const entries = Object.entries(data || {}).filter(([, v]) => typeof v === 'number' && v > 0);
  const total = entries.reduce((s, [, v]) => s + v, 0);

  const arcs = useMemo(() => {
    if (!total || entries.length === 0) return [];
    let acc = 0;
    return entries.map(([k, v]) => {
      const start = acc / total;
      const end = (acc + v) / total;
      acc += v;
      return { key: k, start, end, value: v, color: colors[k] || colors.default || '#10B981' };
    });
  }, [entries, colors, total]);

  function arcPath(start, end, r = 30) {
    const a0 = 2 * Math.PI * start;
    const a1 = 2 * Math.PI * end;
    const p0 = { x: 40 + r * Math.cos(a0), y: 40 + r * Math.sin(a0) };
    const p1 = { x: 40 + r * Math.cos(a1), y: 40 + r * Math.sin(a1) };
    const large = end - start > 0.5 ? 1 : 0;
    return `M ${p0.x} ${p0.y} A ${r} ${r} 0 ${large} 1 ${p1.x} ${p1.y}`;
  }

  return (
    <div className="relative">
      <svg viewBox="0 0 80 80" className="w-40 h-40">
        <circle cx="40" cy="40" r="24" fill="none" stroke="rgba(148,163,184,0.2)" strokeWidth="12" />
        {arcs.map(a => (
          <path key={a.key} d={arcPath(a.start, a.end, 24)} stroke={a.color} strokeWidth="12" fill="none" strokeLinecap="round" />
        ))}
        <circle cx="40" cy="40" r="16" fill="transparent" />
      </svg>
      {(!total || entries.length === 0) && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs text-slate-400">No data</span>
        </div>
      )}
    </div>
  );
}

export function BarChart({ series = [], categories = [], color = '#3B82F6' }) {
  const clean = Array.isArray(series) ? series.map(v => (typeof v === 'number' && isFinite(v) ? v : 0)) : [];
  const max = Math.max(1, ...clean);
  return (
    <div className="w-full h-40 flex items-end gap-2">
      {clean.map((v, i) => (
        <div key={i} className="flex-1 rounded-t overflow-hidden" style={{ height: `${(v / max) * 100}%`, background: `linear-gradient(180deg, ${color}55, ${color}22)` }}>
          <div className="text-[10px] text-center text-slate-400 mt-1">{categories[i]}</div>
        </div>
      ))}
    </div>
  );
}

export function Progress({ value = 0, max = 100, color = '#3B82F6' }) {
  const safeMax = Math.max(1, Number(max) || 1);
  const safeVal = Math.max(0, Number(value) || 0);
  const pct = Math.min(100, Math.round((safeVal / safeMax) * 100));
  return (
    <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
      <div className="h-2" style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}
