import React from 'react';
import { Github, Settings, TestTube, Bug } from 'lucide-react';

const Integrations = () => {
  const integrations = [
    {
      name: 'GitHub',
      icon: Github,
      description: 'Version control and CI/CD'
    },
    {
      name: 'Jenkins',
      icon: Settings,
      description: 'Build automation'
    },
    {
      name: 'Selenium',
      icon: TestTube, 
      description: 'Web testing framework'
    },
    {
      name: 'JIRA',
      icon: Bug,
      description: 'Issue tracking'
    }
  ];

  return (
    <section id="integrations" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Seamless Integrations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with your existing tools and workflows. AI Test Master integrates with popular platforms to fit perfectly into your development ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {integrations.map((integration, index) => {
            const IconComponent = integration.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-8 text-center hover:shadow-lg transition-shadow border border-gray-200">
                <div className="flex justify-center mb-4">
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <IconComponent className="text-gray-700" size={32} />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{integration.name}</h3>
                <p className="text-gray-600 text-sm">{integration.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Integrations;
