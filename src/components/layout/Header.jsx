import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, UserPlus } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/">
                <img 
                  src="https://amzur.com/wp-content/uploads/2022/07/Amzur-logo-2022.png" 
                  alt="Amzur Logo" 
                  className="h-10 w-auto cursor-pointer hover:opacity-80 transition-opacity"
                />
              </Link>
            </div>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-primary-600 font-medium">
                Features
              </a>
              <a href="#roles" className="text-gray-700 hover:text-primary-600 font-medium">
                Solutions
              </a>
              <a href="#pricing" className="text-gray-700 hover:text-primary-600 font-medium">
                Pricing
              </a>
              <a href="#integrations" className="text-gray-700 hover:text-primary-600 font-medium">
                Integrations
              </a>
            </div>
          </div>

          {/* Auth Buttons - Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/login"
              className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors duration-200 text-sm font-medium"
            >
              <User size={16} />
              Sign In
            </Link>
            <Link
              to="/signup"
              className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors duration-200 text-sm font-medium"
            >
              <UserPlus size={16} />
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary-600"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <a href="#features" className="text-gray-700 hover:text-primary-600 font-medium">
                Features
              </a>
              <a href="#roles" className="text-gray-700 hover:text-primary-600 font-medium">
                Solutions
              </a>
              <a href="#pricing" className="text-gray-700 hover:text-primary-600 font-medium">
                Pricing
              </a>
              <a href="#integrations" className="text-gray-700 hover:text-primary-600 font-medium">
                Integrations
              </a>
              
              {/* Mobile Auth Buttons */}
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2 text-gray-600 hover:text-primary-600 transition-colors duration-200 text-sm font-medium w-full py-2"
                >
                  <User size={16} />
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center justify-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors duration-200 text-sm font-medium w-full"
                >
                  <UserPlus size={16} />
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
