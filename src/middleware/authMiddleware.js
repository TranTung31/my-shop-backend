 const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authMiddleware = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(404).json({
        status: "ERROR",
        message: "The admin authentication check!",
      });
    }
    const { payload } = user;
    if (user?.isAdmin) {
      next();
    } else {
      return res.status(404).json({
        status: "ERROR",
        message: "The admin authentication",
      });
    }
  });
};

const authUserMiddleware = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];
  const userId = req.params.id;
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(404).json({
        status: "ERROR",
        message: "The all user authentication check!",
      });
    }
    const { payload } = user;
    if (user?.isAdmin || user) {
      next();
    } else {
      return res.status(404).json({
        status: "ERROR",
        message: "The all user authentication",
      });
    }
  });
};

module.exports = {
  authMiddleware,
  authUserMiddleware
};
