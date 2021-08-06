const tokenDAO = require("../daos/token");
const userDAO = require("../daos/users");

async function isAuthorized (req, res, next) {
    const authHeader = req.headers.authorization
    if (!authHeader || authHeader.length < 1) {
        res.sendStatus(401)
        return
    }
    try {
        tokenFromClient = authHeader.replace('Bearer ', '')
        const userId = await tokenDAO.getUserIdFromToken(tokenFromClient);
        if (!userId) {
            throw new Error("Cannot find token from provided token string")
        }

        const user = await userDAO.getUserById(userId);
        if (!user) {
            throw new Error("Cannot find user by user ID");
        }
        
        req.tokenString = tokenFromClient;
        req.user = user;

        next()
    }
    catch (e) {
        res.status(401).send(e.message)
        return
    }
}

async function isAdmin (req, res, next) {
    if (req.user.roles.includes("admin")) {
        req.user.isAdmin = true
    }
    next()
}

module.exports = { isAuthorized, isAdmin }
