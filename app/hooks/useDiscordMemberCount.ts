import { useEffect, useState } from "react";

export function useDiscordMemberCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchMemberCount = async () => {
      try {
        const res = await fetch("https://discord.com/api/guilds/1338569820320436314/widget.json");

        if (!res.ok) {
          console.error("❌ Fetch failed:", res.status, res.statusText);
          return;
        }

        const data = await res.json();
        if (!data.presence_count) {
          console.warn("⚠️ Brak presence_count w odpowiedzi JSON:", data);
        } else {
          setCount(data.presence_count);
        }
      } catch (error) {
        console.error("❌ Błąd podczas pobierania widżetu Discorda:", error);
      }
    };

    fetchMemberCount();
  }, []);

  return count;
}