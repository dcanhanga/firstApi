const users = require('./../mocks/users')
module.exports = {
  listUsers (request, response) {
    const { order } = request.query
    const sortedUsers = [...users].sort((a, b) => {
      if (order === 'desc') return a.id < b.id ? 1 : -1;
      return a.id> b.id ? 1: -1;
    })
    response.send(200, sortedUsers)
  },

 getUsersById(request, response){
  const {id} = request.params
  const user = users.find( user => user.id === Number(id))
  if(!user) { 
    const message =  {error: 'User not found'}
    return  response.send(200, message)
  }

  response.send(200, user)
 },

 createUser(request, response){
  let body = '' 
  request.on('data', (chunk) => {
    body += chunk
  })
  request.on('end', () => {
    body = JSON.parse(body)
    lastUserId = users[users.length -1].id
    console.log(lastUserId)

    const newUsers = {
      id: lastUserId + 1,
      name: body.name,
    }

    users.push(newUsers)
    response.send(200, newUsers)
  });
 }

}
