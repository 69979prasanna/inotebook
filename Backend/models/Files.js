const mongoose = require('mongoose')
const { Schema } = mongoose

const FileSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  filename: { type: String, required: true },
  fileType: { type: String },
  fileUrl: { type: String, required: true }, 
  uploadedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('File', FileSchema)
