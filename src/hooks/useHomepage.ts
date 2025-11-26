import { useState, useEffect, ReactNode } from 'react';

// Feature interface
export interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
  items: string[];
}

// Feature data interface (without JSX)
export interface FeatureData {
  iconPath: string;
  title: string;
  description: string;
  items: string[];
}

// Subscription plan interface
export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  recommended?: boolean;
}

// Plans constant
export const plans: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Basic Plan',
    price: 7,
    interval: 'month',
    features: [
      'Up to 10 recordings per month',
      'Basic transcription',
      'Email support',
      'Standard intelligence analysis',
    ],
  },
  {
    id: 'professional',
    name: 'Professional Plan',
    price: 15,
    interval: 'month',
    recommended: true,
    features: [
      'Unlimited recordings',
      'Advanced Smart transcription',
      'Intelligence analytics',
      'Export options (PDF, CSV, JSON)',
      'Priority support',
      'Advanced search & filtering',
    ],
  },
];

// Features data constant (icon paths only, JSX will be in component)
export const featuresData: FeatureData[] = [
  {
    iconPath: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z",
    title: "Transcription",
    description: "Accurate, real-time transcription with speaker identification and timestamp precision",
    items: [
      "99%+ accuracy rate",
      "Multi-language support",
      "Speaker identification",
      "Real-time processing"
    ]
  },
  {
    iconPath: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    title: "Intelligence Analysis",
    description: "Automatically extract action items, decisions, issues, and questions from conversations",
    items: [
      "Action item detection",
      "Decision tracking",
      "Issue identification",
      "Question extraction"
    ]
  },
  {
    iconPath: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
    title: "Advanced Search & Filter",
    description: "Find any moment in your recordings with powerful search and time-based filtering",
    items: [
      "Full-text search",
      "Time range filtering",
      "Content categorization",
      "Instant results"
    ]
  },
  {
    iconPath: "M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M9 10V9a1 1 0 011-1h1m4 1h1a1 1 0 011 1v1m-4 3v1a1 1 0 01-1 1H9.586a1 1 0 01-.707-.293L6.465 13.293A1 1 0 016 12.586V11a1 1 0 011-1h1",
    title: "Integrated Audio Playback",
    description: "Listen to original recordings with synchronized transcript highlighting",
    items: [
      "High-quality playback",
      "Sync with transcript",
      "Speed controls",
      "Bookmark moments"
    ]
  },
  {
    iconPath: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    title: "Flexible Export Options",
    description: "Export your data in multiple formats for seamless integration with your workflow",
    items: [
      "PDF reports",
      "Word documents",
      "JSON data",
      "Plain text"
    ]
  },
  {
    iconPath: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    title: "Enterprise Security",
    description: "Bank-level security with end-to-end encryption and compliance certifications",
    items: [
      "End-to-end encryption",
      "SOC 2 compliance",
      "GDPR compliant",
      "Private cloud options"
    ]
  }
];

// Dummy transcription data for cycling demo
export const transcriptionExamples = [
  {
    id: 1,
    title: "Sales Team Meeting",
    lines: [
      { timestamp: "00:23", text: "Let's discuss the quarterly targets for our sales team..." },
      { timestamp: "00:31", text: "I think we should focus on customer retention this quarter." },
      { timestamp: "00:45", text: "Great point! Let's add that as an action item." }
    ]
  },
  {
    id: 2,
    title: "Project Planning",
    lines: [
      { timestamp: "01:12", text: "We need to finalize the project timeline for the Q2 launch." },
      { timestamp: "01:28", text: "The development team estimates 6 weeks for the core features." },
      { timestamp: "01:45", text: "Let's schedule weekly check-ins to track progress." }
    ]
  },
  {
    id: 3,
    title: "Client Consultation",
    lines: [
      { timestamp: "00:15", text: "Thank you for joining us today. Let's review your requirements." },
      { timestamp: "00:32", text: "We're looking for a solution that can scale with our growth." },
      { timestamp: "00:48", text: "Our platform is designed exactly for that kind of scalability." }
    ]
  },
  {
    id: 4,
    title: "Product Development",
    lines: [
      { timestamp: "02:05", text: "The user feedback indicates we need better mobile optimization." },
      { timestamp: "02:18", text: "I agree, mobile users represent 60% of our traffic now." },
      { timestamp: "02:34", text: "Let's prioritize the mobile-first redesign for next sprint." }
    ]
  },
  {
    id: 5,
    title: "Marketing Strategy",
    lines: [
      { timestamp: "00:42", text: "Our latest campaign generated a 23% increase in conversions." },
      { timestamp: "00:58", text: "That's excellent! What channels performed best?" },
      { timestamp: "01:15", text: "LinkedIn and email marketing showed the highest ROI." }
    ]
  },
  {
    id: 6,
    title: "Performance Review",
    lines: [
      { timestamp: "03:22", text: "You've consistently exceeded your targets this quarter." },
      { timestamp: "03:35", text: "Thank you! I've been focusing on improving my client relationships." },
      { timestamp: "03:52", text: "It shows. Your client satisfaction scores are outstanding." }
    ]
  }
];

