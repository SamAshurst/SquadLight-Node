const mongoose = require("mongoose");
const Room = require("./roomScheme")

const seedDatabases = async () => {
    await mongoose.connect("mongodb://localhost:27017/squadLightDb", {
        useNewUrlParser: true,
    });

    await Room.createCollection();

    await mongoose.connection.close();

    await mongoose.connect("mongodb://localhost:27017/squadLightDb_test", {
        useNewUrlParser: true,
    });

    await Room.createCollection();

    await mongoose.connection.close();
};

seedDatabases();
