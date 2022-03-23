const mongoose = require('mongoose');
const Room = require("./roomScheme")

const resetRooms = async () => {
    await mongoose.connect("mongodb://localhost:27017/squadLightDb", {
        useNewUrlParser: true,
    });
    
    await Room.deleteMany({});

    await mongoose.connection.close();
}

resetRooms();