const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  countryCode: String,
  phoneCode: String,
  firstName: String,
  lastName: String,
  phoneNumber: String,
  contactPicture: String,
  isFavorite: Boolean,
})

mongoose.model('Contact', contactSchema)
