const { body } = require("express-validator");

const nameValidation = [
  //validation and sanitization of fields
  body("first_name", "First name must not be empty")
    .trim()
    .isLength({ min: 1 })
    .withMessage("First name must be at least 1 character long")
    .isAlpha("en-US", { ignore: /\s|\-/g })
    .withMessage("First name can only contain alphabets, spaces and hypens.")
    .escape(),
  body("last_name", "Last name must not be empty")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Last name must be at least 1 character long")
    .isAlpha("en-US", { ignore: /\s|\-/g })
    .withMessage("Last name can only contain alphabets, spaces and hypens.")
    .escape(),
];

module.exports = { nameValidation };
