
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Mihai Ionescu",
    role: "Investitor retail",
    quote: "WealthPathway m-a ajutat să găsesc firma de investiții perfectă pentru nevoile mele. Ca începător, eram copleșit de opțiuni, dar îndrumarea lor a făcut procesul simplu.",
    rating: 5,
    investmentType: "Fonduri Mutuale",
    returns: "+12% în 8 luni",
  },
  {
    name: "Ana Popescu",
    role: "Profesionist IT",
    quote: "Aveam niște economii, dar nu știam cum să investesc eficient. Instrumentul de comparație m-a ajutat să aleg un serviciu aliniat cu toleranța mea la risc și obiectivele mele.",
    rating: 5,
    investmentType: "ETF-uri tech",
    returns: "+18% în 1 an",
  },
  {
    name: "Robert Popa",
    role: "Proprietar de afacere mică",
    quote: "Ca cineva cu timp limitat pentru a cerceta investițiile, serviciul de consultanță WealthPathway a fost inestimabil. M-au conectat cu o firmă care a înțeles nevoile afacerii mele.",
    rating: 4,
    investmentType: "Acțiuni cu dividende",
    returns: "+10% în 6 luni",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gold-500">Poveștile de Succes ale Clienților</h2>
          <p className="text-lg text-gray-300">
            Ascultă de la investitorii care și-au găsit potrivirea perfectă prin serviciile noastre de consultanță.
            Am ajutat mii de clienți de toate nivelurile de experiență să-și dezvolte averea.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-black border border-gray-800 hover:border-gold-500 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < testimonial.rating ? 'fill-gold-500 text-gold-500' : 'text-gray-700'}`} 
                    />
                  ))}
                </div>
                <blockquote className="text-gray-300 italic mb-6">"{testimonial.quote}"</blockquote>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">{testimonial.investmentType}</p>
                    <p className="font-medium text-gold-500">{testimonial.returns}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
