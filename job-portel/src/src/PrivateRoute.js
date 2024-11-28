import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // Redirect to Login if no token
    return <Navigate to="/" />;
  }

  try {
    // Decode token to check role
    const decodedToken = jwtDecode(token);

    // Check for token expiration
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp && decodedToken.exp < currentTime) {
      console.error('Token has expired');
      return <Navigate to="/" />;
    }

    // Check for role authorization
    if (requiredRole && decodedToken.type !== requiredRole) {
      return <Navigate to="/unauthorized" />;
    }

    // Render children if authenticated and authorized
    return children;
  } catch (err) {
    console.error('Error decoding token:', err.message);
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
