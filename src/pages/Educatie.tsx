import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { BookOpen, TrendingUp, Coins, BarChart3, PiggyBank, Shield, Search, Video, FileText, GraduationCap, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categories = [
  { id: 'all', name: 'Toate', icon: BookOpen },
  { id: 'trading', name: 'Trading CFD', icon: TrendingUp },
  { id: 'crypto', name: 'Crypto', icon: Coins },
  { id: 'stocks', name: 'Acțiuni', icon: BarChart3 },
  { id: 'funds', name: 'Fonduri', icon: PiggyBank },
  { id: 'insurance', name: 'Asigurări', icon: Shield },
];

const materials = [
  {
    id: 1,
    title: 'Introducere în Trading CFD',
    description: 'Învață bazele tranzacționării CFD: leverage, spread-uri, margin și gestionarea riscului.',
    category: 'trading',
    type: 'curs',
    level: 'Începător',
    duration: '2 ore',
    icon: TrendingUp,
  },
  {
    id: 2,
    title: 'Analiza Tehnică pentru Forex',
    description: 'Stăpânește graficele, indicatorii și pattern-urile pentru tranzacționare Forex.',
    category: 'trading',
    type: 'tutorial',
    level: 'Intermediar',
    duration: '3 ore',
    icon: BarChart3,
  },
  {
    id: 3,
    title: 'Bitcoin și Criptomonede: Ghid Complet',
    description: 'De la blockchain la wallets - tot ce trebuie să știi despre crypto.',
    category: 'crypto',
    type: 'curs',
    level: 'Începător',
    duration: '4 ore',
    icon: Coins,
  },
  {
    id: 4,
    title: 'Stablecoins vs Altcoins',
    description: 'Înțelege diferențele și strategiile pentru fiecare tip de criptomonedă.',
    category: 'crypto',
    type: 'articol',
    level: 'Intermediar',
    duration: '15 min',
    icon: FileText,
  },
  {
    id: 5,
    title: 'Investiții în Acțiuni pentru Începători',
    description: 'Cum să analizezi și să selectezi acțiuni pentru portofoliul tău.',
    category: 'stocks',
    type: 'curs',
    level: 'Începător',
    duration: '2.5 ore',
    icon: TrendingUp,
  },
  {
    id: 6,
    title: 'Dividend Investing Strategy',
    description: 'Construiește venituri pasive prin investiții în acțiuni cu dividende.',
    category: 'stocks',
    type: 'tutorial',
    level: 'Avansat',
    duration: '1.5 ore',
    icon: Video,
  },
  {
    id: 7,
    title: 'ETF-uri și Fonduri Mutuale',
    description: 'Diversifică-ți portofoliul cu instrumente de investiții colective.',
    category: 'funds',
    type: 'curs',
    level: 'Începător',
    duration: '2 ore',
    icon: PiggyBank,
  },
  {
    id: 8,
    title: 'Asigurări de Viață și Wealth Protection',
    description: 'Protejează-ți familia și activele cu strategii de asigurare inteligente.',
    category: 'insurance',
    type: 'articol',
    level: 'Intermediar',
    duration: '20 min',
    icon: Shield,
  },
  {
    id: 9,
    title: 'Management Risc în Trading',
    description: 'Strategii esențiale pentru a-ți proteja capitalul în tranzacții.',
    category: 'trading',
    type: 'tutorial',
    level: 'Avansat',
    duration: '1 oră',
    icon: GraduationCap,
  },
];

const typeColors: Record<string, string> = {
  curs: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  tutorial: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  articol: 'bg-green-500/10 text-green-500 border-green-500/20',
};

const levelColors: Record<string, string> = {
  'Începător': 'bg-emerald-500/10 text-emerald-500',
  'Intermediar': 'bg-amber-500/10 text-amber-500',
  'Avansat': 'bg-red-500/10 text-red-500',
};

const Educatie = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || material.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-24 pb-20">
        {/* Header */}
        <section className="container mx-auto px-4 mb-12">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <GraduationCap className="w-4 h-4 mr-2" />
              Centru Educațional
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Învață să Investești <span className="text-primary">Inteligent</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Cursuri, tutoriale și articole organizate pe subiecte. Filtrează și găsește exact ce ai nevoie pentru nivelul tău.
            </p>
            
            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Caută cursuri, tutoriale, articole..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 text-lg"
              />
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="container mx-auto px-4 mb-10">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(category => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? 'default' : 'outline'}
                  onClick={() => setActiveCategory(category.id)}
                  className="gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {category.name}
                </Button>
              );
            })}
          </div>
        </section>

        {/* Materials Grid */}
        <section className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMaterials.map(material => {
              const Icon = material.icon;
              return (
                <Card key={material.id} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline" className={typeColors[material.type]}>
                          {material.type}
                        </Badge>
                      </div>
                    </div>
                    <CardTitle className="text-xl">{material.title}</CardTitle>
                    <CardDescription>{material.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <Badge className={levelColors[material.level]}>{material.level}</Badge>
                      <span className="text-sm text-muted-foreground">{material.duration}</span>
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => navigate('/register')}
                    >
                      Accesează Materialul
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredMaterials.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                Nu am găsit materiale pentru căutarea ta. Încearcă alte cuvinte cheie.
              </p>
            </div>
          )}
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 mt-16">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="py-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Vrei acces complet la toate materialele?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Înregistrează-te pentru a debloca toate cursurile, tutorialele și resursele educaționale.
              </p>
              <Button size="lg" onClick={() => navigate('/register')}>
                Înregistrează-te Gratuit
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Educatie;
