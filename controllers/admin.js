const Admin = require("../models/AdminSchema");
const { StatusCodes } = require("http-status-codes");
const { BadRequest, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const { email } = req.body;

  const existingEmail = await Admin.findOne({ email });

  if (existingEmail) {
    throw new BadRequest("Email already exists");
  }

  const user = await Admin.create({ ...req.body });

  const token = user.createJWT();

  res
    .status(StatusCodes.CREATED)
    .json({ token, msg: "Admin user created successfully" });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequest("Please provide email and password");
  }

  const user = await Admin.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const token = user.createJWT();

  res
    .status(StatusCodes.OK)
    .json({ success: true, token, msg: "Login successful" });
};

module.exports = {
  register,
  login,
};
