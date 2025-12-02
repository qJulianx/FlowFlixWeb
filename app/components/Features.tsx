"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Tv, Smartphone, Globe, Zap, Star, Languages } from "lucide-react";

const features = [
  {
    icon: <Globe className="w-6 h-6 text-blue-400" />,
    title: "Integracja TMDB",
    description: "Pełna baza filmów i seriali z opisami, ocenami i obsadą."
  },
  {
    icon: <Zap className="w-6 h-6 text-yellow-400" />,
    title: "Synchronizacja",
    description: "Zacznij na telefonie, dokończ na telewizorze. Historia oglądania zawsze pod ręką."
  },
  {
    icon: <Star className="w-6 h-6 text-purple-400" />,
    title: "Ulubione",
    description: "Twórz własne listy do obejrzenia. Wszystko w jednym miejscu."
  },
  {
    icon: <Languages className="w-6 h-6 text-emerald-400" />,
    title: "Język Polski",
    description: "Interfejs dostępny w języku polskim i angielskim."
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 relative overflow-hidden scroll-mt-20 md:scroll-mt-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-3xl md:text-5xl font-bold text-white mb-6"
          >
            Jeden plik. <span className="text-zinc-500">Wiele możliwości.</span>
          </motion.h2>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="text-lg text-zinc-400"
          >
            FlowFlix automatycznie wykrywa urządzenie. Zainstaluj ten sam plik .apk na telefonie i Android TV, a interfejs dostosuje się automatycznie.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image Section */}
             <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl group"
             >
                <div className="aspect-video relative bg-zinc-900">
                     <Image
                        src="/wyglad_player.jpg"
                        alt="FlowFlix Player Interface"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 800px"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                     
                     {/* Badges - Mobile: Top Center, Desktop: Bottom Left above text */}
                     <div className="absolute top-1.5 left-0 right-0 flex justify-center gap-10 md:top-auto md:bottom-20 md:left-8 md:right-auto md:justify-start z-10">
                        <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                            <Smartphone size={13} className="text-white" />
                            <span className="text-[10px] uppercase tracking-widest font-bold text-white">Mobile</span>
                        </div>
                         <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                            <Tv size={13} className="text-white" />
                            <span className="text-[10px] uppercase tracking-widest font-bold text-white">Android TV</span>
                        </div>
                     </div>

                     {/* Text Caption */}
                     <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
                        <p className="text-white text-xl font-bold">Nowoczesny odtwarzacz wideo</p>
                     </div>
                </div>
             </motion.div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-3 md:gap-6">
                {features.map((feature, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1, duration: 0.5 }}
                        className="p-4 md:p-6 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-white/10 hover:bg-zinc-900 transition-colors"
                    >
                        <div className="mb-3 md:mb-4 p-2 md:p-3 bg-black rounded-xl w-fit border border-white/5">
                            {feature.icon}
                        </div>
                        <h3 className="text-base md:text-lg font-bold text-white mb-1 md:mb-2">{feature.title}</h3>
                        <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">{feature.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}
