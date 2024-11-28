import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Box, Container, Paper } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setError('All fields are required');
    } else {
      setError('');
      alert('Your message has been sent!');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Contact Us
        </Typography>
        <Typography variant="body1" color="textSecondary">
          We would love to hear from you! Please fill out the form below.
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, background: 'linear-gradient(135deg, #e3f2fd, #ffffff)' }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Full Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email Address"
                variant="outlined"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Message"
                variant="outlined"
                multiline
                rows={6}
                fullWidth
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </Grid>
          </Grid>

          {error && (
            <Typography color="error" align="center" sx={{ marginTop: 2 }}>
              {error}
            </Typography>
          )}

          <Box sx={{ textAlign: 'center', marginTop: 3 }}>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              endIcon={<SendIcon />}
              sx={{
                padding: '10px 20px',
                background: 'linear-gradient(45deg, #2196f3, #21cbf3)',
                color: 'white',
                '&:hover': { background: 'linear-gradient(45deg, #21cbf3, #2196f3)' },
              }}
            >
              Send Message
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default ContactPage;
