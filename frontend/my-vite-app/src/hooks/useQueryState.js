// lightweight URL-query sync hook
import { useState, useEffect } from 'react';
import queryString from 'query-string';

export default function useQueryState(defaults = {}) {
  const [state, setState] = useState(() => {
    const parsed = queryString.parse(window.location.search, { arrayFormat: 'comma' });
    return { ...defaults, ...parsed };
  });

  useEffect(() => {
    const qs = queryString.stringify(state, { arrayFormat: 'comma', skipNull: true, skipEmptyString: true });
    const newUrl = `${window.location.pathname}?${qs}`;
    window.history.replaceState(null, '', newUrl);
  }, [state]);

  return [state, setState];
}
