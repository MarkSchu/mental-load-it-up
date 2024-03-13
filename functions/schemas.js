const mongoose = require('mongoose');
const { Schema } = mongoose;

const item = new Schema({
    type: String,
    title: String,
    domain: String,
    userId: String,
    creationDate: String        // 2024-01-31T17:20:45.958Z
});

const event = new Schema({
    type: String,
    title: String,
    domain: String,
    dueDate: String,            // 2024-01-31T17:20:45.958Z
    userId: String,
    creationDate: String        // 2024-01-31T17:20:45.958Z
});

const task = new Schema({
    type: String,
    title: String,
    domain: String,
    dueDate: String,            // 2024-01-31T17:20:45.958Z     date.toJSON()
    complete: Boolean,
    userId: String,             // Netlify User ID
    creationDate: String,       // 2024-01-31T17:20:45.958Z
});

const domain = new Schema({
    type: String,
    title: String,
    userId: String,
    color: String
});

module.exports = {
    'items': mongoose.model('Item', item),
    'tasks': mongoose.model('Task', task),
    'events': mongoose.model('Event', event),
    'domains': mongoose.model('Domain', domain)
}

 