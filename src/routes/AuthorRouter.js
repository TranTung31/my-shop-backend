const express = require("express");
const router = express.Router();
const {
  authMiddleware,
  authUserMiddleware,
} = require("../middleware/authMiddleware");
const AuthorController = require("../controllers/AuthorController");

router.route("").get(AuthorController.getAuthor);
router.get("/get-all-author", AuthorController.getAllAuthor);
router.get("/get-author/:id", AuthorController.getAuthorById);
router.post("/create-author", authMiddleware, AuthorController.createAuthor);
router.put("/update-author/:id", authMiddleware, AuthorController.updateAuthor);
router.delete(
  "/delete-author/:id",
  authMiddleware,
  AuthorController.deleteAuthor
);
router.post(
  "/delete-many-author",
  authMiddleware,
  AuthorController.deleteManyAuthor
);

module.exports = router;
