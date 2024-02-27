const http = require('http')
const router = require('./router')

const serverFn = (req, res) => {
  router(req, res)
}

const server = http.createServer(serverFn)

server.listen(3333, 'localhost')
