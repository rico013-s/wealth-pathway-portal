import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, GraduationCap, Handshake, TrendingUp, Users, Check, Star } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import ThreeBackground from '@/components/ThreeBackground';

const mainServices = [
  {
    title: 'Educație Financiară',
    description: 'Cursuri și materiale pentru toate nivelurile de experiență.',
    icon: GraduationCap,
    link: '/educatie',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Consultanță Personalizată',
    description: 'Găsim partenerii și serviciile potrivite pentru tine.',
    icon: Handshake,
    link: '/consultanta',
    color: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Mentoring & Trading',
    description: 'Suport direct de la traderi experimentați.',
    icon: Users,
    link: '/servicii',
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Prop Trading Pass',
    description: 'Echipa noastră trece provocarea pentru tine.',
    icon: TrendingUp,
    link: '/servicii',
    color: 'from-orange-500 to-red-500',
  },
];

const highlights = [
  '15+ Companii Partenere Verificate',
  '5,000+ Clienți Mulțumiți',
  'Educație pentru Toate Nivelurile',
  'Consultanță Gratuită Inițială',
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main>
        {/* Hero Section - Simplified */}
        <section className="relative pt-28 pb-20 overflow-hidden">
          <ThreeBackground />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-gold-500/10 text-gold-500 border-gold-500/20 text-sm px-4 py-2">
                Educație & Investiții pentru Toți
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Învață să Investești <span className="text-gold-500">Inteligent</span>
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
                Markets4all te ghidează de la primii pași în investiții până la trading profesionist. 
                Educație, mentoring și consultanță - totul într-un singur loc.
              </p>
              
              {/* Main CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button 
                  size="lg" 
                  className="bg-gold-500 hover:bg-gold-600 text-black font-semibold text-lg px-8"
                  onClick={() => navigate('/register')}
                >
                  Începe Acum <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10 text-lg px-8"
                  onClick={() => navigate('/servicii')}
                >
                  Vezi Serviciile
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-gold-500 text-gold-500 hover:bg-gold-500/10 text-lg px-8"
                  onClick={() => navigate('/educatie')}
                >
                  Învață Gratuit
                </Button>
              </div>

              {/* Quick highlights */}
              <div className="flex flex-wrap justify-center gap-4">
                {highlights.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-400 text-sm">
                    <Check className="w-4 h-4 text-gold-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ce Oferim</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Soluții complete pentru educație financiară, consultanță și trading
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {mainServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Card 
                    key={index} 
                    className="bg-gray-900 border-gray-800 hover:border-gold-500 transition-all duration-300 group cursor-pointer"
                    onClick={() => navigate(service.link)}
                  >
                    <CardHeader>
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} p-3 mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-full h-full text-white" />
                      </div>
                      <CardTitle className="text-xl text-white">{service.title}</CardTitle>
                      <CardDescription className="text-gray-400">{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <span className="text-gold-500 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                        Află mai multe <ArrowRight className="w-4 h-4" />
                      </span>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Simple Value Proposition */}
        <section className="py-20 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-6">
                    De Ce <span className="text-gold-500">Markets4all</span>?
                  </h2>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                        <Star className="w-5 h-5 text-gold-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Parteneri Verificați</h3>
                        <p className="text-gray-400 text-sm">Lucrăm doar cu companii reglementate și de încredere.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                        <GraduationCap className="w-5 h-5 text-gold-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Educație pentru Toți</h3>
                        <p className="text-gray-400 text-sm">De la începător la expert - avem resurse pentru fiecare nivel.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                        <Handshake className="w-5 h-5 text-gold-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Suport Personalizat</h3>
                        <p className="text-gray-400 text-sm">Consultanță gratuită pentru a găsi soluția potrivită.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Card className="bg-black border-gray-800">
                  <CardContent className="p-8 text-center">
                    <h3 className="text-2xl font-bold mb-4">Pregătit să Începi?</h3>
                    <p className="text-gray-400 mb-6">
                      Înregistrează-te gratuit și accesează resursele noastre educaționale.
                    </p>
                    <Button 
                      size="lg" 
                      className="w-full bg-gold-500 hover:bg-gold-600 text-black font-semibold"
                      onClick={() => navigate('/register')}
                    >
                      Înregistrare Gratuită
                    </Button>
                    <p className="text-xs text-gray-500 mt-4">
                      Ai deja cont? <Link to="/login" className="text-gold-500 hover:underline">Autentifică-te</Link>
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-black border-t border-gray-800">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ai întrebări? Suntem aici să te ajutăm.
            </h2>
            <p className="text-gray-400 mb-6">
              Solicită o consultanță gratuită și descoperă ce servicii ți se potrivesc.
            </p>
            <Button 
              size="lg" 
              variant="outline"
              className="border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-black"
              onClick={() => navigate('/consultanta')}
            >
              Solicită Consultanță Gratuită
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
