
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Plus, Trash2 } from 'lucide-react';
import { UserTier } from './UserTierBadge';

interface Asset {
  id: string;
  name: string;
  value: number;
  color: string;
}

interface PortfolioTrackerProps {
  userTier: UserTier;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a855f7', '#ec4899'];

const PortfolioTracker: React.FC<PortfolioTrackerProps> = ({ userTier }) => {
  const [assets, setAssets] = useState<Asset[]>([
    { id: '1', name: 'Acțiuni', value: 4000, color: COLORS[0] },
    { id: '2', name: 'ETF-uri', value: 3000, color: COLORS[1] },
    { id: '3', name: 'Forex', value: 2000, color: COLORS[2] },
    { id: '4', name: 'Aur', value: 1500, color: COLORS[3] },
  ]);
  
  const [newAssetName, setNewAssetName] = useState('');
  const [newAssetValue, setNewAssetValue] = useState('');

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
      }
    }
  };

  const removeAsset = (id: string) => {
    setAssets(assets.filter(asset => asset.id !== id));
  };

  // Only premium tiers can add assets
  const canAddAssets = userTier === 'silver' || userTier === 'gold';

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Urmărirea portofoliului</CardTitle>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
};

export default PortfolioTracker;
