/**
 * Aethla Care — Database Seed Script
 *
 * Run karo: node seed.js
 * (backend folder mein se)
 */

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://Aethla:NKQK_3DA6SCM6zT@cluster0.3mvotud.mongodb.net/aethla_care'

const UserSchema = new mongoose.Schema({
  firstName:   String,
  lastName:    String,
  email:       { type: String, unique: true, lowercase: true },
  password:    String,
  phone:       String,
  role:        { type: String, default: 'admin' },
  isActive:    { type: Boolean, default: true },
  isVerified:  { type: Boolean, default: true },
}, { timestamps: true })

const User = mongoose.model('User', UserSchema)

async function seed() {
  console.log('\n🌱 Aethla Care — Database Seed\n')

  try {
    console.log('📡 Connecting to MongoDB Atlas...')
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 15000 })
    console.log('✅ Connected to MongoDB!\n')

    // ── Admin User ─────────────────────────────────────
    const adminEmail = 'admin@aethlacare.qa'
    const existing = await User.findOne({ email: adminEmail })

    if (existing) {
      console.log('ℹ️  Admin user already exists:', adminEmail)
    } else {
      const hashedPassword = await bcrypt.hash('AethlaAdmin@2024!', 12)
      await User.create({
        firstName:  'Admin',
        lastName:   'User',
        email:      adminEmail,
        password:   hashedPassword,
        phone:      '+97440000000',
        role:       'admin',
      })
      console.log('✅ Admin user created!')
      console.log('   Email:    admin@aethlacare.qa')
      console.log('   Password: AethlaAdmin@2024!\n')
    }

    // ── Coordinator User ───────────────────────────────
    const coordEmail = 'coordinator@aethlacare.qa'
    const coordExists = await User.findOne({ email: coordEmail })
    if (!coordExists) {
      const hashedPassword = await bcrypt.hash('AethlaCoord@2024!', 12)
      await User.create({
        firstName: 'Care', lastName: 'Coordinator',
        email: coordEmail,
        password: hashedPassword,
        phone: '+97450000001',
        role: 'coordinator',
      })
      console.log('✅ Coordinator user created!')
      console.log('   Email:    coordinator@aethlacare.qa')
      console.log('   Password: AethlaCoord@2024!\n')
    }

    console.log('🎉 Seed complete! You can now login to the admin panel.')
    console.log('   URL: http://localhost:3000/admin/login\n')

  } catch (err) {
    console.error('❌ Seed failed:', err.message)
    console.log('\n💡 Make sure:')
    console.log('   1. MongoDB Atlas → Network Access → Allow 0.0.0.0/0')
    console.log('   2. Your internet is connected')
  } finally {
    await mongoose.disconnect()
    process.exit(0)
  }
}

seed()
