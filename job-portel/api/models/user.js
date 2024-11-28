const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { 
    type: String, 
    required: true, 
    match: /^[A-Za-z\s]+$/, // Ensure it only contains alphabetic characters and spaces
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ // Ensure a valid email format
  },
  password: { 
    type: String, 
    required: true, // No validation for password length or format
  },
  confirmPassword: { 
    type: String, 
    required: false 
  }, 
  type: { 
    type: String, 
    required: true, 
    enum: ['employee', 'admin'] // Only these values are allowed
  },
  phone: { 
    type: String, 
    validate: {
      validator: function(value) {
        return /^\+?\d{10,15}$/.test(value); // Validate phone number format (10-15 digits with optional country code)
      },
      message: 'Invalid phone number format'
    },
    required: false
  },
  city: { 
    type: String, 
    match: /^[A-Za-z\s]+$/, // Ensure it only contains alphabetic characters and spaces
    required: false
  },
  country: { 
    type: String, 
    match: /^[A-Za-z\s]+$/, // Ensure it only contains alphabetic characters and spaces
    required: false
  },
  organization: { 
    type: String, 
    match: /^[A-Za-z0-9&\-]+$/, // Validate for alphanumeric and special characters like &, -
    required: false
  },
  profileImage: { 
    type: String, 
    default: null, // Default value is null if no image is uploaded
    required: false 
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
