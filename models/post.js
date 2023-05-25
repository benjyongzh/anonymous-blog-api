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
// BrandSchema.virtual("year_established_formatted").get(function () {
//   return this.year_established
//     ? DateTime.fromJSDate(this.year_established).toLocaleString(
//         DateTime.DATE_FULL
//       )
//     : "";
// });

module.exports = mongoose.model("Post", PostSchema);
