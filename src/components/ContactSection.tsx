import React from 'react';
import type { Language } from '../types';
import { translations } from '../data/translations';
import { motion } from 'framer-motion';
import { 
  Building2, 
  MapPin, 
  Mail, 
  Clock, 
  ExternalLink,
} from 'lucide-react';

interface Props {
  lang: Language;
}

// Colored brand SVGs for Facebook and Instagram
const FacebookColorIcon = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramColorIcon = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
    <defs>
      <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#fdf497" />
        <stop offset="5%" stopColor="#fdf497" />
        <stop offset="45%" stopColor="#fd5949" />
        <stop offset="60%" stopColor="#d6249f" />
        <stop offset="100%" stopColor="#285AEB" />
      </linearGradient>
    </defs>
    <path fill="url(#ig-grad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

export const ContactSection: React.FC<Props> = ({ lang }) => {
  const t = translations[lang];

  const offices = [
    {
      title: t.contact.ghansawangiOfficeTitle,
      address: t.contact.ghansawangiAddress,
      tag: 'Ghansawangi Taluka',
      mapUrl: 'https://www.google.com/maps/place/Ghansawangi,+Maharashtra'
    },
    {
      title: t.contact.jalnaOfficeTitle,
      address: t.contact.jalnaAddress,
      tag: 'Jalna District HQ',
      mapUrl: 'https://www.google.com/maps/place/Jalna,+Maharashtra'
    },
    {
      title: t.contact.mumbaiOfficeTitle,
      address: t.contact.mumbaiAddress,
      tag: 'State Capital Liaison',
      mapUrl: 'https://www.google.com/maps/place/Mantralaya,+Mumbai'
    }
  ];

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-24 bg-[#F7F8FA] border-b border-[#E7EAF0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E7EAF0] text-[#A66E2E] text-xs font-semibold mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C58B45]" />
            <span>{t.contact.tag}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#17243A] tracking-tight">
            {t.contact.heading}
          </h2>
          <p className="text-xs sm:text-sm lg:text-base text-[#667085] mt-1.5">
            {t.contact.subheading}
          </p>
          <div className="w-12 h-1 bg-[#C58B45] mt-3 rounded-full" />
        </div>

        {/* Office Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {offices.map((office, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl border border-[#E7EAF0] p-5 sm:p-6 shadow-sm hover:shadow-card hover:border-[#17243A]/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5 pb-3 border-b border-[#F1F3F6]">
                  <span className="p-2 rounded-lg bg-[#FAF5EE] text-[#C58B45]">
                    <Building2 className="w-4 h-4" />
                  </span>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#667085] bg-[#F7F8FA] px-2 py-0.5 rounded">
                    {office.tag}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-[#17243A] mb-2 leading-snug">
                  {office.title}
                </h3>

                <p className="text-xs text-[#667085] leading-relaxed mb-4">
                  {office.address}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F1F3F6]">
                <a
                  href={office.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#17243A] hover:text-[#C58B45] transition-colors py-1 min-h-[44px]"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#C58B45]" />
                  <span>{lang === 'mr' ? 'गुगल मॅप्सवर स्थान पहा' : 'View Location on Maps'}</span>
                  <ExternalLink className="w-3 h-3 text-[#667085]" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Communication Bar: Timings, Direct Email & Verified Social Profiles */}
        <div className="bg-white rounded-2xl border border-[#E7EAF0] p-5 sm:p-8 lg:p-9 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Working Hours & Direct Gmail Action */}
          <div className="lg:col-span-6 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#667085]">
              {lang === 'mr' ? 'कार्यालयीन कार्यप्रणाली व संपर्क' : 'Administrative Hours & Communication'}
            </h4>
            
            <div className="flex items-start gap-3">
              <span className="p-2 rounded-lg bg-[#F7F8FA] text-[#C58B45] mt-0.5">
                <Clock className="w-4 h-4" />
              </span>
              <div>
                <div className="text-xs text-[#667085] font-medium">{t.contact.workingHoursLabel}</div>
                <div className="text-xs sm:text-sm font-bold text-[#17243A]">{t.contact.workingHoursVal}</div>
              </div>
            </div>

            {/* Direct Email with click-to-mail */}
            <div className="flex items-start gap-3">
              <span className="p-2 rounded-lg bg-[#FAF5EE] text-[#C58B45] mt-0.5">
                <Mail className="w-4 h-4" />
              </span>
              <div>
                <div className="text-xs text-[#667085] font-medium">{t.contact.emailLabel}</div>
                <a
                  href="mailto:rajeshtope11@gmail.com"
                  className="text-sm sm:text-base font-mono font-bold text-[#17243A] hover:text-[#C58B45] underline transition-colors block mt-0.5"
                  title="Send Email to Rajesh Tope"
                >
                  rajeshtope11@gmail.com
                </a>
                <span className="text-[11px] text-[#667085]">
                  {lang === 'mr' ? 'थेट ईमेल पाठवण्यासाठी येथे क्लिक करा' : 'Click to compose email directly'}
                </span>
              </div>
            </div>
          </div>

          {/* Official Social Media Profiles (Facebook & Instagram in official colors, X & YouTube removed) */}
          <div className="lg:col-span-6 border-t lg:border-t-0 lg:border-l border-[#E7EAF0] lg:pl-8 pt-5 lg:pt-0">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#667085] mb-3 sm:mb-4">
              {t.contact.socialHeading}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Facebook Card */}
              <a
                href="https://www.facebook.com/share/1Ep5yQjY33/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 sm:p-4 rounded-xl border border-[#E7EAF0] bg-[#F7F8FA] hover:bg-[#FFFFFF] hover:border-[#1877F2]/40 transition-all flex items-center justify-between group min-h-[56px]"
              >
                <div className="flex items-center gap-3">
                  <FacebookColorIcon />
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-[#17243A] group-hover:text-[#1877F2] transition-colors leading-tight">
                      Rajesh Tope
                    </div>
                    <div className="text-[10px] text-[#667085]">Facebook Profile</div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-[#667085] group-hover:text-[#1877F2] transition-colors" />
              </a>

              {/* Instagram Card */}
              <a
                href="https://www.instagram.com/165rajesh?vrfl=MWQ5aTh0cWt4cHc4"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 sm:p-4 rounded-xl border border-[#E7EAF0] bg-[#F7F8FA] hover:bg-[#FFFFFF] hover:border-[#d6249f]/40 transition-all flex items-center justify-between group min-h-[56px]"
              >
                <div className="flex items-center gap-3">
                  <InstagramColorIcon />
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-[#17243A] group-hover:text-[#d6249f] transition-colors leading-tight">
                      165rajesh
                    </div>
                    <div className="text-[10px] text-[#667085]">Instagram Profile</div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-[#667085] group-hover:text-[#d6249f] transition-colors" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
