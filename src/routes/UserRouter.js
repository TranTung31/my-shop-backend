const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const {
  authMiddleware,
  authUserMiddleware,
} = require("../middleware/authMiddleware");

router.route("").get(UserController.getUser);
router.post("/sign-up", UserController.createUser);
router.post("/sign-in", UserController.loginUser);
router.post("/log-out", UserController.logOutUser);
router.put("/update-user/:id", authUserMiddleware, UserController.updateUser);
router.delete("/delete-user/:id", authMiddleware, UserController.deleteUser);
router.get("/get-all-user", authMiddleware, UserController.getAllUser);
router.get(
  "/get-detail-user/:id",
  authUserMiddleware,
  UserController.getDetailUser
);
router.post("/refresh-token", UserController.refreshToken);
router.post("/delete-many", authMiddleware, UserController.deleteManyUser);
router.get("/get-count-user", authMiddleware, UserController.getCountUser);

module.exports = router;
