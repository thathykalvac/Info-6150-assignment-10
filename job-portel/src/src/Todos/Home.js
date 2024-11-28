import React from 'react';
import { Typography, Grid, Box, Container, Button, Card, CardContent, CardActions, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import {
  Home as HomeIcon,
  Info as InfoIcon,
  Work as WorkIcon,
  ContactMail as ContactMailIcon,
} from '@mui/icons-material';

const Home = () => {
  return (
    <Container maxWidth="lg" sx={{ paddingTop: 5 }}>
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: 'center',
          marginBottom: 5,
          backgroundImage: 'linear-gradient(to right, #6a11cb, #2575fc)',
          color: 'white',
          padding: 5,
          borderRadius: 2,
        }}
      >
        <Typography variant="h3" gutterBottom>
          Welcome to Job Portal
        </Typography>
        <Typography variant="h6" paragraph>
          Find your dream job or discover exceptional talent with ease. Start today!
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{ backgroundColor: '#ff9800', ':hover': { backgroundColor: '#e65100' } }}
          component={Link}
          to="/job-listings"
          startIcon={<WorkIcon />}
        >
          Explore Jobs
        </Button>
      </Box>

      {/* Feature Cards */}
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ minHeight: '350px', border: '1px solid #e0e0e0', ':hover': { boxShadow: 3 } }}>
            <CardMedia
              component="img"
              height="140"
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa8nO0U6R7r0ewjo9DSc_lq_me2BahI6fzxQ&s"
              alt="About Us"
            />
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                About Us
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                Learn about our mission, vision, and how we connect talent with opportunities.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="outlined"
                color="primary"
                component={Link}
                to="/about"
                startIcon={<InfoIcon />}
              >
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ minHeight: '350px', border: '1px solid #e0e0e0', ':hover': { boxShadow: 3 } }}>
            <CardMedia
              component="img"
              height="140"
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJw_-TUiPyMcA21ChnfABfZ6CfXn-v8A8WDg&s"              alt="Job Seekers"
            />
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Job Seekers
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                Browse job listings and apply to companies that align with your goals.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="outlined"
                color="primary"
                component={Link}
                to="/job-listings"
                startIcon={<WorkIcon />}
              >
                Explore Jobs
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ minHeight: '350px', border: '1px solid #e0e0e0', ':hover': { boxShadow: 3 } }}>
            <CardMedia
              component="img"
              height="140"
              image="data:image/jpeg;base64,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"              alt="Contact Us"
            />
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Contact Us
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                Need help? Reach out to our support team for assistance.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="outlined"
                color="primary"
                component={Link}
                to="/contact"
                startIcon={<ContactMailIcon />}
              >
                Contact Us
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      {/* Footer Section */}
      <Box
        sx={{
          marginTop: 5,
          padding: 3,
          textAlign: 'center',
          backgroundColor: '#f4f4f4',
          borderTop: '1px solid #ddd',
        }}
      >
        <Typography variant="h6" gutterBottom>
          Contact Information
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Email: support@jobportal.com | Phone: +1 (123) 456-7890
        </Typography>
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="body2" color="textSecondary">
            Follow us on:
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: 1 }}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </Box>
        </Box>
        <Typography variant="body2" color="textSecondary" sx={{ marginTop: 2 }}>
          © {new Date().getFullYear()} Job Portal. All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;
