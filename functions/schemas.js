const mongoose = require('mongoose');

const task = new mongoose.Schema({
    title: String,
    userId: String,             // Netlify User ID
    complete: Boolean,
    dueDate: String,            // 2024-01-31T17:20:45.958Z     date.toJSON()
    creationDate: String        // 2024-01-31T17:20:45.958Z
});

const event = new mongoose.Schema({
    title: String,
    userId: String,
    dueDate: String,            // 2024-01-31T17:20:45.958Z
    creationDate: String       // 2024-01-31T17:20:45.958Z
});

const domain = new mongoose.Schema({
    title: String,
    userId: String
});

module.exports = {
    'tasks': mongoose.model('Task', task),
    'events': mongoose.model('Event', event),
    'domains': mongoose.model('Domain', domain)
}