const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  type: { type: String, required: true },
  image: { type: String, required: false },
  articles: [
    { type: mongoose.Types.ObjectId, required: true, ref: "Articles" },
  ],
  books: [{ type: mongoose.Types.ObjectId, required: true, ref: "Books" }],
  videos: [{ type: mongoose.Types.ObjectId, required: true, ref: "Videos" }],
});

module.exports = mongoose.model("Category", categorySchema);
