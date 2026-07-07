import { useState } from 'react';
import { MapPin, Phone, MessageSquare, Shield, CheckCircle } from 'lucide-react';
import { BUSINESS_INFO, SERVICES } from '../data';
import WhatsAppIcon from './WhatsAppIcon';

export default function Footer() {
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);

  const handleLinkClick = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-24 sm:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-slate-800 pb-12">
          
          {/* Column 1: Brand details */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-base">
                S
              </div>
              <span className="font-display font-black text-xl text-white tracking-tight">
                Sparsh Physiotherapy
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
              Bihar's premier clinic for advanced, scientific physiotherapy, spinal decompression, and stroke/paralysis neurological rehabilitation under the expert clinical guidance of Dr. Roshan Kumar Sharma.
            </p>
            <div className="flex gap-3 mt-2">
              <a
                id="footer-social-whatsapp"
                href={`https://wa.me/${BUSINESS_INFO.whatsappFormatted}?text=${encodeURIComponent(BUSINESS_INFO.whatsappMsg)}`}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center text-slate-300"
                aria-label="Contact WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
              <a
                id="footer-social-call"
                href={`tel:${BUSINESS_INFO.phone}`}
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center text-slate-300"
                aria-label="Direct Phone Call"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display font-bold text-sm sm:text-base text-white uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs sm:text-sm font-semibold">
              {['Home', 'About', 'Services', 'Testimonials', 'FAQs', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    id={`footer-link-${item.toLowerCase()}`}
                    href={`#${item.toLowerCase()}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(`#${item.toLowerCase()}`);
                    }}
                    className="hover:text-blue-400 transition-colors cursor-pointer"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Key Treatments */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display font-bold text-sm sm:text-base text-white uppercase tracking-wider">
              Our Specialties
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs sm:text-sm">
              {SERVICES.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <a
                    id={`footer-spec-${service.id}`}
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick('#services');
                    }}
                    className="hover:text-blue-400 transition-colors font-semibold"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Location directions shortcuts */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display font-bold text-sm sm:text-base text-white uppercase tracking-wider">
              Visit Clinic
            </h3>
            <div className="flex flex-col gap-3 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span>{BUSINESS_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-500" />
                <a href={`tel:${BUSINESS_INFO.phone}`} className="hover:text-blue-400 font-extrabold">+91 99319 64144</a>
              </div>
              
              <a
                id="footer-directions-btn"
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="self-start text-xs font-bold text-blue-400 hover:text-blue-300 underline mt-1"
              >
                📍 Get Google Map Directions
              </a>
            </div>
          </div>

        </div>

        {/* Legal copyrights & buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-[11px] font-bold uppercase tracking-wider text-slate-500 gap-4">
          <span>
            © {new Date().getFullYear()} Sparsh Physiotherapy Siwan. All Rights Reserved.
          </span>
          
          <div className="flex items-center gap-4">
            <button
              id="footer-privacy-btn"
              onClick={() => setActiveModal('privacy')}
              className="hover:text-slate-300 cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-slate-700">|</span>
            <button
              id="footer-terms-btn"
              onClick={() => setActiveModal('terms')}
              className="hover:text-slate-300 cursor-pointer"
            >
              Terms of Use
            </button>
            <span className="text-slate-700">|</span>
            <a
              id="footer-admin-btn"
              href="#/admin"
              className="hover:text-blue-400 text-slate-500 transition-colors uppercase cursor-pointer"
            >
              Admin Portal
            </a>
          </div>
        </div>

      </div>

      {/* Interactive Modal overlay for Terms & Privacy */}
      {activeModal && (
        <div
          id="legal-modal-overlay"
          className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-4"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-white text-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-2xl relative border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold bg-slate-100 px-2 py-1 rounded-md text-xs cursor-pointer"
            >
              ✕ Close
            </button>

            {activeModal === 'privacy' ? (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-blue-600">
                  <Shield className="w-6 h-6" />
                  <h3 className="font-display font-black text-xl">Privacy Policy</h3>
                </div>
                <div className="text-slate-600 text-xs sm:text-sm leading-relaxed space-y-3 font-normal">
                  <p>
                    Your privacy is critically important to us at <strong>Sparsh Physiotherapy</strong>. We are committed to securing any personal or health-related information you share through our appointment registration forms.
                  </p>
                  <p>
                    <strong>Information Collection:</strong> We collect details like your full name, mobile number, desired treatment, and symptoms solely to coordinate medical visits and diagnostic consultations.
                  </p>
                  <p>
                    <strong>Information Sharing:</strong> We never sell, rent, or lease clinical patient records to any third-party marketing companies. All data remains confidential within our medical database run by Dr. Roshan Kumar Sharma.
                  </p>
                  <p>
                    <strong>Consent:</strong> By submitting your details on our clinic website, you authorize our team to contact you via phone call or WhatsApp to confirm your slots.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-blue-600">
                  <CheckCircle className="w-6 h-6" />
                  <h3 className="font-display font-black text-xl">Terms of Use</h3>
                </div>
                <div className="text-slate-600 text-xs sm:text-sm leading-relaxed space-y-3 font-normal">
                  <p>
                    Welcome to the digital portal of <strong>Sparsh Physiotherapy Clinic</strong>. By accessing our platform, you agree to comply with the following operational codes:
                  </p>
                  <p>
                    <strong>1. No Medical Advice:</strong> The content on this website, including description of symptoms and duration, is intended purely for initial informational purposes. It is not a substitute for formal in-person orthopedic, neurological, or clinical physical diagnostic testing.
                  </p>
                  <p>
                    <strong>2. Appointment Booking:</strong> Submitted requests represent slot preferences and do not guarantee instant reservations until manually confirmed via phone call or WhatsApp.
                  </p>
                  <p>
                    <strong>3. Clinic Policies:</strong> All treatments are personalized to individual patient symptoms and conditions, with custom session schedules configured after the initial expert clinical assessment.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </footer>
  );
}
