import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  
  return (
    <nav className={`sticky top-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${
      isHome ? 'bg-primary/10 border-white/20' : 'bg-background/80 border-border'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <span className={`text-xl font-heading font-bold transition-colors duration-300 ${
              isHome ? 'text-white' : 'text-primary'
            }`}>
              TrailTix
            </span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors duration-200 hover:text-primary ${
                isHome ? 'text-white' : 'text-foreground'
              }`}
            >
              Destinations
            </Link>
            <Link
              to="/"
              className={`text-sm font-medium transition-colors duration-200 hover:text-primary ${
                isHome ? 'text-white' : 'text-foreground'
              }`}
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};