import { useState, useEffect } from 'react';
import { Menu, X, Phone, CalendarRange } from 'lucide-react';
import { BUSINESS_INFO } from '../data';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      // Background styling toggle
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Track active section for indicator highlight
      const sections = ['home', 'about', 'why-us', 'services', 'offers', 'recovery', 'testimonials', 'faqs', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'Testimonials', href: '#testimonials', id: 'testimonials' },
    { name: 'FAQs', href: '#faqs', id: 'faqs' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-2 border-b border-slate-100'
          : 'bg-transparent py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Brand styling */}
          <a
            href="#home"
            id="brand-logo"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#home');
            }}
            className="flex items-center gap-2.5 group focus:outline-none shrink-0"
          >
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center shadow-md shadow-blue-200 group-hover:scale-105 transition-transform duration-200">
              <span className="font-display font-black text-lg text-white">S</span>
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-blue-900 leading-none group-hover:text-blue-600 transition-colors duration-200">Sparsh <span className="text-blue-600">Physiotherapy</span></h1>
              <p className="text-[8px] uppercase tracking-widest text-slate-400 font-bold mt-0.5">Advanced Rehabilitation Clinic</p>
            </div>
          </a>

          {/* Desktop Nav and CTA Buttons grouped to eliminate wide gap */}
          <div className="hidden lg:flex items-center gap-6">
            <nav id="desktop-nav" className="flex items-center gap-0.5">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    activeSection === link.id
                      ? 'text-blue-600 bg-blue-50/70 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="h-4 w-px bg-slate-200" />

            <div className="flex items-center gap-2.5">
              <a
                id="header-call-btn"
                href={`tel:${BUSINESS_INFO.phone}`}
                className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-bold text-xs px-3.5 py-2 rounded-xl border border-blue-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-200"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>+91 99319 64144</span>
              </a>
              
              <a
                id="header-book-btn"
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('#contact');
                }}
                className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md shadow-blue-500/15 hover:shadow-lg transition-all duration-200"
              >
                <CalendarRange className="w-3.5 h-3.5" />
                <span>Book Appointment</span>
              </a>
            </div>
          </div>

          {/* Tablet & Mobile Layout */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Show CTA buttons on Tablet */}
            <div className="hidden sm:flex items-center gap-2.5 mr-2">
              <a
                id="header-call-btn-tablet"
                href={`tel:${BUSINESS_INFO.phone}`}
                className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-bold text-xs px-3.5 py-2 rounded-xl border border-blue-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-200"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>+91 99319 64144</span>
              </a>
              
              <a
                id="header-book-btn-tablet"
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('#contact');
                }}
                className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md shadow-blue-500/15 hover:shadow-lg transition-all duration-200"
              >
                <CalendarRange className="w-3.5 h-3.5" />
                <span>Book Appointment</span>
              </a>
            </div>

            {/* Mobile Icon */}
            <a
              id="mobile-header-call"
              href={`tel:${BUSINESS_INFO.phone}`}
              className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all sm:hidden"
              aria-label="Call Clinic"
            >
              <Phone className="w-4.5 h-4.5" />
            </a>
            <button
              id="mobile-menu-trigger"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all duration-200 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Sidebar Drawer Menu */}
      <div
        id="mobile-sidebar-backdrop"
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      <div
        id="mobile-sidebar-drawer"
        className={`fixed top-0 bottom-0 right-0 w-80 max-w-[85vw] bg-white z-50 p-6 shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-out transform lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                S
              </div>
              <span className="font-display font-bold text-lg text-slate-900">
                Sparsh Physiotherapy
              </span>
            </div>
            <button
              id="mobile-menu-close"
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-50 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav id="mobile-nav" className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                id={`mobile-nav-link-${link.id}`}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className={`px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                  activeSection === link.id
                    ? 'text-blue-600 bg-blue-50/80 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>

        <div className="border-t border-slate-100 pt-6 flex flex-col gap-3">
          <a
            id="mobile-sidebar-call-btn"
            href={`tel:${BUSINESS_INFO.phone}`}
            className="flex items-center justify-center gap-2 text-blue-600 font-bold py-3 px-4 rounded-xl border border-blue-200 hover:bg-blue-50 transition-all text-center"
          >
            <Phone className="w-4 h-4" />
            <span>Call +91 99319 64144</span>
          </a>
          <a
            id="mobile-sidebar-book-btn"
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#contact');
            }}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all text-center"
          >
            <span>Book Appointment</span>
          </a>
        </div>
      </div>
    </header>
  );
}
