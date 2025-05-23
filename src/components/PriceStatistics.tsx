import React from 'react';
import { TrendingUp, TrendingDown, LineChart } from 'lucide-react';
import { MarketData } from '../types';

interface PriceStatisticsProps {
  data: MarketData[];
}

const PriceStatistics: React.FC<PriceStatisticsProps> = ({ data }) => {
  const calculateStats = () => {
    if (data.length === 0) return { max: 0, min: 0, avg: 0 };
    
    const prices = data.map(item => item.price_per_kg);
    const max = Math.max(...prices);
    const min = Math.min(...prices);
    const avg = prices.reduce((a, b) => a + b, 0) / prices.length;
    
    return { max, min, avg };
  };
  
  const { max, min, avg } = calculateStats();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-[#FF9933]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Maximum Price</p>
            <p className="text-2xl font-bold text-[#FF9933]">₹{max.toFixed(2)}</p>
          </div>
          <TrendingUp className="h-8 w-8 text-[#FF9933]" />
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-[#138808]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Minimum Price</p>
            <p className="text-2xl font-bold text-[#138808]">₹{min.toFixed(2)}</p>
          </div>
          <TrendingDown className="h-8 w-8 text-[#138808]" />
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-[#000080]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Average Price</p>
            <p className="text-2xl font-bold text-[#000080]">₹{avg.toFixed(2)}</p>
          </div>
          <LineChart className="h-8 w-8 text-[#000080]" />
        </div>
      </div>
    </div>
  );
};

export default PriceStatistics;