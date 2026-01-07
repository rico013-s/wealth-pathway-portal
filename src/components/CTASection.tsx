import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Phone, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const benefits = [
  'Consultanță gratuită inițială',
  'Plan personalizat de acțiune',
  'Acces la resurse exclusive',
  'Suport continuu',
];

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-gradient-to-br from-gold-500/10 via-black to-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-gold-500/20 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Pregătit Să-Ți <span className="text-gold-500">Transformi</span> Viitorul Financiar?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Fă primul pas astăzi. Echipa noastră te așteaptă să te ajute să-ți atingi obiectivele financiare.
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 text-gray-300">
                <CheckCircle className="w-5 h-5 text-gold-500" />
                {benefit}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-gold-500 hover:bg-gold-600 text-black font-bold text-lg px-10 py-6 rounded-xl shadow-lg shadow-gold-500/25"
              onClick={() => navigate('/register')}
            >
              Începe Acum Gratuit <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white/30 text-white hover:bg-white/10 text-lg px-10 py-6 rounded-xl"
              onClick={() => navigate('/consultanta')}
            >
              Solicită Consultanță
            </Button>
          </div>

          {/* Contact info */}
          <div className="flex flex-wrap justify-center gap-8 text-gray-400">
            <a href="tel:+40700000000" className="flex items-center gap-2 hover:text-gold-500 transition-colors">
              <Phone className="w-4 h-4" />
              +40 700 000 000
            </a>
            <a href="mailto:contact@markets4all.ro" className="flex items-center gap-2 hover:text-gold-500 transition-colors">
              <Mail className="w-4 h-4" />
              contact@markets4all.ro
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
