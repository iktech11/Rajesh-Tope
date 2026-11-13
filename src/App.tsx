import React, { useState, useEffect } from 'react';
import type { Language } from './types';
import { LoadingScreen } from './components/LoadingScreen';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutMe } from './components/AboutMe';
import { PoliticalJourney } from './components/PoliticalJourney';
import { MinisterialExperience } from './components/MinisterialExperience';
import { GhansawangiConstituency } from './components/GhansawangiConstituency';
import { DevelopmentWork } from './components/DevelopmentWork';
import { PublicActivities } from './components/PublicActivities';
import { PublicConnect } from './components/PublicConnect';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/AdminDashboard';

export function App() {
  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('rt_preferred_lang');
      if (saved === 'mr' || saved === 'en' || saved === 'hi') return saved as Language;
    } catch {}
    return 'en'; // Default to English as requested
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    try {
      localStorage.setItem('rt_preferred_lang', newLang);
    } catch {}
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      setIsAdminOpen(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#17243A] flex flex-col font-sans selection:bg-[#C58B45]/20 selection:text-[#17243A] overflow-x-hidden w-full">
      {/* 2-Second Branded Loading Screen on initial visit */}
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} lang={lang} />
      )}

      {/* Sticky Mobile-First Header */}
      <Header
        lang={lang}
        onLanguageChange={handleLanguageChange}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1 w-full overflow-x-hidden">
        <Hero lang={lang} />
        <AboutMe lang={lang} />
        <PoliticalJourney lang={lang} />
        <MinisterialExperience lang={lang} />
        <GhansawangiConstituency lang={lang} />
        <DevelopmentWork lang={lang} />
        <PublicActivities lang={lang} />
        <PublicConnect lang={lang} />
        <ContactSection lang={lang} />
      </main>

      {/* Footer with Developer Credit */}
      <Footer
        lang={lang}
        onLanguageChange={handleLanguageChange}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Admin Management Dashboard */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        lang={lang}
      />
    </div>
  );
}

export default App;
