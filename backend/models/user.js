const mongoose = require("mongoose");
const { DateTime } = require("luxon");
const decoder = require("he");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    member_status: {
      type: String,
      required: true,
      enum: ["Basic", "Premium", "Admin"],
      default: "Basic",
    },
    auth_tokens: [{ type: Object }],
  },
  { toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

//virtual for URL
UserSchema.virtual("url").get(function () {
  return `/users/${this._id}`;
});

//virtual for full name
UserSchema.virtual("full_name").get(function () {
  return `${this.first_name} ${this.last_name}`;
});

module.exports = mongoose.model("User", UserSchema);
