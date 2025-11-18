
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Check, Crown, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const Subscriptions = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubscribe = (plan: string, price: number) => {
    // În cazul unui site real, aici ar fi integrarea cu un procesor de plăți
    // Pentru demonstrație, vom simula o abonare reușită
    
    // Actualizăm planul utilizatorului în localStorage
    const userDataString = localStorage.getItem('userData');
    
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      userData.subscriptionPlan = plan;
      userData.subscriptionPrice = price;
      localStorage.setItem('userData', JSON.stringify(userData));
      
      toast({
        title: "Abonament activat",
        description: `Ai ales cu succes planul ${plan} la prețul de ${price} RON/lună.`,
        variant: "default",
      });
      
      // Redirecționează către pagina de cont
      navigate('/account');
    } else {
      toast({
        title: "Eroare",
        description: "Nu ești autentificat. Te rugăm să te autentifici și să încerci din nou.",
        variant: "destructive",
      });
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      
      <div className="flex-grow py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl font-bold mb-6">Alege planul potrivit pentru tine</h1>
            <p className="text-lg text-gray-300">Investește inteligent cu Markets4all. Alege planul care se potrivește nevoilor tale de investiții.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Planul Bronze */}
            <Card className={`bg-gray-900 border ${selectedPlan === 'bronze' ? 'border-amber-700' : 'border-gray-800'} hover:border-amber-700 transition-all`}>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-2 rounded-full bg-gray-800 w-16 h-16 flex items-center justify-center">
                  <Check className="text-amber-700 w-8 h-8" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-200">Plan Bronze</CardTitle>
                <CardDescription className="text-gray-400">Pentru investitori începători</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold">99 RON</span>
                  <span className="text-gray-400 ml-2 block text-sm">plată unică</span>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="text-amber-700 mr-2 h-5 w-5" />
                    <span>Acces la cursuri de bază</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-amber-700 mr-2 h-5 w-5" />
                    <span>Materiale educaționale fundamentale</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-amber-700 mr-2 h-5 w-5" />
                    <span>Suport comunitate</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-amber-700 mr-2 h-5 w-5" />
                    <span>Resurse pentru începători</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => handleSubscribe('bronze', 99)} 
                  className="w-full bg-amber-700 hover:bg-amber-800 text-white"
                >
                  Alege planul Bronze
                </Button>
              </CardFooter>
            </Card>

            {/* Planul Silver */}
            <Card className={`bg-gray-900 border ${selectedPlan === 'silver' ? 'border-gray-400' : 'border-gray-800'} hover:border-gray-400 transition-all`}>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-2 rounded-full bg-gray-800 w-16 h-16 flex items-center justify-center">
                  <Award className="text-gray-400 w-8 h-8" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-200">Plan Silver</CardTitle>
                <CardDescription className="text-gray-400">Pentru investitori intermediari</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold">249 RON</span>
                  <span className="text-gray-400 ml-2 block text-sm">plată unică</span>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="text-gray-400 mr-2 h-5 w-5" />
                    <span>Toate beneficiile planului Bronze</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-gray-400 mr-2 h-5 w-5" />
                    <span>Analize de piață avansate</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-gray-400 mr-2 h-5 w-5" />
                    <span>Strategii de tranzacționare</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-gray-400 mr-2 h-5 w-5" />
                    <span>Acces la webinarii educaționale</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => handleSubscribe('silver', 249)} 
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white"
                >
                  Alege planul Silver
                </Button>
              </CardFooter>
            </Card>
            
            {/* Planul Gold */}
            <Card className={`bg-gray-900 border ${selectedPlan === 'gold' ? 'border-gold-500' : 'border-gray-800'} hover:border-gold-500 transition-all`}>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-2 rounded-full bg-gray-800 w-16 h-16 flex items-center justify-center">
                  <Crown className="text-gold-500 w-8 h-8" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-200">Plan Gold</CardTitle>
                <CardDescription className="text-gray-400">Pentru investitori avansați</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold">500 RON</span>
                  <span className="text-gray-400 ml-2 block text-sm">plată unică</span>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="text-gold-500 mr-2 h-5 w-5" />
                    <span>Toate beneficiile planului Silver</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-gold-500 mr-2 h-5 w-5" />
                    <span>Mentoring personalizat 1:1</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-gold-500 mr-2 h-5 w-5" />
                    <span>Video custom made</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-gold-500 mr-2 h-5 w-5" />
                    <span>Acces la consultanță premium</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-gold-500 mr-2 h-5 w-5" />
                    <span>Trading împreună cu experții</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => handleSubscribe('gold', 500)} 
                  className="w-full bg-gold-500 hover:bg-gold-600 text-black"
                >
                  Alege planul Gold
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="text-center mt-12 text-gray-400 max-w-2xl mx-auto">
            <p className="text-sm">* Toate abonamentele sunt plăți unice și oferă acces pe viață la resursele selectate. Pentru întrebări referitoare la abonamente, contactează echipa noastră de suport.</p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Subscriptions;
