'use client';

import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import HowItWorksSection from './HowItWorksSection';
import TestimonialsSection from './TestimonialsSection';
import ChatbotSection from './ChatbotSection';
import CTASection from './CTASection';
import Footer from '@/components/Footer';

export default function HomepageInteractive() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <ChatbotSection />
      <CTASection />
      <Footer />
    </>
  );
}