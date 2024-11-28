const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  try {
    // Extract token from the Authorization header
    const token = req.headers.token;
    // if (!authHeader) {
    //   return res.status(403).json({ message: 'Authorization header missing' });
    // }

    // Token format: "Bearer <token>"
    
    if (!token) {
      return res.status(403).json({ message: 'Token missing from Authorization header' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded token data to the request object
    req.user = decoded; // Contains userId, type, and other token payload data

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    console.error('Token verification failed:', err.message); // Log error for debugging

    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired' });
    } else if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }

    res.status(500).json({ message: 'Failed to authenticate token' });
  }
};

// Middleware to authorize specific roles
const authorizeRole = (role) => {
  return (req, res, next) => {
    if (!req.user || req.user.type !== role) {
      return res.status(403).json({ message: 'Access forbidden: insufficient permissions.' });
    }
    next();
  };
};

module.exports = { authenticateToken, authorizeRole };
