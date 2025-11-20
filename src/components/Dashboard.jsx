import { useEffect, useState } from 'react';
import { api } from '../utils/api';
import Hero from './Hero';
import TimeframeTabs from './TimeframeTabs';
import Quadrants from './Quadrants';

export default function Dashboard() {
  const [timeframe, setTimeframe] = useState('monthly');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async (tf = timeframe) => {
    try {
      setLoading(true); setError('');
      const res = await api.summary(tf);
      setData(res);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load('monthly'); }, []);

  return (
    <div className="space-y-6">
      <Hero metrics={data?.metrics || {}} onAdd={() => window.dispatchEvent(new CustomEvent('open-quick-add'))} />

      <div className="flex items-center justify-between">
        <div className="text-slate-200 text-lg font-medium">At-a-Glance</div>
        <TimeframeTabs value={timeframe} onChange={(t) => { setTimeframe(t); load(t); }} />
      </div>

      {error && <div className="text-rose-400 text-sm">{error}</div>}

      {loading ? (
        <div className="text-slate-400">Loading...</div>
      ) : (
        <Quadrants data={data} />
      )}
    </div>
  );
}
