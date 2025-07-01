# Google OAuth Configuration for Localhost

## The Problem
The error "Can't continue with google.com. Something went wrong" occurs because:
1. **localhost is not in authorized domains**
2. **OAuth consent screen is not configured for localhost**
3. **Authorized redirect URIs are missing**

## Solution: Configure Google Cloud Console

### Step 1: Go to Google Cloud Console
1. Open [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project (or create a new one)

### Step 2: Configure OAuth Consent Screen
1. Go to **"APIs & Services"** > **"OAuth consent screen"**
2. Choose **"External"** (unless you have a G Suite/Workspace account)
3. Fill in the required information:
   - **App name**: `AI Test Master`
   - **User support email**: Your email address
   - **App logo**: (optional)
   - **App domain**: Leave blank for localhost testing
   - **Authorized domains**: Leave blank for localhost testing
   - **Developer contact information**: Your email address
4. Click **"Save and Continue"**
5. **Scopes**: Click "Add or Remove Scopes" and add:
   - `email`
   - `profile` 
   - `openid`
6. Click **"Save and Continue"**
7. **Test users**: Add your Gmail address as a test user
8. Click **"Save and Continue"**

### Step 3: Configure OAuth 2.0 Client ID
1. Go to **"APIs & Services"** > **"Credentials"**
2. Find your OAuth 2.0 Client ID: `143464414523-0r8agm4s8muqbf29fhs6r3fvcl9p9guf.apps.googleusercontent.com`
3. Click the **edit (pencil)** icon
4. In **"Authorized JavaScript origins"**, add:
   - `http://localhost:5173`
   - `http://localhost:5174`
   - `http://localhost:5175`
   - `http://localhost:3000`
5. In **"Authorized redirect URIs"**, add:
   - `http://localhost:5173/auth/google/callback`
   - `http://localhost:5174/auth/google/callback`
   - `http://localhost:5175/auth/google/callback`
   - `http://localhost:3000/auth/google/callback`
6. Click **"Save"**

### Step 4: Enable Required APIs
1. Go to **"APIs & Services"** > **"Library"**
2. Search for and enable:
   - **"Google+ API"** (if available)
   - **"Google Identity API"** 
   - **"People API"**

### Step 5: Wait for Changes to Propagate
- Changes can take **5-10 minutes** to take effect
- Clear your browser cache or use incognito mode for testing

## Alternative: Use Development Keys
If you're having trouble with the OAuth setup, you can:
1. Create a new project in Google Cloud Console
2. Generate new OAuth credentials specifically for localhost development
3. Use those credentials instead

## Testing
After configuration:
1. Wait 5-10 minutes
2. Clear browser cache
3. Test the Google sign-in flow
4. Check browser console for any errors

## Common Issues and Solutions

### Issue: "Error 400: redirect_uri_mismatch"
**Solution**: Add the exact redirect URI to authorized redirect URIs

### Issue: "This app isn't verified"
**Solution**: Add your email as a test user in OAuth consent screen

### Issue: "Can't continue with google.com"
**Solution**: Add localhost origins to authorized JavaScript origins

### Issue: Still not working after configuration
**Solutions**:
1. Wait longer (up to 30 minutes)
2. Use incognito/private browsing mode
3. Clear all cookies and cache
4. Try different localhost port
