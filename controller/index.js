const { getTodos, getTodoById, addTodo, updateTodo, deleteTodoById } = require('../model')

const getTodosController = (req, res) => {
  getTodos(req, res)
}

const getTodoByIdController = (req, res) => {
  getTodoById(req, res)
}

const addTodoController = (req, res) => {
  addTodo(req, res)
}

const updateTodoController = (req, res) => {
  updateTodo(req, res)
}

const deleteTodoByIdController = (req, res) => {
  deleteTodoById(req, res)
}

module.exports = {
  getTodosController,
  getTodoByIdController,
  addTodoController,
  updateTodoController,
  deleteTodoByIdController,
}
