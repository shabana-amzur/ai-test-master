import React from 'react';
import { Bot, Shield, Users, GitBranch, Camera, FileText, Zap, CheckCircle } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Bot,
      title: 'AI Test Generation',
      description: 'Automatically generate comprehensive test scripts from user interactions and application behavior.',
      highlights: ['Self-healing scripts', 'Multi-language support', 'Pattern recognition']
    },
    {
      icon: Shield,
      title: 'Build Integrity Check',
      description: 'Validate builds across multiple environments with automated smoke and sanity testing.',
      highlights: ['Multi-environment support', 'CRUD operations', 'Instant validation']
    },
    {
      icon: Users,
      title: 'Role-Based Dashboards',
      description: 'Customized insights for QA Engineers, Developers, and Clients with relevant metrics.',
      highlights: ['Personalized metrics', 'Real-time updates', 'Trend analysis']
    },
    {
      icon: GitBranch,
      title: 'CI/CD Integration',
      description: 'Seamlessly integrate with Jenkins, GitLab CI, GitHub Actions, and more.',
      highlights: ['Pipeline automation', 'Build triggering', 'Status monitoring']
    },
    {
      icon: Camera,
      title: 'Smart Test Recording',
      description: 'Record user interactions and automatically capture screenshots for comprehensive test documentation.',
      highlights: ['Auto-capture', 'Playback capability', 'Screenshot comparison']
    },
    {
      icon: FileText,
      title: 'Advanced Reporting',
      description: 'Generate detailed reports with visual analytics and export in multiple formats.',
      highlights: ['Visual charts', 'Multiple formats', 'Historical trends']
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Modern Testing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From AI-powered automation to comprehensive reporting, every feature is designed to make your testing process faster, smarter, and more reliable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <IconComponent className="text-primary-600" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                </div>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle className="text-green-500" size={16} />
                      <span className="text-sm text-gray-700">{highlight}</span>
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

export default Features;
