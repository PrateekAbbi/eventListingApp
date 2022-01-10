const asyncHandler = require("express-async-handler");
const passport = require("passport");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

passport.use(User.createStrategy("local"));
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, username, password } = req.body;

  const userExists = await User.findOne({ username });

  if (userExists) {
    res.status(400);
    throw new Error(
      "User with the same email address already exists! Kindly choose another email address"
    );
  }

  const user = await User.register({ name, username }, password);
  console.log(user);

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Could not create your account. Please try again!");
  }
});

const logInUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = new User({
    username,
    password,
  });

  const details = await User.findOne({ username });

  req.login(user, (err) => {
    if (!err) {
      passport.authenticate("local")(req, res, () => {
        console.log("Log In successfully");
        res.json({
          name: details.name,
          username: details.username,
          token: generateToken(details._id),
        });
      });
    } else {
      console.log(err);
      res.status(400);
      throw new Error("Invalid Email or Password. Please try again!");
    }
  });
});

module.exports = { registerUser, logInUser };
