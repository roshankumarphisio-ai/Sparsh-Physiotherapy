import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Activity,
  ShieldAlert,
  Zap,
  RotateCw,
  TrendingUp,
  Award,
  Heart,
  UserCheck,
  Home,
  ShieldCheck,
  Sparkles,
  Hand,
  Compass,
  Clock,
  Search,
  MessageSquare,
  Tag,
  Check,
  LucideIcon
} from 'lucide-react';
import { SERVICES, BUSINESS_INFO } from '../data';
import { Service } from '../types';
import WhatsAppIcon from './WhatsAppIcon';

// Map icon string to Lucide React components
const iconMap: Record<string, LucideIcon> = {
  Activity,
  ShieldAlert,
  Zap,
  RotateCw,
  TrendingUp,
  Award,
  Heart,
  UserCheck,
  Home,
  ShieldCheck,
  Sparkles,
  Hand,
  Compass
};

export default function Services() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'treatment' | 'therapy' | 'rehab'>('all');

  const categories = [
    { id: 'all', name: 'All Treatments' },
    { id: 'treatment', name: 'Clinical Pain Relief' },
    { id: 'therapy', name: 'Specialized Therapies' },
    { id: 'rehab', name: 'Neuro & Rehab' }
  ];

  // Filtering logic
  const filteredServices = useMemo(() => {
    return SERVICES.filter((service) => {
      const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
      const matchesSearch =
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.benefits.some(b => b.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  // Dynamic WhatsApp pre-fill text per service
  const getWhatsAppLink = (serviceTitle: string) => {
    const msg = `Hi Dr. Roshan, I am looking to book a session for "${serviceTitle}" at Sparsh Physiotherapy in Siwan. Please let me know the available time slots.`;
    return `https://wa.me/${BUSINESS_INFO.whatsappFormatted}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section id="services" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-sm font-bold text-blue-600 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full">
            Clinical Services
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 mt-3 tracking-tight">
            Comprehensive Physiotherapy Specialties
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Providing non-surgical, evidence-based orthopedic and neurological rehabilitation in Siwan, Bihar.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-emerald-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Search and Filter Controls */}
        <div className="bg-slate-50 p-4 sm:p-6 rounded-3xl border border-slate-200/60 mb-12 flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Dynamic Search Input */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              id="service-search-input"
              type="text"
              placeholder="Search treatments (e.g., Back pain, Knee)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-2xl py-3 pl-12 pr-4 text-sm text-slate-800 placeholder-slate-400 font-medium transition-all focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 font-bold text-xs bg-slate-100 px-1.5 py-0.5 rounded-md"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center justify-start gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`filter-btn-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

        </div>

        {/* Empty Search State */}
        {filteredServices.length === 0 && (
          <div className="text-center py-12 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
            <p className="text-slate-500 text-base font-semibold">
              No clinical treatments found matching "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-3 text-blue-600 hover:text-blue-700 font-bold text-sm underline"
            >
              Reset Filters and View All
            </button>
          </div>
        )}

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => {
              const IconComponent = iconMap[service.iconName] || Activity;
              return (
                <motion.div
                  layout
                  key={service.id}
                  id={`service-card-${service.id}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-3xl border border-slate-200/75 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between group h-full"
                >
                  {/* Card Body */}
                  <div className="p-6 flex-grow flex flex-col justify-between gap-5">
                    
                    <div className="flex flex-col gap-4">
                      {/* Top Row: Icon and Category Badge */}
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className="bg-slate-100 border border-slate-200/50 text-[10px] font-black uppercase text-slate-500 tracking-widest px-2.5 py-1 rounded-md">
                          {service.category === 'treatment' ? 'Pain Treatment' : service.category === 'therapy' ? 'Therapy' : 'Rehab'}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <div className="flex flex-col gap-1.5">
                        <h3 className="font-display font-extrabold text-lg sm:text-xl text-slate-900 group-hover:text-blue-600 transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    {/* Bullet Benefits list */}
                    <div className="bg-slate-50/70 p-3.5 rounded-2xl flex flex-col gap-2 border border-slate-100">
                      <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Key Recovery Benefits</h4>
                      <ul className="flex flex-col gap-1.5">
                        {service.benefits.map((benefit, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-1.5 text-xs text-slate-700 font-medium">
                            <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Duration tag bar (without price) */}
                    <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-bold text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span>{service.duration}</span>
                      </div>
                    </div>

                  </div>

                  {/* Book button footer */}
                  <div className="p-6 pt-0 shrink-0">
                    <a
                      id={`book-service-${service.id}`}
                      href={getWhatsAppLink(service.title)}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-sm"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                      <span>Book on WhatsApp</span>
                    </a>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
