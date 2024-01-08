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
    if (
      !fullName ||
      !address ||
      !city ||
      !phone ||
      !paymentMethod ||
      !itemsPrice ||
      !totalPrice ||
      !userId
    ) {
      return res.status(404).json({
        status: "ERROR",
        message: "The input is required!",
      });
    }

    const response = await OrderService.createOrder(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllOrder = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(404).json({
        status: "ERROR",
        message: "The user id is required!",
      });
    }
    const response = await OrderService.getAllOrder(userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getOrderDetail = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(404).json({
        status: "ERROR",
        message: "The order id is required!",
      });
    }
    const response = await OrderService.getOrderDetail(orderId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(404).json({
        status: "ERROR",
        message: "The order id is required!",
      });
    }
    const response = await OrderService.deleteOrder(orderId, req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createOrder,
  getAllOrder,
  getOrderDetail,
  deleteOrder,
};
