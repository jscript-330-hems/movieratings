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

module.exports.getMovieById = async (movieId) => {
  if (!mongoose.Types.ObjectId.isValid(movieId)) {
    return null;
  } else {
    try {
      const movieDetail = await Movie.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(movieId) }},
        { $lookup: {
            from: 'reviews',
            localField: '_id',
            foreignField: 'movieId',
            as: 'reviews'
        }},
        { $unwind: { path: '$reviews', preserveNullAndEmptyArrays: true } },
        { $group: {
            _id: '$movieId',
            title: { $first: '$title' },
            actors: { $first: '$actors' },
            synopsis: { $first: '$synopsis' },
            releaseYear: { $first: '$releaseYear' },
            rating: { $first: '$rating' },
            moviePicUrl: { $first: '$moviePicUrl' },
            reviewCount: { $sum: 1 },
            averageScore: { $avg: '$reviews.score' }
        }},
        { $project : { _id: 0 }}
      ]);

      if (!movieDetail[0].averageScore) {
        movieDetail[0].reviewCount = movieDetail[0].averageScore = 0;
      }
        
      return movieDetail[0];
      
    } catch (e) {
      throw e;
    }
  }
}

module.exports.getAllMovies = async (page, perPage) => {
  try {
    const movieDetail = await Movie.aggregate([
        { $lookup: {
            from: 'reviews',
            localField: '_id',
            foreignField: 'movieId',
            as: 'reviews'
        }},
        { $unwind: { path: '$reviews', preserveNullAndEmptyArrays: true } },
        { $group: {
            _id: '$_id',
            title: { $first: '$title' },
            actors: { $first: '$actors' },
            synopsis: { $first: '$synopsis' },
            releaseYear: { $first: '$releaseYear' },
            rating: { $first: '$rating' },
            moviePicUrl: { $first: '$moviePicUrl' },
            reviewCount: { $sum: 1 },
            averageScore: { $avg: '$reviews.score' }
        }},
        { $project : { _id: 0 }}
      ]).limit(perPage).skip(perPage*page);
      for (let i = 0; i < movieDetail.length; i++) {
        if (!movieDetail[i].averageScore) {
            movieDetail[i].reviewCount = movieDetail[i].averageScore = 0;
        }
      }
      return movieDetail;
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
