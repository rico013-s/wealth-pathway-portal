
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight, User, Mail, Calendar } from 'lucide-react';
import { UserTier } from '@/components/dashboard/UserTierBadge';
import UserTierBadge from '@/components/dashboard/UserTierBadge';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface UserData {
  name: string;
  email: string;
  subscriptionPlan?: 'bronze' | 'silver' | 'gold';
  subscriptionPrice?: number;
  joinDate?: string;
}

const Account = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificăm dacă utilizatorul este autentificat
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    // Recuperăm datele utilizatorului
    const userDataString = localStorage.getItem('userData');
    
    if (userDataString) {
      const parsedUserData = JSON.parse(userDataString);
      // Adăugăm o dată de înscriere dacă nu există deja
      if (!parsedUserData.joinDate) {
        parsedUserData.joinDate = new Date().toISOString().split('T')[0];
        localStorage.setItem('userData', JSON.stringify(parsedUserData));
      }
      
      // Dacă nu există plan de abonament, setăm unul implicit
      if (!parsedUserData.subscriptionPlan) {
        parsedUserData.subscriptionPlan = 'bronze';
        localStorage.setItem('userData', JSON.stringify(parsedUserData));
      }

      // Setăm prețul abonamentului în funcție de plan
      if (parsedUserData.subscriptionPlan === 'silver' && !parsedUserData.subscriptionPrice) {
        parsedUserData.subscriptionPrice = 49.99;
        localStorage.setItem('userData', JSON.stringify(parsedUserData));
      } else if (parsedUserData.subscriptionPlan === 'gold' && !parsedUserData.subscriptionPrice) {
        parsedUserData.subscriptionPrice = 99.99;
        localStorage.setItem('userData', JSON.stringify(parsedUserData));
      }
      
      setUserData(parsedUserData);
    }
  }, [navigate]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('ro-RO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleGoToDashboard = () => {
    navigate('/dashboard');
    toast.info("Acces la dashboard-ul Markets4all");
  };

  if (!userData) {
    return <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white">Se încarcă...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      
      <div className="flex-grow py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
              <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
                <div className="bg-gray-800 rounded-full w-24 h-24 flex items-center justify-center">
                  <User className="w-12 h-12 text-gray-400" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{userData.name}</h1>
                  <div className="flex items-center gap-3 mt-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">{userData.email}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">Membru din {formatDate(userData.joinDate)}</span>
                  </div>
                  <div className="mt-3">
                    <UserTierBadge tier={userData.subscriptionPlan as UserTier || 'bronze'} />
                  </div>
                </div>
              </div>
              
              <Separator className="my-6 bg-gray-800" />
              
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle>Informații personale</CardTitle>
                    <CardDescription className="text-gray-400">Datele tale de contact</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nume complet</Label>
                      <Input id="name" value={userData.name} disabled className="bg-gray-700 border-gray-600" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" value={userData.email} disabled className="bg-gray-700 border-gray-600" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle>Detalii abonament</CardTitle>
                    <CardDescription className="text-gray-400">Planul tău curent</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium">Plan {userData.subscriptionPlan === 'bronze' ? 'Bronze' : userData.subscriptionPlan === 'silver' ? 'Silver' : 'Gold'}</h3>
                      {userData.subscriptionPlan !== 'bronze' && userData.subscriptionPrice && (
                        <p className="text-gray-300 mt-1">{userData.subscriptionPrice} RON / lună</p>
                      )}
                      <p className="text-gray-400 mt-2">
                        {userData.subscriptionPlan === 'bronze' 
                          ? 'Cont de bază fără acces la funcții premium' 
                          : userData.subscriptionPlan === 'silver'
                            ? 'Acces la analize de piață de bază și alerte personalizate'
                            : 'Acces complet la toate funcționalitățile premium'}
                      </p>
                    </div>
                    
                    <div className="flex flex-col space-y-3">
                      <Button 
                        onClick={() => navigate('/subscriptions')}
                        className={userData.subscriptionPlan === 'bronze' || userData.subscriptionPlan === 'silver' 
                          ? 'bg-gold-500 hover:bg-gold-600 text-black'
                          : 'bg-gray-700 hover:bg-gray-600'}
                      >
                        {userData.subscriptionPlan === 'bronze' 
                          ? 'Abonează-te acum' 
                          : userData.subscriptionPlan === 'silver'
                            ? 'Upgrade la Gold'
                            : 'Gestionează abonamentul'}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>

                      <Button
                        onClick={handleGoToDashboard}
                        variant="outline"
                        className="border-gold-500 text-white hover:bg-gold-500/10"
                      >
                        Accesează Dashboard
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Account;
