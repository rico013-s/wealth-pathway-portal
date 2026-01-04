import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Calculator, TrendingUp, BarChart3, PiggyBank, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Resurse = () => {
  const navigate = useNavigate();
  
  // Calculator state
  const [investmentAmount, setInvestmentAmount] = useState('10.000');
  const [monthlyContribution, setMonthlyContribution] = useState('500');
  const [period, setPeriod] = useState('10');
  const [interestRate, setInterestRate] = useState('8');
  const [isCompoundInterest, setIsCompoundInterest] = useState(true);
  const [result, setResult] = useState('');

  const calculateInvestment = () => {
    const initial = parseFloat(investmentAmount.replace(/\./g, '').replace(',', '.'));
    const monthly = parseFloat(monthlyContribution.replace(/\./g, '').replace(',', '.'));
    const years = parseInt(period);
    const rate = parseFloat(interestRate.replace(',', '.')) / 100;
    
    if (isNaN(initial) || isNaN(monthly) || isNaN(years) || isNaN(rate)) {
      return;
    }
    
    let totalAmount;
    
    if (isCompoundInterest) {
      totalAmount = initial;
      for (let i = 0; i < years * 12; i++) {
        totalAmount = totalAmount * (1 + rate / 12) + monthly;
      }
    } else {
      const totalMonths = years * 12;
      const interestOnInitial = initial * rate * years;
      const totalContributions = monthly * totalMonths;
      const interestOnContributions = (monthly * totalMonths * rate * years) / 2;
      totalAmount = initial + interestOnInitial + totalContributions + interestOnContributions;
    }
    
    setResult(Math.round(totalAmount).toLocaleString('ro-RO') + ' lei');
  };

  const tools = [
    {
      title: 'Comparator Brokeri',
      description: 'Compară caracteristicile și costurile brokerilor disponibili.',
      icon: BarChart3,
      status: 'În curând',
    },
    {
      title: 'Calculator Profit/Pierdere',
      description: 'Calculează potențialul profit sau pierdere pentru o tranzacție.',
      icon: TrendingUp,
      status: 'În curând',
    },
    {
      title: 'Planificator Buget',
      description: 'Planifică-ți bugetul lunar și alocarea pentru investiții.',
      icon: PiggyBank,
      status: 'În curând',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-24 pb-20">
        {/* Header */}
        <section className="container mx-auto px-4 mb-16">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <Calculator className="w-4 h-4 mr-2" />
              Resurse
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Instrumente <span className="text-primary">Utile</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Calculatoare și instrumente pentru a-ți planifica investițiile mai bine.
            </p>
          </div>
        </section>

        {/* Investment Calculator */}
        <section className="container mx-auto px-4 mb-20">
          <Card className="max-w-2xl mx-auto border-2">
            <CardHeader className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Calculator className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Calculator de Investiții</CardTitle>
              <CardDescription>
                Vezi cum pot crește banii tăi în timp cu dobândă compusă
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="initial" className="text-sm font-medium mb-2 block">
                    Investiție inițială (lei)
                  </Label>
                  <input 
                    id="initial"
                    type="text" 
                    value={investmentAmount} 
                    onChange={(e) => setInvestmentAmount(e.target.value)} 
                    className="w-full border rounded-md px-4 py-3 bg-background"
                  />
                </div>
                <div>
                  <Label htmlFor="monthly" className="text-sm font-medium mb-2 block">
                    Contribuție lunară (lei)
                  </Label>
                  <input 
                    id="monthly"
                    type="text" 
                    value={monthlyContribution} 
                    onChange={(e) => setMonthlyContribution(e.target.value)}
                    className="w-full border rounded-md px-4 py-3 bg-background"
                  />
                </div>
                <div>
                  <Label htmlFor="period" className="text-sm font-medium mb-2 block">
                    Perioadă de timp (ani)
                  </Label>
                  <input 
                    id="period"
                    type="text" 
                    value={period} 
                    onChange={(e) => setPeriod(e.target.value)}
                    className="w-full border rounded-md px-4 py-3 bg-background"
                  />
                </div>
                <div>
                  <Label htmlFor="rate" className="text-sm font-medium mb-2 block">
                    Rată dobândă anuală (%)
                  </Label>
                  <input 
                    id="rate"
                    type="text" 
                    value={interestRate} 
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="w-full border rounded-md px-4 py-3 bg-background"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="compound" 
                  checked={isCompoundInterest}
                  onCheckedChange={(checked) => setIsCompoundInterest(checked === true)}
                />
                <Label htmlFor="compound" className="text-sm cursor-pointer">
                  Dobândă compusă (reinvestirea câștigurilor)
                </Label>
              </div>
              
              <Button 
                className="w-full" 
                size="lg"
                onClick={calculateInvestment}
              >
                Calculează
              </Button>
              
              {result && (
                <div className="text-center p-6 bg-primary/5 rounded-xl border border-primary/20">
                  <p className="text-sm text-muted-foreground mb-2">Valoare estimată după {period} ani:</p>
                  <p className="text-4xl font-bold text-primary">{result}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Other Tools */}
        <section className="container mx-auto px-4 mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-2">Alte Instrumente</h2>
            <p className="text-muted-foreground">Mai multe unelte utile - în curând</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {tools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <Card key={index} className="relative overflow-hidden opacity-75">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <CardTitle className="text-lg">{tool.title}</CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardHeader>
                  <Badge className="absolute top-4 right-4 bg-muted text-muted-foreground">
                    {tool.status}
                  </Badge>
                </Card>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4">
          <Card className="bg-primary/5 border-primary/20 max-w-3xl mx-auto">
            <CardContent className="py-10 text-center">
              <h2 className="text-2xl font-bold mb-4">
                Ai nevoie de ajutor cu planificarea?
              </h2>
              <p className="text-muted-foreground mb-6">
                Consultanții noștri te pot ajuta să creezi un plan personalizat de investiții.
              </p>
              <Button size="lg" onClick={() => navigate('/consultanta')} className="gap-2">
                Solicită Consultanță <ArrowRight className="w-5 h-5" />
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Resurse;
