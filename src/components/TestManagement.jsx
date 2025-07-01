import React from 'react';
import { Play, Filter, CheckCircle, XCircle, Clock, Calendar } from 'lucide-react';

const TestManagement = () => {
  const testSuites = [
    {
      name: 'User Authentication Tests',
      testCases: 15,
      lastRun: '2 hours ago',
      status: 'passed',
      icon: CheckCircle,
      iconColor: 'text-green-500'
    },
    {
      name: 'Payment Processing Tests',
      testCases: 8,
      lastRun: '30 minutes ago',
      status: 'failed',
      icon: XCircle,
      iconColor: 'text-red-500'
    },
    {
      name: 'API Integration Tests',
      testCases: 22,
      lastRun: 'Currently running',
      status: 'running',
      icon: Clock,
      iconColor: 'text-yellow-500'
    },
    {
      name: 'Scheduled Regression Tests',
      testCases: 45,
      lastRun: 'Next run: Tonight at 2:00 AM',
      status: 'scheduled',
      icon: Calendar,
      iconColor: 'text-blue-500'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Complete Test Management
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Organize, execute, and monitor all your tests from a single, powerful interface.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Test Suite Management Header */}
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-900">Test Suite Management</h3>
            <div className="flex gap-4">
              <button className="btn-primary flex items-center gap-2">
                <Play size={16} />
                Run Tests
              </button>
              <button className="btn-secondary flex items-center gap-2">
                <Filter size={16} />
                Filter
              </button>
            </div>
          </div>

          {/* Test Suites */}
          <div className="space-y-6">
            {testSuites.map((suite, index) => {
              const IconComponent = suite.icon;
              return (
                <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <IconComponent className={suite.iconColor} size={24} />
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{suite.name}</h4>
                        <p className="text-gray-600">
                          {suite.testCases} test cases • {suite.lastRun}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize
                        ${suite.status === 'passed' ? 'bg-green-100 text-green-800' : 
                          suite.status === 'failed' ? 'bg-red-100 text-red-800' :
                          suite.status === 'running' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'}`}>
                        {suite.status}
                      </span>
                      <Play className="text-gray-400 hover:text-primary-600 cursor-pointer" size={20} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestManagement;
