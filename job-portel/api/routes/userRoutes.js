const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const User = require('../models/user');

const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Folder where images will be saved
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Create a unique file name
  },
});

const upload = multer({ storage });

// Middleware to verify JWT token
const authenticateToken = async (req, res, next) => {
  const token = req.headers.token; // Extract token
  if (!token) {
    return res.status(403).json({ message: 'Access denied. No token provided.' });
  }

  try {
    console.log(token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = decoded; // Attach decoded user data to request
    next();
  } catch (err) {
    console.error('Token verification error:', err.message);
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

// Middleware to authorize specific roles
const authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.user.type !== role) {
      return res.status(403).json({ message: 'Access forbidden: insufficient permissions.' });
    }
    next();
  };
};

// POST /login - Authenticate User
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign(
      { userId: user._id, type: user.type },
      process.env.JWT_SECRET);

    res.json({
      message: 'Login successful.',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        type: user.type,
        organization: user.organization,
        profileImage: user.profileImage,
      },
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Server error during login.' });
  }
});

// POST /register - Register a new user
router.post('/register', upload.single('profileImage'), async (req, res) => {
  const { fullName, email, password, type, phone, city, country, organization } = req.body;
  const imagePath = req.file ? req.file.path : '';

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      type,
      phone,
      city,
      country,
      organization,
      profileImage: imagePath,
    });

    await newUser.save();

    res.status(201).json({
      message: 'User registered successfully.',
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        type: newUser.type,
        phone: newUser.phone,
        city: newUser.city,
        country: newUser.country,
        organization: newUser.organization,
        profileImage: newUser.profileImage,
      },
    });
  } catch (err) {
    console.error('Registration error:', err.message);
    res.status(500).json({ message: 'Error registering user.' });
  }
});

// GET /users - Fetch all users (Admin only)
router.get('/users', authenticateToken, authorizeRole('admin'), async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Exclude passwords
    res.status(200).json({
      status: 'success',
      users,
    });
  } catch (err) {
    console.error('Error fetching users:', err.message);
    res.status(500).json({ message: 'Error fetching users.' });
  }
});

// GET /admin - Admin-specific route
router.get('/admin', authenticateToken, authorizeRole('admin'), (req, res) => {
  res.json({ message: 'Welcome to the admin page!' });
});

// GET /employee - Employee-specific route
router.get('/employee', authenticateToken, authorizeRole('employee'), (req, res) => {
  res.json({ message: 'Welcome to the employee page!' });
});

module.exports = router;
