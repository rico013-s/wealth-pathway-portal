
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import CompaniesSection from '@/components/CompaniesSection';
import ComparisonSection from '@/components/ComparisonSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import EducationalSection from '@/components/EducationalSection';
import RecruitmentBanner from '@/components/RecruitmentBanner';
const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <CompaniesSection />
        <ComparisonSection />
        <EducationalSection />
        <TestimonialsSection />
        <AboutSection />
        <RecruitmentBanner />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
