const http = require('http');
const routes = require('./routes')
const server = http.createServer((request, response)=> {
 
 const route = routes.find((routeObjet)=> (
  routeObjet.endPoint === request.url && routeObjet.method === request.method
 ))
  if(route){
   route.handler(request, response)
  } else {
    response.writeHead(404, 'text/html')
    response.end(`<h1 style='color:red'>Cannot Found ${request.method} ${request.url}</h1>`)
  }
})

server.listen(3333, ()=> console.log('🔥Server in run in http://localhost:3333'));