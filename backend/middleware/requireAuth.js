const jwt = require("jsonwebtoken");
const User = require("../models/user.js")

async function requireAuth(req, res, next) {
    try{
        //read token off cookies
        const token = req.cookies.Authorization;

        //decode the token
        var decoded = jwt.verify(token, process.env.SECRET);

        //check expiration
        if( Date.now() > decoded.exp ) return res.sendStatus(401);

        //find user using decoded sub
        const user = await User.findById(decode.sub);
        if(!user) return res.sendStatus(401);

        //attach user to req
        req.user = req;

        //continue on
        next();
    }
    catch (err) {
        return res.sendStatus(401);
    }
}

module.exports = requireAuth;
