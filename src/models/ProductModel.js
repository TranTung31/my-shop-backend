const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    rating: { type: Number },
    discount: { type: Number, require: true },
    description: { type: String, require: true },
    selled: { type: Number },
    pageCount: { type: Number, require: true },
    format: { type: String, require: true },
    weight: { type: String, require: true },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
    genreId: { type: mongoose.Schema.Types.ObjectId, ref: "Genre" },
    publisherId: { type: mongoose.Schema.Types.ObjectId, ref: "Publisher" },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
