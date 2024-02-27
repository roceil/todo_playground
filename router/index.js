const {
  getTodosController,
  getTodoByIdController,
  addTodoController,
  updateTodoController,
  deleteTodoByIdController,
} = require('../controller')

const headers = require('../lib/headers')

const router = (req, res) => {
  const { url, method } = req

  if (method === 'GET' && url === '/todos') {
    getTodosController(req, res)
    return
  }

  if (method === 'GET' && url.startsWith('/todos/')) {
    getTodoByIdController(req, res)
    return
  }

  if (method === 'POST' && url === '/todos') {
    addTodoController(req, res)
    return
  }

  if (method === 'PATCH' && url.startsWith('/todos/')) {
    updateTodoController(req, res)
    return
  }

  if (method === 'DELETE' && url.startsWith('/todos/')) {
    deleteTodoByIdController(req, res)
    return
  }

  if (method === 'OPTIONS' && url === '/todos') {
    res.writeHead(200, headers)
    res.end()
    return
  }

  res.writeHead(404, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ message: 'Page Not Found' }))
}

module.exports = router
