import React from 'react';
import type { Language } from '../types';
import { translations } from '../data/translations';
import { portfolios } from '../data/politicalData';
import { motion } from 'framer-motion';
import { 
  Activity, 
  GraduationCap, 
  HeartPulse, 
  Droplet, 
  Zap, 
  Leaf, 
  Building2, 
  CheckCircle,
  Briefcase
} from 'lucide-react';

interface Props {
  lang: Language;
}

export const MinisterialExperience: React.FC<Props> = ({ lang }) => {
  const t = translations[lang];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity': return Activity;
      case 'GraduationCap': return GraduationCap;
      case 'HeartPulse': return HeartPulse;
      case 'Droplet': return Droplet;
      case 'Zap': return Zap;
      case 'Leaf': return Leaf;
      case 'Building2': return Building2;
      default: return Briefcase;
    }
  };

  return (
    <section id="ministerial" className="py-12 sm:py-16 lg:py-24 bg-[#F7F8FA] border-b border-[#E7EAF0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E7EAF0] text-[#A66E2E] text-xs font-semibold mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C58B45]" />
            <span>{t.ministerial.tag}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#17243A] tracking-tight">
            {t.ministerial.heading}
          </h2>
          <p className="text-xs sm:text-sm lg:text-base text-[#667085] mt-1.5">
            {t.ministerial.subheading}
          </p>
          <div className="w-12 h-1 bg-[#C58B45] mt-3 rounded-full" />
        </div>

        {/* Health Ministry Highlight Banner (2019–2022) */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 sm:mb-12 rounded-2xl bg-[#17243A] text-white p-5 sm:p-8 lg:p-9 shadow-elevated relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#C58B45]/15 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start lg:items-center">
            <div className="lg:col-span-8 space-y-2.5 sm:space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C58B45]/20 border border-[#C58B45]/40 text-[#C58B45] text-[11px] sm:text-xs font-semibold uppercase tracking-wider font-mono">
                {t.ministerial.healthHighlight}
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold tracking-tight text-white leading-snug">
                {lang === 'mr' ? 'सार्वजनिक आरोग्य व कुटुंब कल्याण मंत्रालय (महाराष्ट्र शासन)' : 'Department of Public Health & Family Welfare, Govt. of Maharashtra'}
              </h3>
              <p className="text-xs sm:text-sm lg:text-base text-slate-300 leading-relaxed max-w-2xl">
                {t.ministerial.healthDesc}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-center items-start lg:items-end w-full">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3.5 sm:p-4 border border-white/15 w-full sm:w-auto shadow-sm">
                <div className="text-[10px] sm:text-xs uppercase tracking-wider text-[#C58B45] font-mono font-bold mb-0.5">
                  Tenure / कार्यकाळ
                </div>
                <div className="text-base sm:text-lg font-bold text-white">
                  2019 – 2022
                </div>
                <div className="text-[11px] text-slate-300 mt-0.5">
                  Cabinet Minister Rank
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Portfolio Cards Grid: 1 col on mobile, 2 on md, 3 on lg */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {portfolios.map((portfolio, idx) => {
            const IconComponent = getIcon(portfolio.iconName);
            return (
              <motion.div
                key={portfolio.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl border border-[#E7EAF0] p-5 sm:p-6 shadow-sm hover:shadow-card hover:border-[#17243A]/30 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Icon & Tenure */}
                  <div className="flex items-start justify-between gap-3 mb-3.5 pb-3 border-b border-[#F1F3F6]">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF5EE] border border-[#EAD7BE] flex items-center justify-center text-[#C58B45] shrink-0">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-1 rounded-md bg-[#F7F8FA] border border-[#E7EAF0] text-[10px] sm:text-[11px] font-mono font-semibold text-[#17243A]">
                      {portfolio.tenure}
                    </span>
                  </div>

                  {/* Department Name */}
                  <h3 className="text-base sm:text-lg font-bold text-[#17243A] mb-1 leading-snug">
                    {portfolio.department[lang]}
                  </h3>

                  {/* Designation */}
                  <p className="text-xs font-semibold text-[#C58B45] mb-2.5">
                    {portfolio.designation[lang]}
                  </p>

                  {/* Narrative Description */}
                  <p className="text-xs sm:text-sm text-[#667085] leading-relaxed mb-4">
                    {portfolio.description[lang]}
                  </p>
                </div>

                {/* Key Decisions */}
                <div className="pt-3 border-t border-[#F1F3F6] space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#667085]">
                    {lang === 'mr' ? 'प्रमुख धोरणे व निर्णय:' : 'Key Policies & Initiatives:'}
                  </span>
                  <ul className="space-y-1 text-xs text-[#17243A]/90">
                    {portfolio.keyInitiatives[lang].map((init, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-[#C58B45] shrink-0 mt-0.5" />
                        <span className="leading-snug">{init}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Note on Portfolio Tenures */}
        <div className="mt-6 sm:mt-8 text-center text-xs text-[#667085] px-4">
          {lang === 'mr'
            ? '* वरील विविध खात्यांची जबाबदारी वेगवेगळ्या शासन कार्यकाळात पार पाडलेली असून, सर्व खाती एकाच वेळी नव्हती.'
            : '* Ministerial portfolios were held across different state government tenures as documented in legislative records, not held simultaneously.'}
        </div>

      </div>
    </section>
  );
};
