const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  service: { type: String, required: true },
  level: { type: String, required: true },
  message: { type: String, required: true },
  meta: { type: Object, default: {} },
});

module.exports = mongoose.model('Log', logSchema);
