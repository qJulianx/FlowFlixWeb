"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldAlert } from "lucide-react";

export default function Footer() {
  const [isDMCAOpen, setIsDMCAOpen] = useState(false);

  return (
    <>
      <footer className="py-12 border-t border-white/5 bg-black/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-zinc-500 text-sm mb-2 font-medium">
              © {new Date().getFullYear()} FlowFlix. Community driven project.
            </p>
            <p className="text-zinc-600 text-xs max-w-md leading-relaxed">
              To jest projekt stworzony przez społeczność (Community Fork). Aplikacja jest agregatorem treści i nie hostuje żadnych plików. 
              Wszelkie materiały wideo pochodzą z zewnętrznych, niezależnych źródeł.
            </p>
          </div>

          <button
            onClick={() => setIsDMCAOpen(true)}
            className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors underline"
          >
            DMCA / Copyright
          </button>
        </div>
      </footer>

      <AnimatePresence>
        {isDMCAOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={() => setIsDMCAOpen(false)}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-zinc-900 border border-white/10 rounded-2xl max-w-lg w-full p-8 shadow-2xl relative z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3 text-red-400">
                    <ShieldAlert size={24} />
                    <h3 className="text-xl font-bold text-white">DMCA & Prawa Autorskie</h3>
                </div>
                <button
                  onClick={() => setIsDMCAOpen(false)}
                  className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors absolute top-4 right-4"
                >
                  <X size={20} className="text-zinc-400" />
                </button>
              </div>
              
              <div className="space-y-4 text-zinc-300 text-sm leading-relaxed">
                <p>
                  FlowFlix działa jako wyszukiwarka i indeks treści dostępnych publicznie w Internecie. 
                  Nie przechowujemy, nie wgrywamy ani nie udostępniamy bezpośrednio żadnych plików wideo na naszych serwerach.
                </p>
                <p>
                  Właściciele praw autorskich powinni kierować roszczenia bezpośrednio do serwisów hostujących pliki. 
                  Jednakże, szanujemy prawa własności intelektualnej i reagujemy na zgłoszenia dotyczące samej aplikacji.
                </p>
                <div className="p-4 bg-black/50 rounded-lg border border-white/5 text-xs text-zinc-500 mt-4">
                    W celu zgłoszenia naruszenia, prosimy o kontakt poprzez platformę GitHub Issues.
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
