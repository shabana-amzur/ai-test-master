import React from 'react';
import { Check, Star } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      price: '$29',
      period: '/month',
      description: 'Perfect for small teams getting started with AI testing',
      features: [
        'Up to 1,000 test executions/month',
        'Basic AI test generation',
        'Email support',
        'Web dashboard access',
        'Basic reporting',
        '2 team members'
      ],
      popular: false
    },
    {
      name: 'Professional',
      price: '$99',
      period: '/month',
      description: 'Advanced testing capabilities for growing teams',
      features: [
        'Up to 10,000 test executions/month',
        'Advanced AI test generation',
        'Self-healing test scripts',
        'Priority support',
        'Advanced analytics',
        'API integrations',
        '10 team members',
        'Custom test environments'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$299',
      period: '/month',
      description: 'Complete testing solution for large organizations',
      features: [
        'Unlimited test executions',
        'Full AI testing suite',
        'Custom integrations',
        '24/7 dedicated support',
        'Advanced security features',
        'Custom reporting',
        'Unlimited team members',
        'On-premise deployment',
        'SLA guarantees'
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Testing Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start with our free trial and scale as your testing needs grow. No hidden fees, cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <div key={index} className={`relative bg-white rounded-2xl border-2 p-8 ${
              plan.popular ? 'border-primary-500 shadow-xl' : 'border-gray-200'
            }`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star size={16} />
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center mb-4">
                  <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-xl text-gray-600">{plan.period}</span>
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="text-green-500 mt-0.5 flex-shrink-0" size={20} />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center">
          <p className="text-gray-600 mb-6">
            All plans include 14-day free trial • No credit card required
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <div className="flex items-center gap-2">
              <Check className="text-green-500" size={20} />
              <span className="text-gray-700 font-medium">99.9% Uptime SLA</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="text-green-500" size={20} />
              <span className="text-gray-700 font-medium">24/7 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="text-green-500" size={20} />
              <span className="text-gray-700 font-medium">Cancel Anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
