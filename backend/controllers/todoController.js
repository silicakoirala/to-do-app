
const Todo = require("../models/todo.js")

const fetchTodos = async (req, res) => {
    try {
        //find the todos
        const todos = await Todo.find({});

        //respond
        res.json({ todos });
    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}

const fetchTodo = async (req, res) => {
    try {
        //get the id off the url
        const todoId = req.params.id;

        //find the todo off that id
        const todo = await Todo.findOne({ _id: todoId });

        //respond
        res.json({ todo });
    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}

const createTodo = async (req, res) => {
    try {
        //get the sent in data of req body
        const { title, body } = req.body;

        //create a todo with it
        const todo = await Todo.create({
            title,
            body,
        });
        // respond with new todo
        res.json({ todo });
    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}

const updateTodo = async (req, res) => {
    try {
        //get id off of the url
        const todoId = req.params.id;

        //get the data off of req body
        const { title, body, isDone } = req.body;

        //find and update the record
        await Todo.findOneAndUpdate({ _id: todoId },
            {
                title,
                body,
                isDone,
            });

        //find updated todo
        const todo = await Todo.findById(todoId);

        //respond with it
        res.json({ todo });
    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}

const deleteTodo = async (req, res) => {
    try {
        //get the id off the url
        const todoId = req.params.id;

        //delete the record
        await Todo.deleteOne({ id: todoId });

        //respond with it
        res.json({ succes: "Record deleted!" });
    }
    catch (err) {
        console.log(err);

        res.sendStatus(400);
    }
}

module.exports = {
    fetchTodos: fetchTodos,
    fetchTodo: fetchTodo,
    createTodo: createTodo,
    updateTodo: updateTodo,
    deleteTodo: deleteTodo,

}