const { v4: uuid } = require('uuid')
const { errorHandler, checkBody, checkTodoId } = require('../lib')

const todos = []

// 取得所有 todo
const getTodos = (req, res) => {
  try {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(
      JSON.stringify({
        status: 'success',
        totalTodos: todos.length,
        data: todos,
      }),
    )
  } catch (error) {
    errorHandler(res, error)
  }
}

// 取得 todo By ID
const getTodoById = (req, res) => {
  try {
    const id = req.url.split('/').pop()

    const todo = checkTodoId(id, res, todos)
    if (!todo) return

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(
      JSON.stringify({
        status: 'success',
        data: todo,
      }),
    )
  } catch (error) {
    errorHandler(res, error)
  }
}

// 新增 todo
const addTodo = (req, res) => {
  try {
    let body = ''
    req.on('data', chunk => {
      body += chunk.toString()
    })
    req.on('end', () => {
      const parseBody = JSON.parse(body)

      const requiredFields = ['title']

      if (!checkBody(parseBody, requiredFields, res)) return

      const newTodo = {
        id: uuid(),
        title: parseBody.title,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      todos.push(newTodo)

      res.writeHead(201, { 'Content-Type': 'application/json' })
      res.end(
        JSON.stringify({
          status: 'success',
          data: newTodo,
        }),
      )
    })
  } catch (error) {
    errorHandler(res, error)
  }
}

// 更改 todo
const updateTodo = (req, res) => {
  const id = req.url.split('/').pop()
  try {
    const todo = checkTodoId(id, res, todos)
    if (!todo) return

    let body = ''
    req.on('data', chunk => {
      body += chunk.toString()
    })
    req.on('end', () => {
      const parseBody = JSON.parse(body)

      const requiredFields = ['completed']
      if (!checkBody(parseBody, requiredFields, res)) return

      todo.title = parseBody.title || todo.title
      todo.completed = parseBody.completed || todo.completed
      todo.updatedAt = new Date()

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(
        JSON.stringify({
          status: 'success',
          data: todo,
        }),
      )
    })
  } catch (error) {
    errorHandler(res, error)
  }
}

// 刪除 todo By ID
const deleteTodoById = (req, res) => {
  const id = req.url.split('/').pop()
  try {
    const todo = checkTodoId(id, res, todos)
    if (!todo) return

    const index = todos.findIndex(todo => todo.id === id)
    todos.splice(index, 1)

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({
      status: 'success',
      data: todos
    }))
  } catch (error) {
    errorHandler(res, error)
  }
}

module.exports = {
  getTodos,
  getTodoById,
  addTodo,
  updateTodo,
  deleteTodoById,
}
