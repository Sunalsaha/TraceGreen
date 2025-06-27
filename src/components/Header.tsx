import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Shield } from 'lucide-react';

interface HeaderProps {
  isManufacturer?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isManufacturer = false }) => {
  return (
    <header className="bg-black/80 backdrop-blur-md border-b border-neon-green/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Leaf className="h-8 w-8 text-neon-green group-hover:text-electric-lime transition-colors" />
              <Shield className="h-4 w-4 text-electric-lime absolute -top-1 -right-1" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-neon-green to-electric-lime bg-clip-text text-transparent">
              TraceGreen
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            {isManufacturer ? (
              <>
                <Link to="/manufacturer/dashboard" className="text-gray-300 hover:text-neon-green transition-colors">
                  Dashboard
                </Link>
                <Link to="/manufacturer/submit-product" className="text-gray-300 hover:text-neon-green transition-colors">
                  Submit Product
                </Link>
              </>
            ) : (
              <>
                <Link to="/manufacturer/auth" className="text-gray-300 hover:text-neon-green transition-colors">
                  For Businesses
                </Link>
                <Link to="/compare" className="text-gray-300 hover:text-neon-green transition-colors">
                  Compare Products
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;