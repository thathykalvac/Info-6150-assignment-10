import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { login } from '../redux/authSlice'; // Import the login action
import { TextField, Button, Typography, Container, Paper, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch(); // Get the dispatch function from Redux
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        email,
        password,
      });

      // Store the JWT token in localStorage
      localStorage.setItem('token', response.data.token);

      // Dispatch the user data to Redux
      dispatch(login({ role: response.data.user.type }));

      // Redirect the user based on role
      if (response.data.user.type === 'admin') {
        navigate('/admin/employees');
      } else {
        navigate('/home');
      }
    } catch (err) {
      setError(err.response ? err.response.data.message : 'An error occurred. Please try again.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper sx={{ padding: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>

        {/* Display error message if login fails */}
        {error && (
          <Typography color="error" variant="body2" align="center" sx={{ marginBottom: 2 }}>
            {error}
          </Typography>
        )}

        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
            autoFocus
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
          />
          <Box sx={{ textAlign: 'center', marginTop: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: '100%' }}
            >
              Login
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginPage;
