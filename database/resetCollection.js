const mongoose = require('mongoose');
const User = require("./userScheme")

const resetUsers = async () => {
    await mongoose.connect("mongodb://localhost:27017/squadLightDb", {
        useNewUrlParser: true,
    });
    
    await User.deleteMany({});

    await mongoose.connection.close();
}

resetUsers();