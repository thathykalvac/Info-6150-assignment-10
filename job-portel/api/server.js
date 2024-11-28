const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const User = require('./models/user');
const userRouter = require('./routes/userRoutes');
const jobRouter = require('./routes/jobRoutes'); // Import job routes
dotenv.config(); // Load environment variables from .env

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// MongoDB connection using MONGO_URI from .env
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err.message));

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Extract token
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = decoded; // Attach user data to request
    next();
  } catch (err) {
    console.error('JWT verification error:', err.message);
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

// Middleware to authorize roles
const authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.user.type !== role) {
      return res.status(403).json({ message: 'Access forbidden: insufficient permissions.' });
    }
    next();
  };
};

// Welcome Route
app.get('/', (req, res) => {
  res.send('Welcome to the Job Portal API!');
});

// User Routes
app.use('/api', userRouter);
app.use('/api', jobRouter);
// Serve uploaded images from "uploads" folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API endpoint to get all users (Admin only)
app.get('/api/users', authenticateToken, authorizeRole('admin'), async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Exclude password field
    res.status(200).json({
      status: 'success',
      users,
    });
  } catch (err) {
    console.error('Error fetching users:', err.message);
    res.status(500).json({ message: 'Server error fetching users.' });
  }
});

// API endpoint to get unique company details dynamically
app.get('/api/companies', async (req, res) => {
  try {
    const matchedUsers = await User.find({ organization: { $ne: null }, profileImage: { $ne: null } });
    console.log('Matched Users:', matchedUsers); // Log matched documents

    const uniqueCompanies = await User.aggregate([
      { $match: { organization: { $ne: null }, profileImage: { $ne: null } } },
      {
        $group: {
          _id: '$organization',
          profileImage: { $first: '$profileImage' },
        },
      },
      {
        $project: {
          _id: 0,
          companyName: '$_id',
          imageUrl: { $concat: [`http://localhost:${PORT}/`, '$profileImage'] },
        },
      },
    ]);
    console.log('Unique Companies:', uniqueCompanies); // Log final output

    res.status(200).json(uniqueCompanies);
  } catch (err) {
    console.error('Error fetching unique companies:', err.message);
    res.status(500).json({ message: 'Server error fetching companies.' });
  }
});



// Protected Admin Route
app.get('/api/admin', authenticateToken, authorizeRole('admin'), (req, res) => {
  res.status(200).json({ message: 'Welcome to the Admin Page!' });
});

// Protected Employee Route
app.get('/api/employee', authenticateToken, authorizeRole('employee'), (req, res) => {
  res.status(200).json({ message: 'Welcome to the Employee Page!' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
