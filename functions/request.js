const mongoose = require("mongoose");
const db = require('./db');

const connectDB = () => {
    return mongoose.connect(process.env.MONGO_URI);
}

exports.handler = async (event) => {
    /**
     * we need to make sure the user is logged in here
    */
    return connectDB().then(() => {
        console.log('connectDB() success')
        const {action, userId, collection, data} = JSON.parse(event.body);
        return db[action](userId, collection, data);
    }).catch((err) => {
        console.log(err)
        return {
            statusText: 'boop'
        }
    })
}
