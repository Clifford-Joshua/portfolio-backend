const express = require("express");
const router = express.Router();

const {
  deleteProject,
  updateProject,
  getAllProject,
  uploadNewProject,
  uploadProjectImage,
} = require("../controllers/projects");

router.route("/").get(getAllProject).post(uploadNewProject);

router.route("/uploads").post(uploadProjectImage);

router.route("/:id").patch(updateProject).delete(deleteProject);

module.exports = router;
