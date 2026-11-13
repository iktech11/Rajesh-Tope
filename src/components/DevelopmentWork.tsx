import React, { useState } from 'react';
import type { Language, DevelopmentProject } from '../types';
import { translations } from '../data/translations';
import { developmentProjects } from '../data/politicalData';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  X, 
  Search, 
  ShieldCheck,
  ChevronRight,
  Droplet,
  Route,
  GraduationCap,
  Activity,
  Wheat,
  Home,
  Building,
  HeartHandshake
} from 'lucide-react';

interface Props {
  lang: Language;
}

export const DevelopmentWork: React.FC<Props> = ({ lang }) => {
  const t = translations[lang];
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeProject, setActiveProject] = useState<DevelopmentProject | null>(null);

  const categories = [
    { id: 'all', label: t.work.allCategories },
    { id: 'roads', label: lang === 'mr' ? 'रस्ते व पायाभूत सुविधा' : 'Roads & Infrastructure' },
    { id: 'water', label: lang === 'mr' ? 'पाणीपुरवठा व सिंचन' : 'Water & Irrigation' },
    { id: 'education', label: lang === 'mr' ? 'शिक्षण व कौशल्य' : 'Education' },
    { id: 'health', label: lang === 'mr' ? 'आरोग्य व्यवस्था' : 'Healthcare' },
    { id: 'agriculture', label: lang === 'mr' ? 'शेती व सहकार' : 'Agriculture' },
    { id: 'rural', label: lang === 'mr' ? 'ग्रामीण विकास' : 'Rural Dev' },
    { id: 'facilities', label: lang === 'mr' ? 'नागरी सुविधा' : 'Public Facilities' },
    { id: 'social', label: lang === 'mr' ? 'सामाजिक उपक्रम' : 'Social Initiatives' },
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'water': return Droplet;
      case 'roads': return Route;
      case 'education': return GraduationCap;
      case 'health': return Activity;
      case 'agriculture': return Wheat;
      case 'rural': return Home;
      case 'facilities': return Building;
      default: return HeartHandshake;
    }
  };

  const filteredProjects = developmentProjects.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const titleText = p.title[lang].toLowerCase();
    const villageText = p.village.toLowerCase();
    const q = searchQuery.toLowerCase();
    const matchesQuery = !searchQuery || titleText.includes(q) || villageText.includes(q);
    return matchesCategory && matchesQuery;
  });

  return (
    <section id="work" className="py-12 sm:py-16 lg:py-24 bg-[#F7F8FA] border-b border-[#E7EAF0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E7EAF0] text-[#A66E2E] text-xs font-semibold mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C58B45]" />
              <span>{t.work.tag}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#17243A] tracking-tight">
              {t.work.heading}
            </h2>
            <p className="text-xs sm:text-sm lg:text-base text-[#667085] mt-1.5">
              {t.work.subheading}
            </p>
            <div className="w-12 h-1 bg-[#C58B45] mt-3 rounded-full" />
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#667085] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={lang === 'mr' ? 'विकासकाम किंवा गाव शोधा...' : 'Search project or village...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#E7EAF0] bg-white text-xs text-[#17243A] placeholder-[#667085] focus:outline-none focus:border-[#17243A] min-h-[44px]"
            />
          </div>
        </div>

        {/* Category Filter Horizontal Scroll */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-3 mb-6 sm:mb-8 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 sm:px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all min-h-[40px] flex items-center ${
                selectedCategory === cat.id
                  ? 'bg-[#17243A] text-white shadow-sm'
                  : 'bg-white text-[#667085] border border-[#E7EAF0] hover:text-[#17243A]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Cards Grid: 1 col on mobile, 2 col on md, 3 col on lg (ALL PHOTOS REMOVED) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredProjects.map((project, idx) => {
            const Icon = getCategoryIcon(project.category);
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.35, delay: (idx % 6) * 0.04, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                onClick={() => setActiveProject(project)}
                className="bg-white rounded-2xl border border-[#E7EAF0] p-5 sm:p-6 shadow-sm hover:shadow-card hover:border-[#17243A]/30 transition-all cursor-pointer flex flex-col justify-between group active:scale-[0.99]"
              >
                <div>
                  {/* Top Header Bar: Category Icon & Status Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3.5 pb-3 border-b border-[#F1F3F6]">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-xl bg-[#FAF5EE] border border-[#EAD7BE] flex items-center justify-center text-[#C58B45] shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#667085]">
                        {project.category}
                      </span>
                    </div>

                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                      project.status === 'Completed'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {project.status === 'Completed' ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : (
                        <Clock className="w-3 h-3" />
                      )}
                      <span>{project.status}</span>
                    </span>
                  </div>

                  {/* Village & Year Metadata */}
                  <div className="flex items-center justify-between text-xs text-[#667085] mb-2">
                    <span className="flex items-center gap-1 font-medium text-[#17243A]">
                      <MapPin className="w-3.5 h-3.5 text-[#C58B45] shrink-0" />
                      <span className="line-clamp-1">{project.village}</span>
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[11px] shrink-0">
                      <Calendar className="w-3 h-3" />
                      <span>{project.year}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm sm:text-base font-bold text-[#17243A] mb-2 group-hover:text-[#C58B45] transition-colors leading-snug line-clamp-2">
                    {project.title[lang]}
                  </h3>

                  {/* Description Excerpt */}
                  <p className="text-xs text-[#667085] leading-relaxed line-clamp-3 mb-4">
                    {project.description[lang]}
                  </p>
                </div>

                {/* Footer Action Bar */}
                <div className="pt-3 border-t border-[#F1F3F6] flex items-center justify-between text-xs font-semibold text-[#17243A]">
                  <span className="text-[10px] sm:text-[11px] font-mono text-[#667085] truncate max-w-[160px]">
                    {project.officialRef || 'SANCTIONED'}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[#C58B45] text-xs font-bold group-hover:translate-x-0.5 transition-transform shrink-0">
                    <span>{lang === 'mr' ? 'सविस्तर पहा' : 'View'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Informative Note */}
        <div className="mt-8 sm:mt-12 text-center text-xs text-[#667085] max-w-2xl mx-auto px-4">
          {t.work.placeholderNote}
        </div>

      </div>

      {/* Project Detail Modal (NO PHOTO) */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setActiveProject(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl bg-white rounded-2xl shadow-elevated border border-[#E7EAF0] overflow-hidden z-10 max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="px-5 py-4 border-b border-[#E7EAF0] flex items-center justify-between bg-[#F7F8FA]">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C58B45]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{lang === 'mr' ? 'अधिकृत विकास प्रकल्प' : 'Verified Project Record'}</span>
                </div>
                <button
                  onClick={() => setActiveProject(null)}
                  className="p-1.5 rounded-lg border border-[#E7EAF0] bg-white text-[#667085] hover:text-[#17243A] min-h-[36px] min-w-[36px] flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Scrollable Body */}
              <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#FAF5EE] text-[#A66E2E] border border-[#EAD7BE]">
                      {activeProject.status}
                    </span>
                    <span className="text-xs text-[#667085]">
                      {activeProject.year} • {activeProject.village}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#17243A] leading-snug">
                    {activeProject.title[lang]}
                  </h3>
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#667085] mb-1.5">
                    {lang === 'mr' ? 'प्रकल्प सविस्तर माहिती' : 'Project Description'}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#17243A] leading-relaxed">
                    {activeProject.description[lang]}
                  </p>
                </div>

                {/* Impact */}
                {activeProject.impact && (
                  <div className="p-3.5 sm:p-4 rounded-xl bg-[#FAF5EE] border border-[#EAD7BE]">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#A66E2E] mb-1">
                      {lang === 'mr' ? 'स्थानिक जनतेला लाभ / परिणाम' : 'Constituency Impact'}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#17243A] font-medium leading-relaxed">
                      {activeProject.impact[lang]}
                    </p>
                  </div>
                )}

                {/* Metadata Reference Box */}
                <div className="grid grid-cols-2 gap-3 p-3.5 bg-[#F7F8FA] rounded-xl text-xs border border-[#E7EAF0]">
                  <div>
                    <span className="text-[#667085] block">{t.work.locationLabel}:</span>
                    <span className="font-semibold text-[#17243A]">{activeProject.village}, {activeProject.taluka}</span>
                  </div>
                  <div>
                    <span className="text-[#667085] block">{t.work.officialRefLabel}:</span>
                    <span className="font-mono font-semibold text-[#17243A] truncate block">{activeProject.officialRef || 'SANCTIONED'}</span>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-5 py-3 border-t border-[#E7EAF0] bg-[#FFFFFF] flex justify-end">
                <button
                  onClick={() => setActiveProject(null)}
                  className="px-4 py-2 rounded-xl bg-[#17243A] text-white text-xs font-semibold hover:bg-[#243B53] transition-colors min-h-[40px]"
                >
                  {t.work.modalClose}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
