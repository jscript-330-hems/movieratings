const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  // password:  { type: String, required: true},
  // email: { type: String, unique: true, required: true},
  // roles: { type: [String], required: true }
});


module.exports = mongoose.model("reviews", reviewSchema);