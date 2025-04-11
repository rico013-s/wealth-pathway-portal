import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRight, User, Mail, Lock, UserCheck } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { toast } from 'sonner';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const navigate = useNavigate();
  const { toast: uiToast } = useToast();

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!name.trim()) {
      newErrors.name = 'Numele este obligatoriu';
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email-ul este obligatoriu';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Adresa de email nu este validă';
    }
    
    if (!password) {
      newErrors.password = 'Parola este obligatorie';
    } else if (password.length < 6) {
      newErrors.password = 'Parola trebuie să aibă cel puțin 6 caractere';
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Parolele nu corespund';
    }
    
    if (!termsAccepted) {
      newErrors.terms = 'Trebuie să accepți termenii și condițiile';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const existingUsersString = localStorage.getItem('allUsers');
      const existingUsers = existingUsersString ? JSON.parse(existingUsersString) : [];
      
      const existingUser = existingUsers.find((user: any) => user.email === email);
      
      if (existingUser) {
        setErrors({ email: 'Acest email este deja înregistrat' });
        return;
      }

      const userData = {
        name,
        email,
        password,
        joinDate: new Date().toISOString().split('T')[0],
        subscriptionPlan: 'bronze',
      };
      
      existingUsers.push(userData);
      localStorage.setItem('allUsers', JSON.stringify(existingUsers));
      
      localStorage.setItem('userData', JSON.stringify(userData));
      
      toast("Înregistrare reușită!", {
        description: "Contul tău a fost creat cu succes."
      });
      
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center py-20">
        <div className="w-full max-w-md mx-auto px-4">
          <div className="relative">
            <div className="absolute -left-20 -top-20 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl"></div>
            
            <div className="bg-gray-900 border border-gray-800 p-8 rounded-xl shadow-xl relative z-10">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Creează un cont</h1>
                <p className="text-gray-400">Începe călătoria ta de investiții cu Markets4all</p>
              </div>
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="name">Nume complet</Label>
                  <div className="relative">
                    <Input 
                      id="name" 
                      type="text" 
                      placeholder="Ion Popescu" 
                      className="pl-10 bg-gray-800 border-gray-700 text-white"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  </div>
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="nume@exemplu.com" 
                      className="pl-10 bg-gray-800 border-gray-700 text-white"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  </div>
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Parolă</Label>
                  <div className="relative">
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="••••••••" 
                      className="pl-10 bg-gray-800 border-gray-700 text-white"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  </div>
                  {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmă parola</Label>
                  <div className="relative">
                    <Input 
                      id="confirm-password" 
                      type="password" 
                      placeholder="••••••••" 
                      className="pl-10 bg-gray-800 border-gray-700 text-white"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <UserCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                </div>
                
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={termsAccepted}
                    onCheckedChange={(checked) => setTermsAccepted(checked === true)}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm text-gray-300 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Sunt de acord cu <a href="#" className="text-gold-500 hover:underline">Termenii și Condițiile</a>
                  </label>
                </div>
                {errors.terms && <p className="text-red-500 text-sm">{errors.terms}</p>}
                
                <Button type="submit" className="w-full bg-gold-500 hover:bg-gold-600 text-black">
                  Creează cont <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
              
              <div className="mt-6 text-center text-sm text-gray-400">
                <p>Ai deja un cont?{" "}
                  <Link to="/login" className="text-gold-500 hover:underline">
                    Autentifică-te
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Register;
