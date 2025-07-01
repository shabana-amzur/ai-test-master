import React from 'react';
import { TestTube, Code, BarChart3, CheckCircle } from 'lucide-react';

const Roles = () => {
  const roles = [
    {
      icon: TestTube,
      title: 'QA Engineers',
      description: 'Comprehensive testing suite with advanced automation capabilities',
      features: [
        'Unit, API, UI & Regression Testing',
        'Test Execution Metrics & Trends', 
        'Bug Tracking & Resolution',
        'Test Data Management'
      ],
      color: 'bg-blue-50 border-blue-200',
      iconColor: 'text-blue-600'
    },
    {
      icon: Code,
      title: 'Developers',
      description: 'Developer-focused tools for code quality and integration testing',
      features: [
        'Code Coverage & Quality Metrics',
        'Integration Test Results',
        'CRUD Operations & Test Logs',
        'Performance Monitoring'
      ],
      color: 'bg-green-50 border-green-200',
      iconColor: 'text-green-600'
    },
    {
      icon: BarChart3,
      title: 'Clients',
      description: 'Business-friendly insights and project health overview',
      features: [
        'End-to-End Test Results',
        'Acceptance Criteria Fulfillment',
        'Release Readiness Status',
        'Executive Summary Reports'
      ],
      color: 'bg-purple-50 border-purple-200',
      iconColor: 'text-purple-600'
    }
  ];

  return (
    <section id="roles" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Built for Every Role
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you're a QA Engineer, Developer, or Client, AI Test Master provides tailored experiences that match your specific needs and workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {roles.map((role, index) => {
            const IconComponent = role.icon;
            return (
              <div key={index} className={`${role.color} border-2 rounded-xl p-8 hover:shadow-lg transition-shadow`}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <IconComponent className={role.iconColor} size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{role.title}</h3>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-8">{role.description}</p>
                
                <ul className="space-y-4">
                  {role.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={20} />
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Roles;
