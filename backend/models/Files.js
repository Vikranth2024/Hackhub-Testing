const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
  email: String,
  ipfsHash: String,
  timestamp: String,
  txHash: String,
});

module.exports = mongoose.model("File", FileSchema);
