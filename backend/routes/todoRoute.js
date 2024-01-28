const express = require("express");
const todoController = require("../controllers/todoController.js")

const router = express.Router();

router.get("/", todoController.getTodos);
router.get("/:id",todoController.getTodo);
router.post("/", todoController.postTodo);
router.put("/:id", todoController.putTodo);
router.delete("/:id", todoController.deleteTodo);

module.exports = router;