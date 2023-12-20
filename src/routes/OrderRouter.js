const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");
const {
  authMiddleware,
  authUserMiddleware,
} = require("../middleware/authMiddleware");

router.post("/create", authMiddleware, OrderController.createOrder);
router.get("/get-order-detail/:id", authMiddleware, OrderController.getOrderDetail);

module.exports = router;
