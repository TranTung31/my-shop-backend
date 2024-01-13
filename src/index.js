const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const routes = require("./routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Sử dụng middleware cors
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(
//   express.static("public", {
//     maxAge: 3600000, // 1 giờ
//     setHeaders: function (res, path, stat) {
//       res.set("Cache-Control", "public");
//     },
//   })
// );

routes(app);

mongoose
  .connect(`${process.env.MONGO_DB}`)
  .then(() => {
    console.log("Connect Db success!");
  })
  .catch((err) => {
    console.log(err);
  });

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.listen(port, () => {
  console.log("Server is running in port: " + port);
});
