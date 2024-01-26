const mongoose = require('mongoose');

const task = new mongoose.Schema({
    title: String,
    userId: String
});

module.exports = {
    'tasks': mongoose.model('Task', task)
}