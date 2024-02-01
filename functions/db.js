const schemas = require('./schemas');

const getCurrentUTC = () => {
    return (new Date()).toISOString();
}

const db = {};

db.create = async (userId, collection, data) => {
    data.userId = userId;
    data.creationDate = getCurrentUTC();
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
    await Schema.findByIdAndUpdate(data._id, data.changes);
    const doc = await Schema.findById(data._id);
    return {
        statusCode: 200,
        body: JSON.stringify(doc)
    }
}

db.deleteById = async (userId, collection, data) => {
    const Schema = schemas[collection];
    await Schema.findByIdAndDelete(data._id)
    const {_id} = data;
    return {
        statusCode: 200,
        body: JSON.stringify({_id})
    }
}

db.getAllUserData = async (userId) => {
    console.log('getAllUserData()')
    const tasks = await schemas['tasks'].find({userId});
    const events = await schemas['events'].find({userId});
    const domains = await schemas['domains'].find({userId});
    return {
        statusCode: 200,
        body: JSON.stringify({
            tasks,
            events,
            domains
        })
    }
}


module.exports = db;