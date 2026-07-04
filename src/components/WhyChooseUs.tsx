import { motion } from 'motion/react';
import {
  Award,
  Binary,
  Cpu,
  FileText,
  Smile,
  BadgeIndianRupee,
  CalendarClock,
  Zap,
  LucideIcon
} from 'lucide-react';
import { WHY_CHOOSE_US } from '../data';

// Map icon name string to Lucide React component
const iconMap: Record<string, LucideIcon> = {
  Award,
  Binary,
  Cpu,
  FileText,
  Smile,
  BadgeIndianRupee,
  CalendarClock,
  Zap
};

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="py-20 bg-slate-50 relative overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-bold text-blue-600 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full">
            Our Standards
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 mt-3 tracking-tight">
            Why Hundreds of Patients Choose Sparsh Physiotherapy
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl mx-auto">
            We combine clinical excellence, state-of-the-art tech modalities, and warm Bihar hospitality to deliver premium outcomes.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-emerald-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_US.map((item, idx) => {
            const IconComponent = iconMap[item.iconName] || Award;
            return (
              <motion.div
                key={idx}
                id={`why-card-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-white p-6 rounded-2xl border border-slate-200/50 shadow-sm hover:shadow-md transition-all duration-200 group flex flex-col gap-4"
              >
                {/* Icon Container with glowing effect */}
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <IconComponent className="w-6 h-6" />
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
