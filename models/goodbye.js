const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const schema = new Schema({
    sid: { type: String, default: null },
    message: { type: String, default: null },
    channel: { type: String, default: null },
});
module.exports = mongoose.model("goodbye", schema);