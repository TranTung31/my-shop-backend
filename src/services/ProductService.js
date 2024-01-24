const Product = require("../models/ProductModel");

const createProduct = (product) => {
  return new Promise(async (resolve, reject) => {
    const {
      name,
      image,
      type,
      price,
      countInStock,
      rating,
      description,
      discount,
      author,
      numberOfBook,
      formatBook,
      publisherID,
    } = product;
    try {
      const checkProduct = await Product.findOne({
        name: name,
      });

      if (checkProduct !== null) {
        resolve({
          status: "ERROR",
          message: "The name product is required!",
        });
      } else {
        const newProduct = await Product.create({
          name: name,
          image: image,
          type: type,
          price: price,
          countInStock: countInStock,
          discount: discount,
          rating: rating,
          description: description,
          author: author,
          numberOfBook: numberOfBook,
          formatBook: formatBook,
          publisherID: publisherID,
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
          message: "The product is not definded!",
        });
      } else {
        const product = await Product.findById(id);

        resolve({
          status: "OK",
          message: "Get detail product success!",
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

const getAllProduct = (limit, page, sort, filter, publisher) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalProduct = await Product.count();
      if (filter && publisher) {
        const arrPublisher = publisher[1].split(",");
        const allProductFilter = await Product.find({
          [filter[0]]: { $regex: filter[1] },
          [publisher[0]]: arrPublisher,
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
      if (limit) {
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

const getAllType = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const typeProduct = await Product.distinct("type");
      resolve({
        status: "OK",
        message: "Get all type product success",
        data: typeProduct,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getCountProduct = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Product.count();
      resolve({
        status: "OK",
        message: "Get count product success!",
        data: result,
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
  getAllType,
  getCountProduct,
};
