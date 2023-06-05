var express = require("express");
var router = express.Router();
const post_controller = require("../controllers/post_controller");
const comment_controller = require("../controllers/comment_controller");

/* GET post creation page. */
router.get("/create", post_controller.post_create_get);

/* POST post creation page. */
router.post("/create", post_controller.post_create_post);

/* GET post deleting method. */
router.delete("/:id/delete", post_controller.post_delete_post);

/* GET post page. */
router.get("/:id", post_controller.post_detail);

/* POST creating comments on post page. */
router.post("/:id/comment/create", comment_controller.comment_create_post);

/* POST creating replies to a particular comment. */
router.post(
  "/:postid/comment/:commentid/reply",
  comment_controller.reply_create_post
);

module.exports = router;
