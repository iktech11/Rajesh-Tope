import React from 'react';
import type { Language } from '../types';
import { translations } from '../data/translations';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Compass, ShieldCheck } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';

interface Props {
  lang: Language;
}

export const Hero: React.FC<Props> = ({ lang }) => {
  const t = translations[lang];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative pt-24 sm:pt-28 pb-12 sm:pb-16 lg:pt-36 lg:pb-24 bg-[#FFFFFF] border-b border-[#E7EAF0] overflow-hidden">
      {/* Background accents with subtle animated glow */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#F7F8FA] -z-10 pointer-events-none hidden lg:block" />
      <motion.div 
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.35, 0.5, 0.35]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-24 -left-24 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-[#FAF5EE] blur-3xl -z-10 pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Main Content Column with staggered storytelling animation */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1"
          >
            {/* Verified Credentials Badge with subtle shimmer */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5EE] border border-[#EAD7BE] w-fit mb-3 sm:mb-4 relative overflow-hidden group shadow-subtle"
            >
              <span className="w-2 h-2 rounded-full bg-[#C58B45] animate-pulse" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-wide text-[#A66E2E] uppercase font-sans">
                {t.hero.verifiedProfile}
              </span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
            </motion.div>

            {/* Main Name: Rajesh Tope */}
            <motion.h1 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#17243A] leading-[1.15] mb-2 sm:mb-3"
            >
              {lang === 'mr' ? 'राजेश अंकुशराव टोपे' : lang === 'hi' ? 'राजेश अंकुशराव टोपे' : 'Rajesh Ankushrao Tope'}
            </motion.h1>

            {/* Official Titles & Credentials */}
            <motion.div 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="space-y-1 mb-4 sm:mb-6"
            >
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-[2px] bg-[#C58B45] shrink-0" />
                <h2 className="text-base sm:text-lg lg:text-xl font-bold text-[#17243A]">
                  {lang === 'mr' ? 'माजी मंत्री, महाराष्ट्र शासन' : lang === 'hi' ? 'पूर्व मंत्री, महाराष्ट्र शासन' : 'Former Minister, Government of Maharashtra'}
                </h2>
              </div>
              <h3 className="text-xs sm:text-sm lg:text-base font-semibold text-[#667085] pl-5">
                {lang === 'mr' ? 'माजी आमदार – घनसावंगी, जिल्हा जालना' : lang === 'hi' ? 'पूर्व विधायक – घनसावंगी, जिला जालना' : 'Former MLA – Ghansawangi, District Jalna'}
              </h3>
            </motion.div>

            {/* Narrative Description */}
            <motion.p 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-xs sm:text-sm lg:text-base text-[#667085] leading-relaxed mb-6 sm:mb-8 max-w-2xl font-normal"
            >
              {t.hero.description}
            </motion.p>

            {/* Action CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5 mb-8 sm:mb-10"
            >
              <button
                onClick={() => scrollTo('journey')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#17243A] hover:bg-[#243B53] text-white text-xs sm:text-sm font-semibold transition-all shadow-sm hover:shadow-card active:scale-[0.98] min-h-[48px] group"
              >
                <span>{t.hero.exploreJourney}</span>
                <ArrowUpRight className="w-4 h-4 text-[#C58B45] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={() => scrollTo('work')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#FFFFFF] hover:bg-[#F7F8FA] text-[#17243A] text-xs sm:text-sm font-semibold border border-[#E7EAF0] transition-colors active:scale-[0.98] min-h-[48px]"
              >
                <Compass className="w-4 h-4 text-[#667085]" />
                <span>{t.hero.viewWork}</span>
              </button>

              <button
                onClick={() => scrollTo('connect')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#FAF5EE] hover:bg-[#FAF5EE]/80 text-[#A66E2E] text-xs sm:text-sm font-semibold border border-[#EAD7BE] transition-colors active:scale-[0.98] min-h-[48px]"
              >
                <span>{t.hero.publicConnect}</span>
              </button>
            </motion.div>

            {/* Quick Metrics Strip with Animated Counters */}
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="pt-4 sm:pt-6 border-t border-[#E7EAF0] grid grid-cols-3 gap-2 sm:gap-4 max-w-xl"
            >
              <div className="p-2 sm:p-2.5 rounded-xl bg-[#F7F8FA]/60 border border-[#E7EAF0]/60">
                <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#17243A] tracking-tight">
                  <AnimatedCounter value={30} suffix="+" duration={1.5} />
                </div>
                <div className="text-[11px] sm:text-xs text-[#667085] font-medium mt-0.5">
                  {lang === 'mr' ? 'वर्षे जनसेवा' : 'Years Service'}
                </div>
              </div>
              <div className="p-2 sm:p-2.5 rounded-xl bg-[#F7F8FA]/60 border border-[#E7EAF0]/60">
                <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#17243A] tracking-tight">
                  <AnimatedCounter value={25} duration={1.5} />
                </div>
                <div className="text-[11px] sm:text-xs text-[#667085] font-medium mt-0.5">
                  {lang === 'mr' ? 'वर्षे आमदार कार्यकाळ' : 'Years as MLA'}
                </div>
              </div>
              <div className="p-2 sm:p-2.5 rounded-xl bg-[#F7F8FA]/60 border border-[#E7EAF0]/60">
                <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#17243A] tracking-tight">
                  B.E.
                </div>
                <div className="text-[11px] sm:text-xs text-[#667085] font-medium mt-0.5">
                  {lang === 'mr' ? 'मेकॅनिकल (MIT)' : 'Mechanical (MIT)'}
                </div>
              </div>
            </motion.div>

          </motion.div>

          {/* Portrait Column: Natural Mobile-First aspect ratio with subtle reveal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md">
              <div className="overflow-hidden rounded-2xl bg-white border border-[#E7EAF0] shadow-card hover:shadow-elevated transition-shadow duration-500">
                <div className="relative aspect-[4/4.5] sm:aspect-[4/5] bg-[#F7F8FA] overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                    src={`${import.meta.env.BASE_URL}images/rajesh-tope-portrait.jpg`}
                    alt="Rajesh Tope - Official Portrait"
                    className="w-full h-full object-cover object-top"
                    loading="eager"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-20 sm:h-24 bg-gradient-to-t from-[#17243A]/90 via-[#17243A]/40 to-transparent flex flex-col justify-end p-3.5 sm:p-4 text-white">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#C58B45] font-semibold">
                      Official Archive
                    </span>
                    <span className="text-sm sm:text-base font-bold text-white tracking-wide">
                      {lang === 'mr' ? 'राजेश अंकुशराव टोपे' : 'Rajesh A. Tope'}
                    </span>
                  </div>
                </div>

                {/* Bottom caption */}
                <div className="px-3.5 sm:px-4 py-2.5 bg-[#FFFFFF] border-t border-[#E7EAF0] flex items-center justify-between text-[11px] text-[#667085]">
                  <span className="flex items-center gap-1.5 font-medium text-[#17243A]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C58B45]" />
                    {lang === 'mr' ? 'प्रमाणित राजकीय माहिती' : 'Verified Political Record'}
                  </span>
                  <span>Ghansawangi • Jalna</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Scroll Down Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="hidden sm:flex justify-center mt-10 lg:mt-14"
        >
          <button
            onClick={() => scrollTo('about')}
            className="flex flex-col items-center gap-1.5 text-xs font-semibold text-[#667085] hover:text-[#17243A] transition-colors group focus:outline-none min-h-[44px]"
            aria-label="Scroll to About Me section"
          >
            <span>{t.hero.scrollDown}</span>
            <div className="w-7 h-7 rounded-full border border-[#E7EAF0] bg-white flex items-center justify-center group-hover:border-[#17243A] transition-colors shadow-subtle">
              <ArrowDown className="w-3 h-3 text-[#C58B45] group-hover:translate-y-0.5 transition-transform" />
            </div>
          </button>
        </motion.div>

      </div>
    </section>
  );
};
