// reset-caregivers.js
const mongoose = require('mongoose')
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://Aethla:NKQK_3DA6SCM6zT@cluster0.3mvotud.mongodb.net/aethla_care'

const CaregiverSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.Mixed, // Temporary to see all types
}, { strict: false })

const Caregiver = mongoose.model('Caregiver', CaregiverSchema)

async function reset() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('Connected to MongoDB')
    
    // Find all caregivers
    const all = await Caregiver.find({})
    console.log(`Found ${all.length} caregivers`)
    
    // Show corrupt ones
    const corrupt = all.filter(c => typeof c.userId === 'object' && c.userId !== null && !c.userId._id)
    console.log(`Corrupt caregivers (userId as object): ${corrupt.length}`)
    
    if (corrupt.length > 0) {
      console.log('Sample corrupt data:', JSON.stringify(corrupt[0], null, 2))
    }
    
    // Delete all caregivers
    const result = await Caregiver.deleteMany({})
    console.log(`Deleted ${result.deletedCount} caregivers`)
    
    console.log('\n✅ Reset complete! Now add new caregivers from frontend.')
    
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await mongoose.disconnect()
    process.exit(0)
  }
}

reset()