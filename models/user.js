const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  member_status: {
    type: String,
    required: true,
    enum: ["Normal", "Premium", "Admin"],
    default: "Normal",
  },
});

//virtual for URL
UserSchema.virtual("url").get(function () {
  return `/user/${this._id}`;
});

// //virtual for formatted dates
// BrandSchema.virtual("year_established_formatted").get(function () {
//   return this.year_established
//     ? DateTime.fromJSDate(this.year_established).toLocaleString(
//         DateTime.DATE_FULL
//       )
//     : "";
// });

module.exports = mongoose.model("User", UserSchema);
