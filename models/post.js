const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date_of_post: { type: Date, required: true, default: Date.now() },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

//virtual for URL
PostSchema.virtual("url").get(function () {
  return `/post/${this._id}`;
});

// //virtual for formatted dates
PostSchema.virtual("date_of_post_formatted").get(function () {
  return this.date_of_post
    ? DateTime.fromJSDate(this.date_of_post).toLocaleString(DateTime.DATE_FULL)
    : "";
});

module.exports = mongoose.model("Post", PostSchema);
