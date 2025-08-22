const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermission,
} = require("../middleware/authentication");

const {
  sendMessage,
  getMessages,
  deleteMessage,
} = require("../controllers/contact");

router.route("/sendMessage").post(sendMessage);

router
  .route("/Messages")
  .get(authenticateUser, authorizePermission("admin"), getMessages);

router
  .route("/deleteMessage/:id")
  .delete(authenticateUser, authorizePermission("admin"), deleteMessage);

module.exports = router;
