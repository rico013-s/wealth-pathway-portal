import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Shield, Star, CheckCircle } from 'lucide-react';

const partners = [
  { name: 'FTMO', category: 'Prop Trading', rating: 4.9 },
  { name: 'The Funded Trader', category: 'Prop Trading', rating: 4.8 },
  { name: 'MyForexFunds', category: 'Prop Trading', rating: 4.7 },
  { name: 'True Forex Funds', category: 'Prop Trading', rating: 4.8 },
  { name: 'E8 Funding', category: 'Prop Trading', rating: 4.6 },
  { name: 'Fidelcrest', category: 'Prop Trading', rating: 4.7 },
  { name: 'Allianz', category: 'Asigurări', rating: 4.9 },
  { name: 'NN Asigurări', category: 'Asigurări', rating: 4.8 },
  { name: 'Generali', category: 'Asigurări', rating: 4.7 },
  { name: 'XTB', category: 'Broker', rating: 4.8 },
  { name: 'Interactive Brokers', category: 'Broker', rating: 4.9 },
  { name: 'eToro', category: 'Broker', rating: 4.6 },
];

const CompaniesSection = () => {
  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-500/5 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <Badge className="bg-gold-500/10 text-gold-500 border-gold-500/30 mb-4">
            <Shield className="w-3 h-3 mr-1" /> Parteneri Verificați
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Companii de <span className="text-gold-500">Încredere</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Colaborăm exclusiv cu companii reglementate și verificate pentru siguranța ta.
          </p>
        </div>

        {/* Partners grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 max-w-6xl mx-auto">
          {partners.map((partner, index) => (
            <div 
              key={index}
              className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 text-center hover:border-gold-500/50 hover:bg-gray-900 transition-all duration-300 group"
            >
              <div className="font-semibold text-white group-hover:text-gold-500 transition-colors mb-1">
                {partner.name}
              </div>
              <div className="text-xs text-gray-500 mb-2">{partner.category}</div>
              <div className="flex items-center justify-center gap-1 text-xs">
                <Star className="w-3 h-3 text-gold-500 fill-gold-500" />
                <span className="text-gold-500">{partner.rating}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center gap-8 mt-12">
          {[
            'Companii Reglementate',
            'Verificare Anuală',
            'Feedback Utilizatori',
            'Transparență Totală'
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-gray-400 text-sm">
              <CheckCircle className="w-4 h-4 text-gold-500" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompaniesSection;
