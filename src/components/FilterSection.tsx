import React, { useState, useEffect } from 'react';
import { FilterProps } from '../types';
import { FilterIcon, RefreshCw, Calendar } from 'lucide-react';
import { format, subDays } from 'date-fns';

const FilterSection: React.FC<FilterProps> = ({ districts, markets, onFilter }) => {
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [selectedMarket, setSelectedMarket] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const minDate = format(subDays(new Date(), 7), 'yyyy-MM-dd');
  const maxDate = format(new Date(), 'yyyy-MM-dd');

  useEffect(() => {
    onFilter(selectedDistrict, selectedMarket, selectedDate);
  }, [selectedDistrict, selectedMarket, selectedDate]);

  const resetFilters = () => {
    setSelectedDistrict('');
    setSelectedMarket('');
    setSelectedDate(format(new Date(), 'yyyy-MM-dd'));
  };

  return (
    <div className="bg-white rounded-lg mb-6 border border-[#FF9933]">
      <div className="border-b border-[#FF9933] px-4 py-3 flex justify-between items-center">
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center text-[#138808] text-sm font-medium focus:outline-none"
        >
          <FilterIcon className="h-4 w-4 mr-2" />
          Filter Market Data
          <span className="ml-2 text-xs bg-[#FF9933] bg-opacity-20 text-[#FF9933] py-0.5 px-2 rounded-full">
            {selectedDistrict || selectedMarket ? 'Filtered' : 'All Data'}
          </span>
        </button>
        
        <button 
          onClick={resetFilters}
          className="text-[#FF9933] hover:text-[#138808] text-sm flex items-center"
        >
          <RefreshCw className="h-3 w-3 mr-1" />
          Reset
        </button>
      </div>
      
      <div className={`transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96' : 'max-h-0'} overflow-hidden`}>
        <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
              District
            </label>
            <select
              id="district"
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full rounded-md border border-[#FF9933] py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#138808] focus:border-transparent"
            >
              <option value="">All Districts</option>
              {districts.map(district => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="market" className="block text-sm font-medium text-gray-700 mb-1">
              Market
            </label>
            <select
              id="market"
              value={selectedMarket}
              onChange={(e) => setSelectedMarket(e.target.value)}
              className="w-full rounded-md border border-[#FF9933] py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#138808] focus:border-transparent"
            >
              <option value="">All Markets</option>
              {markets.map(market => (
                <option key={market} value={market}>{market}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-[#FF9933]" />
              <input
                type="date"
                id="date"
                value={selectedDate}
                min={minDate}
                max={maxDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full pl-10 pr-3 py-2 rounded-md border border-[#FF9933] text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#138808] focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection