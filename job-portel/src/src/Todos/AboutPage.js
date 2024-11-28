// src/Todos/AboutPage.js
import React from 'react';
import { Typography, Box, Container, Grid, Paper, Button, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { Info as InfoIcon, Group as TeamIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

const AboutPage = () => {
  return (
    <Container maxWidth="lg" sx={{ paddingTop: 5 }}>
      <Box sx={{ textAlign: 'center', marginBottom: 5 }}>
        <Typography variant="h3" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
          About Us
        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph>
          We are dedicated to helping individuals find their ideal jobs and assisting businesses in finding the best talent.
        </Typography>
      </Box>

      {/* FAQ Section */}
      <div>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
          Frequently Asked Questions
        </Typography>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography variant="h6">How do I apply for a job?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              To apply for a job, simply visit the job listings page, click on the "Apply Now" button for the job you are interested in. You will be redirected to the external application page where you can submit your application.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
            <Typography variant="h6">Can I apply to multiple jobs at once?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Yes, you can apply to as many jobs as you'd like. Each job has its own application link, and you can apply to them individually by clicking the respective "Apply Now" buttons.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3a-content" id="panel3a-header">
            <Typography variant="h6">How often are job listings updated?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Job listings are updated regularly to ensure you have access to the latest opportunities. New job listings are added frequently, and existing listings are updated as necessary.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel4a-content" id="panel4a-header">
            <Typography variant="h6">Can I filter job listings by skill or salary?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Currently, the platform does not provide filters for skills or salary, but we plan to implement advanced filtering features in future updates to help you find the perfect job based on your preferences.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel5a-content" id="panel5a-header">
            <Typography variant="h6">Do I need to create an account to apply for jobs?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              No, you do not need to create an account to apply for jobs. Simply visit the job listing page and click on the "Apply Now" button to be directed to the application site. However, we may add account features in the future to improve user experience.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>

      {/* Mission and Team Section */}
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <Paper 
            sx={{ 
              padding: 3, 
              textAlign: 'center', 
              backgroundColor: '#e3f2fd', 
              boxShadow: 3, 
              borderRadius: 2 
            }}
          >
            <Typography 
              variant="h5" 
              component="div" 
              sx={{ color: '#1565c0', fontWeight: 'bold' }}
            >
              Our Mission
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              We simplify job hunting by providing a seamless platform for job seekers and employers alike.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<InfoIcon />}
              href="/job-listings"
              sx={{ borderRadius: 50, paddingX: 3 }}
            >
              Start Exploring
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper 
            sx={{ 
              padding: 3, 
              textAlign: 'center', 
              backgroundColor: '#ede7f6', 
              boxShadow: 3, 
              borderRadius: 2 
            }}
          >
            <Typography 
              variant="h5" 
              component="div" 
              sx={{ color: '#4527a0', fontWeight: 'bold' }}
            >
              Our Team
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              A diverse group of professionals committed to innovation and excellence in job matching.
            </Typography>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<TeamIcon />}
              href="/contact"
              sx={{ borderRadius: 50, paddingX: 3 }}
            >
              Get in Touch
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutPage;
