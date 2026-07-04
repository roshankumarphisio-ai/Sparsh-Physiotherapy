import { useState, useEffect } from 'react';
import { Phone, MessageSquare, ArrowUp } from 'lucide-react';
import { BUSINESS_INFO } from '../data';
import WhatsAppIcon from './WhatsAppIcon';

export default function FloatingCTAs() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* 1. Mobile-Only Sticky Bottom Conversion Dock */}
      <div
        id="mobile-sticky-dock"
        className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-t border-slate-200/80 p-3 flex sm:hidden items-center gap-3 shadow-2xl"
      >
        <a
          id="dock-call-btn"
          href={`tel:${BUSINESS_INFO.phone}`}
          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold py-3.5 px-4 rounded-xl shadow-md text-sm transition-all text-center"
        >
          <Phone className="w-4 h-4" />
          <span>Call Now</span>
        </a>

        <a
          id="dock-whatsapp-btn"
          href={`https://wa.me/${BUSINESS_INFO.whatsappFormatted}?text=${encodeURIComponent(BUSINESS_INFO.whatsappMsg)}`}
          target="_blank"
          rel="noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 px-4 rounded-xl shadow-md text-sm transition-all text-center"
        >
          <WhatsAppIcon className="w-4 h-4" />
          <span>WhatsApp Enquire</span>
        </a>
      </div>

      {/* 2. Desktop-Only Floating Action Circles (Bottom Right) */}
      <div
        id="desktop-floating-group"
        className="hidden sm:flex flex-col gap-3 fixed bottom-6 right-6 z-40 items-end"
      >
        {/* Floating WhatsApp Circle with notification badge */}
        <a
          id="floating-whatsapp-circle"
          href={`https://wa.me/${BUSINESS_INFO.whatsappFormatted}?text=${encodeURIComponent(BUSINESS_INFO.whatsappMsg)}`}
          target="_blank"
          rel="noreferrer"
          className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-700 hover:scale-110 text-white flex items-center justify-center shadow-lg shadow-emerald-600/20 transition-all relative group"
          aria-label="Enquire on WhatsApp"
        >
          {/* Pulsing notification circle */}
          <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-red-500 border-2 border-white animate-pulse" />
          <WhatsAppIcon className="w-6 h-6" />
          
          {/* Tooltip */}
          <span className="absolute right-16 bg-slate-900 text-white text-[11px] font-bold px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
            Chat with Dr. Roshan
          </span>
        </a>

        {/* Floating Call Circle */}
        <a
          id="floating-call-circle"
          href={`tel:${BUSINESS_INFO.phone}`}
          className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 hover:scale-110 text-white flex items-center justify-center shadow-lg shadow-blue-600/20 transition-all relative group"
          aria-label="Call Clinic"
        >
          <Phone className="w-6 h-6" />
          
          {/* Tooltip */}
          <span className="absolute right-16 bg-slate-900 text-white text-[11px] font-bold px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
            Call Clinic Directly
          </span>
        </a>

        {/* Back to Top button */}
        {isVisible && (
          <button
            id="floating-scroll-top"
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full bg-white hover:bg-slate-50 text-slate-700 hover:text-blue-600 flex items-center justify-center shadow-md border border-slate-200 hover:scale-110 transition-all cursor-pointer group"
            aria-label="Scroll to Top"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        )}
      </div>
    </>
  );
}
