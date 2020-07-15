const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const schema = new Schema({
    sid: { type: String, default: null },
    invitedby: { type: String, default: null },
    user: { type: String, default: null }
});
module.exports = mongoose.model("inviteTracker", schema);