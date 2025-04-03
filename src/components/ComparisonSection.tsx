
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle, XCircle } from 'lucide-react';

const ComparisonSection = () => {
  return (
    <section id="comparison" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Investment Services Comparison</h2>
          <p className="text-lg text-navy-600">
            Compare our partner companies to find the investment service that best matches your financial goals and circumstances.
          </p>
        </div>
        
        <div className="overflow-x-auto rounded-lg shadow">
          <Table>
            <TableHeader className="bg-navy-800 text-white">
              <TableRow>
                <TableHead className="w-[280px]">Features</TableHead>
                <TableHead className="text-center">GlobalWealth Partners</TableHead>
                <TableHead className="text-center">Frontier Investments</TableHead>
                <TableHead className="text-center">Heritage Financial</TableHead>
                <TableHead className="text-center">Apex Capital</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="bg-white">
                <TableCell className="font-medium">Minimum Investment</TableCell>
                <TableCell className="text-center">$500</TableCell>
                <TableCell className="text-center">$1,000</TableCell>
                <TableCell className="text-center">$100</TableCell>
                <TableCell className="text-center">$10,000</TableCell>
              </TableRow>
              <TableRow className="bg-gray-50">
                <TableCell className="font-medium">Average Annual Return</TableCell>
                <TableCell className="text-center text-forest-700 font-medium">12-15%</TableCell>
                <TableCell className="text-center text-forest-700 font-medium">15-20%</TableCell>
                <TableCell className="text-center text-forest-700 font-medium">8-10%</TableCell>
                <TableCell className="text-center text-forest-700 font-medium">18-22%</TableCell>
              </TableRow>
              <TableRow className="bg-white">
                <TableCell className="font-medium">Beginner Friendly</TableCell>
                <TableCell className="text-center"><CheckCircle className="mx-auto h-5 w-5 text-forest-600" /></TableCell>
                <TableCell className="text-center"><XCircle className="mx-auto h-5 w-5 text-red-500" /></TableCell>
                <TableCell className="text-center"><CheckCircle className="mx-auto h-5 w-5 text-forest-600" /></TableCell>
                <TableCell className="text-center"><XCircle className="mx-auto h-5 w-5 text-red-500" /></TableCell>
              </TableRow>
              <TableRow className="bg-gray-50">
                <TableCell className="font-medium">Mobile App</TableCell>
                <TableCell className="text-center"><CheckCircle className="mx-auto h-5 w-5 text-forest-600" /></TableCell>
                <TableCell className="text-center"><CheckCircle className="mx-auto h-5 w-5 text-forest-600" /></TableCell>
                <TableCell className="text-center"><CheckCircle className="mx-auto h-5 w-5 text-forest-600" /></TableCell>
                <TableCell className="text-center"><CheckCircle className="mx-auto h-5 w-5 text-forest-600" /></TableCell>
              </TableRow>
              <TableRow className="bg-white">
                <TableCell className="font-medium">Fractional Shares</TableCell>
                <TableCell className="text-center"><CheckCircle className="mx-auto h-5 w-5 text-forest-600" /></TableCell>
                <TableCell className="text-center"><CheckCircle className="mx-auto h-5 w-5 text-forest-600" /></TableCell>
                <TableCell className="text-center"><CheckCircle className="mx-auto h-5 w-5 text-forest-600" /></TableCell>
                <TableCell className="text-center"><XCircle className="mx-auto h-5 w-5 text-red-500" /></TableCell>
              </TableRow>
              <TableRow className="bg-gray-50">
                <TableCell className="font-medium">Tax-Advantaged Accounts</TableCell>
                <TableCell className="text-center"><CheckCircle className="mx-auto h-5 w-5 text-forest-600" /></TableCell>
                <TableCell className="text-center"><CheckCircle className="mx-auto h-5 w-5 text-forest-600" /></TableCell>
                <TableCell className="text-center"><CheckCircle className="mx-auto h-5 w-5 text-forest-600" /></TableCell>
                <TableCell className="text-center"><CheckCircle className="mx-auto h-5 w-5 text-forest-600" /></TableCell>
              </TableRow>
              <TableRow className="bg-white">
                <TableCell className="font-medium">Advisory Services</TableCell>
                <TableCell className="text-center"><CheckCircle className="mx-auto h-5 w-5 text-forest-600" /></TableCell>
                <TableCell className="text-center"><CheckCircle className="mx-auto h-5 w-5 text-forest-600" /></TableCell>
                <TableCell className="text-center"><CheckCircle className="mx-auto h-5 w-5 text-forest-600" /></TableCell>
                <TableCell className="text-center"><CheckCircle className="mx-auto h-5 w-5 text-forest-600" /></TableCell>
              </TableRow>
              <TableRow className="bg-gray-50">
                <TableCell className="font-medium">International Markets</TableCell>
                <TableCell className="text-center"><CheckCircle className="mx-auto h-5 w-5 text-forest-600" /></TableCell>
                <TableCell className="text-center"><CheckCircle className="mx-auto h-5 w-5 text-forest-600" /></TableCell>
                <TableCell className="text-center"><XCircle className="mx-auto h-5 w-5 text-red-500" /></TableCell>
                <TableCell className="text-center"><CheckCircle className="mx-auto h-5 w-5 text-forest-600" /></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
