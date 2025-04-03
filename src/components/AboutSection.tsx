
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">About WealthPathway</h2>
            <p className="text-lg mb-8 text-navy-700">
              WealthPathway was founded in 2020 with a simple mission: to demystify investing 
              and connect people with the right financial partners based on their unique needs.
            </p>
            
            <div className="space-y-6 text-navy-700">
              <p>
                Our team of financial experts has over 50 years of combined experience in the investment industry. 
                We've carefully vetted each of our partner companies to ensure they meet our strict standards for 
                performance, transparency, and client service.
              </p>
              
              <p>
                Unlike traditional investment firms, we don't push a one-size-fits-all approach. 
                We believe that everyone's financial journey is unique, and our consultancy service 
                is designed to find the perfect match for your specific situation.
              </p>
              
              <p>
                Whether you're just starting with a small amount to invest or you're looking to optimize 
                a substantial portfolio, WealthPathway provides the guidance and connections you need to succeed.
              </p>
            </div>
          </div>
          
          <div className="lg:w-1/2 grid grid-cols-2 gap-4">
            <Card className="bg-navy-50 border-navy-200">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-navy-800 mb-2">15+</div>
                <p className="text-navy-600">Partner Companies</p>
              </CardContent>
            </Card>
            
            <Card className="bg-forest-50 border-forest-200">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-forest-800 mb-2">5,000+</div>
                <p className="text-forest-600">Clients Matched</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gold-50 border-gold-200">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-gold-800 mb-2">$250M+</div>
                <p className="text-gold-600">Assets Managed</p>
              </CardContent>
            </Card>
            
            <Card className="bg-navy-50 border-navy-200">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-navy-800 mb-2">98%</div>
                <p className="text-navy-600">Client Satisfaction</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
