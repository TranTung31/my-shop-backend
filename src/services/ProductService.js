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
      genreID,
      authorID,
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
          description: description,
          publisherID: publisherID,
          genreID: genreID,
          authorID: authorID,
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

const getAllProduct = (limit, page, sort, filter, publisher, rating) => {
  return new Promise(async (resolve, reject) => {
    try {
      let arrPublisher = null;
      let totalProduct = null;

      if (publisher) {
        arrPublisher = publisher[1].split(",");
      }

      // Trường hợp có filter và sort
      if (filter && sort) {
        // Trường hợp có filter, sort và publisher
        if (publisher) {
          // Trường hợp có filter, sort, publisher và rating
          if (rating) {
            let ratingQuery = {};
            if (rating === 3) {
              ratingQuery = { rating: { $gte: 3 } };
            } else if (rating === 4) {
              ratingQuery = { rating: { $gte: 4 } };
            } else if (rating === 5) {
              ratingQuery = { rating: 5 };
            }
            const result = await Product.find({
              ...ratingQuery,
              [filter[0]]: filter[1],
              [publisher[0]]: arrPublisher,
            })
              .skip((page - 1) * limit)
              .limit(limit)
              .sort({ price: sort });

            totalProduct = await Product.count({
              ...ratingQuery,
              [filter[0]]: filter[1],
              [publisher[0]]: arrPublisher,
            });

            resolve({
              status: "OK",
              message: "Get products success!",
              totalProduct,
              data: result,
            });
          }

          const result = await Product.find({
            [filter[0]]: filter[1],
            [publisher[0]]: arrPublisher,
          })
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ price: sort });

          totalProduct = await Product.count({
            [filter[0]]: filter[1],
            [publisher[0]]: arrPublisher,
          });

          resolve({
            status: "OK",
            message: "Get products success!",
            totalProduct,
            data: result,
          });
        }

        const result = await Product.find({
          [filter[0]]: filter[1],
        })
          .skip((page - 1) * limit)
          .limit(limit)
          .sort({ price: sort });

        totalProduct = await Product.count({
          [filter[0]]: filter[1],
        });

        resolve({
          status: "OK",
          message: "Get products success!",
          totalProduct,
          data: result,
        });
      }

      // Trường hợp có filter và publisher
      if (filter && publisher) {
        // Trường hợp có filter, publisher và rating
        if (rating) {
          let ratingQuery = {};
          if (rating === 3) {
            ratingQuery = { rating: { $gte: 3 } };
          } else if (rating === 4) {
            ratingQuery = { rating: { $gte: 4 } };
          } else if (rating === 5) {
            ratingQuery = { rating: 5 };
          }

          const result = await Product.find({
            ...ratingQuery,
            [filter[0]]: filter[1],
            [publisher[0]]: arrPublisher,
          })
            .skip((page - 1) * limit)
            .limit(limit);

          totalProduct = await Product.count({
            ...ratingQuery,
            [filter[0]]: filter[1],
            [publisher[0]]: arrPublisher,
          });

          resolve({
            status: "OK",
            message: "Get products success!",
            totalProduct,
            data: result,
          });
        } else {
          const result = await Product.find({
            [filter[0]]: filter[1],
            [publisher[0]]: arrPublisher,
          })
            .skip((page - 1) * limit)
            .limit(limit);

          totalProduct = await Product.count({
            [filter[0]]: filter[1],
            [publisher[0]]: arrPublisher,
          });

          resolve({
            status: "OK",
            message: "Get products success!",
            totalProduct,
            data: result,
          });
        }
      }

      if (limit) {
        const result = await Product.find()
          .skip((page - 1) * limit)
          .limit(limit);

        totalProduct = await Product.count();

        resolve({
          status: "OK",
          message: "Get products success!",
          totalProduct,
          data: result,
        });
      }

      const product = await Product.find()
        .skip((page - 1) * limit)
        .limit(limit);

      totalProduct = await Product.count();

      resolve({
        status: "OK",
        message: "Get products success!",
        totalProduct,
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

const getProductAuthor = (limit, page, sort, filter, publisher, rating) => {
  return new Promise(async (resolve, reject) => {
    try {
      let arrPublisher;
      const totalProduct = await Product.count();

      if (publisher) {
        arrPublisher = publisher[1].split(",");
      }

      // Trường hợp có filter và sort
      if (filter && sort) {
        // Trường hợp có filter, sort và publisher
        if (publisher) {
          // Trường hợp có filter, sort, publisher và rating
          if (rating) {
            let ratingQuery = {};
            if (rating === 3) {
              ratingQuery = { rating: { $gte: 3 } };
            } else if (rating === 4) {
              ratingQuery = { rating: { $gte: 4 } };
            } else if (rating === 5) {
              ratingQuery = { rating: 5 };
            }
            const allProductRating = await Product.find({
              ...ratingQuery,
              [filter[0]]: filter[1],
              [publisher[0]]: arrPublisher,
            })
              .limit(limit)
              .skip(page * limit)
              .sort({ price: sort });
            resolve({
              status: "OK",
              message: "SUCCESS",
              totalPage: Math.ceil(totalProduct / limit),
              pageCurrent: page + 1,
              totalProduct: totalProduct,
              data: allProductRating,
            });
          }
          const allProductFilter = await Product.find({
            [filter[0]]: filter[1],
            [publisher[0]]: arrPublisher,
          })
            .limit(limit)
            .skip(page * limit)
            .sort({ price: sort });
          resolve({
            status: "OK",
            message: "SUCCESS",
            totalPage: Math.ceil(totalProduct / limit),
            pageCurrent: page + 1,
            totalProduct: totalProduct,
            data: allProductFilter,
          });
        }

        const allProductSort = await Product.find({
          [filter[0]]: filter[1],
        })
          .limit(limit)
          .skip(page * limit)
          .sort({ price: sort });
        resolve({
          status: "OK",
          message: "SUCCESS",
          totalPage: Math.ceil(totalProduct / limit),
          pageCurrent: page + 1,
          totalProduct: totalProduct,
          data: allProductSort,
        });
      }

      // Trường hợp có filter và publisher
      if (filter && publisher) {
        if (rating) {
          let ratingQuery = {};
          if (rating === 3) {
            ratingQuery = { rating: { $gte: 3 } };
          } else if (rating === 4) {
            ratingQuery = { rating: { $gte: 4 } };
          } else if (rating === 5) {
            ratingQuery = { rating: 5 };
          }
          const allProductRating = await Product.find({
            ...ratingQuery,
            [filter[0]]: filter[1],
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
            data: allProductRating,
          });
        } else {
          const allProductFilter = await Product.find({
            [filter[0]]: filter[1],
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
      }

      if (filter) {
        const allProductFilter = await Product.find({
          [filter[0]]: filter[1],
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

const searchProduct = (q) => {
  return new Promise(async (resolve, reject) => {
    try {
      const dataProduct = await Product.find({
        name: { $regex: new RegExp(q, "i") },
      });

      resolve({
        status: "OK",
        message: "Gel all products successfully!",
        data: dataProduct,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getProduct = (page, limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Product.find()
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

      const totalProduct = await Product.count();

      resolve({
        status: "OK",
        message: "Get products successfully!",
        data: result,
        totalProduct,
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
  getProductAuthor,
  searchProduct,
  getProduct,
};
