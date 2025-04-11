
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRight, Mail, Lock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const navigate = useNavigate();
  const { toast: uiToast } = useToast();

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!email.trim()) {
      newErrors.email = 'Email-ul este obligatoriu';
    }
    
    if (!password) {
      newErrors.password = 'Parola este obligatorie';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Verificăm dacă există utilizatori în localStorage
      const allUsersString = localStorage.getItem('allUsers');
      
      if (!allUsersString) {
        setErrors({ login: 'Nu există niciun utilizator înregistrat' });
        return;
      }
      
      const allUsers = JSON.parse(allUsersString);
      
      // Căutăm utilizatorul cu email-ul și parola introduse
      const foundUser = allUsers.find(
        (user: any) => user.email === email && user.password === password
      );
      
      if (foundUser) {
        // Set authentication state
        localStorage.setItem('isAuthenticated', 'true');
        
        // Salvăm datele utilizatorului pentru a le folosi în aplicație
        localStorage.setItem('userData', JSON.stringify(foundUser));
        
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }
        
        // Changed the toast implementation to match the expected API
        toast("Autentificare reușită", {
          description: "Bine ai revenit la Markets4all!"
        });
        
        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        setErrors({ login: 'Email sau parolă incorecte' });
      }
    }
  };

  // Check if there's a remembered email
  React.useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

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
                <h1 className="text-3xl font-bold mb-2">Autentificare</h1>
                <p className="text-gray-400">Intră în contul tău Markets4all</p>
              </div>
              
              {errors.login && (
                <div className="bg-red-900/30 border border-red-800 p-3 rounded-md mb-6 text-center">
                  <p className="text-red-300">{errors.login}</p>
                </div>
              )}
              
              <form className="space-y-6" onSubmit={handleSubmit}>
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
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password">Parolă</Label>
                    <Link to="/reset-password" className="text-sm text-gold-500 hover:underline">
                      Ai uitat parola?
                    </Link>
                  </div>
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
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remember" 
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked === true)}
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm text-gray-300 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Ține-mă autentificat
                  </label>
                </div>
                
                <Button type="submit" className="w-full bg-gold-500 hover:bg-gold-600 text-black">
                  Autentificare <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
              
              <div className="mt-6 text-center text-sm text-gray-400">
                <p>Nu ai un cont încă?{" "}
                  <Link to="/register" className="text-gold-500 hover:underline">
                    Înregistrează-te
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

export default Login;
