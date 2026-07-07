import { useState, useEffect } from 'react';
import SEOHead from './components/SEOHead';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import About from './components/About';
import WhyChooseUs from './components/WhyChooseUs';
import Services from './components/Services';
import RecoveryProcess from './components/RecoveryProcess';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import FloatingCTAs from './components/FloatingCTAs';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';

export default function App() {
  const [isAdminView, setIsAdminView] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      setIsAdminView(window.location.hash === '#/admin');
    };

    // Initialize check
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (isAdminView) {
    return <AdminPanel onClose={() => { window.location.hash = ''; }} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-900">
      
      {/* 1. Dynamic Search-Engine Optimization Engine */}
      <SEOHead />

      {/* 2. Premium Sticky Header Navigation */}
      <Header />

      {/* 3. Main Clinical Landing Architecture */}
      <main id="main-content">
        <Hero />
        <TrustBar />
        <About />
        <WhyChooseUs />
        <Services />
        <RecoveryProcess />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>

      {/* 4. Brand and Legal Footer */}
      <Footer />

      {/* 5. Sticky Direct WhatsApp, Call, & Scroll-To-Top controls */}
      <FloatingCTAs />

    </div>
  );
}
