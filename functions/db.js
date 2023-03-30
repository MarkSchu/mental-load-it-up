const schemas = require('./schemas');

const db = {};

db.create = async (collectionName, data) => {
    const Schema = schemas[collectionName];
    const doc = new Schema(data);
    await doc.save();
    return {
        statusCode: 200,
        body: JSON.stringify({
            instance: doc
        })
    }
}

db.getAllUserData = async (data) => {
    const userId = data.userId;
    const tasks = await schemas['tasks'].find({userId});
    const events = await schemas['events'].find({userId});
    const domains = await schemas['domains'].find({userId});
    return {
        statusCode: 200,
        body: JSON.stringify({
            userdata: {
                tasks,
                events,
                domains
            }
        })
    }
}

module.exports = db;