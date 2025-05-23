import React from 'react';
import { BarChart3, Home, Info, Phone } from 'lucide-react';
import { HeaderProps } from '../types';

const Header: React.FC<HeaderProps> = ({ title = 'Telangana Market Prices' }) => {
  return (
    <header>
      <div className="bg-[#2F4F2F] text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-3 md:mb-0">
            <BarChart3 className="h-8 w-8 mr-3" />
            <div>
              <h1 className="text-xl md:text-2xl font-bold">{title}</h1>
              <p className="text-xs md:text-sm text-green-100">
                Daily market rates across Telangana districts
              </p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center">
            <div className="bg-[#1B2F1B] py-1 px-3 rounded-full text-xs md:text-sm flex items-center mb-2 md:mb-0 md:mr-4">
              <span className="h-2 w-2 bg-green-300 rounded-full mr-2 animate-pulse"></span>
              <span>Updated Daily</span>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-xs md:text-sm font-medium">
                Last Updated: {new Date().toLocaleDateString('en-GB', { 
                  day: '2-digit', 
                  month: 'short', 
                  year: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <nav className="bg-[#3A5A3A] text-white py-2 shadow-md">
        <div className="container mx-auto px-4">
          <ul className="flex space-x-6 justify-center md:justify-start">
            <li>
              <a href="#" className="flex items-center hover:text-green-200 transition-colors">
                <Home className="h-4 w-4 mr-1" />
                Home
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center hover:text-green-200 transition-colors">
                <Info className="h-4 w-4 mr-1" />
                About
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center hover:text-green-200 transition-colors">
                <Phone className="h-4 w-4 mr-1" />
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;