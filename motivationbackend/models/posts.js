const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  name: { type: String, required: true },
  text: { type: String, required: true },
  pimg: { type: String, required: true },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  comments: [{ type: mongoose.Types.ObjectId, required: true, ref: "Comment" }],
});

module.exports = mongoose.model("Post", postSchema);
