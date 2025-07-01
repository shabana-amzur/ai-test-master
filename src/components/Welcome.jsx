import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';
  const user = location.state?.user || {};
  const userName = user.first_name || user.name || 'User';

  const handleContinue = () => {
    // Navigate back to landing page
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>

          {/* Welcome Message */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              🎉 Welcome back, {userName}!
            </h1>
            <p className="text-gray-600 text-lg mb-2">
              You've successfully signed in to AI Test Master
            </p>
            {email && (
              <p className="text-blue-600 font-semibold">
                {email}
              </p>
            )}
          </div>

          {/* Features Preview */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              You're all set to explore
            </h3>
            <div className="grid grid-cols-1 gap-3 text-sm text-gray-600">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                AI-powered test generation
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                Automated test execution
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                Comprehensive reporting
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                Team collaboration tools
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center group"
          >
            Continue
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Additional Info */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-gray-500 text-sm">
              Thank you for choosing AI Test Master for your testing needs! 🚀
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
