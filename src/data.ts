import { Service, Review, FAQItem, Offer, GalleryItem } from './types';

export const BUSINESS_INFO = {
  name: "Sparsh Physiotherapy",
  owner: "Dr. Roshan Kumar Sharma",
  profession: "Physiotherapist & Rehabilitation Specialist",
  degree: "B.P.T (Bachelor of Physiotherapy)",
  experience: "12+ Years of Clinical Excellence",
  address: "Rajiv Nagar, Pakri More, Doctors Colony, Siwan, Bihar, 841226",
  addressShort: "Doctors Colony, Siwan, Bihar",
  phone: "+919931964144",
  phoneFormatted: "9931964144",
  whatsapp: "+919931964144",
  whatsappFormatted: "9931964144",
  whatsappMsg: "Hi Dr. Roshan, I would like to book a physiotherapy consultation at Sparsh Physiotherapy clinic.",
  email: "sparshphysiosiwan@gmail.com",
  workingHours: {
    weekdays: "09:00 am to 05:00 pm",
    sunday: "Closed"
  },
  stats: {
    experienceYears: 12,
    happyPatients: "5,000+",
    successRate: "100%",
    consultationFee: "₹300"
  },
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3581.419409893798!2d84.3541543!3d26.2155823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3992fbe0e2f9d51f%3A0xe21f4523c92c8d23!2sSiwan%2C%20Bihar!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
};

export const TRUST_POINTS = [
  "Experienced Physiotherapist",
  "Personalized Treatment",
  "Affordable Treatment",
  "Modern Equipment",
  "Easy Appointment",
  "Patient-Focused Care"
];

