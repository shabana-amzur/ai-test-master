const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');

const router = express.Router();

// JWT Secret (in production, use environment variable)
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';

// Email transporter setup - disabled for development
// const emailTransporter = nodemailer.createTransporter({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   }
// });

// Middleware to get database instance
const getDb = (req, res, next) => {
  req.db = req.app.locals.db;
  next();
};

// Apply database middleware to all routes
router.use(getDb);

// Helper function to generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { 
      userId: user.id, 
      email: user.email,
      name: `${user.first_name} ${user.last_name}`
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
};

// Helper function to send email - disabled for development
const sendEmail = async (to, subject, html) => {
  try {
    console.log(`Email would be sent to: ${to} with subject: ${subject}`);
    // Email sending disabled for development
    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
};

// SIGNUP ENDPOINT
router.post('/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, company, password } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    // Check if user already exists
    req.db.get('SELECT id FROM users WHERE email = ?', [email], async (err, existingUser) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ message: 'Database error' });
      }

      if (existingUser) {
        return res.status(400).json({ message: 'User with this email already exists' });
      }

      try {
        // Hash password
        const passwordHash = await bcrypt.hash(password, 12);

        // Insert new user
        req.db.run(
          'INSERT INTO users (first_name, last_name, email, company, password_hash) VALUES (?, ?, ?, ?, ?)',
          [firstName, lastName, email, company || null, passwordHash],
          function(err) {
            if (err) {
              console.error('Database error:', err);
              return res.status(500).json({ message: 'Failed to create user' });
            }

            // Get the created user
            req.db.get('SELECT * FROM users WHERE id = ?', [this.lastID], (err, user) => {
              if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ message: 'User created but failed to retrieve' });
              }

              // Generate JWT token
              const token = generateToken(user);

              // Generate OTP for email verification
              const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
              const expiresAt = new Date(Date.now() + 600000); // 10 minutes from now

              // Development mode: Log the verification code
              console.log(`🔐 VERIFICATION CODE for ${email}: ${otp} (expires in 10 minutes)`);

              // Store OTP in email_verifications table
              req.db.run(
                'INSERT INTO email_verifications (email, token, expires_at) VALUES (?, ?, ?)',
                [email, otp, expiresAt.toISOString()],
                (err) => {
                  if (err) {
                    console.error('Database error storing OTP:', err);
                    // Don't fail signup if OTP storage fails
                  }
                  
                  // Send OTP email asynchronously (non-blocking)
                  const otpEmail = `
                    <h2>Verify Your Email - AI Test Master</h2>
                    <p>Hi ${firstName},</p>
                    <p>Thank you for signing up for AI Test Master! To complete your registration, please verify your email address.</p>
                    <p>Your verification code is:</p>
                    <div style="background-color: #f3f4f6; padding: 20px; text-align: center; margin: 20px 0;">
                      <h1 style="color: #2563eb; font-size: 32px; margin: 0; letter-spacing: 8px;">${otp}</h1>
                    </div>
                    <p>This code will expire in 10 minutes.</p>
                    <p>If you didn't create an account with AI Test Master, please ignore this email.</p>
                    <p>Best regards,<br>The AI Test Master Team</p>
                  `;
                  
                  setImmediate(() => {
                    sendEmail(email, 'Verify Your Email - AI Test Master', otpEmail);
                  });
                }
              );

              // Return success response immediately
              res.status(201).json({
                success: true,
                message: 'User created successfully. Please check your email for verification code.',
                requiresVerification: true,
                user: {
                  id: user.id,
                  name: `${user.first_name} ${user.last_name}`,
                  email: user.email,
                  company: user.company,
                  emailVerified: false
                }
              });
            });
          }
        );
      } catch (error) {
        console.error('Password hashing error:', error);
        return res.status(500).json({ message: 'Failed to process password' });
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// LOGIN ENDPOINT
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user
    req.db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ message: 'Database error' });
      }

      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      try {
        // Check password
        const isValidPassword = await bcrypt.compare(password, user.password_hash);
        
        if (!isValidPassword) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = generateToken(user);

        // Update last login time
        req.db.run('UPDATE users SET updated_at = CURRENT_TIMESTAMP WHERE id = ?', [user.id]);

        // Return success response
        res.json({
          message: 'Login successful',
          token,
          user: {
            id: user.id,
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            company: user.company
          }
        });
      } catch (error) {
        console.error('Password comparison error:', error);
        return res.status(500).json({ message: 'Authentication failed' });
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// FORGOT PASSWORD ENDPOINT
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Check if user exists
    req.db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ message: 'Database error' });
      }

      // Always return success to prevent email enumeration
      if (!user) {
        return res.json({ message: 'If an account exists with this email, a reset link has been sent' });
      }

      // Generate reset token
      const resetToken = uuidv4();
      const expiresAt = new Date(Date.now() + 3600000); // 1 hour from now

      // Store reset token
      req.db.run(
        'INSERT INTO password_resets (email, token, expires_at) VALUES (?, ?, ?)',
        [email, resetToken, expiresAt.toISOString()],
        (err) => {
          if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Failed to generate reset token' });
          }

          // Send reset email
          const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:5176'}/reset-password?token=${resetToken}`;
          const resetEmail = `
            <h2>Password Reset Request</h2>
            <p>Hi ${user.first_name},</p>
            <p>You requested to reset your password for your AI Test Master account.</p>
            <p>Click the link below to reset your password:</p>
            <p><a href="${resetLink}" style="background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a></p>
            <p>This link will expire in 1 hour.</p>
            <p>If you didn't request this reset, please ignore this email.</p>
            <p>Best regards,<br>The AI Test Master Team</p>
          `;

          // Send reset email asynchronously (non-blocking)
          setImmediate(() => {
            sendEmail(email, 'Password Reset Request - AI Test Master', resetEmail);
          });

          res.json({ message: 'If an account exists with this email, a reset link has been sent' });
        }
      );
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// RESET PASSWORD ENDPOINT
router.post('/reset-password', async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ message: 'Token and password are required' });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    // Find valid reset token
    req.db.get(
      'SELECT * FROM password_resets WHERE token = ? AND expires_at > datetime("now")',
      [token],
      async (err, resetRecord) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ message: 'Database error' });
        }

        if (!resetRecord) {
          return res.status(400).json({ message: 'Invalid or expired reset token' });
        }

        try {
          // Hash new password
          const passwordHash = await bcrypt.hash(password, 12);

          // Update user password
          req.db.run(
            'UPDATE users SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE email = ?',
            [passwordHash, resetRecord.email],
            (err) => {
              if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ message: 'Failed to update password' });
              }

              // Delete used reset token
              req.db.run('DELETE FROM password_resets WHERE token = ?', [token]);

              res.json({ message: 'Password updated successfully' });
            }
          );
        } catch (error) {
          console.error('Password hashing error:', error);
          return res.status(500).json({ message: 'Failed to process password' });
        }
      }
    );
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// EMAIL VERIFICATION ENDPOINT
router.post('/verify-email', async (req, res) => {
  try {
    const { verificationCode } = req.body;

    if (!verificationCode) {
      return res.status(400).json({ 
        success: false, 
        message: 'Verification code is required' 
      });
    }

    // Find valid OTP
    req.db.get(
      'SELECT * FROM email_verifications WHERE token = ? AND expires_at > datetime("now")',
      [verificationCode],
      (err, otpRecord) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ 
            success: false, 
            message: 'Database error' 
          });
        }

        if (!otpRecord) {
          return res.status(400).json({ 
            success: false, 
            message: 'Invalid or expired verification code' 
          });
        }

        // Update user as verified
        req.db.run(
          'UPDATE users SET email_verified = 1, updated_at = CURRENT_TIMESTAMP WHERE email = ?',
          [otpRecord.email],
          function(err) {
            if (err) {
              console.error('Database error:', err);
              return res.status(500).json({ 
                success: false, 
                message: 'Failed to verify email' 
              });
            }

            // Get user info for token generation
            req.db.get('SELECT * FROM users WHERE email = ?', [otpRecord.email], (err, user) => {
              if (err) {
                console.error('Database error:', err);
                return res.json({ 
                  success: true, 
                  message: 'Email verified successfully' 
                });
              }

              // Generate JWT token for the verified user
              const token = generateToken(user);

              // Delete used OTP
              req.db.run('DELETE FROM email_verifications WHERE email = ?', [otpRecord.email]);

              res.json({ 
                success: true, 
                message: 'Email verified successfully',
                token,
                user: {
                  id: user.id,
                  name: `${user.first_name} ${user.last_name}`,
                  email: user.email,
                  company: user.company
                }
              });
            });
          }
        );
      }
    );
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// RESEND VERIFICATION CODE ENDPOINT
router.post('/resend-verification', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
    }

    // Check if user exists
    req.db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ 
          success: false, 
          message: 'Database error' 
        });
      }

      if (!user) {
        return res.status(404).json({ 
          success: false, 
          message: 'User not found' 
        });
      }

      if (user.email_verified) {
        return res.status(400).json({ 
          success: false, 
          message: 'Email already verified' 
        });
      }

      // Generate new OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date(Date.now() + 600000); // 10 minutes from now

      // Delete old OTPs for this email
      req.db.run('DELETE FROM email_verifications WHERE email = ?', [email], (err) => {
        if (err) {
          console.error('Database error deleting old OTPs:', err);
        }

        // Store new OTP
        req.db.run(
          'INSERT INTO email_verifications (email, token, expires_at) VALUES (?, ?, ?)',
          [email, otp, expiresAt.toISOString()],
          (err) => {
            if (err) {
              console.error('Database error storing new OTP:', err);
              return res.status(500).json({ 
                success: false, 
                message: 'Failed to generate new verification code' 
              });
            }

            // Send new OTP email
            const otpEmail = `
              <h2>Verify Your Email - AI Test Master</h2>
              <p>Hi ${user.first_name},</p>
              <p>You requested a new verification code. Here it is:</p>
              <div style="background-color: #f3f4f6; padding: 20px; text-align: center; margin: 20px 0;">
                <h1 style="color: #2563eb; font-size: 32px; margin: 0; letter-spacing: 8px;">${otp}</h1>
              </div>
              <p>This code will expire in 10 minutes.</p>
              <p>Best regards,<br>The AI Test Master Team</p>
            `;

            setImmediate(() => {
              sendEmail(email, 'New Verification Code - AI Test Master', otpEmail);
            });

            res.json({ 
              success: true, 
              message: 'New verification code sent to your email' 
            });
          }
        );
      });
    });
  } catch (error) {
    console.error('Resend verification error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

module.exports = router;
