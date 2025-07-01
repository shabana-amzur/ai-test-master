import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, Building } from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    password: '',
    agreeToTerms: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      // Simple fetch request
      const response = await fetch('http://localhost:3001/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          company: formData.company,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      // Success - redirect to verification page with email
      navigate('/verify-email', { 
        state: { 
          email: formData.email
        } 
      });
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleGoogleSignup = async () => {
    try {
      setLoading(true);
      setError('');
      
      // For now, simulate Google OAuth
      // In production, you would integrate with Google OAuth
      const googleUser = {
        fullName: 'John Doe',
        email: 'john.doe@gmail.com',
        company: 'Google Inc.',
        provider: 'google'
      };
      
      const response = await fetch('http://localhost:3001/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(googleUser),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Google signup failed');
      }

      // Success - redirect to welcome page
      navigate('/welcome', { 
        state: { 
          user: data.user 
        } 
      });
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGithubSignup = async () => {
    try {
      setLoading(true);
      setError('');
      
      // For now, simulate GitHub OAuth
      // In production, you would integrate with GitHub OAuth
      const githubUser = {
        fullName: 'Jane Smith',
        email: 'jane.smith@github.com',
        company: 'GitHub Inc.',
        provider: 'github'
      };
      
      const response = await fetch('http://localhost:3001/api/auth/github', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(githubUser),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'GitHub signup failed');
      }

      // Success - redirect to welcome page
      navigate('/welcome', { 
        state: { 
          user: data.user 
        } 
      });
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center py-12 px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="w-full max-w-md mx-auto">
          <div className="mb-8">
            <Link to="/">
              <img
                className="h-10 w-auto cursor-pointer hover:opacity-80 transition-opacity"
                src="https://amzur.com/wp-content/uploads/2022/07/Amzur-logo-2022.png"
                alt="Amzur"
              />
            </Link>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Start your AI-powered testing journey today
            </p>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={handleGoogleSignup}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
            
            <button
              onClick={handleGithubSignup}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            >
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Continue with GitHub
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">OR</span>
            </div>
          </div>

          {/* Email Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                <p className="text-sm">{error}</p>
              </div>
            )}
            
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                Company
              </label>
              <input
                id="company"
                name="company"
                type="text"
                required
                value={formData.company}
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                placeholder="Company name"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-3 pr-10 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  required
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="agreeToTerms" className="text-gray-600">
                  Agree to our{' '}
                  <a href="#" className="text-primary-600 hover:text-primary-500 underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-primary-600 hover:text-primary-500 underline">
                    Privacy Policy
                  </a>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={!formData.agreeToTerms || loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Creating account...' : 'Create your account'}
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                  Log in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Right side - Image/Animation */}
      <div className="hidden lg:block relative w-1/2 bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="max-w-lg text-center">
            {/* You can replace this with an actual GIF or animation */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
              <div className="space-y-4">
                {/* Mock testing interface */}
                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">AI Test Runner</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-gray-600">Login flow test - Passed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-gray-600">API integration test - Passed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gray-600">UI responsiveness test - Running...</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-primary-50 rounded-lg p-4">
                  <div className="text-sm font-medium text-primary-800 mb-2">Test Coverage</div>
                  <div className="bg-white rounded-full h-2">
                    <div className="bg-primary-500 h-2 rounded-full" style={{width: '87%'}}></div>
                  </div>
                  <div className="text-xs text-primary-600 mt-1">87% coverage</div>
                </div>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Intelligent Testing, Simplified
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Join thousands of teams using AI Test Master to automate their testing workflows, 
              catch bugs faster, and ship with confidence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
