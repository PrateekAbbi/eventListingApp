const express = require("express");
const { registerUser, logInUser } = require("../controllers/userController");
const router = express.Router();

router.route("/signUp").post(registerUser);
router.post("/logIn", logInUser);

module.exports = router;
