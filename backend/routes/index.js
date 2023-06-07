var express = require("express");
var indexRouter = express.Router();
const index_controller = require("../controllers/index_controller");
const userRouter = require("./user");
const postRouter = require("./post");
const authRouter = require("./auth");

/* GET home page. */
indexRouter.get("/", index_controller.main_page_get);

module.exports = { indexRouter, authRouter, userRouter, postRouter };
