
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookOpen, Landmark, Coins, BarChart4, LineChart, PieChart, TrendingUp, Bell, Flag } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from 'sonner';

// Import dashboard components
import UserTierBadge, { UserTier } from '@/components/dashboard/UserTierBadge';
import MarketChart from '@/components/dashboard/MarketChart';
import PortfolioTracker from '@/components/dashboard/PortfolioTracker';
import TaskList from '@/components/dashboard/TaskList';
import WatchlistSection, { WatchlistItem } from '@/components/dashboard/WatchlistSection';

type FinancialAsset = {
  id: string;
  name: string;
  icon: React.ReactNode;
  tasks: {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    tierRequired: UserTier;
  }[];
};

const Dashboard = () => {
  const [selectedAsset, setSelectedAsset] = useState<string>('');
  const [userTier, setUserTier] = useState<UserTier>('bronze');
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [selectedWatchlistItem, setSelectedWatchlistItem] = useState<WatchlistItem | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  // Display a welcome notification on first load
  useEffect(() => {
    if (isFirstLoad) {
      toast("Bine ai venit la Markets4all Dashboard!", {
        description: "Aici poți urmări activele tale financiare și învăța despre investiții.",
        icon: <Bell className="h-4 w-4 text-gold-500" />,
        duration: 5000,
      });
      setIsFirstLoad(false);
    }
  }, [isFirstLoad]);

  // Generate chart data based on selected watchlist item
  useEffect(() => {
    if (selectedWatchlistItem) {
      // Generate random data based on the asset name to simulate different patterns
      let baseValue = 100;
      let volatility = 0.02;
      
      // Adjust base value and volatility based on asset name
      if (selectedWatchlistItem.name === 'EUR/USD') {
        baseValue = 1.08;
        volatility = 0.005;
      } else if (selectedWatchlistItem.name === 'Aur (XAU)') {
        baseValue = 2300;
        volatility = 0.015;
      } else if (selectedWatchlistItem.name.includes('Apple')) {
        baseValue = 185;
        volatility = 0.02;
      }
      
      // Generate data points
      const data = Array.from({ length: 30 }, (_, i) => {
        // Create a slightly trending pattern
        const trend = (i / 30) * 0.05; // 5% trend over 30 days
        const randomFactor = (Math.random() - 0.5) * volatility;
        const value = baseValue * (1 + trend + randomFactor);
        
        return {
          name: `Ziua ${i + 1}`,
          value: parseFloat(value.toFixed(4))
        };
      });
      
      setChartData(data);
    }
  }, [selectedWatchlistItem]);

  const financialAssets: FinancialAsset[] = [
    {
      id: 'forex',
      name: 'Piața Valutară (Forex)',
      icon: <LineChart className="h-10 w-10 text-gold-500" />,
      tasks: [
        {
          id: 'forex-1',
          title: 'Dobânda de Referință',
          description: 'Învață ce este dobânda de referință și cum afectează cursurile valutare. Dobânda de referință este rata dobânzii stabilită de banca centrală a unei țări și are un impact semnificativ asupra valorii monedei naționale.',
          completed: false,
          tierRequired: 'bronze'
        },
        {
          id: 'forex-2',
          title: 'Perechi Valutare Majore',
          description: 'Identifică perechile valutare majore și caracteristicile lor. Cele mai tranzacționate perechi includ EUR/USD, USD/JPY, GBP/USD și USD/CHF.',
          completed: false,
          tierRequired: 'bronze'
        },
        {
          id: 'forex-3',
          title: 'Analiza Tehnică de Bază',
          description: 'Învață să folosești indicatori tehnici de bază precum mediile mobile, RSI și MACD pentru a identifica tendințele pieței valutare.',
          completed: false,
          tierRequired: 'silver'
        },
        {
          id: 'forex-4',
          title: 'Strategii de Tranzacționare Avansate',
          description: 'Descoperă strategii de tranzacționare avansate pentru forex incluzând scalping, swing trading și position trading.',
          completed: false,
          tierRequired: 'gold'
        },
      ],
    },
    {
      id: 'commodities',
      name: 'Mărfuri',
      icon: <Coins className="h-10 w-10 text-gold-500" />,
      tasks: [
        {
          id: 'commodities-1',
          title: 'Tipuri de Mărfuri',
          description: 'Învață despre diferitele tipuri de mărfuri: metale prețioase (aur, argint), energie (petrol, gaz natural), agricole (grâu, porumb, cafea) și cum se tranzacționează fiecare.',
          completed: false,
          tierRequired: 'bronze'
        },
        {
          id: 'commodities-2',
          title: 'Factorii de Influență',
          description: 'Identifică factorii principali care influențează prețurile mărfurilor: cerere și ofertă, condiții meteorologice, politici guvernamentale, valoarea dolarului și stocurile globale.',
          completed: false,
          tierRequired: 'bronze'
        },
        {
          id: 'commodities-3',
          title: 'Modalități de Investiție',
          description: 'Explorează diferitele modalități de a investi în mărfuri: contracte futures, ETF-uri specializate pe mărfuri, acțiuni ale companiilor producătoare și fonduri mutuale.',
          completed: false,
          tierRequired: 'silver'
        },
        {
          id: 'commodities-4',
          title: 'Strategii de Hedging',
          description: 'Învață cum să folosești mărfurile pentru a proteja portofoliul tău împotriva inflației și a volatilității pieței.',
          completed: false,
          tierRequired: 'gold'
        },
      ],
    },
    {
      id: 'stocks',
      name: 'Acțiuni',
      icon: <TrendingUp className="h-10 w-10 text-gold-500" />,
      tasks: [
        {
          id: 'stocks-1',
          title: 'Raportul P/E',
          description: 'Învață să calculezi și să interpretezi raportul preț/câștig (P/E) al unei companii. Acest indicator fundamental ajută la evaluarea valorii acțiunilor.',
          completed: false,
          tierRequired: 'bronze'
        },
        {
          id: 'stocks-2',
          title: 'Dividende',
          description: 'Înțelege conceptul de dividend yield și cum să evaluezi companiile care plătesc dividende în mod constant.',
          completed: false,
          tierRequired: 'bronze'
        },
        {
          id: 'stocks-3',
          title: 'Analiza Sectorială',
          description: 'Învață să analizezi performanța diferitelor sectoare economice și cum acestea sunt influențate de ciclurile economice.',
          completed: false,
          tierRequired: 'silver'
        },
        {
          id: 'stocks-4',
          title: 'Strategii de Construire a Portofoliului',
          description: 'Dezvoltă strategii avansate pentru construirea unui portofoliu diversificat de acțiuni în funcție de profilul tău de risc și obiectivele financiare.',
          completed: false,
          tierRequired: 'gold'
        },
      ],
    },
    {
      id: 'etf-indices',
      name: 'ETF-uri și Indici',
      icon: <BarChart4 className="h-10 w-10 text-gold-500" />,
      tasks: [
        {
          id: 'etf-1',
          title: 'Structura unui ETF',
          description: 'Înțelege cum sunt structurate fondurile tranzacționate la bursă (ETF) și avantajele lor comparativ cu fondurile mutuale tradiționale: lichiditate, costuri reduse și diversificare.',
          completed: false,
          tierRequired: 'bronze'
        },
        {
          id: 'etf-2',
          title: 'Indici Globali',
          description: 'Cunoaște principalii indici bursieri globali (S&P 500, NASDAQ, FTSE 100, DAX, Nikkei) și ce reprezintă aceștia. Înțelege cum poți investi în acești indici prin ETF-uri.',
          completed: false,
          tierRequired: 'bronze'
        },
        {
          id: 'etf-3',
          title: 'ETF-uri Tematice',
          description: 'Explorează ETF-urile tematice care se concentrează pe sectoare specifice precum tehnologie, energie verde sau inteligență artificială și cum pot fi folosite pentru a investi în tendințe emergente.',
          completed: false,
          tierRequired: 'silver'
        },
        {
          id: 'etf-4',
          title: 'ETF-uri cu Efect de Levier',
          description: 'Învață despre ETF-urile cu efect de levier și ETF-urile inverse, cum funcționează și riscurile asociate cu acestea.',
          completed: false,
          tierRequired: 'gold'
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
          tierRequired: 'bronze'
        },
        {
          id: 'funds-2',
          title: 'Evaluarea Performanței',
          description: 'Învață să evaluezi performanța unui fond de investiții folosind indicatori precum CAGR (rata anuală compusă de creștere) și raportul Sharpe.',
          completed: false,
          tierRequired: 'bronze'
        },
        {
          id: 'funds-3',
          title: 'Diversificarea Portofoliului',
          description: 'Înțelege importanța diversificării și cum să construiești un portofoliu de fonduri de investiții echilibrat în funcție de obiectivele tale financiare.',
          completed: false,
          tierRequired: 'silver'
        },
        {
          id: 'funds-4',
          title: 'Analiza Alocării de Active',
          description: 'Învață tehnici avansate pentru alocarea activelor între diferite clase de active și fonduri de investiții pentru a maximiza rentabilitatea ajustată la risc.',
          completed: false,
          tierRequired: 'gold'
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
          tierRequired: 'bronze'
        },
        {
          id: 'crypto-2',
          title: 'Market Cap și Tokenomics',
          description: 'Înțelege cum să analizezi capitalizarea de piață a unei criptomonede și importanța tokenomics-ului (distribuția, inflația și utilitatea token-urilor).',
          completed: false,
          tierRequired: 'bronze'
        },
        {
          id: 'crypto-3',
          title: 'Riscuri și Reglementări',
          description: 'Fii la curent cu riscurile specifice investițiilor în criptomonede și evoluția cadrului de reglementare în diferite jurisdicții.',
          completed: false,
          tierRequired: 'silver'
        },
        {
          id: 'crypto-4',
          title: 'DeFi și NFT-uri',
          description: 'Explorează ecosistemul DeFi (Finanțe Descentralizate) și piața NFT-urilor (Token-uri Nefungibile), cum funcționează și oportunitățile pe care le oferă.',
          completed: false,
          tierRequired: 'gold'
        },
      ],
    },
  ];

  const selectedAssetData = financialAssets.find(asset => asset.id === selectedAsset);

  const handleChangeTier = (newTier: UserTier) => {
    setUserTier(newTier);
    toast.success(`Contul tău a fost actualizat la nivelul ${newTier.charAt(0).toUpperCase() + newTier.slice(1)}`);
  };

  const handleTaskComplete = (taskId: string) => {
    // In a real app, this would update the database
    console.log(`Task ${taskId} completed`);
  };

  const handleWatchlistItemSelect = (item: WatchlistItem) => {
    setSelectedWatchlistItem(item);
    toast.info(`Grafic actualizat pentru ${item.name}`);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />

      <div className="flex-grow pt-20 pb-10 px-4 container mx-auto">
        <div className="relative">
          <div className="absolute -left-20 -top-20 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl"></div>

          <div className="bg-gray-900 border border-gray-800 p-8 rounded-xl shadow-xl relative z-10 mb-10">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">Bine ai venit la Markets<span className="text-gold-500">4all</span>!</h1>
                <UserTierBadge tier={userTier} />
              </div>
              <p className="text-gray-400">Platformă educațională pentru dezvoltarea abilităților tale de investiții</p>
              
              {/* Language selection */}
              <div className="absolute top-8 right-8 flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1 border-gray-700">
                  <Flag className="h-4 w-4" />
                  <span>Română</span>
                </Button>
              </div>
              
              {/* For demo purposes only - tier switcher */}
              <div className="mt-4 flex gap-2 justify-center">
                <Button 
                  variant={userTier === 'bronze' ? 'default' : 'outline'} 
                  onClick={() => handleChangeTier('bronze')}
                  className={userTier === 'bronze' ? 'bg-amber-700' : ''}
                >
                  Bronze
                </Button>
                <Button 
                  variant={userTier === 'silver' ? 'default' : 'outline'} 
                  onClick={() => handleChangeTier('silver')}
                  className={userTier === 'silver' ? 'bg-gray-400' : ''}
                >
                  Silver
                </Button>
                <Button 
                  variant={userTier === 'gold' ? 'default' : 'outline'} 
                  onClick={() => handleChangeTier('gold')}
                  className={userTier === 'gold' ? 'bg-gold-500' : ''}
                >
                  Gold
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Selectează nivelul pentru demo</p>
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
            <div className="space-y-8">
              <div className="flex items-center space-x-4 mb-6">
                {selectedAssetData.icon}
                <h2 className="text-2xl font-bold">{selectedAssetData.name}</h2>
              </div>

              <Tabs defaultValue="tasks" className="w-full">
                <TabsList className="bg-gray-800 border-gray-700 mb-6">
                  <TabsTrigger value="tasks" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
                    Educație
                  </TabsTrigger>
                  <TabsTrigger value="tracking" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
                    Urmărire
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="tasks" className="space-y-6">
                  <h3 className="text-xl font-semibold mb-4">Sarcini educaționale:</h3>
                  <TaskList 
                    tasks={selectedAssetData.tasks} 
                    userTier={userTier}
                    onTaskComplete={handleTaskComplete}
                  />
                </TabsContent>
                
                <TabsContent value="tracking" className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Chart - now uses data from selected watchlist item */}
                    <MarketChart 
                      assetName={selectedWatchlistItem ? selectedWatchlistItem.name : selectedAssetData.name} 
                      assetType={selectedWatchlistItem ? "Cotație live" : "Prețuri ultimele 30 zile"}
                      data={chartData.length > 0 ? chartData : undefined}
                    />
                    
                    {/* Watchlist - now with selection capability */}
                    <WatchlistSection 
                      userTier={userTier}
                      onSelectAsset={handleWatchlistItemSelect}
                      selectedAssetId={selectedWatchlistItem?.id}
                    />
                  </div>
                  
                  <div className="mt-6">
                    <PortfolioTracker userTier={userTier} />
                  </div>
                </TabsContent>
              </Tabs>

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
