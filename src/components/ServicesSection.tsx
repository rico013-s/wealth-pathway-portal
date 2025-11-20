
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Coins, DollarSign, LineChart, Bitcoin, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const services = [
  {
    title: "Tranzacționare CFD",
    description: "Accesează peste 1000+ instrumente CFD: Forex, Mărfuri, Acțiuni, Crypto, Indici și ETF-uri. Spread-uri competitive și execuție rapidă.",
    icon: <LineChart className="h-12 w-12" />,
    features: ["Forex - 50+ perechi valutare", "Mărfuri - Aur, Petrol, Argint", "Indici - S&P 500, DAX, FTSE", "Leverage până la 1:30"],
    badge: "Popular",
    tier: "Bronze+",
  },
  {
    title: "Tranzacționare Crypto",
    description: "Platformă avansată pentru trading cripto. Stablecoins, Altcoins, integrare cu wallet-uri securizate și platforme de încredere.",
    icon: <Bitcoin className="h-12 w-12" />,
    features: ["Bitcoin, Ethereum, Altcoins", "Stablecoins (USDT, USDC)", "Wallet-uri integrate", "Trading 24/7"],
    badge: "Nou",
    tier: "Silver+",
  },
  {
    title: "Acțiuni Clasice",
    description: "Investiții în acțiuni de pe bursele internaționale. Acces la NYSE, NASDAQ, LSE și piețe europene. Portofoliu diversificat.",
    icon: <TrendingUp className="h-12 w-12" />,
    features: ["NYSE & NASDAQ", "Burse Europene", "Dividende automate", "Analiză avansată"],
    badge: "",
    tier: "Bronze+",
  },
  {
    title: "Fonduri de Investiții",
    description: "Fonduri mutuale gestionate profesional. Diversificare automată, risc controlat și randamente consistente pe termen lung.",
    icon: <DollarSign className="h-12 w-12" />,
    features: ["Management profesional", "Diversificare automată", "Investiție minimă redusă", "Rapoarte lunare"],
    badge: "",
    tier: "Bronze+",
  },
  {
    title: "Asigurări Financiare",
    description: "Protejează-ți investițiile și viitorul. Asigurări de viață, asigurări de avere (Wealth) și asigurări pentru active.",
    icon: <Building2 className="h-12 w-12" />,
    features: ["Asigurare de viață", "Asigurare Wealth", "Protecție active", "Planificare succesorală"],
    badge: "Protecție",
    tier: "Gold",
  },
  {
    title: "Planificare Pensie",
    description: "Construiește-ți un viitor financiar securizat. Planuri personalizate de pensie cu avantaje fiscale și creștere pe termen lung.",
    icon: <Coins className="h-12 w-12" />,
    features: ["Avantaje fiscale", "Contribuții flexibile", "Pensie privată", "Consultanță gratuită"],
    badge: "",
    tier: "Bronze+",
  },
];

const ServicesSection = () => {
  const navigate = useNavigate();

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Servicii de Tranzacționare și Investiții</h2>
          <p className="text-lg text-muted-foreground">
            Platformă completă de trading cu acces la peste 1000+ instrumente financiare. 
            De la CFD-uri și crypto până la acțiuni clasice și fonduri de investiții - totul într-un singur loc.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="border-border bg-card hover:border-primary transition-all duration-300 group">
              <CardHeader>
                <div className="flex justify-between items-start mb-4">
                  <div className="text-primary group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  {service.badge && (
                    <Badge variant="secondary" className="bg-primary text-primary-foreground">
                      {service.badge}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl font-bold text-card-foreground">{service.title}</CardTitle>
                <CardDescription className="text-muted-foreground mt-2">{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start text-sm text-muted-foreground">
                      <span className="text-primary mr-2">•</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4 border-t border-border">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-muted-foreground">Nivel necesar:</span>
                    <Badge variant="outline" className="border-primary text-primary">
                      {service.tier}
                    </Badge>
                  </div>
                  <Button 
                    variant="default" 
                    className="w-full"
                    onClick={() => navigate('/subscriptions')}
                  >
                    Accesează Serviciul
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            * Pentru a accesa serviciile de tranzacționare este necesar un abonament activ
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/register')}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Înregistrează-te Acum
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
