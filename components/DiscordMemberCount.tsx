// components/DiscordMemberCount.tsx

'use client';

import { useDiscordMemberCount } from '@/app/hooks/useDiscordMemberCount';

export default function DiscordMemberCount() {
  const memberCount = useDiscordMemberCount();

  return (
    <span className="font-bold text-blue-400">
      {memberCount !== null ? `${memberCount} osób ` : '...'}
    </span>
  );
}
