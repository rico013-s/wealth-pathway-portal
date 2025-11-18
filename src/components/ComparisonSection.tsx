import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, Handshake, TrendingUp, GraduationCap, Video, Gamepad2, FileText, UserCheck, UsersRound } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const ComparisonSection = () => {
  const services = [
    {
      title: "Educație Financiară",
      description: "Program complet de învățare pentru toți nivelurile de experiență",
      icon: GraduationCap,
      color: "from-blue-500 to-cyan-500",
      features: [
        { icon: BookOpen, text: "Cursuri complete" },
        { icon: FileText, text: "Lecții interactive" },
        { icon: GraduationCap, text: "Testări de cunoștințe" },
        { icon: FileText, text: "Articole specializate" },
        { icon: Gamepad2, text: "Joc interactiv educațional" }
      ]
    },
    {
      title: "Mentoring Personalizat",
      description: "Suport direct de la experți în trading și investiții",
      icon: Users,
      color: "from-purple-500 to-pink-500",
      features: [
        { icon: UserCheck, text: "Ședințe 1:1 personalizate" },
        { icon: UsersRound, text: "Sesiuni în echipă" },
        { icon: Video, text: "Video-uri custom speciale" },
        { icon: TrendingUp, text: "Trading împreună" }
      ]
    },
    {
      title: "Consultanță & Parteneri",
      description: "Alegem împreună cei mai buni parteneri pentru tine",
      icon: Handshake,
      color: "from-green-500 to-emerald-500",
      features: [
        { icon: Handshake, text: "Parteneri serioși cu reputație" },
        { icon: FileText, text: "Companii reglementate" },
        { icon: UserCheck, text: "Consultanță personalizată" },
        { icon: TrendingUp, text: "Alegere bazată pe obiective" }
      ]
    },
    {
      title: "Prop Trading Pass",
      description: "Consultanții noștri trec fazele provocării pentru tine",
      icon: TrendingUp,
      color: "from-orange-500 to-red-500",
      features: [
        { icon: TrendingUp, text: "Echipă de traderi experți" },
        { icon: GraduationCap, text: "Strategii dovedite" },
        { icon: UserCheck, text: "Suport continuu" },
        { icon: Handshake, text: "Parteneri prop verificați" }
      ]
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Serviciile Noastre</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Servicii Markets4All
          </h2>
          <p className="text-lg text-muted-foreground">
            Soluții complete pentru educație, mentoring și succes în trading și investiții
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/50 bg-card/50 backdrop-blur"
              >
                <CardHeader>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-full h-full text-white" />
                  </div>
                  <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => {
                      const FeatureIcon = feature.icon;
                      return (
                        <li key={idx} className="flex items-center gap-3 text-foreground/80">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <FeatureIcon className="w-4 h-4 text-primary" />
                          </div>
                          <span>{feature.text}</span>
                        </li>
                      );
                    })}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
