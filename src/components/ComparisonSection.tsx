
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle, XCircle } from 'lucide-react';

const ComparisonSection = () => {
  return (
    <section id="comparison" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Comparație Servicii de Investiții</h2>
          <p className="text-lg text-navy-600">
            Compară companiile noastre partenere pentru a găsi serviciul de investiții care se potrivește cel mai bine obiectivelor și circumstanțelor tale financiare.
          </p>
        </div>
        
        <div className="overflow-x-auto rounded-lg shadow">
          <Table>
            <TableHeader className="bg-navy-800 text-white">
              <TableRow>
                <TableHead className="w-[280px]">Caracteristici</TableHead>
                <TableHead className="text-center">GlobalWealth Partners</TableHead>
                <TableHead className="text-center">Frontier Investments</TableHead>
                <TableHead className="text-center">Heritage Financial</TableHead>
                <TableHead className="text-center">Apex Capital</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="bg-white">
                <TableCell className="font-medium text-black">Investiție Minimă</TableCell>
                <TableCell className="text-center text-black">500€</TableCell>
                <TableCell className="text-center text-black">1.000€</TableCell>
                <TableCell className="text-center text-black">100€</TableCell>
                <TableCell className="text-center text-black">10.000€</TableCell>
              </TableRow>
              <TableRow className="bg-gray-50">
                <TableCell className="font-medium text-black">Randament Anual Mediu</TableCell>
                <TableCell className="text-center text-forest-700 font-medium">12-15%</TableCell>
                <TableCell className="text-center text-forest-700 font-medium">15-20%</TableCell>
                <TableCell className="text-center text-forest-700 font-medium">8-10%</TableCell>
                <TableCell className="text-center text-forest-700 font-medium">18-22%</TableCell>
              </TableRow>
              <TableRow className="bg-white">
                <TableCell className="font-medium text-black">Prietenos cu Începătorii</TableCell>
                <TableCell className="text-center"><CheckCircle className="mx-auto h-5 w-5 text-forest-600" /></TableCell>
                <TableCell className="text-center"><XCircle className="mx-auto h-5 w-5 text-red-500" /></TableCell>
                <TableCell className="text-center"><CheckCircle className="mx-auto h-5 w-5 text-forest-600" /></TableCell>
                <TableCell className="text-center"><XCircle className="mx-auto h-5 w-5 text-red-500" /></TableCell>
              </TableRow>
              <TableRow className="bg-gray-50">
                <TableCell className="font-medium text-black">Aplicație Mobilă</TableCell>
                <TableCell className="text-center"><CheckCircle className="mx-auto h-5 w-5 text-forest-600" /></TableCell>
                <TableCell className="text-center"><CheckCircle className="mx-auto h-5 w-5 text-forest-600" /></TableCell>
                <TableCell className="text-center"><CheckCircle className="mx-auto h-5 w-5 text-forest-600" /></TableCell>
                <TableCell className="text-center"><CheckCircle className="mx-auto h-5 w-5 text-forest-600" /></TableCell>
              </TableRow>
              <TableRow className="bg-white">
                <TableCell className="font-medium text-black">Acțiuni Fracționale</TableCell>
                <TableCell className="text-center"><CheckCircle className="mx-auto h-5 w-5 text-forest-600" /></TableCell>
                <TableCell className="text-center"><CheckCircle className="mx-auto h-5 w-5 text-forest-600" /></TableCell>
                <TableCell className="text-center"><CheckCircle className="mx-auto h-5 w-5 text-forest-600" /></TableCell>
                <TableCell className="text-center"><XCircle className="mx-auto h-5 w-5 text-red-500" /></TableCell>
              </TableRow>
              <TableRow className="bg-gray-50">
                <TableCell className="font-medium text-black">Conturi cu Avantaje Fiscale</TableCell>
                <TableCell className="text-center"><CheckCircle className="mx-auto h-5 w-5 text-forest-600" /></TableCell>
                <TableCell className="text-center"><CheckCircle className="mx-auto h-5 w-5 text-forest-600" /></TableCell>
                <TableCell className="text-center"><CheckCircle className="mx-auto h-5 w-5 text-forest-600" /></TableCell>
                <TableCell className="text-center"><CheckCircle className="mx-auto h-5 w-5 text-forest-600" /></TableCell>
              </TableRow>
              <TableRow className="bg-white">
                <TableCell className="font-medium text-black">Servicii de Consultanță</TableCell>
                <TableCell className="text-center"><CheckCircle className="mx-auto h-5 w-5 text-forest-600" /></TableCell>
                <TableCell className="text-center"><CheckCircle className="mx-auto h-5 w-5 text-forest-600" /></TableCell>
                <TableCell className="text-center"><CheckCircle className="mx-auto h-5 w-5 text-forest-600" /></TableCell>
                <TableCell className="text-center"><CheckCircle className="mx-auto h-5 w-5 text-forest-600" /></TableCell>
              </TableRow>
              <TableRow className="bg-gray-50">
                <TableCell className="font-medium text-black">Piețe Internaționale</TableCell>
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
