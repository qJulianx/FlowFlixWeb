"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Monitor, Smartphone, Download } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-34 pb-20 lg:pt-48 lg:pb-32 overflow-hidden min-h-screen flex items-center">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-purple-500/20 blur-[120px] rounded-full -z-10 opacity-50 mix-blend-screen" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-blue-500/10 blur-[100px] rounded-full -z-10 opacity-30 mix-blend-screen" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-zinc-300 mb-6 lg:mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Dostępne na Android & Android TV
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white mb-4 lg:mb-6 leading-[1.1]">
            Oglądaj wszędzie <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              FlowFlix
            </span>
          </h1>
          
          <p className="text-base md:text-lg text-zinc-400 mb-18 lg:mb-10 max-w-lg leading-relaxed">
            Agregator treści nowej generacji. Wszystkie Twoje ulubione filmy i seriale w jednej, pięknej aplikacji. Bez reklam, bez opłat, pełna wolność.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 sm:gap-4">
            <Link href="/android" className="group w-full sm:w-auto">
               <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 lg:px-8 lg:py-4 bg-white text-black rounded-2xl font-bold text-base lg:text-lg shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.5)] transition-all"
               >
                <Smartphone size={20} className="lg:w-6 lg:h-6" />
                Pobierz na Androida
               </motion.button>
            </Link>

            <div className="relative group w-full sm:w-auto">
                <Link href="/windows" className="w-full sm:w-auto">
                   <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 lg:px-8 lg:py-4 bg-zinc-900/80 text-white border border-white/10 rounded-2xl font-bold text-base lg:text-lg backdrop-blur-md hover:bg-zinc-800 transition-all shadow-[0_0_20px_-5px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.1)]"
                   >
                    <Monitor size={20} className="lg:w-6 lg:h-6" />
                    Pobierz na Windows
                   </motion.button>
                </Link>
                <span className="absolute -top-2 lg:-top-3 right-2 bg-emerald-500 text-white text-[10px] px-2 py-0.5 rounded-full border border-white/5 pointer-events-none">
                    Nowe
                </span>
            </div>
          </div>
        </motion.div>

        {/* Phone Mockup */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative mx-auto lg:ml-auto"
        >
            {/* Downloads Counter Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="hidden lg:flex absolute -top-36 -left-0 z-20 items-center gap-4 p-6 rounded-3xl bg-zinc-900/60 backdrop-blur-xl border border-white/10 shadow-xl ring-1 ring-white/5"
            >
              <div className="p-4 bg-purple-500/20 text-purple-300 rounded-2xl">
                <Download size={32} />
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-bold text-white leading-none">4k+</span>
                <span className="text-sm text-purple-400 font-semibold uppercase tracking-wider mt-2">Pobrań aplikacji</span>
              </div>
            </motion.div>

            {/* Phone Frame removed, just the image with subtle styling */}
            <div className="relative z-10 max-w-[280px] sm:max-w-[320px] rounded-[2rem] overflow-hidden shadow-2xl">
                <div className="relative w-full aspect-[9/19.5] bg-zinc-900">
                        <Image 
                        src="/ekran_glowny.jpg" 
                        alt="FlowFlix App Interface" 
                        fill 
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 100vw, 320px"
                        />
                        {/* Screen Glare */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none" />
                </div>
            </div>
                
            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-3xl -z-10" />
        </motion.div>
      </div>
    </section>
  );
}
