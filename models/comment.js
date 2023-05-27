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
// BrandSchema.virtual("year_established_formatted").get(function () {
//   return this.year_established
//     ? DateTime.fromJSDate(this.year_established).toLocaleString(
//         DateTime.DATE_FULL
//       )
//     : "";
// });

module.exports = mongoose.model("Comment", CommentSchema);
