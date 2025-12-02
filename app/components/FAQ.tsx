"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Czy FlowFlix jest darmowy?",
    answer: "Tak, aplikacja jest całkowicie darmowa i tworzona przez społeczność. Nie ma ukrytych opłat, reklam ani subskrypcji."
  },
  {
    question: "Jak zainstalować na Android TV?",
    answer: "Pobierz plik .apk z naszej strony. Możesz go pobrać na telewizor wchodzać na flowflix.vercel.app/android lub używając aplikacji typu 'Send Files to TV' dostępnej w sklepie Play. Następnie uruchom plik, aby zainstalować."
  },
  {
    question: "Czy aplikacja jest bezpieczna?",
    answer: (
      <span>
        Aplikacja FlowFlix jest bezpieczna w użytkowaniu. Nie zbieramy danych osobowych użytkowników, nie wymagamy rejestracji ani logowania. Możesz skorzystać ze skanów na{" "}
        <a
          href="https://www.virustotal.com/gui/file/c2aa2dfd6720e6ccc22590a07ced831826305e955fedfb712b9303ce9f3f4848"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-400/71 font-bold hover:text-blue-400/82"
        >
          VirusTotal
        </a>{" "}
        możesz sprawdzić samodzielnie.
      </span>
    )
  },
  {
    question: "Skąd pochodzą filmy i seriale?",
    answer: "FlowFlix nie hostuje żadnych treści wideo. Aplikacja działa jako agregator, wyszukując i linki dostępne publicznie w internecie (np. z serwisów hostingowych), podobnie jak Google."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 relative">
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold text-white mb-12 text-center"
        >
            Częste pytania
        </motion.h2>
        
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="border border-white/5 rounded-2xl bg-zinc-900/30 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-4 md:p-6 text-left transition-colors hover:bg-white/5"
              >
                <span className="font-medium text-white text-base md:text-lg pr-4">{faq.question}</span>
                <span className={`p-1.5 md:p-2 rounded-full border border-white/10 transition-colors ${openIndex === idx ? 'bg-white text-black' : 'bg-transparent text-zinc-400'}`}>
                    {openIndex === idx ? <Minus size={14} className="md:w-4 md:h-4" /> : <Plus size={14} className="md:w-4 md:h-4" />}
                </span>
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 pt-0 md:p-6 md:pt-0 text-zinc-400 leading-relaxed text-sm md:text-base">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
