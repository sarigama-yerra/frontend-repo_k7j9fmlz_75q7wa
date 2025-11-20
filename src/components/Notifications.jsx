import { useEffect, useState } from 'react';
import { api } from '../utils/api';
import { BellDot } from 'lucide-react';

export default function Notifications() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.notifications().then(setItems).catch(() => setItems([]));
  }, []);

  if (!items.length) return null;

  return (
    <div className="rounded-2xl bg-slate-900/60 border border-white/10 p-4">
      <div className="flex items-center gap-2 text-slate-100 font-semibold">
        <BellDot className="w-4 h-4" /> Alerts
      </div>
      <div className="mt-3 space-y-2">
        {items.map((n, i) => (
          <div key={i} className="text-sm text-slate-300">• {n.message}</div>
        ))}
      </div>
    </div>
  );
}
