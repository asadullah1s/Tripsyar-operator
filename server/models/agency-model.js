const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const agencySchema = new mongoose.Schema({
  // Personal Info
  salutation: String,
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  jobTitle: String,
  
  // Address
  country: String,
  city: String,
  address: String,
  
  // Company Details
  companyName: String,
  companyAddress: String,
  businessType: String,
  secpStatus: String,
  ptdcStatus: String,
  companyCity: String,
  province: String,
  postalCode: String,
  companyCountry: String,
  companyPhone: String,
  companyPhone2: String,
  companyPhone3: String,
  companyEmail: String,
  
  // Additional Data
  socialMediaDetails: [{
    platform: String, // e.g., "Website", "Instagram", "Facebook", "TikTok"
    url: String,
    rating: Number,
    likes: Number,
    followers: Number
  }],
  
  tourDetails: [{
    name: String,
    source: String,
    destination: String,
    price: Number
  }]
});


agencySchema.methods.generateAuthToken = function() {
  return jwt.sign(
    { 
      _id: this._id.toString(),
      companyEmail: this.companyEmail,
      companyName: this.companyName
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: '30d' }
  );
};

const Agency = mongoose.model('Agency', agencySchema);

module.exports = Agency;