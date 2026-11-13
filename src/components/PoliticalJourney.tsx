import React, { useState } from 'react';
import type { Language } from '../types';
import { translations } from '../data/translations';
import { milestones } from '../data/politicalData';
import { motion } from 'framer-motion';
import { Award, CheckCircle2, Info } from 'lucide-react';

interface Props {
  lang: Language;
}

export const PoliticalJourney: React.FC<Props> = ({ lang }) => {
  const t = translations[lang];
  const [filter, setFilter] = useState<'all' | 'ministry' | 'assembly' | 'election'>('all');

  const filteredMilestones = milestones.filter(m => {
    if (filter === 'all') return true;
    if (filter === 'ministry') return m.category === 'ministry';
    if (filter === 'assembly') return m.category === 'assembly';
    if (filter === 'election') return m.category === 'election';
    return true;
  });

  return (
    <section id="journey" className="py-12 sm:py-16 lg:py-24 bg-[#FFFFFF] border-b border-[#E7EAF0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5EE] border border-[#EAD7BE] text-[#A66E2E] text-xs font-semibold mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C58B45]" />
              <span>{t.journey.tag}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#17243A] tracking-tight">
              {t.journey.heading}
            </h2>
            <p className="text-xs sm:text-sm lg:text-base text-[#667085] mt-1.5 max-w-2xl">
              {t.journey.subheading}
            </p>
            <div className="w-12 h-1 bg-[#C58B45] mt-3 rounded-full" />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {[
              { id: 'all', label: t.journey.filterAll },
              { id: 'ministry', label: t.journey.filterMinistry },
              { id: 'assembly', label: t.journey.filterAssembly },
              { id: 'election', label: t.journey.filterElections },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all min-h-[38px] flex items-center ${
                  filter === f.id
                    ? 'bg-[#17243A] text-white shadow-sm'
                    : 'bg-[#F7F8FA] text-[#667085] border border-[#E7EAF0] hover:text-[#17243A]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Status Note */}
        <div className="mb-8 sm:mb-12 p-3.5 sm:p-4 rounded-xl bg-[#FAF5EE] border border-[#EAD7BE] flex items-start gap-2.5 sm:gap-3">
          <Info className="w-4 h-4 sm:w-5 sm:h-5 text-[#C58B45] shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-[#17243A] leading-relaxed">
            <span className="font-bold text-[#A66E2E]">
              {lang === 'mr' ? 'अधिकृत नोंदीनुसार:' : 'Official Record:'}{' '}
            </span>
            {t.journey.formerMlaNote}
          </div>
        </div>

        {/* Timeline Container (Responsive margin for mobile: ml-3 on mobile, ml-32 on desktop) */}
        <div className="relative border-l-2 border-[#E7EAF0] ml-3 sm:ml-6 md:ml-32 pl-5 sm:pl-7 md:pl-10 space-y-8 sm:space-y-12">
          {filteredMilestones.map((milestone, idx) => (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.45, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="relative group"
            >
              {/* Year Stamp for Desktop on Left of Timeline */}
              <div className="hidden md:block absolute -left-40 top-1 w-28 text-right">
                <span className="inline-block px-2.5 py-1 rounded-md bg-[#17243A] text-[#FFFFFF] font-mono font-bold text-xs shadow-sm">
                  {milestone.year}
                </span>
                <div className="text-[10px] text-[#667085] uppercase tracking-wider mt-1 font-semibold">
                  {milestone.category}
                </div>
              </div>

              {/* Timeline Node Point */}
              <div className="absolute -left-[27px] sm:-left-[35px] md:-left-[47px] top-1.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white border-4 border-[#17243A] group-hover:border-[#C58B45] group-hover:scale-110 transition-all shadow-sm" />

              {/* Content Card */}
              <motion.div
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="bg-[#FFFFFF] border border-[#E7EAF0] rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-card hover:border-[#17243A]/30 transition-all"
              >
                {/* Year Badge for Mobile */}
                <div className="md:hidden flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded bg-[#17243A] text-white font-mono font-bold text-xs">
                    {milestone.year}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-[#C58B45]">
                    {milestone.category}
                  </span>
                </div>

                {/* Role / Distinction */}
                <div className="text-xs font-semibold text-[#C58B45] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 shrink-0" />
                  <span>{milestone.role[lang]}</span>
                </div>

                {/* Milestone Title */}
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-[#17243A] mb-2 leading-snug">
                  {milestone.title[lang]}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#667085] leading-relaxed mb-3 sm:mb-4">
                  {milestone.description[lang]}
                </p>

                {/* Key Highlights */}
                {milestone.highlights && milestone.highlights[lang] && (
                  <div className="pt-3 border-t border-[#F1F3F6] space-y-1.5">
                    {milestone.highlights[lang].map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#17243A]/90">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C58B45] shrink-0 mt-0.5" />
                        <span className="leading-snug">{h}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
