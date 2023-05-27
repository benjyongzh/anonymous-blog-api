const { body } = require("express-validator");

const commentValidation = [
  //validation and sanitization of fields
  body("new_comment")
    .trim()
    .isLength({ max: 300 })
    .withMessage("Comment must be maximum of 300 characters")
    .escape(),
];

const replyValidation = [
  //validation and sanitization of fields
  body("new_reply")
    .trim()
    .isLength({ max: 100 })
    .withMessage("Reply must be maximum of 100 characters")
    .escape(),
];

module.exports = { commentValidation, replyValidation };
