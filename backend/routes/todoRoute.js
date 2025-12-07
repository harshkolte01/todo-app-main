const express = require("express");
const router = express.Router();
const { postCreateTodo, getAllTodos, getTodo, putUpdateTodo, deleteTodo } = require("../controllers/todoController")
const { validateCreateTodo, validateTodoId, validateUpdateTodo } = require("../middleware/todoMiddleware")
const { protect} = require("../middleware/authMiddleware")

router.post("/todos", protect, validateCreateTodo, postCreateTodo);
router.get("/todos", protect, getAllTodos);
router.get("/todos/:id", protect, validateTodoId, getTodo);
router.put("/todos/:id", protect, validateTodoId, validateUpdateTodo, putUpdateTodo);
router.delete("/todos/:id", protect, validateTodoId, deleteTodo);

module.exports = router;