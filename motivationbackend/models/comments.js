const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  name: { type: String, required: true },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  text: { type: String, required: true },
  cimg: { type: String, required: true },
  thepost: { type: mongoose.Types.ObjectId, required: true, ref: "Post" },
});

module.exports = mongoose.model("Comment", commentSchema);
