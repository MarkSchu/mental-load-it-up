const mongoose = require('mongoose');
const TASKS = 'tasks';
const EVENTS = 'events';
const DOMAINS = 'domains';


const task = new mongoose.Schema({
    name: String,
    dueDate: String,
    userId: String,
    
});

const event = new mongoose.Schema({
    
});

const domain = new mongoose.Schema({
    
});

module.exports = {
    [TASKS]: mongoose.model('Task', task),
    [EVENTS]: mongoose.model('Event', event),
    [DOMAINS]: mongoose.model('Domain', domain)
}