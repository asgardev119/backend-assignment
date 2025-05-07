const Booking = require("../models/Booking")

exports.getUserBookings = async (req, res, next) => { 
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('activity');
    res.status(200).json({ success: true, data: bookings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.bookActivity = async (req, res, next) => {
  try {
    const { activityId } = req.body;

    if (!activityId) {
      return res.status(400).json({ success: false, message: 'Activity ID is required' });
    }

    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({ success: false, message: 'Activity not found' });
    }

    const booking = await Booking.create({
      user: req.user.id,
      activity: activityId,
    });

    res.status(201).json({ success: true, data: booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};