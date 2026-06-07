// clean.js - Copy paste and run
const { MongoClient } = require('mongodb')

const uri = 'mongodb+srv://Aethla:NKQK_3DA6SCM6zT@cluster0.3mvotud.mongodb.net/'

async function clean() {
  const client = new MongoClient(uri)
  try {
    await client.connect()
    const db = client.db('aethla_care')
    
    console.log('Cleaning database...')
    
    // Delete all caregivers
    const caregivers = await db.collection('caregivers').deleteMany({})
    console.log(`Deleted ${caregivers.deletedCount} caregivers`)
    
    // Delete all non-admin users
    const users = await db.collection('users').deleteMany({ 
      email: { $ne: 'admin@aethlacare.qa' } 
    })
    console.log(`Deleted ${users.deletedCount} users`)
    
    console.log('✅ Database cleaned! Now restart your backend and add new caregiver.')
    
  } catch (err) {
    console.error('Error:', err)
  } finally {
    await client.close()
  }
}

clean()