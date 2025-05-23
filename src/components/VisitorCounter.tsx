import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import { VisitorCounterProps } from '../types';

const VisitorCounter: React.FC<VisitorCounterProps> = ({ className = '' }) => {
  const [visitorCount, setVisitorCount] = useState<number>(0);
  
  useEffect(() => {
    // In a real implementation, this would call an actual visitor counter service
    // For demo purposes, we'll use localStorage to simulate a basic counter
    const getVisitorCount = () => {
      // Check if this is a new visit (not in this session)
      const hasVisited = sessionStorage.getItem('has_visited');
      
      if (!hasVisited) {
        // Get current count from localStorage
        const currentCount = parseInt(localStorage.getItem('visitor_count') || '0', 10);
        const newCount = currentCount + 1;
        
        // Update localStorage and sessionStorage
        localStorage.setItem('visitor_count', newCount.toString());
        sessionStorage.setItem('has_visited', 'true');
        
        setVisitorCount(newCount);
      } else {
        // Just display the current count without incrementing
        const currentCount = parseInt(localStorage.getItem('visitor_count') || '0', 10);
        setVisitorCount(currentCount);
      }
    };
    
    getVisitorCount();
    
    // In a real implementation, you might periodically update the count
    // const intervalId = setInterval(getVisitorCount, 60000); // Update every minute
    // return () => clearInterval(intervalId);
  }, []);
  
  return (
    <div className={`flex items-center justify-center p-4 bg-white rounded-lg shadow-sm ${className}`}>
      <div className="flex items-center text-gray-600">
        <Users className="h-5 w-5 mr-2 text-green-600" />
        <span className="text-sm">Visitors: <span className="font-semibold">{visitorCount.toLocaleString()}</span></span>
      </div>
    </div>
  );
};

export default VisitorCounter;