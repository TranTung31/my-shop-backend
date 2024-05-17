const express = require("express");
const router = express.Router();
const {
  authMiddleware,
  authUserMiddleware,
} = require("../middleware/authMiddleware");
const AuthorController = require("../controllers/AuthorController");

router.get("/get-all-author", AuthorController.getAllAuthor);

router
  .route("")
  .get(AuthorController.getAuthor)
  .post(authMiddleware, AuthorController.createAuthor);

router
  .route("/:id")
  .get(AuthorController.getAuthorById)
  .put(authMiddleware, AuthorController.updateAuthor)
  .delete(authMiddleware, AuthorController.deleteAuthor);

router.post("/delete-many", authMiddleware, AuthorController.deleteManyAuthor);

module.exports = router;
