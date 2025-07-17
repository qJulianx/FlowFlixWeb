// /app/hooks/useDiscordMemberCount.ts

'use client';

import { useEffect, useState } from 'react';

export function useDiscordMemberCount() {
  const [memberCount, setMemberCount] = useState<number | null>(null);

  useEffect(() => {
    async function fetchMemberCount() {
      try {
        const response = await fetch(
          'https://discord.com/api/guilds/1338569820320436314/widget.json'
        );
        if (!response.ok) throw new Error('Nie udało się pobrać danych');
        const data = await response.json();
        setMemberCount(data.presence_count || data.members?.length || 0);
      } catch (error) {
        console.error('Błąd podczas pobierania liczby członków Discorda:', error);
      }
    }

    fetchMemberCount();
  }, []);

  return memberCount;
}
