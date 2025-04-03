
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

const companies = [
  {
    name: "GlobalWealth Partners",
    logo: "GW",
    description: "A leader in global market investments with 25+ years of experience and over $10B in managed assets.",
    rating: 4.8,
    reviewCount: 1250,
    specialties: ["Stocks", "ETFs", "Bonds"],
    minInvestment: "$500",
    returnRate: "12-15% avg",
    highlighted: true,
  },
  {
    name: "Frontier Investments",
    logo: "FI",
    description: "Specializing in emerging markets and technological innovation investments for forward-thinking clients.",
    rating: 4.6,
    reviewCount: 890,
    specialties: ["Tech Stocks", "Emerging Markets", "IPOs"],
    minInvestment: "$1,000",
    returnRate: "15-20% avg",
    highlighted: false,
  },
  {
    name: "Heritage Financial",
    logo: "HF",
    description: "Conservative investment strategies focused on stable growth and capital preservation.",
    rating: 4.7,
    reviewCount: 1560,
    specialties: ["Dividend Stocks", "Mutual Funds", "Retirement"],
    minInvestment: "$100",
    returnRate: "8-10% avg",
    highlighted: false,
  },
  {
    name: "Apex Capital Management",
    logo: "AC",
    description: "High-performance investment strategies targeting ambitious returns for experienced investors.",
    rating: 4.5,
    reviewCount: 720,
    specialties: ["Hedge Funds", "Private Equity", "Commodities"],
    minInvestment: "$10,000",
    returnRate: "18-22% avg",
    highlighted: false,
  }
];

const CompaniesSection = () => {
  return (
    <section id="companies" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Our Partner Companies</h2>
          <p className="text-lg text-navy-600">
            We've partnered with industry-leading investment firms to provide you with a diverse range of options.
            Each partner is carefully vetted for performance, reliability, and client satisfaction.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {companies.map((company, index) => (
            <Card key={index} className={`card-hover ${company.highlighted ? 'border-2 border-gold-500 shadow-md' : ''}`}>
              <CardHeader className="relative">
                {company.highlighted && (
                  <Badge className="absolute -top-3 right-0 bg-gold-500 text-navy-900">Top Pick</Badge>
                )}
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-full bg-navy-700 flex items-center justify-center text-white text-xl font-bold">
                    {company.logo}
                  </div>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 fill-gold-500 text-gold-500 mr-1" />
                    <span className="font-medium">{company.rating}</span>
                    <span className="text-sm text-gray-500 ml-1">({company.reviewCount})</span>
                  </div>
                </div>
                <CardTitle className="text-xl font-bold text-navy-800">{company.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-navy-600 mb-4">{company.description}</CardDescription>
                <div className="flex flex-wrap gap-2 mb-4">
                  {company.specialties.map((specialty, i) => (
                    <Badge key={i} variant="outline" className="bg-navy-50">{specialty}</Badge>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="text-gray-500">Min Investment</p>
                    <p className="font-medium text-navy-800">{company.minInvestment}</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="text-gray-500">Return Rate</p>
                    <p className="font-medium text-forest-700">{company.returnRate}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-navy-700 hover:bg-navy-800 text-white">View Details</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompaniesSection;
