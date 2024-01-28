const Todo = require("../models/todo.js");

const formatTodo = (todo) => {
  return {
    id: todo._id,
    title: todo.title,
    body: todo.body,
    isDone: todo.isDone,
    createdAt: todo.createdAt,
    updatedAt: todo.updatedAt,
  }
};

const getTodos = async (req, res) => {
  try {
    const user = req.user;
    //find the todos
    const todos = await Todo.find({user: user}).sort({ createdAt: 'descending' });
    //respond
    res.json({
      success: true,
      message: "Successfully fetched all todos!",
      data: todos.map((todo) => formatTodo(todo)),
    });
  }
  catch (error) {
    console.log(error);
    res.sendStatus(400);
    res.json({
      success: false,
      message: error.message,
      data: null
    });
  }
}

const getTodo = async (req, res) => {
  try {
    //get the id off the url
    const todoId = req.params.id;

    //find the todo off that id
    const todo = await Todo.findOne({ _id: todoId });

    //respond
    res.json({
      sucdess: true,
      message: "Successfully fetched!",
      data: formatTodo(todo),
    });
  }
  catch (error) {
    console.log(error);
    res.status(400);
    res.json({
      success: false,
      message: error.message,
      data: null
    });
  }
}

const postTodo = async (req, res) => {
  try {
    //get the sent in data of req body
    const { title, body } = req.body;
    const user = req.user;

    //create a todo with it
    const todo = await Todo.create({
      title,
      body,
      user,
    });
    // respond with new todo
    res.json({
      success: true,
      message: "Todo created sucessfully!",
      data: formatTodo(todo),
    });
  }
  catch (error) {
    console.log(error);
    res.status(400);
    res.json({
      success: false,
      message: error.message,
      data: null
    });
  }
}

const putTodo = async (req, res) => {
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
    res.json({
      success: true,
      message: "Successfully updated the todo!",
      data: formatTodo(todo),

    });
  }
  catch (error) {
    console.log(error);
    res.status(400);
    res.json({
      success: false,
      message: error.message,
      data: null
    });
  }
}

const deleteTodo = async (req, res) => {
  try {
    //get the id off the url
    const todoId = req.params.id;

    //delete the record
    await Todo.findByIdAndDelete(todoId);

    //respond with it
    res.json({
      success: true,
      message: "Record deleted successfully!",
      data: null,
    });
  }
  catch (error) {
    console.log(error);
    res.status(400);
    res.json({
      success: false,
      message: error.message,
      data: null
    });
  }
}

module.exports = {
  getTodos: getTodos,
  getTodo: getTodo,
  postTodo: postTodo,
  putTodo: putTodo,
  deleteTodo: deleteTodo,
}