const mongoose = require('mongoose');
const db = require('../database/db');
const Room = require("../database/roomScheme")

exports.createRoom = async () => {
    console.log(Room.find());
}