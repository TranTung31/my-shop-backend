const express = require("express");
const router = express.Router();
const {
  authMiddleware,
  authUserMiddleware,
} = require("../middleware/authMiddleware");
const ContactController = require("../controllers/ContactController");

router.get("/get-all-contact", ContactController.getAllContact);
router.get("/get-contact/:id", ContactController.getContact);
router.get("/get-contact-user/:id", authUserMiddleware, ContactController.getContactUser);
router.post("/create-contact", authUserMiddleware, ContactController.createContact);
router.put("/update-contact/:id", authMiddleware, ContactController.updateContact);
router.delete("/delete-contact/:id", authUserMiddleware, ContactController.deleteContact);
router.post("/delete-many-contact", authMiddleware, ContactController.deleteManyContact);

module.exports = router;
