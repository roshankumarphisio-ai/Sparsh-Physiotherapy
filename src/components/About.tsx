import { useState } from 'react';
import { motion } from 'motion/react';
import { Award, GraduationCap, Clock, HandMetal, HeartHandshake, ShieldCheck, User, Building } from 'lucide-react';
import { BUSINESS_INFO } from '../data';
import drRoshanPortrait from '../assets/images/regenerated_image_1782900454366.png';
import WhatsAppIcon from './WhatsAppIcon';

export default function About() {
  const [imageOption, setImageOption] = useState<'doctor' | 'clinic'>('doctor');

  return (
    <section id="about" className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-blue-50/50 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-bold text-blue-600 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full">
            Meet the Specialist
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 mt-3 tracking-tight">
            Experienced Physiotherapy Expert Dedicated to Your Recovery
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-emerald-500 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Professional Profile Card */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-md bg-gradient-to-b from-slate-50 to-white rounded-3xl border border-slate-200/60 p-6 shadow-xl relative"
            >
              {/* Image Option Selector Switch */}
              <div id="about-image-options" className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl mb-4 border border-slate-200/50">
                <button
                  id="opt-doctor"
                  type="button"
                  onClick={() => setImageOption('doctor')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    imageOption === 'doctor'
                      ? 'bg-white text-blue-600 shadow-sm border border-slate-200/20'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Dr. Roshan (B.P.T)</span>
                </button>
                <button
                  id="opt-clinic"
                  type="button"
                  onClick={() => setImageOption('clinic')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    imageOption === 'clinic'
                      ? 'bg-white text-blue-600 shadow-sm border border-slate-200/20'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Building className="w-3.5 h-3.5" />
                  <span>Clinic Setup</span>
                </button>
              </div>

              {/* Doctor Avatar Image Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-md bg-blue-50 mb-6 group">
                <img
                  src={imageOption === 'doctor' ? drRoshanPortrait : "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600"}
                  alt={
                    imageOption === 'doctor'
                      ? "Dr. Roshan Kumar Sharma, B.P.T (Bachelor of Physiotherapy) - Lead Physiotherapist"
                      : "Sparsh Physiotherapy Clinic Setup - Advanced Rehabilitation Center Siwan"
                  }
                  className="w-full h-80 object-cover object-top transition-all duration-500 group-hover:scale-102"
                  referrerPolicy="no-referrer"
                />
                
                {/* 
                  When doctor is selected, display ONLY the name of DR and BPT with full form.
                  This adheres strictly to "add an image option only with the name of DR and BPT With full form".
                */}
                {imageOption === 'doctor' ? (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-transparent p-4 text-white">
                    <h3 className="text-lg font-black font-display tracking-tight">{BUSINESS_INFO.owner}</h3>
                    <p className="text-xs font-extrabold text-blue-400 tracking-wide mt-0.5 uppercase">B.P.T (Bachelor of Physiotherapy)</p>
                  </div>
                ) : (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-transparent p-4 text-white">
                    <h3 className="text-lg font-black font-display tracking-tight">Sparsh Physiotherapy Clinic</h3>
                    <p className="text-xs font-semibold text-slate-300 tracking-wide mt-0.5">Rajiv Nagar, Pakri More, Siwan</p>
                  </div>
                )}
              </div>

              {/* Degrees and Specializations List */}
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600 shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide">Education & Degree</h4>
                    <p className="text-sm font-semibold text-slate-800">{BUSINESS_INFO.degree}</p>
                    <p className="text-xs text-slate-500">Member of Indian Association of Physiotherapists (I.A.P)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 border-t border-slate-100 pt-3">
                  <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600 shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide">Experience</h4>
                    <p className="text-sm font-bold text-slate-800">{BUSINESS_INFO.experience}</p>
                    <p className="text-xs text-slate-500">Specialized in orthopedic, neuro, & post-surgical rehab</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 border-t border-slate-100 pt-3">
                  <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide">Clinic Hours</h4>
                    <p className="text-sm font-bold text-slate-800">{BUSINESS_INFO.workingHours.weekdays}</p>
                    <p className="text-xs text-slate-500">Sunday: {BUSINESS_INFO.workingHours.sunday}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Narrative Trust-Building Story */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <span className="text-emerald-600 font-bold tracking-wider uppercase text-xs font-mono">
              About Sparsh Physiotherapy
            </span>
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight leading-tight">
              Healing Siwan, One Patient at a Time
            </h3>

            <div className="text-slate-600 space-y-4 text-base leading-relaxed">
              <p>
                At <strong>Sparsh Physiotherapy</strong>, our core philosophy is centered on the principle of compassionate, human touch paired with state-of-the-art physical sciences. Founded and directly managed by <strong>Dr. Roshan Kumar Sharma</strong>, we have earned a premier reputation in Siwan for delivering life-changing recovery results without complex surgery or absolute dependency on pain medications.
              </p>
              <p>
                We specialize in helping patients recover safely from agonizing back pain, acute slip disc herniation, severe sciatica, stiff neck alignment, and chronic shoulder freeze. Every treatment protocol we design at our hygienic Rajiv Nagar clinic is backed by clinical research and executed with pristine, professional accuracy.
              </p>
            </div>

            {/* Structured highlight values (emphasizing requirements) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-b border-slate-100 py-6 my-2">
              <div className="flex items-start gap-2.5">
                <HeartHandshake className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">One-on-One Attention</h4>
                  <p className="text-xs text-slate-500">We never rush. You receive the complete dedicated time of Dr. Roshan during every session.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Scientific approach</h4>
                  <p className="text-xs text-slate-500">Every diagnosis is derived from physical bone, nerve, and posture assessments.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <HandMetal className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Focus on Long-Term Recovery</h4>
                  <p className="text-xs text-slate-500">We target the root biomechanical cause to make sure your excruciating pain never returns.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Award className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Friendly Clinic Setting</h4>
                  <p className="text-xs text-slate-500">Enjoy sanitized therapy beds, modern clinical gadgets, and highly respectful team members.</p>
                </div>
              </div>
            </div>

            {/* Quick Consultation Trigger */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a
                id="about-cta-whatsapp"
                href={`https://wa.me/${BUSINESS_INFO.whatsappFormatted}?text=${encodeURIComponent(BUSINESS_INFO.whatsappMsg)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all duration-200 text-sm"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Schedule Consultation</span>
              </a>
              <span className="text-xs text-slate-500 font-medium">
                Clinic Location: 📍 Pakri More, Doctors Colony, Siwan
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
