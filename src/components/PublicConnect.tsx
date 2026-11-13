import React, { useState } from 'react';
import type { Language } from '../types';
import { translations } from '../data/translations';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  Send, 
  CheckCircle2, 
  FileText, 
  User, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  RotateCcw,
  Clock,
  AlertCircle
} from 'lucide-react';

interface Props {
  lang: Language;
}

export const PublicConnect: React.FC<Props> = ({ lang }) => {
  const t = translations[lang];

  // Exactly 5 fields
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    village: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = lang === 'mr' 
        ? 'कृपया आपले पूर्ण नाव प्रविष्ट करा' 
        : lang === 'hi' 
        ? 'कृपया अपना पूरा नाम लिखें' 
        : 'Full Name is required';
    }

    const cleanMobile = formData.mobile.replace(/\D/g, '');
    if (!cleanMobile || cleanMobile.length !== 10) {
      newErrors.mobile = lang === 'mr' 
        ? '१० अंकी वैध मोबाईल नंबर आवश्यक आहे' 
        : lang === 'hi' 
        ? '१० अंकों का मान्य मोबाइल नंबर दर्ज करें' 
        : 'Valid 10-digit mobile number is required';
    }

    if (!formData.village.trim()) {
      newErrors.village = lang === 'mr' 
        ? 'कृपया गाव किंवा शहराचे नाव प्रविष्ट करा' 
        : lang === 'hi' 
        ? 'कृपया गांव या शहर का नाम लिखें' 
        : 'Village / City is required';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = lang === 'mr' 
        ? 'कृपया निवेदनासाठी विषय प्रविष्ट करा' 
        : lang === 'hi' 
        ? 'कृपया विषय लिखें' 
        : 'Subject is required';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = lang === 'mr' 
        ? 'किमान १० अक्षरांचे सविस्तर निवेदन आवश्यक आहे' 
        : lang === 'hi' 
        ? 'कम से कम १० अक्षरों का विस्तृत विवरण आवश्यक है' 
        : 'Detailed representation (min 10 characters) is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) return;

    setSubmitting(true);

    try {
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          mobile: formData.mobile.replace(/\D/g, ''),
          village: formData.village.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        })
      });

      if (response.ok) {
        const data = await response.json();
        setSubmittedCode(data.refNo);
      } else {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'Server submission failed');
      }
    } catch (err: any) {
      // Graceful fallback to client persistence if API server is not running
      console.warn('API error, saving submission locally:', err.message);
      const fallbackRef = `RT-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
      
      try {
        const localSub = {
          id: `sub-${Date.now()}`,
          refNo: fallbackRef,
          fullName: formData.fullName.trim(),
          mobile: formData.mobile.replace(/\D/g, ''),
          village: formData.village.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          date: new Date().toISOString().split('T')[0],
          status: 'New'
        };
        const existing = JSON.parse(localStorage.getItem('rajesh_tope_submissions') || '[]');
        localStorage.setItem('rajesh_tope_submissions', JSON.stringify([localSub, ...existing]));
      } catch (storageErr) {}

      setSubmittedCode(fallbackRef);
    } finally {
      setSubmitting(false);
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#17243A', '#C58B45', '#EAD7BE']
        });
      } catch (e) {}
    }
  };

  const resetForm = () => {
    setSubmittedCode(null);
    setServerError(null);
    setFormData({
      fullName: '',
      mobile: '',
      village: '',
      subject: '',
      message: '',
    });
    setErrors({});
  };

  return (
    <section id="connect" className="py-12 sm:py-16 lg:py-24 bg-[#FFFFFF] border-b border-[#E7EAF0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5EE] border border-[#EAD7BE] text-[#A66E2E] text-xs font-semibold mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C58B45]" />
            <span>{t.connect.tag}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#17243A] tracking-tight">
            {t.connect.heading}
          </h2>
          <p className="text-xs sm:text-sm lg:text-base text-[#667085] mt-1.5">
            {t.connect.subheading}
          </p>
          <div className="w-12 h-1 bg-[#C58B45] mt-3 rounded-full" />
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
          
          {/* Left Column: Guidelines & Transparency Context */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            <div className="bg-[#F7F8FA] rounded-2xl p-5 sm:p-7 border border-[#E7EAF0]">
              <h3 className="text-sm sm:text-base font-bold text-[#17243A] mb-2.5 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#C58B45] shrink-0" />
                <span>{lang === 'mr' ? 'पारदर्शक नागरिक सहभाग' : lang === 'hi' ? 'पारदर्शी नागरिक सहभागिता' : 'Citizen Charter & Transparency'}</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#667085] leading-relaxed mb-4">
                {lang === 'mr'
                  ? 'घनसावंगी, अंबड, जालना परिसरातील प्रत्येक नागरिकाचा प्रश्न महत्त्वाचा आहे. आपले निवेदन थेट जनसंपर्क कार्यालयाकडे पाठवले जाते आणि संबंधित विभागांशी पत्रव्यवहार केला जातो.'
                  : lang === 'hi'
                  ? 'घनसावंगी एवं जालना क्षेत्र के प्रत्येक नागरिक का प्रश्न महत्वपूर्ण है। आपका आवेदन सीधे जनसंपर्क कार्यालय में दर्ज कर संबंधित विभागों से समन्वय किया जाता है।'
                  : 'Every citizen’s voice from Ghansawangi, Ambad, and Jalna is valued. All submitted petitions are catalogued directly and pursued with relevant government authorities.'}
              </p>

              <div className="space-y-2.5 pt-3.5 border-t border-[#E7EAF0] text-xs text-[#17243A]">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C58B45] shrink-0 mt-0.5" />
                  <span>{lang === 'mr' ? 'प्रत्येक निवेदनासाठी अधिकृत संदर्भ क्रमांक (Tracking Ref ID)' : 'Official unique tracking reference code generated instantly'}</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C58B45] shrink-0 mt-0.5" />
                  <span>{lang === 'mr' ? 'स्थानिक जनसंपर्क कार्यालयाद्वारे पडताळणी व पाठपुरावा' : 'Direct liaison with constituency administrative desks'}</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C58B45] shrink-0 mt-0.5" />
                  <span>{lang === 'mr' ? 'गोपनीय व सुरक्षित माहिती साठवण' : 'Strict privacy and non-partisan handling'}</span>
                </div>
              </div>
            </div>

            {/* Quick Contact Desk */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E7EAF0] shadow-sm">
              <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#667085] mb-1.5">
                {lang === 'mr' ? 'थेट जनसंपर्क मदत केंद्र' : 'Liaison Desk Contact'}
              </div>
              <div className="text-sm sm:text-base font-bold text-[#17243A]">
                Office of Rajesh Tope
              </div>
              <div className="text-xs text-[#667085] mt-1 space-y-0.5">
                <div>Ghansawangi • Jalna • Mumbai Liaison</div>
                <div>Mon – Sat: 10:00 AM to 06:00 PM</div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean 5-Field Interactive Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-[#E7EAF0] p-5 sm:p-8 lg:p-9 shadow-card">
              <AnimatePresence mode="wait">
                {submittedCode ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-6 sm:py-8 space-y-4 sm:space-y-5"
                  >
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-50 border-2 border-emerald-500 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                      <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
                    </div>

                    <div>
                      <h3 className="text-lg sm:text-2xl font-bold text-[#17243A]">
                        {t.connect.form.successHeading}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#667085] mt-1.5 max-w-md mx-auto">
                        {t.connect.form.successMessage}
                      </p>
                    </div>

                    <div className="p-3.5 sm:p-4 rounded-xl bg-[#FAF5EE] border border-[#EAD7BE] max-w-sm mx-auto">
                      <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#A66E2E] block">
                        {t.connect.form.refCodeText}
                      </span>
                      <span className="text-base sm:text-lg font-mono font-bold text-[#17243A] tracking-wider mt-0.5 block select-all">
                        {submittedCode}
                      </span>
                    </div>

                    <p className="text-xs text-[#667085]">
                      {lang === 'mr'
                        ? 'कृपया हा क्रमांक भविष्यातील संदर्भासाठी नोंदवून ठेवा.'
                        : lang === 'hi'
                        ? 'कृपया भविष्य के संदर्भ हेतु यह क्रमांक सुरक्षित रखें।'
                        : 'Kindly preserve this registration reference for future communication.'}
                    </p>

                    <button
                      onClick={resetForm}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-[#E7EAF0] bg-white hover:bg-[#F7F8FA] text-xs font-semibold text-[#17243A] transition-colors min-h-[44px]"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{t.connect.form.submitAnother}</span>
                    </button>
                  </motion.div>
                ) : (
                  <form key="form" onSubmit={handleSubmit} className="space-y-4">
                    {serverError && (
                      <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{serverError}</span>
                      </div>
                    )}

                    {/* Field 1: Full Name */}
                    <div>
                      <label className="block text-xs font-semibold text-[#17243A] mb-1.5">
                        {t.connect.form.fullName} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-[#667085] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder={t.connect.form.fullNamePlaceholder}
                          className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl border text-xs sm:text-sm text-[#17243A] placeholder-[#667085]/70 focus:outline-none transition-colors min-h-[44px] ${
                            errors.fullName ? 'border-red-500 bg-red-50/20' : 'border-[#E7EAF0] focus:border-[#17243A]'
                          }`}
                        />
                      </div>
                      {errors.fullName && <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>}
                    </div>

                    {/* Field 2: Mobile Number */}
                    <div>
                      <label className="block text-xs font-semibold text-[#17243A] mb-1.5">
                        {t.connect.form.mobile} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-[#667085] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="tel"
                          inputMode="tel"
                          maxLength={10}
                          value={formData.mobile}
                          onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                          placeholder={t.connect.form.mobilePlaceholder}
                          className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl border text-xs sm:text-sm text-[#17243A] placeholder-[#667085]/70 focus:outline-none transition-colors min-h-[44px] ${
                            errors.mobile ? 'border-red-500 bg-red-50/20' : 'border-[#E7EAF0] focus:border-[#17243A]'
                          }`}
                        />
                      </div>
                      {errors.mobile && <p className="text-[11px] text-red-500 mt-1">{errors.mobile}</p>}
                    </div>

                    {/* Field 3: Village / City */}
                    <div>
                      <label className="block text-xs font-semibold text-[#17243A] mb-1.5">
                        {t.connect.form.village} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-[#667085] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          value={formData.village}
                          onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                          placeholder={t.connect.form.villagePlaceholder}
                          className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl border text-xs sm:text-sm text-[#17243A] placeholder-[#667085]/70 focus:outline-none transition-colors min-h-[44px] ${
                            errors.village ? 'border-red-500 bg-red-50/20' : 'border-[#E7EAF0] focus:border-[#17243A]'
                          }`}
                        />
                      </div>
                      {errors.village && <p className="text-[11px] text-red-500 mt-1">{errors.village}</p>}
                    </div>

                    {/* Field 4: Subject */}
                    <div>
                      <label className="block text-xs font-semibold text-[#17243A] mb-1.5">
                        {t.connect.form.subject} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FileText className="w-4 h-4 text-[#667085] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          placeholder={t.connect.form.subjectPlaceholder}
                          className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl border text-xs sm:text-sm text-[#17243A] placeholder-[#667085]/70 focus:outline-none transition-colors min-h-[44px] ${
                            errors.subject ? 'border-red-500 bg-red-50/20' : 'border-[#E7EAF0] focus:border-[#17243A]'
                          }`}
                        />
                      </div>
                      {errors.subject && <p className="text-[11px] text-red-500 mt-1">{errors.subject}</p>}
                    </div>

                    {/* Field 5: Your Detailed Representation / Message (Large Textarea) */}
                    <div>
                      <label className="block text-xs font-semibold text-[#17243A] mb-1.5">
                        {t.connect.form.message} <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder={t.connect.form.messagePlaceholder}
                        className={`w-full p-3.5 rounded-xl border text-xs sm:text-sm text-[#17243A] placeholder-[#667085]/70 focus:outline-none transition-colors leading-relaxed ${
                          errors.message ? 'border-red-500 bg-red-50/20' : 'border-[#E7EAF0] focus:border-[#17243A]'
                        }`}
                      />
                      {errors.message && <p className="text-[11px] text-red-500 mt-1">{errors.message}</p>}
                    </div>

                    {/* Submit Button (Accessible touch size 48px) */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#17243A] hover:bg-[#243B53] text-white text-xs sm:text-sm font-semibold transition-all shadow-sm disabled:opacity-50 min-h-[48px] active:scale-[0.99]"
                      >
                        {submitting ? (
                          <>
                            <Clock className="w-4 h-4 animate-spin text-[#C58B45]" />
                            <span>{t.connect.form.submitting}</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 text-[#C58B45]" />
                            <span>{t.connect.form.submit}</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-[11px] text-[#667085] text-center pt-1 leading-normal">
                      {t.connect.disclaimer}
                    </p>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
