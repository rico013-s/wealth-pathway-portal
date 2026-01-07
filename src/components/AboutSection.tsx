import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Target, Eye, Heart, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const values = [
  {
    icon: Target,
    title: 'Misiune',
    description: 'Democratizăm accesul la educație financiară de calitate și oportunități de investiții pentru toți românii.',
  },
  {
    icon: Eye,
    title: 'Viziune',
    description: 'Să devenim liderul în transformarea financiară personală din Europa de Est.',
  },
  {
    icon: Heart,
    title: 'Valori',
    description: 'Transparență, integritate și dedicare pentru succesul fiecărui client.',
  },
  {
    icon: Award,
    title: 'Excelență',
    description: 'Standarde înalte în tot ceea ce facem, de la educație până la servicii.',
  },
];

const AboutSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-gold-500/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          {/* Left content */}
          <div>
            <span className="text-gold-500 text-sm font-semibold uppercase tracking-wider">Despre Noi</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
              Povestea <span className="text-gold-500">Markets4all</span>
            </h2>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              Fondată în 2020, Markets4all a pornit de la o idee simplă: să facem educația financiară 
              accesibilă pentru toți. De atunci, am ajutat mii de români să-și transforme relația cu banii.
            </p>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Echipa noastră reunește traderi profesioniști, consultanți financiari certificați și 
              pasionați de educație. Împreună, creăm conținut de valoare și oferim servicii care 
              fac diferența în viața clienților noștri.
            </p>
            <Button 
              size="lg"
              className="bg-gold-500 hover:bg-gold-600 text-black font-semibold"
              onClick={() => navigate('/despre-noi')}
            >
              Află Mai Multe <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Right - Values grid */}
          <div className="grid grid-cols-2 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div 
                  key={index}
                  className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:border-gold-500/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-gold-500" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
