import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import FilterSection from './components/FilterSection';
import DataTable from './components/DataTable';
import PriceGraph from './components/PriceGraph';
import PriceStatistics from './components/PriceStatistics';
import VisitorCounter from './components/VisitorCounter';
import Footer from './components/Footer';
import { MarketData } from './types';
import { fetchMarketData } from './services/dataService';
import { subDays } from 'date-fns';

function App() {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [filteredData, setFilteredData] = useState<MarketData[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const [markets, setMarkets] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchMarketData();
        
        // Filter data for last 7 days
        const sevenDaysAgo = subDays(new Date(), 7);
        const recentData = data.filter(item => 
          new Date(item.date) >= sevenDaysAgo
        );
        
        setMarketData(recentData);
        setFilteredData(recentData);
        
        const uniqueDistricts = Array.from(new Set(recentData.map(item => item.district)));
        const uniqueMarkets = Array.from(new Set(recentData.map(item => item.market)));
        
        setDistricts(uniqueDistricts);
        setMarkets(uniqueMarkets);
        
        if (recentData.length > 0) {
          setSelectedProduct(recentData[0].product);
        }
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load market data. Please try again later.');
        setLoading(false);
        console.error('Error loading data:', err);
      }
    };
    
    loadData();
  }, []);
  
  const handleFilter = (selectedDistrict: string, selectedMarket: string, selectedDate: string) => {
    let filtered = [...marketData];
    
    if (selectedDistrict) {
      filtered = filtered.filter(item => item.district === selectedDistrict);
    }
    
    if (selectedMarket) {
      filtered = filtered.filter(item => item.market === selectedMarket);
    }
    
    if (selectedDate) {
      filtered = filtered.filter(item => item.date === selectedDate);
    }
    
    setFilteredData(filtered);
    
    if (filtered.length > 0 && !filtered.some(item => item.product === selectedProduct)) {
      setSelectedProduct(filtered[0].product);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-t-4 border-[#FF9933]">
          <h2 className="text-2xl font-semibold text-[#000080] mb-4">
            Market Prices Dashboard
          </h2>
          
          <FilterSection 
            districts={districts}
            markets={markets}
            onFilter={handleFilter}
          />
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#138808]"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-700 p-4 rounded-md mt-4">
              {error}
            </div>
          ) : (
            <>
              <PriceStatistics data={filteredData} />
              
              <DataTable 
                data={filteredData}
                onProductSelect={setSelectedProduct}
                selectedProduct={selectedProduct}
              />
              
              {selectedProduct && (
                <div className="mt-8">
                  <PriceGraph 
                    data={marketData.filter(item => item.product === selectedProduct)}
                    product={selectedProduct}
                  />
                </div>
              )}
            </>
          )}
        </div>
        
        <VisitorCounter />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;