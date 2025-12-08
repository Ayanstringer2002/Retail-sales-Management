const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

export async function fetchSales(params) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null || v === '') return;
    // arrays should be comma-separated
    if (Array.isArray(v)) qs.append(k, v.join(','));
    else qs.append(k, v);
  });
  const url = `${API_BASE}/sales?${qs.toString()}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('API error');
  return res.json();
}