// Features data - JSX icons should be defined in the component
// This helper is exported for use in the component

export const useHomepage = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [currentTranscriptionIndex, setCurrentTranscriptionIndex] = useState(0);
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const [subscriptionModal, setSubscriptionModal] = useState<{
    isOpen: boolean;
    plan: SubscriptionPlan | null;
  }>({
    isOpen: false,
    plan: null,
  });
  const [freeTrialModal, setFreeTrialModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Cycle through transcription examples
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTranscriptionIndex((prevIndex) => 
        (prevIndex + 1) % transcriptionExamples.length
      );
    }, 8000); // Change every 8 seconds

    return () => clearInterval(interval);
  }, []);

  // Auto-play carousel (infinite loop)
  useEffect(() => {
    if (isCarouselPaused) return;

    const interval = setInterval(() => {
      setCurrentFeatureIndex((prevIndex) => 
        (prevIndex + 1) % featuresData.length
      );
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [isCarouselPaused]);

  // Keyboard navigation for carousel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevFeature(featuresData.length);
        setIsCarouselPaused(true);
        // Resume auto-play after 10 seconds
        setTimeout(() => setIsCarouselPaused(false), 10000);
      } else if (e.key === 'ArrowRight') {
        goToNextFeature(featuresData.length);
        setIsCarouselPaused(true);
        // Resume auto-play after 10 seconds
        setTimeout(() => setIsCarouselPaused(false), 10000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const goToFeature = (index: number) => {
    setCurrentFeatureIndex(index);
    setIsCarouselPaused(true);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsCarouselPaused(false), 10000);
  };

  const goToPrevFeature = (featuresLength: number) => {
    setCurrentFeatureIndex((prevIndex) => 
      prevIndex === 0 ? featuresLength - 1 : prevIndex - 1
    );
    setIsCarouselPaused(true);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsCarouselPaused(false), 10000);
  };

  const goToNextFeature = (featuresLength: number) => {
    setCurrentFeatureIndex((prevIndex) => 
      (prevIndex + 1) % featuresLength
    );
    setIsCarouselPaused(true);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsCarouselPaused(false), 10000);
  };

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const handleSubscribe = (plan: SubscriptionPlan) => {
    setSubscriptionModal({
      isOpen: true,
      plan: plan,
    });
  };

  const closeSubscriptionModal = () => {
    setSubscriptionModal({
      isOpen: false,
      plan: null,
    });
  };

  const openFreeTrialModal = () => {
    setFreeTrialModal(true);
  };

  const closeFreeTrialModal = () => {
    setFreeTrialModal(false);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleCarouselPause = () => {
    setIsCarouselPaused(!isCarouselPaused);
  };

  return {
    // State
    openFAQ,
    currentTranscriptionIndex,
    currentFeatureIndex,
    subscriptionModal,
    freeTrialModal,
    isMobileMenuOpen,
    isCarouselPaused,
    
    // Functions
    goToFeature,
    goToPrevFeature,
    goToNextFeature,
    toggleFAQ,
    handleSubscribe,
    closeSubscriptionModal,
    openFreeTrialModal,
    closeFreeTrialModal,
    formatPrice,
    toggleMobileMenu,
    closeMobileMenu,
    toggleCarouselPause,
  };
};

