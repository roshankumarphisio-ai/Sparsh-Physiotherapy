import { motion } from 'motion/react';
import {
  MessageSquareText,
  Eye,
  SearchCheck,
  FileHeart,
  Sparkles,
  Smile,
  LucideIcon
} from 'lucide-react';
import { RECOVERY_STEPS } from '../data';

// Map icon string to Lucide React component
const iconMap: Record<string, LucideIcon> = {
  MessageSquareText,
  Eye,
  SearchCheck,
  FileHeart,
  Sparkles,
  Smile
};

export default function RecoveryProcess() {
  return (
    <section id="recovery" className="py-20 bg-white relative overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-bold text-blue-600 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full">
            Our Protocol
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 mt-3 tracking-tight">
            Your Structured Path to Pain-Free Living
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            We follow a strictly professional, 6-step medical rehabilitation system to ensure long-lasting recovery.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-emerald-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Process Steps List */}
        <div className="relative border-l-2 border-dashed border-blue-200/60 ml-4 sm:ml-8 lg:border-l-0 lg:ml-0 lg:grid lg:grid-cols-6 lg:gap-6 lg:before:content-none">
          {RECOVERY_STEPS.map((stepData, idx) => {
            const IconComponent = iconMap[stepData.iconName] || Smile;
            return (
              <motion.div
                key={idx}
                id={`recovery-step-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative pl-8 sm:pl-12 pb-12 last:pb-0 lg:pl-0 lg:pb-0 lg:text-center group"
              >
                {/* Visual Step Marker Bubble */}
                <div className="absolute -left-[17px] top-0 lg:static lg:mx-auto lg:mb-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border-2 border-blue-600 flex items-center justify-center text-blue-600 font-black text-xs sm:text-sm z-10 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  {stepData.step}
                </div>

                {/* Icon Circle */}
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center lg:mx-auto mb-3 mt-1 lg:mt-0 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-5 h-5" />
                </div>

                {/* Step Details */}
                <div className="flex flex-col gap-1 lg:px-2">
                  <h3 className="font-display font-extrabold text-base sm:text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                    {stepData.title}
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-normal">
                    {stepData.description}
                  </p>
                </div>

                {/* Visual horizontal guide lines for desktop */}
                {idx < RECOVERY_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-5 left-[calc(50%+20px)] right-[calc(-50%+20px)] h-0.5 border-t-2 border-dashed border-blue-100 -z-10" />
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
