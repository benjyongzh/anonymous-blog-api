const User = require("../models/user");
const { body } = require("express-validator");

const usernameValidation = [
  //validation and sanitization of fields
  body("username", "Username must not be empty")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Username must be at least 5 characters long")
    .isAlphanumeric("en-US", { ignore: /\_\-/g })
    .withMessage(
      "Username can only contain alphanumeric characters, underscores and hypens."
    )
    .custom(async (inputName) => {
      const existingUser = await User.findOne({
        username: inputName,
      }).exec();

      if (existingUser) {
        throw new Error("Username already in use.");
      } else return true;
    }),
];

module.exports = { usernameValidation };
