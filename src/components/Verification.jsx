import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

const Verification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [countdown, setCountdown] = useState(0);
  
  // Get email from navigation state or default
  const email = location.state?.email || 'your-email@example.com';
  const step = location.state?.step || 'verify-email';

  // Handle OTP input
  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Only allow single digit
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  // Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      setError('Please enter the complete 6-digit OTP');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          otp: otpString,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'OTP verification failed');
      }

      // Success - show success message
      setIsVerified(true);
      
      // Start countdown for redirect
      setCountdown(2);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            // For now, we'll just show success without redirect
            // navigate('/dashboard'); // Uncomment when dashboard is ready
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/auth/resend-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      
      if (response.ok) {
        alert('New OTP sent to your email!');
        setOtp(['', '', '', '', '', '']); // Clear current OTP
      } else {
        throw new Error(data.message || 'Failed to resend OTP');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // Success screen
  if (isVerified) {
    return (
      <div className="min-h-screen bg-white flex">
        {/* Left side - Success message */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center py-12 px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="w-full max-w-md mx-auto text-center">
            <div className="mb-8">
              <Link to="/">
                <img
                  className="h-10 w-auto mx-auto cursor-pointer hover:opacity-80 transition-opacity"
                  src="https://amzur.com/wp-content/uploads/2022/07/Amzur-logo-2022.png"
                  alt="Amzur"
                />
              </Link>
            </div>

            <div className="mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Signup Successful!
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                Your email has been verified successfully.
              </p>
              <p className="text-sm text-gray-500">
                Welcome to AI Test Master! Your account is now ready to use.
              </p>
            </div>

            {countdown > 0 && (
              <div className="text-sm text-gray-500">
                Redirecting in {countdown} seconds...
              </div>
            )}
          </div>
        </div>

        {/* Right side - Visual */}
        <div className="hidden lg:block relative w-1/2 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="max-w-lg text-center">
              <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
                <div className="space-y-4">
                  <div className="bg-green-50 rounded-lg p-6">
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                    </div>
                    <div className="text-center">
                      <h4 className="text-lg font-semibold text-green-800 mb-2">Account Verified!</h4>
                      <p className="text-sm text-green-700">
                        Your AI Test Master account is now active and ready to use
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Start Testing?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Welcome to the future of intelligent software testing. 
                Your journey with AI-powered test automation begins now.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Verification screen
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
              Verify your email
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              We've sent a 6-digit verification code to
            </p>
            <p className="font-medium text-primary-600">{email}</p>
          </div>

          <form className="space-y-6" onSubmit={handleVerifyOtp}>
            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* OTP Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Enter verification code
              </label>
              <div className="flex gap-2 justify-center">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value.replace(/[^0-9]/g, ''))}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="0"
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || otp.join('').length !== 6}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Verifying...' : 'Verify Email'}
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Didn't receive the code?{' '}
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="font-medium text-primary-600 hover:text-primary-500"
                >
                  Resend code
                </button>
              </p>
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-500 mt-4"
              >
                <ArrowLeft size={16} />
                Back to signup
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Right side - Visual */}
      <div className="hidden lg:block relative w-1/2 bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="max-w-lg text-center">
            <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
              <div className="space-y-4">
                {/* Email verification illustration */}
                <div className="bg-blue-50 rounded-lg p-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <Mail className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>
                  <div className="text-center">
                    <h4 className="text-lg font-semibold text-blue-800 mb-2">Check Your Email</h4>
                    <p className="text-sm text-blue-700">
                      We've sent a 6-digit verification code to your email address
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-700 mb-3">Verification Tips</div>
                  <div className="space-y-2 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Code expires in 10 minutes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Check your spam folder</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>One-time use only</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Almost There!
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Just one more step to activate your AI Test Master account. 
              Enter the verification code from your email to get started.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verification;
