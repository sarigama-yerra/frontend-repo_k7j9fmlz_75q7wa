import { useEffect, useState } from 'react';
import { api } from '../utils/api';

const KIND_COLORS = {
  income: '#10B981',
  expense: '#F59E0B',
  savings: '#3B82F6',
  debt: '#EF4444',
};

export default function QuickAdd({ onAdded }) {
  // Open the modal immediately when this component is mounted (triggered by the 
  // global \'+ Add\' button). This avoids having to click twice.
  const [open, setOpen] = useState(true);
  const [form, setForm] = useState({ amount: '', description: '', category: 'Salary', kind: 'income', account: 'Checking', date: new Date().toISOString().slice(0,16) });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const payload = { ...form, amount: Number(form.amount), date: new Date(form.date).toISOString() };
      await api.addTransaction(payload);
      setOpen(false);
      onAdded?.();
    } catch (err) {
      setError(err.message);
    } finally { setLoading(false); }
  };

  return (
    <div>
      {/* Floating button is unnecessary here since this component is mounted on demand. */}
      {open && (
        <div className="fixed inset-0 z-30 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <form onSubmit={submit} className="relative z-10 w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-white font-semibold">Quick Add Transaction</h3>

            {error && <div className="text-sm text-rose-400">{error}</div>}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-slate-300 mb-1">Amount</label>
                <input required type="number" step="0.01" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} className="w-full bg-slate-800 text-white rounded-lg p-2 border border-white/10" />
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-1">Date & Time</label>
                <input required type="datetime-local" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full bg-slate-800 text-white rounded-lg p-2 border border-white/10" />
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-1">Description</label>
              <input type="text" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full bg-slate-800 text-white rounded-lg p-2 border border-white/10" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-slate-300 mb-1">Category</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full bg-slate-800 text-white rounded-lg p-2 border border-white/10">
                  <optgroup label="Income">
                    <option>Salary</option>
                    <option>Freelance</option>
                    <option>Investments</option>
                  </optgroup>
                  <optgroup label="Expense">
                    <option>Food</option>
                    <option>Rent</option>
                    <option>Transport</option>
                    <option>Shopping</option>
                    <option>Entertainment</option>
                  </optgroup>
                  <optgroup label="Savings">
                    <option>Emergency Fund</option>
                    <option>Vacation</option>
                    <option>New Car</option>
                  </optgroup>
                  <optgroup label="Debt">
                    <option>Credit Card</option>
                    <option>Student Loan</option>
                    <option>Car Loan</option>
                  </optgroup>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-1">Type</label>
                <select value={form.kind} onChange={(e) => setForm({ ...form, kind: e.target.value })} className="w-full bg-slate-800 text-white rounded-lg p-2 border border-white/10">
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                  <option value="savings">Savings</option>
                  <option value="debt">Debt</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-slate-300 mb-1">Account</label>
                <select value={form.account} onChange={(e) => setForm({ ...form, account: e.target.value })} className="w-full bg-slate-800 text-white rounded-lg p-2 border border-white/10">
                  <option>Checking</option>
                  <option>Savings</option>
                  <option>Cash</option>
                  <option>Credit Card</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-1">Recurring</label>
                <select value={form.recurring ? 'yes' : 'no'} onChange={(e) => setForm({ ...form, recurring: e.target.value === 'yes' })} className="w-full bg-slate-800 text-white rounded-lg p-2 border border-white/10">
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setOpen(false)} className="px-3 py-2 rounded-lg bg-slate-800 text-slate-200 border border-white/10">Cancel</button>
              <button disabled={loading} className="px-3 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-60">{loading ? 'Saving...' : 'Save'}</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
