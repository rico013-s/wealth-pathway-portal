import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Briefcase, Users, Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RecruitmentBanner = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-gradient-to-r from-gray-900 via-black to-gray-900 border-y border-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="flex items-center gap-2 justify-center lg:justify-start mb-4">
              <Briefcase className="w-5 h-5 text-gold-500" />
              <span className="text-gold-500 font-semibold text-sm uppercase tracking-wider">Cariere</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Vrei să Faci Parte din <span className="text-gold-500">Echipa Noastră</span>?
            </h3>
            <p className="text-gray-400 max-w-xl">
              Căutăm oameni pasionați de finanțe și educație. Alătură-te unei echipe în creștere rapidă!
            </p>
          </div>

          {/* Stats & CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex gap-6 text-center">
              <div className="px-4">
                <div className="text-2xl font-bold text-gold-500">20+</div>
                <div className="text-xs text-gray-500">Echipă</div>
              </div>
              <div className="px-4 border-x border-gray-800">
                <div className="text-2xl font-bold text-gold-500">5</div>
                <div className="text-xs text-gray-500">Poziții Deschise</div>
              </div>
              <div className="px-4">
                <div className="text-2xl font-bold text-gold-500">Remote</div>
                <div className="text-xs text-gray-500">Flexibil</div>
              </div>
            </div>
            <Button 
              size="lg"
              className="bg-gold-500 hover:bg-gold-600 text-black font-semibold whitespace-nowrap"
              onClick={() => navigate('/cariere')}
            >
              Vezi Pozițiile <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecruitmentBanner;
