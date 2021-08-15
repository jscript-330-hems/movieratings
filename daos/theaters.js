const Theater = require('../models/theater')
const mongoose = require('mongoose')

module.exports = {}

module.exports.getAllTheaters = async () => {
    return await Theater.find().lean();
}


module.exports.getMoviesByTheaterId = async (theaterId) => {
    try {
        const moviesInfo = await Theater.aggregate([
            { $match: {
                _id: new mongoose.Types.ObjectId(theaterId)
            }}, 
            { $unwind: {
                path: '$movies'
            }}, 
            { $lookup: {
                from: 'movies',
                localField: 'movies',
                foreignField: '_id',
                as: 'movie'
            }},
            { $unwind: {
                path: '$movie'
            }}, 
            { $project: {
                movies: 0,
                __v: 0
            }}
          ]);
        return moviesInfo;
        }
    catch (e) {
        throw e;
    }
}

module.exports.searchByZip = async (page, perPage, query) => {
    try {
        if (query) {
            return await Theater.find({ $text: { $search: query } }, { score: { $meta: 'textScore' }}).sort({ score: { $meta: 'textScore' }}).limit(perPage).skip(perPage*page).lean();
        } else {
            return await Theater.find().limit(perPage).skip(perPage*page).lean();
        } 
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
    return await Theater.updateOne({ _id: theaterId }, newObj);
}

module.exports.deleteTheaterById = async (theaterId) => {
    return await Theater.deleteOne({ _id: theaterId });
}