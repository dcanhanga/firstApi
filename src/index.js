const http = require('http')
const{URL} = require('url')
const routes = require('./routes')
const server = http.createServer((request, response)=> {
  console.log()
 const parsedUrl = new URL(`http://localhost:3333${request.url}`)
 const query = Object.fromEntries(parsedUrl.searchParams)
 let {pathname} = parsedUrl;
 let id = null

 const splitEndPoint = pathname.split('/').filter(Boolean)
if(splitEndPoint.length> 1) {
  pathname = `/${splitEndPoint[0]}/:id`
  id = splitEndPoint[1]
}
 const route = routes.find((routeObjet)=> (
  routeObjet.endPoint === pathname && routeObjet.method === request.method
 ))

  if(route){

    request.query = query
    request.params = { id }

    response.send = (statusCode, body)=> {
      response.writeHead(statusCode, {'Content-Type': 'application/json'})
      response.end(JSON.stringify(body))
    }

   route.handler(request, response)
  } else {
    response.writeHead(404, 'text/html')
    response.end(`<h1 style='color:red'>Cannot Found ${request.method} ${parsedUrl.pathname}</h1>`)
  }
})

server.listen(3333, ()=> console.log('🔥Server in run in http://localhost:3333'));