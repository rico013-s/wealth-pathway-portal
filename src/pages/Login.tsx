
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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // În mod normal, aici ar fi logica de autentificare
    // Pentru demonstrație, vom redirecționa direct către dashboard
    
    toast({
      title: "Autentificare reușită",
      description: "Bine ai revenit la Markets4all!",
      variant: "default",
    });
    
    navigate('/dashboard');
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
                <h1 className="text-3xl font-bold mb-2">Autentificare</h1>
                <p className="text-gray-400">Intră în contul tău Markets4all</p>
              </div>
              
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
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
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
