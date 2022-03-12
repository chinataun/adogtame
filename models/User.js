const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    user: String,
    password: String,
    type: String
})
usersSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
const User = mongoose.model('User', usersSchema)

module.exports = User

// User.find({}).then(result => {
//     console.log(result)
//     mongoose.connection.close()
// })


// const user = new User({
//     user: 'jesus',
//     password: 'passwordjesus',
//     type: 'adoptante'
// })

// user.save()
//     .then(result => {
//         console.log(result)
//         mongoose.connection.close()
//     })
//     .catch(err => {
//         console.error(err)
//     })