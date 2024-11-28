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
              image="https://via.placeholder.com/350x140.png?text=About+Us"
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
              image="https://via.placeholder.com/350x140.png?text=Job+Seekers"
              alt="Job Seekers"
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
              image="https://via.placeholder.com/350x140.png?text=Contact+Us"
              alt="Contact Us"
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
