import { useEffect } from 'react';
import { BUSINESS_INFO, FAQS } from '../data';

export default function SEOHead() {
  useEffect(() => {
    // 1. Dynamic document metadata configuration
    const titleText = "Best Physiotherapist in Siwan | Sparsh Physiotherapy | Dr. Roshan Kumar Sharma";
    const descText = "Looking for the best physiotherapy clinic in Siwan? Sparsh Physiotherapy, headed by Dr. Roshan Kumar Sharma, offers expert Back Pain, Slip Disc, Sciatica, Frozen Shoulder, Paralysis, and Home Physiotherapy in Doctors Colony, Siwan, Bihar. Book on WhatsApp or call 9931964144.";
    
    document.title = titleText;

    // Helper to get or create meta tags
    const setMetaTag = (attrName: string, attrVal: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Update Meta Description
    setMetaTag('name', 'description', descText);
    setMetaTag('name', 'keywords', "Physiotherapist in Siwan, Best Physiotherapy Clinic in Siwan, Back Pain Treatment in Siwan, Neck Pain Specialist Siwan, Sports Injury Physiotherapist Siwan, Home Physiotherapy Siwan, Physiotherapy near Rajiv Nagar Siwan, Doctors Colony Physiotherapist Siwan, Dr Roshan Kumar Sharma, Sparsh Physiotherapy");

    // Open Graph (OG) tags
    setMetaTag('property', 'og:title', titleText);
    setMetaTag('property', 'og:description', descText);
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:url', window.location.href);
    setMetaTag('property', 'og:image', 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200');
    setMetaTag('property', 'og:site_name', BUSINESS_INFO.name);

    // Twitter Card tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', titleText);
    setMetaTag('name', 'twitter:description', descText);
    setMetaTag('name', 'twitter:image', 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200');

    // Canonical link tag
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', window.location.href);

    // 2. Generate and append Schema.org scripts
    const schemas = [
      // Schema 1: MedicalClinic / Local Business
      {
        "@context": "https://schema.org",
        "@type": "MedicalClinic",
        "@id": `${window.location.origin}/#clinic`,
        "name": BUSINESS_INFO.name,
        "image": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800",
        "description": descText,
        "telephone": BUSINESS_INFO.phone,
        "url": window.location.origin,
        "priceRange": "₹₹",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Rajiv Nagar, Pakri More, Doctors Colony",
          "addressLocality": "Siwan",
          "addressRegion": "Bihar",
          "postalCode": "841226",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "26.2155",
          "longitude": "84.3541"
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "09:00",
            "closes": "20:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Sunday"],
            "opens": "10:00",
            "closes": "14:00"
          }
        ],
        "medicalSpecialty": "Physiotherapy",
        "availableService": [
          "Back Pain Treatment",
          "Slip Disc Rehab",
          "Sciatica Therapy",
          "Paralysis Rehabilitation",
          "Home Physiotherapy"
        ]
      },

      // Schema 2: Physician (Dr. Roshan Kumar Sharma)
      {
        "@context": "https://schema.org",
        "@type": "Physician",
        "@id": `${window.location.origin}/#physician`,
        "name": BUSINESS_INFO.owner,
        "image": "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600",
        "telephone": BUSINESS_INFO.phone,
        "medicalSpecialty": "Physiotherapy",
        "jobTitle": BUSINESS_INFO.profession,
        "worksFor": {
          "@type": "MedicalClinic",
          "name": BUSINESS_INFO.name,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Doctors Colony",
            "addressLocality": "Siwan",
            "addressRegion": "Bihar",
            "addressCountry": "IN"
          }
        }
      },

      // Schema 3: FAQPage Schema
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": FAQS.slice(0, 10).map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      },

      // Schema 4: Breadcrumb Schema
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": window.location.origin
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Physiotherapist in Siwan",
            "item": `${window.location.origin}/#services`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": BUSINESS_INFO.name,
            "item": window.location.href
          }
        ]
      }
    ];

    // Remove any previously injected scripts by this component
    const oldScripts = document.querySelectorAll('script[data-seo="sparsh-schema"]');
    oldScripts.forEach(el => el.remove());

    // Inject new JSON-LD scripts
    schemas.forEach(schema => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo', 'sparsh-schema');
      script.text = JSON.stringify(schema);
      document.body.appendChild(script);
    });

    return () => {
      // Cleanup on unmount
      const scripts = document.querySelectorAll('script[data-seo="sparsh-schema"]');
      scripts.forEach(el => el.remove());
    };
  }, []);

  return null; // Purely side-effects component
}
