
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, MapPin, Banknote } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Careers = () => {
  const jobPositions = [
    {
      title: "Analist Financiar",
      type: "Full-time",
      location: "București",
      salary: "Competitiv",
      description: "Analizează piețele financiare și oferă recomandări de investiții pentru clienții noștri. Cerințe: experiență în analiză financiară, cunoștințe avansate Excel, certificare CFA (avantaj)."
    },
    {
      title: "Consultant Investiții",
      type: "Full-time",
      location: "Cluj-Napoca",
      salary: "Competitiv",
      description: "Oferă consultanță personalizată clienților privind opțiunile de investiții potrivite. Cerințe: experiență în vânzări sau consultanță financiară, abilități excelente de comunicare."
    },
    {
      title: "Specialist Marketing Digital",
      type: "Full-time / Remote",
      location: "Oriunde",
      salary: "Competitiv",
      description: "Dezvoltă și implementează strategii de marketing digital pentru promovarea serviciilor Markets4all. Cerințe: experiență în marketing digital, cunoștințe SEO/SEM, familiaritate cu platformele sociale."
    },
    {
      title: "Content Creator Educație Financiară",
      type: "Part-time / Colaborare",
      location: "Remote",
      salary: "Negociabil",
      description: "Creează conținut educațional despre investiții și piețe financiare. Cerințe: experiență în domeniul financiar, abilități de creare conținut (text, video), pasiune pentru educație financiară."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="relative mb-16">
            <div className="absolute -left-20 -top-20 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Cariere la <span className="text-gold-500">Markets4all</span>
              </h1>
              <p className="text-lg text-gray-300 mb-8">
                Alătură-te echipei noastre și ajută-ne să transformăm modul în care oamenii 
                investesc și învață despre piețele financiare
              </p>
            </div>
          </div>
          
          <div className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">Poziții Disponibile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {jobPositions.map((job, index) => (
                <Card key={index} className="bg-gray-900 border border-gray-800 hover:border-gold-500 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-white text-xl">{job.title}</CardTitle>
                    <CardDescription className="text-gray-400">
                      <div className="flex flex-wrap gap-4 mt-2">
                        <div className="flex items-center text-gray-300">
                          <Briefcase className="h-4 w-4 mr-1 text-gold-500" />
                          <span>{job.type}</span>
                        </div>
                        <div className="flex items-center text-gray-300">
                          <MapPin className="h-4 w-4 mr-1 text-gold-500" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center text-gray-300">
                          <Banknote className="h-4 w-4 mr-1 text-gold-500" />
                          <span>{job.salary}</span>
                        </div>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">{job.description}</p>
                    <a href="#apply">
                      <Button 
                        variant="outline" 
                        className="w-full border-gold-500 text-white hover:bg-gold-500 hover:text-black"
                      >
                        Aplică acum
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div id="apply" className="bg-gray-900 border border-gray-800 rounded-xl p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Aplică pentru o poziție</h2>
            <div className="w-full overflow-hidden">
              <iframe 
                src="https://docs.google.com/forms/d/e/YOUR-FORM-ID/viewform?embedded=true" 
                width="100%" 
                height="900" 
                frameBorder="0" 
                className="bg-transparent"
                title="Formular aplicare cariere"
              >
                Se încarcă...
              </iframe>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Careers;
