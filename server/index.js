require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.SERVER_PORT || 5000;
const bodyParser = require("body-parser");

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// application/json
app.use(bodyParser.json());

const config = require("./config/key");
const { User } = require("./models/User");
mongoose
  .connect(config.mongoURI)
  .then(console.log("DB connected!"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("CleanWater!!"));
app.post("/register", (req, res) => {
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});
app.listen(port, () => console.log(`server is listening on ${port}!`));
