import { MarketData } from '../types';
import sampleData from '../data/sampleData';

// In a production environment, this would fetch from the actual GitHub URL
export const fetchMarketData = async (): Promise<MarketData[]> => {
  // For development/demo purposes, return the sample data
  // In production, replace with actual fetch from GitHub
  
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Uncomment for production with real GitHub URL:
  // const response = await fetch('https://raw.githubusercontent.com/yourusername/your-repo/main/data.json');
  // if (!response.ok) {
  //   throw new Error('Failed to fetch market data');
  // }
  // return await response.json();
  
  return sampleData;
};

// Get unique dates from the data
export const getUniqueDates = (data: MarketData[]): string[] => {
  return Array.from(new Set(data.map(item => item.date))).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
};

// Format date for display (YYYY-MM-DD to DD MMM YYYY)
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

// Calculate price change
export const calculatePriceChange = (current: number, previous: number | undefined): string => {
  if (!previous) return 'N/A';
  const change = ((current - previous) / previous) * 100;
  return change.toFixed(2) + '%';
};