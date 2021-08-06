const jwt = require('jsonwebtoken')
const tokenDAO = require("../daos/token");
const userDAO = require("../daos/users");

// TODO: Maybe put this in a .env file? We can wait until we learn more
// about where we are going to deploy
const SECRET_TOKEN = "x1x;U0K6R[J^(L&u'Hatu{8%Y<,Voj_2\Q!]dLe(Vu^K+.\Yx`g8q?f'%$CI#&Kccy;bJ~}~>pK@UCzR{>Eo2*-ax&T^(jKDH$nY3FK$*.&TJ#rJ9~owMFc;2;uaR["

async function isAuthorized (req, res, next) {
    const authHeader = req.headers.authorization
    if (!authHeader || authHeader.length < 1) {
        res.sendStatus(401)
        return
    }
    try {
        tokenFromClient = authHeader.replace('Bearer ', '')
        const { tokenString } = jwt.verify(tokenFromClient, SECRET_TOKEN)
        const userId = await tokenDAO.getUserIdFromToken(tokenString);
        if (!userId) {
            throw new Error("Cannot find token from provided token string")
        }

        const user = await userDAO.getUserById(userId);
        if (!user) {
            throw new Error("Cannot find user by user ID");
        }
        
        req.tokenString = tokenString;
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

module.exports = { SECRET_TOKEN, isAuthorized, isAdmin }