export const SERVICES: Service[] = [
  {
    id: "back-pain",
    title: "Back Pain Treatment",
    category: "treatment",
    description: "Comprehensive relief from acute and chronic lower back pain, mechanical back pain, and muscle spasms using advanced manual therapy and mobilization.",
    benefits: ["Rapid pain reduction", "Improved lumbar flexibility", "Strengthened core muscles", "Prevention of recurrence"],
    duration: "40 - 50 Mins",
    startingPrice: "₹350",
    iconName: "Activity",
    image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "neck-pain",
    title: "Neck Pain & Cervical Care",
    category: "treatment",
    description: "Expert therapeutic treatment for neck stiffness, cervical spondylosis, tension headaches, and posture-induced neck strain.",
    benefits: ["Restores neck range of motion", "Relieves radiating nerve pain", "Reduces shoulder stiffness", "Corrects text-neck alignment"],
    duration: "30 - 45 Mins",
    startingPrice: "₹300",
    iconName: "ShieldAlert",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "slip-disc",
    title: "Slip Disc Management",
    category: "treatment",
    description: "Non-surgical, scientific decompression and targeted exercise protocols for herniated or bulging discs to relieve nerve compression.",
    benefits: ["Avoids invasive spine surgeries", "Relieves sciatic nerve irritation", "Restores spinal stability", "Safe progressive loading exercises"],
    duration: "45 - 60 Mins",
    startingPrice: "₹400",
    iconName: "Stretcher",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "sciatica",
    title: "Sciatica Treatment",
    category: "treatment",
    description: "Effective clinical treatment focused on freeing the pinched sciatic nerve, alleviating burning pain radiating down the leg.",
    benefits: ["Eliminates radiating leg pain", "Improves walking capacity", "Reduces numbness & tingling", "Restores neural mobility"],
    duration: "45 - 50 Mins",
    startingPrice: "₹350",
    iconName: "Zap",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "frozen-shoulder",
    title: "Frozen Shoulder (Adhesive Capsulitis)",
    category: "treatment",
    description: "Gentle joint mobilization, stretching, and pain-management modalities to restore full overhead reach and eliminate night pain.",
    benefits: ["Restores full shoulder mobility", "Eliminates sleep-disrupting pain", "Speeds up recovery stages", "Hands-on joint distraction"],
    duration: "40 - 50 Mins",
    startingPrice: "₹350",
    iconName: "RotateCw",
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "knee-pain",
    title: "Knee Pain & Osteoarthritis",
    category: "treatment",
    description: "Evidence-based strength training, joint alignment correction, and electrotherapy for osteoarthritis and cartilage wear.",
    benefits: ["Postpones or avoids knee replacement", "Increases walking endurance", "Reduces joint inflammation", "Strengthens quadriceps & hamstrings"],
    duration: "45 Mins",
    startingPrice: "₹300",
    iconName: "TrendingUp",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "sports-injury",
    title: "Sports Injury Rehabilitation",
    category: "rehab",
    description: "Advanced rehabilitation for ligament tears (ACL, MCL), ankle sprains, tennis elbow, and rotator cuff injuries for athletes in Siwan.",
    benefits: ["Accelerated safe return to sports", "Enhanced athletic performance", "Corrects muscle imbalances", "Injury prevention conditioning"],
    duration: "45 - 60 Mins",
    startingPrice: "₹400",
    iconName: "Award",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "post-surgery-rehab",
    title: "Post-Surgery Rehabilitation",
    category: "rehab",
    description: "Structured recovery protocols after knee replacement, hip replacement, ligament reconstruction, or spinal surgeries.",
    benefits: ["Prevents post-op joint stiffness", "Safely rebuilds muscle volume", "Restores natural walking pattern", "Reduces post-surgical swelling"],
    duration: "50 - 60 Mins",
    startingPrice: "₹400",
    iconName: "Heart",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "paralysis-stroke",
    title: "Stroke & Paralysis Rehab",
    category: "rehab",
    description: "Neurological rehabilitation utilizing PNF stretching, neurodevelopmental therapy, and muscle re-education to regain physical independence.",
    benefits: ["Restores movement coordination", "Improves balance and gait stability", "Reduces spasticity & muscle tightness", "Promotes independent daily activities"],
    duration: "60 Mins",
    startingPrice: "₹500",
    iconName: "UserCheck",
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "home-physio",
    title: "Home Visit Physiotherapy",
    category: "therapy",
    description: "Professional, clinical-grade physiotherapy sessions delivered directly to the comfort of your home in Siwan for patients with mobility limits.",
    benefits: ["Zero travel hassle for painful conditions", "Excellent for post-op/elderly", "Personalized home safety advice", "Flexible and comfortable treatment"],
    duration: "50 - 60 Mins",
    startingPrice: "₹700",
    iconName: "Home",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "elderly-physio",
    title: "Elderly Physiotherapy",
    category: "therapy",
    description: "Gentle balance training, fall prevention, joint pain relief, and strength restoration for senior citizens.",
    benefits: ["Reduces risk of dangerous falls", "Alleviates chronic arthritis stiffness", "Boosts daily stamina & confidence", "Enhances senior functional independence"],
    duration: "40 - 50 Mins",
    startingPrice: "₹300",
    iconName: "ShieldCheck",
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "electrotherapy",
    title: "Electrotherapy (IFT, TENS, US)",
    category: "therapy",
    description: "Advanced pain-relief technology using Interferential Therapy (IFT), Ultrasound, and TENS to trigger cellular healing and deep tissue recovery.",
    benefits: ["Incredibly fast pain reduction", "Improves localized blood flow", "Reduces swelling and inflammation", "Non-invasive and safe sensation"],
    duration: "30 Mins",
    startingPrice: "₹250",
    iconName: "Sparkles",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "manual-therapy",
    title: "Manual Therapy & Dry Needling",
    category: "therapy",
    description: "Hands-on spinal manipulation, myofascial release, joint mobilization, and optional dry needling for immediate trigger point pain relief.",
    benefits: ["Releases stubborn muscle knots", "Instant joint decompression", "Improves biomechanical alignment", "Neurological pain modulation"],
    duration: "40 Mins",
    startingPrice: "₹400",
    iconName: "Hand",
    image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "posture-correction",
    title: "Posture Correction & Ergonomics",
    category: "therapy",
    description: "Comprehensive alignment assessment and training to correct rounded shoulders, lordosis, and computer posture related issues.",
    benefits: ["Eliminates occupational pain", "Restores confident upright posture", "Strengthens scapular stabilizers", "Personalized office desk setup tips"],
    duration: "40 Mins",
    startingPrice: "₹300",
    iconName: "Compass",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=600"
  }
];

