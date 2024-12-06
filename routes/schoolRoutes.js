const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/schoolController');

// Add School route
router.post('/addSchool', schoolController.addSchool);

// List Schools route
router.get('/listSchools', schoolController.listSchools);

module.exports = router;
