const mongoose = require('mongoose')
require('dotenv').config()
const mongoURI = process.env.MONGO_URL

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
 
    });
    console.log(" Connected to MongoDB Atlas")
  } catch (err) {
    console.error(" MongoDB connection error:", err)
    process.exit(1)
  }
}

module.exports = connectToMongo;
