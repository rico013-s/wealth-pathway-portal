
import React, { useEffect, useState } from 'react';

const ApplicationForm = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Add a timeout to help ensure iframe loads completely
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="apply" className="bg-gray-900 border border-gray-800 rounded-xl p-4 md:p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Aplică pentru o poziție</h2>
      
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-500"></div>
        </div>
      )}
      
      <div className="w-full overflow-hidden" style={{ display: loading ? 'none' : 'block' }}>
        <iframe 
          src="https://docs.google.com/forms/d/e/1FAIpQLSdNIO_H0QTDCEviuCqeZ10uzYeyqAxn3WrpfNAR3gbRG-15Kg/viewform?embedded=true" 
          width="100%" 
          height={1500} 
          frameBorder={0} 
          marginHeight={0} 
          marginWidth={0}
          className="bg-transparent"
          title="Formular aplicare cariere"
          onLoad={() => setLoading(false)}
          allow="autoplay; camera; microphone; fullscreen"
          allowFullScreen
        >
          Se încarcă...
        </iframe>
      </div>
    </div>
  );
};

export default ApplicationForm;
