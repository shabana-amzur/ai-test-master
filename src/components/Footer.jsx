import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <img 
              src="https://amzur.com/wp-content/uploads/2022/07/Amzur-logo-2022-white.png" 
              alt="Amzur Logo" 
              className="h-12 w-auto mb-2"
            />
            <p className="text-gray-400">Revolutionizing testing with artificial intelligence</p>
          </div>
          
          <div className="text-gray-400">
            <p>© 2025 Amzur Technologies, Inc. All Rights Reserved.</p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">
            Built with React and powered by AI
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
