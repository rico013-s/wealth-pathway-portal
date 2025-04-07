
import React from 'react';

const ApplicationForm = () => {
  return (
    <div id="apply" className="bg-gray-900 border border-gray-800 rounded-xl p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Aplică pentru o poziție</h2>
      <div className="w-full overflow-hidden">
        <iframe 
          src="https://docs.google.com/forms/d/e/YOUR-FORM-ID/viewform?embedded=true" 
          width="100%" 
          height="900" 
          frameBorder="0" 
          className="bg-transparent"
          title="Formular aplicare cariere"
        >
          Se încarcă...
        </iframe>
      </div>
    </div>
  );
};

export default ApplicationForm;
