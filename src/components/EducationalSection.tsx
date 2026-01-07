import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Clock, Users, Star, Play, BookOpen, TrendingUp, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const courses = [
  {
    title: 'Trading pentru Începători',
    description: 'Învață bazele trading-ului de la zero. Analiză tehnică, managementul riscului și psihologia trading-ului.',
    duration: '12 ore',
    students: '2,340',
    rating: 4.9,
    level: 'Începător',
    icon: BookOpen,
    featured: true,
  },
  {
    title: 'Investiții în Acțiuni',
    description: 'Cum să analizezi și să selectezi acțiuni câștigătoare. Construiește un portofoliu solid pe termen lung.',
    duration: '8 ore',
    students: '1,890',
    rating: 4.8,
    level: 'Intermediar',
    icon: TrendingUp,
    featured: false,
  },
  {
    title: 'Crypto & Blockchain',
    description: 'Ghid complet pentru investiții în criptomonede. DeFi, NFT-uri și strategii de trading crypto.',
    duration: '10 ore',
    students: '3,120',
    rating: 4.7,
    level: 'Toate nivelurile',
    icon: Wallet,
    featured: false,
  },
];

const EducationalSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-gold-500 text-sm font-semibold uppercase tracking-wider">Centru Educațional</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            Cursuri Care <span className="text-gold-500">Transformă</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Materiale educaționale create de profesioniști pentru a te ajuta să devii un investitor de succes.
          </p>
        </div>

        {/* Featured courses */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {courses.map((course, index) => {
            const Icon = course.icon;
            return (
              <Card 
                key={index} 
                className={`bg-gray-900/50 border-gray-800 hover:border-gold-500/50 transition-all duration-300 overflow-hidden ${
                  course.featured ? 'ring-2 ring-gold-500/20' : ''
                }`}
              >
                {course.featured && (
                  <div className="bg-gold-500 text-black text-xs font-semibold text-center py-1">
                    CEL MAI POPULAR
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-500/20 to-gold-600/20 flex items-center justify-center">
                      <Icon className="w-7 h-7 text-gold-500" />
                    </div>
                    <Badge variant="outline" className="text-gray-400 border-gray-700">
                      {course.level}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-white">{course.title}</CardTitle>
                  <CardDescription className="text-gray-400 leading-relaxed">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Course stats */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {course.students}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-gold-500 fill-gold-500" />
                      {course.rating}
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-gold-500/10 text-gold-500 hover:bg-gold-500 hover:text-black transition-all"
                    onClick={() => navigate('/educatie')}
                  >
                    <Play className="w-4 h-4 mr-2" /> Începe Cursul
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            size="lg"
            variant="outline"
            className="border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-black"
            onClick={() => navigate('/educatie')}
          >
            Vezi Toate Cursurile <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EducationalSection;
