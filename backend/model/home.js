const mongoose = require("mongoose");

const homeSchema = mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
  rulesPdf: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Home", homeSchema);
