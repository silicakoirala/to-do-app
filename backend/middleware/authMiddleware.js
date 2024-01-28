const User = require("../models/user");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {

    const excludedRoutes = ['/api/v1/auth'];
    if (excludedRoutes.includes(req.path)) return next();

    const token = req.cookies.token;

    // if no token
    if (!token) {
      res.status(401);
      res.json({
        success: false,
        message: "Unauthenticated user",
        data: null
      });
      return;
    }

    jwt.verify(token, process.env.TOKEN_KEY, async (error, data) => {
      // if token invalid or doesn't match or error
      if (error) {
        res.status(401);
        res.json({
          success: false,
          message: "Unauthenticated user",
          data: null
        });
        return;
      }

      const user = await User.findById(data.id);
      //if user is found, meaning authenticated, so allow next api methods
      if (user) {
        req.user = user;
        next();
        return;
      };


      res.status(401);
      res.json({
        success: false,
        message: "User Unauthenticated",
        data: null
      });
      return;
    });

  } catch (error) {
    res.status(401);
    res.json({
      success: false,
      message: error.message,
      data: null
    });
    return;
  }
}

module.exports = authMiddleware;