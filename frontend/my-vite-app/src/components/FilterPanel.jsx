import React, { useEffect, useState } from 'react';
import useQueryState from '../hooks/useQueryState';
import { normalizeArrayParam } from '../utils/helpers';

export default function FilterPanel() {
  const [qs, setQs] = useQueryState({
    customerRegion: '',
    gender: '',
    productCategory: '',
    tags: '',
    paymentMethod: '',
    ageMin: '',
    ageMax: '',
    dateFrom: '',
    dateTo: ''
  });

  // simple controlled inputs; in a real app we'd fetch available filter options from backend
  const [form, setForm] = useState(qs);

  useEffect(() => {
    setForm(qs);
  }, [qs]);

  function applyFilters() {
    setQs({ ...qs,
      customerRegion: form.customerRegion,
      gender: form.gender,
      productCategory: form.productCategory,
      tags: form.tags,
      paymentMethod: form.paymentMethod,
      ageMin: form.ageMin,
      ageMax: form.ageMax,
      dateFrom: form.dateFrom,
      dateTo: form.dateTo,
      page: 1
    });
  }

  function resetFilters() {
    const empty = {
      customerRegion: '', gender: '', productCategory: '',
      tags: '', paymentMethod: '', ageMin: '', ageMax: '', dateFrom: '', dateTo: ''
    };
    setForm(empty);
    setQs({ ...qs, ...empty, page: 1 });
  }

  return (
    <div className="filter-panel">
      <h3>Filters</h3>
      <div>
        <label>Customer Region (comma-separated)</label>
        <input value={form.customerRegion || ''} onChange={e => setForm({ ...form, customerRegion: e.target.value })} />
      </div>
      <div>
        <label>Gender (comma-separated)</label>
        <input value={form.gender || ''} onChange={e => setForm({ ...form, gender: e.target.value })} />
      </div>
      <div>
        <label>Age Min</label>
        <input type="number" value={form.ageMin || ''} onChange={e => setForm({ ...form, ageMin: e.target.value })} />
        <label>Age Max</label>
        <input type="number" value={form.ageMax || ''} onChange={e => setForm({ ...form, ageMax: e.target.value })} />
      </div>
      <div>
        <label>Product Category (comma-separated)</label>
        <input value={form.productCategory || ''} onChange={e => setForm({ ...form, productCategory: e.target.value })} />
      </div>
      <div>
        <label>Tags (comma-separated)</label>
        <input value={form.tags || ''} onChange={e => setForm({ ...form, tags: e.target.value })} />
      </div>
      <div>
        <label>Payment Method (comma-separated)</label>
        <input value={form.paymentMethod || ''} onChange={e => setForm({ ...form, paymentMethod: e.target.value })} />
      </div>
      <div>
        <label>Date From</label>
        <input type="date" value={form.dateFrom || ''} onChange={e => setForm({ ...form, dateFrom: e.target.value })} />
        <label>Date To</label>
        <input type="date" value={form.dateTo || ''} onChange={e => setForm({ ...form, dateTo: e.target.value })} />
      </div>
      <div className="filter-actions">
        <button onClick={applyFilters}>Apply</button>
        <button onClick={resetFilters}>Reset</button>
      </div>
    </div>
  );
}
