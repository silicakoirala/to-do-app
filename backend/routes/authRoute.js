const express = require("express");
const authController = require("../controllers/authenticationController.js");
const router = express.Router();

/* In the code above, the /signup route has a post method attached
 to it, when it's been called, the Signup controller will be executed.
*/
router.post("/signup", authController.signUp);
router.post("/login", authController.login);

module.exports = router;