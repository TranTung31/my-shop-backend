const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

mongoose
  .connect(
    `mongodb+srv://trantung310502:${process.env.MONGO_DB}@cluster0.hafunfl.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connect Db success!");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log("Server is running in port: " + port);
});
