import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 to-blue-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Ready to Transform Your Testing?
        </h2>
        <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
          Join thousands of teams who have revolutionized their testing process with AI Test Master. 
          Start your free trial today and experience the future of automated testing.
        </p>
        
        <div className="flex justify-center mb-8">
          <Link 
            to="/signup"
            className="bg-white text-primary-600 hover:bg-gray-50 font-semibold py-4 px-8 rounded-lg transition-colors flex items-center gap-2 text-lg justify-center"
          >
            Get Started
            <ArrowRight size={20} />
          </Link>
        </div>
        
        <p className="text-blue-100">
          No credit card required • 14-day free trial • Cancel anytime
        </p>
      </div>
    </section>
  );
};

export default CTA;
