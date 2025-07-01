import React from 'react';
import Header from './Header';
import Hero from './Hero';
import Dashboard from './Dashboard';
import TestManagement from './TestManagement';
import Features from './Features';
import Roles from './Roles';
import Pricing from './Pricing';
import Integrations from './Integrations';
import CTA from './CTA';
import Footer from './Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <Dashboard />
      <TestManagement />
      <Features />
      <Roles />
      <Pricing />
      <Integrations />
      <CTA />
      <Footer />
    </div>
  );
};

export default LandingPage;
