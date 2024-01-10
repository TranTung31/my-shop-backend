const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");
const {
  authMiddleware,
  authUserMiddleware,
} = require("../middleware/authMiddleware");

router.post("/create", authMiddleware, OrderController.createOrder);
router.get("/get-all-order/:id", authMiddleware, OrderController.getAllOrder);
router.get("/get-order-detail/:id", authMiddleware, OrderController.getOrderDetail);
router.delete("/delete-order/:id", authMiddleware, OrderController.deleteOrder);
router.get("/get-all", authMiddleware, OrderController.getAll);
router.post("/delete-many-order", authMiddleware, OrderController.deleteManyOrder);
router.put("/update-order/:id", authMiddleware, OrderController.updateOrder);

module.exports = router;
