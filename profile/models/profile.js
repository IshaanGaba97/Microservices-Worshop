const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userId: String,
    firstName: String,
    lastName: String,
    email: String,
  });
  
const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
  