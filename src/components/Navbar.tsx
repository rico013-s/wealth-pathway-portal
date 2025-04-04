
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, UserCircle, LogIn, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState('ro'); // 'ro' for Romanian, 'en' for English

  return (
    <nav className="w-full bg-black/90 backdrop-blur-sm fixed top-0 z-50 shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-4">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="font-bold text-2xl"><span className="text-white">Markets</span><span className="text-gold-500">4all</span></span>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-8 ml-12">
          <a href="#services" className="text-white hover:text-gold-500 font-medium">Servicii</a>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center text-white hover:text-gold-500 font-medium">
                Companii <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-black/90 border border-gold-500">
              <DropdownMenuItem className="text-white hover:text-gold-500 hover:bg-gray-800">
                <a href="#companies" className="w-full">Partenerii noștri</a>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:text-gold-500 hover:bg-gray-800">
                <a href="#comparison" className="w-full">Comparație</a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <a href="#about" className="text-white hover:text-gold-500 font-medium">Despre noi</a>
          <Link to="/careers" className="text-white hover:text-gold-500 font-medium">Cariere</Link>
          <a href="#contact" className="text-white hover:text-gold-500 font-medium">Contact</a>
          
          {/* Language selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center text-white hover:text-gold-500 font-medium">
                <Globe className="mr-1 h-4 w-4" />
                {language === 'ro' ? 'RO' : 'EN'} <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-black/90 border border-gold-500">
              <DropdownMenuItem 
                className={`hover:bg-gray-800 ${language === 'ro' ? 'text-gold-500' : 'text-white'}`} 
                onClick={() => setLanguage('ro')}
              >
                🇷🇴 Română
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={`hover:bg-gray-800 ${language === 'en' ? 'text-gold-500' : 'text-white'}`}
                onClick={() => setLanguage('en')}
              >
                🇬🇧 English
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login">
            <Button variant="outline" className="border-gold-500 text-white hover:bg-gold-500/10">
              <LogIn className="mr-2 h-4 w-4" />
              Autentificare
            </Button>
          </Link>
          <Link to="/register">
            <Button className="bg-gold-500 hover:bg-gold-600 text-black font-semibold">
              <UserCircle className="mr-2 h-4 w-4" />
              Înregistrare
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <Button 
            variant="ghost" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white hover:bg-transparent hover:text-gold-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 p-4">
          <div className="flex flex-col space-y-4">
            <a href="#services" className="text-white hover:text-gold-500 font-medium py-2">Servicii</a>
            <a href="#companies" className="text-white hover:text-gold-500 font-medium py-2">Companii</a>
            <a href="#about" className="text-white hover:text-gold-500 font-medium py-2">Despre noi</a>
            <Link to="/careers" className="text-white hover:text-gold-500 font-medium py-2">Cariere</Link>
            <a href="#contact" className="text-white hover:text-gold-500 font-medium py-2">Contact</a>
            
            {/* Language options for mobile */}
            <div className="flex gap-4 py-2 border-t border-gray-800">
              <button 
                className={`px-2 py-1 rounded flex items-center ${language === 'ro' ? 'bg-gold-500 text-black' : 'text-white'}`}
                onClick={() => setLanguage('ro')}
              >
                🇷🇴 Română
              </button>
              <button 
                className={`px-2 py-1 rounded flex items-center ${language === 'en' ? 'bg-gold-500 text-black' : 'text-white'}`}
                onClick={() => setLanguage('en')}
              >
                🇬🇧 English
              </button>
            </div>
            
            <div className="flex flex-col space-y-2 pt-2 border-t border-gray-800">
              <Link to="/login">
                <Button variant="outline" className="w-full border-gold-500 text-white">
                  <LogIn className="mr-2 h-4 w-4" />
                  Autentificare
                </Button>
              </Link>
              <Link to="/register">
                <Button className="w-full bg-gold-500 text-black">
                  <UserCircle className="mr-2 h-4 w-4" />
                  Înregistrare
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
