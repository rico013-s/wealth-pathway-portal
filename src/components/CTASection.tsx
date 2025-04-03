
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, TrendingUp, DollarSign } from 'lucide-react';

const CTASection = () => {
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input placeholder="Prenume" className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400" />
                      <Input placeholder="Nume" className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400" />
                    </div>
                    <Input placeholder="Adresă de email" className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400" />
                    <Input placeholder="Număr de telefon" className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400" />
                    <Textarea placeholder="Spune-ne despre obiectivele tale de investiții..." className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400" rows={4} />
                    <Button className="w-full bg-gold-500 hover:bg-gold-600 text-black font-semibold">
                      Programează consultanță <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </TabsContent>
                  
                  <TabsContent value="match" className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <label className="block mb-2 text-sm">Suma de investit</label>
                        <Input placeholder="1.000 lei" className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400" />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm">Toleranță la risc</label>
                        <select className="w-full bg-gray-800 border-gray-700 text-white rounded-md p-2">
                          <option value="low">Conservator</option>
                          <option value="medium">Moderat</option>
                          <option value="high">Agresiv</option>
                        </select>
                      </div>
                      <div>
                        <label className="block mb-2 text-sm">Experiență în investiții</label>
                        <select className="w-full bg-gray-800 border-gray-700 text-white rounded-md p-2">
                          <option value="beginner">Începător</option>
                          <option value="intermediate">Intermediar</option>
                          <option value="advanced">Avansat</option>
                        </select>
                      </div>
                      <div>
                        <label className="block mb-2 text-sm">Adresă de email</label>
                        <Input placeholder="email@tau.ro" className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400" />
                      </div>
                    </div>
                    <Button className="w-full bg-gold-500 hover:bg-gold-600 text-black font-semibold">
                      Găsește potrivirea mea <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
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
