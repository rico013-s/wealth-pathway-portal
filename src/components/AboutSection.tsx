
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gold-500">Despre WealthPathway</h2>
            <p className="text-lg mb-8 text-gray-300">
              WealthPathway a fost fondat în 2020 cu o misiune simplă: să demistifice investițiile 
              și să conecteze oamenii cu partenerii financiari potriviți, în funcție de nevoile lor unice.
            </p>
            
            <div className="space-y-6 text-gray-300">
              <p>
                Echipa noastră de experți financiari are peste 50 de ani de experiență combinată în industria investițiilor. 
                Am verificat cu atenție fiecare dintre companiile noastre partenere pentru a ne asigura că îndeplinesc standardele 
                noastre stricte de performanță, transparență și servicii pentru clienți.
              </p>
              
              <p>
                Spre deosebire de firmele tradiționale de investiții, nu promovăm o abordare universală. 
                Credem că călătoria financiară a fiecăruia este unică, iar serviciul nostru de consultanță 
                este conceput pentru a găsi potrivirea perfectă pentru situația ta specifică.
              </p>
              
              <p>
                Fie că abia începi cu o sumă mică pentru investiții sau cauți să optimizezi 
                un portofoliu substanțial, WealthPathway oferă îndrumarea și conexiunile de care ai nevoie pentru a reuși.
              </p>
            </div>
          </div>
          
          <div className="lg:w-1/2 grid grid-cols-2 gap-4">
            <Card className="bg-gray-900 border border-gray-800 hover:border-gold-500 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-gold-500 mb-2">15+</div>
                <p className="text-gray-300">Companii Partenere</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900 border border-gray-800 hover:border-gold-500 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-gold-500 mb-2">5,000+</div>
                <p className="text-gray-300">Clienți Conectați</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900 border border-gray-800 hover:border-gold-500 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-gold-500 mb-2">250M+</div>
                <p className="text-gray-300">Active Administrate</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900 border border-gray-800 hover:border-gold-500 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-gold-500 mb-2">98%</div>
                <p className="text-gray-300">Satisfacția Clienților</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
