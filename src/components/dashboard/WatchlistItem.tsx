
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, AlertTriangle, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface WatchlistItemProps {
  asset: {
    id: string;
    name: string;
    price: string;
    change: string;
    isUp: boolean;
    hasAlert: boolean;
  };
  onRemove: (id: string) => void;
}

const WatchlistItem: React.FC<WatchlistItemProps> = ({ asset, onRemove }) => {
  const handleAlertClick = () => {
    toast.success(`Alertă configurată pentru ${asset.name}`);
  };
  
  return (
    <Card className="bg-gray-800 border-gray-700 hover:border-gold-500/50 transition-all">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-white">{asset.name}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-gray-300">{asset.price}</span>
              <span className={`text-xs font-medium ${asset.isUp ? 'text-green-400' : 'text-red-400'}`}>
                {asset.isUp ? '▲' : '▼'} {asset.change}
              </span>
            </div>
          </div>
          <div className="flex space-x-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-gray-400 hover:text-gold-500"
              onClick={handleAlertClick}
            >
              <AlertTriangle className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-gray-400 hover:text-red-500"
              onClick={() => onRemove(asset.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WatchlistItem;
