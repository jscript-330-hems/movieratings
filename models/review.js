const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'movie', required: true },
  review:  { type: String, required: true },
});

module.exports = mongoose.model("reviews", reviewSchema);