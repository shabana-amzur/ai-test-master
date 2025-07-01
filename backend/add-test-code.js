const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Get email from command line argument
const email = process.argv[2] || 'test@example.com';
const code = '354419'; // Fixed test code
const expiresAt = new Date(Date.now() + 600000); // 10 minutes from now

// Database setup
const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

console.log(`🔐 Adding test verification code for: ${email}`);
console.log(`📧 Verification code: ${code}`);

// Delete any existing codes for this email
db.run('DELETE FROM email_verifications WHERE email = ?', [email], (err) => {
  if (err) {
    console.error('Error deleting old codes:', err);
    return;
  }
  
  // Insert new verification code
  db.run(
    'INSERT INTO email_verifications (email, token, expires_at) VALUES (?, ?, ?)',
    [email, code, expiresAt.toISOString()],
    function(err) {
      if (err) {
        console.error('Error inserting verification code:', err);
        return;
      }
      
      console.log('✅ Test verification code added successfully!');
      console.log('');
      console.log('📋 NOW YOU CAN:');
      console.log('1. Go to your verification page');
      console.log('2. Enter this code: ' + code);
      console.log('3. Complete the verification process');
      
      db.close();
    }
  );
});
