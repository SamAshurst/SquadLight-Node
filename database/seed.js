const mongoose = require("mongoose");
const User = require("./userScheme")

const seedDatabases = async () => {
    await mongoose.connect("mongodb://localhost:27017/squadLightDb", {
        useNewUrlParser: true,
    });

    await User.createCollection();

    await mongoose.connection.close();

    await mongoose.connect("mongodb://localhost:27017/squadLightDb_test", {
        useNewUrlParser: true,
    });

    await User.createCollection();

    await mongoose.connection.close();
};

seedDatabases();
