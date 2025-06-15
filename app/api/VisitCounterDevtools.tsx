'use client';

import { useEffect } from 'react';

export default function VisitCounterDevtools() {
  useEffect(() => {
    fetch('/api/visit-counter')
      .then(res => res.json())
      .then(data => {
        (window as any).showVisitCount = () => {
          console.log(`🔢 Liczba odwiedzin (tymczasowa): ${data.count}`);
        };
        console.log('%cWpisz showVisitCount() w konsoli DevTools, aby zobaczyć liczbę odwiedzin.', 'color: green; font-weight: bold;');
      })
      .catch(err => console.error('Błąd pobierania liczby odwiedzin:', err));
  }, []);

  return null;
}
