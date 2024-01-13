const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");
const {
  authMiddleware,
  authUserMiddleware,
} = require("../middleware/authMiddleware");

router.post("/create", authUserMiddleware, OrderController.createOrder);
router.get("/get-all-order/:id", authUserMiddleware, OrderController.getAllOrder);
router.get("/get-order-detail/:id", authUserMiddleware, OrderController.getOrderDetail);
router.delete("/delete-order/:id", authUserMiddleware, OrderController.deleteOrder);
router.get("/get-all", authMiddleware, OrderController.getAll);
router.post("/delete-many-order", authMiddleware, OrderController.deleteManyOrder);
router.put("/update-order/:id", authMiddleware, OrderController.updateOrder);
router.get("/get-count-order", authMiddleware, OrderController.getCountOrder);

module.exports = router;
