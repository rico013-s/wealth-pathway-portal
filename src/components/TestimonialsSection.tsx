
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Michael Johnson",
    role: "Retail Investor",
    quote: "WealthPathway helped me find the perfect investment firm for my needs. As a beginner, I was overwhelmed by options, but their guidance made the process simple.",
    rating: 5,
    investmentType: "Mutual Funds",
    returns: "+12% in 8 months",
  },
  {
    name: "Sarah Williams",
    role: "Tech Professional",
    quote: "I had some savings but didn't know how to invest effectively. The comparison tool helped me choose a service that aligned with my risk tolerance and goals.",
    rating: 5,
    investmentType: "Tech ETFs",
    returns: "+18% in 1 year",
  },
  {
    name: "Robert Chen",
    role: "Small Business Owner",
    quote: "As someone with limited time to research investments, WealthPathway's consultancy service was invaluable. They matched me with a firm that understood my business needs.",
    rating: 4,
    investmentType: "Dividend Stocks",
    returns: "+10% in 6 months",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Client Success Stories</h2>
          <p className="text-lg text-navy-600">
            Hear from investors who found their perfect match through our consultancy services.
            We've helped thousands of clients at all experience levels grow their wealth.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="card-hover">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < testimonial.rating ? 'fill-gold-500 text-gold-500' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <blockquote className="text-navy-700 italic mb-6">"{testimonial.quote}"</blockquote>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-navy-800">{testimonial.name}</p>
                    <p className="text-sm text-navy-600">{testimonial.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-navy-600">{testimonial.investmentType}</p>
                    <p className="font-medium text-forest-700">{testimonial.returns}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
