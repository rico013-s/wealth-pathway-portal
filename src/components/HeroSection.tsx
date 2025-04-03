
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="hero-gradient text-white pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Find Your Perfect Investment Path
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-100 max-w-xl">
              We connect you with the right investment partners based on your goals, experience, and resources. Start building your wealth today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gold-500 hover:bg-gold-600 text-navy-900 font-semibold">
                Explore Options <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center animate-slide-up">
            <div className="relative">
              <div className="absolute -left-6 -top-6 w-64 h-64 bg-forest-600/20 rounded-full blur-3xl"></div>
              <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-gold-500/20 rounded-full blur-3xl"></div>
              <div className="bg-white rounded-2xl shadow-2xl p-8 relative z-10">
                <div className="text-center text-navy-800 mb-6">
                  <h3 className="text-2xl font-bold mb-2">Investment Calculator</h3>
                  <p className="text-navy-600">See how your money can grow</p>
                </div>
                <div className="space-y-4 text-navy-800">
                  <div>
                    <label className="block text-sm font-medium mb-1">Initial Investment</label>
                    <div className="border border-gray-300 rounded-md px-4 py-2 bg-gray-50">$10,000</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Monthly Contribution</label>
                    <div className="border border-gray-300 rounded-md px-4 py-2 bg-gray-50">$500</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Time Horizon (Years)</label>
                    <div className="border border-gray-300 rounded-md px-4 py-2 bg-gray-50">10</div>
                  </div>
                  <Button className="w-full bg-navy-800 hover:bg-navy-900 text-white">Calculate</Button>
                  <p className="text-sm text-navy-600 text-center mt-2">Potential Growth: <span className="font-bold text-forest-700">$110,000+</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
