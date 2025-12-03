"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Github, Menu, X } from "lucide-react";
import DiscordButton from "./DiscordButton";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-20">
      {/* Blur Layer - Absolute positioning to guarantee render order */}
      <div className="absolute inset-0 w-full h-full bg-black/80 backdrop-blur-2xl z-[-1]" />
      
      {/* Border Layer */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/5 z-[-1]" />

      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between relative z-10">
        <Link href="/" className="flex items-center gap-3 group" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="relative w-10 h-10 overflow-hidden rounded-xl">
             <Image
              src="/logo2.png"
              alt="FlowFlix Logo"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">FlowFlix</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {["Home", "Features", "Changelog", "FAQ"].map((item) => (
            <Link
              key={item}
              href={item === "Home" ? "/" : `#${item.toLowerCase()}`}
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors relative group"
            >
              {item === "Features" ? "Funkcje" : item === "Changelog" ? "Zmiany" : item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Desktop Socials */}
        <div className="hidden md:flex items-center gap-4">
          <DiscordButton />
          <motion.a
            href="https://github.com/qJulianx/FlowFlixWeb"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-zinc-400 hover:text-white transition-colors bg-zinc-900/50 hover:bg-zinc-800 rounded-lg border border-white/5"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={20} />
          </motion.a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
            className="md:hidden p-2 text-zinc-200 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Full Screen Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl pt-24 px-6 flex flex-col items-center md:hidden"
            >
                <div className="flex flex-col gap-6 mt-8 w-full max-w-sm text-center">
                    {["Home", "Features", "Changelog", "FAQ"].map((item) => (
                        <Link
                            key={item}
                            href={item === "Home" ? "/" : `#${item.toLowerCase()}`}
                            className="text-3xl font-bold text-zinc-400 hover:text-white transition-colors py-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {item === "Features" ? "Funkcje" : item === "Changelog" ? "Zmiany" : item}
                        </Link>
                    ))}
                </div>

                <div className="mt-auto pb-12 flex items-center justify-center gap-6 w-full">
                    <DiscordButton />
                    <a
                        href="https://github.com/qJulianx/FlowFlixWeb"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 text-zinc-400 hover:text-white transition-colors bg-zinc-900/50 hover:bg-zinc-800 rounded-full border border-white/5"
                    >
                        <Github size={24} />
                    </a>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
