
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Eye } from 'lucide-react';
import WatchlistItem from './WatchlistItem';
import { toast } from 'sonner';
import { UserTier } from './UserTierBadge';

export interface WatchlistItem {
  id: string;
  name: string;
  price: string;
  change: string;
  isUp: boolean;
  hasAlert: boolean;
}

interface WatchlistSectionProps {
  userTier: UserTier;
  onSelectAsset?: (asset: WatchlistItem) => void;
  selectedAssetId?: string;
}

const WatchlistSection: React.FC<WatchlistSectionProps> = ({ 
  userTier, 
  onSelectAsset,
  selectedAssetId 
}) => {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([
    { id: '1', name: 'EUR/USD', price: '1.0862', change: '0.15%', isUp: true, hasAlert: false },
    { id: '2', name: 'Aur (XAU)', price: '2,315.30', change: '0.42%', isUp: true, hasAlert: true },
    { id: '3', name: 'Apple Inc.', price: '187.68', change: '1.05%', isUp: false, hasAlert: false },
  ]);
  
  const [newItem, setNewItem] = useState('');

  const handleAddItem = () => {
    if (!newItem.trim()) return;
    
    // Generate some fake data for the new item
    const isUp = Math.random() > 0.5;
    const change = (Math.random() * 2).toFixed(2) + '%';
    const price = (Math.random() * 1000).toFixed(2);
    
    const newWatchlistItem: WatchlistItem = {
      id: Date.now().toString(),
      name: newItem,
      price: price,
      change: change,
      isUp: isUp,
      hasAlert: false,
    };
    
    setWatchlist([...watchlist, newWatchlistItem]);
    setNewItem('');
    toast.success(`${newItem} adăugat în Watchlist`);
  };
  
  const handleRemoveItem = (id: string) => {
    setWatchlist(watchlist.filter(item => item.id !== id));
    toast.success('Instrument financiar eliminat din Watchlist');
  };

  const handleSelectAsset = (asset: WatchlistItem) => {
    if (onSelectAsset) {
      onSelectAsset(asset);
    }
  };
  
  // Only silver and gold tiers can add more than 3 items
  const canAddMoreItems = userTier !== 'bronze' || watchlist.length < 3;
  
  // Set up interval to simulate live price updates
  React.useEffect(() => {
    const interval = setInterval(() => {
      setWatchlist(prevWatchlist => 
        prevWatchlist.map(item => {
          const isUp = Math.random() > 0.5;
          const changeValue = (Math.random() * 1.5).toFixed(2);
          const change = `${changeValue}%`;
          
          // For EUR/USD, generate a more realistic price
          let price = item.price;
          if (item.name === 'EUR/USD') {
            const currentPrice = parseFloat(item.price.replace(',', '.'));
            const newPrice = currentPrice + (isUp ? 0.0005 : -0.0005) * Math.random();
            price = newPrice.toFixed(4);
          } 
          // For Gold (XAU), generate a more realistic price
          else if (item.name === 'Aur (XAU)') {
            const currentPrice = parseFloat(item.price.replace(',', ''));
            const newPrice = currentPrice + (isUp ? 1 : -1) * Math.random() * 5;
            price = newPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          }
          // For stocks and other assets
          else {
            const currentPrice = parseFloat(item.price.replace(',', '.'));
            const newPrice = currentPrice + (isUp ? 0.1 : -0.1) * Math.random() * 2;
            price = newPrice.toFixed(2);
          }
          
          return {
            ...item,
            price,
            change,
            isUp
          };
        })
      );
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);
  
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Watchlist</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3">
          {watchlist.map(item => (
            <WatchlistItem 
              key={item.id} 
              asset={item} 
              onRemove={handleRemoveItem}
              onSelect={handleSelectAsset}
              isSelected={selectedAssetId === item.id}
            />
          ))}
          
          {watchlist.length === 0 && (
            <div className="text-center py-6 text-gray-400">
              <Eye className="mx-auto h-8 w-8 mb-2 opacity-50" />
              <p>Nu ai niciun instrument în watchlist</p>
            </div>
          )}
        </div>
        
        <div className="flex space-x-2">
          <Input 
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Adaugă un instrument financiar"
            className="bg-gray-800 border-gray-700 text-white"
            disabled={!canAddMoreItems}
          />
          <Button 
            onClick={handleAddItem}
            className="bg-gold-500 hover:bg-gold-600 text-black"
            disabled={!canAddMoreItems}
          >
            <Plus className="h-4 w-4 mr-1" /> Adaugă
          </Button>
        </div>
        
        {!canAddMoreItems && (
          <p className="text-sm text-gray-400">
            Ai atins limita de 3 instrumente pentru contul Bronze. Upgradeaza pentru a adăuga mai multe.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default WatchlistSection;
