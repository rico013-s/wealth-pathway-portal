
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const AboutSection = () => {
  const teamMembers = [
    {
      name: "Arman Cristian Hosseinzadeh",
      role: "Fondator & CEO",
      description: "Cu peste 10 ani de experiență în domeniul investițiilor, Arman a fondat Markets4all cu misiunea de a democratiza accesul la educație financiară și oportunități de investiții pentru toată lumea.",
      image: "/lovable-uploads/fedca4a0-09b5-4aa2-a404-541005ccc0d6.png"
    },
    {
      name: "Ana Popescu",
      role: "Director Educație Financiară",
      description: "Expert în educație financiară cu peste 8 ani de experiență în training și dezvoltare de programe educaționale personalizate pentru investitori de toate nivelurile.",
      image: "https://randomuser.me/api/portraits/women/45.jpg"
    },
    {
      name: "Mihai Dumitrescu",
      role: "Analist Financiar Senior",
      description: "Specialist în analiză tehnică și fundamentală, cu expertiză în piața valutară și acțiuni internaționale. Certificat CFA nivel III.",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    }
  ];

  return (
    <section id="about" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gold-500">Despre Markets4all</h2>
            <p className="text-lg mb-8 text-gray-300">
              Markets4all a fost fondat în 2020 cu o misiune simplă: să demistifice investițiile 
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
                un portofoliu substanțial, Markets4all oferă îndrumarea și conexiunile de care ai nevoie pentru a reuși.
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

        <h3 className="text-2xl md:text-3xl font-bold mb-10 text-gold-500 text-center">Echipa Noastră</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="bg-gray-900 border border-gray-800 hover:border-gold-500 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-gold-500">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-1">{member.name}</h4>
                  <p className="text-gold-500 mb-3">{member.role}</p>
                  <p className="text-gray-300 text-center">{member.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
