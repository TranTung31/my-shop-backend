const Order = require("../models/OrderProduct");
const Product = require("../models/ProductModel");

const createOrder = (order) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        orderItems,
        fullName,
        address,
        city,
        phone,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice,
        userId,
      } = order;

      const result = orderItems.map(async (order) => {
        const productData = await Product.findOneAndUpdate(
          {
            _id: order?.product,
            countInStock: { $gte: order?.amount },
          },
          { $inc: { countInStock: -order?.amount, selled: +order?.amount } },
          { new: true }
        );

        console.log("productData: ", productData);

        if (productData) {
          const newOrder = await Order.create({
            orderItems,
            shippingAddress: {
              fullName,
              address,
              city,
              phone,
            },
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice,
            user: userId,
          });

          if (newOrder) {
            return {
              status: "OK",
              message: "SUCCESS",
            };
          }
        } else {
          return {
            status: "OK",
            message: "ERROR",
            id: order?.product,
          };
        }
      });
      const results = await Promise.all(result);
      const newData = results.filter((item) => item.id);
      if (newData.length > 0) {
        resolve({
          status: "ERROR",
          message: `Sản phẩm có id ${newData.join(",")} đã hết hàng!`,
        });
      }
      resolve({
        status: "OK",
        message: "SUCCESS",
      });
      console.log("results: ", results);
    } catch (e) {
      reject(e);
    }
  });
};

const getOrderDetail = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await Order.findOne({
        user: userId,
      });
      if (checkUser === null) {
        resolve({
          status: "ERROR",
          message: "The user id is not definded!",
        });
      } else {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: checkUser,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createOrder,
  getOrderDetail,
};
