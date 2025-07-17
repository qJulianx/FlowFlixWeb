// components/DiscordMemberCount.tsx

'use client';

import { useDiscordMemberCount } from '@/app/hooks/useDiscordMemberCount';

export default function DiscordMemberCount() {
  const memberCount = useDiscordMemberCount();

  return (
    <span className="font-bold text-blue-400/85">
      {memberCount !== null ? <>&nbsp;{memberCount} osób</> : '...'}
    </span>
  );
}
