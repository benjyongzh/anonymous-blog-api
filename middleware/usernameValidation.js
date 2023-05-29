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
    ),
];

module.exports = { usernameValidation };
