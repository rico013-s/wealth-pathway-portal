
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  return (
    <nav className="w-full bg-black/90 backdrop-blur-sm fixed top-0 z-50 shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-4">
        <div className="flex items-center">
          <a href="/" className="text-2xl font-bold text-white">Wealth<span className="text-gold-500">Pathway</span></a>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
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
          <a href="#contact" className="text-white hover:text-gold-500 font-medium">Contact</a>
        </div>
        
        <div>
          <Button className="bg-gold-500 hover:bg-gold-600 text-black font-semibold">Începe acum</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
