import React from 'react';
import { Search, CheckCircle, XCircle, Clock, BarChart3, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful Dashboard Interface
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get instant insights with our intuitive dashboard that adapts to your role and priorities.
          </p>
        </div>

        {/* Dashboard Mockup */}
        <div className="bg-gray-900 rounded-xl p-8 shadow-2xl">
          {/* Dashboard Header */}
          <div className="flex items-center justify-between mb-8">
            <img 
              src="https://amzur.com/wp-content/uploads/2022/07/Amzur-logo-2022-white.png" 
              alt="Amzur Logo" 
              className="h-10 w-auto"
            />
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search tests..."
                className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-primary-500"
              />
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="text-green-500" size={24} />
                <span className="text-gray-300 text-sm">Tests Passed</span>
              </div>
              <div className="text-white text-3xl font-bold">1,247</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <XCircle className="text-red-500" size={24} />
                <span className="text-gray-300 text-sm">Tests Failed</span>
              </div>
              <div className="text-white text-3xl font-bold">23</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="text-yellow-500" size={24} />
                <span className="text-gray-300 text-sm">Running</span>
              </div>
              <div className="text-white text-3xl font-bold">8</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <BarChart3 className="text-blue-500" size={24} />
                <span className="text-gray-300 text-sm">Coverage</span>
              </div>
              <div className="text-white text-3xl font-bold">94%</div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="text-blue-500" size={20} />
                <h4 className="text-white font-semibold">Test Execution Trends</h4>
              </div>
              <div className="h-40 bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">Chart Placeholder</span>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="text-green-500" size={20} />
                <h4 className="text-white font-semibold">Recent Test Runs</h4>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Login Flow Tests</span>
                  <span className="text-green-500 font-semibold">Passed</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">API Integration</span>
                  <span className="text-green-500 font-semibold">Passed</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Payment Gateway</span>
                  <span className="text-red-500 font-semibold">Failed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
