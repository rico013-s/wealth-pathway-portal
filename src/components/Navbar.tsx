import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Phone, Mail, User, LogOut, CreditCard, BookOpen } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { supabase } from '@/integrations/supabase/client';

const navLinks = [
  { href: '/servicii', label: 'Servicii' },
  { href: '/educatie', label: 'Educație' },
  { href: '/consultanta', label: 'Consultanță' },
  { href: '/despre-noi', label: 'Despre Noi' },
  { href: '/careers', label: 'Cariere' },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="w-full bg-black/90 backdrop-blur-sm fixed top-0 z-50 shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-4">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="font-bold text-2xl"><span className="text-white">Markets</span><span className="text-gold-500">4all</span></span>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-6 mx-auto">
          {navLinks.map((link) => (
            <Link 
              key={link.href}
              to={link.href} 
              className={`font-medium whitespace-nowrap transition-colors ${
                isActive(link.href) 
                  ? 'text-gold-500' 
                  : 'text-white hover:text-gold-500'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-black">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-black/95 border border-gold-500 min-w-[180px]">
                <DropdownMenuItem asChild className="text-white hover:text-gold-500 hover:bg-gray-800 cursor-pointer">
                  <Link to="/account" className="flex items-center w-full">
                    <User className="mr-2 h-4 w-4" />
                    Contul meu
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="text-white hover:text-gold-500 hover:bg-gray-800 cursor-pointer">
                  <Link to="/subscriptions" className="flex items-center w-full">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Abonamentul tău
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="text-white hover:text-gold-500 hover:bg-gray-800 cursor-pointer">
                  <Link to="/educatie" className="flex items-center w-full">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Materiale
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="text-white hover:text-gold-500 hover:bg-gray-800 cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Deconectare
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" className="border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-black">
                  Autentificare
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-gold-500 hover:bg-gold-600 text-black font-semibold">
                  Înregistrare
                </Button>
              </Link>
            </>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-white hover:text-gold-500">
                <Phone className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-black/90 border border-gold-500">
              <DropdownMenuItem className="text-white hover:text-gold-500 hover:bg-gray-800">
                <a href="tel:0740113111" className="flex items-center w-full">
                  <Phone className="mr-2 h-4 w-4" />
                  0740 113 111
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white hover:text-gold-500 hover:bg-gray-800">
                <a href="mailto:markets4allro@gmail.com" className="flex items-center w-full">
                  <Mail className="mr-2 h-4 w-4" />
                  markets4allro@gmail.com
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                to={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-medium py-2 transition-colors ${
                  isActive(link.href) 
                    ? 'text-gold-500' 
                    : 'text-white hover:text-gold-500'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            <div className="flex flex-col space-y-2 pt-2 border-t border-gray-800">
              {user ? (
                <>
                  <Link to="/account" className="flex items-center text-white hover:text-gold-500 font-medium py-2" onClick={() => setIsMobileMenuOpen(false)}>
                    <User className="mr-2 h-4 w-4" />
                    Contul meu
                  </Link>
                  <Link to="/subscriptions" className="flex items-center text-white hover:text-gold-500 font-medium py-2" onClick={() => setIsMobileMenuOpen(false)}>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Abonamentul tău
                  </Link>
                  <Link to="/educatie" className="flex items-center text-white hover:text-gold-500 font-medium py-2" onClick={() => setIsMobileMenuOpen(false)}>
                    <BookOpen className="mr-2 h-4 w-4" />
                    Materiale
                  </Link>
                  <button 
                    onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                    className="flex items-center text-white hover:text-gold-500 font-medium py-2"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Deconectare
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-black">
                      Autentificare
                    </Button>
                  </Link>
                  <Link to="/register" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full bg-gold-500 hover:bg-gold-600 text-black font-semibold">
                      Înregistrare
                    </Button>
                  </Link>
                </>
              )}
            </div>

            <div className="flex flex-col space-y-2 pt-2 border-t border-gray-800">
              <a href="tel:0740113111" className="flex items-center text-white hover:text-gold-500 font-medium py-2">
                <Phone className="mr-2 h-4 w-4" />
                0740 113 111
              </a>
              <a href="mailto:markets4allro@gmail.com" className="flex items-center text-white hover:text-gold-500 font-medium py-2">
                <Mail className="mr-2 h-4 w-4" />
                markets4allro@gmail.com
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
