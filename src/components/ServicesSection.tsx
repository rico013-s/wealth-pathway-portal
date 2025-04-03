
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Coins, DollarSign, ChartBar } from 'lucide-react';

const services = [
  {
    title: "Investiții în Piața de Capital",
    description: "Accesează acțiuni și ETF-uri de top prin firmele noastre partenere. Ideal atât pentru începători, cât și pentru investitori avansați.",
    icon: <TrendingUp className="h-10 w-10 text-gold-500" />,
    color: "bg-gray-900",
    level: "Toate nivelurile",
    minInvestment: "100 lei",
  },
  {
    title: "Fonduri Mutuale",
    description: "Management diversificat al portofoliului de către experți în domeniu. Barieră redusă de intrare cu rezultate impresionante pe termen lung.",
    icon: <ChartBar className="h-10 w-10 text-gold-500" />,
    color: "bg-gray-900",
    level: "Prietenos pentru începători",
    minInvestment: "50 lei",
  },
  {
    title: "Imobiliare",
    description: "Oportunități de investiții imobiliare cu opțiuni de proprietate fracționată. Construiește-ți averea prin active tangibile.",
    icon: <DollarSign className="h-10 w-10 text-gold-500" />,
    color: "bg-gray-900",
    level: "Intermediar",
    minInvestment: "1.000 lei",
  },
  {
    title: "Planificare pentru Pensie",
    description: "Asigură-ți viitorul cu planuri de pensie personalizate. Opțiuni avantajoase fiscal pentru securitate financiară pe termen lung.",
    icon: <Coins className="h-10 w-10 text-gold-500" />,
    color: "bg-gray-900",
    level: "Toate nivelurile",
    minInvestment: "25 lei/lună",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gold-500">Servicii de Investiții</h2>
          <p className="text-lg text-gray-300">
            Oferim o gamă largă de opțiuni de investiții prin companiile noastre partenere atent verificate. 
            Găsește potrivirea perfectă pentru obiectivele tale financiare și nivelul tău de experiență.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="border border-gray-800 bg-black hover:border-gold-500 transition-all duration-300">
              <CardHeader className={`${service.color} rounded-t-lg`}>
                <div className="flex justify-center">
                  {service.icon}
                </div>
                <CardTitle className="text-xl font-bold text-center mt-2 text-white">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 text-gray-300">
                <CardDescription className="text-gray-400 mb-4">{service.description}</CardDescription>
                <div className="flex justify-between items-center text-sm mb-6">
                  <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full">{service.level}</span>
                  <span className="font-medium text-gold-500">Min: {service.minInvestment}</span>
                </div>
                <Button variant="outline" className="w-full border-gray-700 text-white hover:bg-gray-800 hover:border-gold-500">Află mai mult</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
