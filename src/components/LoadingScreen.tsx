import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onComplete: () => void;
  lang?: 'mr' | 'en' | 'hi';
}

export const LoadingScreen: React.FC<Props> = ({ onComplete, lang = 'mr' }) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 2000; // 2 seconds

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (elapsed >= duration) {
        clearInterval(interval);
        setTimeout(() => {
          setVisible(false);
          setTimeout(onComplete, 400);
        }, 150);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FFFFFF] text-[#17243A] px-4"
          role="status"
          aria-live="polite"
        >
          {/* Subtle watermarked corner seals */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 text-[10px] sm:text-[11px] font-mono tracking-widest text-[#667085]/60 uppercase">
            Govt. of Maharashtra
          </div>
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 text-[10px] sm:text-[11px] font-mono tracking-widest text-[#667085]/60 uppercase">
            Ghansawangi • Jalna
          </div>

          <motion.div
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col items-center max-w-sm px-4 text-center"
          >
            {/* Elegant Monogram */}
            <div className="relative mb-5 sm:mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#17243A] border-2 border-[#C58B45] flex items-center justify-center shadow-lg shadow-navy-900/10">
                <span className="text-2xl sm:text-3xl font-bold tracking-wider text-[#FFFFFF] font-sans">
                  RT
                </span>
                <span className="absolute -top-1 -right-1 sm:-top-1.5 sm:-right-1.5 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-[#C58B45] border-2 border-white" />
              </div>
            </div>

            {/* Title & Distinction */}
            <h1 className="text-xl sm:text-2xl font-bold tracking-wider text-[#17243A] uppercase font-sans mb-1">
              RAJESH TOPE
            </h1>
            <p className="text-[11px] sm:text-xs font-medium tracking-wide text-[#C58B45] uppercase mb-4">
              {lang === 'mr' ? 'माजी मंत्री, महाराष्ट्र शासन' : lang === 'hi' ? 'पूर्व मंत्री, महाराष्ट्र शासन' : 'Former Minister, Government of Maharashtra'}
            </p>

            {/* Subtle Progress Bar */}
            <div className="w-40 sm:w-48 h-1 bg-[#E7EAF0] rounded-full overflow-hidden mb-3 relative">
              <motion.div
                className="h-full bg-[#17243A]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
              <motion.div
                className="absolute top-0 right-0 h-full w-2 bg-[#C58B45]"
                style={{ left: `${Math.max(0, progress - 2)}%` }}
              />
            </div>

            {/* Status Text */}
            <p className="text-[10px] sm:text-[11px] tracking-widest uppercase text-[#667085]">
              {lang === 'mr' ? 'अधिकृत संकेतस्थळ • सुरू होत आहे...' : lang === 'hi' ? 'आधिकारिक वेबसाइट • लोड हो रहा है...' : 'Official Website • Initializing...'}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
