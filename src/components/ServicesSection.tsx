
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Coins, DollarSign, ChartBar } from 'lucide-react';

const services = [
  {
    title: "Stock Market Investments",
    description: "Access top-performing stocks and ETFs through our partner firms. Ideal for both beginners and advanced investors.",
    icon: <TrendingUp className="h-10 w-10 text-navy-700" />,
    color: "bg-blue-50",
    level: "All Levels",
    minInvestment: "$100",
  },
  {
    title: "Mutual Funds",
    description: "Diversified portfolio management by industry experts. Low barrier to entry with impressive long-term results.",
    icon: <ChartBar className="h-10 w-10 text-forest-700" />,
    color: "bg-green-50",
    level: "Beginner-Friendly",
    minInvestment: "$50",
  },
  {
    title: "Real Estate",
    description: "Property investment opportunities with fractional ownership options. Build wealth through tangible assets.",
    icon: <DollarSign className="h-10 w-10 text-navy-700" />,
    color: "bg-amber-50",
    level: "Intermediate",
    minInvestment: "$1,000",
  },
  {
    title: "Retirement Planning",
    description: "Secure your future with tailored retirement plans. Tax-advantaged options for long-term financial security.",
    icon: <Coins className="h-10 w-10 text-forest-700" />,
    color: "bg-purple-50",
    level: "All Levels",
    minInvestment: "$25/month",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Investment Services</h2>
          <p className="text-lg text-navy-600">
            We offer a wide range of investment options through our carefully vetted partner companies. 
            Find the perfect match for your financial goals and experience level.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="card-hover border-t-4 border-t-navy-600">
              <CardHeader className={`${service.color} rounded-t-lg`}>
                <div className="flex justify-center">
                  {service.icon}
                </div>
                <CardTitle className="text-xl font-bold text-center mt-2 text-navy-800">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <CardDescription className="text-navy-600 mb-4">{service.description}</CardDescription>
                <div className="flex justify-between items-center text-sm mb-6">
                  <span className="bg-navy-100 text-navy-800 px-3 py-1 rounded-full">{service.level}</span>
                  <span className="font-medium">Min: {service.minInvestment}</span>
                </div>
                <Button variant="outline" className="w-full border-navy-300 text-navy-800 hover:bg-navy-100">Learn More</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
