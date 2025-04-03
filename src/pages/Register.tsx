
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRight, User, Mail, Lock, UserCheck } from 'lucide-react';

const Register = () => {
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
              
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nume complet</Label>
                  <div className="relative">
                    <Input 
                      id="name" 
                      type="text" 
                      placeholder="Ion Popescu" 
                      className="pl-10 bg-gray-800 border-gray-700 text-white"
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="nume@exemplu.com" 
                      className="pl-10 bg-gray-800 border-gray-700 text-white"
                    />
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Parolă</Label>
                  <div className="relative">
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="••••••••" 
                      className="pl-10 bg-gray-800 border-gray-700 text-white"
                    />
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmă parola</Label>
                  <div className="relative">
                    <Input 
                      id="confirm-password" 
                      type="password" 
                      placeholder="••••••••" 
                      className="pl-10 bg-gray-800 border-gray-700 text-white"
                    />
                    <UserCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm text-gray-300 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Sunt de acord cu <a href="#" className="text-gold-500 hover:underline">Termenii și Condițiile</a>
                  </label>
                </div>
                
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
