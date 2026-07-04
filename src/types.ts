export interface Service {
  id: string;
  title: string;
  category: 'treatment' | 'therapy' | 'rehab';
  description: string;
  benefits: string[];
  duration: string;
  startingPrice: string;
  iconName: string; // Used to dynamically map Lucide icons
  image: string; // Unsplash high-quality medical image link
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  text: string;
  isGoogleBusiness: boolean;
  initials: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'treatment' | 'appointments' | 'cost';
}

export interface Offer {
  id: string;
  title: string;
  badge: string;
  description: string;
  originalPrice?: string;
  offerPrice: string;
  validity: string;
  ctaText: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'clinic' | 'equipment' | 'treatment' | 'exercise';
  imageUrl: string;
  description: string;
}
