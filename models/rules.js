const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const schema = new Schema({
    sid: { type: String, default: null },
    channel: { type: String, default: null },
    rules: { type: Array, default: null }
});
module.exports = mongoose.model("rules", schema);