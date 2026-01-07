import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Alexandru Marin',
    role: 'Trader Independent',
    content: 'Datorită Markets4all am obținut primul meu cont finanțat de 100k. Echipa lor a trecut provocarea pentru mine în doar 2 săptămâni!',
    rating: 5,
    avatar: 'AM',
  },
  {
    name: 'Maria Ionescu',
    role: 'Investitor Începător',
    content: 'Cursurile de educație financiară m-au ajutat să înțeleg piața de capital. Acum investesc cu încredere și am un portofoliu diversificat.',
    rating: 5,
    avatar: 'MI',
  },
  {
    name: 'Dan Popescu',
    role: 'Antreprenor',
    content: 'Consultanța lor m-a ajutat să aleg cele mai bune asigurări pentru afacerea mea. Profesionalism și transparență la cel mai înalt nivel.',
    rating: 5,
    avatar: 'DP',
  },
  {
    name: 'Elena Dumitrescu',
    role: 'Manager Corporate',
    content: 'Am participat la programul de mentoring și rezultatele au fost extraordinare. Am învățat strategii de trading pe care le aplic zilnic.',
    rating: 5,
    avatar: 'ED',
  },
  {
    name: 'Cristian Voicu',
    role: 'Trader Prop',
    content: 'Semnalele de trading sunt precise și bine argumentate. Am câștigat consistență în tradingul meu datorită analizelor lor.',
    rating: 5,
    avatar: 'CV',
  },
  {
    name: 'Ana Gheorghe',
    role: 'Consultant Financiar',
    content: 'Colaborez cu Markets4all pentru clienții mei. Serviciile lor sunt de top și clienții sunt întotdeauna mulțumiți.',
    rating: 5,
    avatar: 'AG',
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-gold-500 text-sm font-semibold uppercase tracking-wider">Testimoniale</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            Ce Spun <span className="text-gold-500">Clienții Noștri</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Peste 5,000 de clienți mulțumiți ne-au acordat încrederea lor.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="bg-gray-900/50 border-gray-800 hover:border-gold-500/30 transition-all duration-300 backdrop-blur-sm"
            >
              <CardContent className="p-6">
                {/* Quote icon */}
                <Quote className="w-8 h-8 text-gold-500/30 mb-4" />
                
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold-500 fill-gold-500" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-300 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center text-black font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
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
