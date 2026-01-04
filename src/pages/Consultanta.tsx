import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  MessageSquare, Clock, CheckCircle, ArrowRight, 
  TrendingUp, DollarSign, Shield, Users,
  Phone, Mail
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const steps = [
  {
    number: '01',
    title: 'Completează Formularul',
    description: 'Spune-ne despre obiectivele și situația ta financiară.',
    icon: MessageSquare,
  },
  {
    number: '02',
    title: 'Programăm o Întâlnire',
    description: 'Te contactăm pentru a stabili o oră convenabilă.',
    icon: Clock,
  },
  {
    number: '03',
    title: 'Analizăm Împreună',
    description: 'Discutăm opțiunile și găsim soluția potrivită.',
    icon: Users,
  },
  {
    number: '04',
    title: 'Începi să Investești',
    description: 'Te conectăm cu partenerii verificați și începi.',
    icon: CheckCircle,
  },
];

const benefits = [
  {
    title: 'Recomandări Personalizate',
    description: 'Opțiuni de investiții bazate pe situația ta unică.',
    icon: TrendingUp,
  },
  {
    title: 'Fără Taxe Ascunse',
    description: 'Consultanța este transparentă și fără costuri ascunse.',
    icon: DollarSign,
  },
  {
    title: 'Parteneri Verificați',
    description: 'Lucrăm doar cu companii reglementate și de încredere.',
    icon: Shield,
  },
];

const Consultanta = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    goals: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.firstName || !form.lastName) {
      toast({
        variant: "destructive",
        title: "Eroare",
        description: "Te rugăm să completezi toate câmpurile obligatorii."
      });
      return;
    }

    const mailtoLink = `mailto:contact@markets4all.ro?subject=Solicitare consultanță - ${form.firstName} ${form.lastName}&body=Nume: ${form.firstName} ${form.lastName}%0D%0AEmail: ${form.email}%0D%0ATelefon: ${form.phone}%0D%0AObiecte investiții: ${form.goals}`;
    window.open(mailtoLink);
    
    toast({
      title: "Solicitare trimisă!",
      description: "Te vom contacta în curând pentru programarea consultanței."
    });
    
    setForm({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      goals: '',
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-24 pb-20">
        {/* Header */}
        <section className="container mx-auto px-4 mb-16">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Consultanță</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Găsește <span className="text-primary">Potrivirea Perfectă</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Consultanții noștri te ajută să alegi serviciile și partenerii potriviți pentru obiectivele tale financiare.
            </p>
          </div>
        </section>

        {/* Steps */}
        <section className="container mx-auto px-4 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="text-4xl font-bold text-primary/20 mb-4">{step.number}</div>
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </CardContent>
                  </Card>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                      <ArrowRight className="w-6 h-6 text-muted-foreground/30" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Form + Benefits */}
        <section className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Solicită Consultanță</CardTitle>
                <CardDescription>
                  Completează formularul și te contactăm în 24 de ore.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Input 
                        placeholder="Prenume *"
                        value={form.firstName}
                        onChange={(e) => setForm({...form, firstName: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Input 
                        placeholder="Nume *"
                        value={form.lastName}
                        onChange={(e) => setForm({...form, lastName: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <Input 
                    type="email"
                    placeholder="Email *"
                    value={form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                    required
                  />
                  <Input 
                    type="tel"
                    placeholder="Telefon"
                    value={form.phone}
                    onChange={(e) => setForm({...form, phone: e.target.value})}
                  />
                  <Textarea 
                    placeholder="Care sunt obiectivele tale de investiții?"
                    value={form.goals}
                    onChange={(e) => setForm({...form, goals: e.target.value})}
                    rows={4}
                  />
                  <Button type="submit" className="w-full" size="lg">
                    Trimite Solicitarea <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Benefits + Contact */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">De Ce Să Alegi Consultanța Markets4all?</h2>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => {
                    const Icon = benefit.icon;
                    return (
                      <div key={index} className="flex gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">{benefit.title}</h3>
                          <p className="text-sm text-muted-foreground">{benefit.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <Card className="bg-muted/50">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">Preferi să ne contactezi direct?</h3>
                  <div className="space-y-3">
                    <a href="tel:0740113111" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                      <Phone className="w-5 h-5" />
                      <span>0740 113 111</span>
                    </a>
                    <a href="mailto:markets4allro@gmail.com" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                      <Mail className="w-5 h-5" />
                      <span>markets4allro@gmail.com</span>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Consultanta;
