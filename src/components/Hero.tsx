import { MouseEvent } from 'react';
import { motion } from 'motion/react';
import { Phone, MessageSquare, Star, ArrowRight, ShieldCheck, CalendarRange } from 'lucide-react';
import { BUSINESS_INFO } from '../data';
import WhatsAppIcon from './WhatsAppIcon';

export default function Hero() {
  const handleScrollToContact = (e: MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector('#contact');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 lg:pt-40 lg:pb-32 bg-gradient-to-b from-blue-50/50 via-white to-slate-50 overflow-hidden"
    >
      {/* Visual background ambient shapes */}
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-0 -ml-24 w-72 h-72 rounded-full bg-emerald-100/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left">
            
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center lg:justify-start gap-2 self-center lg:self-start bg-emerald-100 border border-emerald-200/50 text-emerald-800 px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold tracking-wide uppercase shadow-sm"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>#1 CLINIC IN SIWAN • DR. ROSHAN KUMAR SHARMA</span>
            </motion.div>

            {/* Main Headlines */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-extrabold text-3.5xl sm:text-4.5xl md:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-tight"
            >
              Trusted Physiotherapy Care in <span className="text-blue-600">Siwan</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-slate-600 font-normal max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Helping you recover from pain, improve mobility, and live an active life with personalized evidence-based physical therapy treatments.
            </motion.p>

            {/* Call to Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-2"
            >
              {/* WhatsApp CTA */}
              <a
                id="hero-whatsapp-cta"
                href={`https://wa.me/${BUSINESS_INFO.whatsappFormatted}?text=${encodeURIComponent(BUSINESS_INFO.whatsappMsg)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-emerald-100 hover:scale-[1.01] transition-all duration-200 text-base"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>WhatsApp Book</span>
              </a>

              {/* Phone CTA */}
              <a
                id="hero-phone-cta"
                href={`tel:${BUSINESS_INFO.phone}`}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white border-2 border-slate-200 text-slate-700 rounded-xl font-bold px-6 py-3.5 hover:bg-slate-50 hover:scale-[1.01] transition-all duration-200 text-base"
              >
                <Phone className="w-5 h-5 text-blue-600" />
                <span>+91 99319 64144</span>
              </a>

              {/* Secondary Scroll Link */}
              <a
                id="hero-secondary-cta"
                href="#contact"
                onClick={handleScrollToContact}
                className="text-sm font-semibold text-slate-600 hover:text-blue-600 flex items-center gap-1.5 py-2 group focus:outline-none transition-colors"
              >
                <span>Book Appointment</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>

            {/* Key Clinical Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-4 border-t border-slate-100 pt-6 mt-4 max-w-md mx-auto lg:mx-0"
            >
              <div className="flex flex-col text-center lg:text-left">
                <span className="font-display font-black text-2xl sm:text-3xl text-blue-600">12+</span>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Years Exp</span>
              </div>
              <div className="flex flex-col text-center lg:text-left border-x border-slate-100 px-2">
                <span className="font-display font-black text-2xl sm:text-3xl text-blue-600">5,000+</span>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Happy Patients</span>
              </div>
              <div className="flex flex-col text-center lg:text-left">
                <span className="font-display font-black text-2xl sm:text-3xl text-emerald-500">{BUSINESS_INFO.stats.successRate}</span>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Success Rate</span>
              </div>
            </motion.div>

          </div>

          {/* Right Visual Image Column */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            {/* Animated Glow Backdrops */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-400 to-emerald-400 rounded-[2.5rem] rotate-3 blur-2xl opacity-10 scale-95" />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-full max-w-sm sm:max-w-md bg-white p-4 rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden"
            >
              {/* Patient Rehabilitation Display Image */}
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600"
                alt="Physiotherapy Treatment session at Sparsh Physiotherapy"
                className="w-full h-80 sm:h-96 object-cover rounded-2xl shadow-inner bg-slate-100"
                referrerPolicy="no-referrer"
              />

              {/* Floating Review Bubble */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-100 shadow-lg flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700 text-sm shrink-0">
                  RK
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                    <span className="text-xs font-bold text-slate-700 ml-1">5.0 / 5</span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    \"Dr. Roshan provides outstanding treatments. My severe slip disc and chronic back pain were resolved completely!\"
                  </p>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                    - Google Verified Business Review
                  </span>
                </div>
              </div>

              {/* Experience badge layer */}
              <div className="absolute top-8 right-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                <CalendarRange className="w-3.5 h-3.5" />
                <span>Book Direct</span>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
