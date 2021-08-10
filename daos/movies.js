const mongoose = require('mongoose');
const Movie = require('../models/movie');

module.exports = {}

module.exports.create = async (movieObj) => {
  try {
    const created = await Movie.create(movieObj);
    return created;
  } catch (e) {
    throw e;
  }
}

// To be updated with aggregation later
module.exports.getMovieById = async (movieId) => {
  if (!mongoose.Types.ObjectId.isValid(movieId)) {
    return null;
  } else {
    try {
      return await Movie.findOne({ _id: movieId }).lean();
    } catch (e) {
      throw e;
    }
  }
}

// To be updated with aggregation later
module.exports.getAllMovies = async (page, perPage) => {
  try {
    return await Movie.find().limit(perPage).skip(perPage*page).lean();
  } catch (e) {
    throw e;
  }
}

module.exports.updateMovie = async (movieId, newObj) => {
  if (!mongoose.Types.ObjectId.isValid(movieId)) {
      return false;
  } else {
    try {
      await Movie.updateOne({ _id: movieId }, newObj);
      return true;
    }  catch (e) {
      throw e;
    }
  }
}

module.exports.deleteMovieById = async (movieId) => {
  if (!mongoose.Types.ObjectId.isValid(movieId)) {
    return false;
  } else {
    try {
      await Movie.deleteOne({ _id: movieId });
      return true;
    } catch (e) {
      throw e;
    }
  }
}

module.exports.search = async (page, perPage, query) => {
  try {
    if (query) {
      return await Movie.find({ $text: { $search: query } }, { score: { $meta: 'textScore' }}).sort({ score: { $meta: 'textScore'}}).limit(perPage).skip(perPage*page).lean();
    } else {
      return await Movie.find().limit(perPage).skip(perPage*page).lean();
    }
  } catch (e) {
    throw e;
  }
}

module.exports.getTheaterByMovieId = async (movieId) => {
  if (!mongoose.Types.ObjectId.isValid(movieId)) {
    return null;
  } else {
    try {
      // Aggregation TBD
      return;
    } catch (e) {
      throw e;
    }
  }
}
