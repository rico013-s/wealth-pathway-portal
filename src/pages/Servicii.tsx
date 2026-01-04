import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  GraduationCap, Users, Handshake, TrendingUp, 
  BookOpen, FileText, Gamepad2, UserCheck, UsersRound, 
  Video, Check, ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const serviceLevels = [
  {
    id: 'incepator',
    name: 'Începător',
    description: 'Pentru cei care fac primii pași în investiții',
    color: 'from-emerald-500 to-green-500',
    services: [
      {
        title: 'Curs Bazele Investițiilor',
        description: 'Înțelege fundamentele pieței de capital, tipuri de active și principii de bază.',
        features: ['Video-uri explicative', 'Quiz-uri interactive', 'Certificat de completare'],
      },
      {
        title: 'Ghid Primii Pași',
        description: 'Pas cu pas: de la deschiderea contului la prima tranzacție.',
        features: ['Tutoriale detaliate', 'Suport tehnic', 'Cont demo gratuit'],
      },
    ]
  },
  {
    id: 'mediu',
    name: 'Mediu',
    description: 'Pentru investitori cu experiență de bază',
    color: 'from-amber-500 to-orange-500',
    services: [
      {
        title: 'Analiză Tehnică Avansată',
        description: 'Stăpânește indicatorii, pattern-urile și strategiile de timing.',
        features: ['Grafice interactive', 'Studii de caz', 'Sesiuni live'],
      },
      {
        title: 'Mentoring în Grup',
        description: 'Sesiuni săptămânale cu traderi experimentați.',
        features: ['Sesiuni Q&A', 'Trading în timp real', 'Comunitate privată'],
      },
    ]
  },
  {
    id: 'expert',
    name: 'Expert',
    description: 'Pentru traderi experimentați',
    color: 'from-purple-500 to-pink-500',
    services: [
      {
        title: 'Mentoring 1:1 Personalizat',
        description: 'Coaching individual cu focus pe strategia ta specifică.',
        features: ['Ședințe private', 'Plan personalizat', 'Review portofoliu'],
      },
      {
        title: 'Prop Trading Preparation',
        description: 'Pregătire intensivă pentru provocările prop firm.',
        features: ['Simulări realiste', 'Strategii de success', 'Suport continuu'],
      },
    ]
  },
  {
    id: 'elite',
    name: 'Elite',
    description: 'Servicii premium exclusive',
    color: 'from-gold-500 to-amber-600',
    services: [
      {
        title: 'Prop Trading Pass',
        description: 'Echipa noastră de experți trece provocarea prop pentru tine.',
        features: ['Traderi profesioniști', 'Garanție de success', 'Acces la capital'],
      },
      {
        title: 'Consultanță VIP',
        description: 'Acces direct la seniorii noștri pentru decizii critice.',
        features: ['Hotline dedicat', 'Analize exclusive', 'Networking VIP'],
      },
    ]
  },
];

const mainServices = [
  {
    title: 'Educație Financiară',
    description: 'Program complet de învățare pentru toate nivelurile',
    icon: GraduationCap,
    color: 'from-blue-500 to-cyan-500',
    features: ['Cursuri complete', 'Lecții interactive', 'Testări', 'Articole', 'Joc educațional'],
  },
  {
    title: 'Mentoring',
    description: 'Suport direct de la experți în trading',
    icon: Users,
    color: 'from-purple-500 to-pink-500',
    features: ['Ședințe 1:1', 'Sesiuni grup', 'Video-uri speciale', 'Trading împreună'],
  },
  {
    title: 'Consultanță',
    description: 'Te ajutăm să alegi partenerii potriviți',
    icon: Handshake,
    color: 'from-green-500 to-emerald-500',
    features: ['Parteneri verificați', 'Companii reglementate', 'Alegeri personalizate'],
  },
  {
    title: 'Prop Trading Pass',
    description: 'Trecem provocarea pentru tine',
    icon: TrendingUp,
    color: 'from-orange-500 to-red-500',
    features: ['Traderi experți', 'Strategii dovedite', 'Suport continuu'],
  },
];

const Servicii = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-24 pb-20">
        {/* Header */}
        <section className="container mx-auto px-4 mb-16">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Servicii</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Soluții pentru <span className="text-primary">Fiecare Nivel</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              De la primii pași în investiții până la prop trading profesionist - avem serviciul potrivit pentru tine.
            </p>
          </div>
        </section>

        {/* Main Services Overview */}
        <section className="container mx-auto px-4 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mainServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
                  <CardHeader>
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} p-3 mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-full h-full text-white" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Services by Level */}
        <section className="container mx-auto px-4 mb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Servicii după Nivel de Experiență</h2>
            <p className="text-muted-foreground">Alege nivelul potrivit pentru tine</p>
          </div>

          <Tabs defaultValue="incepator" className="max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              {serviceLevels.map(level => (
                <TabsTrigger key={level.id} value={level.id}>
                  {level.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {serviceLevels.map(level => (
              <TabsContent key={level.id} value={level.id}>
                <div className="mb-6 text-center">
                  <Badge className={`bg-gradient-to-r ${level.color} text-white border-0 text-base px-4 py-2`}>
                    Nivel {level.name}
                  </Badge>
                  <p className="text-muted-foreground mt-2">{level.description}</p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {level.services.map((service, idx) => (
                    <Card key={idx} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle>{service.title}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 mb-6">
                          {service.features.map((feature, fidx) => (
                            <li key={fidx} className="flex items-center gap-2 text-sm">
                              <Check className="w-4 h-4 text-primary" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <Button className="w-full" onClick={() => navigate('/register')}>
                          Accesează Serviciul
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="py-12">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">
                    Nu știi de unde să începi?
                  </h2>
                  <p className="text-muted-foreground">
                    Solicită o consultanță gratuită și te ajutăm să găsești serviciul potrivit.
                  </p>
                </div>
                <Button size="lg" onClick={() => navigate('/consultanta')} className="gap-2">
                  Solicită Consultanță <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Servicii;
