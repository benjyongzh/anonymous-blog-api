const { body } = require("express-validator");

const nameValidation = [
  //validation and sanitization of fields
  body("first_name", "First name must not be empty")
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage("First name must be 1 to 30 characters long")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("First name can only contain alphabets, spaces and hypens."),
  body("last_name", "Last name must not be empty")
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage("Last name must be 1 to 30 characters long")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Last name can only contain alphabets, spaces and hypens."),
];

module.exports = { nameValidation };
