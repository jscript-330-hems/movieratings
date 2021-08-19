const Theater = require('../models/theater')
const mongoose = require('mongoose')

module.exports = {}

module.exports.getAllTheaters = async () => {
    return await Theater.find().lean();
}


module.exports.getMoviesByTheaterId = async (theaterId) => {
    if (!mongoose.Types.ObjectId.isValid(theaterId)) {
        return null;
    } else {
        try {
            const moviesInfo = await Theater.aggregate([
                { $match: { _id: mongoose.Types.ObjectId(theaterId) }},
                { $unwind: '$movies'},
                { $lookup: { 
                    from: 'movies',
                    localField: 'movies',
                    foreignField: '_id',
                    as: 'movieInfo'
                }},
                { $unwind: '$movieInfo' },
                { $group: { 
                    _id: '$movieInfo._id', 
                    title: { $first: '$movieInfo.title' },
                    actors: { $first: '$movieInfo.actors' }, 
                    genre: { $first: '$movieInfo.genre' },
                    synopsis: { $first: '$movieInfo.synopsis' },
                    rating: { $first: '$movieInfo.rating' },
                    releaseYear: { $first: '$movieInfo.releaseYear' },
                    moviePicUrl: { $first: '$movieInfo.moviePicUrl' }
                }}
            ]);
            return moviesInfo;
            }
        catch (e) {
            throw e;
    }
}
}

module.exports.searchByZip = async (page, perPage, zipcode) => {
    try {
        return await Theater.find({ zip: zipcode }).skip(perPage*(page-1)).limit(perPage).lean()
    } catch (e) {
        throw e;
    }
}

module.exports.createTheater = async (theaterData) => {
    try {
        return await Theater.create(theaterData);
    } catch (e) {
        if (e.message.includes('validation failed')) {
            throw new Error(e.message);
        }
        throw e;
    }
}

module.exports.updateTheaterById = async (theaterId, newObj) =>  {
    if (!mongoose.Types.ObjectId.isValid(theaterId)) {
        return false;
    } else {
      try {
        await Theater.updateOne({ _id: theaterId }, newObj);
        return true;
      }  catch (e) {
        throw e;
      }
    }
}

module.exports.deleteTheaterById = async (theaterId) => {
    if (!mongoose.Types.ObjectId.isValid(theaterId)) {
        return false;
    } else {
      try {
        await await Theater.deleteOne({ _id: theaterId });
        return true;
      }  catch (e) {
        throw e;
      }
    }
}