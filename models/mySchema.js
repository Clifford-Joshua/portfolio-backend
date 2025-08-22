const mongoose = require("mongoose");

const mySchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "please provide project name"],
      maxlength: [20, "name can not be more than 20 characters"],
    },

    techStack: {
      type: String,
      trim: true,
      required: [true, "please provide project name"],
      maxlength: [300, "name can not be more than 20 characters"],
    },

    description: {
      type: String,
      trim: true,
      required: [true, "please tell use a bit about your project"],
    },
    img: {
      type: String,
      required: [true, "please provide project image"],
    },
    liveLink: {
      type: String,
      required: [true, "please provide the live link to the project"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", mySchema);
