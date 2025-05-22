
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Event = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Navbar />
      
      <header className="bg-[#00b894] text-white text-center py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">💸 Money4All by Markets4All</h1>
        <p className="text-xl mb-4"><strong>— De la informație la acțiune financiară —</strong></p>
        <p className="text-lg">📍 [Locația] | 🗓️ [Data] | 🕕 [Ora]</p>
      </header>

      <div className="max-w-3xl mx-auto my-16 px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#00b894] mb-4">Ce este Money4All?</h2>
          <p className="mb-8 text-lg">
            Un eveniment interactiv creat pentru a oferi acces tuturor la informații financiare reale și utile – despre credite, investiții și fonduri europene. 
            Indiferent de experiența sau bugetul tău, ai un loc la masă.
          </p>

          <h2 className="text-2xl font-bold text-[#00b894] mb-4">Ce vei învăța?</h2>
          <ul className="space-y-2 mb-8 text-lg">
            <li className="flex items-start">
              <span className="text-[#00b894] mr-2">✅</span> 
              <span>Cum funcționează creditele și cum le folosești eficient</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#00b894] mr-2">✅</span> 
              <span>Cum poți investi inteligent, chiar dacă pornești cu puțin</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#00b894] mr-2">✅</span> 
              <span>Ce fonduri europene sunt disponibile și cum poți aplica</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#00b894] mr-2">✅</span> 
              <span>Cum poți colabora cu Markets4All și face pași concreți spre stabilitate financiară</span>
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-[#00b894] mb-4">Ce te așteaptă?</h2>
          <ul className="space-y-2 mb-8 text-lg">
            <li className="flex items-start">
              <span className="text-[#00b894] mr-2">🎤</span> 
              <span>3 sesiuni cu invitați specializați</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#00b894] mr-2">💬</span> 
              <span>Informație practică, povești reale</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#00b894] mr-2">🤝</span> 
              <span>Oportunități de colaborare și networking</span>
            </li>
          </ul>

          <div className="text-center mt-10">
            <a 
              href="#formular" 
              className="inline-block bg-[#00b894] hover:bg-[#00a382] text-white px-6 py-3 text-lg font-medium rounded-lg transition-colors"
            >
              📩 Înscrie-te acum – locuri limitate
            </a>
          </div>

          <iframe 
            id="formular" 
            src="https://docs.google.com/forms/d/e/1FAIpQLSfXEXEMPLU/viewform?embedded=true"
            className="w-full h-[500px] border-none mt-10"
            title="Formular de înscriere"
          >
            Se încarcă formularul de înscriere...
          </iframe>
        </div>
      </div>

      <div className="text-center text-gray-500 mb-8">
        © 2025 Markets4All | Contact: contact@markets4all.ro
      </div>
      
      <Footer />
    </div>
  );
};

export default Event;
