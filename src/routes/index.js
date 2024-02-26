const UserRouter = require("./UserRouter");
const ProductRouter = require("./ProductRouter");
const OrderRouter = require("./OrderRouter");
const GenreRouter = require("./GenreRouter");
const PublisherRouter = require("./PublisherRouter");
const PaymentRouter = require("./PaymentRouter");
const ContactRouter = require("./ContactRouter");

const routes = (app) => {
  app.use("/api/user", UserRouter);
  app.use("/api/product", ProductRouter);
  app.use("/api/order", OrderRouter);
  app.use("/api/payment", PaymentRouter);
  app.use("/api/publisher", PublisherRouter);
  app.use("/api/genre", GenreRouter);
  app.use("/api/contact", ContactRouter);
};

module.exports = routes;
