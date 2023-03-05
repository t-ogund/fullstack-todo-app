const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    newTodo: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean
    }
})

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;