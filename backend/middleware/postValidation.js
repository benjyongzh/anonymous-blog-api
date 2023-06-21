const { body } = require("express-validator");

const postValidation = [
  //validation and sanitization of fields
  body("title", "Title must not be empty")
    .trim()
    .isLength({ min: 1, max: 90 })
    .withMessage("Title must be 1 to 90 characters long"),
  body("text")
    .trim()
    .isLength({ max: 300 })
    .withMessage("Text must be maximum of 300 characters"),
];

module.exports = { postValidation };
