import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, Typography, Box, CircularProgress, Alert } from '@mui/material';

const CompanyShowcase = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State for handling errors

  useEffect(() => {
    // Fetch company data from the API
    fetch('http://localhost:3000/api/companies')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch company data');
        }
        return response.json();
      })
      .then((data) => {
        setCompanies(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching companies:', error);
        setError('Could not load company data. Please try again later.');
        setLoading(false); // Stop loading on error
      });
  }, []);

  return (
    <Container component="main" maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: 'bold', color: '#1565c0' }}
      >
        Company Showcase
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        sx={{ color: '#666', mb: 4 }}
      >
        Discover the top companies in the industry
      </Typography>

      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '60vh',
          }}
        >
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mt: 4 }}>
          {error}
        </Alert>
      ) : companies.length === 0 ? (
        <Typography
          variant="h6"
          align="center"
          sx={{ mt: 4, color: '#757575' }}
        >
          No companies to display at the moment.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {companies.map((company, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={8}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': { transform: 'scale(1.03)', boxShadow: 16 },
                }}
              >
                <Box
                  component="img"
                  src={company.imageUrl}
                  alt={company.companyName}
                  sx={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 'bold', color: '#37474f', mt: 2 }}
                >
                  {company.companyName}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: '#757575', mt: 1 }}
                >
                  
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default CompanyShowcase;
