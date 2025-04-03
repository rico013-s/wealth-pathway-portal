
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
    <nav className="w-full bg-white/90 backdrop-blur-sm fixed top-0 z-50 shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-4">
        <div className="flex items-center">
          <a href="/" className="text-2xl font-bold text-navy-800">Wealth<span className="text-gold-500">Pathway</span></a>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#services" className="text-navy-700 hover:text-navy-900 font-medium">Services</a>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center text-navy-700 hover:text-navy-900 font-medium">
                Companies <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <a href="#companies" className="w-full">Our Partners</a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="#comparison" className="w-full">Compare</a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <a href="#about" className="text-navy-700 hover:text-navy-900 font-medium">About</a>
          <a href="#contact" className="text-navy-700 hover:text-navy-900 font-medium">Contact</a>
        </div>
        
        <div>
          <Button className="bg-navy-800 hover:bg-navy-900 text-white">Get Started</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
