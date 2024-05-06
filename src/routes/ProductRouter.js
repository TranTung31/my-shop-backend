const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const {
  authMiddleware,
  authUserMiddleware,
} = require("../middleware/authMiddleware");

router.post("/create", ProductController.createProduct);
router.put("/update/:id", authMiddleware, ProductController.updateProduct);
router.delete("/delete/:id", authMiddleware, ProductController.deleteProduct);
router.post(
  "/delete-many",
  authMiddleware,
  ProductController.deleteManyProduct
);
router.get("/get-all", ProductController.getAllProduct);
router.get("/get-detail/:id", ProductController.getDetailProduct);
router.get("/get-all-type", ProductController.getAllType);
router.get(
  "/get-count-product",
  authMiddleware,
  ProductController.getCountProduct
);
router.get("/get-product-author", ProductController.getProductAuthor);
router.get("/search", ProductController.searchProduct);

module.exports = router;
