require('dotenv').config();
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const dns = require('dns');

dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const User = require('./models/userModel');
    const email = 'websiteshubham8@gmail.com';
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash('Shubh@12345', salt);

    const user = await User.findOneAndUpdate(
      { email },
      { name: 'Shubham Gupta', email, password: hashedPassword, role: 'admin' },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    console.log('Admin user ready:', user.email, 'Role:', user.role);

    // Remove legacy demo users
    const delRes = await User.deleteMany({ email: { $in: ['admin1@suchamojo.com', 'admin2@suchamojo.com'] } });
    console.log('Removed demo users count:', delRes.deletedCount);

    const currentUsers = await User.find({}, '-password');
    console.log('Active users in database:', currentUsers);

    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();

