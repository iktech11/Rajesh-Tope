import React, { useState } from 'react';
import type { Language } from '../types';
import { translations } from '../data/translations';
import { ArrowUp, ShieldCheck, X, ExternalLink } from 'lucide-react';

interface Props {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<Props> = ({ lang, onLanguageChange, onOpenAdmin }) => {
  const t = translations[lang];
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // News and Gallery permanently removed
  const navLinks = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.journey, href: '#journey' },
    { label: t.nav.ministerial, href: '#ministerial' },
    { label: t.nav.ghansawangi, href: '#ghansawangi' },
    { label: t.nav.work, href: '#work' },
    { label: t.nav.activities, href: '#activities' },
    { label: t.nav.connect, href: '#connect' },
    { label: t.nav.contact, href: '#contact' },
  ];

  return (
    <footer className="bg-[#17243A] text-white pt-12 sm:pt-16 pb-10 sm:pb-12 border-t border-[#0D192B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-10 border-b border-white/10">
          
          {/* Col 1: Identity & Credentials */}
          <div className="lg:col-span-5 space-y-3.5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-[#C58B45] flex items-center justify-center font-bold text-white font-sans shrink-0">
                RT
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold tracking-tight text-white uppercase font-sans">
                  {t.leaderName}
                </h3>
                <p className="text-xs text-[#C58B45] font-medium">
                  {lang === 'mr' ? 'माजी मंत्री, महाराष्ट्र शासन' : 'Former Minister, Maharashtra'}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md font-normal">
              {t.footer.aboutSummary}
            </p>

            <div className="pt-1 flex items-center gap-2.5 text-xs text-slate-400">
              <span className="inline-block w-2 h-2 rounded-full bg-[#C58B45]" />
              <span>Ghansawangi • Jalna • Maharashtra</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C58B45] font-mono">
              {t.footer.quickLinks}
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {navLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  className="text-slate-300 hover:text-white hover:underline transition-colors py-1 min-h-[36px] flex items-center"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Col 3: Language & Admin */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C58B45] font-mono">
              Language / भाषा
            </h4>
            
            <div className="flex items-center gap-2">
              {[
                { code: 'mr', label: 'मराठी' },
                { code: 'en', label: 'English' },
                { code: 'hi', label: 'हिंदी' },
              ].map((l) => (
                <button
                  key={l.code}
                  onClick={() => onLanguageChange(l.code as any)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors min-h-[40px] flex items-center justify-center ${
                    lang === l.code
                      ? 'border-[#C58B45] bg-[#C58B45]/20 text-white font-bold'
                      : 'border-white/10 text-slate-300 hover:border-white/30'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenAdmin}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 hover:text-white transition-colors min-h-[44px]"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#C58B45]" />
                <span>{lang === 'mr' ? 'प्रशासक पोर्टल लॉगइन' : 'Admin Portal Access'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Lower Disclaimer & Developer Credit Row */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="text-center sm:text-left">
            <p>{t.footer.copyright}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">{t.footer.disclaimer}</p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setPrivacyOpen(true)}
              className="hover:text-white underline transition-colors min-h-[36px] flex items-center"
            >
              {t.footer.privacyPolicy}
            </button>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors text-xs min-h-[40px]"
              aria-label="Back to Top"
            >
              <span>{t.footer.backToTop}</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#C58B45]" />
            </button>
          </div>
        </div>

        {/* Developer Credit Bar requested by user */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-center text-center">
          <a
            href="https://imran-tech-portfolio.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-[#C58B45] font-medium transition-colors group px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10"
          >
            <span>Designed & Developed by <strong className="text-white group-hover:text-[#C58B45]">Imran Tech</strong></span>
            <ExternalLink className="w-3 h-3 text-[#C58B45] group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

      </div>

      {/* Privacy Policy Modal */}
      {privacyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setPrivacyOpen(false)}
          />
          <div className="relative w-full max-w-lg bg-white text-[#17243A] rounded-2xl p-6 shadow-elevated border border-[#E7EAF0] z-10 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7EAF0] mb-4">
              <h3 className="font-bold text-base text-[#17243A]">
                {t.footer.privacyPolicy} / गोपनीयता धोरण
              </h3>
              <button
                onClick={() => setPrivacyOpen(false)}
                className="p-1.5 rounded-lg border border-[#E7EAF0] text-[#667085] hover:text-[#17243A]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3 text-xs text-[#667085] leading-relaxed">
              <p>
                <strong>१. माहिती गोळा करणे:</strong> हे अधिकृत संकेतस्थळ नागरिकांच्या अडचणी व सार्वजनिक निवेदने प्राप्त करण्यासाठी जनसंवाद अर्ज वापरते. नागरिकांनी स्वेच्छेने दिलेली माहिती केवळ कार्यालयीन पाठपुराव्यासाठी वापरली जाते.
              </p>
              <p>
                <strong>२. गोपनीयता:</strong> कोणत्याही नागरिकाची वैयक्तिक माहिती कोणत्याही तृतीय पक्षाला विकली किंवा व्यावसायिक कारणासाठी दिली जात नाही.
              </p>
              <p>
                <strong>३. अधिकृत नोंदी:</strong> या संकेतस्थळावर प्रदर्शित केलेले पोर्टफोलिओ, कार्यकाळ आणि निवडणूक निकाल शासकीय राजपत्रांवर आधारित आहेत.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-[#E7EAF0] text-right">
              <button
                onClick={() => setPrivacyOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#17243A] text-white text-xs font-semibold"
              >
                समजले (Close)
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
