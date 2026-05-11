const express = require('express');
const router = express.Router();
const {
  registerForEvent,
  getMyRegistrations,
  getEventRegistrations,
} = require('../controllers/registrationController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, registerForEvent);

router.route('/my')
  .get(protect, getMyRegistrations);

router.route('/event/:eventId')
  .get(protect, admin, getEventRegistrations);

module.exports = router;
