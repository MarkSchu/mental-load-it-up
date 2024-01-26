const mongoose = require('mongoose');
const TASKS = 'tasks';
const EVENTS = 'events';
const DOMAINS = 'domains';

const domain = new mongoose.Schema({
    name: String,
    deleted: Boolean,
    userId: String
});

const task = new mongoose.Schema({
    title: String,
    due: String,
    done: Boolean,
    deleted: Boolean,
    domainId: {type: mongoose.Schema.Types.ObjectId, ref: 'Domain'},
    userId: String
});

const event = new mongoose.Schema({
    name: String,
    date: String,
    deleted: Boolean,
    domainId: {type: mongoose.Schema.Types.ObjectId, ref: 'Domain'},
    userId: String
});

module.exports = {
    [TASKS]: mongoose.model('Task', task),
    [EVENTS]: mongoose.model('Event', event),
    [DOMAINS]: mongoose.model('Domain', domain),
    [MEMBERS]: mongoose.model('Member', member)
}
