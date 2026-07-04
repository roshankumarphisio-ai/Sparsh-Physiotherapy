import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ArrowLeft, ArrowRight, MessageSquare, Quote } from 'lucide-react';
import { TESTIMONIALS, BUSINESS_INFO } from '../data';
import WhatsAppIcon from './WhatsAppIcon';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section id="testimonials" className="py-20 bg-white relative overflow-hidden border-t border-slate-100">
      {/* Decorative vectors */}
      <div className="absolute top-1/2 right-0 -mr-12 w-64 h-64 rounded-full bg-blue-50 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Heading with Google Badge */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
          
          {/* Google Business Rating Badge */}
          <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2 rounded-2xl shadow-sm mb-4">
            <svg className="w-5 h-5 text-[#4285F4]" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.22-.66-.35-1.36-.35-2.09z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <div className="flex flex-col items-start leading-none">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Google Business</span>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-sm font-bold text-slate-800">5.0</span>
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-slate-500">(150+ Reviews)</span>
              </div>
            </div>
          </div>

          <span className="text-sm font-bold text-blue-600 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full">
            Patient Stories
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 mt-3 tracking-tight">
            Hear From Our Fully Recovered Patients
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-emerald-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Carousel / Card display layout */}
        <div className="max-w-4xl mx-auto relative px-4 sm:px-12">
          
          <div className="relative bg-slate-50 border border-slate-200/60 p-6 sm:p-12 rounded-[2rem] shadow-xl overflow-hidden min-h-[320px] flex flex-col justify-between">
            
            {/* Quote Icon decorative */}
            <div className="absolute right-8 top-8 text-slate-200/50 pointer-events-none">
              <Quote className="w-24 h-24 stroke-1 fill-slate-100" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6 relative z-10"
              >
                {/* Stars and date */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500">
                    {[...Array(TESTIMONIALS[activeIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400 font-semibold font-mono">
                    {TESTIMONIALS[activeIndex].date}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed italic font-medium">
                  "{TESTIMONIALS[activeIndex].text}"
                </p>

                {/* Patient Profile */}
                <div className="flex items-center gap-3 mt-4 border-t border-slate-200/60 pt-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold font-display text-base shadow-sm shrink-0">
                    {TESTIMONIALS[activeIndex].initials}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-display font-black text-sm sm:text-base text-slate-900">
                      {TESTIMONIALS[activeIndex].name}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 flex items-center gap-1 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Verified Google review
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>

          {/* Slider Navigation buttons */}
          <div className="flex justify-between items-center mt-8 px-4">
            <button
              id="testimonial-prev-btn"
              onClick={handlePrev}
              className="p-3 bg-white border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-600 rounded-xl hover:bg-blue-50 transition-all cursor-pointer shadow-sm"
              aria-label="Previous Review"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-1.5">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  id={`testimonial-dot-${idx}`}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    activeIndex === idx ? 'w-6 bg-blue-600' : 'w-2 bg-slate-200'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <button
              id="testimonial-next-btn"
              onClick={handleNext}
              className="p-3 bg-white border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-600 rounded-xl hover:bg-blue-50 transition-all cursor-pointer shadow-sm"
              aria-label="Next Review"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Call to leave a review */}
        <div className="text-center mt-12">
          <p className="text-slate-500 text-xs font-semibold">
            Are you a former patient of Dr. Roshan? Share your healing journey!
          </p>
          <a
            id="leave-review-link"
            href={`https://wa.me/${BUSINESS_INFO.whatsappFormatted}?text=${encodeURIComponent("Hi Dr. Roshan, I would love to write a Google review for Sparsh Physiotherapy. Please share the direct link!")}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-emerald-600 font-bold hover:text-emerald-700 mt-1"
          >
            <WhatsAppIcon className="w-3.5 h-3.5" />
            <span>Click to leave a review on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
}
