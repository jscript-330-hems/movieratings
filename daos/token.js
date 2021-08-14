const { uuid } = require('uuidv4');
const Token = require('../models/token')

module.exports = {}

module.exports.getTokenForUserId = async (userId) => {
    const token = await Token.create({ tokenString: uuid(), userId })
    return token.tokenString
}

module.exports.getUserIdFromToken = async (tokenString) => {
    const token = await Token.findOne({ tokenString }).lean()
    return (token || {}).userId
}

module.exports.removeToken = async (tokenString) => {
    return await Token.deleteOne({ tokenString })
}
