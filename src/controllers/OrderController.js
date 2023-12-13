const OrderService = require("../services/OrderService");

const createOrder = async (req, res) => {
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
    } = req.body;
    if (!fullName || !address || !city || !phone || !paymentMethod || !itemsPrice || !totalPrice || !userId) {
        return res.status(404).json({
            status: "ERROR",
            message: "The input is required!"
        })
    }

    const response = await OrderService.createOrder(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createOrder,
};
