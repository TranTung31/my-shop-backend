const express = require("express");
const router = express.Router();
const {
  authMiddleware,
  authUserMiddleware,
} = require("../middleware/authMiddleware");
const AuthorController = require("../controllers/AuthorController");

router.get("/get-all-author", AuthorController.getAllAuthor);
router.get("/get-author/:id", AuthorController.getAuthor);
router.post("/create-author", AuthorController.createAuthor);
router.put("/update-author/:id", AuthorController.updateAuthor);
router.delete("/delete-author/:id", AuthorController.deleteAuthor);
router.post("/delete-many-author", AuthorController.deleteManyAuthor);

module.exports = router;