export const WHY_CHOOSE_US = [
  {
    title: "Experienced Specialist",
    description: "Headed by Dr. Roshan Kumar Sharma with over 12 years of successful clinical treatments resolving challenging pain cases.",
    iconName: "Award"
  },
  {
    title: "Scientific Approach",
    description: "Treatment based on state-of-the-art evidence, structured assessments, and proven orthopedic physiotherapy models.",
    iconName: "Binary"
  },
  {
    title: "Modern Equipment",
    description: "Equipped with high-tech therapeutic tools including advanced IFT, localized Ultrasound, TENS, and professional exercise rigs.",
    iconName: "Cpu"
  },
  {
    title: "Personalized Recovery Plans",
    description: "No cookie-cutter routines. We design customized daily treatment progressions tailored exclusively to your pain levels.",
    iconName: "FileText"
  },
  {
    title: "Friendly & Warm Environment",
    description: "Enjoy stress-free healing in a sanitary, clean, premium healthcare clinic setting based in Doctors Colony, Siwan.",
    iconName: "Smile"
  },
  {
    title: "Affordable Clinical Pricing",
    description: "Premium physical rehabilitation services designed to be accessible and cost-effective for all families in Bihar.",
    iconName: "BadgeIndianRupee"
  },
  {
    title: "Flexible Appointment Slots",
    description: "Convenient scheduling from morning to late evening to suit office workers, business owners, and senior citizens alike.",
    iconName: "CalendarClock"
  },
  {
    title: "Fast & Lasting Pain Relief",
    description: "Our core mission is focused on diagnosing root causes, providing rapid relief, and strengthening muscles for long-term health.",
    iconName: "Zap"
  }
];

export const SPECIAL_OFFERS: Offer[] = [
  {
    id: "consultation-discount",
    title: "First Consultation Discount",
    badge: "New Patient Special",
    description: "Book your very first clinical session online on WhatsApp or call today and receive a flat discount on our expert posture assessment and doctor consultation fee.",
    originalPrice: "₹500",
    offerPrice: "₹300",
    validity: "Limited Time Offer",
    ctaText: "Claim ₹300 Consultation"
  },
  {
    id: "monthly-rehab-plan",
    title: "10-Session Pain Relief Package",
    badge: "Best Value Plan",
    description: "Specially designed for chronic sciatica, slip disc, paralysis rehabilitation, or post-surgery healing. Includes electrotherapy & personalized exercises.",
    originalPrice: "₹3500",
    offerPrice: "₹2999",
    validity: "Save ₹500 immediately",
    ctaText: "Book 10-Session Plan"
  },
  {
    id: "senior-citizen",
    title: "Senior Citizen Wellness Discount",
    badge: "Care for Elders",
    description: "Dedicated flat 10% discount on all physical therapy packages and home visits for elderly citizens above the age of 60 suffering from knee osteoarthritis.",
    offerPrice: "10% OFF",
    validity: "Always Available for Elders",
    ctaText: "Avail Senior Care"
  }
];

export const RECOVERY_STEPS = [
  {
    step: "1",
    title: "Detailed Consultation",
    description: "Sit down with Dr. Roshan Kumar Sharma to map out your full medical history, daily habits, and pain onset.",
    iconName: "MessageSquareText"
  },
  {
    step: "2",
    title: "Comprehensive Physical Assessment",
    description: "We evaluate your joint mobility, spinal alignment, muscle strength, nerve tension, and postural imbalance.",
    iconName: "Eye"
  },
  {
    step: "3",
    title: "Root Cause Diagnosis",
    description: "Identify the exact anatomical source of your discomfort (e.g., muscle strain vs. disc herniation vs. ligament laxity).",
    iconName: "SearchCheck"
  },
  {
    step: "4",
    title: "Customized Treatment Plan",
    description: "A customized medical blueprint combining targeted manual therapies, active workouts, and physical electro-modalities.",
    iconName: "FileHeart"
  },
  {
    step: "5",
    title: "Active Clinical Therapy",
    description: "Consistent hands-on sessions at our Rajiv Nagar clinic utilizing modern equipment, pain modulators, and progressive exercises.",
    iconName: "Sparkles"
  },
  {
    step: "6",
    title: "Follow-up & Home Exercise Guide",
    description: "Providing a maintenance exercise guide and progress checks to prevent future injuries and ensure life-long mobility.",
    iconName: "Smile"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    title: "Modern Physiotherapy Cabin",
    category: "clinic",
    description: "Our pristine and fully hygienic clinical therapy cabins prioritizing patient privacy and comfortable treatment.",
    imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "g2",
    title: "Electrotherapy Equipment",
    category: "equipment",
    description: "Premium digital IFT, localized Ultrasound, and high-frequency TENS units designed for immediate cellular healing and pain block.",
    imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "g3",
    title: "Manual Spinal Adjustments",
    category: "treatment",
    description: "Expert hands-on osteopathic manipulation and cervical decompression to release compressed nerves.",
    imageUrl: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "g4",
    title: "Knee Rehabilitation Section",
    category: "exercise",
    description: "Specialized resistance bands, weights, and alignment mirrors for post-surgery knee and hip strengthening.",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "g5",
    title: "Posture Corrective Exercises",
    category: "exercise",
    description: "Scientific therapeutic exercises focusing on core activation, scapular retraction, and posture recovery.",
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "g6",
    title: "Neurological Balance Board",
    category: "equipment",
    description: "Proprioception and coordination devices used for recovering balance in stroke, paralysis, and athletic ankle injuries.",
    imageUrl: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800"
  }
];

