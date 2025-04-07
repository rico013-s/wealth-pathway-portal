
import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

const ApplicationForm = () => {
  return (
    <div id="apply" className="bg-gray-900 border border-gray-800 rounded-xl p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Aplică pentru o poziție</h2>
      <div className="text-center">
        <p className="text-gray-300 mb-6">
          Completează formularul nostru de aplicare și vom reveni cu un răspuns în cel mai scurt timp posibil.
        </p>
        <a 
          href="https://docs.google.com/forms/d/e/YOUR-FORM-ID/viewform" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <Button 
            size="lg" 
            className="bg-gold-500 hover:bg-gold-600 text-black font-semibold inline-flex items-center gap-2"
          >
            Aplică acum <ExternalLink className="h-4 w-4" />
          </Button>
        </a>
      </div>
    </div>
  );
};

export default ApplicationForm;
