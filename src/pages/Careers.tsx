
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Briefcase, Clock, Banknote, MapPin, Send } from 'lucide-react';

const Careers = () => {
  const [nume, setNume] = useState('');
  const [email, setEmail] = useState('');
  const [telefon, setTelefon] = useState('');
  const [pozitie, setPozitie] = useState('');
  const [experienta, setExperienta] = useState('');
  const [motivatie, setMotivatie] = useState('');
  const [cv, setCv] = useState<File | null>(null);
  const { toast } = useToast();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // În mod normal, aici ar fi logica de trimitere a formularului
    toast({
      title: "Aplicare trimisă cu succes!",
      description: "Vom analiza aplicarea ta și te vom contacta în curând.",
      variant: "default",
    });
    
    // Reset form
    setNume('');
    setEmail('');
    setTelefon('');
    setPozitie('');
    setExperienta('');
    setMotivatie('');
    setCv(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCv(e.target.files[0]);
    }
  };

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
                    <Button 
                      variant="outline" 
                      className="w-full border-gold-500 text-white hover:bg-gold-500 hover:text-black"
                      onClick={() => setPozitie(job.title)}
                    >
                      Aplică acum
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div id="apply" className="bg-gray-900 border border-gray-800 rounded-xl p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Aplică pentru o poziție</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="nume">Nume complet</Label>
                <Input 
                  id="nume" 
                  placeholder="Numele tău complet" 
                  value={nume}
                  onChange={(e) => setNume(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="email@exemplu.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="telefon">Telefon</Label>
                  <Input 
                    id="telefon" 
                    placeholder="07XX XXX XXX" 
                    value={telefon}
                    onChange={(e) => setTelefon(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="pozitie">Poziție</Label>
                <Select value={pozitie} onValueChange={setPozitie} required>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Selectează poziția dorită" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    {jobPositions.map((job, index) => (
                      <SelectItem key={index} value={job.title}>{job.title}</SelectItem>
                    ))}
                    <SelectItem value="Altă poziție">Altă poziție</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="experienta">Experiență profesională</Label>
                <Select value={experienta} onValueChange={setExperienta} required>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Selectează nivelul de experiență" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value="Student/Fără experiență">Student/Fără experiență</SelectItem>
                    <SelectItem value="0-2 ani">0-2 ani</SelectItem>
                    <SelectItem value="2-5 ani">2-5 ani</SelectItem>
                    <SelectItem value="5-10 ani">5-10 ani</SelectItem>
                    <SelectItem value="10+ ani">10+ ani</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="motivatie">Scrisoare de motivație</Label>
                <Textarea 
                  id="motivatie" 
                  placeholder="De ce dorești să lucrezi la Markets4all și de ce ești potrivit pentru această poziție?" 
                  value={motivatie}
                  onChange={(e) => setMotivatie(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white h-32"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="cv">Încarcă CV (PDF, DOC, DOCX)</Label>
                <Input 
                  id="cv" 
                  type="file" 
                  accept=".pdf,.doc,.docx" 
                  onChange={handleFileChange}
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>
              
              <Button type="submit" className="w-full bg-gold-500 hover:bg-gold-600 text-black">
                <Send className="mr-2 h-4 w-4" />
                Trimite aplicarea
              </Button>
            </form>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Careers;