export const TESTIMONIALS: Review[] = [
  {
    id: "r1",
    name: "Amitesh Kumar Rai",
    rating: 5,
    date: "2 weeks ago",
    text: "I was suffering from severe lower back pain and sciatica for 6 months. I visited Sparsh Physiotherapy in Doctors Colony. Dr. Roshan analyzed my case perfectly. Within 8 sessions of combining IFT and deep exercises, my radiating leg pain is completely gone! Best physiotherapist in Siwan.",
    isGoogleBusiness: true,
    initials: "AR"
  },
  {
    id: "r2",
    name: "Priyanka Singh",
    rating: 5,
    date: "1 month ago",
    text: "Dr. Roshan is exceptionally polite and extremely knowledgeable. My mother was unable to walk due to severe knee osteoarthritis. The personalized exercise therapy and ultrasound treatment she received here worked wonders. Highly recommended for senior citizen physiotherapy.",
    isGoogleBusiness: true,
    initials: "PS"
  },
  {
    id: "r3",
    name: "Ranjan Prasad Yadav",
    rating: 5,
    date: "3 weeks ago",
    text: "Extremely clean and premium clinic. I had a severe frozen shoulder with very limited hand movement. The mobilization and manual techniques used by Dr. Roshan helped me recover my full arm movement in just two weeks of regular therapy. The prices are also very reasonable.",
    isGoogleBusiness: true,
    initials: "RY"
  },
  {
    id: "r4",
    name: "Vikash Kumar Gupta",
    rating: 5,
    date: "2 months ago",
    text: "After my ACL knee surgery, I was very nervous about rehabilitation. Dr. Roshan made a step-by-step post-surgery rehabilitation plan for me. His focus on correct posture and muscular balance helped me get back to running safely. Grateful to Sparsh Physiotherapy!",
    isGoogleBusiness: true,
    initials: "VG"
  },
  {
    id: "r5",
    name: "Shanti Devi",
    rating: 5,
    date: "1 month ago",
    text: "My grandfather had partial paralysis on his left side after a stroke. We requested home visit physiotherapy. Dr. Roshan came regularly to our house near Rajiv Nagar. His dedication, patience, and professional neurological rehabilitation exercises have made my grandfather stand on his own feet again.",
    isGoogleBusiness: true,
    initials: "SD"
  },
  {
    id: "r6",
    name: "Dr. Sandeep Kumar",
    rating: 5,
    date: "3 months ago",
    text: "As a doctor myself, I am very selective about physical therapy. Dr. Roshan Kumar Sharma follows a strictly scientific, evidence-based physiotherapy approach. The dry needling and clinical joint adjustments are executed with absolute precision. Best clinic in Siwan for muscle strain and slip disc.",
    isGoogleBusiness: true,
    initials: "SK"
  }
];

