import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ArrowRight, Info } from 'lucide-react';
import ThreeBackground from './ThreeBackground';
import { PaymentForm } from './PaymentForm';

const HeroSection = () => {
  const [investmentAmount, setInvestmentAmount] = useState('10.000');
  const [monthlyContribution, setMonthlyContribution] = useState('500');
  const [period, setPeriod] = useState('10');
  const [interestRate, setInterestRate] = useState('8');
  const [isCompoundInterest, setIsCompoundInterest] = useState(true);
  const [result, setResult] = useState('110.000+');
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);

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
      // Dobândă compusă
      totalAmount = initial;
      for (let i = 0; i < years * 12; i++) {
        totalAmount = totalAmount * (1 + rate / 12) + monthly;
      }
    } else {
      // Dobândă simplă
      const totalMonths = years * 12;
      const interestOnInitial = initial * rate * years;
      const totalContributions = monthly * totalMonths;
      const interestOnContributions = (monthly * totalMonths * rate * years) / 2;
      totalAmount = initial + interestOnInitial + totalContributions + interestOnContributions;
    }
    
    setResult(Math.round(totalAmount).toLocaleString('ro-RO') + ' lei');
  };

  return (
    <section className="bg-black text-white pt-28 pb-20 relative overflow-hidden">
      <ThreeBackground />
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Investiții pentru <span className="text-gold-500">fiecare</span>, indiferent de buget
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-xl">
              Markets4all promovează educația financiară și o nouă viziune asupra banilor. Te ajutăm să începi să investești corect, fie că ai 50 de lei sau 50.000.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gold-500 hover:bg-gold-600 text-black font-semibold"
                onClick={() => setPaymentDialogOpen(true)}
              >
                Începe să investești <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <a href="#services">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Descoperă serviciile <Info className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center animate-slide-up relative">
            <div className="relative">
              <div className="absolute -left-6 -top-6 w-64 h-64 bg-gold-500/20 rounded-full blur-3xl"></div>
              <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-gold-500/20 rounded-full blur-3xl"></div>
              <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl p-8 relative z-10">
                <div className="text-center text-white mb-6">
                  <h3 className="text-2xl font-bold mb-2">Calculator de investiții</h3>
                  <p className="text-gray-300">Vezi cum pot crește banii tăi</p>
                </div>
                <div className="space-y-4 text-white">
                  <div>
                    <label className="block text-sm font-medium mb-1">Investiție inițială (lei)</label>
                    <input 
                      type="text" 
                      value={investmentAmount} 
                      onChange={(e) => setInvestmentAmount(e.target.value)} 
                      className="w-full border border-gray-700 rounded-md px-4 py-2 bg-gray-800"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Contribuție lunară (lei)</label>
                    <input 
                      type="text" 
                      value={monthlyContribution} 
                      onChange={(e) => setMonthlyContribution(e.target.value)}
                      className="w-full border border-gray-700 rounded-md px-4 py-2 bg-gray-800"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Perioadă de timp (ani)</label>
                    <input 
                      type="text" 
                      value={period} 
                      onChange={(e) => setPeriod(e.target.value)}
                      className="w-full border border-gray-700 rounded-md px-4 py-2 bg-gray-800"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Rată dobândă anuală (%)</label>
                    <input 
                      type="text" 
                      value={interestRate} 
                      onChange={(e) => setInterestRate(e.target.value)}
                      className="w-full border border-gray-700 rounded-md px-4 py-2 bg-gray-800"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="compound" 
                      checked={isCompoundInterest}
                      onCheckedChange={(checked) => setIsCompoundInterest(checked === true)}
                    />
                    <Label 
                      htmlFor="compound" 
                      className="text-sm font-medium cursor-pointer"
                    >
                      Dobândă compusă
                    </Label>
                  </div>
                  <Button 
                    className="w-full bg-gold-500 hover:bg-gold-600 text-black"
                    onClick={calculateInvestment}
                  >
                    Calculează
                  </Button>
                  <p className="text-sm text-gray-300 text-center mt-2">
                    Creștere potențială: <span className="font-bold text-gold-500">{result} lei</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <PaymentForm 
        open={paymentDialogOpen} 
        onOpenChange={setPaymentDialogOpen}
        planName="Investiție"
        amount={10000}
      />
    </section>
  );
};

export default HeroSection;
