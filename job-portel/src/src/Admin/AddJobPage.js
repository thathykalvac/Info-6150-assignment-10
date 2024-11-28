import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Paper, Box, Alert } from '@mui/material';
import axios from 'axios';

const AddJobPage = () => {
  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [description, setDescription] = useState('');
  const [salary, setSalary] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate input fields
    if (!companyName || !jobTitle || !description || !salary) {
      setError('All fields are required.');
      return;
    }

    try {
      const token = localStorage.getItem('token'); // Get admin token
      const response = await axios.post(
        'http://localhost:3000/api/create/job',
        { companyName, jobTitle, description, salary: parseFloat(salary) },
        { headers: { token: `${token}` } } // Add token to request headers
      );

      setSuccess('Job added successfully!');
      setCompanyName('');
      setJobTitle('');
      setDescription('');
      setSalary('');
    } catch (err) {
      console.error('Error adding job:', err.response || err.message);
      setError('Failed to add job. Please try again later.');
    }
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Add Job
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Job Title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Salary"
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            margin="normal"
            required
          />
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Button type="submit" variant="contained" color="primary" sx={{ width: '100%' }}>
              Add Job
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default AddJobPage;
