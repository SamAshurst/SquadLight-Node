const mongoose = require("mongoose");
const Room = require("./roomScheme")

const seedDatabase = async () => {
    await mongoose.connect("mongodb://localhost:27017/squadLightDb", {
        useNewUrlParser: true,
    });

    await Room.createCollection();

    mongoose.connection.close();
};

seedDatabase();
