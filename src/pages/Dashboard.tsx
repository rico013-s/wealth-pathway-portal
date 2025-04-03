
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookOpen, Landmark, Coins, BarChart4, DollarSign, PieChart } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type FinancialAsset = {
  id: string;
  name: string;
  icon: React.ReactNode;
  tasks: {
    id: string;
    title: string;
    description: string;
    completed: boolean;
  }[];
};

const Dashboard = () => {
  const [selectedAsset, setSelectedAsset] = useState<string>('');

  const financialAssets: FinancialAsset[] = [
    {
      id: 'forex',
      name: 'Piața Valutară (Forex)',
      icon: <DollarSign className="h-10 w-10 text-gold-500" />,
      tasks: [
        {
          id: 'forex-1',
          title: 'Dobânda de Referință',
          description: 'Învață ce este dobânda de referință și cum afectează cursurile valutare. Dobânda de referință este rata dobânzii stabilită de banca centrală a unei țări și are un impact semnificativ asupra valorii monedei naționale.',
          completed: false,
        },
        {
          id: 'forex-2',
          title: 'Perechi Valutare Majore',
          description: 'Identifică perechile valutare majore și caracteristicile lor. Cele mai tranzacționate perechi includ EUR/USD, USD/JPY, GBP/USD și USD/CHF.',
          completed: false,
        },
        {
          id: 'forex-3',
          title: 'Analiza Tehnică de Bază',
          description: 'Învață să folosești indicatori tehnici de bază precum mediile mobile, RSI și MACD pentru a identifica tendințele pieței valutare.',
          completed: false,
        },
      ],
    },
    {
      id: 'gold',
      name: 'Aur',
      icon: <Coins className="h-10 w-10 text-gold-500" />,
      tasks: [
        {
          id: 'gold-1',
          title: 'Unitatea de Măsură',
          description: 'O uncie de aur (troy ounce) echivalează cu aproximativ 31.1 grame. Aceasta este unitatea standard pentru măsurarea aurului pe piețele internaționale.',
          completed: false,
        },
        {
          id: 'gold-2',
          title: 'Factorii de Influență',
          description: 'Identifică factorii principali care influențează prețul aurului: inflația, politicile băncilor centrale, cererea pentru bijuterii și incertitudinile geopolitice.',
          completed: false,
        },
        {
          id: 'gold-3',
          title: 'Corelații cu Alte Active',
          description: 'Înțelege relația dintre prețul aurului și dolarul american. De obicei, există o corelație negativă între aceste două active.',
          completed: false,
        },
      ],
    },
    {
      id: 'stocks',
      name: 'Acțiuni',
      icon: <BarChart4 className="h-10 w-10 text-gold-500" />,
      tasks: [
        {
          id: 'stocks-1',
          title: 'Raportul P/E',
          description: 'Învață să calculezi și să interpretezi raportul preț/câștig (P/E) al unei companii. Acest indicator fundamental ajută la evaluarea valorii acțiunilor.',
          completed: false,
        },
        {
          id: 'stocks-2',
          title: 'Dividende',
          description: 'Înțelege conceptul de dividend yield și cum să evaluezi companiile care plătesc dividende în mod constant.',
          completed: false,
        },
        {
          id: 'stocks-3',
          title: 'Analiza Sectorială',
          description: 'Învață să analizezi performanța diferitelor sectoare economice și cum acestea sunt influențate de ciclurile economice.',
          completed: false,
        },
      ],
    },
    {
      id: 'funds',
      name: 'Fonduri de Investiții',
      icon: <PieChart className="h-10 w-10 text-gold-500" />,
      tasks: [
        {
          id: 'funds-1',
          title: 'Tipuri de Fonduri',
          description: 'Învață diferențele dintre fondurile mutuale, ETF-uri, fonduri de pensii și fonduri hedge. Fiecare tip are caracteristici, riscuri și potențiale beneficii distincte.',
          completed: false,
        },
        {
          id: 'funds-2',
          title: 'Evaluarea Performanței',
          description: 'Învață să evaluezi performanța unui fond de investiții folosind indicatori precum CAGR (rata anuală compusă de creștere) și raportul Sharpe.',
          completed: false,
        },
        {
          id: 'funds-3',
          title: 'Diversificarea Portofoliului',
          description: 'Înțelege importanța diversificării și cum să construiești un portofoliu de fonduri de investiții echilibrat în funcție de obiectivele tale financiare.',
          completed: false,
        },
      ],
    },
    {
      id: 'crypto',
      name: 'Criptomonede',
      icon: <Landmark className="h-10 w-10 text-gold-500" />,
      tasks: [
        {
          id: 'crypto-1',
          title: 'Tehnologia Blockchain',
          description: 'Învață bazele tehnologiei blockchain și cum aceasta stă la baza majorității criptomonedelor. Înțelege concepte precum descentralizare, consens și criptografie.',
          completed: false,
        },
        {
          id: 'crypto-2',
          title: 'Market Cap și Tokenomics',
          description: 'Înțelege cum să analizezi capitalizarea de piață a unei criptomonede și importanța tokenomics-ului (distribuția, inflația și utilitatea token-urilor).',
          completed: false,
        },
        {
          id: 'crypto-3',
          title: 'Riscuri și Reglementări',
          description: 'Fii la curent cu riscurile specifice investițiilor în criptomonede și evoluția cadrului de reglementare în diferite jurisdicții.',
          completed: false,
        },
      ],
    },
  ];

  const selectedAssetData = financialAssets.find(asset => asset.id === selectedAsset);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />

      <div className="flex-grow pt-20 pb-10 px-4 container mx-auto">
        <div className="relative">
          <div className="absolute -left-20 -top-20 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl"></div>

          <div className="bg-gray-900 border border-gray-800 p-8 rounded-xl shadow-xl relative z-10 mb-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Bine ai venit la Markets<span className="text-gold-500">4all</span>!</h1>
              <p className="text-gray-400">Platformă educațională pentru dezvoltarea abilităților tale de investiții</p>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Selectează activul financiar pe care îl deții sau te interesează:</h2>
                <Select value={selectedAsset} onValueChange={setSelectedAsset}>
                  <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Alege un activ financiar" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    {financialAssets.map((asset) => (
                      <SelectItem key={asset.id} value={asset.id} className="hover:bg-gray-700">
                        {asset.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {selectedAssetData && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4 mb-6">
                {selectedAssetData.icon}
                <h2 className="text-2xl font-bold">{selectedAssetData.name}</h2>
              </div>

              <h3 className="text-xl font-semibold mb-4">Sarcini educaționale:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedAssetData.tasks.map((task) => (
                  <Card key={task.id} className="bg-gray-800 border-gray-700 shadow-lg hover:border-gold-500 transition-all">
                    <CardHeader>
                      <CardTitle className="text-white">{task.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-300">
                        {task.description}
                      </CardDescription>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-gold-500 hover:bg-gold-600 text-black">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Marchează ca finalizat
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Button className="bg-gold-500 hover:bg-gold-600 text-black font-semibold">
                  Solicită materiale personalizate <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
