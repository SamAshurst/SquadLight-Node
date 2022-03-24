const { createUser, findUser, removeUser } = require("../models/users.models");

// Join user to chat
async function userJoin(id, username, room) {
    const user = { id, username, room };

    const createdUser = await createUser(user);

    return createdUser;
}

// Get current user
async function getCurrentUser(id) {
    const foundUser = await findUser(id);

    return foundUser;
}

// User leaves chat
async function userLeave(id) {
    const foundUser = await findUser(id);

    const dropUser = await removeUser(id);

    if (dropUser.deletedCount === 1) {
        return foundUser;
    }
    return null;
}

module.exports = { userJoin, getCurrentUser, userLeave };
