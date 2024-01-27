const mongoose = require('mongoose');

const task = new mongoose.Schema({
    title: String,
    userId: String,             // Netlify User ID
    dueDate: String,            // UTC string
    creationDate: String        // UTC string
});

const event = new mongoose.Schema({
    title: String,
    userId: String
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