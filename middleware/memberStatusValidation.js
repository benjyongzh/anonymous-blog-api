function memberStatusValidation(req, res, next) {
  if (!req.body.member_status) {
    req.body.member_status = "Basic";
  }
  next();
}

module.exports = { memberStatusValidation };
