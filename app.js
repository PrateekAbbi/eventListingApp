const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cookieParser());

app.use(session({
  secret: "This is the little secret.",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb+srv://admin:admin123@cluster0.doll8.mongodb.net/sampleDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String
});
userSchema.plugin(passportLocalMongoose);
const User = new mongoose.model("User", userSchema);
passport.use(User.createStrategy("local"));
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});

const eventSchema = new mongoose.Schema({
  username: String,
  eventTitle: String,
  eventBody: String
});
const Event = new mongoose.model("Event", eventSchema);

var email = "";
var otp = "";

function validateCookie(req, res, next) {
  const {
    cookies
  } = req;
  if ("username" in cookies) {
    next();
  } else {
    res.status(403).redirect("/logIn");
  }
}

app.route("/")
  .get(validateCookie, async function(req, res){
    res.clearCookie("event");
    const {cookies} = req
    const name = await User.findOne({username: cookies.username})
    const events = await Event.find({username: name.name});
    res.render("home", {
      events: events,
      name: name
    });
  })
  .post();

app.route("/events/:eventId")
  .get(function(req, res){
    const requestedEventId = req.params.eventId;
    res.cookie("event", requestedEventId)
    Event.findOne({_id: requestedEventId}, function(err, event){
      res.render("event", {
        eventTitle: event.eventTitle,
        eventBody: event.eventBody
      });
    });
  });

app.route("/signUp")
  .get(function(req, res){
       res.render("SignUp");
  })
  .post(function(req, res){
    User.register({
      name: req.body.name,
      username: req.body.username
    }, req.body.password, function(err, user) {
      if (err) {
        res.redirect("/signUp");
      } else {
        passport.authenticate("local")(req, res, function() {
          res.redirect("/logIn");
        });
      }
    });
  });

app.route("/logIn")
  .get(function(req, res){
    res.clearCookie("username");
    res.render("logIn");
  })
  .post(function(req, res){
    const user = new User({
      username: req.body.username,
      password: req.body.password
    });
    req.login(user, function(err) {
      if (!err) {
        passport.authenticate("local")(req, res, function(){
          res.cookie("username", user.username)
          res.redirect("/");
        });
      } else {
        console.log(err);
      }
    });
  });

app.route("/addEvent")
  .get(validateCookie, function(req, res){
    res.render("addEvent")
  })
  .post(async function(req, res){
    const {cookies} = req
    const name = await User.findOne({username: cookies.username})
    const event = new Event({
      username: name.name,
      eventTitle: req.body.eventTitle,
      eventBody: req.body.eventBody
    });
    event.save(function(err){
      if(!err){
        res.redirect("/");
      } else {
        console.log(err);
      }
    });
  });

app.route("/deleteEvent")
  .get(async function(req, res){
     res.redirect("/");
     const {cookies} = req;
     await Event.deleteOne({"_id": cookies.event});
  });

app.route("/logout")
  .get(function(req, res) {
    req.logout();
    res.redirect("/login");
  });

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server has started successfully.")
})