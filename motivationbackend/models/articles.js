const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articlesSchema = new Schema({
  thecat: { type: mongoose.Types.ObjectId, required: true, ref: "Category" },
  title: { type: String, required: true },
  undertitle: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: false },
});
module.exports = mongoose.model("Articles", articlesSchema);
