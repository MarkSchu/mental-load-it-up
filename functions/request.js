const mongoose = require("mongoose");
const db = require('./db');

const connectDB = () => {
    return mongoose.connect(process.env.MONGO_URI);
}

exports.handler = async (event) => {
    return connectDB().then(() => {
        const {action, collectionName, data} = JSON.parse(event.body);
        return db[action](collectionName, data);
    });
}
