
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

// Sample data
const getRandomData = (length: number, min: number, max: number) => {
  return Array.from({ length }, (_, i) => ({
    name: `Day ${i + 1}`,
    value: min + Math.random() * (max - min)
  }));
};

const chartConfig = {
  value: {
    label: "Valoare",
    theme: {
      light: "#f97316",
      dark: "#f97316"
    }
  }
};

interface MarketChartProps {
  assetName: string;
  assetType: string;
  data?: Array<{ name: string; value: number }>;
}

const MarketChart: React.FC<MarketChartProps> = ({ 
  assetName, 
  assetType,
  data = getRandomData(30, 100, 200)
}) => {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Grafic {assetName} <span className="text-sm font-normal text-gray-400">({assetType})</span></CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ChartContainer config={chartConfig}>
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#9ca3af' }} 
                tickLine={{ stroke: '#4b5563' }}
                axisLine={{ stroke: '#4b5563' }}
              />
              <YAxis 
                tick={{ fill: '#9ca3af' }} 
                tickLine={{ stroke: '#4b5563' }}
                axisLine={{ stroke: '#4b5563' }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#f97316" 
                activeDot={{ r: 8 }} 
              />
            </LineChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketChart;
