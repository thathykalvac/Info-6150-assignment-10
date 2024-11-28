const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authenticateUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  // Generate JWT Token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  return { token, user };
};

// Register user with new fields
const registerUser = async (fullName, email, password, type, phone, city, country, organization, imagePath) => {
  // Check if the email is already in use
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email already in use');
  }

  // Hash the password before saving it to MongoDB
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create and save the new user with the additional fields
  const newUser = new User({
    fullName,
    email,
    password: hashedPassword,
    type,          // New field for user type
    phone,         // New field for phone number
    city,          // New field for city
    country,       // New field for country
    organization,  // New field for organization
    profileImage: imagePath, // New field for image path
  });

  await newUser.save();
  return newUser;
};

module.exports = { authenticateUser, registerUser };
