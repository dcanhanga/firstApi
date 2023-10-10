const UserController = require('./controllers/UserController')
const defaultRout = (_ ,response) =>   {
response.writeHead(200, {'Content-Type': 'text/html'})
response.end(`<h1 style='color:green'>Hello word!</h1>`)}
module.exports = [
  {
    endPoint: '/',
    method: 'GET',
    handler: defaultRout
   },
  {
   endPoint: '/users',
   method: 'GET',
   handler: UserController.listUsers
  },

  {
    endPoint: '/users',
    method: 'POST',
    handler: UserController.createUser
   },
 
  {
    endPoint: '/users/:id',
    method: 'GET',
    handler: UserController.getUsersById
   }
 
]