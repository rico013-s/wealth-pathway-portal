
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, TrendingUp, Landmark, BarChart4, Coins, LineChart } from 'lucide-react';
import { Link } from 'react-router-dom';

const articles = [
  {
    id: 1,
    title: 'Bazele investițiilor în acțiuni',
    description: 'Află cum să evaluezi și să selectezi acțiuni pentru portofoliul tău de investiții.',
    icon: <TrendingUp className="h-8 w-8 text-gold-500" />,
    category: 'Acțiuni',
    readTime: '8 min'
  },
  {
    id: 2,
    title: 'Analiza tehnică vs. fundamentală',
    description: 'Compară cele două metode principale de analiză a pieței și află care ți se potrivește.',
    icon: <LineChart className="h-8 w-8 text-gold-500" />,
    category: 'Forex',
    readTime: '10 min'
  },
  {
    id: 3,
    title: 'Investiții în ETF-uri',
    description: 'Descoperă avantajele investiției în fonduri tranzacționate la bursă și strategii de selecție.',
    icon: <BarChart4 className="h-8 w-8 text-gold-500" />,
    category: 'ETF-uri',
    readTime: '7 min'
  },
  {
    id: 4,
    title: 'Piața mărfurilor: Ghid pentru începători',
    description: 'Explorează modul în care funcționează piața mărfurilor și cum poți investi în aur, petrol și alte mărfuri.',
    icon: <Coins className="h-8 w-8 text-gold-500" />,
    category: 'Mărfuri',
    readTime: '9 min'
  },
  {
    id: 5,
    title: 'Criptomonede: Riscuri și oportunități',
    description: 'Analizează potențialul de creștere al criptomonedelor, precum și riscurile asociate.',
    icon: <Landmark className="h-8 w-8 text-gold-500" />,
    category: 'Crypto',
    readTime: '12 min'
  },
  {
    id: 6,
    title: 'Construirea unui portofoliu diversificat',
    description: 'Învață cum să-ți diversifici portofoliul pentru a maximiza profitul și a minimiza riscurile.',
    icon: <BookOpen className="h-8 w-8 text-gold-500" />,
    category: 'Portofoliu',
    readTime: '11 min'
  }
];

const EducationalSection = () => {
  return (
    <section id="education" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Educație Financiară</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Descoperă articolele noastre educaționale pentru a-ți îmbunătăți cunoștințele despre investiții și piețe financiare.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map(article => (
            <Card key={article.id} className="bg-gray-800 border-gray-700 hover:border-gold-500 transition-all card-hover">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  {article.icon}
                  <span className="text-xs font-medium bg-gray-700 px-2 py-1 rounded-full text-gray-300">
                    {article.category} • {article.readTime}
                  </span>
                </div>
                <CardTitle className="text-white text-xl">{article.title}</CardTitle>
                <CardDescription className="text-gray-400">{article.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="outline" className="w-full border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-black">
                  Citește articolul
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/dashboard">
            <Button className="bg-gold-500 hover:bg-gold-600 text-black font-semibold">
              <BookOpen className="mr-2 h-4 w-4" />
              Accesează toate materialele educaționale
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EducationalSection;
