const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const schema = new Schema({
    sid: { type: String, default: null },
    trigger: { type: String, default: null },
    response: { type: String, default: null }
});
module.exports = mongoose.model("customcommand", schema);