const path = require("path");
const Project = require("../models/mySchema");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequest } = require("../errors");

const getAllProject = async (req, res) => {
  const allProjects = await Project.find({});
  res
    .status(StatusCodes.OK)
    .json({ success: true, data: allProjects, count: allProjects.length });
};

const uploadNewProject = async (req, res) => {
  const newProject = await Project.create(req.body);
  res.status(StatusCodes.CREATED).json({ newProject });
};

const updateProject = async (req, res) => {
  const { id: projectId } = req.params;

  const project = await Project.findOneAndUpdate({ _id: projectId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!project) {
    throw new NotFoundError(`No product with id : ${projectId}`);
  }

  res.status(StatusCodes.OK).json({ msg: "project updated", project });
};

const deleteProject = async (req, res) => {
  const { id: projectId } = req.params;

  const project = await Project.deleteOne({ _id: projectId });

  if (!project) {
    throw new NotFoundError(`No product with id : ${projectId}`);
  }

  res.status(StatusCodes.OK).json({ msg: "project deleted" });
};

const uploadProjectImage = async (req, res) => {
  if (!req.files) {
    throw new BadRequest("No file uploaded");
  }

  const projectImage = req.files.image;

  if (!projectImage.mimetype.startsWith(`${"image" || "jepg" || "png"}`)) {
    throw new BadRequest("Please upload an image");
  }

  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${projectImage.name}`
  );

  await projectImage.mv(imagePath);

  res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${projectImage.name}` } });
};

module.exports = {
  deleteProject,
  updateProject,
  getAllProject,
  uploadNewProject,
  uploadProjectImage,
};
