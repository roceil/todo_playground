const errorHandler = (res, error) => {
  console.error(error)
  res.writeHead(500, { 'Content-Type': 'application/json' })
  res.end(
    JSON.stringify({
      status: 'error',
      message: 'Server Error',
    }),
  )
}

const checkBody = (body, key, res) => {
  for (let i = 0; i < key.length; i++) {
    if (!body[key[i]]) {
      res.writeHead(400, { 'Content-Type': 'application/json' })
      res.end(
        JSON.stringify({
          status: 'fail',
          message: `body 中缺少 ${key[i]} 欄位`,
        }),
      )
      return false
    }
  }
  return true
}

const checkTodoId = (id, res, todos) => {
  const todo = todos.find(todo => todo.id === id)

  if (!todo) {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(
      JSON.stringify({
        status: 'fail',
        message: `沒有與 ID: ${id} 相符的待辦事項`,
      }),
    )
    return false
  }

  return todo
}

module.exports = {
  errorHandler,
  checkBody,
  checkTodoId,
}
