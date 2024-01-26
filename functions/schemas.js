const mongoose = require('mongoose');

const task = new mongoose.Schema({
    title: String,
    userId: String
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