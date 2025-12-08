import React from 'react';
import useQueryState from '../hooks/useQueryState';

export default function SortDropdown() {
  const [qs, setQs] = useQueryState({ sort: 'date_desc' });

  function onChange(e) {
    setQs({ ...qs, sort: e.target.value });
  }

  return (
    <div className="sort-dropdown">
      <label>Sort:</label>
      <select value={qs.sort || 'date_desc'} onChange={onChange}>
        <option value="date_desc">Date (Newest)</option>
        <option value="date_asc">Date (Oldest)</option>
        <option value="quantity_desc">Quantity (High → Low)</option>
        <option value="quantity_asc">Quantity (Low → High)</option>
        <option value="customer_asc">Customer (A → Z)</option>
        <option value="customer_desc">Customer (Z → A)</option>
      </select>
    </div>
  );
}
