require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.SERVER_PORT || 5000;
const config = require("./config/key");
mongoose
  .connect(config.mongoURI)
  .then(console.log("DB connected!"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello!"));
app.listen(port, () => console.log(`server is listening on ${port}!`));
