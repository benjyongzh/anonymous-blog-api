const mongoose = require("mongoose");
const { DateTime } = require("luxon");
const decoder = require("he");

const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date_of_post: { type: Date, required: true, default: Date.now() },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

//virtual for URL
PostSchema.virtual("url").get(function () {
  return `/posts/${this._id}`;
});

//virtual for escaped title
PostSchema.virtual("title_unescaped").get(function () {
  return decoder.decode(this.title);
});

//virtual for escaped text
PostSchema.virtual("text_unescaped").get(function () {
  return decoder.decode(this.text);
});

// //virtual for formatted dates
PostSchema.virtual("date_of_post_formatted").get(function () {
  return this.date_of_post
    ? DateTime.fromJSDate(this.date_of_post).toLocaleString(DateTime.DATE_FULL)
    : "";
});

// //virtual for time past for dates
PostSchema.virtual("date_of_post_ago").get(function () {
  if (!this.date_of_post) return "";
  return DateTime.fromJSDate(this.date_of_post).toRelative();
});

module.exports = mongoose.model("Post", PostSchema);
