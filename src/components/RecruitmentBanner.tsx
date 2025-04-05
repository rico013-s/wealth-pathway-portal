
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

const RecruitmentBanner = () => {
  return (
    <section className="py-20 bg-black text-white border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Alătură-te echipei <span className="text-gold-500">Markets4all</span>
            </h2>
            <div className="space-y-6 text-gray-300">
              <p className="text-lg">
                Suntem în continuă creștere și căutăm talente care împărtășesc viziunea noastră 
                de a democratiza accesul la investiții pentru toți românii.
              </p>
              <div className="flex items-start">
                <div className="bg-gold-500/10 p-3 rounded-lg mr-4">
                  <Users className="h-6 w-6 text-gold-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1 text-white">Cultură deschisă și incluzivă</h3>
                  <p>Valorificăm diversitatea de idei și promovăm un mediu de lucru colaborativ.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-gold-500/10 p-3 rounded-lg mr-4">
                  <Briefcase className="h-6 w-6 text-gold-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1 text-white">Dezvoltare continuă</h3>
                  <p>Oferim oportunități de învățare și creștere profesională în domeniul financiar.</p>
                </div>
              </div>
              <div className="pt-4">
                <Link to="/careers">
                  <Button size="lg" className="bg-gold-500 hover:bg-gold-600 text-black font-semibold">
                    Vezi pozițiile disponibile <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-gold-500">Descoperă-ți viitoarea carieră</h3>
              <p className="mb-6 text-gray-300">
                Indiferent dacă ești expert în analiză financiară, pasionat de educație 
                în investiții sau specialist în marketing, avem o poziție potrivită pentru tine.
              </p>
              <div className="space-y-4">
                <div className="bg-black/50 p-4 rounded-lg border border-gray-800 hover:border-gold-500 transition-colors">
                  <h4 className="font-semibold">Analist Financiar</h4>
                  <p className="text-sm text-gray-400">București | Full-time</p>
                </div>
                <div className="bg-black/50 p-4 rounded-lg border border-gray-800 hover:border-gold-500 transition-colors">
                  <h4 className="font-semibold">Consultant Investiții</h4>
                  <p className="text-sm text-gray-400">Cluj-Napoca | Full-time</p>
                </div>
                <div className="bg-black/50 p-4 rounded-lg border border-gray-800 hover:border-gold-500 transition-colors">
                  <h4 className="font-semibold">Content Creator Educație Financiară</h4>
                  <p className="text-sm text-gray-400">Remote | Part-time</p>
                </div>
              </div>
              <div className="mt-6">
                <Link to="/careers">
                  <Button variant="outline" className="w-full border-gold-500 text-white hover:bg-gold-500 hover:text-black">
                    Vezi toate pozițiile disponibile
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecruitmentBanner;