export const FAQS: FAQItem[] = [
  {
    id: "faq1",
    category: "general",
    question: "How many physiotherapy sessions will I need to recover?",
    answer: "The number of sessions depends entirely on your specific diagnosis, the severity of the condition, and how long you've had it. Acute muscle strains may resolve in 3 to 5 sessions, whereas chronic slip disc, severe sciatica, frozen shoulder, or post-surgery recovery may require 10 to 15 structured sessions."
  },
  {
    id: "faq2",
    category: "treatment",
    question: "Is physical therapy painful?",
    answer: "Physiotherapy is designed to relieve pain, not cause it! While some deep tissue manual therapy techniques, joint mobilizations, or initial stretches can cause mild soreness or temporary discomfort as tight areas release, Dr. Roshan monitors your tolerance closely and ensures a gentle, patient-friendly experience."
  },
  {
    id: "faq3",
    category: "appointments",
    question: "Do I need a doctor's prescription to visit Sparsh Physiotherapy?",
    answer: "No, a direct prescription is not mandatory. You can book an appointment directly for physical assessment. However, if you have already consulted an orthopedic doctor or neurologist and have MRI reports, X-rays, or prescriptions, please bring them along for a more coordinated rehabilitation program."
  },
  {
    id: "faq4",
    category: "treatment",
    question: "What main conditions do you treat at your Siwan clinic?",
    answer: "We treat a wide range of conditions, including back pain, neck pain, slip disc, sciatica, frozen shoulder, knee pain, arthritis, sports injuries, post-surgery rehabilitation (knee/hip replacements), paralysis rehabilitation, stroke rehab, cervical spondylosis, muscle strains, joint stiffness, and posture correction."
  },
  {
    id: "faq5",
    category: "appointments",
    question: "Do you offer Home Physiotherapy visits in Siwan?",
    answer: "Yes! We understand that patients with severe paralysis, post-operative limitations, or extreme acute pain cannot travel. We offer high-quality, professional home visit physiotherapy within Siwan (Rajiv Nagar, Pakri More, Doctors Colony, and surrounding local areas)."
  },
  {
    id: "faq6",
    category: "cost",
    question: "How are treatment sessions structured and planned at Sparsh Physiotherapy?",
    answer: "Each treatment plan is customized based on your initial clinical assessment. Sessions are tailored to your recovery goals, utilizing a blend of advanced electrotherapy modalities (IFT, Ultrasound, TENS) and specialized manual exercise therapy. We also offer comprehensive, multi-session rehabilitation packages for systematic long-term recovery."
  },
  {
    id: "faq7",
    category: "treatment",
    question: "Do you treat sports injuries for local athletes?",
    answer: "Yes, we specialize in sports injury rehabilitation. We treat ligament sprains (ACL, MCL, ankle sprain), tendonitis, tennis elbow, muscle pulls, and hamstring strains. Our focus is restoring athletic performance, speed, and biomechanical agility."
  },
  {
    id: "faq8",
    category: "treatment",
    question: "Can elderly patients benefit from your physiotherapy?",
    answer: "Absolutely. Geriatric physiotherapy is highly effective in treating age-related osteoarthritis knee pain, stiff joints, osteoporosis, and improving general balancing capacity to prevent dangerous falls. It significantly boosts independent living."
  },
  {
    id: "faq9",
    category: "general",
    question: "What should I wear or bring for my first consultation?",
    answer: "We recommend wearing comfortable, loose-fitting clothing (like a track pants or t-shirt) that allows easy movement and access to the painful area (e.g., knee or shoulder). Please bring any recent X-rays, MRI scans, or medical documents you possess."
  },
  {
    id: "faq10",
    category: "treatment",
    question: "What is Electrotherapy and is it safe?",
    answer: "Electrotherapy involves the use of gentle physical waves such as Interferential Therapy (IFT), Ultrasound, and TENS. These devices send micro-currents or acoustic sound vibrations to stimulate deep tissue healing, improve blood circulation, and block pain signals. It is 100% safe, non-invasive, and FDA-approved."
  },
  {
    id: "faq11",
    category: "general",
    question: "Who is the lead physiotherapist at your clinic?",
    answer: "All treatments are headed and directly supervised by Dr. Roshan Kumar Sharma, an exceptionally experienced physiotherapist with over 12 years of clinical practice in leading rehabilitation and physical therapy setups."
  },
  {
    id: "faq12",
    category: "appointments",
    question: "Should I book an appointment via WhatsApp or Call?",
    answer: "Both methods are extremely fast and convenient! You can click our Call buttons to speak with us directly, or send a quick message on WhatsApp to reserve your preferred consultation slot."
  },
  {
    id: "faq13",
    category: "cost",
    question: "Do you offer discount packages for chronic paralysis patients?",
    answer: "Yes, we offer specialized monthly packages with flat discounts for patients requiring long-term treatment, such as stroke paralysis recovery, post-spinal cord injury, or cerebral palsy rehabilitation."
  }
];
