import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThreeBackground from '@/components/ThreeBackground';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import CompaniesSection from '@/components/CompaniesSection';
import EducationalSection from '@/components/EducationalSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import AboutSection from '@/components/AboutSection';
import CTASection from '@/components/CTASection';
import RecruitmentBanner from '@/components/RecruitmentBanner';

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="relative">
        <ThreeBackground />
        <HeroSection />
        <ServicesSection />
        <CompaniesSection />
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
