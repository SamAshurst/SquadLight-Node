const mongoose = require("mongoose");

const ENV = process.env.NODE_ENV || "development";
require("dotenv").config({
    path: `${__dirname}/../.env.${ENV}`,
});

const MONGO_HOSTNAME = "127.0.0.1";
const MONGO_PORT = "27017";
let url;

if (ENV === 'production') {
    url = process.env.MONGODB_URI
} else {
    url = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${process.env.MONGO_DB}`;
}

mongoose.connect(url, { useNewUrlParser: true });
