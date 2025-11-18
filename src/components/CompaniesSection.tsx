import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Coins, Building2, PiggyBank, Shield, Wallet, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const learningCategories = [
  {
    title: "Tranzacționare CFD",
    description: "Învață să tranzacționezi instrumente financiare cu efect de levier",
    icon: TrendingUp,
    topics: ["Forex", "Mărfuri", "Acțiuni", "Crypto", "Indici", "ETF"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Tranzacționare Crypto",
    description: "Stăpânește lumea criptomonedelor și a platformelor de trading",
    icon: Coins,
    topics: ["Stable Coin vs Altcoin", "Wallets", "Trading Platforms", "Blockchain Basics"],
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Acțiuni Clasice",
    description: "Fundamentele investițiilor în piața de capital",
    icon: BarChart3,
    topics: ["Analiza fundamentală", "Analiza tehnică", "Dividend investing", "Growth stocks"],
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Fonduri de Investiții",
    description: "Diversifică-ți portofoliul prin investiții colective",
    icon: PiggyBank,
    topics: ["Fonduri mutuale", "ETF-uri", "Index funds", "Managed portfolios"],
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Asigurări Financiare",
    description: "Protejează-ți averea și construiește un viitor sigur",
    icon: Shield,
    topics: ["Asigurări de viață", "Asigurări asset", "Wealth protection", "Planificare financiară"],
    color: "from-indigo-500 to-purple-500",
  },
];

const CompaniesSection = () => {
  const navigate = useNavigate();

  return (
    <section id="learning" className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Educație Financiară</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Vreau Să Învăț Despre...
          </h2>
          <p className="text-lg text-muted-foreground">
            Alege domeniul care te interesează și începe călătoria ta în lumea investițiilor. 
            Înregistrează-te pentru acces complet la toate resursele educaționale.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {learningCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/50 bg-card/50 backdrop-blur"
              >
                <CardHeader>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-full h-full text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2">{category.title}</CardTitle>
                  <CardDescription className="text-base">{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    {category.topics.map((topic, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        <span className="text-sm text-foreground/80">{topic}</span>
                      </div>
                    ))}
                  </div>
                  <Button 
                    onClick={() => navigate('/register')}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Accesează Cursurile
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Ai nevoie de acces complet pentru a vizualiza toate cursurile și materialele educaționale
          </p>
          <Button 
            onClick={() => navigate('/register')}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Înregistrează-te Acum
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CompaniesSection;
