const User = require("../models/user");
const { body } = require("express-validator");

const usernameSanitize = [
  //validation and sanitization of fields
  body("username", "Username must not be empty")
    .trim()
    .isLength({ min: 5, max: 20 })
    .withMessage("Username must be 5 to 20 characters long")
    .isAlphanumeric("en-US", { ignore: /\_\-/g })
    .withMessage(
      "Username can only contain alphanumeric characters, underscores and hypens."
    ),
];

const usernameAlreadyInUse = [
  body("username").custom(async (inputName) => {
    const existingUser = await User.findOne({
      username: inputName,
    }).exec();
    if (existingUser) {
      throw new Error("Username already in use.");
    } else return true;
  }),
];

module.exports = { usernameSanitize, usernameAlreadyInUse };
