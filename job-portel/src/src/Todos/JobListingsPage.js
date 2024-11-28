import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Typography,
  Grid,
  Box,
  Container,
  Card,
  CardContent,
  Button,
  CardActions,
  Pagination,
} from '@mui/material';

const JobListingsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchJobs = async (currentPage) => {
    try {
      const token = localStorage.getItem('token'); // Get token from localStorage
      const response = await axios.get(`http://localhost:3000/api/jobs?page=${currentPage}&limit=10`, {
        headers: { token: `${token}` },
      });

      setJobs(response.data.jobs);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      console.error('Error fetching jobs:', err.message);
    }
  };

  useEffect(() => {
    fetchJobs(page);
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Container maxWidth="lg" sx={{ paddingTop: 5 }}>
      <Typography variant="h4" gutterBottom>
        Job Listings
      </Typography>

      <Grid container spacing={4}>
        {jobs.map((job) => (
          <Grid item xs={12} sm={6} md={4} key={job._id}>
            <Card sx={{ minHeight: '200px', border: '1px solid #e0e0e0', ':hover': { boxShadow: 3 } }}>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  {job.jobTitle}
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  {job.description}
                </Typography>
                <Typography variant="body2" color="textPrimary">
                  Company: {job.companyName}
                </Typography>
                <Typography variant="body2" color="textPrimary">
                  Salary: ${job.salary}
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="primary">
                  Apply Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Container>
  );
};

export default JobListingsPage;
