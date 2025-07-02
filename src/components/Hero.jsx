import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Zap, TrendingUp } from 'lucide-react';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
            🚀 AI-Powered Testing Revolution
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Transform Your Testing with{' '}
            <span className="gradient-text">AI Test Master</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            The ultimate AI-powered testing platform that automates your entire testing lifecycle. 
            Generate self-healing test scripts, validate builds across environments, and deliver 
            flawless software with zero manual intervention.
          </p>

          {/* CTA Buttons */}
          <div className="flex justify-center mb-12">
            <Link 
              to="/signup"
              className="btn-primary flex items-center gap-2 text-lg px-8 py-4"
            >
              <Shield size={20} />
              Get Started
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3">
              <Shield className="text-green-500" size={24} />
              <span className="text-gray-700 font-semibold">99.9% Uptime Guarantee</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Zap className="text-yellow-500" size={24} />
              <span className="text-gray-700 font-semibold">10,000+ Tests Per Day</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <TrendingUp className="text-blue-500" size={24} />
              <span className="text-gray-700 font-semibold">85% Time Saved</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
