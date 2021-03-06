const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const videoSchema = new Schema({
  thecat: { type: mongoose.Types.ObjectId, required: true, ref: "Category" },
  title: { type: String, required: true },
  undertitle: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});
module.exports = mongoose.model("Videos", videoSchema);
