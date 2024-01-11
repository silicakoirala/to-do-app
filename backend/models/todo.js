const mongoose = require("mongoose");

const todosSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Enter the title:"],
        },
        body: {
            type: String,
        },
        isDone: {
            type: Boolean,
            default: false,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    });

const Todo = mongoose.model("Todo", todosSchema);
module.exports = Todo;