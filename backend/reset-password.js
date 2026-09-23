require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const [email, newPassword] = process.argv.slice(2);

(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  const user = await User.findOne({ email });
  if (!user) {
    console.log('No user with that email');
  } else {
    user.password = newPassword;
    await user.save();
    console.log('Password updated for', user.email);
  }
  await mongoose.disconnect();
})();