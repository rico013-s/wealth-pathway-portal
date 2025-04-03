
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="bg-black text-white pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Găsește calea perfectă pentru investițiile tale
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-xl">
              Te conectăm cu partenerii de investiții potriviți, în funcție de obiectivele, experiența și resursele tale. Începe să-ți construiești averea astăzi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gold-500 hover:bg-gold-600 text-black font-semibold">
                Explorează opțiunile <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Află mai multe
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center animate-slide-up">
            <div className="relative">
              <div className="absolute -left-6 -top-6 w-64 h-64 bg-gold-500/20 rounded-full blur-3xl"></div>
              <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-gold-500/20 rounded-full blur-3xl"></div>
              <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl p-8 relative z-10">
                <div className="text-center text-white mb-6">
                  <h3 className="text-2xl font-bold mb-2">Calculator de investiții</h3>
                  <p className="text-gray-300">Vezi cum pot crește banii tăi</p>
                </div>
                <div className="space-y-4 text-white">
                  <div>
                    <label className="block text-sm font-medium mb-1">Investiție inițială</label>
                    <div className="border border-gray-700 rounded-md px-4 py-2 bg-gray-800">10.000 lei</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Contribuție lunară</label>
                    <div className="border border-gray-700 rounded-md px-4 py-2 bg-gray-800">500 lei</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Perioadă de timp (ani)</label>
                    <div className="border border-gray-700 rounded-md px-4 py-2 bg-gray-800">10</div>
                  </div>
                  <Button className="w-full bg-gold-500 hover:bg-gold-600 text-black">Calculează</Button>
                  <p className="text-sm text-gray-300 text-center mt-2">Creștere potențială: <span className="font-bold text-gold-500">110.000+ lei</span></p>
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
