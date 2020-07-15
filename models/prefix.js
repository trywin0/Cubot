const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const schema = new Schema({
    sid: { type: String, default: null },
    prefix: { type: String, default: "/" }
});
module.exports = mongoose.model("prefix", schema);