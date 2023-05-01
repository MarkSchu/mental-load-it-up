const mongoose = require('mongoose');
const TASKS = 'tasks';
const EVENTS = 'events';
const DOMAINS = 'domains';
const TEAMS = 'teams';

const team = new mongoose.Schema({
    userIds: Array
});

const task = new mongoose.Schema({
    name: String,
    dueDate: String,
    teamId: {type: mongoose.Schema.Types.ObjectId, ref: 'Team'}
});

const event = new mongoose.Schema({
    name: String,
    date: String,
    teamId: {type: mongoose.Schema.Types.ObjectId, ref: 'Team'}
});

const domain = new mongoose.Schema({
    name: String,
    teamId: {type: mongoose.Schema.Types.ObjectId, ref: 'Team'}
});

module.exports = {
    [TASKS]: mongoose.model('Task', task),
    [EVENTS]: mongoose.model('Event', event),
    [DOMAINS]: mongoose.model('Domain', domain),
    [TEAMS]: mongoose.model('Team', team)
}

