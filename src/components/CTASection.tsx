
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, TrendingUp, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CTASection = () => {
  const { toast } = useToast();
  const [consultForm, setConsultForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    goals: ''
  });
  
  const [matchForm, setMatchForm] = useState({
    amount: '',
    riskTolerance: 'medium',
    experience: 'beginner',
    email: ''
  });

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultForm.email || !consultForm.firstName || !consultForm.lastName) {
      toast({
        variant: "destructive",
        title: "Eroare",
        description: "Te rugăm să completezi toate câmpurile obligatorii."
      });
      return;
    }

    const mailtoLink = `mailto:contact@markets4all.ro?subject=Solicitare consultanță - ${consultForm.firstName} ${consultForm.lastName}&body=Nume: ${consultForm.firstName} ${consultForm.lastName}%0D%0AEmail: ${consultForm.email}%0D%0ATelefon: ${consultForm.phone}%0D%0AObiecte investiții: ${consultForm.goals}`;
    window.open(mailtoLink);
    
    toast({
      title: "Solicitare trimisă!",
      description: "Te vom contacta în curând pentru programarea consultanței."
    });
    
    setConsultForm({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      goals: ''
    });
  };

  const handleMatchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!matchForm.email || !matchForm.amount) {
      toast({
        variant: "destructive",
        title: "Eroare",
        description: "Te rugăm să completezi toate câmpurile obligatorii."
      });
      return;
    }

    const mailtoLink = `mailto:contact@markets4all.ro?subject=Potrivire rapidă investiții&body=Email: ${matchForm.email}%0D%0ASuma investiție: ${matchForm.amount}%0D%0AToleranta risc: ${matchForm.riskTolerance}%0D%0AExperiență: ${matchForm.experience}`;
    window.open(mailtoLink);
    
    toast({
      title: "Cerere trimisă!",
      description: "Îți vom trimite recomandările personalizate pe email în scurt timp."
    });
    
    setMatchForm({
      amount: '',
      riskTolerance: 'medium',
      experience: 'beginner',
      email: ''
    });
  };
  return (
    <section id="contact" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gold-500">Pregătit să-ți găsești potrivirea pentru investiții?</h2>
            <p className="text-lg mb-8 text-gray-300 max-w-xl">
              Consultanții noștri experți vor analiza obiectivele tale financiare, toleranța la risc și resursele pentru a te conecta cu partenerul perfect de investiții.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-black/50 p-3 rounded-full mr-4 border border-gold-500">
                  <TrendingUp className="h-6 w-6 text-gold-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white">Recomandări personalizate</h3>
                  <p className="text-gray-300">Obține opțiuni de investiții personalizate bazate pe situația și obiectivele tale financiare unice.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-black/50 p-3 rounded-full mr-4 border border-gold-500">
                  <DollarSign className="h-6 w-6 text-gold-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white">Fără taxe ascunse</h3>
                  <p className="text-gray-300">Serviciul nostru de consultanță este complet transparent, fără costuri ascunse sau obligații.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 w-full">
            <Card className="bg-black border border-gray-800">
              <CardContent className="p-6">
                <Tabs defaultValue="consult">
                  <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-800">
                    <TabsTrigger value="consult" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">Solicită Consultanță</TabsTrigger>
                    <TabsTrigger value="match" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">Potrivire Rapidă</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="consult" className="space-y-4">
                    <form onSubmit={handleConsultSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input 
                          placeholder="Prenume" 
                          value={consultForm.firstName}
                          onChange={(e) => setConsultForm({...consultForm, firstName: e.target.value})}
                          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400" 
                          required 
                        />
                        <Input 
                          placeholder="Nume" 
                          value={consultForm.lastName}
                          onChange={(e) => setConsultForm({...consultForm, lastName: e.target.value})}
                          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400" 
                          required 
                        />
                      </div>
                      <Input 
                        type="email"
                        placeholder="Adresă de email" 
                        value={consultForm.email}
                        onChange={(e) => setConsultForm({...consultForm, email: e.target.value})}
                        className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400" 
                        required 
                      />
                      <Input 
                        type="tel"
                        placeholder="Număr de telefon" 
                        value={consultForm.phone}
                        onChange={(e) => setConsultForm({...consultForm, phone: e.target.value})}
                        className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400" 
                      />
                      <Textarea 
                        placeholder="Spune-ne despre obiectivele tale de investiții..." 
                        value={consultForm.goals}
                        onChange={(e) => setConsultForm({...consultForm, goals: e.target.value})}
                        className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400" 
                        rows={4} 
                      />
                      <Button type="submit" className="w-full bg-gold-500 hover:bg-gold-600 text-black font-semibold">
                        Programează consultanță <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="match" className="space-y-4">
                    <form onSubmit={handleMatchSubmit} className="space-y-4">
                      <div>
                        <label className="block mb-2 text-sm">Suma de investit</label>
                        <Input 
                          placeholder="1.000 lei" 
                          value={matchForm.amount}
                          onChange={(e) => setMatchForm({...matchForm, amount: e.target.value})}
                          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400" 
                          required 
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm">Toleranță la risc</label>
                        <select 
                          value={matchForm.riskTolerance}
                          onChange={(e) => setMatchForm({...matchForm, riskTolerance: e.target.value})}
                          className="w-full bg-gray-800 border-gray-700 text-white rounded-md p-2"
                        >
                          <option value="low">Conservator</option>
                          <option value="medium">Moderat</option>
                          <option value="high">Agresiv</option>
                        </select>
                      </div>
                      <div>
                        <label className="block mb-2 text-sm">Experiență în investiții</label>
                        <select 
                          value={matchForm.experience}
                          onChange={(e) => setMatchForm({...matchForm, experience: e.target.value})}
                          className="w-full bg-gray-800 border-gray-700 text-white rounded-md p-2"
                        >
                          <option value="beginner">Începător</option>
                          <option value="intermediate">Intermediar</option>
                          <option value="advanced">Avansat</option>
                        </select>
                      </div>
                      <div>
                        <label className="block mb-2 text-sm">Adresă de email</label>
                        <Input 
                          type="email"
                          placeholder="email@tau.ro" 
                          value={matchForm.email}
                          onChange={(e) => setMatchForm({...matchForm, email: e.target.value})}
                          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400" 
                          required 
                        />
                      </div>
                      <Button type="submit" className="w-full bg-gold-500 hover:bg-gold-600 text-black font-semibold">
                        Găsește potrivirea mea <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
