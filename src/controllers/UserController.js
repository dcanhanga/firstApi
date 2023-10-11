let users = require('./../mocks/users')
module.exports = {
  listUsers (request, response) {
    const { order } = request.query
    const sortedUsers = [...users].sort((a, b) => {
      if (order === 'desc') return a.id < b.id ? 1 : -1
      return a.id > b.id ? 1 : -1
    })
    response.send(200, sortedUsers)
  },

  getUsersById (request, response) {
    const { id } = request.params
    const user = users.find(user => user.id === Number(id))
    if (!user) {
      const message = { error: 'User not found' }
      return response.send(200, message)
    }

    response.send(200, user)
  },

  createUser (request, response) {
    const { body } = request
    const lastUserId = users[users.length - 1].id
    const newUsers = {
      id: lastUserId + 1,
      name: body.name
    }

    users.push(newUsers)
    response.send(200, newUsers)
  },

  updateUser(request, response){
   let {id} = request.params
    const {name} = request.body
    id = Number(id)
    const userExits = users.find( user => user.id === id)
    if(!userExits) { 
      return response.send(400, {error: 'User not found'})
    }

    users = users.map(user => {
      if(user.id === id) {
        return {
          ...user,
          name
        }
      }
      return user
    })
    response.send(200, { id, name})
  },

  deleteUser(request, response){
    let {id} = request.params
    id = Number(id)
    const userExits = users.find( user => user.id === id)
    if(!userExits) { 
      return response.send(400, {error: 'User not found'})
    }

    users = users.filter( user => user.id !== id)
    response.send(200, {deleted: true})
  }
}
