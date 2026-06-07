/**
 * Aethla Care — Database Seed Script
 * Run: npx ts-node src/database/seed.ts
 */
import * as mongoose from 'mongoose'
import * as bcrypt from 'bcryptjs'
import * as dotenv from 'dotenv'
dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://Aethla:NKQK_3DA6SCM6zT@cluster0.3mvotud.mongodb.net/aethla'

const UserSchema = new mongoose.Schema({
  firstName: String, lastName: String, email: { type: String, unique: true },
  password: String, phone: String, role: String, isActive: { type: Boolean, default: true },
  isVerified: { type: Boolean, default: true },
}, { timestamps: true })

const User = mongoose.model('User', UserSchema)

async function seed() {
  await mongoose.connect(MONGODB_URI)
  console.log('✅ Connected to MongoDB')

  // Create admin user
  const existing = await User.findOne({ email: 'admin@aethlacare.qa' })
  if (!existing) {
    await User.create({
      firstName: 'Admin', lastName: 'User',
      email: 'admin@aethlacare.qa',
      password: await bcrypt.hash('AethlaAdmin@2024!', 12),
      phone: '+97440000000', role: 'admin',
    })
    console.log('✅ Admin user created: admin@aethlacare.qa / AethlaAdmin@2024!')
  } else {
    console.log('ℹ️  Admin user already exists')
  }

  await mongoose.disconnect()
  console.log('✅ Seed complete')
}

seed().catch(console.error)
