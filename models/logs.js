const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const schema = new Schema({
    sid: { type: String, default: null },
    delete: { type: String, default: null },
    edit: { type: String, default: null },
    joinleave: { type: String, default: null },
    mod: { type: String, default: null },
    role: { type: String, default: null },
    member: { type: String, default: null },
    channel: { type: String, default: null }
});
module.exports = mongoose.model("logs", schema);