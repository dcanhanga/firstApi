const http = require('http');
const users = require('./mocks/users')
const server = http.createServer((request, response)=> {
 
 
  if(request.url === '/users' && request.method === 'GET'){
    response.writeHead(200, {'Content': 'application/json'});
    response.end(JSON.stringify(users))
  } else {
    response.writeHead(404, 'text/html')
    response.end(`<h1>Cannot Found ${request.method} ${request.url}</h1>`)
  }
})

server.listen(3333, ()=> console.log('🔥Server in run in http://localhost:3333'));