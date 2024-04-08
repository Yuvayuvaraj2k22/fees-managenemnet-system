const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/facultycontroller');

router.post('/register', facultyController.registerFaculty);
router.post('/login', facultyController.loginFaculty);
router.get('/details', facultyController.getFacultyDetails);
router.get('/profile', facultyController.getFacultyProfile);

module.exports = router;
