# Google OAuth Configuration Guide

## Issue: "Continue with Google" button not working

The Google OAuth button is not redirecting because the Google Cloud Console OAuth configuration is incomplete.

## Solution Steps:

### 1. Configure Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project or create a new one
3. Go to "APIs & Services" > "Credentials"
4. Find your OAuth 2.0 Client ID: `143464414523-0r8agm4s8muqbf29fhs6r3fvcl9p9guf.apps.googleusercontent.com`
5. Click "Edit" on the OAuth client
6. Add these Authorized redirect URIs:
   - `http://localhost:5173/auth/google/callback`
   - `http://localhost:5174/auth/google/callback`  
   - `http://localhost:5175/auth/google/callback`
   - `http://localhost:3000/auth/google/callback`
   - Add your production domain when ready

### 2. Configure OAuth Consent Screen

1. Go to "APIs & Services" > "OAuth consent screen"
2. Choose "External" user type
3. Fill in required fields:
   - App name: "AI Test Master"
   - User support email: your email
   - Developer contact information: your email
4. Add scopes:
   - `openid`
   - `email`
   - `profile`
5. Add test users (your email addresses)
6. Save and continue

### 3. Enable Required APIs

1. Go to "APIs & Services" > "Library"
2. Enable "Google+ API" (if available)
3. Enable "People API"

## Testing

After configuration:
1. Wait 5-10 minutes for changes to propagate
2. Test the OAuth flow again
3. Check browser console for any errors

## Current Configuration Status

- Client ID: ✅ Valid
- Redirect URI: ❌ Needs to be added to Google Cloud Console
- Consent Screen: ❌ Needs to be configured
- APIs: ❌ May need to be enabled

## Alternative: Use Google One Tap or Google Identity Services

If the OAuth setup is too complex, we can implement Google One Tap or the new Google Identity Services which are easier to configure.
