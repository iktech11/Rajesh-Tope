import React from 'react';
import type { Language } from '../types';
import { translations } from '../data/translations';
import { constituencyVillages } from '../data/politicalData';
import { motion } from 'framer-motion';
import { MapPin, Building, GraduationCap, Factory } from 'lucide-react';

interface Props {
  lang: Language;
}

export const GhansawangiConstituency: React.FC<Props> = ({ lang }) => {
  const t = translations[lang];

  return (
    <section id="ghansawangi" className="py-12 sm:py-16 lg:py-24 bg-[#FFFFFF] border-b border-[#E7EAF0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5EE] border border-[#EAD7BE] text-[#A66E2E] text-xs font-semibold mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C58B45]" />
            <span>{t.ghansawangi.tag}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#17243A] tracking-tight">
            {t.ghansawangi.heading}
          </h2>
          <p className="text-xs sm:text-sm lg:text-base text-[#667085] mt-1.5">
            {t.ghansawangi.subheading}
          </p>
          <div className="w-12 h-1 bg-[#C58B45] mt-3 rounded-full" />
        </div>

        {/* Narrative & Pillar Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Main Description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-4 sm:space-y-6"
          >
            <div className="bg-[#F7F8FA] rounded-2xl p-5 sm:p-7 border border-[#E7EAF0] shadow-sm">
              <h3 className="text-base sm:text-lg font-bold text-[#17243A] mb-2.5 flex items-center gap-2">
                <Building className="w-5 h-5 text-[#C58B45] shrink-0" />
                <span>{t.ghansawangi.overviewTitle}</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#17243A]/85 leading-relaxed mb-4">
                {t.ghansawangi.overviewText}
              </p>
              <div className="p-3 sm:p-4 bg-white rounded-xl border border-[#E7EAF0] text-xs font-medium text-[#667085] space-y-1.5">
                <div>• {t.ghansawangi.talukasCovered}</div>
                <div>• {t.ghansawangi.populationContext}</div>
              </div>
            </div>

            {/* Cooperative & Educational Foundations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.div
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="bg-white rounded-xl p-5 border border-[#E7EAF0] shadow-sm hover:border-[#17243A]/30 transition-all"
              >
                <div className="w-9 h-9 rounded-lg bg-[#FAF5EE] text-[#C58B45] flex items-center justify-center mb-3">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-[#17243A] mb-1.5">
                  मत्स्योदरी शिक्षण संस्था (MSS)
                </h4>
                <p className="text-xs text-[#667085] leading-relaxed">
                  {t.ghansawangi.matsyodariEdu}
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="bg-white rounded-xl p-5 border border-[#E7EAF0] shadow-sm hover:border-[#17243A]/30 transition-all"
              >
                <div className="w-9 h-9 rounded-lg bg-[#FAF5EE] text-[#C58B45] flex items-center justify-center mb-3">
                  <Factory className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-[#17243A] mb-1.5">
                  समर्थ सहकारी साखर कारखाना
                </h4>
                <p className="text-xs text-[#667085] leading-relaxed">
                  {t.ghansawangi.samarthSugar}
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Key Centers / Rural Circles List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 bg-white rounded-2xl p-5 sm:p-6 border border-[#E7EAF0] shadow-sm"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E7EAF0] mb-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#17243A] flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#C58B45]" />
                <span>{lang === 'mr' ? 'प्रमुख गावे व महसूल मंडळे' : 'Key Villages & Circles'}</span>
              </h3>
              <span className="text-[10px] font-mono font-semibold text-[#667085] bg-[#F7F8FA] px-2 py-0.5 rounded">
                Ghansawangi
              </span>
            </div>

            <div className="space-y-2">
              {constituencyVillages.map((v, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-xl border border-[#F1F3F6] hover:bg-[#F7F8FA] transition-colors flex items-center justify-between text-xs gap-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C58B45] shrink-0" />
                    <span className="font-semibold text-[#17243A]">{v.name}</span>
                  </div>
                  <span className="text-[11px] text-[#667085] font-medium text-right shrink-0">
                    {v.pop}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-[#F1F3F6] text-[11px] text-[#667085] text-center">
              {lang === 'mr' ? 'मतदारसंघातील सर्व गावांमधील विकास योजनांवर सातत्यपूर्ण देखरेख.' : 'Dedicated monitoring of infrastructure projects across all gram panchayats.'}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
