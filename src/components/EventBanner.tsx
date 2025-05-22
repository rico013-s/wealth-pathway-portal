
import React from 'react';
import { Link } from 'react-router-dom';

const EventBanner = () => {
  return (
    <section className="py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-[#00b894]/90 to-[#00a382] rounded-xl overflow-hidden shadow-lg">
          <div className="p-6 md:p-10 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Money4All Event</h3>
              <p className="text-white/90 text-lg mb-4">
                De la informație la acțiune financiară — Vino la evenimentul nostru!
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/20 px-4 py-2 rounded-full text-white">📍 [Locația]</div>
                <div className="bg-white/20 px-4 py-2 rounded-full text-white">🗓️ [Data]</div>
                <div className="bg-white/20 px-4 py-2 rounded-full text-white">🕕 [Ora]</div>
              </div>
            </div>
            
            <Link 
              to="/event" 
              className="inline-flex items-center justify-center bg-white hover:bg-gray-100 text-[#00b894] font-medium px-6 py-3 rounded-lg transition-colors no-underline"
            >
              Detalii și înscriere
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventBanner;
