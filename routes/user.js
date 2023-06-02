var express = require("express");
var router = express.Router();
const user_controller = require("../controllers/user_controller");

/* GET user non-exist page. */
router.get("/null", user_controller.user_nonexist);

/* GET user detail page. */
router.get("/:id", user_controller.user_detail);

/* GET user member status page. */
router.get("/:id/memberstatus", user_controller.user_memberstatus_get);

/* POST user member status page. */
router.post("/:id/memberstatus", user_controller.user_memberstatus_post);

module.exports = router;
