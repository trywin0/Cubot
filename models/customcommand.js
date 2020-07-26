const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const schema = new Schema({
    sid: { type: String, default: null },
    trigger: { type: String, default: null },
    code: { type: String, default: null }
});
module.exports = mongoose.model("codecommand", schema);