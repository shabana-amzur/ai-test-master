// Quick script to generate a test verification code
const otp = Math.floor(100000 + Math.random() * 900000).toString();
console.log('🔐 TEST VERIFICATION CODE:', otp);
console.log('📧 Use this code on your verification page');
console.log('⏰ Valid for the next 10 minutes');
console.log('');
console.log('COPY THIS CODE:', otp);
