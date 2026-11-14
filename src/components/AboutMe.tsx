import React from 'react';
import type { Language } from '../types';
import { translations } from '../data/translations';
import { motion } from 'framer-motion';
import { User, Calendar, MapPin, GraduationCap, Award, Compass, HeartHandshake, ShieldCheck } from 'lucide-react';

interface Props {
  lang: Language;
}

export const AboutMe: React.FC<Props> = ({ lang }) => {
  const t = translations[lang];

  const bioCards = [
    {
      label: t.about.fullNameLabel,
      val: t.about.fullNameVal,
      icon: User,
    },
    {
      label: t.about.popularNameLabel,
      val: t.about.popularNameVal,
      icon: Award,
    },
    {
      label: t.about.dobLabel,
      val: t.about.dobVal,
      icon: Calendar,
    },
    {
      label: t.about.birthplaceLabel,
      val: t.about.birthplaceVal,
      icon: MapPin,
    },
    {
      label: t.about.educationLabel,
      val: t.about.educationVal,
      icon: GraduationCap,
    },
    {
      label: t.about.fatherLabel,
      val: t.about.fatherVal,
      icon: HeartHandshake,
    },
  ];

  return (
    <section id="about" className="py-12 sm:py-16 lg:py-24 bg-[#F7F8FA] border-b border-[#E7EAF0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E7EAF0] text-[#A66E2E] text-xs font-semibold mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C58B45]" />
            <span>{t.about.tag}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#17243A] tracking-tight">
            {t.about.heading}
          </h2>
          <div className="w-12 h-1 bg-[#C58B45] mt-3 rounded-full" />
        </div>

        {/* Content Layout without photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Quick Facts Card */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 space-y-4 sm:space-y-6"
          >
            <div className="bg-white rounded-2xl border border-[#E7EAF0] p-5 sm:p-7 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#E7EAF0]">
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#17243A] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C58B45]" />
                  <span>{t.about.quickFactsHeading}</span>
                </h3>
                <span className="text-[10px] text-[#A66E2E] bg-[#FAF5EE] px-2 py-0.5 rounded font-mono font-semibold">
                  Official Record
                </span>
              </div>

              <dl className="space-y-3 text-xs sm:text-sm">
                {bioCards.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-3 pb-3 border-b border-[#F1F3F6] last:border-0 last:pb-0"
                    >
                      <dt className="text-[#667085] font-medium flex items-center gap-1.5 shrink-0 text-xs">
                        <Icon className="w-3.5 h-3.5 text-[#C58B45]" />
                        <span>{item.label}:</span>
                      </dt>
                      <dd className="text-[#17243A] font-semibold sm:text-right leading-snug">
                        {item.val}
                      </dd>
                    </motion.div>
                  );
                })}
              </dl>
            </div>

            {/* Political Party / Association Box with Official Symbol */}
            <div className="bg-white rounded-2xl border border-[#E7EAF0] p-5 sm:p-6 shadow-sm transition-all duration-300 hover:shadow-md flex items-center justify-between gap-4">
              <div className="flex-1">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#667085]">
                  {t.about.politicalBgLabel}
                </span>
                <div className="text-sm sm:text-base font-bold text-[#17243A] mt-0.5">
                  {t.about.politicalBgVal}
                </div>
                <p className="text-xs text-[#667085] mt-1 leading-relaxed">
                  {lang === 'mr' ? 'पुरोगामी विचार, सहकार चळवळ आणि शेतकरी सक्षमीकरणाचा पाया.' : 'Rooted in progressive cooperative philosophy and agrarian upliftment.'}
                </p>
              </div>

              {/* Official NCP (Sharadchandra Pawar) Symbol Logo */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-2xl p-1 bg-[#FAF5EE] border border-[#EAD7BE] shadow-subtle flex items-center justify-center overflow-hidden">
                <img
                  src={`${import.meta.env.BASE_URL}images/ncp-sp-symbol.jpg`}
                  alt="NCP Sharadchandra Pawar Official Symbol"
                  className="w-full h-full object-contain rounded-xl"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>

          {/* Narrative Biography Card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="bg-white rounded-2xl border border-[#E7EAF0] p-5 sm:p-8 lg:p-9 shadow-card">
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[#E7EAF0]">
                <div className="w-10 h-10 rounded-xl bg-[#FAF5EE] border border-[#EAD7BE] flex items-center justify-center text-[#C58B45] shrink-0">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#17243A]">
                    {lang === 'mr' ? 'जीवनप्रवास आणि सार्वजनिक कार्य' : lang === 'hi' ? 'जीवन यात्रा एवं जनसेवा' : 'Life Journey & Public Service'}
                  </h3>
                  <p className="text-xs text-[#667085]">
                    {lang === 'mr' ? 'तथ्याधारित अधिकृत जीवनवृत्त' : 'Verified Factual Biographical Profile'}
                  </p>
                </div>
              </div>

              {/* Bio Paragraphs */}
              <div className="space-y-4 text-xs sm:text-sm sm:leading-relaxed text-[#17243A]/90 font-normal">
                <p>{t.about.bioP1}</p>
                <p>{t.about.bioP2}</p>
                <p>{t.about.bioP3}</p>
              </div>

              {/* Core Philosophy Box */}
              <div className="mt-6 sm:mt-8 p-4 sm:p-5 rounded-xl bg-[#FAF5EE] border border-[#EAD7BE]">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#A66E2E] mb-1.5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C58B45]" />
                  <span>{t.about.keyValues}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#17243A] font-medium italic leading-relaxed">
                  "{t.about.valuesText}"
                </p>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
