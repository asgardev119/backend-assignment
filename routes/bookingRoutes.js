const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); 

const { bookActivity, getUserBookings } = require('../controllers/bookingController');

router.post('/', protect, bookActivity);
router.get('/me', protect, getUserBookings); 

module.exports = router;
