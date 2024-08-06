const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const {
  authMiddleware,
  authUserMiddleware,
  isAuthorized,
} = require("../middleware/authMiddleware");

router.post("/sign-up", UserController.createUser);
router.post("/sign-in", UserController.loginUser);
router.post("/log-out", UserController.logOutUser);
router.put(
  "/change-password/:id",
  authUserMiddleware,
  UserController.changePassword
);

router.delete("/delete-user/:id", authMiddleware, UserController.deleteUser);
router.get("/get-all-user", authMiddleware, UserController.getAllUser);
router.get(
  "/get-detail-user/:id",
  authUserMiddleware,
  UserController.getDetailUser
);
router.post("/refresh-token", UserController.refreshToken);
router.put("/refresh-token", UserController.refreshTokenAPI);
router.post("/delete-many", authMiddleware, UserController.deleteManyUser);
router.get("/get-count-user", authMiddleware, UserController.getCountUser);

router.route("").get(UserController.getUser);
router.route("/:id").put(authUserMiddleware, UserController.updateUser);

module.exports = router;
