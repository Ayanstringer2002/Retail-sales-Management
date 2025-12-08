import React from 'react';
import useQueryState from '../hooks/useQueryState';

export default function SearchBar() {
  const [qs, setQs] = useQueryState({ search: '' });

  function onChange(e) {
    setQs({ ...qs, search: e.target.value, page: 1 });
  }

  return (
    <div className="searchbar">
      <input
        placeholder="Search by customer name or phone..."
        value={qs.search || ''}
        onChange={onChange}
      />
    </div>
  );
}
