const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database setup
const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

console.log('🗑️  Clearing test data from database...');

db.serialize(() => {
  // Delete all email verifications
  db.run('DELETE FROM email_verifications', (err) => {
    if (err) {
      console.error('Error deleting email verifications:', err);
    } else {
      console.log('✅ Cleared email_verifications table');
    }
  });

  // Delete all password resets
  db.run('DELETE FROM password_resets', (err) => {
    if (err) {
      console.error('Error deleting password resets:', err);
    } else {
      console.log('✅ Cleared password_resets table');
    }
  });

  // Delete all users
  db.run('DELETE FROM users', (err) => {
    if (err) {
      console.error('Error deleting users:', err);
    } else {
      console.log('✅ Cleared users table');
    }
  });

  // Reset auto-increment counters
  db.run('DELETE FROM sqlite_sequence WHERE name IN ("users", "email_verifications", "password_resets")', (err) => {
    if (err) {
      console.error('Error resetting sequences:', err);
    } else {
      console.log('✅ Reset auto-increment counters');
    }
  });
});

// Close database and exit
db.close((err) => {
  if (err) {
    console.error('Error closing database:', err);
  } else {
    console.log('🎉 Database cleared successfully! All test users removed.');
    console.log('💡 You can now test signup with fresh data.');
  }
  process.exit(0);
});
