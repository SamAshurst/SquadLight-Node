// eslint-disable-next-line no-unused-vars
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

exports.findUser = async (id) => {
    const foundUser = await User.find({ id });
    return foundUser[0];
};

exports.removeUser = async (id) => {
    const dropUser = await User.deleteOne({ id });
    return dropUser;
};
