const User = require("../models/user.js")
const { createSecretToken } = require("../util/SecretToken.js");
const bcrypt = require("bcryptjs");

const signUp = async (req, res, next) => {
  try {
    // user's inputs are obtained from the req.body
    const { email, password, username } = req.body;
    //checks the email to make sure no past registrations have been made
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists." });
    }
    //use the values obtained from req.body to create the new user after that has
    // occurred
    const user = await User.create({ email, password, username });
    //don't need to worry about how the unique _id was obtained because MongoDB always 
    //assigns a new user with a unique _id
    const token = createSecretToken((user._id));
    /* newly formed user's _id is then supplied as an parameter to the createSecretToken()
     function, which handles token generation.*/

    //  The cookie will be sent to the client with key of "token",
    // and value of token.
    //you respond with telling the frontend that this is a token
    // (value), save it with key "token" in the cookies. 
    //and The third argument is options. there, an object with options
    // withCredentials true, meaning send this with every api request as 
    //it needs credentials.and httpOnly if false, meaning the api is not limited to 
    //http requests only. This allows client side code to access the cookies.
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(201);
    res.json(
      {
        success: true,
        message: "User signed in successfully.",
        data: {
          email: user.email,
          username: user.username,
          token: token
        }
      });
    next();
  } catch (error) {
    console.error(error);
    res.status(500);
    res.json({
      success: false,
      message: error.message,
      data: null
    });
  }
};

const login = async (req, res, next) => {
  try {
    // user's inputs are obtained from the req.body
    const { email, password } = req.body;

    //if no email or no password
    if (!email || !password) {
      return res.json({ message: "All fields are required." });
    }
    /*You are determining whether the email and password match 
    any previously stored user in the database. */
    const user = await User.findOne({ email });
    if(!user) {
      return res.json({message: "Incorrect password or email"});
    }
    //compare if the user provided password matches with the 
    const auth = await bcrypt.compare(password, user.password);
    //if not autheticated or if the passwords dont match
    if (!auth) {
      return res.json({ message: "Incorrect password or email." })
    }

    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(201);
    res.json({
      success: true,
      message: "User logged in successfully",
      data: {
        email: user.email,
        username: user.username,
        token: token
      }
    });
    next()
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json({
      success: false,
      message: "Sorry, cannot log in.",
      data: null
    });
  }
};


module.exports = {
  signUp,
  login
};