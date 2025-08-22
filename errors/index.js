const BadRequest = require("./BadRequest");
const CustomAPIError = require("./custom-error");
const UnauthenticatedError = require("./Unauthenticated");
const NotFoundError = require("./NotFoundError");

module.exports = {
  BadRequest,
  NotFoundError,
  CustomAPIError,
  UnauthenticatedError,
};
