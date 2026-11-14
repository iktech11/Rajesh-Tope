import React, { useState, useEffect } from 'react';
import type { Language } from '../types';
import { translations } from '../data/translations';
import { Menu, X, Globe, Shield, ChevronDown } from 'lucide-react';

interface Props {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenAdmin: () => void;
}

export const Header: React.FC<Props> = ({ lang, onLanguageChange, onOpenAdmin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const t = translations[lang];

  // News, Gallery, and Public Activities permanently removed from navItems
  const navItems = [
    { id: 'home', label: t.nav.home, href: '#home' },
    { id: 'about', label: t.nav.about, href: '#about' },
    { id: 'journey', label: t.nav.journey, href: '#journey' },
    { id: 'ministerial', label: t.nav.ministerial, href: '#ministerial' },
    { id: 'ghansawangi', label: t.nav.ghansawangi, href: '#ghansawangi' },
    { id: 'work', label: t.nav.work, href: '#work' },
    { id: 'connect', label: t.nav.connect, href: '#connect' },
    { id: 'contact', label: t.nav.contact, href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPos = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const languages: { code: Language; label: string; native: string }[] = [
    { code: 'mr', label: 'Marathi', native: 'मराठी' },
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिंदी' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
          isScrolled
            ? 'bg-[#FFFFFF]/98 backdrop-blur-md border-b border-[#E7EAF0] shadow-sm py-2'
            : 'bg-[#FFFFFF] border-b border-[#E7EAF0]/80 py-2.5 sm:py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Monogram and Title */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('#home');
              }}
              className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none min-h-[44px]"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#17243A] border-2 border-[#C58B45] flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-sm sm:text-base font-sans tracking-wide">
                  RT
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-sm sm:text-base lg:text-lg font-bold tracking-tight text-[#17243A] uppercase font-sans leading-tight">
                    {t.leaderName}
                  </span>
                  <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#C58B45]" />
                </div>
                <span className="text-[10px] sm:text-xs text-[#667085] font-medium leading-none">
                  {lang === 'mr' ? 'माजी मंत्री, महाराष्ट्र शासन' : 'Former Minister, Maharashtra'}
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.href)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 relative min-h-[38px] flex items-center ${
                    activeSection === item.id
                      ? 'text-[#17243A] font-semibold bg-[#F7F8FA]'
                      : 'text-[#667085] hover:text-[#17243A] hover:bg-[#F7F8FA]/60'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-[#C58B45] rounded-full" />
                  )}
                </button>
              ))}
            </nav>

            {/* Right: Language Selector & Admin Portal Trigger & Mobile Hamburger */}
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              {/* Language Selector (Desktop) */}
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#E7EAF0] bg-[#FFFFFF] hover:bg-[#F7F8FA] text-xs font-medium text-[#17243A] transition-colors min-h-[40px]"
                  aria-label="Select language"
                  aria-expanded={langDropdownOpen}
                >
                  <Globe className="w-3.5 h-3.5 text-[#C58B45]" />
                  <span>
                    {languages.find((l) => l.code === lang)?.native}
                  </span>
                  <ChevronDown className="w-3 h-3 text-[#667085]" />
                </button>

                {langDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setLangDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-36 rounded-xl bg-white border border-[#E7EAF0] shadow-elevated z-20 py-1.5 animate-fadeIn">
                      <div className="px-3 py-1 text-[10px] uppercase tracking-wider text-[#667085] font-semibold">
                        Language / भाषा
                      </div>
                      {languages.map((l) => (
                        <button
                          key={l.code}
                          onClick={() => {
                            onLanguageChange(l.code);
                            setLangDropdownOpen(false);
                          }}
                          className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-[#F7F8FA] transition-colors min-h-[36px] ${
                            lang === l.code ? 'font-bold text-[#17243A] bg-[#FAF5EE]' : 'text-[#667085]'
                          }`}
                        >
                          <span>{l.native}</span>
                          <span className="text-[10px] text-[#667085]/80">{l.label}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Admin Portal quick trigger (Desktop) */}
              <button
                onClick={onOpenAdmin}
                className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E7EAF0] bg-[#F7F8FA] hover:bg-[#E7EAF0] text-xs font-medium text-[#17243A] transition-colors min-h-[40px]"
                title="Admin Control Room"
              >
                <Shield className="w-3.5 h-3.5 text-[#C58B45]" />
                <span>{t.nav.admin}</span>
              </button>

              {/* Mobile Menu Button (Accessible touch size 44px) */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-xl border border-[#E7EAF0] bg-[#FFFFFF] text-[#17243A] hover:bg-[#F7F8FA] focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center active:scale-95"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-0 right-0 bottom-0 w-[86%] max-w-sm bg-white border-l border-[#E7EAF0] p-5 shadow-2xl overflow-y-auto flex flex-col justify-between">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-[#E7EAF0] mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#17243A] border border-[#C58B45] flex items-center justify-center text-white font-bold text-sm">
                    RT
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#17243A] leading-tight">{t.leaderName}</h3>
                    <p className="text-[10px] text-[#667085]">{t.officialTag}</p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg border border-[#E7EAF0] text-[#667085] hover:text-[#17243A] min-h-[40px] min-w-[40px] flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Language Selector inside Mobile Menu */}
              <div className="mb-5 p-3 rounded-xl bg-[#F7F8FA] border border-[#E7EAF0]">
                <p className="text-[10px] font-bold uppercase text-[#667085] mb-2 tracking-wider flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#C58B45]" />
                  <span>Language / भाषा निवडा</span>
                </p>
                <div className="grid grid-cols-3 gap-1.5">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => onLanguageChange(l.code)}
                      className={`py-2 px-2 rounded-lg text-xs font-semibold border text-center transition-all min-h-[40px] flex items-center justify-center ${
                        lang === l.code
                          ? 'border-[#17243A] bg-[#17243A] text-white'
                          : 'border-[#E7EAF0] bg-white text-[#667085] hover:border-[#17243A]/40'
                      }`}
                    >
                      {l.native}
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation Links (Touch Friendly >= 44px) */}
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.href)}
                    className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-left text-sm font-semibold transition-colors min-h-[44px] ${
                      activeSection === item.id
                        ? 'bg-[#17243A] text-white'
                        : 'text-[#17243A] hover:bg-[#F7F8FA] active:bg-[#E7EAF0]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {activeSection === item.id && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C58B45]" />
                    )}
                  </button>
                ))}
              </nav>
            </div>

            {/* Drawer Footer */}
            <div className="pt-4 border-t border-[#E7EAF0] mt-6">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#F7F8FA] border border-[#E7EAF0] text-xs font-bold text-[#17243A] hover:bg-[#E7EAF0] transition-colors min-h-[44px]"
              >
                <Shield className="w-4 h-4 text-[#C58B45]" />
                <span>{t.nav.admin}</span>
              </button>
              <p className="text-[10px] text-center text-[#667085] mt-2.5">
                {t.leaderFullName} • Ghansawangi, Jalna
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
