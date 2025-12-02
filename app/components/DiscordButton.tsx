"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { motion, animate } from "framer-motion";
import axios from "axios";

export default function DiscordButton() {
  const [memberCount, setMemberCount] = useState<number>(391);

  useEffect(() => {
    let controls: any;

    const fetchDiscordMembers = async () => {
      try {
        const response = await axios.get(
          "https://discord.com/api/v9/invites/VSUWb283RK?with_counts=true"
        );
        if (response.data && response.data.approximate_member_count) {
            const targetCount = response.data.approximate_member_count;
            const startCount = 391;

            if (targetCount > startCount + 15) {
                controls = animate(startCount, targetCount - 15, {
                    duration: 2,
                    onUpdate: (value) => setMemberCount(Math.round(value)),
                    ease: "circOut"
                });
                
                await controls.then(() => {});

                controls = animate(targetCount - 15, targetCount, {
                    duration: 3,
                    onUpdate: (value) => setMemberCount(Math.round(value)),
                    ease: "easeOut"
                });
            } else {
                controls = animate(startCount, targetCount, {
                    duration: 3,
                    onUpdate: (value) => setMemberCount(Math.round(value)),
                    ease: "circOut"
                });
            }
        }
      } catch (error) {
        console.error("Failed to fetch Discord members", error);
      }
    };

    fetchDiscordMembers();

    return () => {
      if (controls) controls.stop();
    };
  }, []);

  return (
    <motion.a
      href="https://discord.gg/VSUWb283RK"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 bg-[#5865F2]/10 hover:bg-[#5865F2]/20 text-[#5865F2] px-4 py-2 rounded-full transition-colors border border-[#5865F2]/20 text-sm font-medium"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Users size={16} />
      <span>Discord</span>
      <span className="flex items-center gap-1 ml-1">
        <span className="w-1 h-1 rounded-full bg-[#5865F2] animate-pulse" />
        {memberCount.toLocaleString()}
      </span>
    </motion.a>
  );
}
