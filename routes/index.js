var express = require("express");
var router = express.Router();
const index_controller = require("../controllers/index_controller");
const user_controller = require("../controllers/user_controller");
const post_controller = require("../controllers/post_controller");
const comment_controller = require("../controllers/comment_controller");

const passport = require("passport");

/* GET home page. */
router.get("/", index_controller.main_page_get);

/* GET user non-exist page. */
router.get("/user/null", user_controller.user_nonexist);

/* GET user detail page. */
router.get("/user/:id", user_controller.user_detail);

/* GET user member status page. */
router.get("/user/:id/memberstatus", user_controller.user_memberstatus_get);

/* POST user member status page. */
router.post("/user/:id/memberstatus", user_controller.user_memberstatus_post);

/* GET post creation page. */
router.get("/post/create", post_controller.post_create_get);

/* POST post creation page. */
router.post("/post/create", post_controller.post_create_post);

/* GET post deleting method. */
router.post("/post/:id/delete", post_controller.post_delete_post);

/* GET post page. */
router.get("/post/:id", post_controller.post_detail);

/* POST creating comments on post page. */
router.post("/post/:id/comment/create", comment_controller.comment_create_post);

/* POST creating replies to a particular comment. */
router.post(
  "/post/:postid/comment/:commentid/reply",
  comment_controller.reply_create_post
);

module.exports = router;
