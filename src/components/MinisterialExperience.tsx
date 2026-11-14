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

  const getPortfolioImage = (id: string) => {
    switch (id) {
      case 'p-higher-edu': return `${import.meta.env.BASE_URL}images/ministerial-education.webp`;
      case 'p-medical-edu': return `${import.meta.env.BASE_URL}images/ministerial-medical.jpg`;
      case 'p-water': return `${import.meta.env.BASE_URL}images/ministerial-water.jpg`;
      case 'p-energy': return `${import.meta.env.BASE_URL}images/ministerial-energy.jpg`;
      case 'p-urban': return `${import.meta.env.BASE_URL}images/ministerial-urban.webp`;
      case 'p-health': return `${import.meta.env.BASE_URL}images/ministerial-health.webp`;
      default: return null;
    }
  };
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

        {/* Health Ministry Highlight Banner (2019–2022) with Image 1 Background */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 sm:mb-12 rounded-2xl text-white p-5 sm:p-8 lg:p-9 shadow-elevated relative overflow-hidden group min-h-[220px]"
        >
          {/* Background Image 1 */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/ministerial-health.webp)` }}
          />
          {/* Deep professional overlay for clean contrast and readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#17243A]/95 via-[#17243A]/90 to-[#17243A]/75 group-hover:from-[#17243A]/95 transition-colors" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start lg:items-center">
            <div className="lg:col-span-8 space-y-2.5 sm:space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C58B45]/20 border border-[#C58B45]/40 text-[#C58B45] text-[11px] sm:text-xs font-semibold uppercase tracking-wider font-mono">
                {t.ministerial.healthHighlight}
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold tracking-tight text-white leading-snug">
                {lang === 'mr' ? 'सार्वजनिक आरोग्य व कुटुंब कल्याण मंत्रालय (महाराष्ट्र शासन)' : 'Department of Public Health & Family Welfare, Govt. of Maharashtra'}
              </h3>
              <p className="text-xs sm:text-sm lg:text-base text-slate-200 leading-relaxed max-w-2xl font-normal">
                {t.ministerial.healthDesc}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-center items-start lg:items-end w-full">
              <div className="bg-[#17243A]/70 backdrop-blur-md rounded-xl p-3.5 sm:p-4 border border-white/20 w-full sm:w-auto shadow-sm">
                <div className="text-[10px] sm:text-xs uppercase tracking-wider text-[#C58B45] font-mono font-bold mb-0.5">
                  Tenure / कार्यकाळ
                </div>
                <div className="text-base sm:text-lg font-bold text-white">
                  2019 – 2022
                </div>
                <div className="text-[11px] text-slate-200 mt-0.5">
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
            const bgImage = getPortfolioImage(portfolio.id);

            return (
              <motion.div
                key={portfolio.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className={`rounded-2xl border border-[#E7EAF0] p-5 sm:p-6 shadow-sm hover:shadow-card transition-all flex flex-col justify-between relative overflow-hidden group min-h-[380px] ${
                  bgImage ? 'text-white' : 'bg-white text-[#17243A]'
                }`}
              >
                {/* Background Imagery if available */}
                {bgImage && (
                  <>
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url(${bgImage})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F1826]/98 via-[#0F1826]/90 to-[#0F1826]/75 group-hover:from-[#0F1826]/95 transition-colors" />
                  </>
                )}

                <div className="relative z-10">
                  {/* Top Bar: Icon & Tenure */}
                  <div className={`flex items-start justify-between gap-3 mb-3.5 pb-3 border-b ${
                    bgImage ? 'border-white/15' : 'border-[#F1F3F6]'
                  }`}>
                    <div className="w-10 h-10 rounded-xl bg-[#FAF5EE] border border-[#EAD7BE] flex items-center justify-center text-[#C58B45] shrink-0 shadow-sm">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className={`px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] font-mono font-semibold ${
                      bgImage 
                        ? 'bg-white/10 text-slate-200 border border-white/15' 
                        : 'bg-[#F7F8FA] border border-[#E7EAF0] text-[#17243A]'
                    }`}>
                      {portfolio.tenure}
                    </span>
                  </div>

                  {/* Department Name */}
                  <h3 className={`text-base sm:text-lg font-bold mb-1 leading-snug ${
                    bgImage ? 'text-white' : 'text-[#17243A]'
                  }`}>
                    {portfolio.department[lang]}
                  </h3>

                  {/* Designation */}
                  <p className="text-xs font-semibold text-[#C58B45] mb-2.5">
                    {portfolio.designation[lang]}
                  </p>

                  {/* Narrative Description */}
                  <p className={`text-xs sm:text-sm leading-relaxed mb-4 ${
                    bgImage ? 'text-slate-200' : 'text-[#667085]'
                  }`}>
                    {portfolio.description[lang]}
                  </p>
                </div>

                {/* Key Decisions */}
                <div className={`relative z-10 pt-3 border-t space-y-1.5 ${
                  bgImage ? 'border-white/15' : 'border-[#F1F3F6]'
                }`}>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${
                    bgImage ? 'text-[#C58B45]' : 'text-[#667085]'
                  }`}>
                    {lang === 'mr' ? 'प्रमुख धोरणे व निर्णय:' : 'Key Policies & Initiatives:'}
                  </span>
                  <ul className={`space-y-1 text-xs ${
                    bgImage ? 'text-slate-100' : 'text-[#17243A]/90'
                  }`}>
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
