import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const GoogleCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleGoogleCallback = async () => {
      const code = searchParams.get('code');
      const error = searchParams.get('error');

      if (error) {
        console.error('Google OAuth error:', error);
        navigate('/signup', { 
          state: { 
            error: 'Google authentication failed. Please try again.' 
          } 
        });
        return;
      }

      if (code) {
        try {
          // In production, send this code to your backend
          // which will exchange it for user information
          const response = await fetch('http://localhost:3001/api/auth/google/callback', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || 'Google authentication failed');
          }

          // Store token and redirect to welcome
          if (data.token) {
            localStorage.setItem('authToken', data.token);
          }

          navigate('/welcome', { 
            state: { 
              user: data.user 
            } 
          });

        } catch (error) {
          console.error('Google callback error:', error);
          navigate('/signup', { 
            state: { 
              error: error.message || 'Google authentication failed' 
            } 
          });
        }
      } else {
        navigate('/signup', { 
          state: { 
            error: 'No authorization code received from Google' 
          } 
        });
      }
    };

    handleGoogleCallback();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 animate-spin">
          <div className="w-full h-full border-4 border-gray-300 border-t-blue-600 rounded-full"></div>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Completing Google sign-in...
        </h2>
        <p className="text-gray-600">
          Please wait while we complete your authentication.
        </p>
      </div>
    </div>
  );
};

export default GoogleCallback;
