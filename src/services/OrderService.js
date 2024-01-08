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
        isPaid,
        paidAt,
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
            isPaid,
            paidAt,
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
    } catch (e) {
      reject(e);
    }
  });
};

const getAllOrder = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await Order.find({
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

const getOrderDetail = (orderId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkOrder = await Order.findById({
        _id: orderId,
      });
      if (checkOrder === null) {
        resolve({
          status: "ERROR",
          message: "The order id is not definded!",
        });
      } else {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: checkOrder,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const deleteOrder = (orderId, orderItems) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = orderItems.map(async (order) => {
        const productData = await Product.findOneAndUpdate(
          {
            _id: order?.product,
            selled: { $gte: order?.amount },
          },
          { $inc: { countInStock: +order?.amount, selled: -order?.amount } },
          { new: true }
        );

        if (productData) {
          const checkOrder = await Order.findByIdAndDelete(orderId);
          if (checkOrder === null) {
            resolve({
              status: "ERROR",
              message: "The order id is not definded!",
            });
          } else {
            resolve({
              status: "OK",
              message: "SUCCESS",
              data: checkOrder,
            });
          }
        } else {
          return {
            status: "ERROR",
            message: "The productData is not definded!",
            id: order?.product,
          };
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createOrder,
  getAllOrder,
  getOrderDetail,
  deleteOrder,
};
