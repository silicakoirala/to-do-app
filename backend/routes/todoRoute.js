const express = require("express");
const todoController = require("../controllers/todoController.js")

const router = express.Router();

router.get("/", todoController.fetchTodos);
router.get("/:id",todoController.fetchTodo);
router.post("/", todoController.createTodo);
router.put("/:id", todoController.updateTodo);
router.delete("/:id", todoController.deleteTodo);

module.exports = router;