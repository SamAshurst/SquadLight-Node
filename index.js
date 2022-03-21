const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server);

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

io.on("connection", (socket) => {
    console.log("User connected");
    socket.broadcast.emit("message", `${socket.id} connected`);
    // when a user sends a message, broadcast it to all other users
    socket.on("message", (message) => {
        console.log(`Message: ${message}`);
        socket.broadcast.emit("message", message);
    });
    // if a user disconnects, log it to the console
    socket.on("disconnect", (reason) => {
        console.log(`User disconnected (${reason})`);
    });
});

server.listen(3000, () => {
    console.log("listening on *:3000");
});
