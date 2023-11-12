const Product = require("../models/ProductModel");

const createProduct = (product) => {
  return new Promise(async (resolve, reject) => {
    const { name, image, type, price, countInStock, rating, description } =
      product;
    try {
      const checkProduct = await Product.findOne({
        name: name,
      });
      if (checkProduct !== null) {
        resolve({
          status: "ERROR",
          message: "The name product is required",
        });
      } else {
        const newProduct = await Product.create({
          name: name,
          image: image,
          type: type,
          price: price,
          countInStock: countInStock,
          rating: rating,
          description: description,
        });
        if (newProduct) {
          resolve({
            status: "OK",
            message: "SUCCESS",
            data: newProduct,
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateProduct = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: id,
      });
      if (checkProduct === null) {
        resolve({
          status: "ERROR",
          message: "The product is not definded",
        });
      } else {
        const product = await Product.findByIdAndUpdate(id, data, {
          new: true,
        });
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: product,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: id,
      });
      if (checkProduct === null) {
        resolve({
          status: "ERROR",
          message: "The product is not definded",
        });
      } else {
        const product = await Product.findById(id);
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: product,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findOne({
        _id: id,
      });
      if (checkProduct === null) {
        resolve({
          status: "ERROR",
          message: "The product is not definded",
        });
      } else {
        await Product.findByIdAndDelete(id);
        resolve({
          status: "OK",
          message: "Delete product success",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getAllProduct = (limit, page, sort, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalProduct = await Product.count();
      if (filter) {
        const allProductFilter = await Product.find({
          [filter[0]]: { $regex: filter[1] },
        })
          .limit(limit)
          .skip(page * limit);
        resolve({
          status: "OK",
          message: "SUCCESS",
          totalPage: Math.ceil(totalProduct / limit),
          pageCurrent: page + 1,
          totalProduct: totalProduct,
          data: allProductFilter,
        });
      }
      if (sort) {
        const objectSort = {};
        objectSort[sort[1]] = sort[0];
        const allProductSort = await Product.find()
          .limit(limit)
          .skip(page * limit)
          .sort(objectSort);
        resolve({
          status: "OK",
          message: "SUCCESS",
          totalPage: Math.ceil(totalProduct / limit),
          pageCurrent: page + 1,
          totalProduct: totalProduct,
          data: allProductSort,
        });
      }
      const product = await Product.find()
        .limit(limit)
        .skip(page * limit);
      resolve({
        status: "OK",
        message: "SUCCESS",
        totalPage: Math.ceil(totalProduct / limit),
        pageCurrent: page + 1,
        totalProduct: totalProduct,
        data: product,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteManyProduct = (ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Product.deleteMany({ _id: ids });
      resolve({
        status: "OK",
        message: "Delete many product success!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createProduct,
  updateProduct,
  getDetailProduct,
  deleteProduct,
  getAllProduct,
  deleteManyProduct,
};
