const express = require('express');
const router = express.Router({ mergeParams: true });
const { applyForJob, getJobApplicants, getAppliedJobs } = require('../controllers/applicationController');
const { protect, authorize } = require('../middleware/authMiddleware');

// For routes like /api/jobs/:jobId/apply
router.post('/apply', protect, authorize('seeker'), applyForJob);

// For routes like /api/jobs/:jobId/applicants
router.get('/applicants', protect, authorize('recruiter'), getJobApplicants);

// For /api/applications (no jobId parameter)
router.get('/', protect, authorize('seeker'), getAppliedJobs);

module.exports = router;
