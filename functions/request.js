const mongoose = require("mongoose");
const db = require('./db');

const connectDB = () => {
    return mongoose.connect(process.env.MONGO_URI);
}

exports.handler = async (event) => {
    console.log('netlify request')
    return connectDB().then(() => {
        const {action, data, collectionName} = JSON.parse(event.body);
        return db[action](collectionName, data);
    });
}
