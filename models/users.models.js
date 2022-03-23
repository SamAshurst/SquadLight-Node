const db = require("../database/db");
const Room = require("../database/roomScheme");

exports.createRoom = async ({ id, username, room }) => {
    const newRoom = new Room({
        id: room,
        ownerId: id,
        occupants: [
            {
                userId: id,
                username,
            },
        ],
    });

    newRoom.save();
};
