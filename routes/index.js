var express = require("express");
var router = express.Router();
const index_controller = require("../controllers/index_controller");
const user_controller = require("../controllers/user_controller");
const post_controller = require("../controllers/post_controller");

const passport = require("passport");

/* GET home page. */
router.get("/", index_controller.main_page_get);

/* GET user detail page. */
router.get("/user/:id", user_controller.user_detail);

/* GET post creation page. */
router.get("/post/create", post_controller.post_create_get);

/* POST post creation page. */
router.post("/post/create", post_controller.post_create_post);

/* GET post page. */
router.get("/post/:id", post_controller.post_detail);

module.exports = router;
