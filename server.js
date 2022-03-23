const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const formatMessage = require("./utils/messages");
const { userJoin, getCurrentUser, userLeave } = require("./utils/users");

const app = express();
const server = http.createServer(app);

const io = new Server(server);

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

io.on("connection", (socket) => {
    // Eventlistener to join a room - no global room
    socket.on("joinRoom", (room) => {
        const user = userJoin(socket.id, socket.id, room);
        socket.join(user.room);

        // Emits a message when a user joins a room
        socket.broadcast
            .to(user.room)
            .emit("message", `${user.username} has joined the chat`);
    });

    // Listens for pingLocation and emits location back to users in the room
    socket.on("pingLocation", (location) => {
        const user = getCurrentUser(socket.id);
        socket.broadcast.to(user.room).emit("location", {
            username: user.username,
            Lat: location.Lat,
            Lng: location.Lng,
        });
    });

    // Listen for a message and emits to the room the user is in.
    socket.on("message", (message) => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit("message", formatMessage(user.username, message));
    });

    // Eventlistener to leave a room - emits a message when a user leaves the room
    socket.on("leaveRoom", () => {
        const user = userLeave(socket.id);
        io.to(user.room).emit("message", `${user.username} has left the chat`);
        socket.leave(user.room);
    });

    // Emits a message when a user disconnects
    socket.on("disconnect", () => {
        const user = userLeave(socket.id);

        if (user) {
            io.to(user.room).emit(
                "message",
                `${user.username} has left the chat`
            );
        }
    });
});

server.listen(3000, () => {
    // eslint-disable-next-line no-console
    console.log("listening on *:3000");
});
