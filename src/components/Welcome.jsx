import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home } from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user || {};
  const userName = user.fullName || user.name || user.email || 'User';

  const handleContinue = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-32 h-20 bg-white rounded-lg shadow-sm flex items-center justify-center p-2">
              <img 
                src="https://amzur.com/wp-content/uploads/2022/07/Amzur-logo-2022.png" 
                alt="Amzur Logo" 
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>

          {/* Welcome Message */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              🎉 Welcome, {userName}!
            </h1>
            <p className="text-gray-600 text-lg mb-2">
              You've successfully signed in to AI Test Master
            </p>
            <p className="text-blue-600 font-semibold">
              Ready to transform your testing experience?
            </p>
          </div>

          {/* Features Preview */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              You're all set to explore
            </h3>
            <div className="grid grid-cols-1 gap-3 text-sm text-gray-600">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span>AI-powered test automation</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span>Smart bug detection and reporting</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span>Real-time collaboration tools</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span>Comprehensive analytics dashboard</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">            
            <button
              onClick={handleContinue}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
            >
              <Home className="mr-2 w-5 h-5" />
              Continue
            </button>
          </div>

          {/* Quick Stats */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">10K+</div>
                <div className="text-xs text-gray-500">Tests Run</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">99.9%</div>
                <div className="text-xs text-gray-500">Uptime</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">500+</div>
                <div className="text-xs text-gray-500">Happy Users</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
