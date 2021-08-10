const Theater = require('../models/theater')
const mongoose = require('mongoose')

module.exports = {}

module.exports.getAllTheaters = async () => {
    return await Theater.find().lean();
}

module.exports.getTheaterById = async (movieId) => {
    try {
        const theaterInfo = await Theater.aggregate([
            { $match: { _id: mongoose.Types.ObjectId(movieId) }},
            { $unwind: '$movies' },
            { $lookup: { 
            from: 'movies',
            localField: 'movies',
            foreignField: '_id',
            as: 'movieInfo'
            }},
            { $unwind: '$movieInfo' },
            { $group: { 
            _id: '$_id', 
            name: '$name',
            movies: { $push: '$movieInfo' }, 
            zip: { $first: '$zip' }}},
            { $project: { 
            _id: 0,
            movies: { __v: 0, _id: 0 }
            }}
        ]);
        return theaterInfo[0];
        }
    catch (e) {
        return null;
    }
}

module.exports.searchByZip = async (page, perPage, query) => {
    try {
        if(query) {
            return await Theater.find(
                { $text: { $search: query } },
                { score: { $meta: 'textScore' } })
                .sort({ score: { $meta: 'textScore' }}).limit(perPage).skip(perPage*page).lean();
        } else {
            return await Theater.find().limit(perPage).skip(perPage*page).lean();
        } 
    } catch (e) {
        return null;
    }
}

module.exports.create = async (theaterData) => {
    try {
        return await Theater.create(theaterData);
    } catch (e) {
        if (e.message.includes('validation failed')) {
            throw new Error(e.message);
        }
        throw e;
    }
}
