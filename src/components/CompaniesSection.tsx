
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

const companies = [
  {
    name: "CPT MARKETS",
    logo: "CM",
    description: "Platformă de trading avansată cu acces la piețe internaționale și instrumente financiare diverse pentru investitori profesionali.",
    rating: 4.7,
    reviewCount: 950,
    specialties: ["Forex", "CFD-uri", "Mărfuri"],
    minInvestment: "250 lei",
    returnRate: "Variabil",
    highlighted: true,
  },
  {
    name: "Winners Group",
    logo: "WG",
    description: "Grup de investiții specializat în identificarea și dezvoltarea oportunităților de creștere pe termen lung.",
    rating: 4.6,
    reviewCount: 680,
    specialties: ["Private Equity", "Venture Capital", "Real Estate"],
    minInvestment: "5.000 lei",
    returnRate: "20-25% în medie",
    highlighted: false,
  },
  {
    name: "Heritage Financial",
    logo: "HF",
    description: "Strategii de investiții conservatoare axate pe creștere stabilă și conservarea capitalului.",
    rating: 4.7,
    reviewCount: 1560,
    specialties: ["Acțiuni cu dividende", "Fonduri mutuale", "Pensii"],
    minInvestment: "100 lei",
    returnRate: "8-10% în medie",
    highlighted: false,
  },
  {
    name: "Apex Capital Management",
    logo: "AC",
    description: "Strategii de investiții de înaltă performanță care vizează randamente ambițioase pentru investitorii experimentați.",
    rating: 4.5,
    reviewCount: 720,
    specialties: ["Fonduri speculative", "Private Equity", "Mărfuri"],
    minInvestment: "10.000 lei",
    returnRate: "18-22% în medie",
    highlighted: false,
  }
];

const CompaniesSection = () => {
  return (
    <section id="companies" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gold-500">Companiile Noastre Partenere</h2>
          <p className="text-lg text-gray-300">
            Am dezvoltat parteneriate cu firme de investiții de top pentru a-ți oferi o gamă diversă de opțiuni.
            Fiecare partener este verificat cu atenție pentru performanță, fiabilitate și satisfacția clienților.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {companies.map((company, index) => (
            <Card key={index} className={`bg-gray-900 border border-gray-800 hover:border-gold-500 transition-all duration-300 ${company.highlighted ? 'border-2 border-gold-500 shadow-md' : ''}`}>
              <CardHeader className="relative">
                {company.highlighted && (
                  <Badge className="absolute -top-3 right-0 bg-gold-500 text-black">Top Pick</Badge>
                )}
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center text-white text-xl font-bold border border-gold-500">
                    {company.logo}
                  </div>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 fill-gold-500 text-gold-500 mr-1" />
                    <span className="font-medium text-white">{company.rating}</span>
                    <span className="text-sm text-gray-400 ml-1">({company.reviewCount})</span>
                  </div>
                </div>
                <CardTitle className="text-xl font-bold text-white">{company.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 mb-4">{company.description}</CardDescription>
                <div className="flex flex-wrap gap-2 mb-4">
                  {company.specialties.map((specialty, i) => (
                    <Badge key={i} variant="outline" className="bg-gray-800 text-white border-gray-700">{specialty}</Badge>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-gray-800 p-2 rounded">
                    <p className="text-gray-400">Investiție minimă</p>
                    <p className="font-medium text-white">{company.minInvestment}</p>
                  </div>
                  <div className="bg-gray-800 p-2 rounded">
                    <p className="text-gray-400">Rata de returnare</p>
                    <p className="font-medium text-gold-500">{company.returnRate}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gold-500 hover:bg-gold-600 text-black">Vezi detalii</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompaniesSection;
