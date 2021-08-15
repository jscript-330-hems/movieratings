const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  actors: { type: [String], required: true },
  genre: { type: [String], required: true },
  synopsis: { type: String, required: true },
  rating: { type: String, required: true },
  releaseYear: { type: Number, required: true },
  moviePicUrl: { type: String },
  theaters: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'theaters' }] }
});

movieSchema.index({ title: 'text', genre: 'text', synopsis: 'text' });

module.exports = mongoose.model("movies", movieSchema);