const { body } = require("express-validator");

const postValidation = [
  //validation and sanitization of fields
  body("title", "Title must not be empty")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Title must be at least 1 character long")
    .escape(),
  body("text")
    .trim()
    .isLength({ max: 300 })
    .withMessage("Text must be maximum of 300 characters")
    .escape(),
];

module.exports = { postValidation };
