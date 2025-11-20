import Spline from '@splinetool/react-spline';
import { Bell, PiggyBank, Wallet, CreditCard } from 'lucide-react';

export default function Hero({ metrics = {}, onAdd }) {
  const { net_worth = 0, cash_on_hand = 0, total_debt = 0, cash_flow = 0 } = metrics;
  const flowPositive = cash_flow >= 0;
  return (
    <div className="relative h-[360px] rounded-3xl overflow-hidden bg-slate-900/40 border border-white/10">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 via-slate-900/40 to-slate-900/80 pointer-events-none" />
      <div className="relative z-10 p-6 sm:p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold">Unified Finance Overview</h1>
            <p className="text-slate-300">Daily, Weekly, Monthly, and Yearly awareness at a glance</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={onAdd} className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition text-white backdrop-blur border border-white/20">+ Add</button>
            <div className="relative">
              <Bell className="w-5 h-5 text-white/80" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full" />
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
          <MetricCard icon={<Wallet className="w-5 h-5" />} label="Net Worth" value={net_worth} color="purple" />
          <MetricCard icon={<PiggyBank className="w-5 h-5" />} label="Cash on Hand" value={cash_on_hand} color="blue" />
          <MetricCard icon={<CreditCard className="w-5 h-5" />} label="Total Debt" value={total_debt} color="red" />
          <MetricCard icon={<Wallet className="w-5 h-5" />} label="This Month Cash Flow" value={cash_flow} color={flowPositive ? 'green' : 'red'} prefix={flowPositive ? '+' : '-'} />
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon, label, value, color = 'green', prefix = '' }) {
  const colorMap = {
    green: 'from-emerald-500/20 to-emerald-500/10 text-emerald-300',
    orange: 'from-amber-500/20 to-amber-500/10 text-amber-300',
    blue: 'from-blue-500/20 to-blue-500/10 text-blue-300',
    red: 'from-rose-500/20 to-rose-500/10 text-rose-300',
    purple: 'from-violet-500/20 to-violet-500/10 text-violet-300',
  };
  return (
    <div className={`rounded-2xl p-4 bg-gradient-to-br ${colorMap[color]} border border-white/10 backdrop-blur`}> 
      <div className="flex items-center gap-2 opacity-80">{icon}<span className="text-sm">{label}</span></div>
      <div className="mt-1 text-2xl font-semibold">{prefix}${Number(value || 0).toLocaleString()}</div>
    </div>
  );
}
