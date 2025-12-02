"use client";

import { motion } from "framer-motion";
import { Clock, GitBranch } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type GitHubRelease = {
  tag_name: string;
  published_at: string;
  body: string;
  html_url: string;
};

interface ChangelogUIProps {
  release: GitHubRelease;
  date: string;
}

export default function ChangelogUI({ release, date }: ChangelogUIProps) {
  return (
    <section id="changelog" className="py-24 relative overflow-hidden border-y border-white/5 scroll-mt-5">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      {/* Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-purple-500/20 blur-[100px] rounded-full pointer-events-none opacity-50" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-blue-500/10 blur-[80px] rounded-full pointer-events-none opacity-30" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div 
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
             <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/20 text-purple-400">
                <GitBranch size={24} />
             </div>
             <h2 className="text-3xl font-bold text-white">Ostatnia aktualizacja</h2>
        </motion.div>

        <motion.div 
            className="bg-zinc-900/40 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
            <div className="p-4 md:p-6 border-b border-white/5 flex flex-wrap gap-3 justify-between items-center bg-white/5">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className="px-2 py-0.5 md:px-3 md:py-1 rounded-full bg-white/10 text-white font-mono text-xs md:text-sm border border-white/5 whitespace-nowrap">
                        {release.tag_name}
                    </span>
                    <div className="flex items-center gap-2 text-zinc-400 text-xs md:text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                        <Clock size={14} className="shrink-0" />
                        <span>{date}</span>
                    </div>
                </div>
                <a 
                    href={release.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs md:text-sm text-purple-400 hover:text-purple-300 transition-colors font-medium whitespace-nowrap ml-auto"
                >
                    GitHub →
                </a>
            </div>
            
            <div className="p-4 md:p-8">
                <div className="prose prose-invert prose-xs md:prose-sm max-w-none 
                    leading-snug tracking-tight
                    prose-headings:text-zinc-100 prose-headings:mb-3 md:prose-headings:mb-4
                    prose-a:text-purple-400 hover:prose-a:text-purple-300 
                    prose-strong:text-white 
                    prose-li:text-zinc-300 prose-li:my-0.5 md:prose-li:my-1
                    prose-p:text-zinc-400 prose-p:my-1.5 md:prose-p:my-2
                    prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md 
                    prose-code:before:content-none prose-code:after:content-none 
                    prose-code:font-mono prose-code:text-zinc-200 prose-code:font-normal">
                    <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        components={{
    p: ({ node, ...props }: any) => (
        <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            {...props}
        />
    ),
    li: ({ node, ...props }: any) => (
        <motion.li
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            {...props}
        />
    ),
    h1: ({ node, ...props }: any) => <motion.h1 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} {...props} />,
    h2: ({ node, ...props }: any) => <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} {...props} />,
    h3: ({ node, ...props }: any) => <motion.h3 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} {...props} />,
}}
                    >
                        {release.body}
                    </ReactMarkdown>
                </div>
            </div>
        </motion.div>
      </div>
    </section>
  );
}
