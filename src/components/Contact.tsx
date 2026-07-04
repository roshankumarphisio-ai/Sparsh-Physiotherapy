import { useState, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Clock, Calendar, Send, CheckCircle2, Shield, MessageSquare, Database, AlertTriangle, Check, Copy, ChevronDown, ChevronUp, Mail } from 'lucide-react';
import { BUSINESS_INFO, SERVICES } from '../data';
import WhatsAppIcon from './WhatsAppIcon';
import { saveAppointment, supabaseConfig } from '../lib/supabase';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'back-pain',
    date: '',
    slot: 'morning',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [supabaseError, setSupabaseError] = useState<string | null>(null);
  const [copiedSql, setCopiedSql] = useState(false);
  const [showSqlGuide, setShowSqlGuide] = useState(false);
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [emailError, setEmailError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setIsSubmitting(true);
    setSupabaseError(null);
    setEmailStatus('sending');
    setEmailError(null);
    
    // 1. Try to save to Supabase
    try {
      const chosenService = SERVICES.find(s => s.id === formData.service)?.title || formData.service;
      const { error } = await saveAppointment({
        name: formData.name,
        phone: formData.phone,
        service: chosenService,
        date: formData.date || 'Not specified',
        slot: formData.slot,
        message: formData.message || ''
      });

      if (error) {
        console.warn('Supabase save error:', error);
        setSupabaseError(error.message || 'Error inserting row into Supabase.');
      }
    } catch (err: any) {
      console.warn('Network/init error saving to Supabase:', err);
      setSupabaseError(err.message || 'Failed to connect to Supabase network.');
    }

    // 2. Send email notification via FormSubmit.co
    try {
      const chosenService = SERVICES.find(s => s.id === formData.service)?.title || formData.service;
      
      const response = await fetch('https://formsubmit.co/ajax/roshankumarphisio@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `🔔 New Appointment Requested: ${formData.name}`,
          // Standard lowercase fields required natively by FormSubmit
          name: formData.name,
          phone: formData.phone,
          service: chosenService,
          date: formData.date || 'Not specified',
          slot: formData.slot.toUpperCase(),
          message: formData.message || 'No additional note provided',
          
          // Additional custom descriptive fields to guarantee receipt in table
          "Patient_Name": formData.name,
          "Patient_Phone": formData.phone,
          "Requested_Service": chosenService,
          "Appointment_Date": formData.date || 'Not specified',
          "Appointment_Slot": formData.slot.toUpperCase(),
          "Patient_Note": formData.message || 'No additional note provided',

          _honey: '', // Honeypot spam protection
          _template: 'table'
        })
      });

      if (response.ok) {
        setEmailStatus('success');
      } else {
        const errorData = await response.json();
        console.warn('Email delivery error payload:', errorData);
        setEmailStatus('error');
        setEmailError(errorData.message || 'Failed to trigger email notification.');
      }
    } catch (err: any) {
      console.warn('Failed to dispatch email:', err);
      setEmailStatus('error');
      setEmailError(err.message || 'Network failure sending email.');
    } finally {
      setIsSubmitting(false);
      setIsSuccess(true);
    }
  };

  // Pre-fill WhatsApp link using booking form data for immediate conversion
  const getWhatsAppBookingLink = () => {
    const chosenService = SERVICES.find(s => s.id === formData.service)?.title || formData.service;
    const text = `Hi Dr. Roshan Kumar Sharma,\n\nI want to book an appointment with Sparsh Physiotherapy:\n\n👤 Name: ${formData.name}\n📞 Phone: ${formData.phone}\n🩺 Treatment: ${chosenService}\n📅 Preferred Date: ${formData.date}\n⏰ Slot: ${formData.slot.toUpperCase()}\n📝 Note: ${formData.message || 'No extra note'}\n\nPlease confirm availability. Thanks!`;
    return `https://wa.me/${BUSINESS_INFO.whatsappFormatted}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="contact" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-bold text-blue-600 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full">
            Get In Touch
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 mt-3 tracking-tight">
            Book Your Consultation Today
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Schedule an in-person assessment at our clinic or request a professional home physiotherapy session.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-emerald-500 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact details & Google Map */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Quick Contact Cards */}
            <div className="bg-slate-50 border border-slate-200/50 p-6 rounded-3xl flex flex-col gap-5 shadow-sm">
              <h3 className="font-display font-black text-lg text-slate-900">
                Clinic Information
              </h3>

              {/* Address card */}
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Clinic Location</span>
                  <p className="text-sm text-slate-800 font-semibold">{BUSINESS_INFO.address}</p>
                  <span className="text-xs text-slate-400 mt-0.5">Near Pakri More, Rajiv Nagar, Siwan, Bihar</span>
                </div>
              </div>

              {/* Call Card */}
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="flex items-start gap-3 hover:bg-slate-100/60 p-2 -m-2 rounded-2xl transition-all group"
              >
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Phone Enquiry</span>
                  <p className="text-sm text-slate-800 font-extrabold group-hover:text-blue-600 transition-colors">+91 99319 64144</p>
                  <span className="text-xs text-slate-400 mt-0.5">Tap to dial clinic directly</span>
                </div>
              </a>

              {/* Business Hours Card */}
              <div className="flex items-start gap-3 border-t border-slate-200/60 pt-4 mt-2">
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex flex-col w-full">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Clinic Timings</span>
                  <div className="flex justify-between text-xs text-slate-700 font-semibold mt-1">
                    <span>Monday - Saturday:</span>
                    <span className="text-slate-900 font-bold">{BUSINESS_INFO.workingHours.weekdays}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-700 font-semibold mt-1.5">
                    <span>Sunday:</span>
                    <span className="text-rose-600 font-bold">{BUSINESS_INFO.workingHours.sunday}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Google Maps Placeholder / Responsive Iframe */}
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-md h-64 bg-slate-100 relative">
              <iframe
                title="Sparsh Physiotherapy Clinic location in Siwan"
                src={BUSINESS_INFO.mapEmbedUrl}
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>

          {/* Right Column: High-conversion Booking Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-slate-50 border border-slate-200 p-6 sm:p-10 rounded-3xl shadow-xl relative overflow-hidden">
              
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="booking-form"
                    onSubmit={handleFormSubmit}
                    className="flex flex-col gap-5 relative z-10"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div>
                      <h3 className="font-display font-extrabold text-lg sm:text-xl text-slate-900">
                        Appointment Registration
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Fill in your clinical symptoms and desired slot. We secure your health data.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Full name input */}
                      <div className="flex flex-col gap-1">
                        <label htmlFor="name-input" className="text-xs font-bold text-slate-600 uppercase tracking-wide">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="name-input"
                          type="text"
                          name="name"
                          required
                          placeholder="E.g., Rajesh Prasad"
                          value={formData.name}
                          onChange={handleChange}
                          className="bg-white border border-slate-200 hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm text-slate-800 font-medium transition-all focus:outline-none"
                        />
                      </div>

                      {/* Phone number input */}
                      <div className="flex flex-col gap-1">
                        <label htmlFor="phone-input" className="text-xs font-bold text-slate-600 uppercase tracking-wide">
                          WhatsApp / Phone <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="phone-input"
                          type="tel"
                          name="phone"
                          required
                          placeholder="E.g., 9931964144"
                          value={formData.phone}
                          onChange={handleChange}
                          className="bg-white border border-slate-200 hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm text-slate-800 font-medium transition-all focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Services dropdown */}
                      <div className="flex flex-col gap-1">
                        <label htmlFor="service-select" className="text-xs font-bold text-slate-600 uppercase tracking-wide">
                          Required Treatment
                        </label>
                        <select
                          id="service-select"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="bg-white border border-slate-200 hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-3.5 text-sm text-slate-800 font-semibold transition-all focus:outline-none"
                        >
                          {SERVICES.map(s => (
                            <option key={s.id} value={s.id}>
                              {s.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Date selection */}
                      <div className="flex flex-col gap-1">
                        <label htmlFor="date-input" className="text-xs font-bold text-slate-600 uppercase tracking-wide">
                          Preferred Appointment Date
                        </label>
                        <input
                          id="date-input"
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          className="bg-white border border-slate-200 hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl py-2.5 px-3.5 text-sm text-slate-800 font-semibold transition-all focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Time Slot Preference */}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">
                        Timing Preference
                      </span>
                      <div className="grid grid-cols-3 gap-3">
                        {['morning', 'afternoon', 'evening'].map((slotOption) => (
                          <button
                            key={slotOption}
                            id={`time-slot-${slotOption}`}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, slot: slotOption }))}
                            className={`py-2.5 px-2 rounded-xl text-xs font-bold cursor-pointer transition-all border text-center uppercase tracking-wide ${
                              formData.slot === slotOption
                                ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/10'
                                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {slotOption}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Message / Symptoms text */}
                    <div className="flex flex-col gap-1">
                      <label htmlFor="msg-textarea" className="text-xs font-bold text-slate-600 uppercase tracking-wide">
                        Symptoms / Notes (Optional)
                      </label>
                      <textarea
                        id="msg-textarea"
                        name="message"
                        rows={3}
                        placeholder="E.g., I have back pain radiating down my left leg for 2 weeks."
                        value={formData.message}
                        onChange={handleChange}
                        className="bg-white border border-slate-200 hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl py-3 px-4 text-sm text-slate-800 font-medium transition-all focus:outline-none"
                      />
                    </div>

                    {/* Form submit triggers */}
                    <div className="flex flex-col gap-3 mt-2">
                      <button
                        id="submit-form-btn"
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold py-3.5 px-6 rounded-xl shadow-lg transition-all text-base cursor-pointer disabled:opacity-75"
                      >
                        <Send className="w-5 h-5" />
                        <span>{isSubmitting ? 'Submitting...' : 'Register Appointment'}</span>
                      </button>

                      {/* Immediate WhatsApp override option */}
                      <a
                        id="direct-whatsapp-override"
                        href={getWhatsAppBookingLink()}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 px-6 rounded-xl shadow-lg transition-all text-base text-center"
                      >
                        <WhatsAppIcon className="w-5 h-5" />
                        <span>Confirm Direct on WhatsApp</span>
                      </a>
                    </div>

                    {/* HIPAA/Privacy shield indicator */}
                    <div className="flex items-center gap-2 justify-center text-[10px] text-slate-400 font-bold uppercase mt-1">
                      <Shield className="w-3.5 h-3.5 text-emerald-500" />
                      <span>100% Patient Privacy & Confidentiality Ensured</span>
                    </div>

                  </motion.form>
                ) : (
                  <motion.div
                    key="success-card"
                    className="flex flex-col items-center justify-center text-center py-6 gap-4 relative z-10"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-inner">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <h3 className="font-display font-black text-xl text-slate-900 leading-tight">
                        Appointment Requested Successfully!
                      </h3>
                      <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
                        Thank you, <strong className="text-slate-800">{formData.name}</strong>. Your clinical request has been secured. Dr. Roshan Kumar Sharma will contact you shortly on <strong className="text-slate-800">{formData.phone}</strong>.
                      </p>
                    </div>

                    {/* Email Dispatch Notice */}
                    <div className="w-full max-w-md mt-1 mb-2">
                      {emailStatus === 'success' ? (
                        <div className="flex flex-col bg-blue-50/80 border border-blue-200/60 p-4 rounded-2xl shadow-sm text-left gap-2">
                          <div className="flex items-start gap-3">
                            <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                              <Mail className="w-4 h-4 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs font-bold text-slate-800">Email Dispatched</p>
                              <p className="text-[10px] text-slate-600 font-medium mt-0.5 leading-relaxed">
                                Form details successfully sent to <strong className="text-blue-800 font-bold">roshankumarphisio@gmail.com</strong>!
                              </p>
                            </div>
                          </div>
                          <div className="text-[9px] bg-blue-100/40 text-blue-900 px-3 py-2 rounded-xl mt-1 leading-normal">
                            💡 <strong>First Time?</strong> If you don't receive the email, check your spam/promotions folder or search for a confirmation email from <strong>FormSubmit</strong> to activate immediate delivery to your inbox!
                          </div>
                        </div>
                      ) : emailStatus === 'sending' ? (
                        <div className="flex items-center justify-between bg-slate-50/80 border border-slate-200/60 p-4 rounded-2xl shadow-sm text-left gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center shrink-0">
                              <Mail className="w-4 h-4 text-slate-500 animate-pulse" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-700">Sending Email...</p>
                              <p className="text-[10px] text-slate-500 font-medium mt-0.5">Contacting mail servers...</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col bg-rose-50/80 border border-rose-200/60 p-4 rounded-2xl shadow-sm text-left gap-2">
                          <div className="flex items-start gap-3">
                            <div className="w-9 h-9 bg-rose-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                              <AlertTriangle className="w-4 h-4 text-rose-600" />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs font-bold text-rose-800">Email Dispatch Issue</p>
                              <p className="text-[10px] text-rose-600 font-medium mt-0.5 leading-relaxed">
                                Could not send direct email notice to roshankumarphisio@gmail.com: <strong>{emailError || 'Service temporarily unavailable'}</strong>.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Supabase connection notice */}
                    <div className="w-full max-w-md my-2">
                      {!supabaseError ? (
                        <div className="flex items-center justify-between bg-emerald-50/80 border border-emerald-200/60 p-4 rounded-2xl shadow-sm text-left gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                              <Database className="w-4 h-4 text-emerald-600 animate-pulse" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-800">Supabase Connected</p>
                              <p className="text-[10px] text-slate-500 font-medium mt-0.5">Appointment details saved successfully!</p>
                            </div>
                          </div>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2.5 py-1 rounded-full shrink-0">
                            Active
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col bg-amber-50/80 border border-amber-200/60 p-4 rounded-2xl text-left gap-3 shadow-sm">
                          <div className="flex items-start gap-3">
                            <div className="w-9 h-9 bg-amber-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                              <AlertTriangle className="w-4 h-4 text-amber-600" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-xs font-bold text-slate-800">Supabase Sync Notice</h4>
                              <p className="text-[10px] text-slate-600 font-medium mt-0.5 leading-relaxed">
                                {(() => {
                                  const errStr = supabaseError.toLowerCase();
                                  if (errStr.includes('relation') && errStr.includes('does not exist')) {
                                    return (
                                      <span>
                                        The <strong>appointments</strong> table does not exist in your Supabase database. Please run the SQL setup script below.
                                      </span>
                                    );
                                  }
                                  if (errStr.includes('api key') || errStr.includes('invalid api key') || errStr.includes('jwt') || errStr.includes('anon') || errStr.includes('failed to fetch')) {
                                    return (
                                      <span>
                                        Failed to connect to your Supabase project. Please verify that your <strong>VITE_SUPABASE_URL</strong> and <strong>VITE_SUPABASE_ANON_KEY</strong> are set correctly in the environment configuration.
                                      </span>
                                    );
                                  }
                                  return (
                                    <span>
                                      <strong>Database error encountered:</strong> {supabaseError}. Ensure your table and policies are set up correctly.
                                    </span>
                                  );
                                })()}
                              </p>
                            </div>
                          </div>
                          
                          <button
                            type="button"
                            onClick={() => setShowSqlGuide(!showSqlGuide)}
                            className="flex items-center justify-between w-full text-[10px] font-bold text-amber-950 bg-amber-100/60 hover:bg-amber-200/40 py-2 px-3 rounded-xl transition-all cursor-pointer"
                          >
                            <span>{showSqlGuide ? 'Hide Setup SQL Script' : 'View Setup SQL Script (10-second fix)'}</span>
                            {showSqlGuide ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </button>

                          {showSqlGuide && (
                            <div className="flex flex-col gap-2 mt-1">
                              <p className="text-[10px] text-amber-800 leading-normal">
                                1. Open your <strong className="text-amber-950 font-bold underline">{supabaseConfig.projectRef}</strong> project dashboard on Supabase.<br />
                                2. Go to <strong>SQL Editor</strong> &gt; <strong>New Query</strong>.<br />
                                3. Paste the code below and click <strong>Run</strong>:
                              </p>
                              <div className="relative bg-slate-900 text-[10px] font-mono text-slate-100 p-3.5 rounded-xl overflow-x-auto max-h-44 border border-slate-800 select-all">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    navigator.clipboard.writeText(`-- 1. Create the appointments table safely
CREATE TABLE IF NOT EXISTS appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  service TEXT NOT NULL,
  date TEXT NOT NULL,
  slot TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Disable Row Level Security (RLS) to prevent policy errors
ALTER TABLE appointments DISABLE ROW LEVEL SECURITY;

-- 3. Explicitly grant anonymous inserts to the appointments table
GRANT INSERT ON appointments TO anon;
GRANT ALL ON appointments TO authenticated, service_role;`);
                                    setCopiedSql(true);
                                    setTimeout(() => setCopiedSql(false), 2000);
                                  }}
                                  className="absolute top-2 right-2 p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded transition-colors cursor-pointer"
                                  title="Copy SQL code"
                                >
                                  {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                </button>
                                <pre className="text-[9px] leading-relaxed select-all">
{`-- 1. Create the appointments table safely
CREATE TABLE IF NOT EXISTS appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  service TEXT NOT NULL,
  date TEXT NOT NULL,
  slot TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Disable Row Level Security (RLS) to prevent policy errors
ALTER TABLE appointments DISABLE ROW LEVEL SECURITY;

-- 3. Explicitly grant anonymous inserts to the appointments table
GRANT INSERT ON appointments TO anon;
GRANT ALL ON appointments TO authenticated, service_role;`}
                                </pre>
                              </div>
                              {copiedSql && <span className="text-[10px] text-emerald-700 font-extrabold flex items-center gap-1">✓ SQL code copied to clipboard!</span>}

                              {supabaseConfig.isUsingFallback && (
                                <p className="text-[10px] bg-amber-100/40 text-amber-900 border border-amber-200/40 p-2.5 rounded-lg mt-1 leading-relaxed">
                                  💡 <strong>Tip:</strong> The app is currently using the default/fallback Supabase project. If you wish to connect to your own private Supabase project, go to your <strong>Settings</strong> panel and set the <strong>VITE_SUPABASE_URL</strong> and <strong>VITE_SUPABASE_ANON_KEY</strong> environment variables!
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Highly engaging direct WhatsApp handover */}
                    <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-2xl max-w-md w-full mt-1 flex flex-col gap-3">
                      <p className="text-xs text-emerald-800 font-semibold leading-relaxed">
                        To skip waiting, click below to immediately send these details to Dr. Roshan on WhatsApp for instant slot confirmation:
                      </p>
                      <a
                        id="success-whatsapp-btn"
                        href={getWhatsAppBookingLink()}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-md text-sm transition-all text-center cursor-pointer"
                      >
                        <WhatsAppIcon className="w-4 h-4" />
                        <span>Send Booking to WhatsApp</span>
                      </a>
                    </div>

                    <button
                      id="reset-form-btn"
                      onClick={() => {
                        setIsSuccess(false);
                        setSupabaseError(null);
                        setFormData({
                          name: '',
                          phone: '',
                          service: 'back-pain',
                          date: '',
                          slot: 'morning',
                          message: ''
                        });
                      }}
                      className="text-xs text-slate-500 hover:text-blue-600 font-bold underline cursor-pointer"
                    >
                      Book another slot / Reset Form
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
