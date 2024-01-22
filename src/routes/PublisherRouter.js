const express = require("express");
const router = express.Router();
const {
  authMiddleware,
  authUserMiddleware,
} = require("../middleware/authMiddleware");
const PublisherController = require("../controllers/PublisherController");

router.get("/get-all-publisher", authMiddleware, PublisherController.getAllPublisher);
router.get("/get-publisher/:id", authMiddleware, PublisherController.getPublisher);
router.post("/create-publisher", authMiddleware, PublisherController.createPublisher);
router.put("/update-publisher/:id", authMiddleware, PublisherController.updatePublisher);
router.delete("/delete-publisher/:id", authMiddleware, PublisherController.deletePublisher);
router.post("/delete-many-publisher", authMiddleware, PublisherController.deleteManyPublisher);

module.exports = router;
