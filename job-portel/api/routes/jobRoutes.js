const express = require('express');
const Job = require('../models/job'); // Job model
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');

const router = express.Router();

// POST /create/job - Admins create a new job posting
router.post('/create/job', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const { companyName, jobTitle, description, salary } = req.body;

  if (!companyName || !jobTitle || !description || !salary) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const job = new Job({
      companyName,
      jobTitle,
      description,
      salary,
      createdBy: req.user.userId
    });

    await job.save();
    res.status(201).json({ message: 'Job created successfully.', job });
  } catch (err) {
    console.error('Error creating job:', err.message);
    res.status(500).json({ message: 'Server error creating job.' });
  }
});

// GET /jobs - Employee retrieves the list of available jobs with pagination
router.get('/jobs', authenticateToken, authorizeRole('employee'), async (req, res) => {
  try {
    // Extract query parameters for pagination
    const page = Math.max(1, parseInt(req.query.page) || 1); // Ensure page is at least 1
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 10)); // Limit to a max of 50 items per page
    const skip = (page - 1) * limit;

    // Retrieve total count of jobs
    const totalJobs = await Job.countDocuments();

    // Fetch paginated jobs
    const jobs = await Job.find()
      .sort({ createdAt: -1 }) // Sort by newest first
      .skip(skip) // Skip documents for previous pages
      .limit(limit) // Limit the number of documents returned
      .select('-__v'); // Exclude unnecessary fields

    // Calculate total pages
    const totalPages = Math.ceil(totalJobs / limit);

    // Respond with paginated data
    res.status(200).json({
      status: 'success',
      page,
      totalPages,
      totalJobs,
      jobs,
    });
  } catch (err) {
    console.error('Error fetching jobs with pagination:', err.message);
    res.status(500).json({ message: 'Server error fetching jobs.' });
  }
});

module.exports = router;
