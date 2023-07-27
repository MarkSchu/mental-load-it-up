const mongoose = require('mongoose');
const TASKS = 'tasks';
const EVENTS = 'events';
const DOMAINS = 'domains';
const TEAMS = 'teams';

const team = new mongoose.Schema({
    deleted: Boolean,
});

const domain = new mongoose.Schema({
    name: String,
    deleted: Boolean,
    teamId: {type: mongoose.Schema.Types.ObjectId, ref: 'Team'}
});

const task = new mongoose.Schema({
    name: String,
    dueDate: String,
    complete: Boolean,
    deleted: Boolean,
    domainId: {type: mongoose.Schema.Types.ObjectId, ref: 'Domain'},
    teamId: {type: mongoose.Schema.Types.ObjectId, ref: 'Team'},
});

const event = new mongoose.Schema({
    name: String,
    date: String,
    deleted: Boolean,
    domainId: {type: mongoose.Schema.Types.ObjectId, ref: 'Domain'},
    teamId: {type: mongoose.Schema.Types.ObjectId, ref: 'Team'}
});

module.exports = {
    [TASKS]: mongoose.model('Task', task),
    [EVENTS]: mongoose.model('Event', event),
    [DOMAINS]: mongoose.model('Domain', domain),
    [TEAMS]: mongoose.model('Team', team)
}
