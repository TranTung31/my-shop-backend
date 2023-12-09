const Order = require("../models/OrderProduct");

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
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: newOrder,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createOrder,
};
