const express = require("express");
const userController = require("../controllers/userController.js");
const requireAuth = require("../middleware/requireAuth.js");

const router = express.Router ();

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.get("/check-auth", requireAuth, userController.checkAuth);

module.exports = router;