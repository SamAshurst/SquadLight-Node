const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const formatMessage = require("./utils/messages");

const app = express();
const server = http.createServer(app);

const io = new Server(server);

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

io.on("connection", (socket) => {
    socket.broadcast.emit("message", `${socket.id} connected`);
    // when a user sends a message, broadcast it to all other users
    socket.on("message", (message) => {
        socket.broadcast.emit("message", formatMessage(socket.id, message));
        console.log("message", formatMessage(socket.id, message));
    });
    // if a user disconnects, log it to the console
    socket.on("disconnect", (reason) => {
        socket.broadcast.emit(`User disconnected (${reason})`);
    });
});

server.listen(3000, () => {
    // eslint-disable-next-line no-console
    console.log("listening on *:3000");
});
