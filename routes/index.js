var express = require("express");
var router = express.Router();
const index_controller = require("../controllers/index_controller");
const user_controller = require("../controllers/user_controller");

const passport = require("passport");

/* GET home page. */
router.get("/", index_controller.main_page_get);

/* GET user detail page. */
router.get("/user/:id", user_controller.user_detail);

module.exports = router;
