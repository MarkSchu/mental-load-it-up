const mongoose = require('mongoose');
const { Schema } = mongoose;

const task = new Schema({
    title: String,
    userId: String,             // Netlify User ID
    complete: Boolean,
    dueDate: String,            // 2024-01-31T17:20:45.958Z     date.toJSON()
    creationDate: String,       // 2024-01-31T17:20:45.958Z
    domain: String
});

const event = new Schema({
    title: String,
    userId: String,
    dueDate: String,            // 2024-01-31T17:20:45.958Z
    creationDate: String        // 2024-01-31T17:20:45.958Z
});

const domain = new Schema({
    title: String,
    userId: String,
    color: String
});

module.exports = {
    'tasks': mongoose.model('Task', task),
    'events': mongoose.model('Event', event),
    'domains': mongoose.model('Domain', domain)
}


 // domain: { type: Schema.Types.ObjectId, ref: 'Domain'}