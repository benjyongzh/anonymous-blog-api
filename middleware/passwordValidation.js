const { body } = require("express-validator");

const passwordValidation = [
  //validation and sanitization of fields
  body("password", "Password must not be empty")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

module.exports = { passwordValidation };
