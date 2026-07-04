import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQS } from '../data';

export default function FAQ() {
  const [activeTab, setActiveTab] = useState<'all' | 'general' | 'treatment' | 'appointments' | 'cost'>('all');
  const [openId, setOpenId] = useState<string | null>('faq1'); // Keep first open by default

  const tabs = [
    { id: 'all', name: 'All Questions' },
    { id: 'general', name: 'General Questions' },
    { id: 'treatment', name: 'Our Treatments' },
    { id: 'appointments', name: 'Appointments' },
    { id: 'cost', name: 'Plans & Sessions' },
  ];

  const filteredFaqs = FAQS.filter(
    (faq) => activeTab === 'all' || faq.category === activeTab
  );

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faqs" className="py-20 bg-slate-50 relative overflow-hidden border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-sm font-bold text-blue-600 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full">
            Common Inquiries
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 mt-3 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Have questions about clinical safety, treatment plans, or home visits? Find clear answers here.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-emerald-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Accordion Tabs */}
        <div className="flex flex-wrap justify-center gap-1.5 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              id={`faq-tab-${tab.id}`}
              onClick={() => {
                setActiveTab(tab.id as any);
                setOpenId(null); // Close active to avoid confusing layout
              }}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold cursor-pointer transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Accordions */}
        <div className="flex flex-col gap-4">
          <AnimatePresence mode="popLayout">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openId === faq.id;
              return (
                <motion.div
                  layout
                  key={faq.id}
                  id={`faq-accordion-${faq.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
                >
                  {/* Accordion Trigger Header */}
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full text-left p-5 sm:p-6 flex justify-between items-center gap-4 cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start gap-3">
                      <HelpCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <span className="font-display font-extrabold text-slate-900 text-sm sm:text-base">
                        {faq.question}
                      </span>
                    </div>
                    <div className={`p-1.5 rounded-lg bg-slate-100 text-slate-500 transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180 bg-blue-50 text-blue-600' : ''
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Accordion content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-0 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-50 font-normal">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
