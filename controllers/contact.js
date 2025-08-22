const Message = require("../models/messageSchema");
const { BadRequest } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const sendMessage = async (req, res) => {
  const { name, email, message, subject } = req.body;

  if (!name || !email || !message || !subject) {
    throw new BadRequest("please provide name, email message and subject");
  }

  // const emailExists = await Message.findOne({ email });
  // if (emailExists) {
  //   throw new BadRequest(
  //     "please provide a different email, this one already exists"
  //   );
  // }

  const newMessage = await Message.create({ name, email, message, subject });

  res.status(StatusCodes.OK).json({
    success: true,
    data: newMessage,
    msg: "form submitted successfully",
  });
};

const getMessages = async (req, res) => {
  const messages = await Message.find({});

  if (messages.length === 0) {
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      msg: "No messages found",
    });
  }

  res.status(StatusCodes.OK).json({
    success: true,
    allMessages: messages,
  });
};

const deleteMessage = async (req, res) => {
  const { id: messageId } = req.params;
  console.log(messageId);

  const message = await Message.deleteOne({ _id: messageId });

  if (!message) {
    throw new NotFoundError(`No product with id : ${messageId}`);
  }

  res.status(StatusCodes.OK).json({ msg: "message deleted" });
};

module.exports = { sendMessage, getMessages, deleteMessage };
