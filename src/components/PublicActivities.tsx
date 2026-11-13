import React from 'react';
import type { Language } from '../types';
import { translations } from '../data/translations';
import { motion } from 'framer-motion';
import { Users, MapPin, HandHeart, Megaphone } from 'lucide-react';

interface Props {
  lang: Language;
}

export const PublicActivities: React.FC<Props> = ({ lang }) => {
  const t = translations[lang];

  const activities = [
    {
      title: {
        mr: 'गावभेट दौरे व थेट शेतकरी संवाद',
        en: 'Village Outreach & Agrarian Dialogues',
        hi: 'ग्राम भेंट दौरे एवं कृषक संवाद'
      },
      tag: {
        mr: 'गावभेट',
        en: 'Field Visit',
        hi: 'ग्राम भेंट'
      },
      desc: {
        mr: 'घनसावंगी व अंबड तालुक्यातील खेड्यापाड्यांमध्ये जाऊन थेट शेतकऱ्यांच्या बांधावर पाणी, वीज आणि पीक विम्याच्या समस्या जाणून घेणे.',
        en: 'Field interactions directly at farm embankments to assess irrigation water release, agricultural power availability, and crop insurance.',
        hi: 'गांवों में जाकर किसानों से सीधे मिलकर सिंचाई, बिजली और फसल बीमा संबंधी समस्याओं की जानकारी लेना।'
      },
      location: 'घनसावंगी तालुका ग्रामीण भाग',
      icon: MapPin
    },
    {
      title: {
        mr: 'नागरिक दरबार व समस्या निवारण सत्रे',
        en: 'Citizen Grievance Redressal Hearings',
        hi: 'जनता दरबार एवं शिकायत निवारण'
      },
      tag: {
        mr: 'जनसंवाद',
        en: 'Grievance Redressal',
        hi: 'जनसंवाद'
      },
      desc: {
        mr: 'मध्यवर्ती कार्यालयात नागरिकांची निवेदने, वृद्धापकाळ निवृत्तीवेतन, रस्ते दुरुस्ती व वैयक्तिक अडचणींवर शासकीय अधिकाऱ्यांशी समन्वय साधून तत्काळ तोडगा.',
        en: 'Regular public office hearings resolving pension claims, village connectivity representations, and coordinating with administrative heads.',
        hi: 'कार्यालय में नागरिकों के आवेदनों, पेंशन, सड़क मरम्मत एवं व्यक्तिगत समस्याओं पर तुरंत समाधान।'
      },
      location: 'जालना व घनसावंगी संपर्क कार्यालय',
      icon: Users
    },
    {
      title: {
        mr: 'मोफत आरोग्य तपासणी व सामाजिक शिबिरे',
        en: 'Community Healthcare & Diagnostic Camps',
        hi: 'निःशुल्क स्वास्थ्य एवं चिकित्सा शिविर'
      },
      tag: {
        mr: 'आरोग्य सेवा',
        en: 'Healthcare Outreach',
        hi: 'स्वास्थ्य सेवा'
      },
      desc: {
        mr: 'विशेषतः ग्रामीण भागातील महिला, वृद्ध आणि बालकांसाठी मोफत नेत्र तपासणी, शस्त्रक्रिया व औषधोपचार शिबिरांचे सातत्यपूर्ण आयोजन.',
        en: 'Periodic free health camps providing screening, cataract surgeries, and free essential medication for senior citizens and women.',
        hi: 'ग्रामीण महिलाओं, बुजुर्गों एवं बच्चों हेतु निःशुल्क नेत्र परीक्षण एवं स्वास्थ्य जांच शिविर।'
      },
      location: 'तीर्थपुरी, शहागड व परिसरातील उपकेंद्रे',
      icon: HandHeart
    },
    {
      title: {
        mr: 'सहकार व शेतकरी मेळावे',
        en: 'Cooperative Assemblies & Farmer Conventions',
        hi: 'सहकार एवं किसान सम्मेलन'
      },
      tag: {
        mr: 'सहकार',
        en: 'Cooperative',
        hi: 'सहकारिता'
      },
      desc: {
        mr: 'ऊस उत्पादक, दुग्ध उत्पादक व स्थानिक सहकारी पतसंस्थांच्या बळकटीकरणासाठी मार्गदर्शक मेळावे व चर्चासत्रे.',
        en: 'Conventions strengthening sugarcane growers, dairy cooperatives, and rural credit societies for self-sufficient agribusiness.',
        hi: 'गन्ना किसानों एवं दुग्ध उत्पादकों के आर्थिक सशक्तिकरण हेतु सहकारी सम्मेलन।'
      },
      location: 'समर्थ नगर, अंकुशनगर',
      icon: Megaphone
    }
  ];

  return (
    <section id="activities" className="py-12 sm:py-16 lg:py-24 bg-[#FFFFFF] border-b border-[#E7EAF0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5EE] border border-[#EAD7BE] text-[#A66E2E] text-xs font-semibold mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C58B45]" />
            <span>{t.activities.tag}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#17243A] tracking-tight">
            {t.activities.heading}
          </h2>
          <p className="text-xs sm:text-sm lg:text-base text-[#667085] mt-1.5">
            {t.activities.subheading}
          </p>
          <div className="w-12 h-1 bg-[#C58B45] mt-3 rounded-full" />
        </div>

        {/* Editorial Layout: Clean mobile-first cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {activities.map((act, idx) => {
            const Icon = act.icon;
            return (
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
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#F1F3F6]">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-[#FAF5EE] text-[#A66E2E] border border-[#EAD7BE]">
                      {act.tag[lang]}
                    </span>
                    <span className="text-[11px] font-mono text-[#667085]">
                      Jan Sampark
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-[#667085] mb-2 font-medium">
                    <Icon className="w-3.5 h-3.5 text-[#C58B45] shrink-0" />
                    <span className="line-clamp-1">{act.location}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#17243A] mb-2 leading-snug">
                    {act.title[lang]}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">
                    {act.desc[lang]}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F1F3F6] flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#17243A]">
                    {lang === 'mr' ? 'सतत जनतेच्या संपर्कात' : 'Continuous Citizen Engagement'}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#C58B45]" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
