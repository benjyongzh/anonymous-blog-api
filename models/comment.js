const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  text: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date_of_comment: { type: Date, required: true, default: Date.now() },
});

//add recursive comments
CommentSchema.add({
  replies: [CommentSchema],
});

//virtual for URL
CommentSchema.virtual("url").get(function () {
  return `/post/${this._id}`;
});

// //virtual for formatted dates
CommentSchema.virtual("date_of_comment_formatted").get(function () {
  return this.date_of_comment
    ? DateTime.fromJSDate(this.date_of_comment).toLocaleString(
        DateTime.DATE_FULL
      )
    : "";
});

// //virtual for time past for dates
CommentSchema.virtual("date_of_comment_ago").get(function () {
  if (!this.date_of_comment) return "";
  return DateTime.fromJSDate(this.date_of_comment).toRelative();
});

module.exports = mongoose.model("Comment", CommentSchema);
