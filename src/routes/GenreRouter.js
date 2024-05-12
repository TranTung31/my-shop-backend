const express = require("express");
const router = express.Router();
const {
  authMiddleware,
  authUserMiddleware,
} = require("../middleware/authMiddleware");
const GenreController = require("../controllers/GenreController");

router.route("").get(GenreController.getGenre);
router.get("/get-all-genre", GenreController.getAllGenre);
router.get("/get-genre/:id", GenreController.getGenreById);
router.post("/create-genre", authMiddleware, GenreController.createGenre);
router.put("/update-genre/:id", authMiddleware, GenreController.updateGenre);
router.delete("/delete-genre/:id", authMiddleware, GenreController.deleteGenre);
router.post(
  "/delete-many-genre",
  authMiddleware,
  GenreController.deleteManyGenre
);

module.exports = router;
