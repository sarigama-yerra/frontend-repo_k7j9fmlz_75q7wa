export const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed: ${res.status}`);
  }
  return res.json();
}

export const api = {
  summary: (timeframe = 'monthly') => request(`/api/summary?timeframe=${timeframe}`),
  transactions: (timeframe) => request(`/api/transactions${timeframe ? `?timeframe=${timeframe}` : ''}`),
  addTransaction: (payload) => request('/api/transactions', { method: 'POST', body: JSON.stringify(payload) }),
  notifications: () => request('/api/notifications'),
};
