const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const schema = new Schema({
    sid: { type: String, default: null },
    secret: { type: String, default: null },
    roles: { type: Array, default: null },
    channels: { type: Array, default: null },
    categories: { type: Object, default: null }
});
module.exports = mongoose.model("serverCopy", schema);