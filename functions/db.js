const schemas = require('./schemas');

const db = {};

db.create = async (userId, collection, data) => {
    const Schema = schemas[collection];
    const doc = new Schema(data);
    await doc.save();
    return {
        statusCode: 200,
        body: JSON.stringify(doc)
    }
}

db.updateById = async (userId, collection, data) => {
    const Schema = schemas[collection];
    await Schema.findByIdAndUpdate(data._id, data.properties);
    const doc = await Schema.findById(data._id);
    return {
        statusCode: 200,
        body: JSON.stringify({
            instance: doc
        })
    }
}

db.deleteById = async (userId, collection, data) => {
    const Schema = schemas[collection];
    await Schema.findByIdAndDelete(data._id)
    return {
        statusCode: 200,
        body: JSON.stringify({
            success: true,
            _id: data._id
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