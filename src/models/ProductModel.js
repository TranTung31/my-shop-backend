const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    type: { type: String },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    rating: { type: Number, required: true },
    description: { type: String },
    discount: { type: Number, require: true },
    selled: { type: Number },
    author: { type: String, require: true },
    numberOfBook: { type: Number, require: true },
    formatBook: { type: String, require: true },
    authorID: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
    publisherID: { type: mongoose.Schema.Types.ObjectId, ref: "Publisher" },
    genreID: { type: mongoose.Schema.Types.ObjectId, ref: "Genre" },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
