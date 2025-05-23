import React, { useState } from 'react';
import { DataTableProps, MarketData } from '../types';
import { ArrowUpDown, ArrowUp, ArrowDown, Search } from 'lucide-react';

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const [sortField, setSortField] = useState<keyof MarketData>('product');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSort = (field: keyof MarketData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const getSortIcon = (field: keyof MarketData) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4 ml-1 text-gray-400" />;
    return sortDirection === 'asc' 
      ? <ArrowUp className="h-4 w-4 ml-1 text-green-600" />
      : <ArrowDown className="h-4 w-4 ml-1 text-green-600" />;
  };
  
  // Filter by search query
  const filteredData = data.filter(item =>
    item.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.market.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Sort the data
  const sortedData = [...filteredData].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });
  
  // Function to get price change indicator color
  const getPriceChangeColor = (percentage: number | undefined) => {
    if (!percentage) return 'text-gray-500';
    if (percentage > 0) return 'text-green-600';
    if (percentage < 0) return 'text-red-600';
    return 'text-gray-600';
  };
  
  return (
    <div className="mt-4">
      <div className="mb-4 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search by product, district or market..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>
      
      {sortedData.length === 0 ? (
        <div className="text-center py-10">
          <div className="text-gray-500 mb-2">No market data found</div>
          <p className="text-sm text-gray-400">Try adjusting your filters or search query</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('product')}
                >
                  <div className="flex items-center">
                    Product {getSortIcon('product')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('district')}
                >
                  <div className="flex items-center">
                    District {getSortIcon('district')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('market')}
                >
                  <div className="flex items-center">
                    Market {getSortIcon('market')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('price_per_kg')}
                >
                  <div className="flex items-center">
                    Price (₹/kg) {getSortIcon('price_per_kg')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <div className="flex items-center">
                    Change
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{item.product}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.district}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.market}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold">₹{item.price_per_kg.toFixed(2)}</div>
                    <div className="text-xs text-gray-500">₹{item.price_per_quintal?.toFixed(2)}/quintal</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.price_change_percentage !== undefined ? (
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        getPriceChangeColor(item.price_change_percentage)
                      }`}>
                        {item.price_change_percentage > 0 && '+'}
                        {item.price_change_percentage.toFixed(2)}%
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">N/A</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
        <div>
          Showing {sortedData.length} of {data.length} items
        </div>
        <div>
          Data updated daily
        </div>
      </div>
    </div>
  );
};

export default DataTable;