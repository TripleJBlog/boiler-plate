require("dotenv").config();
const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const port = process.env.SERVER_PORT || 5000;

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// application/json
app.use(bodyParser.json());
app.use(cookieParser());

const config = require("./config/key");
const { User } = require("./models/User");
mongoose
  .connect(config.mongoURI)
  .then(console.log("DB connected!"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("CleanWater!!"));
app.get("/api/hello", (req, res) => {
  console.log("/api/hello called");
  res.send("Hello~");
});
app.post("/register", (req, res) => {
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});
app.post("/login", (req, res) => {
  // 1. Look up requested email from DB
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "There is no user with that email.",
      });
    }
    // 2. If email exists in DB, check password
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        res.json({
          loginSuccess: false,
          message: "Password is not matched",
        });
      }
    });
    // 3. Generate Token to Cookie
    user.generateToken((err, user) => {
      if (err) return res.status(400).send(err);

      res.cookie("x_auth", user.token).status(200).json({
        loginSuccess: true,
        userId: user._id,
      });
    });
  });
});
app.listen(port, () => console.log(`server is listening on ${port}!`));
