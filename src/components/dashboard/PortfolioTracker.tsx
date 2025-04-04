
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import { Plus, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';
import { UserTier } from './UserTierBadge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from 'sonner';

interface Asset {
  id: string;
  name: string;
  value: number;
  color: string;
}

interface PortfolioData {
  name: string;
  value: number;
}

interface PortfolioTrackerProps {
  userTier: UserTier;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a855f7', '#ec4899'];

// Generate random portfolio history data
const generateHistoryData = (days: number, assets: Asset[]) => {
  const totalValue = assets.reduce((acc, asset) => acc + asset.value, 0);
  const baseValue = totalValue * 0.9; // Start at 90% of current value
  
  return Array.from({ length: days }, (_, i) => {
    // Create a trend that generally goes up but with fluctuations
    const fluctuation = Math.random() * 0.05 - 0.025; // -2.5% to +2.5%
    const trend = (i / days) * 0.2; // Gradually increase by up to 20%
    const dayValue = baseValue * (1 + trend + fluctuation);
    
    return {
      name: `Ziua ${i + 1}`,
      value: Math.round(dayValue)
    };
  });
};

const PortfolioTracker: React.FC<PortfolioTrackerProps> = ({ userTier }) => {
  const [assets, setAssets] = useState<Asset[]>([
    { id: '1', name: 'Acțiuni', value: 4000, color: COLORS[0] },
    { id: '2', name: 'ETF-uri', value: 3000, color: COLORS[1] },
    { id: '3', name: 'Forex', value: 2000, color: COLORS[2] },
    { id: '4', name: 'Aur', value: 1500, color: COLORS[3] },
  ]);
  
  const [historyData, setHistoryData] = useState<PortfolioData[]>([]);
  const [newAssetName, setNewAssetName] = useState('');
  const [newAssetValue, setNewAssetValue] = useState('');
  const [activeTab, setActiveTab] = useState('composition');

  useEffect(() => {
    // Generate history data whenever assets change
    setHistoryData(generateHistoryData(30, assets));
  }, [assets]);

  const addAsset = () => {
    if (newAssetName && newAssetValue) {
      const value = parseFloat(newAssetValue);
      if (!isNaN(value) && value > 0) {
        const newAsset: Asset = {
          id: Date.now().toString(),
          name: newAssetName,
          value: value,
          color: COLORS[assets.length % COLORS.length],
        };
        setAssets([...assets, newAsset]);
        setNewAssetName('');
        setNewAssetValue('');
        toast.success(`${newAssetName} adăugat în portofoliu`);
      } else {
        toast.error('Valoarea introdusă trebuie să fie un număr pozitiv');
      }
    } else {
      toast.error('Completează atât numele cât și valoarea activului');
    }
  };

  const removeAsset = (id: string) => {
    setAssets(assets.filter(asset => asset.id !== id));
    toast.success('Activ eliminat din portofoliu');
  };

  // Only premium tiers can add assets
  const canAddAssets = userTier === 'silver' || userTier === 'gold';

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Urmărirea portofoliului</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="composition" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-gray-800 border-gray-700 mb-6">
            <TabsTrigger value="composition" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
              Compoziție
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
              Evoluție
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="composition" className="space-y-4">
            <div className="mb-6 h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={assets}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {assets.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} €`, 'Valoare']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {assets.map(asset => (
                  <div key={asset.id} className="flex items-center justify-between bg-gray-800 p-3 rounded-md">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: asset.color }}></div>
                      <span className="text-white">{asset.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-white">{asset.value.toLocaleString('ro-RO')} €</span>
                      {canAddAssets && (
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6 text-gray-400 hover:text-red-500"
                          onClick={() => removeAsset(asset.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {canAddAssets && (
                <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 mt-4">
                  <Input 
                    placeholder="Nume activ" 
                    value={newAssetName} 
                    onChange={(e) => setNewAssetName(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                  <Input 
                    placeholder="Valoare (€)" 
                    type="number" 
                    value={newAssetValue} 
                    onChange={(e) => setNewAssetValue(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                  <Button 
                    onClick={addAsset} 
                    className="bg-gold-500 hover:bg-gold-600 text-black"
                  >
                    <Plus className="h-4 w-4 mr-1" /> Adaugă
                  </Button>
                </div>
              )}
              
              {!canAddAssets && (
                <div className="text-center p-4 border border-dashed border-gray-700 rounded-md mt-4">
                  <p className="text-gray-400">Upgradeaza la un abonament Silver sau Gold pentru a putea adăuga active personalizate.</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="space-y-4">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={historyData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="name" stroke="#999" />
                  <YAxis stroke="#999" />
                  <Tooltip contentStyle={{ backgroundColor: "#333", borderColor: "#555" }} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#f97316"
                    activeDot={{ r: 8 }}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex justify-between mt-4">
              <p className="text-white">Valoare totală actuală: <span className="font-bold text-gold-500">
                {assets.reduce((sum, asset) => sum + asset.value, 0).toLocaleString('ro-RO')} €
              </span></p>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setHistoryData(generateHistoryData(30, assets))}
                  className="text-white border-gray-700"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" /> 30 zile
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setHistoryData(generateHistoryData(90, assets))}
                  className="text-white border-gray-700"
                >
                  <ArrowRight className="h-4 w-4 mr-1" /> 90 zile
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PortfolioTracker;
