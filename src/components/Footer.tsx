import React from 'react';
import { FooterProps } from '../types';
import { BarChart3, Github, ExternalLink } from 'lucide-react';

const Footer: React.FC<FooterProps> = ({ year = new Date().getFullYear() }) => {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <BarChart3 className="h-6 w-6 mr-2 text-green-500" />
            <div>
              <h2 className="text-lg font-semibold text-white">Telangana Market Prices</h2>
              <p className="text-xs text-gray-400">Daily agricultural market data</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center px-3 py-1 rounded-md hover:bg-gray-700 transition-colors mb-3 md:mb-0 md:mr-4"
            >
              <Github className="h-4 w-4 mr-2" />
              <span className="text-sm">GitHub Repository</span>
            </a>
            
            <a 
              href="https://www.telangana.gov.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center px-3 py-1 rounded-md hover:bg-gray-700 transition-colors"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              <span className="text-sm">Official Government Website</span>
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-gray-700 text-center text-xs text-gray-400">
          <p>
            This website displays daily market prices of goods sold in government markets across districts of Telangana.
            Data is updated daily and provided for informational purposes only.
          </p>
          <p className="mt-2">
            © {year} Telangana Market Prices. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;