
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CareersHeader from '@/components/careers/CareersHeader';
import JobsList from '@/components/careers/JobsList';
import { jobPositions } from '@/data/jobPositions';

const Careers = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <CareersHeader />
          <JobsList jobPositions={jobPositions} />
          
          <div id="apply" className="bg-gray-900 border border-gray-800 rounded-xl p-4 md:p-8 max-w-4xl mx-auto mt-12">
            <h2 className="text-2xl font-bold mb-6 text-center">Aplică pentru o poziție</h2>
            
            <div className="bg-white rounded-lg overflow-hidden">
              <iframe 
                src="https://docs.google.com/forms/d/e/1FAIpQLSdkfZcZsIewcetHJj8Y1TxlfVXDwGCHsUgrtTMGXCOXDwN_mA/viewform?embedded=true" 
                width="100%" 
                height="800" 
                frameBorder="0" 
                marginHeight={0} 
                marginWidth={0}
                title="Job Application Form"
                className="mx-auto block"
              >
                Se încarcă formularul...
              </iframe>
            </div>
            
            <p className="text-gray-400 text-sm mt-4 text-center">
              Completează formularul de mai sus pentru a aplica la una dintre pozițiile disponibile.
              Toate CV-urile vor fi trimise direct către echipa noastră de recrutare.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Careers;
