import React from 'react';
import useQueryState from '../hooks/useQueryState';

export default function PaginationControls() {
  const [qs, setQs] = useQueryState({ page: 1 });

  const page = parseInt(qs.page || 1, 10);

  function goto(newPage) {
    setQs({ ...qs, page: newPage });
  }

  return (
    <div className="pagination-controls">
      <button onClick={() => goto(Math.max(page - 1, 1))} disabled={page <= 1}>Previous</button>
      <span>Page {page}</span>
      <button onClick={() => goto(page + 1)}>Next</button>
    </div>
  );
}
