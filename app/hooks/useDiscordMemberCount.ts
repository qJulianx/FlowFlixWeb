import { useEffect, useState } from "react";

export function useDiscordMemberCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch("https://discord.com/api/v9/invites/VSUWb283RK?with_counts=true");
        if (!res.ok) {
          console.error("❌ Invite fetch failed:", res.status, res.statusText);
          return;
        }
        const data = await res.json();
        if (!data.approximate_member_count) {
          console.warn("⚠️ Brak approximate_member_count:", data);
        } else {
          setCount(data.approximate_member_count);
        }
      } catch (err) {
        console.error("❌ Błąd przy zapytaniu Invite API:", err);
      }
    };

    fetchCount();
  }, []);

  return count;
}