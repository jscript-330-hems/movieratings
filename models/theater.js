const mongoose = require('mongoose');

const theaterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  movies: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'movies' }], required: true },
  zip: { type: Number, required: true }
});

module.exports = mongoose.model("theaters", theaterSchema);