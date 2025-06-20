const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  username: { type: String, required: true, unique: true },
  dateOfBirth: { type: Date },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  agreedToTerms: { type: Boolean, required: true },
  watchedlistMovies: [{type: Number}],
  wishlistMovies: [{type: Number}],
  friends: [{ type: Schema.Types.ObjectId, ref:"User" }]
});

module.exports = mongoose.model('User', userSchema);
