# AI Test Master Backend

## Quick Setup Guide

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment
Update the `.env` file with your email credentials (optional):
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### 3. Start the Server
```bash
npm run dev
```

The server will start on http://localhost:3001

## Database

- **Type**: SQLite (file-based, no setup required)
- **Location**: `backend/database.sqlite`
- **Tables**: 
  - `users` - Store user accounts
  - `password_resets` - Store password reset tokens
  - `email_verifications` - Store email verification tokens

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token

### Health Check
- `GET /api/health` - Check if API is running

## Features Implemented

✅ **User Registration** with password hashing  
✅ **User Login** with JWT tokens  
✅ **Password Reset** via email  
✅ **SQLite Database** (no setup required)  
✅ **Input Validation**  
✅ **Error Handling**  
✅ **CORS Configuration**  
✅ **Security Headers**  

## Next Steps

1. **Test the API**: Use Postman or your frontend forms
2. **Email Setup**: Configure email service for password resets
3. **Database Migration**: Move to PostgreSQL/MySQL for production
4. **Add Features**: Email verification, profile management, etc.

## Email Setup (Optional)

For Gmail:
1. Enable 2-factor authentication
2. Generate an app password
3. Use app password in EMAIL_PASS

## Production Deployment

- Change JWT_SECRET to a random string
- Use environment variables for all secrets
- Consider using PostgreSQL instead of SQLite
- Add logging and monitoring
