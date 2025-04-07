
import React from 'react';

const CareersHeader = () => {
  return (
    <div className="relative mb-16">
      <div className="absolute -left-20 -top-20 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Cariere la <span className="text-gold-500">Markets4all</span>
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          Alătură-te echipei noastre și ajută-ne să transformăm modul în care oamenii 
          investesc și învață despre piețele financiare
        </p>
      </div>
    </div>
  );
};

export default CareersHeader;
