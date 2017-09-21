const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)
/*server.use(jsonServer.defaults)
server.use(jsonServer.router('db.json'))*/
server.listen(3000, () => {
  console.log('JSON Server is running')
})
