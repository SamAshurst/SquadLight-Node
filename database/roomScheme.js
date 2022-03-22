const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    id: String,
    ownerID: String,
    occupants: [{ userID: String }],
});

module.exports = mongoose.model("Room", roomSchema);
