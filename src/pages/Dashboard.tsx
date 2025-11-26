import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  ShoppingCart, 
  CheckCircle2, 
  CreditCard, 
  Bell, 
  ArrowRight,
  BookOpen,
  AlertCircle,
  FileText,
  Settings,
  LogOut
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { PaymentForm } from '@/components/PaymentForm';

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [profileProgress, setProfileProgress] = useState(0);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; amount: number } | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/login');
        return;
      }

      setUser(user);

      // Fetch profile data
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      
      setProfile(profileData);
      calculateProgress(profileData);
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('Eroare la încărcarea datelor');
    } finally {
      setLoading(false);
    }
  };

  const calculateProgress = (profileData: any) => {
    let progress = 0;
    const fields = ['first_name', 'last_name', 'email', 'phone'];
    const filledFields = fields.filter(field => profileData?.[field] && profileData[field].trim() !== '');
    progress = (filledFields.length / fields.length) * 100;
    setProfileProgress(progress);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
    toast.success('Deconectare reușită');
  };

  const handleSelectPlan = (name: string, price: number) => {
    setSelectedPlan({ name, amount: price * 100 });
    setPaymentDialogOpen(true);
  };

  const subscriptionPlans = [
    {
      name: 'Bronze',
      price: 99,
      description: 'Perfect pentru începători',
      features: ['Acces la cursuri de bază', 'Materiale educaționale', 'Suport comunitate']
    },
    {
      name: 'Silver',
      price: 249,
      description: 'Pentru investitori intermediari',
      features: ['Toate beneficiile Bronze', 'Cursuri avansate', 'Sesiuni mentoring grup']
    },
    {
      name: 'Gold',
      price: 500,
      description: 'Experiența completă',
      features: ['Toate beneficiile Silver', 'Mentoring 1:1', 'Consultanță personalizată']
    }
  ];

  const recommendedActions = [
    {
      title: 'Completează-ți profilul',
      description: 'Adaugă toate informațiile necesare pentru experiență personalizată',
      completed: profileProgress === 100,
      action: () => navigate('/account'),
      icon: User
    },
    {
      title: 'Alege un plan de abonament',
      description: 'Începe călătoria ta în educație financiară',
      completed: false,
      action: () => document.getElementById('cursuri')?.scrollIntoView({ behavior: 'smooth' }),
      icon: ShoppingCart
    },
    {
      title: 'Explorează cursurile disponibile',
      description: 'Descoperă materialeledidactice pregătite pentru tine',
      completed: false,
      action: () => document.getElementById('cursuri')?.scrollIntoView({ behavior: 'smooth' }),
      icon: BookOpen
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />

      <div className="flex-grow pt-20 pb-10 px-4 container mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Bine ai venit, {profile?.first_name || 'Investitor'}! 👋
              </h1>
              <p className="text-gray-400">Gestionează-ți educația financiară și investițiile dintr-un singur loc</p>
            </div>
            <Button variant="outline" onClick={handleLogout} className="border-gray-700">
              <LogOut className="h-4 w-4 mr-2" />
              Deconectare
            </Button>
          </div>

          {/* Progress Card */}
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold">Progresul tău</h3>
                  <p className="text-sm text-gray-400">Completează-ți profilul pentru experiență optimă</p>
                </div>
                <span className="text-2xl font-bold text-gold-500">{profileProgress}%</span>
              </div>
              <Progress value={profileProgress} className="h-2" />
            </CardContent>
          </Card>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Profil Card */}
          <Card className="bg-gray-900 border-gray-800 hover:border-gold-500 transition-all cursor-pointer" onClick={() => navigate('/account')}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-gold-500" />
                  Profil
                </CardTitle>
                <ArrowRight className="h-5 w-5 text-gray-400" />
              </div>
              <CardDescription>Date personale și preferințe</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">• Completare profil: {profileProgress}%</p>
                <p className="text-gray-300">• Email: {profile?.email}</p>
                <p className="text-gray-300">• Telefon: {profile?.phone || 'Necompletat'}</p>
              </div>
            </CardContent>
          </Card>

          {/* Plăți & Facturi Card */}
          <Card className="bg-gray-900 border-gray-800 hover:border-gold-500 transition-all">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-gold-500" />
                  Plăți & Facturi
                </CardTitle>
              </div>
              <CardDescription>Gestionează plățile tale</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <span className="text-sm">Abonament activ</span>
                  <Badge variant="outline" className="border-red-500 text-red-500">Inactiv</Badge>
                </div>
                <Button className="w-full bg-gold-500 hover:bg-gold-600 text-black" onClick={() => document.getElementById('cursuri')?.scrollIntoView({ behavior: 'smooth' })}>
                  Activează abonament
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Mesaje & Notificări Card */}
          <Card className="bg-gray-900 border-gray-800 hover:border-gold-500 transition-all">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-gold-500" />
                  Mesaje & Notificări
                </CardTitle>
                <Badge className="bg-gold-500 text-black">3 noi</Badge>
              </div>
              <CardDescription>Informații importante</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="p-3 bg-gray-800 rounded-lg">
                  <p className="text-sm font-medium">Bine ai venit! 🎉</p>
                  <p className="text-xs text-gray-400">Explorează cursurile disponibile</p>
                </div>
                <div className="p-3 bg-gray-800 rounded-lg">
                  <p className="text-sm font-medium">Ofertă specială</p>
                  <p className="text-xs text-gray-400">20% reducere la primul abonament</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Acțiuni Recomandate */}
        <Card className="bg-gray-900 border-gray-800 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-gold-500" />
              Acțiuni Recomandate
            </CardTitle>
            <CardDescription>Pași pentru a obține cea mai bună experiență</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recommendedActions.map((action, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-4 rounded-lg border ${
                    action.completed 
                      ? 'bg-green-900/20 border-green-500/30' 
                      : 'bg-gray-800 border-gray-700 hover:border-gold-500 cursor-pointer'
                  } transition-all`}
                  onClick={() => !action.completed && action.action()}
                >
                  <div className="flex items-start gap-3">
                    <action.icon className={`h-5 w-5 mt-0.5 ${action.completed ? 'text-green-500' : 'text-gold-500'}`} />
                    <div>
                      <h4 className="font-medium">{action.title}</h4>
                      <p className="text-sm text-gray-400">{action.description}</p>
                    </div>
                  </div>
                  {action.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (
                    <ArrowRight className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cursuri & Produse Section */}
        <div id="cursuri">
          <h2 className="text-2xl font-bold mb-6">Cursuri & Produse Disponibile</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subscriptionPlans.map((plan) => (
              <Card key={plan.name} className="bg-gray-900 border-gray-800 hover:border-gold-500 transition-all">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <ShoppingCart className="h-6 w-6 text-gold-500" />
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gold-500">{plan.price}</span>
                    <span className="text-gray-400 ml-2">RON</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <CheckCircle2 className="h-4 w-4 text-gold-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full bg-gold-500 hover:bg-gold-600 text-black font-bold"
                    onClick={() => handleSelectPlan(plan.name, plan.price)}
                  >
                    Cumpără acum
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <Card className="bg-gray-900 border-gray-800 mt-8">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-gold-500 mt-0.5" />
              <div>
                <h4 className="font-medium mb-1">Ai nevoie de ajutor?</h4>
                <p className="text-sm text-gray-400 mb-3">
                  Echipa noastră este gata să te ajute cu orice întrebări legate de investiții sau educație financiară.
                </p>
                <Button variant="outline" className="border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-black">
                  Contactează-ne
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {selectedPlan && (
        <PaymentForm 
          open={paymentDialogOpen} 
          onOpenChange={setPaymentDialogOpen}
          planName={selectedPlan.name}
          amount={selectedPlan.amount}
        />
      )}

      <Footer />
    </div>
  );
};

export default Dashboard;
