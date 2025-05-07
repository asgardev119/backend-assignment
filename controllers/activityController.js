const Activity = require('../models/Activity');

exports.getActivities = async (req, res, next) => {
  try {
    const activities = await Activity.find();
    res.status(200).json({ success: true, data: activities });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


exports.addActivity = async (req, res) => {
  try {
    const { title, description, location} = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Title is required' });
    }
    
    if (!description || !description.trim()) {
      return res.status(400).json({ message: 'Description is required' });
    }
    
    if (!location || !location.trim()) {
      return res.status(400).json({ message: 'Location is required' });
    }    

    const activity = await Activity.create({ 
      title: title.trim(), 
      description: description.trim(), 
      location: location.trim(),
   
    });
    res.status(201).json(activity);
  } catch (err) {
    console.error('Error adding activity:', err);
    res.status(500).json({ message: 'Server error' });
  }
};