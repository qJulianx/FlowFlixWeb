'use client';

import { useEffect, useState } from 'react';

export default function VisitCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/visit-counter')
      .then((res) => res.json())
      .then((data) => setCount(data.count))
      .catch((err) => console.error('Błąd:', err));
  }, []);

  return (
    <div className="text-center text-sm text-slate-500 pt-4">
      {count !== null ? (
        <>Liczba odwiedzin strony: <span className="font-semibold">{count}</span></>
      ) : (
        'Ładowanie liczby odwiedzin...'
      )}
    </div>
  );
}
