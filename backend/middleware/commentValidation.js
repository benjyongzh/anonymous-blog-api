const { body } = require("express-validator");

const commentValidation = [
  //validation and sanitization of fields
  body("new_comment")
    .trim()
    .isLength({ min: 1, max: 300 })
    .withMessage("Comment must be between 1 to 300 characters"),
];

const replyValidation = [
  //validation and sanitization of fields
  body("new_reply")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Reply must be between 1 to 100 characters"),
];

module.exports = { commentValidation, replyValidation };
