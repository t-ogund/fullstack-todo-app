const { urlencoded } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const Todo = require('./models/todo-model');
const Mode = require('./models/mode-model');
const dotenv = require('dotenv').config();


app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));
app.use(express.json());
mongoose.set('strictQuery', false);

const db = mongoose.connection;
const db_string = process.env.DB_STRING;

mongoose.connect(db_string,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
});

app.get('/', async (req, res) => {
    const newTodo = await Todo.find({})
    const mode = await Mode.find({})
    res.render('index.ejs', { newTodo, mode })
})

app.post('/new-todo', async (req, res) => {
    if (req.body.newTodo) {
        const todo = new Todo(req.body)
    todo.completed = false;
    const mode = new Mode({ mode: false })
    await todo.save()
    await mode.save()
    res.redirect('/')
    } else {
        res.redirect('/')
    }
})

app.put('/completed-status', async (req, res) => {
    const todo = await Todo.findByIdAndUpdate(req.body.id, { completed: req.body.completed })
    todo.save();
    res.redirect('/');
})

app.delete('/delete', async (req, res) => {
    const todo = await Todo.deleteOne({ _id: req.body.id })
})

app.delete('/clear-all', async (req, res) => {
    const todo = await Todo.deleteMany({ _id: {$in: req.body.completedIds }})
})

app.put('/mode', async (req, res) => {
    const mode = await Mode.updateOne({ mode: req.body.mode })
})

app.listen(PORT, () => {
    console.log(`The server is listening on Port ${PORT}...`)
})