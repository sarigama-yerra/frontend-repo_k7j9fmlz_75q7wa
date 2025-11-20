import { useState } from 'react';

export default function TimeframeTabs({ value = 'monthly', onChange }) {
  const tabs = ['daily', 'weekly', 'monthly', 'yearly'];
  return (
    <div className="inline-flex bg-slate-900/60 border border-white/10 rounded-full p-1">
      {tabs.map((t) => (
        <button key={t} onClick={() => onChange(t)} className={`px-3 sm:px-4 py-1.5 rounded-full capitalize text-sm transition ${value === t ? 'bg-white/10 text-white' : 'text-slate-300 hover:text-white'}`}>
          {t}
        </button>
      ))}
    </div>
  );
}
