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
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Ensure this matches your User model name
    required: true,
  },
});

module.exports = mongoose.model("Home", homeSchema);
