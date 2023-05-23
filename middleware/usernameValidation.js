const { body } = require("express-validator");

const usernameValidation = [
  //validation and sanitization of fields
  body("username", "Title must not be empty")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Username must be at least 5 characters long")
    .isAlphanumeric("en-US", { ignore: /\-/g })
    .withMessage(
      "Username can only contain alphanumeric characters and hypens."
    )
    .escape()
    .withMessage("Username is required."),
];

module.exports = { usernameValidation };
