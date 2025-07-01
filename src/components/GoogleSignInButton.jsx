import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleSignInButton = ({ onSuccess, onError }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Load Google Identity Services script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = initializeGoogleSignIn;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const initializeGoogleSignIn = () => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: '143464414523-0r8agm4s8muqbf29fhs6r3fvcl9p9guf.apps.googleusercontent.com',
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById('google-signin-button'),
        {
          theme: 'outline',
          size: 'large',
          text: 'continue_with',
          width: '100%',
        }
      );
    }
  };

  const handleCredentialResponse = async (response) => {
    try {
      console.log('Google credential response:', response);
      
      // Send the credential token to your backend
      const backendResponse = await fetch('http://localhost:3001/api/auth/google/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          credential: response.credential 
        }),
      });

      const data = await backendResponse.json();

      if (!backendResponse.ok) {
        throw new Error(data.message || 'Google sign-in failed');
      }

      // Store token and redirect
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }

      onSuccess?.(data);
      navigate('/welcome', { 
        state: { 
          user: data.user 
        } 
      });

    } catch (error) {
      console.error('Google sign-in error:', error);
      onError?.(error.message);
    }
  };

  return (
    <div>
      <div id="google-signin-button"></div>
    </div>
  );
};

export default GoogleSignInButton;
