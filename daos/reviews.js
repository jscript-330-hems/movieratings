const User = require('../models/user')

module.exports = {}

module.exports.createUser = async (userObj) => {
    if (!userObj.roles)
        userObj.roles = ["user"];
    else if (!userObj.roles.contains("user"))
        userObj.roles.push("user");

    const user = await User.create(userObj)
    return user
}

module.exports.getUser = async (email) => {
    return await User.findOne({ email }).lean()
}

module.exports.updateUserPassword = async (userId, password) => {
    try {
        await User.updateOne( { _id: userId }, { $set: { password } } )
        return true
    }
    catch (e) {
        res.status(500).send(e.message)
    }
}