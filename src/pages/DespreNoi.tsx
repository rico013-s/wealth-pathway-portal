import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Users, Building2, TrendingUp, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { value: '15+', label: 'Companii Partenere', icon: Building2 },
  { value: '5,000+', label: 'Clienți Conectați', icon: Users },
  { value: '250M+', label: 'Active Administrate', icon: TrendingUp },
  { value: '98%', label: 'Satisfacția Clienților', icon: Heart },
];

const teamMembers = [
  {
    name: "Arman Cristian Hosseinzadeh",
    role: "Fondator & CEO",
    description: "Cu peste 10 ani de experiență în domeniul investițiilor, Arman a fondat Markets4all cu misiunea de a democratiza accesul la educație financiară.",
    image: "/lovable-uploads/fedca4a0-09b5-4aa2-a404-541005ccc0d6.png"
  },
  {
    name: "Ana Popescu",
    role: "Director Educație Financiară",
    description: "Expert în educație financiară cu peste 8 ani de experiență în training și dezvoltare de programe educaționale personalizate.",
    image: "https://randomuser.me/api/portraits/women/45.jpg"
  },
  {
    name: "Mihai Dumitrescu",
    role: "Analist Financiar Senior",
    description: "Specialist în analiză tehnică și fundamentală, cu expertiză în piața valutară și acțiuni internaționale. Certificat CFA nivel III.",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  }
];

const testimonials = [
  {
    name: "Mihai Ionescu",
    role: "Investitor retail",
    quote: "Markets4all m-a ajutat să găsesc firma de investiții perfectă pentru nevoile mele. Ca începător, eram copleșit de opțiuni, dar îndrumarea lor a făcut procesul simplu.",
    rating: 5,
  },
  {
    name: "Ana Popescu",
    role: "Profesionist IT",
    quote: "Aveam niște economii, dar nu știam cum să investesc eficient. Instrumentul de comparație m-a ajutat să aleg un serviciu aliniat cu toleranța mea la risc.",
    rating: 5,
  },
  {
    name: "Robert Popa",
    role: "Proprietar de afacere mică",
    quote: "Ca cineva cu timp limitat pentru a cerceta investițiile, serviciul de consultanță a fost inestimabil. M-au conectat cu o firmă care a înțeles nevoile afacerii mele.",
    rating: 4,
  },
];

const DespreNoi = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-24 pb-20">
        {/* Header */}
        <section className="container mx-auto px-4 mb-16">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Despre Noi</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Povestea <span className="text-primary">Markets4all</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Fondată în 2020, misiunea noastră este să democratizăm accesul la investiții pentru toți românii.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="container mx-auto px-4 mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-primary">Misiunea Noastră</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Markets4all a fost fondată cu o misiune simplă: să demistifice investițiile 
                  și să conecteze oamenii cu partenerii financiari potriviți, în funcție de nevoile lor unice.
                </p>
                <p>
                  Echipa noastră de experți financiari are peste 50 de ani de experiență combinată în industria investițiilor. 
                  Am verificat cu atenție fiecare dintre companiile noastre partenere pentru a ne asigura că îndeplinesc standardele 
                  noastre stricte de performanță, transparență și servicii pentru clienți.
                </p>
                <p>
                  Spre deosebire de firmele tradiționale de investiții, nu promovăm o abordare universală. 
                  Credem că călătoria financiară a fiecăruia este unică.
                </p>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow border-2 hover:border-primary/50">
                    <CardContent className="p-6 text-center">
                      <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
                      <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="container mx-auto px-4 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Echipa Noastră</h2>
            <p className="text-muted-foreground">Profesioniști dedicați succesului tău financiar</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow overflow-hidden">
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-primary/20">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="container mx-auto px-4 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Ce Spun Clienții</h2>
            <p className="text-muted-foreground">Povești de succes de la investitorii noștri</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < testimonial.rating ? 'fill-primary text-primary' : 'text-muted'}`} 
                      />
                    ))}
                  </div>
                  <blockquote className="text-muted-foreground italic mb-4">"{testimonial.quote}"</blockquote>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4">
          <Card className="bg-primary/5 border-primary/20 max-w-4xl mx-auto">
            <CardContent className="py-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Vrei să faci parte din echipă?
              </h2>
              <p className="text-muted-foreground mb-6">
                Căutăm mereu talente care împărtășesc viziunea noastră.
              </p>
              <Link to="/careers">
                <Button size="lg" className="gap-2">
                  Vezi Pozițiile Disponibile <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DespreNoi;
