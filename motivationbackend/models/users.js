const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
  image: { type: String, required: true },
  age: { type: String, required: true },
  aboutme: { type: String, required: false },
  location: { type: String, required: false },
  job: { type: String, required: false },
  school: { type: String, required: false },
  uni: { type: String, required: false },
  posts: [{ type: mongoose.Types.ObjectId, required: true, ref: "Post" }],
  comments: [{ type: mongoose.Types.ObjectId, required: true, ref: "Comment" }],
  likes: [{ type: String, required: false, default: null }],
  confirmed: { type: Boolean, default: true },
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);
