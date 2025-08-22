const mongoose = require("mongoose");
const validator = require("validator");

const messageSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide your name"],
    },
    email: {
      type: String,
      required: [true, "Please provide a valid email"],
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email",
      },
    },
    subject: {
      type: String,
      required: [true, "Please provide a subject"],
      maxlength: [100, "Message cannot be more than 1000 characters"],
    },
    message: {
      type: String,
      required: [true, "Please send your message"],
      maxlength: [1000, "Message cannot be more than 1000 characters"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
