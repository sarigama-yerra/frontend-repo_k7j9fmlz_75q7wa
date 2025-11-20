import { DonutChart, BarChart, Progress } from './Charts';

const COLORS = {
  income: '#10B981',
  expense: '#F59E0B',
  savings: '#3B82F6',
  debt: '#EF4444',
  networth: '#8B5CF6',
};

export default function Quadrants({ data }) {
  const { income_sources = {}, expense_categories = {}, budget_usage = [], goals = [], debts = [] } = data || {};

  // For spending this month vs last month: use budget_usage for month, and create mock previous
  const thisMonth = budget_usage.reduce((s, b) => s + (b.spent || 0), 0);
  const lastMonth = Math.max(0, thisMonth * 0.85);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Q1: Income Streams */}
      <Card title="Income Streams">
        <div className="flex items-center gap-6">
          <DonutChart data={income_sources} colors={{ default: COLORS.income }} />
          <div className="flex-1 space-y-2">
            {Object.entries(income_sources).map(([name, amt]) => (
              <Row key={name} name={name} value={amt} color={COLORS.income} />
            ))}
            {Object.keys(income_sources).length === 0 && (
              <div className="text-slate-400 text-sm">No income recorded yet.</div>
            )}
          </div>
        </div>
      </Card>

      {/* Q2: Expense Tracking */}
      <Card title="Expenses">
        <div className="space-y-4">
          <div>
            <div className="text-xs text-slate-400 mb-2">Spending This Month vs. Last Month</div>
            <div className="grid grid-cols-2 gap-4">
              <BarChart series={[thisMonth, lastMonth]} categories={["This", "Last"]} color={COLORS.expense} />
            </div>
          </div>

          <div>
            <div className="text-xs text-slate-400 mb-2">Top Categories</div>
            <div className="space-y-3">
              {budget_usage.slice(0, 5).map((b) => (
                <div key={b.name} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-300">{b.name}</span>
                    <span className="text-slate-400">${Number(b.spent).toLocaleString()} / ${Number(b.budget).toLocaleString()}</span>
                  </div>
                  <Progress value={b.spent} max={Math.max(1, b.budget)} color={COLORS.expense} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Q3: Savings Goals */}
      <Card title="Savings Goals">
        <div className="space-y-4">
          {goals.map((g) => (
            <div key={g._id || g.name} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-300">{g.name}</span>
                <span className="text-slate-400">${Number(g.current_amount).toLocaleString()} / ${Number(g.target_amount).toLocaleString()}</span>
              </div>
              <Progress value={g.current_amount} max={Math.max(1, g.target_amount)} color={COLORS.savings} />
            </div>
          ))}
          {goals.length === 0 && <div className="text-slate-400 text-sm">No goals yet.</div>}
        </div>
      </Card>

      {/* Q4: Debt Overview */}
      <Card title="Debt Overview">
        <div className="space-y-4">
          <div>
            <div className="text-xs text-slate-400 mb-2">Debt Paydown Progress</div>
            <div className="grid grid-cols-3 gap-3">
              {debts.map((d) => (
                <div key={d._id || d.name} className="bg-slate-800/50 rounded-lg p-3 border border-white/10">
                  <div className="text-sm text-slate-300">{d.name}</div>
                  <div className="mt-1 text-xs text-slate-400">APR {Number(d.interest_rate).toFixed(2)}%</div>
                  <div className="mt-2 text-sm text-slate-200">${Number(d.balance).toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {debts.map((d) => (
              <div key={(d._id || d.name) + '-bar'} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-300">{d.name}</span>
                  <span className="text-slate-400">Min ${Number(d.minimum_payment).toLocaleString()}</span>
                </div>
                <Progress value={Math.max(1, d.minimum_payment)} max={Math.max(1, d.balance)} color={COLORS.debt} />
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="rounded-2xl bg-slate-900/60 border border-white/10 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-slate-100 font-semibold">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function Row({ name, value, color }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-slate-300">{name}</span>
      <span className="text-slate-400" style={{ color }}>{`$${Number(value).toLocaleString()}`}</span>
    </div>
  );
}
