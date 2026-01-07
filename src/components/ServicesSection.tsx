import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, GraduationCap, TrendingUp, Users, Shield, Briefcase, LineChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const services = [
  {
    icon: GraduationCap,
    title: 'Educație Financiară',
    description: 'Cursuri complete de la nivel începător până la avansat. Învață trading, investiții și management financiar.',
    features: ['Cursuri video HD', 'Materiale interactive', 'Certificări'],
    link: '/educatie',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Users,
    title: 'Mentoring Personal',
    description: 'Sesiuni 1-la-1 cu traderi experimentați. Primești feedback personalizat și strategie adaptată.',
    features: ['Sesiuni live', 'Analiză portofoliu', 'Suport continuu'],
    link: '/servicii',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: TrendingUp,
    title: 'Prop Trading Pass',
    description: 'Echipa noastră trece provocarea pentru tine. Obții cont finanțat fără risc personal.',
    features: ['Garanție succes', 'Fără risc', 'Conturi mari'],
    link: '/servicii',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    icon: Briefcase,
    title: 'Consultanță Investiții',
    description: 'Analiză personalizată și recomandări bazate pe obiectivele tale financiare.',
    features: ['Plan personalizat', 'Diversificare', 'Monitorizare'],
    link: '/consultanta',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: Shield,
    title: 'Asigurări & Protecție',
    description: 'Protejează-ți familia și investițiile cu soluții de asigurare adaptate nevoilor tale.',
    features: ['Asigurări viață', 'Protecție capital', 'Consultanță gratuită'],
    link: '/consultanta',
    gradient: 'from-teal-500 to-blue-500',
  },
  {
    icon: LineChart,
    title: 'Semnale Trading',
    description: 'Primește semnale de trading în timp real de la analiștii noștri profesioniști.',
    features: ['Semnale zilnice', 'Analiză tehnică', 'Grup privat'],
    link: '/servicii',
    gradient: 'from-yellow-500 to-orange-500',
  },
];

const ServicesSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-gold-500 text-sm font-semibold uppercase tracking-wider">Serviciile Noastre</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            Tot Ce Ai Nevoie Pentru
            <span className="text-gold-500"> Succesul Financiar</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            De la educație până la investiții active, îți oferim toate instrumentele pentru a-ți atinge obiectivele financiare.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={index} 
                className="bg-gray-900/50 border-gray-800 hover:border-gold-500/50 transition-all duration-500 group backdrop-blur-sm overflow-hidden"
              >
                <CardHeader className="pb-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} p-4 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="w-full h-full text-white" />
                  </div>
                  <CardTitle className="text-xl text-white group-hover:text-gold-500 transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400 leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold-500 mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-between text-gold-500 hover:text-gold-400 hover:bg-gold-500/10 group/btn"
                    onClick={() => navigate(service.link)}
                  >
                    Află mai multe 
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Button 
            size="lg"
            className="bg-gold-500 hover:bg-gold-600 text-black font-semibold px-8"
            onClick={() => navigate('/servicii')}
          >
            Vezi Toate Serviciile <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
