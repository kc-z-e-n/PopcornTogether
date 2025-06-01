const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  dateOfBirth: { type: Date },
  password: { type: String, required: true },
  agreedToTerms: { type: Boolean, required: true },
});

module.exports = mongoose.model('User', userSchema);
