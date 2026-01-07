import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Play, TrendingUp, Users, Award, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const stats = [
  { value: '15+', label: 'Companii Partenere', icon: Shield },
  { value: '5,000+', label: 'Clienți Activi', icon: Users },
  { value: '€2M+', label: 'Capital Administrat', icon: TrendingUp },
  { value: '98%', label: 'Rată Satisfacție', icon: Award },
];

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold-500/10 via-transparent to-transparent" />
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(212,175,55,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(212,175,55,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Top badge */}
          <div className="flex justify-center mb-8">
            <Badge className="bg-gold-500/10 text-gold-500 border-gold-500/30 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              🏆 Lider în Educație Financiară din România
            </Badge>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-6 leading-tight">
            Transformă-ți Viitorul
            <span className="block text-gold-500 mt-2">Financiar Astăzi</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-300 text-center max-w-3xl mx-auto mb-10">
            Educație financiară premium, consultanță personalizată și acces la cele mai bune 
            oportunități de investiții. Alătură-te comunității Markets4all.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-gold-500 hover:bg-gold-600 text-black font-bold text-lg px-8 py-6 rounded-xl shadow-lg shadow-gold-500/25 transition-all hover:shadow-gold-500/40 hover:scale-105"
              onClick={() => navigate('/register')}
            >
              Începe Gratuit <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white/20 text-white hover:bg-white/10 text-lg px-8 py-6 rounded-xl backdrop-blur-sm"
              onClick={() => navigate('/educatie')}
            >
              <Play className="mr-2 h-5 w-5" /> Vezi Cursurile
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index} 
                  className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all"
                >
                  <Icon className="w-6 h-6 text-gold-500 mx-auto mb-3" />
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
};

export default HeroSection;
