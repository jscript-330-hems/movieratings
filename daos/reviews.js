const mongoose = require('mongoose');
const Review = require('../models/review')

module.exports = {}

module.exports.createReview = async (review) => {
  if (!mongoose.Types.ObjectId.isValid(review.movieId)) {
    return null
  }
  return await Review.create(review)
}

module.exports.getReview = async (movieId) => {
  if (!mongoose.Types.ObjectId.isValid(movieId)) {
    return null
  }
  return await Review.find({ movieId }).lean()
}

//
// BACKLOG
//
// module.exports.updateReview = async (reviewId, review) => {
//   try {
//     await Review.updateOne( { reviewId }, review );
//     return true
//   }
//   catch (e) {
//     throw e
//   }
// }

module.exports.deleteReview = async (reviewId) => {
  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    return false
  } else {
    try {
      await Review.deleteOne({ _id: reviewId });
      return true;
    } catch (e) {
      throw e;
    }
  }
}
