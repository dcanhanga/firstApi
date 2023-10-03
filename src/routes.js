const UserController = require('./controllers/UserController')
module.exports = [
  {
   endPoint: '/users',
   method: 'GET',
   handler: UserController.listUsers
  }
]