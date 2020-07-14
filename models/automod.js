const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const schema = new Schema({
    sid: { type: String, default: null },
    enables: { type: Array, default: null }
});
module.exports = mongoose.model("automod", schema);