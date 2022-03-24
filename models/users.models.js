const db = require("../database/db");
const User = require("../database/userScheme");

exports.createUser = async ({ id, username, room }) => {
    const newUser = new User({
        id,
        username,
        roomId: room,
    });

    const createdUser = await newUser.save();

    return createdUser;
};

exports.removeUser = async () => {
    
}