const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const formatMessage = require("./utils/messages");
const { userJoin, getCurrentUser, userLeave } = require("./utils/users");

const app = express();
const server = http.createServer(app);

const io = new Server(server);

app.get("/", (req, res) => {
    res.status(200).json({name: 'SquadLight API'});
});

io.on("connection", (socket) => {
    // Eventlistener to join a room - no global room
    socket.on("joinRoom", async (room, username) => {
        const createdUser = await userJoin(socket.id, username, room);
        socket.join(createdUser.roomId);

        // Emits a message when a user joins a room
        socket.broadcast
            .to(createdUser.roomId)
            .emit("message", `${createdUser.username} has joined the chat`);
    });

    // Listens for pingLocation and emits location back to users in the room
    socket.on("pingLocation", async (location) => {
        const user = await getCurrentUser(socket.id);
        socket.broadcast.to(user.roomId).emit("location", {
            username: user.username,
            Lat: location.Lat,
            Lng: location.Lng,
        });
    });

    // Listen for a message and emits to the room the user is in.
    socket.on("message", async (message) => {
        const user = await getCurrentUser(socket.id);

        io.to(user.roomId).emit(
            "message",
            formatMessage(user.username, message)
        );
    });

    // Emits a message when a user disconnects
    socket.on("disconnect", async () => {
        const user = await userLeave(socket.id);

        if (user) {
            io.to(user.roomId).emit(
                "message",
                `${user.username} has left the chat`
            );
        }
    });
});

server.listen(process.env.PORT || 5000);

// // Eventlistener to leave a room - emits a message when a user leaves the room
// socket.on("leaveRoom", async () => {
//     const user = await userLeave(socket.id);
//     io.to(user.roomId).emit(
//         "message",
//         `${user.username} has left the chat`
//     );
//     socket.leave(user.roomId);
// });
